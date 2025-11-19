import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

const Input = forwardRef(({ className, type = 'text', ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        'flex h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-white/60 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)] transition-all focus-visible:border-brand focus-visible:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40',
        className
      )}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export default Input;
