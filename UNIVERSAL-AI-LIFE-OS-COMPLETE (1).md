# 🧠 Universal AI Life OS - المشروع الكامل

## 📂 هيكل المشروع الكامل

انسخ كل ملف في المسار المحدد:

---

## 📁 1. ملفات التكوين الأساسية

### `package.json`
```json
{
  "name": "universal-ai-life-os",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.2.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "framer-motion": "^11.0.0",
    "lucide-react": "^0.400.0",
    "tailwind-merge": "^2.2.0",
    "clsx": "^2.1.0",
    "class-variance-authority": "^0.7.0"
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0"
  }
}
```

---

### `next.config.js`
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'api.dicebear.com']
  }
}
module.exports = nextConfig
```

---

### `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

### `tailwind.config.js`
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      borderRadius: { lg: 'var(--radius)', md: 'calc(var(--radius) - 2px)', sm: 'calc(var(--radius) - 4px)' }
    },
  },
  plugins: [],
}
```

---

### `postcss.config.js`
```javascript
module.exports = {
  plugins: { tailwindcss: {}, autoprefixer: {} }
}
```

---

### `src/app/globals.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 263 70% 50%;
    --primary-foreground: 210 40% 98%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 263 70% 50%;
    --radius: 0.75rem;
  }
}

* { border-color: hsl(var(--border)); }
body { background: hsl(var(--background)); color: hsl(var(--foreground)); }
```

---

## 📁 2. ملفات التطبيق الرئيسية

### `src/app/layout.tsx`
```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Universal AI Life OS - عقلك الرقمي الشخصي',
  description: 'منصة ذكية شاملة للحياة اليومية - بدون APIs خارجية',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

---

## 📁 3. أنواع البيانات (Types)

### `src/types/index.ts`
```typescript
export type IntentType = 'product_search' | 'job_search' | 'service_search' | 'knowledge' | 'website_builder' | 'comparison' | 'recommendation' | 'unknown';

export interface Product {
  id: string; name: string; nameAr: string; brand: string; category: string; categoryAr: string;
  price: number; originalPrice?: number; currency: string; rating: number; reviews: number;
  description: string; descriptionAr: string; specs: string[]; tags: string[]; useCases?: string[];
  image: string; inStock: boolean; featured?: boolean; discount?: number;
}

export interface Job {
  id: string; title: string; titleAr: string; company: string; location: string; locationAr: string;
  type: string; typeAr: string; remote: boolean; salary: { min: number; max: number; currency: string };
  experience: string; skills: string[]; description: string; descriptionAr: string; benefits: string[];
  postedAt: string; applicants: number; featured?: boolean;
}

export interface Service {
  id: string; name: string; nameAr: string; provider: string; category: string; categoryAr: string;
  rating: number; reviews: number; price: { from: number; to: number; currency: string };
  description: string; descriptionAr: string; features: string[]; tags: string[];
  deliveryTime: string; image: string; featured?: boolean;
}

export interface ExtractedEntities {
  category?: string; brand?: string; budget?: { min?: number; max?: number }; useCase?: string;
  rating?: number; location?: string; skills?: string[];
}

export interface UserInteraction {
  id: string; type: 'search' | 'click' | 'view' | 'save' | 'purchase';
  query?: string; intent?: IntentType; itemId?: string; metadata?: Record<string, unknown>; timestamp: number;
}

export interface SearchHistoryItem {
  id: string; query: string; intent: IntentType; timestamp: number;
}

export interface UserPreferences {
  language: 'ar' | 'en'; currency: string; location: string; notifications: boolean;
  interests?: string[]; preferredBrands?: string[]; preferredCategories?: string[];
}

export interface LearningData {
  interactions: UserInteraction[]; searchHistory: SearchHistoryItem[];
  preferences: UserPreferences; lastUpdated: number;
}
```

---

## 📁 4. 🧠 العقل الكامل - Core Brain Engine

### `src/lib/core-brain.ts`

```typescript
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
```

---

## 📁 5. محرك التعلم الذاتي

### `src/lib/learning-engine.ts`

```typescript
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
```

---

## 📁 6. مكتبة المساعدات

### `src/lib/utils.ts`

