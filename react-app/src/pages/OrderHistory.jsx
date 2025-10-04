import Sidebar from '../components/Sidebar';

function OrderHistory() {
  const orders = [
    {
      id: '20240115-001',
      date: '2024年1月15日',
      status: '配送中',
      statusColor: 'bg-blue-100 text-blue-800',
      total: '15,980',
      items: [
        { name: 'A4コピー用紙 5000枚', code: 'AWA4132', price: '7,990', quantity: 2, image: 'AWA4132_l1.jpg' }
      ]
    },
    {
      id: '20240110-002',
      date: '2024年1月10日',
      status: '配送完了',
      statusColor: 'bg-green-100 text-green-800',
      total: '8,500',
      items: [
        { name: 'オフィスチェア', code: 'AW75238', price: '8,500', quantity: 1, image: 'AW75238_l1.jpg' }
      ]
    },
    {
      id: '20240105-003',
      date: '2024年1月5日',
      status: '配送完了',
      statusColor: 'bg-green-100 text-green-800',
      total: '3,200',
      items: [
        { name: 'ボールペン 10本セット', code: '8027341', price: '1,200', quantity: 1, image: '8027341_l1.jpg' },
        { name: 'クリアファイル 20枚', code: 'AH85168', price: '2,000', quantity: 1, image: 'AH85168_l1.jpg' }
      ]
    }
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
                注文履歴
              </h1>

              {/* フィルター */}
              <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">期間</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>すべて</option>
                    <option>過去1ヶ月</option>
                    <option>過去3ヶ月</option>
                    <option>過去6ヶ月</option>
                    <option>過去1年</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ステータス</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>すべて</option>
                    <option>注文確認中</option>
                    <option>配送準備中</option>
                    <option>配送中</option>
                    <option>配送完了</option>
                    <option>キャンセル</option>
                  </select>
                </div>
              </div>

              {/* 注文リスト */}
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="border border-gray-200 rounded-lg p-6">
                    {/* 注文ヘッダー */}
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 pb-4 border-b border-gray-200">
                      <div className="mb-4 md:mb-0">
                        <p className="font-semibold text-gray-900 text-lg">注文番号: {order.id}</p>
                        <p className="text-sm text-gray-600 mt-1">{order.date}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`px-4 py-2 rounded-full text-sm font-medium ${order.statusColor}`}>
                          {order.status}
                        </span>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                          詳細を見る
                        </button>
                      </div>
                    </div>

                    {/* 注文商品 */}
                    <div className="space-y-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center space-x-4">
                          <img
                            src={`/img/product/${item.image}`}
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-600">商品コード: {item.code}</p>
                            <p className="text-sm text-gray-600">数量: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-gray-900">¥{item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* 合計 */}
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <p className="text-lg font-semibold text-gray-900">合計金額</p>
                        <p className="text-2xl font-bold text-gray-900">¥{order.total}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* ページネーション */}
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50" disabled>
                    前へ
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">1</button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">3</button>
                  <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    次へ
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default OrderHistory;
