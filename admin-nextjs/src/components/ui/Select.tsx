import React, { SelectHTMLAttributes, forwardRef, useId, ReactNode } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options?: SelectOption[];
  fullWidth?: boolean;
  children?: ReactNode;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      options,
      fullWidth = false,
      className = '',
      id,
      children,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const selectId = id || generatedId;
    const widthClass = fullWidth ? 'w-full' : '';

    const baseSelectStyles = 'px-4 py-2 border rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 bg-white';
    const errorStyles = error
      ? 'border-red-500 focus:ring-red-500'
      : 'border-gray-200 focus:ring-blue-500';

    return (
      <div className={`${widthClass}`}>
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={`${baseSelectStyles} ${errorStyles} ${widthClass} ${className}`}
          {...props}
        >
          {options
            ? options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))
            : children}
        </select>
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
