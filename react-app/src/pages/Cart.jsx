import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import Breadcrumb from '../components/Breadcrumb';
import StepIndicator from '../components/StepIndicator';
import CartItem from '../components/CartItem';
import Button from '../components/Button';
import Modal from '../components/Modal';
import ProductSlider from '../components/ProductSlider';
import useCartStore from '../store/useCartStore';
import useFavoritesStore from '../store/useFavoritesStore';
import { findCouponByCode, getAvailableCoupons } from '../data/sampleCoupons';
import { sampleProducts } from '../data/sampleProducts';

function Cart() {
  const {
    items: cartItems,
    selectedItems,
    recentlyDeleted,
    appliedCoupon,
    updateQuantity,
    removeItem,
    removeSelectedItems,
    restoreItem,
    toggleSelectItem,
    toggleSelectAll,
    isAllSelected,
    getTotal,
    getShippingFee,
    getGrandTotal,
    getItemCount,
    applyCoupon,
    removeCoupon,
    getCouponDiscount,
    getFinalTotal,
    hasOutOfStockItems,
    getOutOfStockItems,
    canCheckout,
  } = useCartStore();
  const { toggleFavorite } = useFavoritesStore();

  const [couponCode, setCouponCode] = useState('');
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, type: null, itemId: null });

  const breadcrumbItems = [
    { label: 'ホーム', href: '/' },
    { label: 'ショッピングカート' }
  ];

  const handleQuantityChange = (itemId, newQuantity) => {
    return updateQuantity(itemId, newQuantity);
  };

  const handleRemove = (itemId) => {
    setDeleteModal({ isOpen: true, type: 'single', itemId });
  };

  const handleRemoveSelected = () => {
    if (selectedItems.length > 0) {
      setDeleteModal({ isOpen: true, type: 'bulk', itemId: null });
    }
  };

  const confirmDelete = () => {
    if (deleteModal.type === 'single') {
      removeItem(deleteModal.itemId);
      toast.success('商品を削除しました');
    } else if (deleteModal.type === 'bulk') {
      removeSelectedItems();
      toast.success(`${selectedItems.length}個の商品を削除しました`);
    }
  };

  const handleToggleFavorite = (item) => {
    toggleFavorite(item);
  };

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      toast.error('クーポンコードを入力してください');
      return;
    }

    const coupon = findCouponByCode(couponCode);
    if (!coupon) {
      toast.error('無効なクーポンコードです');
      return;
    }

    const result = applyCoupon(coupon);
    if (result.success) {
      toast.success(result.message);
      setCouponCode('');
    } else {
      toast.error(result.message);
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    toast.success('クーポンを解除しました');
  };

  const subtotal = getTotal();
  const shippingFee = getShippingFee();
  const couponDiscount = getCouponDiscount();
  const total = getFinalTotal();
  const allSelected = isAllSelected();
  const hasStockIssues = hasOutOfStockItems();
  const outOfStockItems = getOutOfStockItems();
  const canProceedToCheckout = canCheckout();

  // カート内の商品に基づいたおすすめ商品を取得
  const recommendedProducts = useMemo(() => {
    if (cartItems.length === 0) {
      // カートが空の場合は人気商品を表示
      return sampleProducts.slice(0, 12);
    }

    // カート内の商品IDを取得
    const cartItemIds = cartItems.map(item => item.id);

    // カートに入っていない商品をフィルター
    const availableProducts = sampleProducts.filter(
      product => !cartItemIds.includes(product.id)
    );

    // カート内商品と同じカテゴリーの商品を優先
    const cartCategories = cartItems.map(item => item.category).filter(Boolean);
    const relatedProducts = availableProducts.filter(
      product => product.category && cartCategories.includes(product.category)
    );

    // 関連商品が少ない場合は他の商品も追加
    if (relatedProducts.length < 12) {
      const otherProducts = availableProducts.filter(
        product => !relatedProducts.includes(product)
      );
      return [...relatedProducts, ...otherProducts].slice(0, 12);
    }

    return relatedProducts.slice(0, 12);
  }, [cartItems]);

  // SEO設定
  const itemCount = getItemCount();
  const pageTitle = cartItems.length > 0
    ? `ショッピングカート (${itemCount}点) | smartsample`
    : `ショッピングカート | smartsample`;
  const pageDescription = cartItems.length > 0
    ? `現在カートに${itemCount}点の商品があります。合計金額: ¥${total.toLocaleString()}`
    : 'ショッピングカート。お気に入りの商品を選んでお買い物をお楽しみください。';

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href="https://smartsample.example.com/cart" />
        <meta name="robots" content="noindex, nofollow" />

        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content="https://smartsample.example.com/cart" />
        <meta property="og:type" content="website" />

        {/* Structured Data - BreadcrumbList */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "ホーム",
                "item": "https://smartsample.example.com/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "ショッピングカート"
              }
            ]
          })}
        </script>
      </Helmet>

      <main className="ec-cart">
        <Breadcrumb items={breadcrumbItems} />

      <StepIndicator currentStep={1} />

      {/* カートコンテンツ */}
      <section className="ec-cart__content bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* カートアイテム一覧 */}
            <div className="ec-cart__items lg:col-span-2 bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="ec-cart__items-header flex items-center justify-between p-6 bg-gray-50 border-b border-gray-200">
                <h2 className="ec-cart__items-title text-xl font-semibold text-gray-900">
                  カート内商品 (<span className="ec-cart__items-count text-blue-600 font-bold">{cartItems.length}</span>点)
                  {selectedItems.length > 0 && (
                    <span className="ec-cart__selected-count ml-2 text-sm text-gray-600">
                      ({selectedItems.length}個選択中)
                    </span>
                  )}
                </h2>
                <div className="ec-cart__items-actions flex items-center space-x-4">
                  <label className="ec-cart__select-all flex items-center space-x-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      id="selectAll"
                      checked={allSelected}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span>すべて選択</span>
                  </label>
                  <button
                    onClick={handleRemoveSelected}
                    disabled={selectedItems.length === 0}
                    className={`ec-cart__remove-selected flex items-center space-x-2 px-3 py-1.5 border text-sm rounded transition-colors ${
                      selectedItems.length === 0
                        ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                        : 'border-red-300 text-red-600 hover:bg-red-50'
                    }`}
                  >
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

              {/* 最近削除した商品の復元 */}
              {recentlyDeleted.length > 0 && (
                <div className="ec-cart__restore p-4 bg-blue-50 border-b border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="ec-cart__restore-info flex items-center space-x-2 text-sm text-blue-800">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                        <path d="M21 3v5h-5"></path>
                        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                        <path d="M3 21v-5h5"></path>
                      </svg>
                      <span className="font-medium">最近削除した商品:</span>
                      <span className="ec-cart__restore-product-name">{recentlyDeleted[0].name}</span>
                    </div>
                    <button
                      onClick={() => restoreItem(recentlyDeleted[0])}
                      className="ec-cart__restore-btn text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      元に戻す
                    </button>
                  </div>
                </div>
              )}

              {/* 在庫不足の警告 */}
              {hasStockIssues && (
                <div className="ec-cart__stock-warning p-4 bg-red-50 border-b border-red-200">
                  <div className="flex items-start space-x-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-red-600 flex-shrink-0 mt-0.5">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                      <line x1="12" y1="9" x2="12" y2="13"></line>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                    <div className="flex-1">
                      <p className="ec-cart__warning-title font-semibold text-red-900 mb-1">在庫不足の商品があります</p>
                      <p className="ec-cart__warning-message text-sm text-red-800">
                        以下の商品の数量を調整するか、削除してください:
                      </p>
                      <ul className="ec-cart__warning-list mt-2 space-y-1">
                        {outOfStockItems.map((item) => (
                          <li key={item.id} className="ec-cart__warning-item text-sm text-red-800">
                            • {item.name} (注文: {item.quantity}個 / 在庫: {item.stock}個)
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              <div className="ec-cart__items-list divide-y divide-gray-200">
                {cartItems.map(item => (
                  <CartItem
                    key={item.id}
                    item={item}
                    isSelected={selectedItems.includes(item.id)}
                    onToggleSelect={toggleSelectItem}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemove}
                    onToggleFavorite={() => handleToggleFavorite(item)}
                  />
                ))}
              </div>

              {cartItems.length === 0 && (
                <div className="ec-cart__empty p-12 text-center">
                  <div className="ec-cart__empty-icon text-gray-400 mb-4">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="mx-auto">
                      <circle cx="9" cy="21" r="1"></circle>
                      <circle cx="20" cy="21" r="1"></circle>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                  </div>
                  <p className="ec-cart__empty-message text-gray-600 mb-4">カートに商品がありません</p>
                  <Button to="/" variant="primary">ショッピングを続ける</Button>
                </div>
              )}
            </div>

            {/* 注文サマリー */}
            <div className="ec-cart__summary lg:col-span-1">
              <div className="ec-cart__summary-container bg-white rounded-lg border border-gray-200 p-6 sticky top-4">
                <h2 className="ec-cart__summary-title text-xl font-semibold text-gray-900 mb-6">注文サマリー</h2>

                {/* クーポン入力 */}
                <div className="ec-cart__coupon mb-6">
                  <h3 className="ec-cart__coupon-title font-semibold text-gray-900 mb-3">クーポンコード</h3>
                  {appliedCoupon ? (
                    <div className="ec-cart__coupon-applied bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-green-600">
                              <path d="M20 6L9 17l-5-5"></path>
                            </svg>
                            <span className="ec-cart__coupon-code font-semibold text-green-900">{appliedCoupon.code}</span>
                          </div>
                          <p className="ec-cart__coupon-description text-sm text-green-700">{appliedCoupon.description}</p>
                          <p className="ec-cart__coupon-discount text-sm font-bold text-green-900 mt-1">
                            -¥{couponDiscount.toLocaleString()} 割引
                          </p>
                        </div>
                        <button
                          onClick={handleRemoveCoupon}
                          className="ec-cart__coupon-remove text-sm text-red-600 hover:text-red-800 font-medium"
                        >
                          解除
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="ec-cart__coupon-input flex space-x-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        onKeyPress={(e) => e.key === 'Enter' && handleApplyCoupon()}
                        placeholder="クーポンコードを入力"
                        className="ec-cart__coupon-field flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        className="ec-cart__coupon-apply px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        適用
                      </button>
                    </div>
                  )}
                </div>

                <div className="ec-cart__price-breakdown space-y-4 mb-6">
                  <div className="ec-cart__subtotal flex justify-between text-gray-700">
                    <span>小計</span>
                    <span className="font-semibold">¥{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="ec-cart__shipping flex justify-between text-gray-700">
                    <span>配送料</span>
                    <span className="font-semibold">
                      {shippingFee === 0 || (appliedCoupon && appliedCoupon.type === 'shipping') ? (
                        <span className="text-green-600">無料</span>
                      ) : (
                        `¥${shippingFee.toLocaleString()}`
                      )}
                    </span>
                  </div>
                  {couponDiscount > 0 && (
                    <div className="ec-cart__coupon-discount flex justify-between text-green-600">
                      <span>クーポン割引</span>
                      <span className="font-semibold">-¥{couponDiscount.toLocaleString()}</span>
                    </div>
                  )}
                  {subtotal < 3000 && !appliedCoupon && (
                    <div className="ec-cart__shipping-notice text-sm text-orange-600 bg-orange-50 p-3 rounded">
                      あと¥{(3000 - subtotal).toLocaleString()}で送料無料
                    </div>
                  )}
                  <div className="ec-cart__total border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>合計</span>
                      <span className="ec-cart__total-amount text-2xl text-blue-600">¥{total.toLocaleString()}</span>
                    </div>
                    <p className="ec-cart__tax-note text-xs text-gray-500 mt-1">（税込）</p>
                  </div>
                </div>

                <Button
                  variant="primary"
                  fullWidth
                  disabled={!canProceedToCheckout}
                  to="/checkout"
                  className="ec-cart__checkout-btn"
                >
                  購入手続きへ進む
                </Button>

                {hasStockIssues && (
                  <p className="ec-cart__checkout-error text-sm text-red-600 text-center mt-2">
                    在庫不足の商品があるため購入できません
                  </p>
                )}

                {cartItems.length === 0 && (
                  <p className="ec-cart__empty-notice text-sm text-gray-500 text-center mt-2">
                    カートに商品がありません
                  </p>
                )}

                <Button to="/" variant="link" fullWidth className="ec-cart__continue-shopping mt-4 justify-center">
                  ← ショッピングを続ける
                </Button>

                <div className="ec-cart__payment-methods mt-6 pt-6 border-t border-gray-200">
                  <h3 className="ec-cart__section-title font-semibold text-gray-900 mb-3">お支払い方法</h3>
                  <div className="ec-cart__payment-method flex items-center space-x-2 text-sm text-gray-600">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                      <line x1="1" y1="10" x2="23" y2="10"></line>
                    </svg>
                    <span>クレジットカード</span>
                  </div>
                  <div className="ec-cart__payment-method flex items-center space-x-2 text-sm text-gray-600 mt-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                      <line x1="2" y1="10" x2="22" y2="10"></line>
                    </svg>
                    <span>銀行振込・代金引換</span>
                  </div>
                </div>

                <div className="ec-cart__shipping-info mt-6 pt-6 border-t border-gray-200">
                  <h3 className="ec-cart__section-title font-semibold text-gray-900 mb-3">配送について</h3>
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

      {/* おすすめ商品 */}
      {recommendedProducts.length > 0 && (
        <section className="ec-cart__recommended py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="ec-cart__recommended-header flex justify-between items-center mb-8">
              <h2 className="ec-cart__recommended-title text-2xl font-bold text-gray-900">
                {cartItems.length > 0 ? 'こちらの商品もおすすめです' : '人気商品'}
              </h2>
              <Link to="/products" className="ec-cart__recommended-link text-blue-600 hover:text-blue-800 text-sm font-medium">
                すべて見る →
              </Link>
            </div>
            <ProductSlider products={recommendedProducts} />
          </div>
        </section>
      )}

      {/* 削除確認モーダル */}
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, type: null, itemId: null })}
        title="商品の削除"
        onConfirm={confirmDelete}
        confirmText="削除する"
        confirmVariant="danger"
      >
        {deleteModal.type === 'single' ? (
          <p className="text-gray-700">
            この商品をカートから削除してもよろしいですか？
            <br />
            <span className="text-sm text-gray-500 mt-2 block">
              ※削除した商品は「元に戻す」で復元できます
            </span>
          </p>
        ) : (
          <p className="text-gray-700">
            選択した{selectedItems.length}個の商品をカートから削除してもよろしいですか？
            <br />
            <span className="text-sm text-gray-500 mt-2 block">
              ※削除した商品は「元に戻す」で復元できます
            </span>
          </p>
        )}
      </Modal>
      </main>
    </>
  );
}

export default Cart;
