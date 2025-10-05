'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { Metadata } from 'next';
import toast from 'react-hot-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/common/Breadcrumb';
import StepIndicator from '@/components/common/StepIndicator';
import { Checkbox } from '@/components/ui';
import CustomerInfoForm from '@/components/checkout/CustomerInfoForm';
import ShippingInfoForm from '@/components/checkout/ShippingInfoForm';
import PaymentMethodSelector from '@/components/checkout/PaymentMethodSelector';
import DeliveryDateSelector from '@/components/checkout/DeliveryDateSelector';
import CheckoutSummary from '@/components/checkout/CheckoutSummary';
import useCartStore from '@/store/useCartStore';
import useAuthStore from '@/store/useAuthStore';
import usePostalCode from '@/hooks/usePostalCode';
import useFormPersist from '@/hooks/useFormPersist';

// 配送時間のラベルを取得
const getDeliveryTimeLabel = (value: string): string => {
  const timeMap: Record<string, string> = {
    'morning': '午前中',
    '12-14': '12:00-14:00',
    '14-16': '14:00-16:00',
    '16-18': '16:00-18:00',
    '18-20': '18:00-20:00',
    '19-21': '19:00-21:00',
  };
  return timeMap[value] || '指定なし';
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items: cartItems, getTotal, getShippingFee, clearCart } = useCartStore();
  const { user, isAuthenticated } = useAuthStore();
  const { searchAddress, loading: postalLoading, error: postalError, clearError } = usePostalCode();

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

  const [errors, setErrors] = useState<Record<string, string>>({});

  // フォーム永続化
  const { getStoredData, clearStoredData } = useFormPersist('checkout-form-storage', formData);

  // ユーザー情報自動入力と保存データ復元（初回マウント時のみ）
  useEffect(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // フォーム変更ハンドラー
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

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
    const newErrors: Record<string, string> = {};

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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // カート空チェック
    if (cartItems.length === 0) {
      toast.error('カートに商品がありません');
      router.push('/cart');
      return;
    }

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
      deliveryTime: formData.deliveryTime ? getDeliveryTimeLabel(formData.deliveryTime) : '指定なし',
    };

    // 注文データをログに出力（開発用）
    console.log('注文データ:', orderData);

    // カートをクリア
    clearCart();

    // フォームデータをクリア
    clearStoredData();

    // 注文完了ページへ遷移
    router.push('/order-complete');
  };

  // 金額計算
  const subtotal = getTotal();
  const shippingFee = getShippingFee();
  const availablePoints = user?.points || 500;
  const pointsToUse = formData.usePoints ? availablePoints : 0;
  const total = subtotal + shippingFee - pointsToUse;

  // JSON-LD 構造化データ - BreadcrumbList
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'ホーム',
        item: 'https://smartsample.example.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'カート',
        item: 'https://smartsample.example.com/cart',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'ご注文手続き',
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* JSON-LD 構造化データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main className="ec-checkout">
        <Breadcrumb />
        <StepIndicator currentStep={2} />

        <section className="ec-checkout__content py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* フォームエリア */}
              <div className="ec-checkout__form-area lg:col-span-2">
                <form onSubmit={handleSubmit} className="ec-checkout__form space-y-8">
                  {/* お客様情報 */}
                  <CustomerInfoForm
                    formData={{
                      lastName: formData.lastName,
                      firstName: formData.firstName,
                      email: formData.email,
                      phone: formData.phone,
                    }}
                    errors={errors}
                    onChange={handleChange}
                  />

                  {/* 配送先情報 */}
                  <ShippingInfoForm
                    formData={{
                      postalCode: formData.postalCode,
                      prefecture: formData.prefecture,
                      city: formData.city,
                      address: formData.address,
                      building: formData.building,
                    }}
                    errors={errors}
                    postalError={postalError}
                    postalLoading={postalLoading}
                    onChange={handleChange}
                    onPostalCodeSearch={handlePostalCodeSearch}
                  />

                  {/* 配送日時指定 */}
                  <DeliveryDateSelector
                    deliveryDate={formData.deliveryDate}
                    deliveryTime={formData.deliveryTime}
                    onChange={handleChange}
                  />

                  {/* お支払い方法 */}
                  <PaymentMethodSelector
                    value={formData.paymentMethod as 'credit' | 'bank' | 'cod' | 'paypay'}
                    onChange={handleChange}
                  />

                  {/* ポイント使用 */}
                  {isAuthenticated && availablePoints > 0 && (
                    <div className="ec-checkout__points bg-white rounded-lg border border-gray-200 p-6">
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
              <CheckoutSummary
                items={cartItems}
                subtotal={subtotal}
                shippingFee={shippingFee}
                pointsUsed={pointsToUse}
                total={total}
                onSubmit={handleSubmit}
                className="lg:col-span-1"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
