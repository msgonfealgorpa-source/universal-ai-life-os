// ═══════════════════════════════════════════════════════════════════════════════
// 🧠 CORE BRAIN ENGINE - المحرك الرئيسي للذكاء الاصطناعي الداخلي 100%
// ═══════════════════════════════════════════════════════════════════════════════
// بدون أي API خارجي - كل الذكاء داخلي

import { IntentType, ExtractedEntities } from '@/types';

// ═══════════════════════════════════════════════════════════════════════════════
// 📚 قاعدة بيانات التدريب للتعرف على النوايا
// ═══════════════════════════════════════════════════════════════════════════════

const INTENT_TRAINING_DATA: Record<IntentType, string[]> = {
  product_search: [
    // العربية - شراء ومنتجات
    'شراء', 'أشتري', 'سعر', 'متجر', 'منتج', 'لابتوب', 'لاب توب', 'جوال', 'موبايل',
    'هاتف', 'كمبيوتر', 'سماعات', 'ساعة', 'تابلت', 'إكسسوارات', 'أبحث عن', 'أحتاج',
    'أريد', 'أفضل', 'رخيص', 'مقارنة', 'أين أجد', 'عايز', 'اشتري', 'بيع', 'محل',
    'متجر إلكتروني', 'تسوق', 'سعر مناسب', 'أرخص', 'أغلى', 'جودة', 'ماركة',
    // الإنجليزية
    'buy', 'purchase', 'price', 'shop', 'store', 'product', 'laptop', 'phone',
    'computer', 'headphones', 'watch', 'tablet', 'accessories', 'find', 'looking for',
    'need', 'want', 'best', 'cheap', 'affordable', 'compare', 'shopping', 'order'
  ],
  job_search: [
    // العربية - وظائف
    'وظيفة', 'عمل', 'توظيف', 'راتب', 'مطور', 'مصمم', 'مهندس', 'مدير',
    'عن بعد', 'دوام كامل', 'تقديم', 'شاغر', 'فرصة عمل', 'وظائف', 'بحث عن عمل',
    'وظيفة جديدة', 'سيرة ذاتية', 'CV', 'مقابلة', 'موظف', 'مرتب', 'freelance',
    // الإنجليزية
    'job', 'career', 'work', 'employment', 'hire', 'salary', 'position', 'developer',
    'designer', 'engineer', 'manager', 'remote', 'full-time', 'apply', 'vacancy', 'hiring'
  ],
  service_search: [
    // العربية - خدمات
    'خدمة', 'فريلانسر', 'وكالة', 'استشارات', 'تطوير', 'تصميم', 'تسويق', 'شركة',
    'مزود', 'مساعدة', 'محتاج', 'محترف', 'أحتاج شخص', 'مطلوب', 'خدمات', 'مستقل',
    // الإنجليزية
    'service', 'freelance', 'agency', 'consulting', 'development', 'design',
    'marketing', 'company', 'provider', 'help', 'need someone', 'professional'
  ],
  knowledge: [
    // العربية - معرفة
    'كيف', 'ما هو', 'ما هي', 'اشرح', 'تعلم', 'شرح', 'دورة', 'علمني',
    'لماذا', 'متى', 'أين', 'ما', 'أي', 'طريقة', 'دليل', 'تعليم',
    // الإنجليزية
    'how to', 'what is', 'explain', 'learn', 'tutorial', 'guide', 'course', 'teach'
  ],
  website_builder: [
    'بناء موقع', 'إنشاء موقع', 'موقع إلكتروني', 'تطبيق ويب', 'متجر إلكتروني',
    'صفحة هبوط', 'معرض أعمال', 'صنع موقع', 'تصميم موقع', 'برمجة موقع',
    'build website', 'create website', 'make website', 'web app', 'online store'
  ],
  comparison: [
    'مقارنة', 'الفرق', 'أو', 'بين', 'أيهما أفضل', 'أفضل', 'اختلاف',
    'compare', 'difference', 'vs', 'versus', 'which is better'
  ],
  recommendation: [
    'توصية', 'اقترح', 'أنصح', 'رأيك', 'ماذا تنصح', 'أفضل', 'نصيحة',
    'recommend', 'suggest', 'best for', 'top', 'advice', 'opinion'
  ],
  unknown: []
};

// ═══════════════════════════════════════════════════════════════════════════════
// ⚖️ أوزان الكلمات المهمة لكل نوع طلب
// ═══════════════════════════════════════════════════════════════════════════════

