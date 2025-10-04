import { Link } from 'react-router-dom';
import { useState } from 'react';

function CartItem({ item, onQuantityChange, onRemove, onToggleFavorite }) {
  const [quantity, setQuantity] = useState(item.quantity || 1);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 999) {
      setQuantity(newQuantity);
      if (onQuantityChange) {
        onQuantityChange(item.id, newQuantity);
      }
    }
  };

  return (
    <div className="p-6 hover:bg-gray-50 transition-colors">
      <div className="grid grid-cols-12 gap-4 items-start">
        {/* チェックボックス */}
        <div className="col-span-1 flex items-start pt-2">
          <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" defaultChecked />
        </div>

        {/* 商品画像 */}
        <div className="col-span-2">
          <div className="w-20 h-20 rounded-md border border-gray-200 overflow-hidden">
            <img src={item.image} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition-transform" loading="lazy" />
          </div>
        </div>

        {/* 商品詳細 */}
        <div className="col-span-4">
          <h3 className="font-semibold text-gray-900 mb-2">
            <Link to={`/product/${item.id}`} className="hover:text-blue-600 transition-colors">
              {item.name}
            </Link>
          </h3>
          <div className="space-y-1 text-sm text-gray-600 mb-3">
            <div>品番: {item.code}</div>
            {item.brand && <div>ブランド: {item.brand}</div>}
          </div>
          {item.badges && (
            <div className="flex flex-wrap gap-2 mb-2">
              {item.badges.map((badge, index) => (
                <span key={index} className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${badge.className}`}>
                  {badge.label}
                </span>
              ))}
            </div>
          )}
          {item.stock > 0 && (
            <div className="flex items-center space-x-1 text-sm text-green-600">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
              <span>在庫あり ({item.stock}個)</span>
            </div>
          )}
        </div>

        {/* 価格情報 */}
        <div className="col-span-2 text-right">
          <div className="space-y-1">
            <div className="text-sm text-gray-600">単価:</div>
            <div className="text-lg font-bold text-blue-600">¥{item.price.toLocaleString()}</div>
            {item.originalPrice && (
              <>
                <div className="text-sm text-gray-500 line-through">¥{item.originalPrice.toLocaleString()}</div>
                <div className="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded">
                  {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%OFF
                </div>
              </>
            )}
          </div>
        </div>

        {/* 数量 */}
        <div className="col-span-1 flex flex-col items-center space-y-2">
          <label className="text-xs text-gray-600">数量:</label>
          <div className="flex border border-gray-300 rounded">
            <button
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-colors"
              onClick={() => handleQuantityChange(quantity - 1)}
            >
              -
            </button>
            <input
              type="number"
              className="w-12 h-8 text-center border-0 text-sm font-semibold focus:ring-0"
              value={quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
              min="1"
              max="999"
            />
            <button
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-colors"
              onClick={() => handleQuantityChange(quantity + 1)}
            >
              +
            </button>
          </div>
        </div>

        {/* 合計 */}
        <div className="col-span-1 text-right">
          <div className="text-xl font-bold text-gray-900">¥{(item.price * quantity).toLocaleString()}</div>
          <div className="text-xs text-gray-500">(税込)</div>
        </div>

        {/* アクション */}
        <div className="col-span-1 flex flex-col space-y-2">
          <button
            className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-colors"
            title="お気に入りに追加"
            onClick={() => onToggleFavorite && onToggleFavorite(item.id)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          <button
            className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded hover:bg-red-500 hover:border-red-500 hover:text-white transition-colors"
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
