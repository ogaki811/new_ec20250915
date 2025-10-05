'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/common/Breadcrumb';
import { Input, Loading } from '@/components/ui';
import useCartStore from '@/store/useCartStore';
import useAuthStore from '@/store/useAuthStore';
import useFormPersist from '@/hooks/useFormPersist';
import usePostalCode from '@/hooks/usePostalCode';
import type { ShippingAddress, PaymentMethod, DeliveryMethod } from '@/types';

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const {
    items,
    selectedItems,
    getSelectedTotal,
    getSelectedItemCount,
    removeSelectedItems,
  } = useCartStore();

  const [email, setEmail] = useState(user?.email || '');
  const [formData, setFormData] = useState<ShippingAddress>({
    name: user?.name || '',
    phoneNumber: '',
    postalCode: '',
    prefecture: '',
    city: '',
    address: '',
    building: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit_card');
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('standard');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { searchAddress, loading: postalCodeLoading } = usePostalCode();

  // フォームデータの永続化
  useFormPersist('checkout-form', formData);

  const selectedTotal = getSelectedTotal();
  const selectedItemCount = getSelectedItemCount();
  const selectedCartItems = items.filter((item) =>
    selectedItems.includes(item.id)
  );

  const shippingFee = selectedTotal >= 3000 ? 0 : 500;
  const deliveryFee = deliveryMethod === 'express' ? 1000 : 0;
  const totalFee = selectedTotal + shippingFee + deliveryFee;

  // 未ログインまたは選択商品がない場合はリダイレクト
  useEffect(() => {
    if (selectedItemCount === 0) {
      router.push('/cart');
    }
  }, [selectedItemCount, router]);

  const handlePostalCodeChange = async (value: string) => {
    const cleaned = value.replace(/[^\d]/g, '');
    setFormData((prev) => ({ ...prev, postalCode: cleaned }));

    if (cleaned.length === 7) {
      const addressData = await searchAddress(cleaned);
      if (addressData) {
        setFormData((prev) => ({
          ...prev,
          prefecture: addressData.prefecture,
          city: addressData.city,
          address: addressData.address,
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreedToTerms) {
      toast.error('利用規約に同意してください');
      return;
    }

    setIsSubmitting(true);

    try {
      // ここで注文処理を行う（API呼び出しなど）
      await new Promise((resolve) => setTimeout(resolve, 2000)); // シミュレーション

      // 選択商品をカートから削除
      removeSelectedItems();

      // 注文完了ページへ
      router.push('/order-complete');
      toast.success('ご注文ありがとうございます');
    } catch (error) {
      toast.error('注文処理中にエラーが発生しました');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (selectedItemCount === 0) {
    return null; // リダイレクト中
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb
            items={[
              { label: 'カート', href: '/cart' },
              { label: 'ご注文手続き' },
            ]}
          />

          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            ご注文手続き
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="lg:grid lg:grid-cols-3 lg:gap-8">
              {/* メインコンテンツ */}
              <div className="lg:col-span-2 space-y-6">
                {/* お届け先情報 */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-bold mb-6">お届け先情報</h2>
                  <div className="space-y-4">
                    <Input
                      label="お名前"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      placeholder="山田 太郎"
                    />

                    <Input
                      label="メールアドレス"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="example@example.com"
                    />

                    <Input
                      label="電話番号"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, phoneNumber: e.target.value })
                      }
                      required
                      placeholder="090-1234-5678"
                    />

                    <div className="relative">
                      <Input
                        label="郵便番号"
                        value={formData.postalCode}
                        onChange={(e) => handlePostalCodeChange(e.target.value)}
                        required
                        placeholder="1234567"
                        maxLength={7}
                      />
                      {postalCodeLoading && (
                        <div className="absolute right-3 top-9">
                          <Loading size="sm" />
                        </div>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        ハイフンなしで入力してください
                      </p>
                    </div>

                    <Input
                      label="都道府県"
                      value={formData.prefecture}
                      onChange={(e) =>
                        setFormData({ ...formData, prefecture: e.target.value })
                      }
                      required
                      placeholder="東京都"
                    />

                    <Input
                      label="市区町村"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      required
                      placeholder="渋谷区"
                    />

                    <Input
                      label="番地"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      required
                      placeholder="道玄坂1-2-3"
                    />

                    <Input
                      label="建物名・部屋番号（任意）"
                      value={formData.building || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, building: e.target.value })
                      }
                      placeholder="〇〇ビル 101号室"
                    />
                  </div>
                </div>

                {/* お支払い方法 */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-bold mb-6">お支払い方法</h2>
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="credit_card"
                        checked={paymentMethod === 'credit_card'}
                        onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="ml-3 font-medium">クレジットカード</span>
                    </label>
                    <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="convenience_store"
                        checked={paymentMethod === 'convenience_store'}
                        onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="ml-3 font-medium">コンビニ払い</span>
                    </label>
                    <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank_transfer"
                        checked={paymentMethod === 'bank_transfer'}
                        onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="ml-3 font-medium">銀行振込</span>
                    </label>
                    <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash_on_delivery"
                        checked={paymentMethod === 'cash_on_delivery'}
                        onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="ml-3 font-medium">代金引換</span>
                    </label>
                  </div>
                </div>

                {/* 配送方法 */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-bold mb-6">配送方法</h2>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="deliveryMethod"
                          value="standard"
                          checked={deliveryMethod === 'standard'}
                          onChange={(e) => setDeliveryMethod(e.target.value as DeliveryMethod)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <div className="ml-3">
                          <p className="font-medium">通常配送</p>
                          <p className="text-sm text-gray-600">
                            3-5営業日でお届け
                          </p>
                        </div>
                      </div>
                      <span className="font-medium">無料</span>
                    </label>
                    <label className="flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="deliveryMethod"
                          value="express"
                          checked={deliveryMethod === 'express'}
                          onChange={(e) => setDeliveryMethod(e.target.value as DeliveryMethod)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <div className="ml-3">
                          <p className="font-medium">お急ぎ便</p>
                          <p className="text-sm text-gray-600">
                            翌営業日にお届け
                          </p>
                        </div>
                      </div>
                      <span className="font-medium">¥1,000</span>
                    </label>
                  </div>
                </div>

                {/* 利用規約 */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
                    />
                    <span className="ml-3 text-sm text-gray-700">
                      <a href="/terms" target="_blank" className="text-blue-600 hover:underline">
                        利用規約
                      </a>
                      と
                      <a href="/privacy" target="_blank" className="text-blue-600 hover:underline">
                        プライバシーポリシー
                      </a>
                      に同意します
                    </span>
                  </label>
                </div>
              </div>

              {/* 注文サマリー */}
              <div className="lg:col-span-1 mt-8 lg:mt-0">
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                  <h2 className="text-xl font-bold mb-6">ご注文内容</h2>

                  {/* 商品リスト */}
                  <div className="space-y-4 mb-6 pb-6 border-b max-h-64 overflow-y-auto">
                    {selectedCartItems.map((item) => (
                      <div key={item.id} className="flex space-x-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/img/placeholder.png';
                          }}
                        />
                        <div className="flex-grow">
                          <p className="text-sm font-medium line-clamp-2">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            数量: {item.quantity}
                          </p>
                          <p className="text-sm font-bold">
                            ¥{(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 金額詳細 */}
                  <div className="space-y-3 mb-6 pb-6 border-b">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        商品小計（{selectedItemCount}点）
                      </span>
                      <span className="font-medium">
                        ¥{selectedTotal.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">配送料</span>
                      <span className="font-medium">
                        {shippingFee === 0 ? (
                          <span className="text-green-600">無料</span>
                        ) : (
                          `¥${shippingFee.toLocaleString()}`
                        )}
                      </span>
                    </div>
                    {deliveryMethod === 'express' && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">お急ぎ便</span>
                        <span className="font-medium">
                          ¥{deliveryFee.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* 合計 */}
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-bold">合計</span>
                    <span className="text-2xl font-bold text-blue-600">
                      ¥{totalFee.toLocaleString()}
                    </span>
                  </div>

                  {/* 注文確定ボタン */}
                  <button
                    type="submit"
                    disabled={!agreedToTerms || isSubmitting}
                    className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <Loading size="sm" />
                        <span className="ml-2">処理中...</span>
                      </>
                    ) : (
                      '注文を確定する'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
