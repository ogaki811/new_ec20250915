import { Link } from 'react-router-dom';

function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  type = 'button',
  to,
  className = '',
  icon,
  fullWidth = false
}) {
  const baseClasses = 'ec-button inline-flex items-center justify-center font-medium transition-all duration-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'ec-button--primary bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-200',
    secondary: 'ec-button--secondary border-2 border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300',
    outline: 'ec-button--outline border-2 border-blue-600 text-blue-600 bg-white hover:bg-blue-600 hover:text-white',
    'outline-danger': 'ec-button--outline-danger border border-red-300 text-red-600 hover:bg-red-50',
    social: 'ec-button--social border-2 border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:transform hover:-translate-y-0.5 hover:shadow-lg',
    link: 'ec-button--link text-blue-600 hover:text-blue-800 hover:underline',
  };

  const sizes = {
    sm: 'ec-button--sm px-3 py-1.5 text-sm',
    md: 'ec-button--md px-6 py-3 text-base',
    lg: 'ec-button--lg px-8 py-4 text-lg',
  };

  const classes = `
    ${baseClasses}
    ${variants[variant] || variants.primary}
    ${sizes[size] || sizes.md}
    ${fullWidth ? 'ec-button--full-width w-full' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const content = (
    <>
      {icon && <span className="ec-button__icon mr-2">{icon}</span>}
      {children}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {content}
    </button>
  );
}

export default Button;
