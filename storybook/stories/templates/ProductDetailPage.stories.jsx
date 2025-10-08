import ProductDetailClient from '@/components/product/ProductDetailClient';
import Breadcrumb from '@/components/common/Breadcrumb';
import ProductSlider from '@/components/home/ProductSlider';

const meta = {
  title: 'Templates/ProductDetailPage',
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
};

export default meta;

// サンプル商品データ
const sampleProduct = {
  id: 'prod-001',
  name: 'ワイヤレスイヤホン プレミアムモデル',
  code: 'WH-1000XM5',
  price: 28000,
  originalPrice: 35000,
  images: [
    'https://placehold.co/800x800/e2e8f0/1e293b?text=Image+1',
    'https://placehold.co/800x800/e2e8f0/1e293b?text=Image+2',
    'https://placehold.co/800x800/e2e8f0/1e293b?text=Image+3',
    'https://placehold.co/800x800/e2e8f0/1e293b?text=Image+4',
  ],
  brand: 'TechBrand',
  category: '電化製品',
  stock: 98,
  rating: 4.5,
  reviewCount: 89,
  tags: ['人気', 'セール'],
  description: 'ワイヤレスイヤホン プレミアムモデルは、TechBrandが提供する高品質な商品です。オフィスや家庭でお使いいただける定番商品で、丈夫な作りで長くお使いいただけます。',
  features: [
    '高品質な素材で長期間使用可能',
    '使いやすいデザイン',
    '信頼のブランド品質',
    '日本国内配送対応',
  ],
  specs: [
    { label: 'ブランド', value: 'TechBrand' },
    { label: 'カテゴリ', value: '電化製品' },
    { label: '商品コード', value: 'WH-1000XM5' },
    { label: '評価', value: '4.5 / 5.0' },
  ],
};

// 関連商品データ
const relatedProducts = Array.from({ length: 12 }, (_, i) => ({
  id: `related-${i + 1}`,
  name: `関連商品${i + 1}`,
  code: `REL-${String(i + 1).padStart(3, '0')}`,
  price: Math.floor(Math.random() * 30000) + 5000,
  image: `https://placehold.co/400x400/e2e8f0/1e293b?text=Related+${i + 1}`,
  images: [`https://placehold.co/400x400/e2e8f0/1e293b?text=Related+${i + 1}`],
  brand: 'TechBrand',
  category: '電化製品',
  stock: true,
  rating: 4.0 + Math.random(),
  tags: i % 3 === 0 ? ['人気'] : [],
}));

