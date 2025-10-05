'use client';

import { useMemo, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/common/Breadcrumb';
import Pagination from '@/components/common/Pagination';
import ProductGrid from '@/components/product/ProductGrid';
import FilterSidebar from '@/components/product/FilterSidebar';
import SearchBar from '@/components/product/SearchBar';
import SortDropdown from '@/components/product/SortDropdown';
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

    if (filters.category) {
      results = results.filter((product) => product.category === filters.category);
    }

    if (filters.brand) {
      results = results.filter((product) => product.brand === filters.brand);
    }

    if (filters.minPrice !== undefined) {
      results = results.filter((product) => product.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      results = results.filter((product) => product.price <= filters.maxPrice!);
    }

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
      case 'rating-desc':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return sorted;
      default:
        return sorted;
    }
  }, [filteredProducts, sortBy]);

  const { currentPage, totalPages, paginatedItems, handlePageChange } = usePagination(
    sortedProducts,
    ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="ec-products flex-grow bg-gray-50">
        <div className="ec-products__container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />

          {/* ページタイトル */}
          <div className="ec-products__header mb-6">
            <h1 className="ec-products__title text-3xl font-bold text-gray-900 mb-2">商品一覧</h1>
            <p className="ec-products__count text-gray-600">
              {filteredProducts.length}件の商品が見つかりました
            </p>
          </div>

          {/* 検索バー */}
          <div className="ec-products__search mb-6">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="商品名、ブランド、商品コードで検索"
            />
          </div>

          <div className="ec-products__content lg:grid lg:grid-cols-4 lg:gap-8">
            {/* フィルターサイドバー */}
            <aside className="ec-products__sidebar lg:col-span-1 mb-8 lg:mb-0">
              <FilterSidebar
                filters={filters}
                onFilterChange={setFilters}
                products={sampleProducts}
              />
            </aside>

            {/* メインコンテンツ */}
            <div className="ec-products__main lg:col-span-3">
              {/* ソートとカウント */}
              <div className="ec-products__toolbar flex items-center justify-between mb-6">
                <p className="ec-products__result-text text-sm text-gray-600">
                  {(currentPage - 1) * ITEMS_PER_PAGE + 1}〜
                  {Math.min(currentPage * ITEMS_PER_PAGE, sortedProducts.length)}件を表示
                  （全{sortedProducts.length}件中）
                </p>
                <SortDropdown value={sortBy} onChange={setSortBy} />
              </div>

              {/* 商品グリッド */}
              <ProductGrid products={paginatedItems} />

              {/* ページネーション */}
              {totalPages > 1 && (
                <div className="ec-products__pagination mt-8">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}

              {/* 商品なしメッセージ */}
              {filteredProducts.length === 0 && (
                <div className="ec-products__empty bg-white rounded-lg shadow-sm p-12 text-center">
                  <svg
                    className="mx-auto h-24 w-24 text-gray-400 mb-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    商品が見つかりませんでした
                  </h2>
                  <p className="text-gray-600 mb-8">
                    別のキーワードやフィルターでお試しください
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