```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## 📁 7. بيانات المنتجات

### `src/data/products.json`

```json
{
  "products": [
    {
      "id": "prod-001",
      "name": "MacBook Pro 14 M3 Pro",
      "nameAr": "ماك بوك برو 14 M3 Pro",
      "brand": "Apple",
      "category": "laptop",
      "categoryAr": "لابتوبات",
      "price": 8499,
      "originalPrice": 9499,
      "currency": "SAR",
      "rating": 4.9,
      "reviews": 1250,
      "description": "Most advanced Mac laptop with M3 Pro chip",
      "descriptionAr": "أقوى لابتوب ماك مع معالج M3 Pro",
      "specs": ["18GB RAM", "512GB SSD", "14.2 inch Retina XDR"],
      "tags": ["laptop", "apple", "macbook", "programming", "design"],
      "useCases": ["programming", "design", "video-editing"],
      "image": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800",
      "inStock": true,
      "featured": true,
      "discount": 10
    },
    {
      "id": "prod-002",
      "name": "Dell XPS 15",
      "nameAr": "ديل XPS 15",
      "brand": "Dell",
      "category": "laptop",
      "categoryAr": "لابتوبات",
      "price": 6499,
      "originalPrice": 7299,
      "currency": "SAR",
      "rating": 4.7,
      "reviews": 890,
      "description": "Premium Windows laptop with OLED display",
      "descriptionAr": "لابتوب ويندوز فاخر بشاشة OLED",
      "specs": ["32GB RAM", "1TB SSD", "15.6 inch OLED"],
      "tags": ["laptop", "dell", "windows", "programming"],
      "useCases": ["programming", "business"],
      "image": "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800",
      "inStock": true,
      "featured": true
    },
    {
      "id": "prod-003",
      "name": "iPhone 15 Pro Max",
      "nameAr": "آيفون 15 برو ماكس",
      "brand": "Apple",
      "category": "phone",
      "categoryAr": "هواتف",
      "price": 5499,
      "originalPrice": 5999,
      "currency": "SAR",
      "rating": 4.8,
      "reviews": 2340,
      "description": "Most powerful iPhone with A17 Pro chip",
      "descriptionAr": "أقوى آيفون مع معالج A17 Pro",
      "specs": ["256GB", "6.7 inch Super Retina", "A17 Pro"],
      "tags": ["phone", "apple", "iphone", "5g"],
      "useCases": ["photography", "gaming"],
      "image": "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800",
      "inStock": true,
      "featured": true
    },
    {
      "id": "prod-004",
      "name": "Samsung Galaxy S24 Ultra",
      "nameAr": "سامسونج جالكسي S24 ألترا",
      "brand": "Samsung",
      "category": "phone",
      "categoryAr": "هواتف",
      "price": 4999,
      "originalPrice": 5499,
      "currency": "SAR",
      "rating": 4.7,
      "reviews": 1890,
      "description": "Ultimate Android with S Pen",
      "descriptionAr": "تجربة أندرويد مثالية مع قلم S Pen",
      "specs": ["512GB", "6.8 inch AMOLED", "Snapdragon 8 Gen 3"],
      "tags": ["phone", "samsung", "android", "s-pen"],
      "useCases": ["productivity", "photography"],
      "image": "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800",
      "inStock": true,
      "featured": true
    },
    {
      "id": "prod-005",
      "name": "Sony WH-1000XM5",
      "nameAr": "سوني WH-1000XM5",
      "brand": "Sony",
      "category": "headphones",
      "categoryAr": "سماعات",
      "price": 1499,
      "originalPrice": 1799,
      "currency": "SAR",
      "rating": 4.9,
      "reviews": 3200,
      "description": "Best noise cancelling headphones",
      "descriptionAr": "أفضل سماعات بإلغاء الضوضاء",
      "specs": ["30h Battery", "ANC", "LDAC"],
      "tags": ["headphones", "sony", "wireless", "anc"],
      "useCases": ["music", "work", "travel"],
      "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
      "inStock": true,
      "featured": false
    },
    {
      "id": "prod-006",
      "name": "ASUS ROG Zephyrus G16",
      "nameAr": "أسوس ROG Zephyrus G16",
      "brand": "ASUS",
      "category": "laptop",
      "categoryAr": "لابتوبات",
      "price": 7999,
      "originalPrice": 8999,
      "currency": "SAR",
      "rating": 4.8,
      "reviews": 567,
      "description": "Gaming laptop with RTX 4080",
      "descriptionAr": "لابتوب للألعاب مع RTX 4080",
      "specs": ["32GB RAM", "1TB SSD", "RTX 4080"],
      "tags": ["laptop", "asus", "gaming", "rog"],
      "useCases": ["gaming", "streaming"],
      "image": "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800",
      "inStock": true,
      "featured": false
    }
  ]
}
```

---

## 📁 8. بيانات الوظائف

### `src/data/jobs.json`

```json
{
  "jobs": [
    {
      "id": "job-001",
      "title": "Senior Frontend Developer",
      "titleAr": "مطور واجهات أمامية أول",
      "company": "Apple",
      "location": "Dubai, UAE",
      "locationAr": "دبي، الإمارات",
      "type": "Full-time",
      "typeAr": "دوام كامل",
      "remote": true,
      "salary": { "min": 25000, "max": 35000, "currency": "AED" },
      "experience": "5+ years",
      "skills": ["React", "TypeScript", "Next.js", "TailwindCSS"],
      "description": "Join Apple's web team",
      "descriptionAr": "انضم لفريق ويب آبل",
      "benefits": ["Health Insurance", "Stock Options", "Remote Work"],
      "postedAt": "2024-01-15",
      "applicants": 145,
      "featured": true
    },
    {
      "id": "job-002",
      "title": "Full Stack Engineer",
      "titleAr": "مهندس تطوير شامل",
      "company": "Google",
      "location": "Riyadh, Saudi Arabia",
      "locationAr": "الرياض، السعودية",
      "type": "Full-time",
      "typeAr": "دوام كامل",
      "remote": true,
      "salary": { "min": 20000, "max": 30000, "currency": "SAR" },
      "experience": "3+ years",
      "skills": ["Node.js", "React", "Python", "AWS"],
      "description": "Build scalable applications",
      "descriptionAr": "بناء تطبيقات قابلة للتوسع",
      "benefits": ["Health Insurance", "Stock Options"],
      "postedAt": "2024-01-10",
      "applicants": 230,
      "featured": true
    },
    {
      "id": "job-003",
      "title": "AI/ML Engineer",
      "titleAr": "مهندس ذكاء اصطناعي",
      "company": "OpenAI",
      "location": "Remote",
      "locationAr": "عن بعد",
      "type": "Full-time",
      "typeAr": "دوام كامل",
      "remote": true,
      "salary": { "min": 180000, "max": 280000, "currency": "USD" },
      "experience": "4+ years",
      "skills": ["Python", "PyTorch", "TensorFlow", "NLP"],
      "description": "Work on cutting-edge AI",
      "descriptionAr": "العمل على نماذج AI متقدمة",
      "benefits": ["Health Insurance", "Unlimited PTO"],
      "postedAt": "2024-01-05",
      "applicants": 567,
      "featured": true
    }
  ]
}
```

---

## 📁 9. بيانات الخدمات

### `src/data/services.json`

```json
{
  "services": [
    {
      "id": "srv-001",
      "name": "Website Development",
      "nameAr": "تطوير المواقع",
      "provider": "TechPro Agency",
      "category": "development",
      "categoryAr": "تطوير",
      "rating": 4.9,
      "reviews": 234,
      "price": { "from": 5000, "to": 50000, "currency": "SAR" },
      "description": "Professional website development",
      "descriptionAr": "تطوير مواقع احترافية",
      "features": ["Custom Design", "Responsive", "SEO"],
      "tags": ["website", "development", "web-design"],
      "deliveryTime": "2-8 weeks",
      "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
      "featured": true
    },
    {
      "id": "srv-002",
      "name": "Mobile App Development",
      "nameAr": "تطوير تطبيقات الجوال",
      "provider": "AppMasters",
      "category": "development",
      "categoryAr": "تطوير",
      "rating": 4.8,
      "reviews": 178,
      "price": { "from": 15000, "to": 150000, "currency": "SAR" },
      "description": "Native and cross-platform apps",
      "descriptionAr": "تطبيقات أصلية وعابرة للمنصات",
      "features": ["iOS & Android", "UI/UX Design", "Backend"],
      "tags": ["mobile", "app", "ios", "android"],
      "deliveryTime": "4-16 weeks",
      "image": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800",
      "featured": true
    },
    {
      "id": "srv-003",
      "name": "UI/UX Design",
      "nameAr": "تصميم واجهات المستخدم",
      "provider": "DesignHub",
      "category": "design",
      "categoryAr": "تصميم",
      "rating": 4.9,
      "reviews": 312,
      "price": { "from": 2000, "to": 25000, "currency": "SAR" },
      "description": "User-centered design",
      "descriptionAr": "تصميم يركز على المستخدم",
      "features": ["User Research", "Prototyping", "Design System"],
      "tags": ["design", "ui", "ux", "figma"],
      "deliveryTime": "1-4 weeks",
      "image": "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800",
      "featured": true
    }
  ]
}
```

---

## 📁 10. API Routes

### `src/app/api/analyze-request/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { analyzeQuery } from '@/lib/core-brain';
import { saveSearchHistory } from '@/lib/learning-engine';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query } = body;
    
    if (!query) {
      return NextResponse.json({ success: false, error: 'Query required' }, { status: 400 });
    }

    const analysis = await analyzeQuery(query);
    
    saveSearchHistory({
      id: `search-${Date.now()}`,
      query,
      intent: analysis.intent,
      timestamp: Date.now()
    });

    return NextResponse.json({ success: true, data: analysis });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Analysis failed' }, { status: 500 });
  }
}
```

---

### `src/app/api/route-request/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import productsData from '@/data/products.json';
import jobsData from '@/data/jobs.json';
import servicesData from '@/data/services.json';
import { IntentType, ExtractedEntities, Product, Job, Service } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, intent, entities }: { query: string; intent: IntentType; entities: ExtractedEntities } = body;
    
    if (!query) {
      return NextResponse.json({ success: false, error: 'Query required' }, { status: 400 });
    }

    let results: (Product | Job | Service)[] = [];

    switch (intent) {
      case 'product_search':
      case 'comparison':
      case 'recommendation':
        results = searchProducts(query, entities);
        break;
      case 'job_search':
        results = searchJobs(query, entities);
        break;
      case 'service_search':
      case 'website_builder':
        results = searchServices(query, entities);
        break;
      default:
        results = [
          ...searchProducts(query, entities).slice(0, 3),
          ...searchJobs(query, entities).slice(0, 3),
          ...searchServices(query, entities).slice(0, 3)
        ];
    }

    return NextResponse.json({ success: true, data: { results, totalResults: results.length } });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Routing failed' }, { status: 500 });
  }
}

