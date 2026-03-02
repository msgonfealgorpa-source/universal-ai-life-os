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
