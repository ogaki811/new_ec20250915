import React, { HTMLAttributes } from 'react';

interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed' | 'dotted';
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  label?: string;
}

const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  variant = 'solid',
  spacing = 'md',
  label,
  className = '',
  ...props
}) => {
  const baseStyles = 'ec-divider border-gray-200';

  const orientationStyles = {
    horizontal: 'ec-divider--horizontal w-full border-t',
    vertical: 'ec-divider--vertical h-full border-l',
  };

  const variantStyles = {
    solid: 'border-solid',
    dashed: 'border-dashed',
    dotted: 'border-dotted',
  };

  const spacingStyles = {
    none: orientation === 'horizontal' ? 'my-0' : 'mx-0',
    sm: orientation === 'horizontal' ? 'my-2' : 'mx-2',
    md: orientation === 'horizontal' ? 'my-4' : 'mx-4',
    lg: orientation === 'horizontal' ? 'my-6' : 'mx-6',
  };

  if (label && orientation === 'horizontal') {
    return (
      <div className={`ec-divider ec-divider--labeled flex items-center ${spacingStyles[spacing]}`}>
        <hr className={`${baseStyles} ${orientationStyles[orientation]} ${variantStyles[variant]} flex-grow`} {...props} />
        <span className="ec-divider__label px-4 text-sm text-gray-500">{label}</span>
        <hr className={`${baseStyles} ${orientationStyles[orientation]} ${variantStyles[variant]} flex-grow`} {...props} />
      </div>
    );
  }

  return (
    <hr
      className={`${baseStyles} ${orientationStyles[orientation]} ${variantStyles[variant]} ${spacingStyles[spacing]} ${className}`}
      {...props}
    />
  );
};

export default Divider;
