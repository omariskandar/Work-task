import { cn } from '../../utils/cn';

const Badge = ({ className, children, variant = 'default', ...props }) => {
  const variantClasses = {
    default: 'bg-[#F3F4F6] text-[#374151] border border-[#E5E7EB]',
    success: 'bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0]',
    warning: 'bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A]',
    danger: 'bg-[#FEE2E2] text-[#B91C1C] border border-[#FECACA]'
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
