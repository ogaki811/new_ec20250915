import { useState } from 'react';
import Checkbox from './Checkbox';

function SearchFilters({ filters, onFilterChange, categories, brands }) {
  const [priceRange, setPriceRange] = useState(filters.priceRange || [0, 100000]);
  const [isOpen, setIsOpen] = useState({
    category: true,
    price: true,
    brand: false,
    stock: true,
    rating: true,
  });

  const toggleSection = (section) => {
    setIsOpen(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCategoryChange = (category) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    onFilterChange({ ...filters, categories: newCategories });
  };

  const handleBrandChange = (brand) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    onFilterChange({ ...filters, brands: newBrands });
  };

  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value);
    const newRange = e.target.name === 'min' ? [value, priceRange[1]] : [priceRange[0], value];
    setPriceRange(newRange);
    onFilterChange({ ...filters, priceRange: newRange });
  };

  const handleStockChange = (e) => {
    onFilterChange({ ...filters, inStock: e.target.checked });
  };

  const handleRatingChange = (rating) => {
    onFilterChange({ ...filters, minRating: filters.minRating === rating ? 0 : rating });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">絞り込み</h2>
        <button
          onClick={() => onFilterChange({
            categories: [],
            brands: [],
            priceRange: [0, 100000],
            inStock: false,
            minRating: 0,
          })}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          クリア
        </button>
      </div>

      {/* カテゴリ */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <button
          onClick={() => toggleSection('category')}
          className="flex items-center justify-between w-full mb-3"
        >
          <h3 className="font-semibold text-gray-900">カテゴリ</h3>
          <svg
            className={`w-5 h-5 transition-transform ${isOpen.category ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isOpen.category && (
          <div className="space-y-2">
            {categories.map((category) => (
              <Checkbox
                key={category}
                id={`category-${category}`}
                label={category}
                checked={filters.categories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
            ))}
          </div>
        )}
      </div>

      {/* 価格帯 */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full mb-3"
        >
          <h3 className="font-semibold text-gray-900">価格帯</h3>
          <svg
            className={`w-5 h-5 transition-transform ${isOpen.price ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isOpen.price && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="min"
                value={priceRange[0]}
                onChange={handlePriceChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                placeholder="最小"
              />
              <span className="text-gray-500">〜</span>
              <input
                type="number"
                name="max"
                value={priceRange[1]}
                onChange={handlePriceChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                placeholder="最大"
              />
            </div>
          </div>
        )}
      </div>

      {/* ブランド */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <button
          onClick={() => toggleSection('brand')}
          className="flex items-center justify-between w-full mb-3"
        >
          <h3 className="font-semibold text-gray-900">ブランド</h3>
          <svg
            className={`w-5 h-5 transition-transform ${isOpen.brand ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isOpen.brand && (
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {brands.map((brand) => (
              <Checkbox
                key={brand}
                id={`brand-${brand}`}
                label={brand}
                checked={filters.brands.includes(brand)}
                onChange={() => handleBrandChange(brand)}
              />
            ))}
          </div>
        )}
      </div>

      {/* 在庫 */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <button
          onClick={() => toggleSection('stock')}
          className="flex items-center justify-between w-full mb-3"
        >
          <h3 className="font-semibold text-gray-900">在庫</h3>
          <svg
            className={`w-5 h-5 transition-transform ${isOpen.stock ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isOpen.stock && (
          <Checkbox
            id="in-stock"
            label="在庫あり"
            checked={filters.inStock}
            onChange={handleStockChange}
          />
        )}
      </div>

      {/* 評価 */}
      <div className="mb-2">
        <button
          onClick={() => toggleSection('rating')}
          className="flex items-center justify-between w-full mb-3"
        >
          <h3 className="font-semibold text-gray-900">評価</h3>
          <svg
            className={`w-5 h-5 transition-transform ${isOpen.rating ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isOpen.rating && (
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <button
                key={rating}
                onClick={() => handleRatingChange(rating)}
                className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg transition-colors ${
                  filters.minRating === rating ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
                }`}
              >
                <span className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </span>
                <span className="text-sm">以上</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchFilters;
