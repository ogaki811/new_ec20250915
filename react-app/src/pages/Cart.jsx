import { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import StepIndicator from '../components/StepIndicator';
import CartItem from '../components/CartItem';
import Button from '../components/Button';

function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 'item001',
      name: 'コクヨ ファイルボックス-FS ピース B4 グレー',
      code: 'フボ-FSB4M',
      brand: 'コクヨ',
      image: '/img/product/A-74769_l1.jpg',
      price: 342,
      originalPrice: 380,
      quantity: 2,
      stock: 98,
      badges: [
        { label: '翌日配送', className: 'bg-blue-100 text-blue-800' },
        { label: '送料無料対象', className: 'bg-green-100 text-green-800' }
      ]
    },
    {
      id: 'item002',
      name: 'プラス デスクトレー A4横 ブラック',
      code: 'DM-110BK',
      brand: 'プラス',
      image: '/img/product/8027341_l1.jpg',
      price: 580,
      originalPrice: 650,
      quantity: 1,
      stock: 45,
      badges: [
        { label: '翌日配送', className: 'bg-blue-100 text-blue-800' }
      ]
    },
    {
      id: 'item003',
      name: 'コクヨ キャンパスノート B5 5冊パック',
      code: 'ノ-3CBNX5',
      brand: 'コクヨ',
      image: '/img/product/AH85168_l1.jpg',
      price: 450,
      quantity: 3,
      stock: 120,
      badges: [
        { label: '送料無料対象', className: 'bg-green-100 text-green-800' }
      ]
    }
  ]);

  const breadcrumbItems = [
    { label: 'ホーム', href: '/' },
    { label: 'ショッピングカート' }
  ];

  const handleQuantityChange = (itemId, newQuantity) => {
    setCartItems(prev => prev.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleRemove = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleToggleFavorite = (itemId) => {
    console.log('Toggle favorite for:', itemId);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingFee = subtotal >= 3000 ? 0 : 500;
  const total = subtotal + shippingFee;

  return (
    <main>
      <Breadcrumb items={breadcrumbItems} />

      <StepIndicator currentStep={1} />

      {/* カートコンテンツ */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* カートアイテム一覧 */}
            <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="flex items-center justify-between p-6 bg-gray-50 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  カート内商品 (<span className="text-blue-600 font-bold">{cartItems.length}</span>点)
                </h2>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2 text-sm cursor-pointer">
                    <input type="checkbox" id="selectAll" defaultChecked className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    <span>すべて選択</span>
                  </label>
                  <button className="flex items-center space-x-2 px-3 py-1.5 border border-red-300 text-red-600 text-sm rounded hover:bg-red-50 transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <polyline points="3,6 5,6 21,6"></polyline>
                      <path d="m19,6 v14c0,1 -1,2 -2,2H7c-1,0 -2,-1 -2,-2V6m3,0V4c0,-1 1,-2 2,-2h4c1,0 2,1 2,2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                    選択商品を削除
                  </button>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {cartItems.map(item => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemove}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>

              {cartItems.length === 0 && (
                <div className="p-12 text-center">
                  <div className="text-gray-400 mb-4">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="mx-auto">
                      <circle cx="9" cy="21" r="1"></circle>
                      <circle cx="20" cy="21" r="1"></circle>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                  </div>
                  <p className="text-gray-600 mb-4">カートに商品がありません</p>
                  <Button to="/" variant="primary">ショッピングを続ける</Button>
                </div>
              )}
            </div>

            {/* 注文サマリー */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">注文サマリー</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>小計</span>
                    <span className="font-semibold">¥{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>配送料</span>
                    <span className="font-semibold">
                      {shippingFee === 0 ? (
                        <span className="text-green-600">無料</span>
                      ) : (
                        `¥${shippingFee.toLocaleString()}`
                      )}
                    </span>
                  </div>
                  {subtotal < 3000 && (
                    <div className="text-sm text-orange-600 bg-orange-50 p-3 rounded">
                      あと¥{(3000 - subtotal).toLocaleString()}で送料無料
                    </div>
                  )}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>合計</span>
                      <span className="text-2xl text-blue-600">¥{total.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">（税込）</p>
                  </div>
                </div>

                <Button
                  variant="primary"
                  fullWidth
                  disabled={cartItems.length === 0}
                  to="/checkout"
                >
                  購入手続きへ進む
                </Button>

                <Button to="/" variant="link" fullWidth className="mt-4 justify-center">
                  ← ショッピングを続ける
                </Button>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">お支払い方法</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                      <line x1="1" y1="10" x2="23" y2="10"></line>
                    </svg>
                    <span>クレジットカード</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mt-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                      <line x1="2" y1="10" x2="22" y2="10"></line>
                    </svg>
                    <span>銀行振込・代金引換</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">配送について</h3>
                  <div className="text-sm text-gray-600 space-y-2">
                    <p>• 3,000円以上で送料無料</p>
                    <p>• 最短翌日配送</p>
                    <p>• 時間指定可能</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Cart;
