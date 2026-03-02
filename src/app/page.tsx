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
