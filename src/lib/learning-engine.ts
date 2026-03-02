import { UserInteraction, SearchHistoryItem, UserPreferences, LearningData, IntentType } from '@/types';

const STORAGE_KEY = 'universal-ai-life-os-learning';

const defaultPreferences: UserPreferences = {
  language: 'ar',
  currency: 'SAR',
  location: 'Saudi Arabia',
  notifications: true,
  interests: [],
  preferredBrands: [],
  preferredCategories: []
};

// الحصول على بيانات التعلم
export function getLearningData(): LearningData {
  if (typeof window === 'undefined') {
    return { interactions: [], searchHistory: [], preferences: defaultPreferences, lastUpdated: Date.now() };
  }
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      return { ...data, preferences: { ...defaultPreferences, ...data.preferences } };
    }
  } catch (e) {
    console.error('Error reading learning data:', e);
  }
  
  return { interactions: [], searchHistory: [], preferences: defaultPreferences, lastUpdated: Date.now() };
}

// حفظ بيانات التعلم
export function saveLearningData(data: LearningData): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...data, lastUpdated: Date.now() }));
}

// تسجيل تفاعل
export function recordInteraction(interaction: {
  type: 'search' | 'click' | 'view' | 'save' | 'purchase';
  query?: string;
  intent?: IntentType;
  itemId?: string;
  metadata?: Record<string, unknown>;
}): void {
  const data = getLearningData();
  
  data.interactions = [
    { ...interaction, id: `int-${Date.now()}`, timestamp: Date.now() },
    ...data.interactions
  ].slice(0, 1000);
  
  saveLearningData(data);
}

// حفظ في سجل البحث
export function saveSearchHistory(item: SearchHistoryItem): void {
  const data = getLearningData();
  data.searchHistory = [item, ...data.searchHistory.filter(s => s.query !== item.query)].slice(0, 100);
  saveLearningData(data);
}

// الحصول على عمليات البحث الأخيرة
export function getRecentSearches(limit: number = 10): SearchHistoryItem[] {
  return getLearningData().searchHistory.slice(0, limit);
}

// الحصول على اهتمامات المستخدم
export function getUserInterests(): { interest: string; score: number }[] {
  const data = getLearningData();
  const interests: Record<string, number> = {};

  for (const i of data.interactions) {
    const w = i.type === 'purchase' ? 5 : i.type === 'click' ? 3 : 1;
    if (i.query) {
      for (const word of i.query.toLowerCase().split(/\s+/)) {
        if (word.length > 2) {
          interests[word] = (interests[word] || 0) + w;
        }
      }
    }
    if (i.intent) {
      interests[i.intent] = (interests[i.intent] || 0) + w * 2;
    }
  }

  return Object.entries(interests)
    .map(([interest, score]) => ({ interest, score }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 20);
}

// الحصول على إحصائيات المستخدم
export function getUserStats(): {
  totalSearches: number;
  totalClicks: number;
  totalViews: number;
  totalPurchases: number;
  mostSearchedIntent: string;
} {
  const data = getLearningData();
  const intentCounts: Record<string, number> = {};
  let totalClicks = 0, totalViews = 0, totalPurchases = 0;

  for (const i of data.interactions) {
    if (i.intent) intentCounts[i.intent] = (intentCounts[i.intent] || 0) + 1;
    if (i.type === 'click') totalClicks++;
    if (i.type === 'view') totalViews++;
    if (i.type === 'purchase') totalPurchases++;
  }

  const mostSearchedIntent = Object.entries(intentCounts)
    .sort((a, b) => b[1] - a[1])[0]?.[0] || 'none';

  return {
    totalSearches: data.searchHistory.length,
    totalClicks,
    totalViews,
    totalPurchases,
    mostSearchedIntent
  };
}

// حساب درجة التوصية
export function calculateRecommendationScore(item: {
  tags?: string[];
  category?: string;
  brand?: string;
  price?: number;
  rating?: number;
}): number {
  const data = getLearningData();
  let score = (item.rating || 0) * 10;

  const interests = data.preferences.interests || [];
  if (item.tags) {
    for (const tag of item.tags) {
      if (interests.includes(tag.toLowerCase())) score += 15;
    }
  }

  if (item.category && data.preferences.preferredCategories?.includes(item.category)) score += 20;
  if (item.brand && data.preferences.preferredBrands?.includes(item.brand)) score += 25;

  return Math.min(score, 100);
}

// مسح بيانات التعلم
export function clearLearningData(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
}
