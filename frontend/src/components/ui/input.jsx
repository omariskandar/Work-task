import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

const Input = forwardRef(({ className, type = 'text', ...props }, ref) => {
  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute inset-0 rounded-[18px] bg-gradient-to-r from-cyan-500/25 via-cyan-500/10 to-transparent opacity-60 blur-md" />
      <input
        ref={ref}
        type={type}
        className={cn(
          'relative h-12 w-full rounded-[18px] border border-white/12 bg-slate-950/70 px-4 text-sm text-white placeholder:text-white/60 shadow-[0_6px_30px_rgba(2,6,23,0.65)] transition focus-visible:border-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/30',
          className
        )}
        {...props}
      />
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
