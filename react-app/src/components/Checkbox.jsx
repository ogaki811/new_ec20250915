function Checkbox({
  id,
  name,
  checked,
  onChange,
  label,
  className = '',
}) {
  return (
    <label className={`ec-checkbox flex items-center cursor-pointer text-sm text-gray-600 ${className}`}>
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        className="ec-checkbox__input w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      />
      {label && <span className="ec-checkbox__label ml-2">{label}</span>}
    </label>
  );
}

export default Checkbox;
