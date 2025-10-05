import Link from 'next/link';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/product/ProductGrid';
import { sampleProducts } from '@/data/sampleProducts';

export const metadata: Metadata = {
  title: 'smartsample - オフィス用品・事務用品通販',
  description: 'オフィス用品、文具、家具、電化製品を取り扱うECサイト。3,000円以上で送料無料。高品質な商品を豊富に取り揃えています。',
  keywords: ['オフィス用品', '事務用品', '文具', '家具', '電化製品', '通販', 'EC'],
  openGraph: {
    title: 'smartsample - オフィス用品・事務用品通販',
    description: 'オフィス用品、文具、家具、電化製品を取り扱うECサイト。3,000円以上で送料無料。',
    type: 'website',
    locale: 'ja_JP',
    siteName: 'smartsample',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'smartsample - オフィス用品・事務用品通販',
    description: 'オフィス用品、文具、家具、電化製品を取り扱うECサイト。3,000円以上で送料無料。',
  },
};

export default function HomePage() {
  const popularProducts = sampleProducts.filter((product) =>
    product.tags.includes('人気')
  );

  const newProducts = sampleProducts.filter((product) =>
    product.tags.includes('新商品')
  );

  const featuredProducts = sampleProducts.slice(0, 8);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                オフィス用品・事務用品の総合通販
              </h1>
              <p className="text-xl md:text-2xl mb-8">
                3,000円以上のご注文で<span className="font-bold">送料無料</span>
              </p>
              <div className="flex justify-center space-x-4">
                <Link
                  href="/products"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  商品を探す
                </Link>
              </div>
            </div>
          </div>
        </section>

        {popularProducts.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold mb-8">人気商品</h2>
              <ProductGrid products={popularProducts} />
            </div>
          </section>
        )}

        {newProducts.length > 0 && (
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold mb-8">新商品</h2>
              <ProductGrid products={newProducts} />
            </div>
          </section>
        )}

        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8">おすすめ商品</h2>
            <ProductGrid products={featuredProducts} />
            <div className="text-center mt-12">
              <Link
                href="/products"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                すべての商品を見る
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
