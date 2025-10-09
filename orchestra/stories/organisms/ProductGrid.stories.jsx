import ProductGrid from '@/components/product/ProductGrid';

const meta = {
  title: 'Organisms/ProductGrid',
  component: ProductGrid,
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
  argTypes: {
    products: {
      description: '商品配列',
    },
    emptyMessage: {
      control: 'text',
      description: '商品がない場合のメッセージ',
    },
  },
};

export default meta;

// サンプル商品データ
const sampleProducts = Array.from({ length: 8 }, (_, i) => ({
  id: `prod-${i + 1}`,
  name: `商品${i + 1}`,
  code: `CODE-${String(i + 1).padStart(3, '0')}`,
  price: Math.floor(Math.random() * 50000) + 1000,
  image: `https://placehold.co/400x400/e2e8f0/1e293b?text=Product+${i + 1}`,
  images: [`https://placehold.co/400x400/e2e8f0/1e293b?text=Product+${i + 1}`],
  brand: 'Sample Brand',
  category: i % 3 === 0 ? '文具・事務用品' : i % 3 === 1 ? '電化製品' : '家具',
  stock: i % 5 !== 0,
  rating: 3 + Math.random() * 2,
  tags: i % 3 === 0 ? ['人気'] : i % 3 === 1 ? ['新商品', 'セール'] : [],
}));

// デフォルト（8商品）
export const Default = {
  args: {
    products: sampleProducts,
  },
};

// 商品なし
export const Empty = {
  args: {
    products: [],
  },
};

// カスタム空メッセージ
export const EmptyWithCustomMessage = {
  args: {
    products: [],
    emptyMessage: '該当する商品が見つかりませんでした。別の条件で検索してください。',
  },
};

// 少数の商品（3件）
export const FewProducts = {
  args: {
    products: sampleProducts.slice(0, 3),
  },
};

// 多数の商品（12件）
export const ManyProducts = {
  args: {
    products: Array.from({ length: 12 }, (_, i) => ({
      id: `prod-${i + 1}`,
      name: `商品${i + 1}`,
      code: `CODE-${String(i + 1).padStart(3, '0')}`,
      price: Math.floor(Math.random() * 50000) + 1000,
      image: `https://placehold.co/400x400/e2e8f0/1e293b?text=${i + 1}`,
      images: [`https://placehold.co/400x400/e2e8f0/1e293b?text=${i + 1}`],
      brand: 'Sample Brand',
      category: '電化製品',
      stock: true,
      rating: 4.0,
      tags: [],
    })),
  },
};

// セール商品グリッド
export const SaleProducts = {
  args: {
    products: Array.from({ length: 6 }, (_, i) => ({
      id: `sale-${i + 1}`,
      name: `セール商品${i + 1}`,
      code: `SALE-${String(i + 1).padStart(3, '0')}`,
      price: Math.floor(Math.random() * 20000) + 5000,
      image: `https://placehold.co/400x400/fef2f2/dc2626?text=SALE+${i + 1}`,
      images: [`https://placehold.co/400x400/fef2f2/dc2626?text=SALE+${i + 1}`],
      brand: 'Sample Brand',
      category: '電化製品',
      stock: true,
      rating: 4.5,
      tags: ['セール', '人気'],
    })),
  },
};

// 新商品グリッド
export const NewProducts = {
  args: {
    products: Array.from({ length: 8 }, (_, i) => ({
      id: `new-${i + 1}`,
      name: `新商品${i + 1}`,
      code: `NEW-${String(i + 1).padStart(3, '0')}`,
      price: Math.floor(Math.random() * 30000) + 10000,
      image: `https://placehold.co/400x400/eff6ff/3b82f6?text=NEW+${i + 1}`,
      images: [`https://placehold.co/400x400/eff6ff/3b82f6?text=NEW+${i + 1}`],
      brand: 'Sample Brand',
      category: '電化製品',
      stock: true,
      rating: 4.0,
      tags: ['新商品'],
    })),
  },
};

// レスポンシブグリッド
export const ResponsiveDemo = {
  args: {
    products: sampleProducts,
  },
};

