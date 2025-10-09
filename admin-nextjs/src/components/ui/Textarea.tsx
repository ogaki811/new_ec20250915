import React, { TextareaHTMLAttributes, forwardRef, useId } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  rows?: number;
  maxLength?: number;
  showCount?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      rows = 4,
      maxLength,
      showCount = false,
      className = '',
      id,
      value,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const textareaId = id || generatedId;
    const currentLength = typeof value === 'string' ? value.length : 0;

    const baseTextareaStyles = 'ec-textarea__field w-full px-4 py-3 border-2 rounded-lg resize-vertical transition-all duration-300 bg-white focus:outline-none focus:ring-2 focus:ring-offset-1';
    const errorStyles = error
      ? 'ec-textarea__field--error border-red-500 focus:border-red-500 focus:ring-red-500'
      : 'border-gray-200 focus:border-blue-600 focus:ring-blue-500';

    return (
      <div className="ec-textarea w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="ec-textarea__label block text-sm font-medium text-gray-700 mb-2"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          maxLength={maxLength}
          value={value}
          className={`${baseTextareaStyles} ${errorStyles} ${className}`}
          {...props}
        />
        <div className="ec-textarea__footer flex justify-between items-center mt-1">
          {error && (
            <p className="ec-textarea__error text-sm text-red-600">{error}</p>
          )}
          {showCount && maxLength && (
            <p className="ec-textarea__count text-sm text-gray-500 ml-auto">
              {currentLength} / {maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
