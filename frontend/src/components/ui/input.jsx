import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

const Input = forwardRef(({ className, type = 'text', ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        'h-11 w-full rounded-lg border border-[#E5E7EB] bg-white px-4 text-sm text-[#111827] placeholder:text-[#9CA3AF] transition-all duration-200 focus-visible:border-[#3B82F6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BFDBFE] disabled:bg-[#F9FAFB] disabled:cursor-not-allowed',
        className
      )}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export default Input;
