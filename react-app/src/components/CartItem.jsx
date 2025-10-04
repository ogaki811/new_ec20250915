import { Link } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';

function CartItem({ item, onQuantityChange, onRemove, onToggleFavorite, isSelected, onToggleSelect }) {
  const [quantity, setQuantity] = useState(item.quantity || 1);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 999) {
      if (onQuantityChange) {
        const result = onQuantityChange(item.id, newQuantity);
        if (result && !result.success) {
          toast.error(result.message);
          // 在庫数に合わせて数量を調整
          if (result.maxQuantity !== undefined) {
            setQuantity(result.maxQuantity);
          }
          return;
        }
      }
      setQuantity(newQuantity);
    }
  };

  const isOutOfStock = item.stock !== undefined && item.quantity > item.stock;
  const isLowStock = item.stock !== undefined && item.stock > 0 && item.stock <= 5;

  return (
    <div className={`ec-cart-item ${isSelected ? 'ec-cart-item--selected' : ''} ${isOutOfStock ? 'ec-cart-item--out-of-stock' : ''} p-6 hover:bg-gray-50 transition-colors`}>
      <div className="grid grid-cols-12 gap-4 items-start">
        {/* チェックボックス */}
        <div className="col-span-1 flex items-start pt-2">
          <input
            type="checkbox"
            className="ec-cart-item__checkbox w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            checked={isSelected}
            onChange={() => onToggleSelect && onToggleSelect(item.id)}
          />
        </div>

        {/* 商品画像 */}
        <div className="col-span-2">
          <div className="ec-cart-item__image-container w-20 h-20 rounded-md border border-gray-200 overflow-hidden">
            <img src={item.image} alt={item.name} className="ec-cart-item__image w-full h-full object-cover hover:scale-105 transition-transform" loading="lazy" />
          </div>
        </div>

        {/* 商品詳細 */}
        <div className="ec-cart-item__details col-span-4">
          <h3 className="ec-cart-item__title font-semibold text-gray-900 mb-2">
            <Link to={`/product/${item.id}`} className="hover:text-blue-600 transition-colors">
              {item.name}
            </Link>
          </h3>
          <div className="ec-cart-item__info space-y-1 text-sm text-gray-600 mb-3">
            <div className="ec-cart-item__code">品番: {item.code}</div>
            {item.brand && <div className="ec-cart-item__brand">ブランド: {item.brand}</div>}
          </div>
          {item.badges && (
            <div className="ec-cart-item__badges flex flex-wrap gap-2 mb-2">
              {item.badges.map((badge, index) => (
                <span key={index} className={`ec-cart-item__badge inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${badge.className}`}>
                  {badge.label}
                </span>
              ))}
            </div>
          )}
          {isOutOfStock ? (
            <div className="ec-cart-item__stock-status ec-cart-item__stock-status--out-of-stock flex items-center space-x-1 text-sm text-red-600 bg-red-50 px-2 py-1 rounded">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
              <span className="font-semibold">在庫不足 (在庫: {item.stock}個)</span>
            </div>
          ) : isLowStock ? (
            <div className="ec-cart-item__stock-status ec-cart-item__stock-status--low flex items-center space-x-1 text-sm text-orange-600 bg-orange-50 px-2 py-1 rounded">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              <span className="font-semibold">残り{item.stock}個</span>
            </div>
          ) : item.stock > 0 ? (
            <div className="ec-cart-item__stock-status ec-cart-item__stock-status--in-stock flex items-center space-x-1 text-sm text-green-600">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
              <span>在庫あり ({item.stock}個)</span>
            </div>
          ) : null}
        </div>

        {/* 価格情報 */}
        <div className="ec-cart-item__price-info col-span-2 text-right">
          <div className="space-y-1">
            <div className="text-sm text-gray-600">単価:</div>
            <div className="ec-cart-item__unit-price text-lg font-bold text-blue-600">¥{item.price.toLocaleString()}</div>
            {item.originalPrice && (
              <>
                <div className="ec-cart-item__original-price text-sm text-gray-500 line-through">¥{item.originalPrice.toLocaleString()}</div>
                <div className="ec-cart-item__discount inline-block bg-red-500 text-white text-xs px-2 py-1 rounded">
                  {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%OFF
                </div>
              </>
            )}
          </div>
        </div>

        {/* 数量 */}
        <div className="ec-cart-item__quantity col-span-1 flex flex-col items-center space-y-2">
          <label className="text-xs text-gray-600">数量:</label>
          <div className="ec-cart-item__quantity-controls flex border border-gray-300 rounded">
            <button
              className="ec-cart-item__quantity-decrease w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-colors"
              onClick={() => handleQuantityChange(quantity - 1)}
            >
              -
            </button>
            <input
              type="number"
              className="ec-cart-item__quantity-input w-12 h-8 text-center border-0 text-sm font-semibold focus:ring-0"
              value={quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
              min="1"
              max="999"
            />
            <button
              className="ec-cart-item__quantity-increase w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-colors"
              onClick={() => handleQuantityChange(quantity + 1)}
            >
              +
            </button>
          </div>
        </div>

        {/* 合計 */}
        <div className="ec-cart-item__total col-span-1 text-right">
          <div className="ec-cart-item__total-price text-xl font-bold text-gray-900">¥{(item.price * quantity).toLocaleString()}</div>
          <div className="ec-cart-item__tax-label text-xs text-gray-500">(税込)</div>
        </div>

        {/* アクション */}
        <div className="ec-cart-item__actions col-span-1 flex flex-col space-y-2">
          <button
            className="ec-cart-item__favorite-btn w-9 h-9 flex items-center justify-center border border-gray-300 rounded hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-colors"
            title="お気に入りに追加"
            onClick={() => onToggleFavorite && onToggleFavorite(item.id)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          <button
            className="ec-cart-item__remove-btn w-9 h-9 flex items-center justify-center border border-gray-300 rounded hover:bg-red-500 hover:border-red-500 hover:text-white transition-colors"
            title="カートから削除"
            onClick={() => onRemove && onRemove(item.id)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="3,6 5,6 21,6"></polyline>
              <path d="m19,6 v14c0,1 -1,2 -2,2H7c-1,0 -2,-1 -2,-2V6m3,0V4c0,-1 1,-2 2,-2h4c1,0 2,1 2,2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
