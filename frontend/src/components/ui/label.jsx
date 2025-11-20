import { cn } from '../../utils/cn';

const Label = ({ className, children, ...props }) => {
  return (
    <label
      className={cn(
        'section-title px-2 mb-3',
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
};

export default Label;