function searchProducts(query: string, entities: ExtractedEntities): Product[] {
  let products = [...productsData.products] as Product[];
  const q = query.toLowerCase();
  
  products = products.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.nameAr.includes(query) ||
    p.tags.some(t => t.toLowerCase().includes(q)) ||
    p.brand.toLowerCase().includes(q)
  );
  
  if (entities.category) products = products.filter(p => p.category === entities.category);
  if (entities.brand) products = products.filter(p => p.brand.toLowerCase() === entities.brand!.toLowerCase());
  if (entities.budget?.max) products = products.filter(p => p.price <= entities.budget!.max!);
  
  return products.sort((a, b) => b.rating - a.rating).slice(0, 12);
}

function searchJobs(query: string, entities: ExtractedEntities): Job[] {
  let jobs = [...jobsData.jobs] as Job[];
  const q = query.toLowerCase();
  
  jobs = jobs.filter(j =>
    j.title.toLowerCase().includes(q) ||
    j.titleAr.includes(query) ||
    j.skills.some(s => s.toLowerCase().includes(q))
  );
  
  return jobs.sort((a, b) => (a.featured ? -1 : 1) - (b.featured ? -1 : 1)).slice(0, 10);
}

function searchServices(query: string, entities: ExtractedEntities): Service[] {
  let services = [...servicesData.services] as Service[];
  const q = query.toLowerCase();
  
  services = services.filter(s =>
    s.name.toLowerCase().includes(q) ||
    s.nameAr.includes(query) ||
    s.tags.some(t => t.toLowerCase().includes(q))
  );
  
  return services.sort((a, b) => b.rating - a.rating).slice(0, 10);
}
```

---

## 📁 11. UI Components

### `src/components/ui/button.tsx`

```tsx
import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-violet-600 text-white hover:bg-violet-700': variant === 'default',
            'bg-red-500 text-white hover:bg-red-600': variant === 'destructive',
            'border border-white/20 bg-transparent hover:bg-white/10': variant === 'outline',
            'bg-slate-700 text-white hover:bg-slate-600': variant === 'secondary',
            'hover:bg-white/10': variant === 'ghost',
            'text-violet-400 underline-offset-4 hover:underline': variant === 'link',
          },
          {
            'h-10 px-4 py-2': size === 'default',
            'h-9 rounded-md px-3': size === 'sm',
            'h-11 rounded-md px-8': size === 'lg',
            'h-10 w-10': size === 'icon',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
```

---

### `src/components/ui/card.tsx`

```tsx
import * as React from 'react';
import { cn } from '@/lib/utils';

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('rounded-xl border border-white/10 bg-slate-800/50 text-white shadow-sm', className)}
      {...props}
    />
  )
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn('text-xl font-semibold leading-none tracking-tight', className)} {...props} />
  )
);
CardTitle.displayName = 'CardTitle';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

