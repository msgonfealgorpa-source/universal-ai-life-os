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
