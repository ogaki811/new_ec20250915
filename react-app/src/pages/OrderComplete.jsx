import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import OptimizedImage from '../components/OptimizedImage';

function OrderComplete() {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state?.orderData;

  // 注文データがない場合はトップページへリダイレクト
  useEffect(() => {
    if (!orderData) {
      navigate('/');
    }
  }, [orderData, navigate]);

  // データがない場合は何も表示しない
  if (!orderData) {
    return null;
  }

  const order = orderData;

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 完了メッセージ */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8 text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">ご注文ありがとうございます</h1>
            <p className="text-gray-600">ご注文を受け付けました</p>
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
            <p className="text-sm text-gray-700 mb-2">注文番号</p>
            <p className="text-2xl font-bold text-blue-600">{order.id}</p>
          </div>

          <div className="text-left space-y-2 text-sm text-gray-700 bg-gray-50 rounded-lg p-4">
            <p>✓ 注文確認メールを送信しました</p>
            <p>✓ ご登録のメールアドレス宛に詳細をお送りしています</p>
            <p>✓ 商品の発送準備が完了次第、発送通知メールをお送りします</p>
          </div>
        </div>

        {/* 注文詳細 */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">注文内容</h2>

          {/* 商品リスト */}
          <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <OptimizedImage
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded border border-gray-200"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.name}</p>
                  {item.code && <p className="text-sm text-gray-600">商品コード: {item.code}</p>}
                  <p className="text-sm text-gray-600">数量: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">¥{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 合計 */}
          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-gray-700">
              <span>小計</span>
              <span>¥{order.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>配送料</span>
              <span>{order.shippingFee === 0 ? '無料' : `¥${order.shippingFee.toLocaleString()}`}</span>
            </div>
            {order.pointsUsed > 0 && (
              <div className="flex justify-between text-green-600">
                <span>ポイント利用</span>
                <span>-¥{order.pointsUsed.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t border-gray-200">
              <span>合計</span>
              <span className="text-blue-600">¥{order.total.toLocaleString()}</span>
            </div>
          </div>

          {/* 配送先情報 */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">配送先情報</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-1 text-sm">
              <p className="font-medium text-gray-900">{order.shippingAddress.name}</p>
              <p className="text-gray-700">〒{order.shippingAddress.postalCode}</p>
              <p className="text-gray-700">{order.shippingAddress.address}</p>
              <p className="text-gray-700">TEL: {order.shippingAddress.phone}</p>
            </div>
          </div>

          {/* お支払い方法 */}
          <div className="pt-6 border-t border-gray-200 mt-6">
            <h3 className="font-semibold text-gray-900 mb-3">お支払い方法</h3>
            <p className="text-gray-700">{order.paymentMethod}</p>
          </div>

          {/* 配送日時 */}
          <div className="pt-6 border-t border-gray-200 mt-6">
            <h3 className="font-semibold text-gray-900 mb-3">配送日時</h3>
            <div className="text-gray-700 space-y-1">
              <p>配送予定日: {order.deliveryDate}</p>
              <p>配送時間帯: {order.deliveryTime}</p>
            </div>
          </div>
        </div>

        {/* アクションボタン */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button to="/order-history" variant="primary" fullWidth>
            注文履歴を見る
          </Button>
          <Button to="/" variant="secondary" fullWidth>
            ショッピングを続ける
          </Button>
        </div>

        {/* サポート情報 */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-3">お問い合わせ</h3>
          <p className="text-sm text-gray-700 mb-2">
            ご不明な点がございましたら、お気軽にお問い合わせください。
          </p>
          <div className="text-sm text-gray-700">
            <p>カスタマーサポート: 0120-XXX-XXX</p>
            <p>受付時間: 平日 9:00-18:00</p>
            <p>メール: support@example.com</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default OrderComplete;
