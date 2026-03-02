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
