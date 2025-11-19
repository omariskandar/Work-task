import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

const variantClasses = {
  default:
    'bg-[#0ea5e9] text-white font-semibold shadow-[0_10px_35px_rgba(14,165,233,0.35)] hover:bg-[#0284c7] hover:shadow-[0_18px_45px_rgba(14,165,233,0.45)] hover:translate-y-[-1px]',
  secondary:
    'bg-white/10 text-white border border-white/10 hover:bg-white/20 hover:text-white',
  outline:
    'border border-white/20 bg-transparent text-white hover:bg-white/10',
  ghost: 'bg-transparent text-white hover:bg-white/10',
  destructive:
    'bg-gradient-to-r from-[#ef4444] to-[#f97316] text-white hover:shadow-[0_10px_30px_rgba(239,68,68,0.45)]'
};

const sizeClasses = {
  sm: 'h-9 px-4 text-xs',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
  icon: 'h-10 w-10'
};

const Button = forwardRef(({ className, variant = 'default', size = 'md', ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-xl font-medium tracking-tight transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712] disabled:pointer-events-none disabled:opacity-50',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    />
  );
});

Button.displayName = 'Button';

export default Button;
