import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/common/Breadcrumb';
import ProductDetailClient from '@/components/product/ProductDetailClient';
import ProductGrid from '@/components/product/ProductGrid';
import { sampleProducts } from '@/data/sampleProducts';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

// 動的メタデータ生成
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = sampleProducts.find((p) => p.id === id);

  if (!product) {
    return {
      title: '商品が見つかりません - smartsample',
    };
  }

  return {
    title: `${product.name} | ${product.brand} - smartsample`,
    description: `${product.name}（品番: ${product.code}）。${product.brand}の商品を¥${product.price.toLocaleString()}でご提供。3,000円以上で送料無料。`,
    keywords: [product.name, product.brand, product.category, product.code, 'オフィス用品', '事務用品'],
    openGraph: {
      title: `${product.name} | ${product.brand}`,
      description: `¥${product.price.toLocaleString()}（税込）- ${product.brand}`,
      type: 'website',
      locale: 'ja_JP',
      siteName: 'smartsample',
      images: [
        {
          url: product.image,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | ${product.brand}`,
      description: `¥${product.price.toLocaleString()}（税込）- ${product.brand}`,
      images: [product.image],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = sampleProducts.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  // 関連商品（同じカテゴリーの商品）
  const relatedProducts = sampleProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // JSON-LD 構造化データ
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images,
    description: `${product.name}（品番: ${product.code}）`,
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
      availability: product.stock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      ratingCount: 1,
    },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* JSON-LD 構造化データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <main className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* パンくずリスト */}
          <Breadcrumb
            items={[
              { label: '商品一覧', href: '/products' },
              { label: product.category, href: `/products?category=${product.category}` },
              { label: product.name },
            ]}
          />

          {/* 商品詳細 */}
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-12">
            <ProductDetailClient product={product} />
          </div>

          {/* 関連商品 */}
          {relatedProducts.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6">関連商品</h2>
              <ProductGrid products={relatedProducts} />
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
