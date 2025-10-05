'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import ProductImageGallery from './ProductImageGallery';
import { Badge } from '@/components/ui';
import type { Product } from '@/types';
import useCartStore from '@/store/useCartStore';
import useFavoritesStore from '@/store/useFavoritesStore';

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const isInFavorites = isFavorite(product.id);

  const handleQuantityChange = (value: number) => {
    const newQuantity = Math.max(1, Math.min(99, value));
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    addItem({ ...product, quantity });
    toast.success(`${product.name}を${quantity}個カートに追加しました`);
  };

  const handleToggleFavorite = () => {
    toggleFavorite({ ...product, quantity: 1 });
    toast.success(
      isInFavorites
        ? `${product.name}をお気に入りから削除しました`
        : `${product.name}をお気に入りに追加しました`
    );
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* 商品画像 */}
      <div>
        <ProductImageGallery images={product.images} productName={product.name} />
      </div>

      {/* 商品情報 */}
      <div>
        {/* タグ */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {product.tags.map((tag) => (
              <Badge
                key={tag}
                variant={tag === 'セール' ? 'danger' : 'primary'}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* ブランド */}
        <p className="text-sm text-gray-500 mb-2">{product.brand}</p>

        {/* 商品名 */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          {product.name}
        </h1>

        {/* 品番 */}
        <p className="text-sm text-gray-600 mb-4">品番: {product.code}</p>

        {/* 評価 */}
        <div className="flex items-center mb-6">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="ml-2 text-gray-600">({product.rating})</span>
        </div>

        {/* 価格 */}
        <div className="mb-6 pb-6 border-b">
          <p className="text-3xl font-bold text-gray-900">
            ¥{product.price.toLocaleString()}
            <span className="text-base font-normal text-gray-600 ml-2">
              (税込)
            </span>
          </p>
        </div>

        {/* 在庫状態 */}
        <div className="mb-6">
          {product.stock ? (
            <p className="text-green-600 font-medium flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              在庫あり
            </p>
          ) : (
            <p className="text-red-600 font-medium">在庫切れ</p>
          )}
        </div>

        {/* 数量選択 */}
        <div className="mb-6">
          <label htmlFor="quantity" className="block text-sm font-medium mb-2">
            数量
          </label>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={!product.stock || quantity <= 1}
              className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
              disabled={!product.stock}
              className="w-20 px-3 py-2 text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              min="1"
              max="99"
            />
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={!product.stock || quantity >= 99}
              className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>

        {/* ボタン */}
        <div className="space-y-3">
          <button
            onClick={handleAddToCart}
            disabled={!product.stock}
            className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {product.stock ? 'カートに追加' : '在庫切れ'}
          </button>
          <button
            onClick={handleToggleFavorite}
            className="w-full py-3 px-6 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition-colors flex items-center justify-center"
          >
            <svg
              className={`w-5 h-5 mr-2 ${
                isInFavorites ? 'text-pink-500 fill-current' : ''
              }`}
              fill={isInFavorites ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            {isInFavorites ? 'お気に入り登録済み' : 'お気に入りに追加'}
          </button>
        </div>

        {/* 配送情報 */}
        <div className="mt-6 pt-6 border-t">
          <div className="space-y-3 text-sm">
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-gray-400 mr-3 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                />
              </svg>
              <div>
                <p className="font-medium text-gray-900">送料</p>
                <p className="text-gray-600">
                  3,000円以上のご注文で送料無料
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-gray-400 mr-3 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <div>
                <p className="font-medium text-gray-900">お届け日</p>
                <p className="text-gray-600">
                  最短で翌営業日にお届け
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
