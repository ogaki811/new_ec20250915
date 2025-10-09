import React, { InputHTMLAttributes, forwardRef } from 'react';

interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
  error?: string;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      label,
      description,
      error,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="ec-radio">
        <div className="ec-radio__wrapper flex items-start">
          <input
            ref={ref}
            type="radio"
            id={radioId}
            className={`ec-radio__input w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 focus:ring-2 mt-0.5 ${className}`}
            {...props}
          />
          {(label || description) && (
            <div className="ec-radio__content ml-3">
              {label && (
                <label
                  htmlFor={radioId}
                  className="ec-radio__label block text-sm font-medium text-gray-700 cursor-pointer"
                >
                  {label}
                </label>
              )}
              {description && (
                <p className="ec-radio__description text-sm text-gray-500 mt-1">
                  {description}
                </p>
              )}
            </div>
          )}
        </div>
        {error && (
          <p className="ec-radio__error mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Radio.displayName = 'Radio';

export default Radio;