// 商品一覧ページ例
export const ProductListPage = {
  render: () => (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">商品一覧</h1>
        <p className="text-gray-600">全{sampleProducts.length}件の商品</p>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
            すべて
          </button>
          <button className="px-4 py-2 border rounded-md hover:bg-gray-50">
            文具・事務用品
          </button>
          <button className="px-4 py-2 border rounded-md hover:bg-gray-50">
            電化製品
          </button>
          <button className="px-4 py-2 border rounded-md hover:bg-gray-50">
            家具
          </button>
        </div>

        <select className="px-4 py-2 border rounded-md">
          <option>おすすめ順</option>
          <option>価格が安い順</option>
          <option>価格が高い順</option>
          <option>新着順</option>
        </select>
      </div>

      <ProductGrid products={sampleProducts} />

      <div className="mt-8 flex justify-center">
        <nav className="flex gap-1">
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`px-4 py-2 rounded-md ${
                page === 1
                  ? 'bg-blue-600 text-white'
                  : 'border hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
        </nav>
      </div>
    </div>
  ),
};

// 検索結果ページ例
export const SearchResultPage = {
  render: () => (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">「ワイヤレス」の検索結果</h1>
        <p className="text-gray-600">12件の商品が見つかりました</p>
      </div>

      <ProductGrid
        products={Array.from({ length: 12 }, (_, i) => ({
          id: `search-${i + 1}`,
          name: `ワイヤレス商品${i + 1}`,
          code: `WL-${String(i + 1).padStart(3, '0')}`,
          price: Math.floor(Math.random() * 40000) + 5000,
          image: `https://placehold.co/400x400/e2e8f0/1e293b?text=WL+${i + 1}`,
          images: [`https://placehold.co/400x400/e2e8f0/1e293b?text=WL+${i + 1}`],
          brand: 'Wireless Brand',
          category: '電化製品',
          stock: true,
          rating: 4.0 + Math.random(),
          tags: i % 2 === 0 ? ['人気'] : [],
        }))}
      />
    </div>
  ),
};

// 空の検索結果
export const EmptySearchResult = {
  render: () => (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">「abcdefg」の検索結果</h1>
      </div>

      <ProductGrid
        products={[]}
        emptyMessage="検索条件に一致する商品が見つかりませんでした。"
      />

      <div className="mt-8 p-6 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">検索のヒント</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• キーワードを変えてみてください</li>
          <li>• より一般的な用語で検索してみてください</li>
          <li>• スペルを確認してください</li>
        </ul>
      </div>
    </div>
  ),
};

// カテゴリーページ例
export const CategoryPage = {
  render: () => (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">電化製品</h1>
        <p className="text-gray-600 leading-relaxed">
          最新の電化製品を取り揃えております。
          高品質な商品をお手頃な価格でご提供いたします。
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">絞り込み</h2>
        <div className="flex flex-wrap gap-2">
          <button className="px-4 py-2 border rounded-full hover:bg-gray-50">
            価格: すべて
          </button>
          <button className="px-4 py-2 border rounded-full hover:bg-gray-50">
            在庫あり
          </button>
          <button className="px-4 py-2 border rounded-full hover:bg-gray-50">
            評価: 4つ星以上
          </button>
        </div>
      </div>

      <ProductGrid
        products={sampleProducts.filter((p) => p.category === '電化製品')}
      />
    </div>
  ),
};

// グリッドレスポンシブデモ
export const GridBreakpoints = {
  render: () => (
    <div className="space-y-12">
      <div>
        <h3 className="text-lg font-semibold mb-4">
          モバイル（〜639px）: 1列
        </h3>
        <div className="max-w-sm border rounded-lg p-4">
          <ProductGrid products={sampleProducts.slice(0, 2)} />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">
          タブレット（640px〜1023px）: 2列
        </h3>
        <div className="max-w-2xl border rounded-lg p-4">
          <ProductGrid products={sampleProducts.slice(0, 4)} />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">
          デスクトップ（1024px〜1279px）: 3列
        </h3>
        <div className="max-w-5xl border rounded-lg p-4">
          <ProductGrid products={sampleProducts.slice(0, 6)} />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">
          大画面（1280px〜）: 4列
        </h3>
        <div className="border rounded-lg p-4">
          <ProductGrid products={sampleProducts} />
        </div>
      </div>
    </div>
  ),
};

// 在庫切れ混在
export const MixedStockStatus = {
  args: {
    products: sampleProducts.map((p, i) => ({
      ...p,
      stock: i % 3 !== 0,
    })),
  },
};
