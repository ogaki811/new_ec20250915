import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import StepIndicator from '../components/StepIndicator';
import Input from '../components/Input';
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';

function Checkout() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    email: '',
    phone: '',
    postalCode: '',
    prefecture: '',
    city: '',
    address: '',
    building: '',
    paymentMethod: 'credit',
    deliveryDate: '',
    deliveryTime: '',
    usePoints: false,
  });

  const cartItems = [
    {
      id: 'item001',
      name: 'コクヨ ファイルボックス-FS ピース B4 グレー',
      code: 'フボ-FSB4M',
      image: '/img/product/A-74769_l1.jpg',
      price: 342,
      quantity: 2,
    },
    {
      id: 'item002',
      name: 'プラス デスクトレー A4横 ブラック',
      code: 'DM-110BK',
      image: '/img/product/8027341_l1.jpg',
      price: 580,
      quantity: 1,
    },
  ];

  const breadcrumbItems = [
    { label: 'ホーム', href: '/' },
    { label: 'カート', href: '/cart' },
    { label: 'ご注文手続き' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Order submitted:', formData);
    // 注文完了ページへ遷移
    navigate('/order-complete');
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingFee = 500;
  const points = formData.usePoints ? 500 : 0;
  const total = subtotal + shippingFee - points;

  return (
    <main>
      <Breadcrumb items={breadcrumbItems} />
      <StepIndicator currentStep={2} />

      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* フォームエリア */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* お客様情報 */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">お客様情報</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      label="姓"
                      placeholder="山田"
                      required
                    />
                    <Input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      label="名"
                      placeholder="太郎"
                      required
                    />
                  </div>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    label="メールアドレス"
                    placeholder="example@email.com"
                    required
                  />
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    label="電話番号"
                    placeholder="090-1234-5678"
                    required
                  />
                </div>

                {/* 配送先情報 */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">配送先情報</h2>
                  <Input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    label="郵便番号"
                    placeholder="123-4567"
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="mb-6">
                      <label htmlFor="prefecture" className="block mb-2 font-medium text-gray-700 text-sm">
                        都道府県 <span className="text-red-500 ml-1">*</span>
                      </label>
                      <select
                        id="prefecture"
                        name="prefecture"
                        value={formData.prefecture}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base transition-all duration-300 bg-white focus:outline-none focus:border-blue-600 focus:shadow-lg focus:shadow-blue-100"
                        required
                      >
                        <option value="">選択してください</option>
                        <option value="東京都">東京都</option>
                        <option value="神奈川県">神奈川県</option>
                        <option value="大阪府">大阪府</option>
                        {/* 他の都道府県 */}
                      </select>
                    </div>
                    <Input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      label="市区町村"
                      placeholder="渋谷区"
                      required
                    />
                  </div>
                  <Input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    label="番地"
                    placeholder="神南1-2-3"
                    required
                  />
                  <Input
                    type="text"
                    id="building"
                    name="building"
                    value={formData.building}
                    onChange={handleChange}
                    label="建物名・部屋番号"
                    placeholder="〇〇ビル 4F"
                  />
                </div>

                {/* 配送日時指定 */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">配送日時指定</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="mb-6">
                      <label htmlFor="deliveryDate" className="block mb-2 font-medium text-gray-700 text-sm">
                        配送希望日
                      </label>
                      <input
                        type="date"
                        id="deliveryDate"
                        name="deliveryDate"
                        value={formData.deliveryDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base transition-all duration-300 bg-white focus:outline-none focus:border-blue-600 focus:shadow-lg focus:shadow-blue-100"
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="deliveryTime" className="block mb-2 font-medium text-gray-700 text-sm">
                        配送時間帯
                      </label>
                      <select
                        id="deliveryTime"
                        name="deliveryTime"
                        value={formData.deliveryTime}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base transition-all duration-300 bg-white focus:outline-none focus:border-blue-600 focus:shadow-lg focus:shadow-blue-100"
                      >
                        <option value="">指定なし</option>
                        <option value="morning">午前中</option>
                        <option value="12-14">12:00-14:00</option>
                        <option value="14-16">14:00-16:00</option>
                        <option value="16-18">16:00-18:00</option>
                        <option value="18-20">18:00-20:00</option>
                        <option value="19-21">19:00-21:00</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* お支払い方法 */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">お支払い方法</h2>
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-600 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="credit"
                        checked={formData.paymentMethod === 'credit'}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-3 flex items-center gap-2">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                          <line x1="1" y1="10" x2="23" y2="10"></line>
                        </svg>
                        クレジットカード
                      </span>
                    </label>
                    <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-600 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank"
                        checked={formData.paymentMethod === 'bank'}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-3">銀行振込</span>
                    </label>
                    <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-600 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-3">代金引換</span>
                    </label>
                  </div>
                </div>

                {/* ポイント使用 */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <Checkbox
                    id="usePoints"
                    name="usePoints"
                    checked={formData.usePoints}
                    onChange={handleChange}
                    label="保有ポイントを使用する (500ポイント利用可能)"
                  />
                </div>
              </form>
            </div>

            {/* 注文サマリー */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">注文内容</h2>

                {/* 商品リスト */}
                <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-500">数量: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-bold text-gray-900">¥{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>

                {/* 金額サマリー */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>小計</span>
                    <span className="font-semibold">¥{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>配送料</span>
                    <span className="font-semibold">¥{shippingFee.toLocaleString()}</span>
                  </div>
                  {formData.usePoints && (
                    <div className="flex justify-between text-green-600">
                      <span>ポイント利用</span>
                      <span className="font-semibold">-¥{points.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>合計</span>
                      <span className="text-2xl text-blue-600">¥{total.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">（税込）</p>
                  </div>
                </div>

                <Button type="submit" variant="primary" fullWidth onClick={handleSubmit}>
                  注文を確定する
                </Button>

                <p className="text-xs text-gray-500 mt-4 text-center">
                  ※注文確定後、確認メールをお送りします
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Checkout;
