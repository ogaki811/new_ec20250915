import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function MyPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* サイドバー */}
          <Sidebar />

          {/* メインコンテンツ */}
          <div className="lg:col-span-3 mt-8 lg:mt-0">
            {/* ダッシュボード */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-3xl font-medium text-gray-900 mb-8 pb-2 border-b-2 border-blue-600">
                ダッシュボード
              </h2>

              {/* 登録情報 */}
              <section className="mb-12">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">登録情報</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">お名前</p>
                      <p className="text-lg font-medium text-gray-900">山田 太郎</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">メールアドレス</p>
                      <p className="text-lg font-medium text-gray-900">yamada@example.com</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">電話番号</p>
                      <p className="text-lg font-medium text-gray-900">090-1234-5678</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">会員ランク</p>
                      <p className="text-lg font-medium text-blue-600">ゴールド会員</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">保有ポイント</p>
                      <p className="text-lg font-medium text-green-600">2,500 ポイント</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">登録日</p>
                      <p className="text-lg font-medium text-gray-900">2023年4月15日</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* 最近の注文 */}
              <section className="mb-12">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">最近の注文</h3>
                  <Link to="/order-history" className="text-blue-600 hover:text-blue-800 text-sm">
                    すべて見る →
                  </Link>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      id: '20240115-001',
                      date: '2024年1月15日',
                      status: '配送中',
                      statusColor: 'bg-blue-100 text-blue-800',
                      total: '15,980',
                      items: [
                        { name: 'A4コピー用紙 5000枚', image: 'AWA4132_l1.jpg', quantity: 2 }
                      ]
                    },
                    {
                      id: '20240110-002',
                      date: '2024年1月10日',
                      status: '配送完了',
                      statusColor: 'bg-green-100 text-green-800',
                      total: '8,500',
                      items: [
                        { name: 'オフィスチェア', image: 'AW75238_l1.jpg', quantity: 1 }
                      ]
                    }
                  ].map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="font-semibold text-gray-900">注文番号: {order.id}</p>
                          <p className="text-sm text-gray-600">{order.date}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${order.statusColor}`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <img
                          src={`/img/product/${order.items[0].image}`}
                          alt={order.items[0].name}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="text-gray-900">{order.items[0].name}</p>
                          <p className="text-sm text-gray-600">数量: {order.items[0].quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">¥{order.total}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* おすすめ商品 */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">おすすめ商品</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { name: 'ボールペン 10本セット', code: '802734', price: '1,200', image: '8027341_l1.jpg' },
                    { name: 'クリアファイル 20枚', code: 'AH8516', price: '980', image: 'AH85168_l1.jpg' },
                    { name: 'マウスパッド', code: 'XU1482', price: '1,500', image: 'XU14820_l1.jpg' }
                  ].map((product, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                      <Link to="/product-detail">
                        <div className="aspect-square bg-gray-100">
                          <img
                            src={`/img/product/${product.image}`}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </Link>
                      <div className="p-4">
                        <Link to="/product-detail">
                          <h4 className="font-medium text-gray-900 mb-2 hover:text-blue-600">{product.name}</h4>
                        </Link>
                        <p className="text-sm text-gray-500 mb-2">商品コード: {product.code}</p>
                        <p className="text-lg font-bold text-gray-900">¥{product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MyPage;
