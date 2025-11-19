import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

const Select = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <select
      ref={ref}
      className={cn(
        'h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)] focus-visible:border-brand focus-visible:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40',
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
});

Select.displayName = 'Select';

export default Select;
