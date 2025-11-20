import { cn } from '../../utils/cn';

const Label = ({ className, children, ...props }) => {
  return (
    <label
      className={cn(
        'block text-xs font-semibold uppercase tracking-[0.08em] text-[#374151] mb-2',
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
};

export default Label;
