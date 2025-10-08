import { useState, useMemo } from 'react';
import Breadcrumb from '@/components/common/Breadcrumb';
import Pagination from '@/components/common/Pagination';
import ProductListItem from '@/components/product/ProductListItem';
import SearchFilters from '@/components/search/SearchFilters';
import SearchSort from '@/components/search/SearchSort';
import FilterTag from '@/components/search/FilterTag';

const meta = {
  title: 'Templates/ProductListPage',
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
};

export default meta;

// サンプル商品データ
const generateProducts = (count) => Array.from({ length: count }, (_, i) => ({
  id: `prod-${i + 1}`,
  name: `商品${i + 1}`,
  code: `CODE-${String(i + 1).padStart(3, '0')}`,
  price: Math.floor(Math.random() * 50000) + 1000,
  image: `https://placehold.co/400x400/e2e8f0/1e293b?text=Product+${i + 1}`,
  images: [`https://placehold.co/400x400/e2e8f0/1e293b?text=Product+${i + 1}`],
  brand: ['BrandA', 'BrandB', 'BrandC'][i % 3],
  category: ['文具・事務用品', '電化製品', '家具'][i % 3],
  stock: i % 5 !== 0,
  rating: 3 + Math.random() * 2,
  tags: i % 3 === 0 ? ['人気'] : i % 3 === 1 ? ['新商品'] : [],
}));

const sampleProducts = generateProducts(36);

const categories = ['文具・事務用品', '電化製品', '家具'];
const brands = ['BrandA', 'BrandB', 'BrandC'];

