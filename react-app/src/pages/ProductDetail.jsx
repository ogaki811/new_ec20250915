import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';

function ProductDetail() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // サンプル商品データ（実際にはAPIから取得）
  const product = {
    id: id || '1',
    name: 'コクヨ ファイルボックス-FS ピース B4 グレー',
    code: 'フボ-FSB4M',
    brand: 'コクヨ',
    price: 342,
    originalPrice: 380,
    stock: 98,
    description: 'スタンダードなデザインで、オフィスや家庭でお使いいただける定番のファイルボックスです。書類の整理に最適で、丈夫な作りで長くお使いいただけます。',
    images: [
      '/img/product/A-74769_l1.jpg',
      '/img/product/8027341_l1.jpg',
      '/img/product/AH85168_l1.jpg',
    ],
    features: [
      '丈夫な素材で長期間使用可能',
      'スタッキング可能でスペース効率アップ',
      '環境に優しい再生材料使用',
      '日本製',
    ],
    specs: [
      { label: 'サイズ', value: 'W330×D255×H305mm' },
      { label: '材質', value: '再生PP' },
      { label: 'カラー', value: 'グレー' },
      { label: '重量', value: '約450g' },
    ],
  };

  // 関連商品
  const relatedProducts = [
    { id: '2', name: 'プラス デスクトレー A4横', code: 'DM-110BK', image: '/img/product/8027341_l1.jpg', price: 580, originalPrice: 650 },
    { id: '3', name: 'コクヨ キャンパスノート B5', code: 'ノ-3CBNX5', image: '/img/product/AH85168_l1.jpg', price: 450 },
    { id: '4', name: 'プレミアム商品 4', code: 'AW75238', image: '/img/product/AW75238_l1.jpg', price: 2990 },
    { id: '5', name: 'プレミアム商品 5', code: 'AWA4132', image: '/img/product/AWA4132_l1.jpg', price: 2990 },
  ];

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
    console.log('Add to cart:', { productId: product.id, quantity });
  };

  return (
    <main>
      <Breadcrumb items={breadcrumbItems} />

      {/* 商品詳細セクション */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* 商品画像 */}
            <div>
              <div className="bg-gray-100 rounded-lg overflow-hidden mb-4">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`border-2 rounded-lg overflow-hidden ${
                      selectedImage === index ? 'border-blue-600' : 'border-gray-200'
                    }`}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-auto object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* 商品情報 */}
            <div>
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <p className="text-sm text-gray-500">商品コード: {product.code}</p>
              </div>

              <div className="mb-6">
                {product.originalPrice && (
                  <p className="text-lg text-gray-500 line-through">¥{product.originalPrice.toLocaleString()}</p>
                )}
                <div className="flex items-baseline gap-3">
                  <p className="text-4xl font-bold text-blue-600">¥{product.price.toLocaleString()}</p>
                  {product.originalPrice && (
                    <span className="bg-red-500 text-white text-sm px-2 py-1 rounded">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%OFF
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">（税込）</p>
              </div>

              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">在庫状況:</span>
                  <span className="text-sm font-semibold text-green-600">
                    在庫あり ({product.stock}個)
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="1" y="3" width="15" height="13"></rect>
                    <path d="M16 8l4-4v16l-4-4"></path>
                  </svg>
                  <span>翌日配送対応</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  <span>3,000円以上で送料無料</span>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">数量</label>
                <div className="flex items-center gap-4">
                  <div className="flex border-2 border-gray-300 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-colors"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                      className="w-20 h-12 text-center border-0 text-lg font-semibold focus:ring-0"
                      min="1"
                      max={product.stock}
                    />
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm text-gray-600">在庫: {product.stock}個</span>
                </div>
              </div>

              <div className="flex gap-4 mb-6">
                <Button variant="primary" size="lg" fullWidth onClick={handleAddToCart}>
                  カートに追加
                </Button>
                <button className="w-14 h-14 flex items-center justify-center border-2 border-gray-300 rounded-lg hover:bg-red-50 hover:border-red-500 hover:text-red-500 transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">商品の特徴</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
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
          <div className="mt-12 border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">商品説明</h2>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          {/* 商品仕様 */}
          <div className="mt-12 border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">商品仕様</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <table className="w-full">
                <tbody className="divide-y divide-gray-200">
                  {product.specs.map((spec, index) => (
                    <tr key={index}>
                      <td className="py-3 pr-6 text-sm font-medium text-gray-700 w-1/4">{spec.label}</td>
                      <td className="py-3 text-sm text-gray-900">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 関連商品 */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">関連商品</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProductDetail;
