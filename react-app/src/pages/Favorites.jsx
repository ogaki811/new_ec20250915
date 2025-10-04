import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function Favorites() {
  const favorites = [
    { name: 'A4コピー用紙 5000枚', code: 'AWA4132', price: '7,990', image: 'AWA4132_l1.jpg', stock: 'あり' },
    { name: 'オフィスチェア', code: 'AW75238', price: '8,500', image: 'AW75238_l1.jpg', stock: 'あり' },
    { name: 'ボールペン 10本セット', code: '8027341', price: '1,200', image: '8027341_l1.jpg', stock: 'あり' },
    { name: 'クリアファイル 20枚', code: 'AH85168', price: '980', image: 'AH85168_l1.jpg', stock: 'あり' },
    { name: 'マウスパッド', code: 'XU14820', price: '1,500', image: 'XU14820_l1.jpg', stock: 'あり' }
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* サイドバー */}
          <Sidebar />

          {/* メインコンテンツ */}
          <div className="lg:col-span-3 mt-8 lg:mt-0">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h1 className="text-3xl font-medium text-gray-900 mb-8 pb-2 border-b-2 border-blue-600">
                お気に入り
              </h1>

              {/* お気に入り商品グリッド */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((product, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <Link to="/product-detail" className="block relative">
                      <div className="aspect-square bg-gray-100 relative">
                        <img
                          src={`/img/product/${product.image}`}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                        <button className="absolute top-2 right-2 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors">
                          <svg className="w-6 h-6 text-red-500 fill-current" viewBox="0 0 24 24">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                          </svg>
                        </button>
                      </div>
                    </Link>
                    <div className="p-4">
                      <Link to="/product-detail">
                        <h3 className="font-medium text-gray-900 mb-2 hover:text-blue-600">{product.name}</h3>
                      </Link>
                      <p className="text-sm text-gray-500 mb-2">商品コード: {product.code}</p>
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-lg font-bold text-gray-900">¥{product.price}</p>
                        <span className="text-sm text-green-600">在庫: {product.stock}</span>
                      </div>
                      <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        カートに追加
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* 空の状態 - コメントアウトしておきます */}
              {/* {favorites.length === 0 && (
                <div className="text-center py-12">
                  <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">お気に入りがありません</h3>
                  <p className="mt-2 text-gray-500">商品ページからお気に入りに追加してください</p>
                  <Link to="/products" className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    商品を探す
                  </Link>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Favorites;