// 基本的な商品詳細ページ
export const Default = {
  render: () => (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="ec-product-detail flex-grow">
        <Breadcrumb />

        <section className="ec-product-detail__main py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ProductDetailClient product={sampleProduct} />

            {/* 商品説明 */}
            <div className="ec-product-detail__description mt-12 border-t border-gray-200 pt-8">
              <h2 className="ec-product-detail__section-title text-2xl font-bold text-gray-900 mb-4">商品説明</h2>
              <p className="ec-product-detail__description-text text-gray-700 leading-relaxed">{sampleProduct.description}</p>
            </div>

            {/* 商品仕様 */}
            <div className="ec-product-detail__specs mt-12 border-t border-gray-200 pt-8">
              <h2 className="ec-product-detail__section-title text-2xl font-bold text-gray-900 mb-4">商品仕様</h2>
              <div className="ec-product-detail__specs-table bg-gray-50 rounded-lg p-6">
                <table className="w-full">
                  <tbody className="divide-y divide-gray-200">
                    {sampleProduct.specs.map((spec, index) => (
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
        <section className="ec-product-detail__related py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="ec-product-detail__section-title text-2xl font-bold text-gray-900 mb-8">関連商品</h2>
            <ProductSlider products={relatedProducts} />
          </div>
        </section>
      </main>
    </div>
  ),
};

// セール商品
export const SaleProduct = {
  render: () => {
    const saleProduct = {
      ...sampleProduct,
      name: 'スマートウォッチ プロモデル',
      price: 35000,
      originalPrice: 48000,
      tags: ['人気', 'セール', '新商品'],
    };

    return (
      <div className="min-h-screen flex flex-col bg-white">
        <main className="ec-product-detail flex-grow">
          <Breadcrumb />

          <section className="ec-product-detail__main py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ProductDetailClient product={saleProduct} />

              <div className="ec-product-detail__description mt-12 border-t border-gray-200 pt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">商品説明</h2>
                <p className="text-gray-700 leading-relaxed">{saleProduct.description}</p>
              </div>

              <div className="ec-product-detail__specs mt-12 border-t border-gray-200 pt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">商品仕様</h2>
                <div className="bg-gray-50 rounded-lg p-6">
                  <table className="w-full">
                    <tbody className="divide-y divide-gray-200">
                      {saleProduct.specs.map((spec, index) => (
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

          <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">関連商品</h2>
              <ProductSlider products={relatedProducts} />
            </div>
          </section>
        </main>
      </div>
    );
  },
};

// 在庫切れ商品
export const OutOfStock = {
  render: () => {
    const outOfStockProduct = {
      ...sampleProduct,
      stock: 0,
      originalPrice: null,
    };

    return (
      <div className="min-h-screen flex flex-col bg-white">
        <main className="ec-product-detail flex-grow">
          <Breadcrumb />

          <section className="ec-product-detail__main py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ProductDetailClient product={outOfStockProduct} />

              <div className="ec-product-detail__description mt-12 border-t border-gray-200 pt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">商品説明</h2>
                <p className="text-gray-700 leading-relaxed">{outOfStockProduct.description}</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  },
};

// 高額商品
export const ExpensiveProduct = {
  render: () => {
    const expensiveProduct = {
      ...sampleProduct,
      name: 'プロフェッショナルカメラシステム',
      price: 298000,
      originalPrice: null,
      description: 'プロフェッショナルカメラシステムは、TechBrandが提供する最高級の商品です。プロフェッショナル向けに設計された高性能カメラで、あらゆるシーンで最高の撮影が可能です。',
    };

    return (
      <div className="min-h-screen flex flex-col bg-white">
        <main className="ec-product-detail flex-grow">
          <Breadcrumb />

          <section className="ec-product-detail__main py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ProductDetailClient product={expensiveProduct} />

              <div className="ec-product-detail__description mt-12 border-t border-gray-200 pt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">商品説明</h2>
                <p className="text-gray-700 leading-relaxed">{expensiveProduct.description}</p>
              </div>

              <div className="ec-product-detail__specs mt-12 border-t border-gray-200 pt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">商品仕様</h2>
                <div className="bg-gray-50 rounded-lg p-6">
                  <table className="w-full">
                    <tbody className="divide-y divide-gray-200">
                      {expensiveProduct.specs.map((spec, index) => (
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

          <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">関連商品</h2>
              <ProductSlider products={relatedProducts} />
            </div>
          </section>
        </main>
      </div>
    );
  },
};

// 新商品（関連商品なし）
export const NewProductNoRelated = {
  render: () => {
    const newProduct = {
      ...sampleProduct,
      name: '新商品 最新モデル',
      tags: ['新商品'],
    };

    return (
      <div className="min-h-screen flex flex-col bg-white">
        <main className="ec-product-detail flex-grow">
          <Breadcrumb />

          <section className="ec-product-detail__main py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ProductDetailClient product={newProduct} />

              <div className="ec-product-detail__description mt-12 border-t border-gray-200 pt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">商品説明</h2>
                <p className="text-gray-700 leading-relaxed">{newProduct.description}</p>
              </div>

              <div className="ec-product-detail__specs mt-12 border-t border-gray-200 pt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">商品仕様</h2>
                <div className="bg-gray-50 rounded-lg p-6">
                  <table className="w-full">
                    <tbody className="divide-y divide-gray-200">
                      {newProduct.specs.map((spec, index) => (
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
        </main>
      </div>
    );
  },
};

// 単一画像商品
export const SingleImage = {
  render: () => {
    const singleImageProduct = {
      ...sampleProduct,
      images: ['https://placehold.co/800x800/e2e8f0/1e293b?text=Product'],
    };

    return (
      <div className="min-h-screen flex flex-col bg-white">
        <main className="ec-product-detail flex-grow">
          <Breadcrumb />

          <section className="ec-product-detail__main py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ProductDetailClient product={singleImageProduct} />

              <div className="ec-product-detail__description mt-12 border-t border-gray-200 pt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">商品説明</h2>
                <p className="text-gray-700 leading-relaxed">{singleImageProduct.description}</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  },
};

// 在庫少ない
export const LowStock = {
  render: () => {
    const lowStockProduct = {
      ...sampleProduct,
      stock: 3,
    };

    return (
      <div className="min-h-screen flex flex-col bg-white">
        <main className="ec-product-detail flex-grow">
          <Breadcrumb />

          <section className="ec-product-detail__main py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ProductDetailClient product={lowStockProduct} />

              <div className="ec-product-detail__description mt-12 border-t border-gray-200 pt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">商品説明</h2>
                <p className="text-gray-700 leading-relaxed">{lowStockProduct.description}</p>
              </div>

              <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  ⚠️ 残りわずかです。お早めにご注文ください。
                </p>
              </div>
            </div>
          </section>

          <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">関連商品</h2>
              <ProductSlider products={relatedProducts} />
            </div>
          </section>
        </main>
      </div>
    );
  },
};

// 長い商品名と説明
export const LongContent = {
  render: () => {
    const longContentProduct = {
      ...sampleProduct,
      name: 'プロフェッショナルワイヤレスノイズキャンセリングヘッドホン 最新モデル 2024年版 ハイレゾ対応 Bluetooth5.3搭載',
      description: 'プロフェッショナルワイヤレスノイズキャンセリングヘッドホンは、TechBrandが提供する最高品質の音楽体験を実現する商品です。業界最高クラスのノイズキャンセリング技術により、あらゆる環境で純粋な音楽を楽しむことができます。長時間の使用でも快適な装着感を実現する人間工学に基づいたデザインを採用しています。バッテリーは最大30時間の連続再生が可能で、急速充電にも対応しています。ハイレゾ音源にも対応しており、高音質な音楽をお楽しみいただけます。',
      specs: [
        { label: 'ブランド', value: 'TechBrand Professional Audio Division' },
        { label: 'カテゴリ', value: 'プレミアムオーディオ機器 > ワイヤレスヘッドホン > ノイズキャンセリング' },
        { label: '商品コード', value: 'WH-1000XM5-PRO-2024' },
        { label: '評価', value: '4.5 / 5.0' },
        { label: 'バッテリー持続時間', value: '最大30時間（ノイズキャンセリングON時）' },
        { label: '充電時間', value: '約3時間（急速充電10分で5時間再生可能）' },
        { label: '対応コーデック', value: 'LDAC, AAC, SBC, aptX Adaptive' },
        { label: '重量', value: '約250g' },
      ],
    };

    return (
      <div className="min-h-screen flex flex-col bg-white">
        <main className="ec-product-detail flex-grow">
          <Breadcrumb />

          <section className="ec-product-detail__main py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ProductDetailClient product={longContentProduct} />

              <div className="ec-product-detail__description mt-12 border-t border-gray-200 pt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">商品説明</h2>
                <p className="text-gray-700 leading-relaxed">{longContentProduct.description}</p>
              </div>

              <div className="ec-product-detail__specs mt-12 border-t border-gray-200 pt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">商品仕様</h2>
                <div className="bg-gray-50 rounded-lg p-6">
                  <table className="w-full">
                    <tbody className="divide-y divide-gray-200">
                      {longContentProduct.specs.map((spec, index) => (
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

          <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">関連商品</h2>
              <ProductSlider products={relatedProducts} />
            </div>
          </section>
        </main>
      </div>
    );
  },
};

// モバイルレイアウト
export const MobileLayout = {
  render: () => (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="ec-product-detail flex-grow">
        <Breadcrumb />

        <section className="ec-product-detail__main py-6 bg-white">
          <div className="px-4">
            <ProductDetailClient product={sampleProduct} />

            <div className="ec-product-detail__description mt-8 border-t border-gray-200 pt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">商品説明</h2>
              <p className="text-sm text-gray-700 leading-relaxed">{sampleProduct.description}</p>
            </div>

            <div className="ec-product-detail__specs mt-8 border-t border-gray-200 pt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">商品仕様</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <table className="w-full text-sm">
                  <tbody className="divide-y divide-gray-200">
                    {sampleProduct.specs.map((spec, index) => (
                      <tr key={index}>
                        <td className="py-2 pr-4 font-medium text-gray-700">{spec.label}</td>
                        <td className="py-2 text-gray-900">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 bg-gray-50">
          <div className="px-4">
            <h2 className="text-xl font-bold text-gray-900 mb-6">関連商品</h2>
            <ProductSlider products={relatedProducts.slice(0, 6)} />
          </div>
        </section>
      </main>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
