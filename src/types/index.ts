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
