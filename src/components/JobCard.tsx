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
