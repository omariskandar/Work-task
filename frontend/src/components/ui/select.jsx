import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

const Select = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div className={cn('relative w-full', className)}>
      <div className="pointer-events-none absolute inset-0 rounded-[18px] bg-gradient-to-r from-cyan-500/25 via-cyan-500/10 to-transparent opacity-60 blur-md" />
      <select
        ref={ref}
        className="relative h-12 w-full appearance-none rounded-[18px] border border-white/12 bg-slate-950/70 px-4 pr-12 text-sm text-white shadow-[0_6px_30px_rgba(2,6,23,0.65)] focus:border-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
        {...props}
      >
        {children}
      </select>
      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/70">
        <svg
          aria-hidden="true"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </span>
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
