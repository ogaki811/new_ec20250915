import { useSearchParams } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import Pagination from '../components/Pagination';
import SearchFilters from '../components/SearchFilters';
import SearchSort from '../components/SearchSort';
import FilterTag from '../components/FilterTag';
import usePagination from '../hooks/usePagination';
import { sampleProducts, categories, brands } from '../data/sampleProducts';

function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('recommended');
  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
    priceRange: [0, 100000],
    inStock: false,
    minRating: 0,
  });

  // 検索とフィルタリング
  const filteredProducts = useMemo(() => {
    let results = sampleProducts;

    // 検索クエリでフィルタ
    if (query) {
      const searchQuery = query.toLowerCase();
      results = results.filter((product) =>
        product.name.toLowerCase().includes(searchQuery) ||
        product.code.toLowerCase().includes(searchQuery) ||
        product.brand.toLowerCase().includes(searchQuery)
      );
    }

    // カテゴリでフィルタ
    if (filters.categories.length > 0) {
      results = results.filter((product) =>
        filters.categories.includes(product.category)
      );
    }

    // ブランドでフィルタ
    if (filters.brands.length > 0) {
      results = results.filter((product) =>
        filters.brands.includes(product.brand)
      );
    }

    // 価格帯でフィルタ
    results = results.filter((product) =>
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );

    // 在庫でフィルタ
    if (filters.inStock) {
      results = results.filter((product) => product.stock);
    }

    // 評価でフィルタ
    if (filters.minRating > 0) {
      results = results.filter((product) => product.rating >= filters.minRating);
    }

    return results;
  }, [query, filters]);

  // ソート
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];

    switch (sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating-desc':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'recommended':
      default:
        return sorted;
    }
  }, [filteredProducts, sortBy]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, [query]);

  // ページネーション
  const { currentPage, totalPages, paginatedItems, handlePageChange } = usePagination(sortedProducts, 18);

  const breadcrumbItems = [
    { label: 'ホーム', href: '/' },
    { label: '検索結果' }
  ];

  // フィルタータグの削除ハンドラー
  const handleRemoveCategory = (category) => {
    setFilters({
      ...filters,
      categories: filters.categories.filter(c => c !== category)
    });
  };

  const handleRemoveBrand = (brand) => {
    setFilters({
      ...filters,
      brands: filters.brands.filter(b => b !== brand)
    });
  };

  const handleRemoveStock = () => {
    setFilters({ ...filters, inStock: false });
  };

  const handleRemoveRating = () => {
    setFilters({ ...filters, minRating: 0 });
  };

  if (loading) {
    return <Loading fullScreen />;
  }

  const hasActiveFilters = filters.categories.length > 0 ||
                           filters.brands.length > 0 ||
                           filters.inStock ||
                           filters.minRating > 0;

  return (
    <main className="ec-search">
      <Breadcrumb items={breadcrumbItems} />

      <section className="ec-search__section py-12 bg-gray-50">
        <div className="ec-search__container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 検索結果ヘッダー */}
          <div className="ec-search__header mb-8">
            <h1 className="ec-search__title text-3xl font-bold text-gray-900 mb-2">
              検索結果
            </h1>
            {query && (
              <p className="ec-search__query-text text-gray-600">
                「<span className="ec-search__query font-semibold text-blue-600">{query}</span>」の検索結果
              </p>
            )}
          </div>

          {/* アクティブフィルタータグ */}
          {hasActiveFilters && (
            <div className="ec-search__active-filters mb-6 flex flex-wrap items-center gap-2">
              <span className="ec-search__filter-label text-sm text-gray-700">絞り込み条件:</span>
              {filters.categories.map((category) => (
                <FilterTag
                  key={category}
                  label={category}
                  onRemove={() => handleRemoveCategory(category)}
                />
              ))}
              {filters.brands.map((brand) => (
                <FilterTag
                  key={brand}
                  label={brand}
                  onRemove={() => handleRemoveBrand(brand)}
                />
              ))}
              {filters.inStock && (
                <FilterTag
                  label="在庫あり"
                  onRemove={handleRemoveStock}
                />
              )}
              {filters.minRating > 0 && (
                <FilterTag
                  label={`評価${filters.minRating}以上`}
                  onRemove={handleRemoveRating}
                />
              )}
            </div>
          )}

          <div className="ec-search__layout grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* フィルターサイドバー */}
            <aside className="ec-search__sidebar lg:col-span-1">
              <SearchFilters
                filters={filters}
                onFilterChange={setFilters}
                categories={categories}
                brands={brands}
              />
            </aside>

            {/* 検索結果 */}
            <div className="ec-search__results lg:col-span-3">
              {sortedProducts.length > 0 ? (
                <>
                  <SearchSort
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                    resultCount={sortedProducts.length}
                  />

                  <div className="ec-search__products-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {paginatedItems.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        size="compact"
                      />
                    ))}
                  </div>

                  {/* ページネーション */}
                  {totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  )}
                </>
              ) : (
                <div className="ec-search__empty text-center py-16">
                  <svg
                    className="ec-search__empty-icon mx-auto h-24 w-24 text-gray-400 mb-4"
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
                  <h2 className="ec-search__empty-title text-2xl font-semibold text-gray-900 mb-2">
                    検索結果が見つかりませんでした
                  </h2>
                  <p className="ec-search__empty-message text-gray-600 mb-6">
                    {hasActiveFilters
                      ? 'フィルター条件を変更して再度お試しください'
                      : '別のキーワードで検索してみてください'
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Search;
