import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import Breadcrumb from '../components/Breadcrumb';
import Button from '../components/Button';
import ProductSlider from '../components/ProductSlider';
import useCartStore from '../store/useCartStore';
import useFavoritesStore from '../store/useFavoritesStore';
import { sampleProducts } from '../data/sampleProducts';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // 商品IDが変更されたら状態をリセット
  useEffect(() => {
    setQuantity(1);
    setSelectedImage(0);
  }, [id]);

  const addItem = useCartStore((state) => state.addItem);
  const { toggleFavorite, isFavorite } = useFavoritesStore();

  // 商品データを取得
  const productData = sampleProducts.find(p => p.id === id);

  // 商品が見つからない場合
  if (!productData) {
    return (
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">商品が見つかりません</h1>
          <p className="text-gray-600 mb-6">指定された商品は存在しないか、削除された可能性があります。</p>
          <Button onClick={() => navigate('/products')}>商品一覧に戻る</Button>
        </div>
      </main>
    );
  }

  // 商品詳細用データを拡張
  const product = {
    ...productData,
    stock: productData.stock ? 98 : 0,
    originalPrice: productData.tags.includes('セール') ? Math.round(productData.price * 1.2) : null,
    description: `${productData.name}は、${productData.brand}が提供する高品質な商品です。オフィスや家庭でお使いいただける定番商品で、丈夫な作りで長くお使いいただけます。`,
    // 商品データのimages配列をそのまま使用（1-4枚の可変枚数）
    images: productData.images || [productData.image],
    features: [
      '高品質な素材で長期間使用可能',
      '使いやすいデザイン',
      '信頼のブランド品質',
      '日本国内配送対応',
    ],
    specs: [
      { label: 'ブランド', value: productData.brand },
      { label: 'カテゴリ', value: productData.category },
      { label: '商品コード', value: productData.code },
      { label: '評価', value: `${productData.rating} / 5.0` },
    ],
  };

  // 関連商品（同じカテゴリまたは同じブランド）
  const relatedProducts = sampleProducts
    .filter(p => p.id !== id && (p.category === productData.category || p.brand === productData.brand))
    .slice(0, 12); // スライダー用に多めに取得

  const breadcrumbItems = [
    { label: 'ホーム', href: '/' },
    { label: '商品一覧', href: '/products' },
    { label: product.name }
  ];

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    const productWithQuantity = {
      ...product,
      image: product.images[0],
      quantity: quantity
    };
    addItem(productWithQuantity);
    toast.success(`${product.name}を${quantity}個カートに追加しました`);
  };

  const handleToggleFavorite = () => {
    const productForFavorite = {
      ...product,
      image: product.images[0]
    };
    const wasFavorite = isFavorite(product.id);
    toggleFavorite(productForFavorite);

    if (wasFavorite) {
      toast(`${product.name}をお気に入りから削除しました`, { icon: '💔' });
    } else {
      toast.success(`${product.name}をお気に入りに追加しました`, { icon: '❤️' });
    }
  };

  const pageTitle = `${product.name} - ${product.brand} | smartsample`;
  const pageDescription = `${product.name}の商品詳細ページ。${product.description.substring(0, 100)}...`;
  const productUrl = `https://smartsample.example.com/product/${product.id}`;
  const productImageUrl = product.images[0];

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={productUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={productUrl} />
        <meta property="og:type" content="product" />
        <meta property="og:image" content={productImageUrl} />
        <meta property="product:price:amount" content={product.price} />
        <meta property="product:price:currency" content="JPY" />

        {/* Twitter Card */}
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={productImageUrl} />
        <meta name="twitter:card" content="summary_large_image" />

        {/* Structured Data - Product */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": product.name,
            "image": product.images,
            "description": product.description,
            "sku": product.code,
            "brand": {
              "@type": "Brand",
              "name": product.brand
            },
            "offers": {
              "@type": "Offer",
              "url": productUrl,
              "priceCurrency": "JPY",
              "price": product.price,
              "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
              "seller": {
                "@type": "Organization",
                "name": "smartsample"
              }
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": product.rating,
              "reviewCount": product.reviewCount || 89
            }
          })}
        </script>

        {/* Structured Data - BreadcrumbList */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbItems.map((item, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": item.label,
              "item": item.href ? `https://smartsample.example.com${item.href}` : undefined
            }))
          })}
        </script>
      </Helmet>

      <main className="ec-product-detail">
        <Breadcrumb items={breadcrumbItems} />

      {/* 商品詳細セクション */}
      <section className="ec-product-detail__main py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* 商品画像 */}
            <div className="ec-product-detail__images">
              <div className="ec-product-detail__main-image bg-gray-100 rounded-lg overflow-hidden mb-4">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-auto object-cover"
                />
              </div>
              {/* 画像が2枚以上ある場合のみサムネイル表示 */}
              {product.images.length > 1 && (
                <div className="ec-product-detail__thumbnails flex gap-2 flex-wrap">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`ec-product-detail__thumbnail ${selectedImage === index ? 'ec-product-detail__thumbnail--active' : ''} w-24 h-24 border-2 rounded-lg overflow-hidden flex-shrink-0 ${
                        selectedImage === index ? 'border-blue-600' : 'border-gray-200'
                      }`}
                    >
                      <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 商品情報 */}
            <div className="ec-product-detail__info">
              <div className="ec-product-detail__header mb-4">
                <p className="ec-product-detail__brand text-sm text-gray-600 mb-2">{product.brand}</p>
                <h1 className="ec-product-detail__title text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <p className="ec-product-detail__code text-sm text-gray-500">商品コード: {product.code}</p>
              </div>

              <div className="ec-product-detail__pricing mb-6">
                {product.originalPrice && (
                  <p className="ec-product-detail__original-price text-lg text-gray-500 line-through">¥{product.originalPrice.toLocaleString()}</p>
                )}
                <div className="flex items-baseline gap-3">
                  <p className="ec-product-detail__price text-4xl font-bold text-blue-600">¥{product.price.toLocaleString()}</p>
                  {product.originalPrice && (
                    <span className="ec-product-detail__discount bg-red-500 text-white text-sm px-2 py-1 rounded">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%OFF
                    </span>
                  )}
                </div>
                <p className="ec-product-detail__tax-note text-sm text-gray-500 mt-1">（税込）</p>
              </div>

              <div className="ec-product-detail__stock-info mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="ec-product-detail__stock-status flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">在庫状況:</span>
                  {product.stock > 0 ? (
                    <span className="ec-product-detail__stock-label ec-product-detail__stock-label--in-stock text-sm font-semibold text-green-600">
                      在庫あり ({product.stock}個)
                    </span>
                  ) : (
                    <span className="ec-product-detail__stock-label ec-product-detail__stock-label--out-of-stock text-sm font-semibold text-red-600">
                      在庫切れ
                    </span>
                  )}
                </div>
                <div className="ec-product-detail__shipping-info flex items-center gap-2 text-sm text-gray-600">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="1" y="3" width="15" height="13"></rect>
                    <path d="M16 8l4-4v16l-4-4"></path>
                  </svg>
                  <span>翌日配送対応</span>
                </div>
                <div className="ec-product-detail__free-shipping flex items-center gap-2 text-sm text-gray-600 mt-1">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  <span>3,000円以上で送料無料</span>
                </div>
              </div>

              {product.stock > 0 && (
                <div className="ec-product-detail__quantity mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">数量</label>
                  <div className="flex items-center gap-4">
                    <div className="ec-product-detail__quantity-controls flex border-2 border-gray-300 rounded-lg">
                      <button
                        onClick={() => handleQuantityChange(quantity - 1)}
                        className="ec-product-detail__quantity-decrease w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-colors"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                        className="ec-product-detail__quantity-input w-20 h-12 text-center border-0 text-lg font-semibold focus:ring-0"
                        min="1"
                        max={product.stock}
                      />
                      <button
                        onClick={() => handleQuantityChange(quantity + 1)}
                        className="ec-product-detail__quantity-increase w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <span className="ec-product-detail__stock-count text-sm text-gray-600">在庫: {product.stock}個</span>
                  </div>
                </div>
              )}

              <div className="ec-product-detail__actions flex gap-4 mb-6">
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="ec-product-detail__add-to-cart"
                >
                  {product.stock > 0 ? 'カートに追加' : '在庫切れ'}
                </Button>
                <button
                  onClick={handleToggleFavorite}
                  className={`ec-product-detail__favorite-btn ${isFavorite(product.id) ? 'ec-product-detail__favorite-btn--active' : ''} w-14 h-14 flex items-center justify-center border-2 rounded-lg transition-colors ${
                    isFavorite(product.id)
                      ? 'bg-red-50 border-red-500 text-red-500'
                      : 'border-gray-300 hover:bg-red-50 hover:border-red-500 hover:text-red-500'
                  }`}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill={isFavorite(product.id) ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
              </div>

              <div className="ec-product-detail__features border-t border-gray-200 pt-6">
                <h3 className="ec-product-detail__features-title text-lg font-semibold text-gray-900 mb-3">商品の特徴</h3>
                <ul className="ec-product-detail__features-list space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="ec-product-detail__feature-item flex items-start gap-2 text-gray-700">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-green-500 flex-shrink-0 mt-0.5">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 商品説明 */}
          <div className="ec-product-detail__description mt-12 border-t border-gray-200 pt-8">
            <h2 className="ec-product-detail__section-title text-2xl font-bold text-gray-900 mb-4">商品説明</h2>
            <p className="ec-product-detail__description-text text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          {/* 商品仕様 */}
          <div className="ec-product-detail__specs mt-12 border-t border-gray-200 pt-8">
            <h2 className="ec-product-detail__section-title text-2xl font-bold text-gray-900 mb-4">商品仕様</h2>
            <div className="ec-product-detail__specs-table bg-gray-50 rounded-lg p-6">
              <table className="w-full">
                <tbody className="divide-y divide-gray-200">
                  {product.specs.map((spec, index) => (
                    <tr key={index} className="ec-product-detail__spec-row">
                      <td className="ec-product-detail__spec-label py-3 pr-6 text-sm font-medium text-gray-700 w-1/4">{spec.label}</td>
                      <td className="ec-product-detail__spec-value py-3 text-sm text-gray-900">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 関連商品 */}
      {relatedProducts.length > 0 && (
        <section className="ec-product-detail__related py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="ec-product-detail__section-title text-2xl font-bold text-gray-900 mb-8">関連商品</h2>
            <ProductSlider products={relatedProducts} />
          </div>
        </section>
      )}
      </main>
    </>
  );
}

export default ProductDetail;