export { Card, CardHeader, CardTitle, CardContent };
```

---

### `src/components/ui/badge.tsx`

```tsx
import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
        {
          'bg-violet-500/20 text-violet-300': variant === 'default',
          'bg-slate-700 text-slate-300': variant === 'secondary',
          'bg-red-500/20 text-red-300': variant === 'destructive',
          'border border-white/20 text-white': variant === 'outline',
        },
        className
      )}
      {...props}
    />
  );
}

export { Badge };
```

---

### `src/components/ui/input.tsx`

```tsx
import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-lg border border-white/10 bg-slate-800/50 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
```

---

### `src/components/ui/avatar.tsx`

```tsx
import * as React from 'react';
import { cn } from '@/lib/utils';

const Avatar = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)}
      {...props}
    />
  )
);
Avatar.displayName = 'Avatar';

const AvatarImage = React.forwardRef<HTMLImageElement, React.ImgHTMLAttributes<HTMLImageElement>>(
  ({ className, ...props }, ref) => (
    <img ref={ref} className={cn('aspect-square h-full w-full object-cover', className)} {...props} />
  )
);
AvatarImage.displayName = 'AvatarImage';

const AvatarFallback = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn('flex h-full w-full items-center justify-center rounded-full bg-slate-700', className)}
      {...props}
    />
  )
);
AvatarFallback.displayName = 'AvatarFallback';

export { Avatar, AvatarImage, AvatarFallback };
```

---

## 📁 12. مكونات التطبيق

### `src/components/SearchBar.tsx`

```tsx
'use client';

import { useState, useCallback } from 'react';
import { Search, Loader2, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  className?: string;
}

export function SearchBar({ onSearch, isLoading = false, placeholder = 'ابحث...', className = '' }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) onSearch(query.trim());
  }, [query, isLoading, onSearch]);

  const toggleVoice = useCallback(() => {
    const SR = typeof window !== 'undefined' ? (window.SpeechRecognition || window.webkitSpeechRecognition) : null;
    if (!SR) return;
    if (isListening) { setIsListening(false); return; }
    const rec = new SR();
    rec.continuous = false;
    rec.interimResults = false;
    rec.lang = 'ar-SA';
    rec.onstart = () => setIsListening(true);
    rec.onresult = (e) => { const t = e.results[0][0].transcript; setQuery(t); if (t.trim()) onSearch(t.trim()); setIsListening(false); };
    rec.onerror = rec.onend = () => setIsListening(false);
    try { rec.start(); } catch { setIsListening(false); }
  }, [isListening, onSearch]);

  return (
    <form onSubmit={handleSubmit} className={cn('w-full', className)}>
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            disabled={isLoading}
            className="h-16 pr-14 pl-4 text-lg bg-slate-800/50 border-2 border-white/10 rounded-2xl focus:border-violet-500/50"
            dir="rtl"
          />
        </div>
        <Button type="button" size="icon" variant="outline" onClick={toggleVoice} disabled={isLoading}
          className={cn('h-16 w-16 rounded-2xl border-2', isListening ? 'bg-red-500/20 border-red-500/50 animate-pulse' : 'bg-slate-800/50 border-white/10')}>
          <Mic className="h-6 w-6" />
        </Button>
        <Button type="submit" size="lg" disabled={!query.trim() || isLoading}
          className="h-16 px-10 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-bold text-lg">
          {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : 'بحث'}
        </Button>
      </div>
      <p className="mt-3 text-sm text-slate-400 text-center">
        💡 جرّب: "أريد لابتوب للبرمجة" أو "وظيفة مطور عن بعد"
      </p>
    </form>
  );
}
```

---

### `src/components/ProductCard.tsx`

```tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types';
import { cn } from '@/lib/utils';
import { recordInteraction } from '@/lib/learning-engine';

interface Props { product: Product; language?: 'ar' | 'en'; }

