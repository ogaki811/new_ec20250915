import { useState, useMemo } from 'react';

function useFilters(items) {
  const [filters, setFilters] = useState({
    category: 'すべて',
    priceMin: 0,
    priceMax: 100000,
    brands: [],
    inStock: false,
    onSale: false,
    freeShipping: false,
  });

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // カテゴリーフィルター
      if (filters.category !== 'すべて' && item.category !== filters.category) {
        return false;
      }

      // 価格帯フィルター
      if (item.price < filters.priceMin || item.price > filters.priceMax) {
        return false;
      }

      // ブランドフィルター
      if (filters.brands.length > 0 && !filters.brands.includes(item.brand)) {
        return false;
      }

      // 在庫フィルター
      if (filters.inStock && !item.inStock) {
        return false;
      }

      // セール商品フィルター
      if (filters.onSale && !item.badge?.includes('SALE')) {
        return false;
      }

      // 送料無料フィルター
      if (filters.freeShipping && !item.freeShipping) {
        return false;
      }

      return true;
    });
  }, [items, filters]);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const toggleBrand = (brand) => {
    setFilters((prev) => {
      const brands = prev.brands.includes(brand)
        ? prev.brands.filter((b) => b !== brand)
        : [...prev.brands, brand];
      return { ...prev, brands };
    });
  };

  const resetFilters = () => {
    setFilters({
      category: 'すべて',
      priceMin: 0,
      priceMax: 100000,
      brands: [],
      inStock: false,
      onSale: false,
      freeShipping: false,
    });
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.category !== 'すべて') count++;
    if (filters.priceMin > 0 || filters.priceMax < 100000) count++;
    if (filters.brands.length > 0) count++;
    if (filters.inStock) count++;
    if (filters.onSale) count++;
    if (filters.freeShipping) count++;
    return count;
  }, [filters]);

  return {
    filters,
    filteredItems,
    updateFilter,
    toggleBrand,
    resetFilters,
    activeFilterCount,
  };
}

export default useFilters;
