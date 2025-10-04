import { Link } from 'react-router-dom';
import HeroSlider from '../components/HeroSlider';
import ProductCard from '../components/ProductCard';
import ProductSlider from '../components/ProductSlider';
import { sampleProducts } from '../data/sampleProducts';

function Home() {
  // おすすめ商品: 人気タグがある商品、または評価が高い商品
  const recommendedProducts = sampleProducts
    .filter(p => p.tags.includes('人気') || p.rating >= 4.5)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 12);

  // 新着商品: 新商品タグがある商品
  const newProducts = sampleProducts
    .filter(p => p.tags.includes('新商品'))
    .slice(0, 6);

  // セール商品: セールタグがある商品
  const saleProducts = sampleProducts
    .filter(p => p.tags.includes('セール'))
    .slice(0, 6);

  return (
    <main>
      {/* メインバナースライダー */}
      <HeroSlider />

      {/* 人気カテゴリー */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">人気カテゴリー</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Link to="/category/office" className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center bg-blue-100 rounded-full">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900">オフィス用品</h3>
            </Link>
            <Link to="/category/stationery" className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center bg-blue-100 rounded-full">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 19l7-7 3 3-7 7-3-3z" />
                  <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900">文具</h3>
            </Link>
            <Link to="/category/electronics" className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center bg-blue-100 rounded-full">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900">電化製品</h3>
            </Link>
            <Link to="/category/furniture" className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center bg-blue-100 rounded-full">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12v7h14v-7" />
                  <path d="M5 12l-2 0v-2c0-1 1-2 2-2h14c1 0 2 1 2 2v2l-2 0" />
                  <rect x="7" y="4" width="10" height="4" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900">家具</h3>
            </Link>
          </div>
        </div>
      </section>

      {/* おすすめ商品 */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">おすすめ商品</h2>
            <Link to="/products" className="text-blue-600 hover:text-blue-800">すべて見る →</Link>
          </div>
          <ProductSlider products={recommendedProducts} />
        </div>
      </section>

      {/* 新着商品 */}
      {newProducts.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">新着商品</h2>
              <Link to="/search" className="text-blue-600 hover:text-blue-800">すべて見る →</Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {newProducts.map((product) => (
                <ProductCard key={product.id} product={product} size="compact" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* セール商品 */}
      {saleProducts.length > 0 && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">セール商品</h2>
                <p className="text-red-600 font-semibold mt-2">期間限定！お得なプライス</p>
              </div>
              <Link to="/search" className="text-blue-600 hover:text-blue-800">すべて見る →</Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {saleProducts.map((product) => (
                <ProductCard key={product.id} product={product} size="compact" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 新着情報 */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">新着情報</h2>
          <div className="bg-white rounded-lg shadow-sm p-6 max-w-3xl mx-auto">
            <div className="space-y-4">
              <div className="border-b border-gray-200 py-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">2024.01.15</span>
                  <span className="bg-blue-600 text-white px-2 py-1 text-xs rounded">お知らせ</span>
                  <Link to="#" className="text-gray-800 hover:text-blue-600">サイトリニューアルのお知らせ</Link>
                </div>
              </div>
              <div className="border-b border-gray-200 py-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">2024.01.12</span>
                  <span className="bg-orange-600 text-white px-2 py-1 text-xs rounded">キャンペーン</span>
                  <Link to="#" className="text-gray-800 hover:text-blue-600">新春セール開催中！最大50%オフ</Link>
                </div>
              </div>
              <div className="border-b border-gray-200 py-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">2024.01.08</span>
                  <span className="bg-green-600 text-white px-2 py-1 text-xs rounded">商品情報</span>
                  <Link to="#" className="text-gray-800 hover:text-blue-600">新商品「プレミアム文具セット」発売</Link>
                </div>
              </div>
            </div>
            <div className="text-center mt-6">
              <Link to="#" className="text-blue-600 hover:text-blue-800 text-sm">すべての新着情報を見る →</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