export function ProductCard({ product, language = 'ar' }: Props) {
  const [liked, setLiked] = useState(false);
  const name = language === 'ar' ? product.nameAr : product.name;
  const desc = language === 'ar' ? product.descriptionAr : product.description;

  return (
    <motion.div whileHover={{ y: -4 }}>
      <Card className="group hover:border-violet-500/30 transition-all overflow-hidden cursor-pointer"
        onClick={() => recordInteraction({ type: 'click', itemId: product.id, metadata: { brand: product.brand, price: product.price } })}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <img src={product.image} alt={name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            {product.featured && <Badge className="bg-amber-500 text-white">⭐ مميز</Badge>}
            {product.discount && <Badge className="bg-green-500 text-white">خصم {product.discount}%</Badge>}
          </div>
          <Button size="icon" variant="secondary" className="absolute top-3 left-3 h-9 w-9 rounded-full bg-white/90 opacity-0 group-hover:opacity-100"
            onClick={(e) => { e.stopPropagation(); setLiked(!liked); recordInteraction({ type: 'save', itemId: product.id }); }}>
            <Heart className={cn('h-4 w-4', liked && 'fill-red-500 text-red-500')} />
          </Button>
        </div>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="border-violet-500/30 text-violet-400">{product.brand}</Badge>
            <span className="text-xs text-slate-400">{product.categoryAr}</span>
          </div>
          <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-violet-400">{name}</h3>
          <p className="text-sm text-slate-400 line-clamp-2 mb-3">{desc}</p>
          <div className="flex items-center gap-2 mb-3">
            {[...Array(5)].map((_, i) => <Star key={i} className={cn('h-4 w-4', i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-600')} />)}
            <span className="text-sm text-amber-400">{product.rating}</span>
          </div>
          <div className="flex items-center justify-between">
            <div><span className="text-2xl font-bold">{product.price.toLocaleString()}</span> <span className="text-sm text-slate-400">ريال</span></div>
            <Button size="sm" className="bg-gradient-to-r from-violet-600 to-blue-600"><ShoppingCart className="h-4 w-4 ml-1" />شراء</Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
```

---

### `src/components/JobCard.tsx`

```tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, Clock, DollarSign, Heart, Users, Building2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Job } from '@/types';
import { cn } from '@/lib/utils';
import { recordInteraction } from '@/lib/learning-engine';

interface Props { job: Job; language?: 'ar' | 'en'; }

export function JobCard({ job, language = 'ar' }: Props) {
  const [liked, setLiked] = useState(false);
  const title = language === 'ar' ? job.titleAr : job.title;
  const loc = language === 'ar' ? job.locationAr : job.location;
  const curr = job.salary.currency === 'SAR' ? 'ريال' : job.salary.currency === 'AED' ? 'درهم' : '$';

  return (
    <motion.div whileHover={{ y: -4 }}>
      <Card className="group hover:border-blue-500/30 transition-all">
        <CardContent className="p-5">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-blue-500/20 flex items-center justify-center"><Building2 className="h-7 w-7 text-blue-400" /></div>
              <div><h3 className="font-bold text-lg group-hover:text-blue-400">{title}</h3><p className="text-slate-400 text-sm">{job.company}</p></div>
            </div>
            <Button size="icon" variant="ghost" className="rounded-full" onClick={() => { setLiked(!liked); recordInteraction({ type: 'save', itemId: job.id }); }}>
              <Heart className={cn('h-5 w-5', liked && 'fill-red-500 text-red-500')} />
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-slate-400">
            <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{loc}</span>
            <span className="flex items-center gap-1"><Briefcase className="h-4 w-4" />{job.typeAr}</span>
            {job.remote && <Badge variant="outline" className="text-green-400 border-green-500/30">عن بعد</Badge>}
          </div>
          <div className="flex flex-wrap gap-2 mb-4">{job.skills.slice(0, 5).map((s, i) => <Badge key={i} variant="secondary" className="text-xs bg-slate-700/50">{s}</Badge>)}</div>
          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <div className="flex items-center gap-1"><DollarSign className="h-4 w-4 text-green-400" /><span className="font-bold">{job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()} {curr}</span></div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-slate-400 text-sm"><Users className="h-4 w-4" />{job.applicants} متقدم</span>
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-cyan-600" onClick={() => recordInteraction({ type: 'click', itemId: job.id })}>تقديم</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
```

---

### `src/components/ServiceCard.tsx`

```tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Star, Heart, CheckCircle2, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Service } from '@/types';
import { cn } from '@/lib/utils';
import { recordInteraction } from '@/lib/learning-engine';

interface Props { service: Service; language?: 'ar' | 'en'; }

export function ServiceCard({ service, language = 'ar' }: Props) {
  const [liked, setLiked] = useState(false);
  const name = language === 'ar' ? service.nameAr : service.name;
  const curr = service.price.currency === 'SAR' ? 'ريال' : service.price.currency;

  return (
    <motion.div whileHover={{ y: -4 }}>
      <Card className="group hover:border-emerald-500/30 transition-all overflow-hidden">
        <div className="relative aspect-video overflow-hidden">
          <img src={service.image} alt={name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          {service.featured && <Badge className="absolute top-3 right-3 bg-amber-500 text-white">⭐ مميز</Badge>}
          <Button size="icon" variant="secondary" className="absolute top-3 left-3 h-9 w-9 rounded-full bg-white/90 opacity-0 group-hover:opacity-100"
            onClick={() => { setLiked(!liked); recordInteraction({ type: 'save', itemId: service.id }); }}>
            <Heart className={cn('h-4 w-4', liked && 'fill-red-500 text-red-500')} />
          </Button>
        </div>
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-emerald-400">{service.provider}</span>
            <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-amber-400 text-amber-400" />{service.rating}</span>
          </div>
          <h3 className="font-bold text-lg mb-2 group-hover:text-emerald-400">{name}</h3>
          <div className="space-y-2 mb-4">{service.features.slice(0, 3).map((f, i) => <div key={i} className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-emerald-400" /><span className="text-slate-300">{f}</span></div>)}</div>
          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <div><span className="text-xs text-slate-400">يبدأ من</span><br /><span className="font-bold text-lg">{service.price.from.toLocaleString()} {curr}</span></div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-slate-400 text-sm"><Clock className="h-4 w-4" />{service.deliveryTime}</span>
              <Button size="sm" className="bg-gradient-to-r from-emerald-600 to-green-600" onClick={() => recordInteraction({ type: 'click', itemId: service.id })}>طلب<ArrowRight className="h-4 w-4 mr-1" /></Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
```

---

### `src/components/UserDashboard.tsx`

```tsx
'use client';

import { useMemo } from 'react';
import { User, Search, Eye, Heart, History, Sparkles } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getRecentSearches, getUserStats, getUserInterests } from '@/lib/learning-engine';

interface Props { language?: 'ar' | 'en'; onSearchClick?: (q: string) => void; }

export function UserDashboard({ language = 'ar', onSearchClick }: Props) {
  const searches = useMemo(() => getRecentSearches(5), []);
  const stats = useMemo(() => getUserStats(), []);
  const interests = useMemo(() => getUserInterests(), []);
  const labels: Record<string, string> = { product_search: 'منتجات', job_search: 'وظائف', service_search: 'خدمات' };

  return (
    <Card className="bg-slate-800/30 border-white/5">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14 ring-2 ring-violet-500/30">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
            <AvatarFallback className="bg-violet-600 text-white"><User className="h-7 w-7" /></AvatarFallback>
          </Avatar>
          <div><CardTitle className="text-lg">{language === 'ar' ? 'مرحباً بك' : 'Welcome'}</CardTitle><p className="text-slate-400 text-sm">{language === 'ar' ? 'مستخدم ذكي' : 'Smart User'}</p></div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          {[[Search, stats.totalSearches, 'violet'], [Eye, stats.totalViews, 'blue'], [Heart, stats.totalClicks, 'emerald']].map(([Icon, val, color], i) => (
            <div key={i} className={`flex flex-col items-center p-3 rounded-xl bg-${color}-500/10 border border-${color}-500/20`}>
              <Icon className={`h-4 w-4 text-${color}-400 mb-1`} />
              <span className={`text-lg font-bold text-${color}-400`}>{val}</span>
              <span className="text-xs text-slate-400">{i === 0 ? 'بحث' : i === 1 ? 'مشاهدة' : 'نقر'}</span>
            </div>
          ))}
        </div>
        {interests.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2"><Sparkles className="h-4 w-4 text-violet-400" /><span className="text-sm font-medium">اهتماماتك</span></div>
            <div className="flex flex-wrap gap-1.5">{interests.slice(0, 6).map((i, idx) => <Badge key={idx} variant="secondary" className="text-xs bg-violet-500/10 text-violet-300">{i.interest}</Badge>)}</div>
          </div>
        )}
        <div>
          <div className="flex items-center gap-2 mb-2"><History className="h-4 w-4 text-slate-400" /><span className="text-sm font-medium">البحث الأخير</span></div>
          <div className="space-y-1">
            {searches.length > 0 ? searches.map(s => (
              <div key={s.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 cursor-pointer" onClick={() => onSearchClick?.(s.query)}>
                <span className="text-sm truncate">{s.query}</span>
                <Badge variant="outline" className="text-xs">{labels[s.intent] || s.intent}</Badge>
              </div>
            )) : <p className="text-sm text-slate-500 text-center py-2">لا توجد عمليات بحث</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
```

---

## 📁 13. الصفحة الرئيسية

### `src/app/page.tsx`

```tsx
'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, Brain, TrendingUp, Search, Loader2, X, Grid3X3, List, ShoppingBag, Briefcase, Wrench, Star, Settings, Bell } from 'lucide-react';
import { SearchBar } from '@/components/SearchBar';
import { UserDashboard } from '@/components/UserDashboard';
import { ProductCard } from '@/components/ProductCard';
import { JobCard } from '@/components/JobCard';
import { ServiceCard } from '@/components/ServiceCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Product, Job, Service, IntentType } from '@/types';
import { recordInteraction, saveSearchHistory } from '@/lib/learning-engine';
import { cn } from '@/lib/utils';

const intentConfig: Record<IntentType, { icon: React.ReactNode; gradient: string; label: string }> = {
  product_search: { icon: <ShoppingBag className="h-5 w-5" />, gradient: 'from-violet-500 to-purple-600', label: 'منتجات' },
  job_search: { icon: <Briefcase className="h-5 w-5" />, gradient: 'from-blue-500 to-cyan-500', label: 'وظائف' },
  service_search: { icon: <Wrench className="h-5 w-5" />, gradient: 'from-emerald-500 to-green-500', label: 'خدمات' },
  knowledge: { icon: <Search className="h-5 w-5" />, gradient: 'from-amber-500 to-orange-500', label: 'معلومات' },
  website_builder: { icon: <Wrench className="h-5 w-5" />, gradient: 'from-pink-500 to-rose-500', label: 'موقع' },
  comparison: { icon: <Sparkles className="h-5 w-5" />, gradient: 'from-indigo-500 to-violet-500', label: 'مقارنة' },
  recommendation: { icon: <Star className="h-5 w-5" />, gradient: 'from-yellow-500 to-amber-500', label: 'توصيات' },
  unknown: { icon: <Search className="h-5 w-5" />, gradient: 'from-gray-500 to-slate-500', label: 'بحث' }
};

const quickActions = [
  { icon: <ShoppingBag className="h-4 w-4" />, text: 'أحتاج لابتوب للبرمجة' },
  { icon: <Briefcase className="h-4 w-4" />, text: 'أبحث عن وظيفة مطور عن بعد' },
  { icon: <Wrench className="h-4 w-4" />, text: 'أريد إنشاء موقع إلكتروني' },
  { icon: <Star className="h-4 w-4" />, text: 'أفضل هاتف ذكي 2024' }
];

type SearchResult = Product | Job | Service;

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [analysis, setAnalysis] = useState<{ intent: IntentType; confidence: number; suggestedActions: string[] } | null>(null);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleSearch = useCallback(async (query: string) => {
    setSearchQuery(query);
    setIsLoading(true);
    setResults([]);
    setAnalysis(null);
    
    try {
      const res1 = await fetch('/api/analyze-request', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query }) });
      const data1 = await res1.json();
      if (data1.success) {
        setAnalysis(data1.data);
        saveSearchHistory({ id: `search-${Date.now()}`, query, intent: data1.data.intent, timestamp: Date.now() });
        recordInteraction({ type: 'search', query, intent: data1.data.intent });
        
        const res2 = await fetch('/api/route-request', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query, intent: data1.data.intent, entities: data1.data.entities }) });
        const data2 = await res2.json();
        if (data2.success) setResults(data2.data.results || []);
      }
    } catch (e) { console.error(e); } finally { setIsLoading(false); }
  }, []);

  const renderCard = useCallback((item: SearchResult, i: number) => {
    const delay = i * 0.05;
    if (analysis?.intent === 'job_search' && 'company' in item) return <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}><JobCard job={item as Job} /></motion.div>;
    if (analysis?.intent === 'service_search' && 'provider' in item) return <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}><ServiceCard service={item as Service} /></motion.div>;
    if ('brand' in item) return <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}><ProductCard product={item as Product} /></motion.div>;
    return null;
  }, [analysis]);

  const current = analysis ? intentConfig[analysis.intent] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-[128px] animate-pulse" />
      </div>
      
      <div className="relative z-10">
        <header className="border-b border-white/5 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative"><div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-blue-500 blur-lg opacity-40" /><Brain className="relative h-10 w-10 text-violet-400" /></div>
              <div><h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">Universal AI Life OS</h1><p className="text-xs text-slate-400">عقلك الرقمي الشخصي - بدون APIs خارجية</p></div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative"><Bell className="h-5 w-5 text-slate-400" /><span className="absolute top-1 right-1 h-2 w-2 bg-violet-500 rounded-full" /></Button>
              <Button variant="ghost" size="icon"><Settings className="h-5 w-5 text-slate-400" /></Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <aside className="lg:col-span-3 space-y-4">
              <UserDashboard onSearchClick={handleSearch} />
              <Card className="bg-slate-800/30 border-white/5">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-4"><Zap className="h-4 w-4 text-amber-400" /><span className="font-medium text-sm">إجراءات سريعة</span></div>
                  <div className="space-y-2">{quickActions.map((a, i) => <Button key={i} variant="ghost" className="w-full justify-start gap-3 h-auto py-3" onClick={() => handleSearch(a.text)}><span className="text-violet-400">{a.icon}</span><span className="text-sm text-slate-300">{a.text}</span></Button>)}</div>
                </CardContent>
              </Card>
            </aside>

            <main className="lg:col-span-9 space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-blue-500/10 rounded-3xl blur-xl" />
                <Card className="relative bg-slate-800/30 border-white/5"><CardContent className="p-6"><SearchBar onSearch={handleSearch} isLoading={isLoading} placeholder="ابحث عن أي شيء... منتجات، وظائف، خدمات" /></CardContent></Card>
              </motion.div>

              <AnimatePresence>{analysis && current && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                  <Card className={`bg-gradient-to-r ${current.gradient} border-0`}>
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4"><div className="p-3 bg-white/20 rounded-xl">{current.icon}</div><div className="text-white"><Badge className="bg-white/20 text-white border-0">{current.label}</Badge><span className="text-sm opacity-80 mr-2">ثقة {(analysis.confidence * 100).toFixed(0)}%</span><p className="text-white/80 text-sm mt-1">"{searchQuery}"</p></div></div>
                      <Button variant="ghost" size="icon" onClick={() => { setAnalysis(null); setResults([]); }} className="text-white/60 hover:text-white"><X className="h-5 w-5" /></Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )}</AnimatePresence>

              <AnimatePresence>{isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-20 text-center">
                  <div className="relative inline-block"><div className="absolute inset-0 bg-violet-500 blur-2xl opacity-30 animate-pulse" /><Loader2 className="relative h-16 w-16 animate-spin text-violet-400" /></div>
                  <p className="mt-6 text-slate-400">جاري تحليل طلبك...</p>
                  <p className="mt-2 text-sm text-slate-500">🧠 يعمل الذكاء الاصطناعي المحلي 100%</p>
                </motion.div>
              )}</AnimatePresence>

              <AnimatePresence>{!isLoading && results.length > 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3"><span className="text-xl font-bold">{results.length} نتيجة</span><Badge className="bg-violet-500/20 text-violet-400"><TrendingUp className="h-3 w-3 ml-1" />مرتبة بالصلة</Badge></div>
                    <div className="flex border border-white/10 rounded-lg overflow-hidden">
                      <Button variant={viewMode === 'grid' ? 'default' : 'ghost'} size="icon" onClick={() => setViewMode('grid')} className="rounded-none"><Grid3X3 className="h-4 w-4" /></Button>
                      <Button variant={viewMode === 'list' ? 'default' : 'ghost'} size="icon" onClick={() => setViewMode('list')} className="rounded-none"><List className="h-4 w-4" /></Button>
                    </div>
                  </div>
                  <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4' : 'space-y-4'}>{results.map((item, i) => renderCard(item, i))}</div>
                </motion.div>
              )}</AnimatePresence>

              <AnimatePresence>{!isLoading && !searchQuery && results.length === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[{ icon: <ShoppingBag className="h-8 w-8" />, title: 'البحث عن المنتجات', desc: 'ابحث عن أي منتج', action: 'أحتاج لابتوب للبرمجة' }, { icon: <Briefcase className="h-8 w-8" />, title: 'البحث عن الوظائف', desc: 'ابحث عن وظائف', action: 'أبحث عن وظيفة مطور' }, { icon: <Wrench className="h-8 w-8" />, title: 'البحث عن الخدمات', desc: 'اعثر على خدمات', action: 'أحتاج خدمة تصميم' }].map((f, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                      <Card className="h-full cursor-pointer group bg-slate-800/30 border-white/5 hover:border-white/20 transition-all" onClick={() => handleSearch(f.action)}>
                        <CardContent className="p-6 text-center h-full flex flex-col justify-between">
                          <div><div className="inline-block mb-4 text-violet-400 group-hover:scale-110 transition-transform">{f.icon}</div><h3 className="font-bold text-lg mb-2">{f.title}</h3><p className="text-sm text-slate-400">{f.desc}</p></div>
                          <Button variant="link" className="mt-4 text-violet-400">جرّب الآن</Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              )}</AnimatePresence>

              <AnimatePresence>{!isLoading && searchQuery && results.length === 0 && analysis && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-20 text-center">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold mb-2">لم يتم العثور على نتائج</h3>
                  <p className="text-slate-400 mb-6">جرب البحث بكلمات مختلفة</p>
                  <div className="flex flex-wrap justify-center gap-2">{quickActions.map((a, i) => <Button key={i} variant="outline" onClick={() => handleSearch(a.text)} className="border-white/10">{a.icon}<span className="ml-2">{a.text}</span></Button>)}</div>
                </motion.div>
              )}</AnimatePresence>
            </main>
          </div>
        </div>

        <footer className="border-t border-white/5 mt-12 py-6">
          <div className="container mx-auto px-4 text-center">
            <p className="text-slate-500 text-sm">🧠 مدعوم بالذكاء الاصطناعي المحلي 100% • Universal AI Life OS</p>
            <p className="text-slate-600 text-xs mt-1">بدون APIs خارجية • خصوصية كاملة • سريع وآمن</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
```

---

## ✅ تعليمات النشر على GitHub و Railway

### 1. إنشاء المشروع محلياً

```bash
mkdir universal-ai-life-os
cd universal-ai-life-os

# إنشاء الهيكل
mkdir -p src/app/api/analyze-request src/app/api/route-request
mkdir -p src/components/ui src/lib src/data src/types

# نسخ كل ملف في المسار الصحيح
```

### 2. تثبيت المكتبات

```bash
npm init -y
npm install next react react-dom framer-motion lucide-react tailwind-merge clsx class-variance-authority
npm install -D typescript tailwindcss postcss autoprefixer @types/node @types/react @types/react-dom
```

### 3. رفع على GitHub

```bash
git init
git add .
git commit -m "Universal AI Life OS - Complete"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/universal-ai-life-os.git
git push -u origin main
```

### 4. النشر على Railway

1. اذهب إلى railway.app
2. اربط حساب GitHub
3. اختر المستودع `universal-ai-life-os`
4. Railway سيكتشف Next.js تلقائياً
5. انقر Deploy

---

## 🎯 ملخص المشروع

| المكون | الحالة |
|--------|--------|
| 🧠 Core Brain Engine | ✅ كامل |
| 🔍 Intent Detection | ✅ كامل |
| 📦 Entity Extraction | ✅ كامل |
| 📚 Learning Engine | ✅ كامل |
| 🔄 Router Engine | ✅ كامل |
| 📦 بيانات المنتجات | ✅ 6 منتجات |
| 💼 بيانات الوظائف | ✅ 3 وظائف |
| ⚙️ بيانات الخدمات | ✅ 3 خدمات |
| 🎨 UI Components | ✅ كامل |
| 🔌 APIs | ✅ كامل |
| 🚀 جاهز للنشر | ✅ نعم |

---

## 🧠 ملاحظة عن "العقل"

**العقل موجود بالكامل في ملف `src/lib/core-brain.ts`** ويتضمن:

1. **Intent Detection Model** - يتعرف على نوع الطلب
2. **Entity Extraction Model** - يستخرج المعلومات المهمة
3. **Language Detection** - يكشف اللغة
4. **Router Engine** - يوجه الطلب للمحرك المناسب
5. **Prioritization Engine** - يرتب النتائج

**كل هذا بدون أي API خارجي!** 🎉
