import { cn } from '../../utils/cn';

export const Card = ({ className, ...props }) => (
  <div
    className={cn(
      'rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950/70 via-slate-900/60 to-slate-900/30 p-1 shadow-[0_20px_80px_rgba(15,23,42,0.55)] backdrop-blur-2xl',
      className
    )}
    {...props}
  />
);

export const CardInner = ({ className, ...props }) => (
  <div
    className={cn(
      'rounded-[calc(1.5rem-4px)] bg-slate-900/80 p-6',
      className
    )}
    {...props}
  />
);

export const CardHeader = ({ className, ...props }) => (
  <div className={cn('mb-4', className)} {...props} />
);

export const CardTitle = ({ className, ...props }) => (
  <h3
    className={cn('text-xl font-semibold text-white tracking-tight', className)}
    {...props}
  />
);

export const CardDescription = ({ className, ...props }) => (
  <p
    className={cn('text-sm text-white/70 leading-relaxed', className)}
    {...props}
  />
);

export const CardContent = ({ className, ...props }) => (
  <div className={cn('space-y-4 text-white/80', className)} {...props} />
);

export const CardFooter = ({ className, ...props }) => (
  <div className={cn('mt-6 flex items-center justify-between', className)} {...props} />
);