const INTENT_WEIGHTS: Record<IntentType, Record<string, number>> = {
  product_search: {
    'شراء': 3, 'أشتري': 3, 'سعر': 2.5, 'منتج': 2.5, 'لابتوب': 2, 'هاتف': 2,
    'buy': 3, 'price': 2.5, 'shop': 2, 'product': 2.5, 'laptop': 2, 'phone': 2
  },
  job_search: {
    'وظيفة': 3, 'عمل': 2.5, 'راتب': 2, 'توظيف': 3, 'وظائف': 3,
    'job': 3, 'career': 2.5, 'salary': 2, 'hiring': 3
  },
  service_search: {
    'خدمة': 3, 'خدمات': 3, 'فريلانسر': 2.5,
    'service': 3, 'freelance': 2.5
  },
  knowledge: {
    'كيف': 2.5, 'ما': 2, 'شرح': 2.5, 'تعلم': 2,
    'how': 2.5, 'what': 2, 'explain': 2.5
  },
  website_builder: {
    'موقع': 3, 'إنشاء': 2.5, 'بناء': 2.5, 'متجر': 2,
    'website': 3, 'create': 2.5, 'build': 2.5
  },
  comparison: {
    'مقارنة': 3, 'الفرق': 2.5, 'أفضل': 2,
    'compare': 3, 'difference': 2.5, 'vs': 3
  },
  recommendation: {
    'توصية': 3, 'أنصح': 3, 'رأيك': 2.5,
    'recommend': 3, 'suggest': 2.5
  },
  unknown: {}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 🏷️ قاعدة بيانات الفئات والماركات
// ═══════════════════════════════════════════════════════════════════════════════

const CATEGORIES: Record<string, { en: string[]; ar: string[] }> = {
  laptop: { 
    en: ['laptop', 'notebook', 'computer', 'pc', 'macbook'], 
    ar: ['لابتوب', 'لاب توب', 'كمبيوتر', 'حاسوب', 'ماك بوك'] 
  },
  phone: { 
    en: ['phone', 'smartphone', 'mobile', 'iphone', 'android'], 
    ar: ['هاتف', 'جوال', 'موبايل', 'آيفون'] 
  },
  headphones: { 
    en: ['headphones', 'earbuds', 'earphones', 'airpods'], 
    ar: ['سماعات', 'سماعة', 'إيربودز'] 
  },
  watch: { 
    en: ['watch', 'smartwatch', 'apple watch'], 
    ar: ['ساعة', 'ساعة ذكية'] 
  },
  tablet: { 
    en: ['tablet', 'ipad'], 
    ar: ['تابلت', 'آيباد'] 
  }
};

const BRANDS: Record<string, string[]> = {
  apple: ['apple', 'آبل', 'iphone', 'آيفون', 'ipad', 'macbook', 'ماك', 'airpods'],
  samsung: ['samsung', 'سامسونج', 'galaxy', 'جالكسي'],
  dell: ['dell', 'ديل', 'xps'],
  hp: ['hp', 'هيوليت', 'pavilion'],
  lenovo: ['lenovo', 'لينوفو', 'thinkpad'],
  asus: ['asus', 'أسوس', 'rog'],
  sony: ['sony', 'سوني'],
  huawei: ['huawei', 'هواوي']
};

const USE_CASES: Record<string, { en: string[]; ar: string[] }> = {
  programming: { en: ['programming', 'coding', 'developer', 'code'], ar: ['برمجة', 'مطور', 'كود'] },
  gaming: { en: ['gaming', 'games', 'gamer'], ar: ['ألعاب', 'جيمنج'] },
  design: { en: ['design', 'graphic', 'ui', 'ux', 'creative'], ar: ['تصميم', 'مصمم', 'جرافيك'] },
  business: { en: ['business', 'office', 'work', 'professional'], ar: ['عمل', 'تجارة', 'أعمال'] },
  study: { en: ['study', 'student', 'university', 'school'], ar: ['دراسة', 'طالب', 'جامعة'] }
};

// ═══════════════════════════════════════════════════════════════════════════════
// 🔍 INTENT DETECTION MODEL - نموذج التعرف على النوايا
// ═══════════════════════════════════════════════════════════════════════════════

export function detectIntent(query: string): { 
  intent: IntentType; 
  confidence: number; 
  scores: Record<IntentType, number>;
  matchedKeywords: string[];
} {
  const queryLower = query.toLowerCase();
  const matchedKeywords: string[] = [];
  const scores: Record<IntentType, number> = {
    product_search: 0, job_search: 0, service_search: 0, knowledge: 0,
    website_builder: 0, comparison: 0, recommendation: 0, unknown: 0
  };

  // حساب النقاط لكل intent
  for (const [intent, keywords] of Object.entries(INTENT_TRAINING_DATA)) {
    if (intent === 'unknown') continue;
    
    for (const keyword of keywords) {
      if (queryLower.includes(keyword.toLowerCase())) {
        const weight = INTENT_WEIGHTS[intent as IntentType]?.[keyword.toLowerCase()] || 1;
        scores[intent as IntentType] += weight;
        if (!matchedKeywords.includes(keyword)) matchedKeywords.push(keyword);
      }
    }
  }

  // فحص الأنماط الخاصة
  if (query.match(/(.+)\s+(أو|or|vs|versus)\s+(.+)/i)) scores.comparison += 4;
  if (query.match(/^(كيف|ما|لماذا|how|what|why)/i)) scores.knowledge += 2;
  if (query.match(/(أريد|أحتاج)\s+.+(لابتوب|هاتف|laptop|phone)/i)) scores.product_search += 2;
  if (query.match(/(وظيفة|عمل|job|career)\s*.*/i)) scores.job_search += 2;

  // إيجاد أعلى درجة
  let maxScore = 0;
  let detectedIntent: IntentType = 'unknown';
  
  for (const [intent, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      detectedIntent = intent as IntentType;
    }
  }

  // حساب نسبة الثقة
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const confidence = totalScore > 0 ? Math.min(maxScore / Math.max(totalScore, 1), 1) : 0;

  return { 
    intent: detectedIntent, 
    confidence: Math.max(confidence, 0.1), 
    scores, 
    matchedKeywords 
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// 📦 ENTITY EXTRACTION MODEL - نموذج استخراج الكيانات
// ═══════════════════════════════════════════════════════════════════════════════

export function extractEntities(query: string, intent: IntentType): ExtractedEntities {
  const entities: ExtractedEntities = {};
  const queryLower = query.toLowerCase();

  // استخراج الفئة
  for (const [category, patterns] of Object.entries(CATEGORIES)) {
    for (const pattern of [...patterns.en, ...patterns.ar]) {
      if (queryLower.includes(pattern.toLowerCase())) {
        entities.category = category;
        break;
      }
    }
    if (entities.category) break;
  }

  // استخراج الماركة
  for (const [brand, patterns] of Object.entries(BRANDS)) {
    for (const pattern of patterns) {
      if (queryLower.includes(pattern.toLowerCase())) {
        entities.brand = brand.charAt(0).toUpperCase() + brand.slice(1);
        break;
      }
    }
    if (entities.brand) break;
  }

  // استخراج الميزانية
  const numberMatch = query.match(/(\d{1,3}(?:,\d{3})*)\s*(ريال|دولار|\$|sar|usd)?/i);
  if (numberMatch) {
    entities.budget = { max: parseInt(numberMatch[1].replace(/,/g, '')) };
  }

  // استخراج حالة الاستخدام
  for (const [useCase, patterns] of Object.entries(USE_CASES)) {
    for (const pattern of [...patterns.en, ...patterns.ar]) {
      if (queryLower.includes(pattern.toLowerCase())) {
        entities.useCase = useCase;
        break;
      }
    }
    if (entities.useCase) break;
  }

  // استخراج التقييم المطلوب
  if (queryLower.includes('ممتاز') || queryLower.includes('best') || queryLower.includes('أفضل')) {
    entities.rating = 4.5;
  } else if (queryLower.includes('جيد') || queryLower.includes('good')) {
    entities.rating = 4.0;
  }

  return entities;
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🌐 LANGUAGE DETECTION - كشف اللغة
// ═══════════════════════════════════════════════════════════════════════════════

export function detectLanguage(query: string): 'ar' | 'en' {
  const arabicCount = (query.match(/[\u0600-\u06FF]/g) || []).length;
  const englishCount = (query.match(/[a-zA-Z]/g) || []).length;
  return arabicCount > englishCount ? 'ar' : 'en';
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 MAIN ANALYSIS FUNCTION - الدالة الرئيسية للتحليل
// ═══════════════════════════════════════════════════════════════════════════════

export interface BrainAnalysisResult {
  intent: IntentType;
  entities: ExtractedEntities;
  confidence: number;
  originalQuery: string;
  language: 'ar' | 'en';
  suggestedActions: string[];
  reasoning: string[];
  matchedKeywords: string[];
}

export async function analyzeQuery(query: string): Promise<BrainAnalysisResult> {
  if (!query || query.trim().length === 0) {
    return {
      intent: 'unknown',
      entities: {},
      confidence: 0,
      originalQuery: query || '',
      language: 'ar',
      suggestedActions: [],
      reasoning: [],
      matchedKeywords: []
    };
  }

  // 1. كشف اللغة
  const language = detectLanguage(query);
  
  // 2. التعرف على النية
  const { intent, confidence, matchedKeywords } = detectIntent(query);
  
  // 3. استخراج الكيانات
  const entities = extractEntities(query, intent);
  
  // 4. توليد الإجراءات المقترحة
  const suggestedActions = generateSuggestedActions(intent, entities, language);
  
  // 5. توليد التفسير
  const reasoning = [
    language === 'ar' 
      ? `تم التعرف على: ${getIntentLabel(intent, 'ar')} بثقة ${(confidence * 100).toFixed(0)}%`
      : `Detected: ${getIntentLabel(intent, 'en')} with ${(confidence * 100).toFixed(0)}% confidence`
  ];

  if (entities.category) {
    reasoning.push(language === 'ar' ? `الفئة: ${entities.category}` : `Category: ${entities.category}`);
  }
  if (entities.brand) {
    reasoning.push(language === 'ar' ? `الماركة: ${entities.brand}` : `Brand: ${entities.brand}`);
  }
  if (entities.budget?.max) {
    reasoning.push(language === 'ar' ? `الميزانية: حتى ${entities.budget.max} ريال` : `Budget: up to ${entities.budget.max}`);
  }

  return {
    intent,
    entities,
    confidence,
    originalQuery: query,
    language,
    suggestedActions,
    reasoning,
    matchedKeywords
  };
}

// توليد الإجراءات المقترحة
function generateSuggestedActions(intent: IntentType, entities: ExtractedEntities, lang: 'ar' | 'en'): string[] {
  const actions: string[] = [];

  switch (intent) {
    case 'product_search':
      if (entities.category) {
        actions.push(lang === 'ar' ? `عرض جميع ${entities.category}` : `Show all ${entities.category}`);
      }
      if (entities.budget?.max) {
        actions.push(lang === 'ar' ? `منتجات أقل من ${entities.budget.max} ريال` : `Products under ${entities.budget.max}`);
      }
      actions.push(lang === 'ar' ? 'مقارنة المنتجات' : 'Compare products');
      actions.push(lang === 'ar' ? 'الأكثر مبيعاً' : 'Best sellers');
      break;

    case 'job_search':
      actions.push(lang === 'ar' ? 'وظائف عن بعد' : 'Remote jobs');
      actions.push(lang === 'ar' ? 'أعلى الرواتب' : 'Highest salaries');
      actions.push(lang === 'ar' ? 'وظائف جديدة' : 'New jobs');
      break;

    case 'service_search':
      actions.push(lang === 'ar' ? 'خدمات التطوير' : 'Development services');
      actions.push(lang === 'ar' ? 'خدمات التصميم' : 'Design services');
      break;

    default:
      actions.push(lang === 'ar' ? 'بحث في المنتجات' : 'Search products');
      actions.push(lang === 'ar' ? 'بحث في الوظائف' : 'Search jobs');
  }

  return actions.slice(0, 4);
}

// الحصول على تسمية الـ intent
function getIntentLabel(intent: IntentType, lang: 'ar' | 'en'): string {
  const labels: Record<IntentType, { ar: string; en: string }> = {
    product_search: { ar: 'بحث عن منتجات', en: 'Product Search' },
    job_search: { ar: 'بحث عن وظائف', en: 'Job Search' },
    service_search: { ar: 'بحث عن خدمات', en: 'Service Search' },
    knowledge: { ar: 'استعلام معلومات', en: 'Knowledge Query' },
    website_builder: { ar: 'بناء موقع', en: 'Website Builder' },
    comparison: { ar: 'مقارنة', en: 'Comparison' },
    recommendation: { ar: 'توصيات', en: 'Recommendation' },
    unknown: { ar: 'غير معروف', en: 'Unknown' }
  };
  return labels[intent][lang];
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🔄 ROUTER ENGINE - محرك التوجيه
// ═══════════════════════════════════════════════════════════════════════════════

export function getEngineForIntent(intent: IntentType): string {
  const routes: Record<IntentType, string> = {
    product_search: '/api/engines/products',
    job_search: '/api/engines/jobs',
    service_search: '/api/engines/services',
    knowledge: '/api/engines/products',
    website_builder: '/api/engines/services',
    comparison: '/api/engines/products',
    recommendation: '/api/engines/products',
    unknown: '/api/engines/products'
  };
  return routes[intent];
}

// ترتيب النتائج
export function prioritizeResults<T extends { rating?: number; price?: number }>(
  results: T[],
  entities: ExtractedEntities
): T[] {
  let sorted = [...results];
  
  if (entities.budget?.max) {
    sorted = sorted.filter(r => (r.price || 0) <= entities.budget!.max!);
  }
  if (entities.rating) {
    sorted = sorted.filter(r => (r.rating || 0) >= entities.rating!);
  }
  
  return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
}
