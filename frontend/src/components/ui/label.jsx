import { cn } from '../../utils/cn';

const Label = ({ className, children, ...props }) => {
  return (
    <label
      className={cn(
        'text-sm font-medium text-white/80 tracking-tight',
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
};

export default Label;
