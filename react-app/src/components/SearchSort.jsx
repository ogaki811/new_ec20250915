import Select from './Select';

function SearchSort({ sortBy, onSortChange, resultCount }) {
  const sortOptions = [
    { value: 'recommended', label: 'おすすめ順' },
    { value: 'price-asc', label: '価格が安い順' },
    { value: 'price-desc', label: '価格が高い順' },
    { value: 'rating-desc', label: '評価が高い順' },
    { value: 'name-asc', label: '名前順（A-Z）' },
  ];

  return (
    <div className="flex items-center justify-between mb-6">
      <p className="text-gray-600">
        <span className="font-semibold text-gray-900">{resultCount}</span> 件の商品
      </p>
      <div className="flex items-center gap-3">
        <label htmlFor="sort" className="text-sm text-gray-700">
          並び替え:
        </label>
        <Select
          id="sort"
          name="sort"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          options={sortOptions}
          className="w-48"
        />
      </div>
    </div>
  );
}

export default SearchSort;
