import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

const Textarea = forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        'w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/60 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)] transition-all focus-visible:border-brand focus-visible:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40',
        className
      )}
      {...props}
    />
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
