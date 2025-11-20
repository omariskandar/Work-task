import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

const variantClasses = {
  default: 'bg-[#3B82F6] text-white hover:bg-[#2563EB] shadow-sm hover:shadow-md',
  secondary:
    'bg-white text-[#111827] border border-[#E5E7EB] hover:bg-[#F9FAFB] shadow-sm',
  outline:
    'border border-[#E5E7EB] bg-transparent text-[#374151] hover:bg-[#F9FAFB]',
  ghost: 'bg-transparent text-[#374151] hover:bg-[#F3F4F6]',
  destructive:
    'bg-[#DC2626] text-white hover:bg-[#B91C1C] shadow-sm hover:shadow-md',
  success:
    'bg-[#22C55E] text-white hover:bg-[#16A34A] shadow-sm hover:shadow-md'
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
        'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-50',
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
