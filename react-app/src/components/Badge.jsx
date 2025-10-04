function Badge({ children, variant = 'default', size = 'md' }) {
  const baseClasses = 'ec-badge inline-flex items-center rounded-full font-medium';

  const variants = {
    default: 'ec-badge--default bg-gray-100 text-gray-800',
    primary: 'ec-badge--primary bg-blue-100 text-blue-800',
    success: 'ec-badge--success bg-green-100 text-green-800',
    warning: 'ec-badge--warning bg-orange-100 text-orange-800',
    danger: 'ec-badge--danger bg-red-100 text-red-800',
    info: 'ec-badge--info bg-cyan-100 text-cyan-800',
  };

  const sizes = {
    sm: 'ec-badge--sm px-2 py-0.5 text-xs',
    md: 'ec-badge--md px-3 py-1 text-sm',
    lg: 'ec-badge--lg px-4 py-2 text-base',
  };

  return (
    <span className={`${baseClasses} ${variants[variant]} ${sizes[size]}`}>
      {children}
    </span>
  );
}

export default Badge;
