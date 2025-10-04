/**
 * Select - セレクトボックスコンポーネント
 */
function Select({
  name,
  value,
  onChange,
  options = [],
  label,
  error,
  placeholder = '選択してください',
  required = false,
  disabled = false,
  className = '',
}) {
  const baseClasses = 'ec-select__field w-full px-4 py-3 border rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors';

  const selectClasses = `
    ${baseClasses}
    ${error ? 'ec-select__field--error border-red-500' : 'border-gray-300'}
    ${disabled ? 'ec-select__field--disabled bg-gray-100 cursor-not-allowed' : 'hover:border-gray-400'}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className="ec-select w-full">
      {label && (
        <label htmlFor={name} className="ec-select__label block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="ec-select__required text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="ec-select__container relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={selectClasses}
          required={required}
        >
          {placeholder && (
            <option value="" disabled className="ec-select__placeholder">
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value || option}
              value={option.value || option}
              disabled={option.disabled}
              className="ec-select__option"
            >
              {option.label || option}
            </option>
          ))}
        </select>
        {/* 矢印アイコン */}
        <div className="ec-select__arrow absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
      {error && <p className="ec-select__error mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}

export default Select;
