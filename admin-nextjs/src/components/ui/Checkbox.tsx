import React, { InputHTMLAttributes, forwardRef, ReactNode, useId } from 'react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode;
  error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      error,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const checkboxId = id || generatedId;

    return (
      <div>
        <div className="flex items-center">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className={`h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 ${className}`}
            {...props}
          />
          {label && (
            <label
              htmlFor={checkboxId}
              className="ml-2 block text-sm text-gray-700"
            >
              {label}
            </label>
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
