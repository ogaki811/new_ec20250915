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
    <div className="ec-search-sort flex items-center justify-between mb-6">
      <p className="ec-search-sort__count text-gray-600">
        <span className="ec-search-sort__count-value font-semibold text-gray-900">{resultCount}</span> 件の商品
      </p>
      <div className="ec-search-sort__controls flex items-center gap-3">
        <label htmlFor="sort" className="ec-search-sort__label text-sm text-gray-700">
          並び替え:
        </label>
        <Select
          id="sort"
          name="sort"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          options={sortOptions}
          className="ec-search-sort__select w-48"
        />
      </div>
    </div>
  );
}

export default SearchSort;
