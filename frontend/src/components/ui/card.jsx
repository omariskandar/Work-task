import { cn } from '../../utils/cn';

export const Card = ({ className, ...props }) => (
  <div
    className={cn(
      'rounded-xl border border-[#E5E7EB] bg-white shadow-sm hover:shadow-md transition-shadow duration-200',
      className
    )}
    {...props}
  />
);

export const CardInner = ({ className, ...props }) => (
  <div
    className={cn(
      'rounded-[calc(0.75rem-1px)] bg-white p-6',
      className
    )}
    {...props}
  />
);

export const CardHeader = ({ className, ...props }) => (
  <div className={cn('mb-6', className)} {...props} />
);

export const CardTitle = ({ className, ...props }) => (
  <h3
    className={cn('text-xl font-semibold text-[#111827] tracking-tight', className)}
    {...props}
  />
);

export const CardDescription = ({ className, ...props }) => (
  <p
    className={cn('text-sm text-[#6B7280] leading-relaxed mt-1.5', className)}
    {...props}
  />
);

export const CardContent = ({ className, ...props }) => (
  <div className={cn('space-y-4 text-[#374151]', className)} {...props} />
);

export const CardFooter = ({ className, ...props }) => (
  <div className={cn('mt-6 flex items-center justify-between', className)} {...props} />
);
