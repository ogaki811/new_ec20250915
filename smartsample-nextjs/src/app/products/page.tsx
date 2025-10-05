'use client';

import { useMemo, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/common/Breadcrumb';
import Pagination from '@/components/common/Pagination';
import ProductGrid from '@/components/product/ProductGrid';
import FilterSidebar from '@/components/product/FilterSidebar';
import { sampleProducts } from '@/data/sampleProducts';
import usePagination from '@/hooks/usePagination';
import useSearch from '@/hooks/useSearch';
import type { ProductSortOption, ProductFilters } from '@/types';

const ITEMS_PER_PAGE = 12;

export default function ProductsPage() {
  const [filters, setFilters] = useState<ProductFilters>({});
  const [sortBy, setSortBy] = useState<ProductSortOption>('name-asc');
  const { searchQuery, setSearchQuery, filteredItems: searchResults } = useSearch(
    sampleProducts,
    ['name', 'brand', 'category', 'code']
  );

  // フィルタリング処理
  const filteredProducts = useMemo(() => {
    let results = searchQuery ? searchResults : sampleProducts;

    // カテゴリーフィルター
    if (filters.category) {
      results = results.filter((product) => product.category === filters.category);
    }

    // ブランドフィルター
    if (filters.brand) {
      results = results.filter((product) => product.brand === filters.brand);
    }

    // 価格フィルター
    if (filters.minPrice !== undefined) {
      results = results.filter((product) => product.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      results = results.filter((product) => product.price <= filters.maxPrice!);
    }

    // 在庫フィルター
    if (filters.inStock) {
      results = results.filter((product) => product.stock);
    }

    return results;
  }, [searchResults, searchQuery, filters]);

  // ソート処理
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];

    switch (sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name, 'ja'));
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name, 'ja'));
      default:
        return sorted;
    }
  }, [filteredProducts, sortBy]);

  const { currentPage, totalPages, paginatedItems, handlePageChange } = usePagination(
    sortedProducts,
    ITEMS_PER_PAGE
  );

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as ProductSortOption);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* パンくずリスト */}
          <Breadcrumb items={[{ label: '商品一覧' }]} />

          {/* ページタイトル */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">商品一覧</h1>
            <p className="text-gray-600">
              {filteredProducts.length}件の商品が見つかりました
            </p>
          </div>

          {/* 検索バー */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="商品名、ブランド、品番で検索..."
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            {/* フィルターサイドバー */}
            <div className="lg:col-span-1">
              <FilterSidebar filters={filters} onFilterChange={setFilters} />
            </div>

            {/* 商品リスト */}
            <div className="lg:col-span-3">
              {/* ソート */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-gray-600">
                  {sortedProducts.length}件中 {(currentPage - 1) * ITEMS_PER_PAGE + 1}-
                  {Math.min(currentPage * ITEMS_PER_PAGE, sortedProducts.length)}件を表示
                </p>
                <div className="flex items-center space-x-2">
                  <label htmlFor="sort" className="text-sm text-gray-600">
                    並び替え:
                  </label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={handleSortChange}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="name-asc">名前順 (あ→ん)</option>
                    <option value="price-asc">価格が安い順</option>
                    <option value="price-desc">価格が高い順</option>
                    <option value="name-desc">名前順 (ん→あ)</option>
                  </select>
                </div>
              </div>

              {/* 商品グリッド */}
              <ProductGrid
                products={paginatedItems}
                emptyMessage="条件に一致する商品が見つかりませんでした"
              />

              {/* ページネーション */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
