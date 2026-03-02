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
