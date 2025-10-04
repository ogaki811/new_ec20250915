import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Breadcrumb from '../components/Breadcrumb';
import StepIndicator from '../components/StepIndicator';
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';
import Icon from '../components/Icon';
import OptimizedImage from '../components/OptimizedImage';
import Loading from '../components/Loading';
import useCartStore from '../store/useCartStore';
import useAuthStore from '../store/useAuthStore';
import usePostalCode from '../hooks/usePostalCode';
import useFormPersist from '../hooks/useFormPersist';
import prefectures from '../data/prefectures';

function Checkout() {
  const navigate = useNavigate();
  const { items: cartItems, getTotal, getShippingFee, clearCart } = useCartStore();
  const { user, isAuthenticated } = useAuthStore();
  const { searchAddress, loading: postalLoading, error: postalError, clearError } = usePostalCode();

  // 配送時間選択肢
  const deliveryTimeOptions = [
    { value: '', label: '指定なし' },
    { value: 'morning', label: '午前中' },
    { value: '12-14', label: '12:00-14:00' },
    { value: '14-16', label: '14:00-16:00' },
    { value: '16-18', label: '16:00-18:00' },
    { value: '18-20', label: '18:00-20:00' },
    { value: '19-21', label: '19:00-21:00' },
  ];

  // フォームデータ初期化
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

  const [errors, setErrors] = useState({});

  // フォーム永続化
  const { getStoredData, clearStoredData } = useFormPersist('checkout-form-storage', formData);

  // 初期化: カート空チェック、ユーザー情報自動入力、保存データ復元
  useEffect(() => {
    // カートが空の場合はカートページへリダイレクト
    if (cartItems.length === 0) {
      toast.error('カートに商品がありません');
      navigate('/cart');
      return;
    }

    // 保存されたフォームデータを復元
    const storedData = getStoredData();
    if (storedData) {
      setFormData(storedData);
      return;
    }

    // ログインユーザーの情報を自動入力
    if (isAuthenticated && user) {
      setFormData(prev => ({
        ...prev,
        lastName: user.lastName || '',
        firstName: user.firstName || '',
        email: user.email || '',
        phone: user.phone || '',
        postalCode: user.postalCode || '',
        prefecture: user.prefecture || '',
        city: user.city || '',
        address: user.address || '',
        building: user.building || '',
      }));
    }
  }, [cartItems, isAuthenticated, user, navigate, getStoredData]);

  const breadcrumbItems = [
    { label: 'ホーム', href: '/' },
    { label: 'カート', href: '/cart' },
    { label: 'ご注文手続き' }
  ];

  // フォーム変更ハンドラー
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // エラークリア
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // 郵便番号検索
  const handlePostalCodeSearch = async () => {
    if (!formData.postalCode) {
      toast.error('郵便番号を入力してください');
      return;
    }

    clearError();
    const result = await searchAddress(formData.postalCode);

    if (result) {
      setFormData(prev => ({
        ...prev,
        prefecture: result.prefecture,
        city: result.city,
        address: result.address,
      }));
      toast.success('住所を自動入力しました');
    }
  };

  // バリデーション
  const validateForm = () => {
    const newErrors = {};

    // 必須項目チェック
    if (!formData.lastName.trim()) newErrors.lastName = '姓を入力してください';
    if (!formData.firstName.trim()) newErrors.firstName = '名を入力してください';
    if (!formData.email.trim()) newErrors.email = 'メールアドレスを入力してください';
    if (!formData.phone.trim()) newErrors.phone = '電話番号を入力してください';
    if (!formData.postalCode.trim()) newErrors.postalCode = '郵便番号を入力してください';
    if (!formData.prefecture) newErrors.prefecture = '都道府県を選択してください';
    if (!formData.city.trim()) newErrors.city = '市区町村を入力してください';
    if (!formData.address.trim()) newErrors.address = '番地を入力してください';

    // メールアドレス形式チェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = '有効なメールアドレスを入力してください';
    }

    // 郵便番号形式チェック（000-0000 または 0000000）
    const postalRegex = /^(\d{3}-?\d{4})$/;
    if (formData.postalCode && !postalRegex.test(formData.postalCode)) {
      newErrors.postalCode = '郵便番号は000-0000の形式で入力してください';
    }

    // 電話番号形式チェック
    const phoneRegex = /^[\d-]+$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = '電話番号は数字とハイフンで入力してください';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 注文確定処理
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('入力内容に誤りがあります');
      return;
    }

    // 注文データ整形
    const orderData = {
      id: `${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      date: new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' }),
      items: cartItems,
      subtotal: getTotal(),
      shippingFee: getShippingFee(),
      pointsUsed: formData.usePoints ? (user?.points || 500) : 0,
      total: getTotal() + getShippingFee() - (formData.usePoints ? (user?.points || 500) : 0),
      customerInfo: {
        name: `${formData.lastName} ${formData.firstName}`,
        email: formData.email,
        phone: formData.phone,
      },
      shippingAddress: {
        name: `${formData.lastName} ${formData.firstName}`,
        postalCode: formData.postalCode,
        address: `${formData.prefecture}${formData.city}${formData.address}${formData.building ? ' ' + formData.building : ''}`,
        phone: formData.phone,
      },
      paymentMethod: formData.paymentMethod === 'credit' ? 'クレジットカード' : formData.paymentMethod === 'bank' ? '銀行振込' : formData.paymentMethod === 'paypay' ? 'PayPay' : '代金引換',
      deliveryDate: formData.deliveryDate || '指定なし',
      deliveryTime: deliveryTimeOptions.find(opt => opt.value === formData.deliveryTime)?.label || '指定なし',
    };

    // カートをクリア
    clearCart();

    // フォームデータをクリア
    clearStoredData();

    // 注文完了ページへ遷移
    navigate('/order-complete', { state: { orderData } });
  };

  // 金額計算
  const subtotal = getTotal();
  const shippingFee = getShippingFee();
  const availablePoints = user?.points || 500;
  const pointsToUse = formData.usePoints ? availablePoints : 0;
  const total = subtotal + shippingFee - pointsToUse;

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
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      label="姓"
                      placeholder="山田"
                      required
                      error={errors.lastName}
                    />
                    <Input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      label="名"
                      placeholder="太郎"
                      required
                      error={errors.firstName}
                    />
                  </div>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    label="メールアドレス"
                    placeholder="example@email.com"
                    required
                    error={errors.email}
                  />
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    label="電話番号"
                    placeholder="090-1234-5678"
                    required
                    error={errors.phone}
                  />
                </div>

                {/* 配送先情報 */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">配送先情報</h2>

                  {/* 郵便番号検索 */}
                  <div className="mb-6">
                    <Input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      label="郵便番号"
                      placeholder="123-4567"
                      required
                      error={errors.postalCode || postalError}
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={handlePostalCodeSearch}
                      disabled={postalLoading}
                      className="mt-2"
                    >
                      {postalLoading ? (
                        <>
                          <Loading size="sm" />
                          <span className="ml-2">検索中...</span>
                        </>
                      ) : (
                        <>
                          <Icon name="search" size={16} className="mr-2" />
                          住所を自動入力
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Select
                      name="prefecture"
                      value={formData.prefecture}
                      onChange={handleChange}
                      options={prefectures}
                      label="都道府県"
                      placeholder="選択してください"
                      required
                      error={errors.prefecture}
                    />
                    <Input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      label="市区町村"
                      placeholder="渋谷区"
                      required
                      error={errors.city}
                    />
                  </div>
                  <Input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    label="番地"
                    placeholder="神南1-2-3"
                    required
                    error={errors.address}
                  />
                  <Input
                    type="text"
                    name="building"
                    value={formData.building}
                    onChange={handleChange}
                    label="建物名・部屋番号"
                    placeholder="〇〇ビル 4F"
                  />
                </div>

                {/* 配送日時指定 */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <Icon name="truck" size={20} />
                    配送日時指定
                  </h2>
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
                        min={new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base transition-all duration-300 bg-white focus:outline-none focus:border-blue-600 focus:shadow-lg focus:shadow-blue-100"
                      />
                    </div>
                    <Select
                      name="deliveryTime"
                      value={formData.deliveryTime}
                      onChange={handleChange}
                      options={deliveryTimeOptions}
                      label="配送時間帯"
                    />
                  </div>
                </div>

                {/* お支払い方法 */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">お支払い方法</h2>
                  <div className="space-y-3">
                    <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${formData.paymentMethod === 'credit' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-600'}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="credit"
                        checked={formData.paymentMethod === 'credit'}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-3 flex items-center gap-2">
                        <Icon name="creditCard" size={24} />
                        クレジットカード
                      </span>
                    </label>
                    <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${formData.paymentMethod === 'bank' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-600'}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank"
                        checked={formData.paymentMethod === 'bank'}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-3 flex items-center gap-2">
                        <Icon name="bank" size={24} />
                        銀行振込
                      </span>
                    </label>
                    <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${formData.paymentMethod === 'cod' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-600'}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-3 flex items-center gap-2">
                        <Icon name="package" size={24} />
                        代金引換
                      </span>
                    </label>
                    <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${formData.paymentMethod === 'paypay' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-600'}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypay"
                        checked={formData.paymentMethod === 'paypay'}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-3 flex items-center gap-2">
                        <Icon name="creditCard" size={24} />
                        PayPay
                      </span>
                    </label>
                  </div>
                </div>

                {/* ポイント使用 */}
                {isAuthenticated && availablePoints > 0 && (
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <Checkbox
                      id="usePoints"
                      name="usePoints"
                      checked={formData.usePoints}
                      onChange={handleChange}
                      label={`保有ポイントを使用する (${availablePoints}ポイント利用可能)`}
                    />
                  </div>
                )}
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
                      <OptimizedImage
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
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
                    <span className="font-semibold">
                      {shippingFee === 0 ? '無料' : `¥${shippingFee.toLocaleString()}`}
                    </span>
                  </div>
                  {formData.usePoints && (
                    <div className="flex justify-between text-green-600">
                      <span>ポイント利用</span>
                      <span className="font-semibold">-¥{pointsToUse.toLocaleString()}</span>
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
