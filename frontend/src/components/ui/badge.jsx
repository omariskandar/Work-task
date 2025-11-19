import { cn } from '../../utils/cn';

const Badge = ({ className, children, variant = 'default', ...props }) => {
  const variantClasses = {
    default:
      'bg-white/10 text-white',
    success:
      'bg-emerald-400/10 text-emerald-300 border border-emerald-400/20',
    warning:
      'bg-amber-400/10 text-amber-200 border border-amber-400/20',
    danger:
      'bg-rose-500/10 text-rose-200 border border-rose-500/20'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
