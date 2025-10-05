'use client';

import { useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/common/Breadcrumb';
import useCartStore from '@/store/useCartStore';
import { sampleCoupons, findCouponByCode } from '@/data/sampleCoupons';

export default function CartPage() {
  const [couponCode, setCouponCode] = useState('');
  const {
    items,
    selectedItems,
    appliedCoupon,
    toggleSelectItem,
    toggleSelectAll,
    updateQuantity,
    removeItem,
    applyCoupon,
    removeCoupon,
    getSelectedTotal,
    getSelectedItemCount,
  } = useCartStore();

  const selectedTotal = getSelectedTotal();
  const selectedItemCount = getSelectedItemCount();
  const allSelected = items.length > 0 && selectedItems.length === items.length;
  const shippingFee = selectedTotal >= 3000 ? 0 : 500;
  const finalTotal = selectedTotal + shippingFee;

  const handleApplyCoupon = () => {
    const coupon = findCouponByCode(couponCode);
    if (!coupon) {
      toast.error('クーポンコードが無効です');
      return;
    }

    const result = applyCoupon(coupon);
    if (result.success) {
      toast.success(`クーポンを適用しました: ${coupon.description}`);
      setCouponCode('');
    } else {
      toast.error(result.message || 'クーポンを適用できませんでした');
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    toast.success('クーポンを削除しました');
  };

  const handleRemoveItem = (productId: string) => {
    const item = items.find((i) => i.id === productId);
    if (item) {
      removeItem(productId);
      toast.success(`${item.name}をカートから削除しました`);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumb items={[{ label: 'カート' }]} />
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <svg
                className="mx-auto h-24 w-24 text-gray-400 mb-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                カートは空です
              </h2>
              <p className="text-gray-600 mb-8">
                お気に入りの商品をカートに追加してください
              </p>
              <Link
                href="/products"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                商品を探す
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={[{ label: 'カート' }]} />

          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            ショッピングカート
          </h1>

          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            {/* カート商品リスト */}
            <div className="lg:col-span-2 space-y-4">
              {/* 全選択 */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={() => toggleSelectAll()}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-3 font-medium">すべて選択</span>
                </label>
              </div>

              {/* カート商品 */}
              {items.map((item) => {
                const isSelected = selectedItems.includes(item.id);
                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow-sm p-4 md:p-6"
                  >
                    <div className="flex items-start space-x-4">
                      {/* チェックボックス */}
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectItem(item.id)}
                        className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />

                      {/* 商品画像 */}
                      <Link href={`/products/${item.id}`} className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-lg"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/img/placeholder.png';
                          }}
                        />
                      </Link>

                      {/* 商品情報 */}
                      <div className="flex-grow">
                        <Link
                          href={`/products/${item.id}`}
                          className="text-sm text-gray-500 hover:underline"
                        >
                          {item.brand}
                        </Link>
                        <h3 className="font-medium text-gray-900 mt-1 mb-2">
                          <Link href={`/products/${item.id}`} className="hover:underline">
                            {item.name}
                          </Link>
                        </h3>
                        <p className="text-sm text-gray-500 mb-3">
                          品番: {item.code}
                        </p>

                        <div className="flex items-center justify-between">
                          {/* 数量 */}
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            <span className="w-12 text-center font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={item.quantity >= 99}
                              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>

                          {/* 価格 */}
                          <p className="text-xl font-bold text-gray-900">
                            ¥{(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>

                        {/* 削除ボタン */}
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="mt-3 text-sm text-red-600 hover:underline"
                        >
                          削除
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 注文サマリー */}
            <div className="lg:col-span-1 mt-8 lg:mt-0">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                <h2 className="text-xl font-bold mb-6">ご注文内容</h2>

                {/* クーポン */}
                <div className="mb-6 pb-6 border-b">
                  <label className="block text-sm font-medium mb-2">
                    クーポンコード
                  </label>
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-green-800">
                          {appliedCoupon.code}
                        </p>
                        <p className="text-xs text-green-600">
                          {appliedCoupon.description}
                        </p>
                      </div>
                      <button
                        onClick={handleRemoveCoupon}
                        className="text-red-600 hover:text-red-700"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="クーポンコード"
                        className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        disabled={!couponCode}
                        className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        適用
                      </button>
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    利用可能クーポン: {sampleCoupons.map(c => c.code).join(', ')}
                  </p>
                </div>

                {/* 金額詳細 */}
                <div className="space-y-3 mb-6 pb-6 border-b">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      選択商品（{selectedItemCount}点）
                    </span>
                    <span className="font-medium">
                      ¥{selectedTotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">送料</span>
                    <span className="font-medium">
                      {shippingFee === 0 ? (
                        <span className="text-green-600">無料</span>
                      ) : (
                        `¥${shippingFee.toLocaleString()}`
                      )}
                    </span>
                  </div>
                  {selectedTotal < 3000 && selectedTotal > 0 && (
                    <p className="text-xs text-gray-500">
                      あと¥{(3000 - selectedTotal).toLocaleString()}で送料無料
                    </p>
                  )}
                </div>

                {/* 合計 */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-bold">合計</span>
                  <span className="text-2xl font-bold text-blue-600">
                    ¥{finalTotal.toLocaleString()}
                  </span>
                </div>

                {/* レジへ進む */}
                <Link
                  href="/checkout"
                  className={`block w-full py-3 px-6 text-center text-white rounded-lg font-semibold transition-colors ${
                    selectedItemCount > 0
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-gray-300 cursor-not-allowed pointer-events-none'
                  }`}
                >
                  レジへ進む ({selectedItemCount}点)
                </Link>

                <Link
                  href="/products"
                  className="block w-full mt-3 py-3 px-6 text-center border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition-colors"
                >
                  買い物を続ける
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
