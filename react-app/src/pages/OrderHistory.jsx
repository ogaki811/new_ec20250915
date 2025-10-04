import Sidebar from '../components/Sidebar';
import Badge from '../components/Badge';
import Button from '../components/Button';

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
    <main className="ec-order-history min-h-screen bg-gray-50 py-8">
      <div className="ec-order-history__container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="ec-order-history__layout lg:grid lg:grid-cols-4 lg:gap-8">
          {/* サイドバー */}
          <Sidebar />

          {/* メインコンテンツ */}
          <div className="ec-order-history__content lg:col-span-3 mt-8 lg:mt-0">
            <div className="ec-order-history__card bg-white rounded-lg shadow-sm p-8">
              <h1 className="ec-order-history__title text-3xl font-medium text-gray-900 mb-8 pb-2 border-b-2 border-blue-600">
                注文履歴
              </h1>

              {/* フィルター */}
              <div className="ec-order-history__filters mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="ec-order-history__filter-field">
                  <label className="ec-order-history__filter-label block text-sm font-medium text-gray-700 mb-2">期間</label>
                  <select className="ec-order-history__filter-select w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>すべて</option>
                    <option>過去1ヶ月</option>
                    <option>過去3ヶ月</option>
                    <option>過去6ヶ月</option>
                    <option>過去1年</option>
                  </select>
                </div>
                <div className="ec-order-history__filter-field">
                  <label className="ec-order-history__filter-label block text-sm font-medium text-gray-700 mb-2">ステータス</label>
                  <select className="ec-order-history__filter-select w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
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
              <div className="ec-order-history__orders-list space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="ec-order-history__order-card border border-gray-200 rounded-lg p-6">
                    {/* 注文ヘッダー */}
                    <div className="ec-order-history__order-header flex flex-col md:flex-row md:justify-between md:items-center mb-6 pb-4 border-b border-gray-200">
                      <div className="ec-order-history__order-info mb-4 md:mb-0">
                        <p className="ec-order-history__order-number font-semibold text-gray-900 text-lg">注文番号: {order.id}</p>
                        <p className="ec-order-history__order-date text-sm text-gray-600 mt-1">{order.date}</p>
                      </div>
                      <div className="ec-order-history__order-actions flex items-center space-x-4">
                        <Badge variant={order.status === '配送中' ? 'primary' : 'success'}>
                          {order.status}
                        </Badge>
                        <Button variant="secondary" size="sm">
                          詳細を見る
                        </Button>
                      </div>
                    </div>

                    {/* 注文商品 */}
                    <div className="ec-order-history__items space-y-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="ec-order-history__item flex items-center space-x-4">
                          <img
                            src={`/img/product/${item.image}`}
                            alt={item.name}
                            className="ec-order-history__item-image w-24 h-24 object-cover rounded"
                          />
                          <div className="ec-order-history__item-details flex-1">
                            <p className="ec-order-history__item-name font-medium text-gray-900">{item.name}</p>
                            <p className="ec-order-history__item-code text-sm text-gray-600">商品コード: {item.code}</p>
                            <p className="ec-order-history__item-quantity text-sm text-gray-600">数量: {item.quantity}</p>
                          </div>
                          <div className="ec-order-history__item-price-wrapper text-right">
                            <p className="ec-order-history__item-price text-lg font-bold text-gray-900">¥{item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* 合計 */}
                    <div className="ec-order-history__total mt-6 pt-4 border-t border-gray-200">
                      <div className="ec-order-history__total-wrapper flex justify-between items-center">
                        <p className="ec-order-history__total-label text-lg font-semibold text-gray-900">合計金額</p>
                        <p className="ec-order-history__total-amount text-2xl font-bold text-gray-900">¥{order.total}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* ページネーション */}
              <div className="ec-order-history__pagination mt-8 flex justify-center">
                <nav className="ec-order-history__pagination-nav flex items-center space-x-2">
                  <button className="ec-order-history__pagination-button px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50" disabled>
                    前へ
                  </button>
                  <button className="ec-order-history__pagination-button ec-order-history__pagination-button--active px-4 py-2 bg-blue-600 text-white rounded-lg">1</button>
                  <button className="ec-order-history__pagination-button px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
                  <button className="ec-order-history__pagination-button px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">3</button>
                  <button className="ec-order-history__pagination-button px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
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
