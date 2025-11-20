import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

const Select = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div className={cn('relative w-full', className)}>
      <select
        ref={ref}
        className="h-12 w-full appearance-none rounded-lg border border-[#E5E7EB] bg-white px-4 pr-10 text-sm text-[#111827] focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#93C5FD]"
        {...props}
      >
        {children}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280]">
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
