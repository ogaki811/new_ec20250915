import { useState } from 'react';

function Input({
  type = 'text',
  id,
  name,
  value,
  onChange,
  placeholder,
  label,
  error,
  required = false,
  disabled = false,
  autoComplete,
  className = '',
  showPasswordToggle = false,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = showPasswordToggle && showPassword ? 'text' : type;

  const baseClasses = 'ec-input__field w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base transition-all duration-300 bg-white focus:outline-none focus:border-blue-600 focus:shadow-lg focus:shadow-blue-100';

  return (
    <div className="ec-input mb-6">
      {label && (
        <label htmlFor={id} className="ec-input__label block mb-2 font-medium text-gray-700 text-sm">
          {label}
          {required && <span className="ec-input__required text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="ec-input__container relative">
        <input
          type={inputType}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
          className={`${baseClasses} ${showPasswordToggle ? 'pr-12' : ''} ${error ? 'ec-input__field--error border-red-500' : ''} ${className}`}
        />
        {showPasswordToggle && type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="ec-input__toggle absolute right-3 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer text-gray-500 p-1 rounded transition-all duration-300 hover:bg-gray-100 hover:text-gray-700"
          >
            {showPassword ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            )}
          </button>
        )}
      </div>
      {error && (
        <div className="ec-input__error text-red-500 text-sm mt-2 block min-h-[1.2rem]">{error}</div>
      )}
    </div>
  );
}

export default Input;