// デフォルトの商品一覧
export const Default = {
  render: () => {
    const [sortBy, setSortBy] = useState('name-asc');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 18;
    const totalPages = Math.ceil(sampleProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = sampleProducts.slice(startIndex, startIndex + itemsPerPage);

    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <main className="flex-grow">
          <Breadcrumb />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* ヘッダー */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">商品一覧</h1>
              <p className="text-gray-600">全{sampleProducts.length}件の商品</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* フィルターサイドバー */}
              <aside className="lg:w-64 flex-shrink-0">
                <SearchFilters
                  categories={categories}
                  brands={brands}
                  selectedCategories={[]}
                  selectedBrands={[]}
                  priceRange={[0, 100000]}
                  minRating={0}
                  inStockOnly={false}
                  onCategoryChange={() => {}}
                  onBrandChange={() => {}}
                  onPriceRangeChange={() => {}}
                  onMinRatingChange={() => {}}
                  onInStockChange={() => {}}
                />
              </aside>

              {/* メインコンテンツ */}
              <div className="flex-grow">
                {/* ソート */}
                <div className="mb-6 flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    {sampleProducts.length}件中 {startIndex + 1}-{Math.min(startIndex + itemsPerPage, sampleProducts.length)}件を表示
                  </p>
                  <SearchSort sortBy={sortBy} onSortChange={setSortBy} />
                </div>

                {/* 商品リスト */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {paginatedProducts.map((product) => (
                    <ProductListItem key={product.id} product={product} />
                  ))}
                </div>

                {/* ページネーション */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  },
};

// フィルター適用済み
export const WithFilters = {
  render: () => {
    const [sortBy, setSortBy] = useState('price-asc');
    const [selectedCategories, setSelectedCategories] = useState(['電化製品']);
    const [selectedBrands, setSelectedBrands] = useState(['BrandA']);
    const [currentPage, setCurrentPage] = useState(1);

    const filteredProducts = sampleProducts.filter(
      (p) => selectedCategories.includes(p.category) && selectedBrands.includes(p.brand)
    );

    const itemsPerPage = 18;
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <main className="flex-grow">
          <Breadcrumb />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">商品一覧</h1>
              <p className="text-gray-600">全{filteredProducts.length}件の商品</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              <aside className="lg:w-64 flex-shrink-0">
                <SearchFilters
                  categories={categories}
                  brands={brands}
                  selectedCategories={selectedCategories}
                  selectedBrands={selectedBrands}
                  priceRange={[0, 100000]}
                  minRating={0}
                  inStockOnly={false}
                  onCategoryChange={setSelectedCategories}
                  onBrandChange={setSelectedBrands}
                  onPriceRangeChange={() => {}}
                  onMinRatingChange={() => {}}
                  onInStockChange={() => {}}
                />
              </aside>

              <div className="flex-grow">
                {/* フィルタータグ */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {selectedCategories.map((cat) => (
                    <FilterTag
                      key={cat}
                      label={cat}
                      onRemove={() => setSelectedCategories(selectedCategories.filter(c => c !== cat))}
                    />
                  ))}
                  {selectedBrands.map((brand) => (
                    <FilterTag
                      key={brand}
                      label={brand}
                      onRemove={() => setSelectedBrands(selectedBrands.filter(b => b !== brand))}
                    />
                  ))}
                </div>

                <div className="mb-6 flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    {filteredProducts.length}件中 {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredProducts.length)}件を表示
                  </p>
                  <SearchSort sortBy={sortBy} onSortChange={setSortBy} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {paginatedProducts.map((product) => (
                    <ProductListItem key={product.id} product={product} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  },
};

// 検索結果なし
export const NoResults = {
  render: () => (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow">
        <Breadcrumb />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">商品一覧</h1>
            <p className="text-gray-600">0件の商品</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-64 flex-shrink-0">
              <SearchFilters
                categories={categories}
                brands={brands}
                selectedCategories={['電化製品']}
                selectedBrands={['BrandA', 'BrandB', 'BrandC']}
                priceRange={[90000, 100000]}
                minRating={4.5}
                inStockOnly={true}
                onCategoryChange={() => {}}
                onBrandChange={() => {}}
                onPriceRangeChange={() => {}}
                onMinRatingChange={() => {}}
                onInStockChange={() => {}}
              />
            </aside>

            <div className="flex-grow">
              <div className="mb-4 flex flex-wrap gap-2">
                <FilterTag label="電化製品" onRemove={() => {}} />
                <FilterTag label="BrandA" onRemove={() => {}} />
                <FilterTag label="BrandB" onRemove={() => {}} />
                <FilterTag label="BrandC" onRemove={() => {}} />
                <FilterTag label="¥90,000 - ¥100,000" onRemove={() => {}} />
                <FilterTag label="評価4.5以上" onRemove={() => {}} />
                <FilterTag label="在庫あり" onRemove={() => {}} />
              </div>

              <div className="text-center py-16">
                <div className="mb-4">
                  <svg className="mx-auto h-24 w-24 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  条件に一致する商品が見つかりませんでした
                </h3>
                <p className="text-gray-600 mb-6">
                  フィルター条件を変更して再度お試しください
                </p>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  フィルターをクリア
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  ),
};

// 少数の商品
export const FewProducts = {
  render: () => {
    const fewProducts = sampleProducts.slice(0, 6);

    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <main className="flex-grow">
          <Breadcrumb />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">商品一覧</h1>
              <p className="text-gray-600">全{fewProducts.length}件の商品</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              <aside className="lg:w-64 flex-shrink-0">
                <SearchFilters
                  categories={categories}
                  brands={brands}
                  selectedCategories={[]}
                  selectedBrands={[]}
                  priceRange={[0, 100000]}
                  minRating={0}
                  inStockOnly={false}
                  onCategoryChange={() => {}}
                  onBrandChange={() => {}}
                  onPriceRangeChange={() => {}}
                  onMinRatingChange={() => {}}
                  onInStockChange={() => {}}
                />
              </aside>

              <div className="flex-grow">
                <div className="mb-6 flex justify-between items-center">
                  <p className="text-sm text-gray-600">{fewProducts.length}件を表示</p>
                  <SearchSort sortBy="name-asc" onSortChange={() => {}} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {fewProducts.map((product) => (
                    <ProductListItem key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  },
};

// ページネーション複数ページ
export const MultiplePages = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(2);
    const itemsPerPage = 18;
    const totalPages = Math.ceil(sampleProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = sampleProducts.slice(startIndex, startIndex + itemsPerPage);

    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <main className="flex-grow">
          <Breadcrumb />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">商品一覧</h1>
              <p className="text-gray-600">全{sampleProducts.length}件の商品</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              <aside className="lg:w-64 flex-shrink-0">
                <SearchFilters
                  categories={categories}
                  brands={brands}
                  selectedCategories={[]}
                  selectedBrands={[]}
                  priceRange={[0, 100000]}
                  minRating={0}
                  inStockOnly={false}
                  onCategoryChange={() => {}}
                  onBrandChange={() => {}}
                  onPriceRangeChange={() => {}}
                  onMinRatingChange={() => {}}
                  onInStockChange={() => {}}
                />
              </aside>

              <div className="flex-grow">
                <div className="mb-6 flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    {sampleProducts.length}件中 {startIndex + 1}-{Math.min(startIndex + itemsPerPage, sampleProducts.length)}件を表示
                  </p>
                  <SearchSort sortBy="name-asc" onSortChange={() => {}} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {paginatedProducts.map((product) => (
                    <ProductListItem key={product.id} product={product} />
                  ))}
                </div>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  },
};

// モバイルレイアウト
export const MobileLayout = {
  render: () => {
    const mobileProducts = sampleProducts.slice(0, 9);

    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <main className="flex-grow">
          <Breadcrumb />

          <div className="px-4 py-6">
            <div className="mb-4">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">商品一覧</h1>
              <p className="text-sm text-gray-600">全{mobileProducts.length}件</p>
            </div>

            {/* モバイル用フィルターボタン */}
            <div className="mb-4 flex gap-2">
              <button className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                フィルター
              </button>
              <button className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                並び替え
              </button>
            </div>

            <div className="space-y-4">
              {mobileProducts.map((product) => (
                <ProductListItem key={product.id} product={product} />
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

// カテゴリ別表示
export const CategoryView = {
  render: () => {
    const categoryProducts = sampleProducts.filter(p => p.category === '電化製品');

    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <main className="flex-grow">
          <Breadcrumb />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">電化製品</h1>
              <p className="text-gray-600 leading-relaxed">
                最新の電化製品を取り揃えております。高品質な商品をお手頃な価格でご提供いたします。
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">絞り込み</h2>
              <div className="flex flex-wrap gap-2">
                <button className="px-4 py-2 border rounded-full hover:bg-gray-50">
                  価格: すべて
                </button>
                <button className="px-4 py-2 border rounded-full hover:bg-gray-50">
                  在庫あり
                </button>
                <button className="px-4 py-2 border rounded-full hover:bg-gray-50">
                  評価: 4つ星以上
                </button>
              </div>
            </div>

            <div className="mb-6 flex justify-between items-center">
              <p className="text-sm text-gray-600">{categoryProducts.length}件の商品</p>
              <SearchSort sortBy="name-asc" onSortChange={() => {}} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categoryProducts.map((product) => (
                <ProductListItem key={product.id} product={product} />
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  },
};
