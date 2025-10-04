import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import usePagination from '../hooks/usePagination';
import useFilters from '../hooks/useFilters';

function ProductList() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);

  // サンプル商品データ
  const allProducts = [
    { id: '1', name: 'コクヨ ファイルボックス-FS ピース B4 グレー', code: 'フボ-FSB4M', image: '/img/product/A-74769_l1.jpg', price: 342, originalPrice: 380, badge: 'NEW', category: '文房具', brand: 'コクヨ', inStock: true, freeShipping: false },
    { id: '2', name: 'プラス デスクトレー A4横 ブラック', code: 'DM-110BK', image: '/img/product/8027341_l1.jpg', price: 580, originalPrice: 650, category: 'オフィス用品', brand: 'プラス', inStock: true, freeShipping: false },
    { id: '3', name: 'コクヨ キャンパスノート B5 5冊パック', code: 'ノ-3CBNX5', image: '/img/product/AH85168_l1.jpg', price: 450, category: '文房具', brand: 'コクヨ', inStock: true, freeShipping: false },
    { id: '4', name: 'キングジム テプラPRO', code: 'AW75238', image: '/img/product/AW75238_l1.jpg', price: 2990, badge: 'SALE', discount: 20, category: '電化製品', brand: 'キングジム', inStock: true, freeShipping: false },
    { id: '5', name: 'プラス オフィスチェア', code: 'AWA4132', image: '/img/product/AWA4132_l1.jpg', price: 12990, category: '家具', brand: 'プラス', inStock: true, freeShipping: true },
    { id: '6', name: 'その他ブランド 電卓', code: 'A-74770', image: '/img/product/8027341_l1.jpg', price: 1990, category: '電化製品', brand: 'その他', inStock: false, freeShipping: false },
    { id: '7', name: 'コクヨ デスクマット', code: 'A-74771', image: '/img/product/AH85168_l1.jpg', price: 3990, category: 'オフィス用品', brand: 'コクヨ', inStock: true, freeShipping: true },
    { id: '8', name: 'プラス ホワイトボード', code: 'A-74772', image: '/img/product/AWA4132_l1.jpg', price: 8990, badge: 'SALE', category: 'オフィス用品', brand: 'プラス', inStock: true, freeShipping: true },
    { id: '9', name: 'キングジム ラベルライター', code: 'A-74773', image: '/img/product/AW75238_l1.jpg', price: 4500, category: '電化製品', brand: 'キングジム', inStock: true, freeShipping: false },
    { id: '10', name: 'コクヨ パンチ', code: 'A-74774', image: '/img/product/A-74769_l1.jpg', price: 850, category: '文房具', brand: 'コクヨ', inStock: true, freeShipping: false },
    { id: '11', name: 'プラス ハサミ', code: 'A-74775', image: '/img/product/8027341_l1.jpg', price: 650, category: '文房具', brand: 'プラス', inStock: true, freeShipping: false },
    { id: '12', name: 'その他ブランド ノート', code: 'A-74776', image: '/img/product/AH85168_l1.jpg', price: 320, category: '文房具', brand: 'その他', inStock: true, freeShipping: false },
    { id: '13', name: 'コクヨ クリアファイル', code: 'A-74777', image: '/img/product/AWA4132_l1.jpg', price: 180, category: '文房具', brand: 'コクヨ', inStock: true, freeShipping: false },
    { id: '14', name: 'キングジム ファイル', code: 'A-74778', image: '/img/product/AW75238_l1.jpg', price: 550, category: '文房具', brand: 'キングジム', inStock: false, freeShipping: false },
    { id: '15', name: 'プラス デスクライト', code: 'A-74779', image: '/img/product/A-74769_l1.jpg', price: 5800, category: '電化製品', brand: 'プラス', inStock: true, freeShipping: true },
    { id: '16', name: 'コクヨ 机上台', code: 'A-74780', image: '/img/product/8027341_l1.jpg', price: 3200, category: 'オフィス用品', brand: 'コクヨ', inStock: true, freeShipping: false },
  ];

  // フィルター
  const { filters, filteredItems, updateFilter, toggleBrand, resetFilters, activeFilterCount } = useFilters(allProducts);

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

  return (
    <main>
      <Breadcrumb items={breadcrumbItems} />

      {/* ページヘッダー */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">商品一覧</h1>
          <p className="text-gray-600">{sortedProducts.length}件の商品</p>
        </div>
      </section>

      {/* 商品一覧 */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* サイドバー - フィルター */}
            <aside className="w-full lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold text-gray-900">フィルター</h2>
                    {activeFilterCount > 0 && (
                      <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                        {activeFilterCount}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {activeFilterCount > 0 && (
                      <button
                        onClick={() => {
                          resetFilters();
                          resetPage();
                        }}
                        className="text-sm text-gray-600 hover:text-gray-900"
                      >
                        クリア
                      </button>
                    )}
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="text-blue-600 hover:text-blue-800 lg:hidden"
                    >
                      {showFilters ? '閉じる' : '開く'}
                    </button>
                  </div>
                </div>

                <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                  {/* カテゴリー */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">カテゴリー</h3>
                    <div className="space-y-2">
                      {['すべて', '文房具', 'オフィス用品', '家具', '電化製品'].map((cat) => (
                        <label key={cat} className="flex items-center cursor-pointer">
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
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">価格帯</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={filters.priceMin}
                          onChange={(e) => updateFilter('priceMin', parseInt(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                          placeholder="最小"
                        />
                        <span className="text-gray-500">〜</span>
                        <input
                          type="number"
                          value={filters.priceMax}
                          onChange={(e) => updateFilter('priceMax', parseInt(e.target.value) || 100000)}
                          className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                          placeholder="最大"
                        />
                      </div>
                      <button
                        onClick={handlePriceApply}
                        className="w-full px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                      >
                        適用
                      </button>
                    </div>
                  </div>

                  {/* ブランド */}
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">ブランド</h3>
                    <div className="space-y-2">
                      {['コクヨ', 'プラス', 'キングジム', 'その他'].map((brand) => (
                        <label key={brand} className="flex items-center cursor-pointer">
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
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">その他の条件</h3>
                    <div className="space-y-2">
                      <label className="flex items-center cursor-pointer">
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
                      <label className="flex items-center cursor-pointer">
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
                      <label className="flex items-center cursor-pointer">
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
            <div className="flex-1">
              {/* ソート・表示切替 */}
              <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <label htmlFor="sort" className="text-sm text-gray-700">並び替え:</label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="popular">人気順</option>
                    <option value="price-low">価格が安い順</option>
                    <option value="price-high">価格が高い順</option>
                    <option value="name">名前順</option>
                  </select>
                </div>

                <div className="text-sm text-gray-600">
                  {sortedProducts.length}件中 {(currentPage - 1) * 12 + 1}-{Math.min(currentPage * 12, sortedProducts.length)}件を表示
                </div>
              </div>

              {/* 商品グリッド */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
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
  );
}

export default ProductList;
