import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/common/Breadcrumb';
import ProductDetailClient from '@/components/product/ProductDetailClient';
import ProductSlider from '@/components/home/ProductSlider';
import { sampleProducts } from '@/data/sampleProducts';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

// 動的メタデータ生成
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const productData = sampleProducts.find((p) => p.id === id);

  if (!productData) {
    return {
      title: '商品が見つかりません - smartsample',
    };
  }

  const product = {
    ...productData,
    description: `${productData.name}は、${productData.brand}が提供する高品質な商品です。オフィスや家庭でお使いいただける定番商品で、丈夫な作りで長くお使いいただけます。`,
  };

  return {
    title: `${product.name} - ${product.brand} | smartsample`,
    description: product.description.substring(0, 160),
    keywords: [product.name, product.brand, product.category, product.code, 'オフィス用品', '事務用品'],
    openGraph: {
      title: `${product.name} - ${product.brand}`,
      description: product.description.substring(0, 200),
      type: 'website',
      locale: 'ja_JP',
      siteName: 'smartsample',
      images: [
        {
          url: product.images[0],
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} - ${product.brand}`,
      description: product.description.substring(0, 200),
      images: [product.images[0]],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const productData = sampleProducts.find((p) => p.id === id);

  if (!productData) {
    notFound();
  }

  // 商品詳細用データを拡張
  const product = {
    ...productData,
    stock: productData.stock ? 98 : 0,
    originalPrice: productData.tags.includes('セール') ? Math.round(productData.price * 1.2) : null,
    description: `${productData.name}は、${productData.brand}が提供する高品質な商品です。オフィスや家庭でお使いいただける定番商品で、丈夫な作りで長くお使いいただけます。`,
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
    .filter((p) => p.id !== id && (p.category === productData.category || p.brand === productData.brand))
    .slice(0, 12);

  // JSON-LD 構造化データ - Product
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images,
    description: product.description,
    sku: product.code,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    offers: {
      '@type': 'Offer',
      url: `https://smartsample.example.com/products/${product.id}`,
      priceCurrency: 'JPY',
      price: product.price,
      availability: product.stock > 0
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'smartsample',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount || 89,
    },
  };

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
        name: '商品一覧',
        item: 'https://smartsample.example.com/products',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.name,
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* JSON-LD 構造化データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main className="ec-product-detail flex-grow">
        <Breadcrumb />

        {/* 商品詳細セクション */}
        <section className="ec-product-detail__main py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ProductDetailClient product={product} />

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

      <Footer />
    </div>
  );
}
