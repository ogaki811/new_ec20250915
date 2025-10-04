import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../components/Breadcrumb';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import usePagination from '../hooks/usePagination';
import useFilters from '../hooks/useFilters';
import { sampleProducts } from '../data/sampleProducts';

function ProductList() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);

  // フィルター
  const { filters, filteredItems, updateFilter, toggleBrand, resetFilters, activeFilterCount } = useFilters(sampleProducts);

  // ソート
  const sortedProducts = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      default: // popular
        return 0;
    }
  });

  // ページネーション
  const { currentPage, totalPages, paginatedItems, handlePageChange, resetPage } = usePagination(sortedProducts, 12);

  // ソート/フィルター変更時にページをリセット
  const handleSortChange = (value) => {
    setSortBy(value);
    resetPage();
  };

  const handlePriceApply = () => {
    resetPage();
  };

  const breadcrumbItems = [
    { label: 'ホーム', href: '/' },
    { label: '商品一覧' }
  ];

  // SEO設定
  const pageTitle = category
    ? `${category} - 商品一覧 | smartsample`
    : '商品一覧 | smartsample';
  const pageDescription = category
    ? `${category}の商品一覧ページ。${sortedProducts.length}件の商品からお選びいただけます。`
    : `全商品一覧ページ。${sortedProducts.length}件の商品からお選びいただけます。オフィス用品から文具まで豊富な品揃え。`;
  const pageUrl = category
    ? `https://smartsample.example.com/products?category=${encodeURIComponent(category)}`
    : 'https://smartsample.example.com/products';

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={pageUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />

        {/* Structured Data - ItemList */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "numberOfItems": sortedProducts.length,
            "itemListElement": paginatedItems.map((product, index) => ({
              "@type": "ListItem",
              "position": (currentPage - 1) * 12 + index + 1,
              "item": {
                "@type": "Product",
                "name": product.name,
                "url": `https://smartsample.example.com/product/${product.id}`,
                "image": product.image,
                "description": product.description,
                "offers": {
                  "@type": "Offer",
                  "price": product.price,
                  "priceCurrency": "JPY"
                }
              }
            }))
          })}
        </script>

        {/* Structured Data - BreadcrumbList */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "ホーム",
                "item": "https://smartsample.example.com/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "商品一覧"
              }
            ]
          })}
        </script>
      </Helmet>

      <main className="ec-product-list">
        <Breadcrumb items={breadcrumbItems} />

      {/* ページヘッダー */}
      <section className="ec-product-list__header bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="ec-product-list__title text-3xl font-bold text-gray-900 mb-2">商品一覧</h1>
          <p className="ec-product-list__count text-gray-600">{sortedProducts.length}件の商品</p>
        </div>
      </section>

      {/* 商品一覧 */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* サイドバー - フィルター */}
            <aside className="ec-product-list__sidebar w-full lg:w-64 flex-shrink-0">
              <div className="ec-product-list__filters bg-white rounded-lg border border-gray-200 p-6">
                <div className="ec-product-list__filter-header flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <h2 className="ec-product-list__filter-title text-lg font-semibold text-gray-900">フィルター</h2>
                    {activeFilterCount > 0 && (
                      <span className="ec-product-list__filter-count bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                        {activeFilterCount}
                      </span>
                    )}
                  </div>
                  <div className="ec-product-list__filter-actions flex items-center gap-2">
                    {activeFilterCount > 0 && (
                      <button
                        onClick={() => {
                          resetFilters();
                          resetPage();
                        }}
                        className="ec-product-list__filter-clear text-sm text-gray-600 hover:text-gray-900"
                      >
                        クリア
                      </button>
                    )}
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="ec-product-list__filter-toggle text-blue-600 hover:text-blue-800 lg:hidden"
                    >
                      {showFilters ? '閉じる' : '開く'}
                    </button>
                  </div>
                </div>

                <div className={`ec-product-list__filter-groups space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                  {/* カテゴリー */}
                  <div className="ec-product-list__filter-group">
                    <h3 className="ec-product-list__filter-group-title text-sm font-semibold text-gray-900 mb-3">カテゴリー</h3>
                    <div className="space-y-2">
                      {['すべて', '文房具', 'オフィス用品', '家具', '電化製品'].map((cat) => (
                        <label key={cat} className="ec-product-list__filter-option flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name="category"
                            checked={filters.category === cat}
                            onChange={() => {
                              updateFilter('category', cat);
                              resetPage();
                            }}
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">{cat}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* 価格帯 */}
                  <div className="ec-product-list__filter-group pt-6 border-t border-gray-200">
                    <h3 className="ec-product-list__filter-group-title text-sm font-semibold text-gray-900 mb-3">価格帯</h3>
                    <div className="space-y-3">
                      <div className="ec-product-list__price-range flex items-center gap-2">
                        <input
                          type="number"
                          value={filters.priceMin}
                          onChange={(e) => updateFilter('priceMin', parseInt(e.target.value) || 0)}
                          className="ec-product-list__price-input w-full px-3 py-2 border border-gray-300 rounded text-sm"
                          placeholder="最小"
                        />
                        <span className="text-gray-500">〜</span>
                        <input
                          type="number"
                          value={filters.priceMax}
                          onChange={(e) => updateFilter('priceMax', parseInt(e.target.value) || 100000)}
                          className="ec-product-list__price-input w-full px-3 py-2 border border-gray-300 rounded text-sm"
                          placeholder="最大"
                        />
                      </div>
                      <button
                        onClick={handlePriceApply}
                        className="ec-product-list__price-apply w-full px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                      >
                        適用
                      </button>
                    </div>
                  </div>

                  {/* ブランド */}
                  <div className="ec-product-list__filter-group pt-6 border-t border-gray-200">
                    <h3 className="ec-product-list__filter-group-title text-sm font-semibold text-gray-900 mb-3">ブランド</h3>
                    <div className="space-y-2">
                      {['コクヨ', 'プラス', 'キングジム', 'その他'].map((brand) => (
                        <label key={brand} className="ec-product-list__filter-option flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters.brands.includes(brand)}
                            onChange={() => {
                              toggleBrand(brand);
                              resetPage();
                            }}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">{brand}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* その他の条件 */}
                  <div className="ec-product-list__filter-group pt-6 border-t border-gray-200">
                    <h3 className="ec-product-list__filter-group-title text-sm font-semibold text-gray-900 mb-3">その他の条件</h3>
                    <div className="space-y-2">
                      <label className="ec-product-list__filter-option flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.inStock}
                          onChange={(e) => {
                            updateFilter('inStock', e.target.checked);
                            resetPage();
                          }}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">在庫あり</span>
                      </label>
                      <label className="ec-product-list__filter-option flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.onSale}
                          onChange={(e) => {
                            updateFilter('onSale', e.target.checked);
                            resetPage();
                          }}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">セール商品</span>
                      </label>
                      <label className="ec-product-list__filter-option flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.freeShipping}
                          onChange={(e) => {
                            updateFilter('freeShipping', e.target.checked);
                            resetPage();
                          }}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">送料無料</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* 商品グリッド */}
            <div className="ec-product-list__main flex-1">
              {/* ソート・表示切替 */}
              <div className="ec-product-list__sort-bar bg-white rounded-lg border border-gray-200 p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="ec-product-list__sort-control flex items-center gap-2">
                  <label htmlFor="sort" className="text-sm text-gray-700">並び替え:</label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="ec-product-list__sort-select px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="popular">人気順</option>
                    <option value="price-low">価格が安い順</option>
                    <option value="price-high">価格が高い順</option>
                    <option value="name">名前順</option>
                  </select>
                </div>

                <div className="ec-product-list__result-info text-sm text-gray-600">
                  {sortedProducts.length}件中 {(currentPage - 1) * 12 + 1}-{Math.min(currentPage * 12, sortedProducts.length)}件を表示
                </div>
              </div>

              {/* 商品グリッド */}
              <div className="ec-product-list__grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {paginatedItems.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* ページネーション */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </section>
      </main>
    </>
  );
}

export default ProductList;
