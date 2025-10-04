import { Link } from 'react-router-dom';

function Home() {
  return (
    <main>
      {/* メインバナースライダー */}
      <section className="main-banner-section relative w-full bg-gray-100">
        <div className="banner-container relative w-full overflow-hidden" style={{ height: '500px' }}>
          <div className="banner-slide active">
            <img src="/img/mainbanner/mainbanner_01.jpg" alt="バナー1" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                <Link to="/product-detail" className="block">
                  <div className="relative aspect-square bg-gray-100">
                    <img
                      src={`/img/product/${item === 1 ? '8027341_l1' : item === 2 ? 'AH85168_l1' : item === 3 ? 'AWA4132_l1' : 'AW75238_l1'}.jpg`}
                      alt={`商品${item}`}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">NEW</span>
                  </div>
                </Link>
                <div className="p-4">
                  <Link to="/product-detail">
                    <h3 className="font-medium text-gray-900 mb-2 hover:text-blue-600">プレミアム商品 {item}</h3>
                  </Link>
                  <p className="text-sm text-gray-500 mb-2">商品コード: 80273{item}</p>
                  <p className="text-lg font-bold text-gray-900 mb-3">¥2,990</p>
                  <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors">
                    カートに追加
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
