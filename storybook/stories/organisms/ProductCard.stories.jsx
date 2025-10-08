import { useState } from 'react';
import ProductCard from '@/components/product/ProductCard';

const meta = {
  title: 'Organisms/ProductCard',
  component: ProductCard,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
  argTypes: {
    product: {
      description: '商品データ',
    },
    size: {
      control: 'select',
      options: ['compact', 'default', 'large'],
      description: 'カードサイズ',
    },
    hideTags: {
      control: 'boolean',
      description: 'タグを非表示',
    },
  },
};

export default meta;

// サンプル商品データ
const sampleProduct = {
  id: 'prod-001',
  name: 'ワイヤレスイヤホン プレミアムモデル',
  code: 'WH-1000XM5',
  price: 28000,
  image: 'https://placehold.co/400x400/e2e8f0/1e293b?text=Product',
  images: [
    'https://placehold.co/400x400/e2e8f0/1e293b?text=Product',
    'https://placehold.co/400x400/e2e8f0/1e293b?text=Product+2',
  ],
  brand: 'TechBrand',
  category: '電化製品',
  stock: true,
  rating: 4.5,
  tags: ['人気', '新商品'],
};

// デフォルト
export const Default = {
  args: {
    product: sampleProduct,
    size: 'default',
    hideTags: false,
  },
};

// コンパクトサイズ
export const CompactSize = {
  args: {
    product: sampleProduct,
    size: 'compact',
    hideTags: false,
  },
};

// ラージサイズ
export const LargeSize = {
  args: {
    product: {
      ...sampleProduct,
      name: 'プレミアムワイヤレスヘッドホン 最新モデル',
    },
    size: 'large',
    hideTags: false,
  },
};

// セールタグ
export const WithSaleTag = {
  args: {
    product: {
      ...sampleProduct,
      tags: ['セール', '人気'],
      price: 19800,
    },
    size: 'default',
  },
};

// 高評価商品
export const HighRated = {
  args: {
    product: {
      ...sampleProduct,
      rating: 5.0,
      tags: ['高評価', '人気'],
    },
    size: 'default',
  },
};

// 低評価商品
export const LowRated = {
  args: {
    product: {
      ...sampleProduct,
      rating: 2.5,
      tags: [],
    },
    size: 'default',
  },
};

// タグなし
export const NoTags = {
  args: {
    product: {
      ...sampleProduct,
      tags: [],
    },
    size: 'default',
  },
};

// タグ非表示
export const HiddenTags = {
  args: {
    product: sampleProduct,
    size: 'default',
    hideTags: true,
  },
};

// 在庫切れ
export const OutOfStock = {
  args: {
    product: {
      ...sampleProduct,
      stock: false,
    },
    size: 'default',
  },
};

// 複数タグ
export const MultipleTags = {
  args: {
    product: {
      ...sampleProduct,
      tags: ['新商品', '人気', 'セール', '高評価'],
    },
    size: 'default',
  },
};

// 長い商品名
export const LongProductName = {
  args: {
    product: {
      ...sampleProduct,
      name: 'プレミアムワイヤレスノイズキャンセリングヘッドホン 最新モデル 2024年版 ハイレゾ対応',
    },
    size: 'default',
  },
};

// 低価格商品
export const LowPrice = {
  args: {
    product: {
      ...sampleProduct,
      name: 'USB-Cケーブル',
      price: 980,
      tags: [],
    },
    size: 'default',
  },
};

// 高価格商品
export const HighPrice = {
  args: {
    product: {
      ...sampleProduct,
      name: 'プロフェッショナルカメラ',
      price: 298000,
      tags: ['新商品', '高評価'],
    },
    size: 'default',
  },
};

// 全サイズ比較
export const AllSizes = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <h3 className="text-sm font-semibold mb-2 text-center">Compact</h3>
        <ProductCard product={sampleProduct} size="compact" />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-center">Default</h3>
        <ProductCard product={sampleProduct} size="default" />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-center">Large</h3>
        <ProductCard product={sampleProduct} size="large" />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// 商品グリッド例
