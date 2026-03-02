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
