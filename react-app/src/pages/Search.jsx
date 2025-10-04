import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import Pagination from '../components/Pagination';
import usePagination from '../hooks/usePagination';

function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // サンプル商品データ（実際にはAPIから取得）
  const allProducts = [
    { id: '1', name: 'A4コピー用紙 5000枚', code: 'AWA4132', price: 7990, image: '/img/product/AWA4132_l1.jpg', brand: 'コクヨ' },
    { id: '2', name: 'オフィスチェア エルゴノミック', code: 'AW75238', price: 45800, image: '/img/product/AW75238_l1.jpg', brand: 'オカムラ' },
    { id: '3', name: 'ボールペン 10本セット', code: '8027341', price: 1200, image: '/img/product/8027341_l1.jpg', brand: 'ゼブラ' },
    { id: '4', name: 'クリアファイル 20枚', code: 'AH85168', price: 980, image: '/img/product/AH85168_l1.jpg', brand: 'コクヨ' },
    { id: '5', name: 'デスクマット 透明', code: 'DM110BK', price: 2500, image: '/img/product/AWA4132_l1.jpg', brand: 'プラス' },
    { id: '6', name: 'シャープペンシル 0.5mm', code: 'SP05', price: 450, image: '/img/product/8027341_l1.jpg', brand: 'ぺんてる' },
  ];

  useEffect(() => {
    // 検索処理のシミュレーション
    setLoading(true);
    setTimeout(() => {
      if (query) {
        const searchQuery = query.toLowerCase();
        const results = allProducts.filter((product) =>
          product.name.toLowerCase().includes(searchQuery) ||
          product.code.toLowerCase().includes(searchQuery) ||
          product.brand.toLowerCase().includes(searchQuery)
        );
        setProducts(results);
      } else {
        setProducts(allProducts);
      }
      setLoading(false);
    }, 300);
  }, [query]);

  // ページネーション
  const { currentPage, totalPages, paginatedItems, handlePageChange } = usePagination(products, 18);

  const breadcrumbItems = [
    { label: 'ホーム', href: '/' },
    { label: '検索結果' }
  ];

  if (loading) {
    return <Loading fullScreen />;
  }

  return (
    <main>
      <Breadcrumb items={breadcrumbItems} />

      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 検索結果ヘッダー */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              検索結果
            </h1>
            {query && (
              <p className="text-gray-600">
                「<span className="font-semibold text-blue-600">{query}</span>」の検索結果: {products.length}件
              </p>
            )}
          </div>

          {/* 検索結果 */}
          {products.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {paginatedItems.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    size="compact"
                  />
                ))}
              </div>

              {/* ページネーション */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <div className="text-center py-16">
              <svg
                className="mx-auto h-24 w-24 text-gray-400 mb-4"
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
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                検索結果が見つかりませんでした
              </h2>
              <p className="text-gray-600 mb-6">
                別のキーワードで検索してみてください
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Search;
