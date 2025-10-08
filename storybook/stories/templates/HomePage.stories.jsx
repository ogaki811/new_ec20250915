import HeroSlider from '@/components/home/HeroSlider';
import ProductSlider from '@/components/home/ProductSlider';

const meta = {
  title: 'Templates/HomePage',
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
const generateProducts = (count, tagFilter) => Array.from({ length: count }, (_, i) => ({
  id: `${tagFilter}-${i + 1}`,
  name: `${tagFilter}商品${i + 1}`,
  code: `${tagFilter.toUpperCase()}-${String(i + 1).padStart(3, '0')}`,
  price: Math.floor(Math.random() * 50000) + 3000,
  image: `https://placehold.co/400x400/e2e8f0/1e293b?text=${tagFilter}+${i + 1}`,
  images: [`https://placehold.co/400x400/e2e8f0/1e293b?text=${tagFilter}+${i + 1}`],
  brand: 'TechBrand',
  category: ['文具・事務用品', '電化製品', '家具'][i % 3],
  stock: true,
  rating: 4.0 + Math.random(),
  tags: [tagFilter],
}));

const recommendedProducts = generateProducts(12, '人気');
const newProducts = generateProducts(12, '新商品');
const saleProducts = generateProducts(12, 'セール');

// デフォルトのホームページ
export const Default = {
  render: () => (
    <div className="min-h-screen flex flex-col">
      <main className="ec-home flex-grow">
        {/* メインバナースライダー */}
        <section className="ec-home__hero">
          <HeroSlider />
        </section>

        {/* おすすめ商品 */}
        <section className="ec-home__section py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">おすすめ商品</h2>
                <p className="text-gray-600 mt-1">人気の商品を集めました</p>
              </div>
              <a href="/products" className="text-blue-600 hover:text-blue-700 font-medium">
                もっと見る →
              </a>
            </div>
            <ProductSlider products={recommendedProducts} />
          </div>
        </section>

        {/* 新着商品 */}
        <section className="ec-home__section py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">新着商品</h2>
                <p className="text-gray-600 mt-1">最新のアイテムをチェック</p>
              </div>
              <a href="/products?tag=新商品" className="text-blue-600 hover:text-blue-700 font-medium">
                もっと見る →
              </a>
            </div>
            <ProductSlider products={newProducts} />
          </div>
        </section>

        {/* セール商品 */}
        <section className="ec-home__section py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">セール商品</h2>
                <p className="text-gray-600 mt-1">お得な商品が勢揃い</p>
              </div>
              <a href="/products?tag=セール" className="text-blue-600 hover:text-blue-700 font-medium">
                もっと見る →
              </a>
            </div>
            <ProductSlider products={saleProducts} />
          </div>
        </section>

        {/* 特集バナー */}
        <section className="ec-home__section py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <a href="/products?category=電化製品" className="group relative overflow-hidden rounded-lg">
                <img
                  src="https://placehold.co/600x300/3b82f6/ffffff?text=電化製品特集"
                  alt="電化製品特集"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <div className="text-white">
                    <h3 className="text-2xl font-bold mb-2">電化製品特集</h3>
                    <p className="text-sm">最新のガジェットをチェック</p>
                  </div>
                </div>
              </a>

              <a href="/products?category=文具" className="group relative overflow-hidden rounded-lg">
                <img
                  src="https://placehold.co/600x300/10b981/ffffff?text=文具・オフィス用品"
                  alt="文具・オフィス用品"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <div className="text-white">
                    <h3 className="text-2xl font-bold mb-2">文具・オフィス用品</h3>
                    <p className="text-sm">仕事を快適にするアイテム</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  ),
};

// おすすめ商品のみ
export const RecommendedOnly = {
  render: () => (
    <div className="min-h-screen flex flex-col">
      <main className="ec-home flex-grow">
        <section className="ec-home__hero">
          <HeroSlider />
        </section>

        <section className="ec-home__section py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">おすすめ商品</h2>
                <p className="text-gray-600 mt-1">人気の商品を集めました</p>
              </div>
              <a href="/products" className="text-blue-600 hover:text-blue-700 font-medium">
                もっと見る →
              </a>
            </div>
            <ProductSlider products={recommendedProducts} />
          </div>
        </section>
      </main>
    </div>
  ),
};

// セール強調
export const SaleEmphasis = {
  render: () => (
    <div className="min-h-screen flex flex-col">
      <main className="ec-home flex-grow">
        <section className="ec-home__hero">
          <HeroSlider />
        </section>

        {/* セールバナー */}
        <section className="py-8 bg-gradient-to-r from-red-500 to-pink-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 className="text-4xl font-bold mb-2">🎉 期間限定セール開催中！</h2>
            <p className="text-lg mb-4">最大50%OFF！この機会をお見逃しなく</p>
            <a
              href="/products?tag=セール"
              className="inline-block px-8 py-3 bg-white text-red-600 font-bold rounded-full hover:bg-gray-100 transition-colors"
            >
              セール商品を見る
            </a>
          </div>
        </section>

        <section className="ec-home__section py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">セール商品</h2>
                <p className="text-gray-600 mt-1">お得な商品が勢揃い</p>
              </div>
            </div>
            <ProductSlider products={saleProducts} />
          </div>
        </section>

        <section className="ec-home__section py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">おすすめ商品</h2>
              </div>
            </div>
            <ProductSlider products={recommendedProducts} />
          </div>
        </section>
      </main>
    </div>
  ),
};

// モバイルレイアウト
export const MobileLayout = {
  render: () => (
    <div className="min-h-screen flex flex-col">
      <main className="ec-home flex-grow">
        <section className="ec-home__hero">
          <HeroSlider />
        </section>

        <section className="py-8 bg-white">
          <div className="px-4">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">おすすめ商品</h2>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">人気の商品</p>
                <a href="/products" className="text-sm text-blue-600 font-medium">
                  もっと見る →
                </a>
              </div>
            </div>
            <ProductSlider products={recommendedProducts.slice(0, 6)} />
          </div>
        </section>

        <section className="py-8 bg-gray-50">
          <div className="px-4">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">新着商品</h2>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">最新アイテム</p>
                <a href="/products?tag=新商品" className="text-sm text-blue-600 font-medium">
                  もっと見る →
                </a>
              </div>
            </div>
            <ProductSlider products={newProducts.slice(0, 6)} />
          </div>
        </section>

        <section className="py-8 bg-white">
          <div className="px-4">
            <div className="grid grid-cols-1 gap-4">
              <a href="/products?category=電化製品" className="relative overflow-hidden rounded-lg">
                <img
                  src="https://placehold.co/600x200/3b82f6/ffffff?text=電化製品"
                  alt="電化製品"
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <h3 className="text-white text-lg font-bold">電化製品特集</h3>
                </div>
              </a>
            </div>
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

// シンプル構成
export const SimpleLayout = {
  render: () => (
    <div className="min-h-screen flex flex-col">
      <main className="ec-home flex-grow">
        <section className="ec-home__hero">
          <HeroSlider />
        </section>

        <section className="ec-home__section py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              おすすめ商品
            </h2>
            <ProductSlider products={recommendedProducts} />
          </div>
        </section>

        <section className="ec-home__section py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              新着商品
            </h2>
            <ProductSlider products={newProducts} />
          </div>
        </section>
      </main>
    </div>
  ),
};
