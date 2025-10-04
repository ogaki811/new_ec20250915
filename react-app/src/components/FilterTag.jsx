function FilterTag({ label, onRemove }) {
  return (
    <span className="ec-filter-tag inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
      <span className="ec-filter-tag__label">{label}</span>
      <button
        onClick={onRemove}
        className="ec-filter-tag__remove hover:bg-blue-200 rounded-full p-0.5 transition-colors"
        aria-label={`${label}を削除`}
      >
        <svg className="ec-filter-tag__icon w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </span>
  );
}

export default FilterTag;
