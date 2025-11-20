import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

const variantClasses = {
  default: 'bg-[#3B82F6] text-white hover:bg-[#2563EB]',
  secondary:
    'bg-white text-[#111827] border border-[#E5E7EB] hover:bg-[#F3F4F6]',
  outline:
    'border border-[#E5E7EB] bg-transparent text-[#111827] hover:bg-[#F3F4F6]',
  ghost: 'bg-transparent text-[#374151] hover:bg-[#E5E7EB]',
  destructive:
    'bg-[#DC2626] text-white hover:bg-[#B91C1C]',
  success:
    'bg-[#22C55E] text-white hover:bg-[#16A34A]'
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
        'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-60',
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