export const ProductGrid = {
  render: () => {
    const products = [
      {
        ...sampleProduct,
        id: 'prod-001',
        name: 'ワイヤレスイヤホン',
        price: 12800,
        tags: ['人気', '新商品'],
        rating: 4.5,
      },
      {
        ...sampleProduct,
        id: 'prod-002',
        name: 'スマートウォッチ',
        price: 28000,
        tags: ['セール'],
        rating: 4.0,
      },
      {
        ...sampleProduct,
        id: 'prod-003',
        name: 'モバイルバッテリー',
        price: 3200,
        tags: [],
        rating: 3.5,
      },
      {
        ...sampleProduct,
        id: 'prod-004',
        name: 'Bluetoothスピーカー',
        price: 8900,
        tags: ['高評価', '人気'],
        rating: 5.0,
      },
      {
        ...sampleProduct,
        id: 'prod-005',
        name: 'ノートパソコンスタンド',
        price: 4500,
        tags: [],
        rating: 4.0,
      },
      {
        ...sampleProduct,
        id: 'prod-006',
        name: 'USBハブ',
        price: 2980,
        tags: ['新商品'],
        rating: 4.5,
      },
    ];

    return (
      <div className="w-full max-w-6xl">
        <h2 className="text-2xl font-bold mb-6">おすすめ商品</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} size="default" />
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};

// コンパクトグリッド（4列）
export const CompactGrid = {
  render: () => {
    const products = Array.from({ length: 8 }, (_, i) => ({
      ...sampleProduct,
      id: `prod-${i + 1}`,
      name: `商品 ${i + 1}`,
      price: Math.floor(Math.random() * 50000) + 1000,
      tags: i % 3 === 0 ? ['セール'] : i % 2 === 0 ? ['人気'] : [],
      rating: 3 + Math.random() * 2,
    }));

    return (
      <div className="w-full max-w-7xl">
        <h2 className="text-2xl font-bold mb-6">商品一覧</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} size="compact" />
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};

// 在庫状態比較
export const StockComparison = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-sm font-semibold mb-2 text-center">在庫あり</h3>
        <ProductCard
          product={{
            ...sampleProduct,
            stock: true,
          }}
          size="default"
        />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-center">在庫切れ</h3>
        <ProductCard
          product={{
            ...sampleProduct,
            stock: false,
          }}
          size="default"
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// 評価比較
export const RatingComparison = {
  render: () => (
    <div className="space-y-6">
      {[5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1].map((rating) => (
        <div key={rating}>
          <h3 className="text-sm font-semibold mb-2">評価: {rating}</h3>
          <ProductCard
            product={{
              ...sampleProduct,
              rating,
            }}
            size="compact"
          />
        </div>
      ))}
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// 価格帯比較
export const PriceRanges = {
  render: () => {
    const priceRanges = [
      { label: '1,000円未満', price: 890 },
      { label: '1,000-5,000円', price: 2980 },
      { label: '5,000-10,000円', price: 7800 },
      { label: '10,000-30,000円', price: 19800 },
      { label: '30,000-50,000円', price: 42000 },
      { label: '50,000円以上', price: 89800 },
    ];

    return (
      <div className="w-full max-w-6xl">
        <h2 className="text-2xl font-bold mb-6">価格帯別表示</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {priceRanges.map((range) => (
            <div key={range.label}>
              <h3 className="text-sm font-semibold mb-2">{range.label}</h3>
              <ProductCard
                product={{
                  ...sampleProduct,
                  price: range.price,
                }}
                size="default"
              />
            </div>
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};

// セール商品グリッド
export const SaleGrid = {
  render: () => {
    const saleProducts = [
      {
        ...sampleProduct,
        id: 'sale-001',
        name: 'ワイヤレスイヤホン',
        price: 9800,
        tags: ['セール', '人気'],
        rating: 4.5,
      },
      {
        ...sampleProduct,
        id: 'sale-002',
        name: 'スマートウォッチ',
        price: 19800,
        tags: ['セール'],
        rating: 4.0,
      },
      {
        ...sampleProduct,
        id: 'sale-003',
        name: 'Bluetoothスピーカー',
        price: 5980,
        tags: ['セール', '高評価'],
        rating: 4.5,
      },
    ];

    return (
      <div className="w-full max-w-6xl">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <h2 className="text-2xl font-bold text-red-700 mb-2">🔥 セール商品</h2>
          <p className="text-red-600">期間限定で特別価格にてご提供中！</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {saleProducts.map((product) => (
            <ProductCard key={product.id} product={product} size="default" />
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};

// 新商品グリッド
export const NewArrivals = {
  render: () => {
    const newProducts = Array.from({ length: 6 }, (_, i) => ({
      ...sampleProduct,
      id: `new-${i + 1}`,
      name: `新商品 ${i + 1}`,
      price: Math.floor(Math.random() * 30000) + 5000,
      tags: ['新商品', i % 2 === 0 ? '人気' : ''],
      rating: 4 + Math.random(),
    }));

    return (
      <div className="w-full max-w-6xl">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">✨ 新着商品</h2>
          <p className="text-gray-600">最新のアイテムをチェック！</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} size="default" />
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};

// お気に入り機能デモ
export const FavoriteDemo = {
  render: () => {
    const [favorites, setFavorites] = useState(['prod-002']);

    // Mock the store for this story
    const mockUseFavoritesStore = () => ({
      toggleFavorite: (product) => {
        setFavorites((prev) =>
          prev.includes(product.id)
            ? prev.filter((id) => id !== product.id)
            : [...prev, product.id]
        );
        console.log('Toggled favorite:', product);
      },
      isFavorite: (id) => favorites.includes(id),
    });

    const products = [
      { ...sampleProduct, id: 'prod-001', name: '商品A', price: 12800 },
      { ...sampleProduct, id: 'prod-002', name: '商品B', price: 8900 },
      { ...sampleProduct, id: 'prod-003', name: '商品C', price: 15600 },
    ];

    return (
      <div className="w-full max-w-4xl">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">お気に入り機能デモ</h2>
          <p className="text-sm text-gray-600">
            ハートアイコンをクリックしてお気に入りに追加/削除できます
          </p>
          <div className="mt-2 p-3 bg-blue-50 rounded">
            <p className="text-sm">
              現在のお気に入り: <strong>{favorites.join(', ') || 'なし'}</strong>
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} size="default" />
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};

// レスポンシブデモ
export const ResponsiveDemo = {
  render: () => {
    const products = Array.from({ length: 6 }, (_, i) => ({
      ...sampleProduct,
      id: `resp-${i + 1}`,
      name: `商品 ${i + 1}`,
      price: Math.floor(Math.random() * 30000) + 1000,
      tags: i % 3 === 0 ? ['セール'] : [],
      rating: 3 + Math.random() * 2,
    }));

    return (
      <div className="w-full">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">レスポンシブグリッド</h2>
          <p className="text-sm text-gray-600">
            モバイル: 1列 / タブレット: 2列 / デスクトップ: 3列
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} size="default" />
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};

// カテゴリー別グリッド
export const CategoryGrid = {
  render: () => {
    const categories = {
      電化製品: [
        { ...sampleProduct, id: 'elec-001', name: 'ワイヤレスイヤホン', price: 12800 },
        { ...sampleProduct, id: 'elec-002', name: 'スマートウォッチ', price: 28000 },
        { ...sampleProduct, id: 'elec-003', name: 'モバイルバッテリー', price: 3200 },
      ],
      文具: [
        { ...sampleProduct, id: 'stat-001', name: 'ボールペンセット', price: 890 },
        { ...sampleProduct, id: 'stat-002', name: 'ノート', price: 450 },
        { ...sampleProduct, id: 'stat-003', name: 'マーカーセット', price: 1200 },
      ],
    };

    return (
      <div className="w-full max-w-6xl space-y-8">
        {Object.entries(categories).map(([category, products]) => (
          <div key={category}>
            <h2 className="text-xl font-bold mb-4">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={{ ...product, category }}
                  size="default"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};
