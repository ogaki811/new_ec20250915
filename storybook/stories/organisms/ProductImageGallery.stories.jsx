import { useState } from 'react';
import ProductImageGallery from '@/components/product/ProductImageGallery';

const meta = {
  title: 'Organisms/ProductImageGallery',
  component: ProductImageGallery,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    images: {
      description: '商品画像配列',
    },
    productName: {
      control: 'text',
      description: '商品名',
    },
  },
};

export default meta;

// サンプル画像データ
const sampleImages = [
  'https://placehold.co/800x800/e2e8f0/1e293b?text=Image+1',
  'https://placehold.co/800x800/e2e8f0/1e293b?text=Image+2',
  'https://placehold.co/800x800/e2e8f0/1e293b?text=Image+3',
  'https://placehold.co/800x800/e2e8f0/1e293b?text=Image+4',
];

// 単一画像
export const SingleImage = {
  args: {
    images: ['https://placehold.co/800x800/e2e8f0/1e293b?text=Product'],
    productName: 'ワイヤレスイヤホン',
  },
};

// 2画像
export const TwoImages = {
  args: {
    images: sampleImages.slice(0, 2),
    productName: 'ワイヤレスイヤホン',
  },
};

// 4画像（デフォルト）
export const FourImages = {
  args: {
    images: sampleImages,
    productName: 'ワイヤレスイヤホン',
  },
};

// 多数の画像
export const ManyImages = {
  args: {
    images: Array.from({ length: 8 }, (_, i) =>
      `https://placehold.co/800x800/e2e8f0/1e293b?text=Image+${i + 1}`
    ),
    productName: 'ワイヤレスイヤホン',
  },
};

// インタラクティブ例
export const Interactive = {
  render: () => {
    const [images] = useState(sampleImages);

    return (
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6">商品画像ギャラリー</h2>
        <ProductImageGallery images={images} productName="ワイヤレスイヤホン" />
        <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm">
          <h3 className="font-semibold mb-2">💡 操作方法</h3>
          <ul className="space-y-1">
            <li>• サムネイルをクリックすると、メイン画像が切り替わります</li>
            <li>• 選択中のサムネイルは青い枠で強調表示されます</li>
          </ul>
        </div>
      </div>
    );
  },
};

// 商品詳細ページでの使用例
export const ProductDetailExample = {
  render: () => (
    <div className="w-full max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 画像ギャラリー */}
        <div>
          <ProductImageGallery
            images={sampleImages}
            productName="ワイヤレスイヤホン プレミアムモデル"
          />
        </div>

        {/* 商品情報 */}
        <div>
          <h1 className="text-3xl font-bold mb-2">
            ワイヤレスイヤホン プレミアムモデル
          </h1>
          <p className="text-gray-600 mb-4">品番: WH-1000XM5</p>

          <div className="flex items-center mb-6">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-gray-600">(4.5) 1,234件のレビュー</span>
          </div>

          <p className="text-3xl font-bold text-blue-600 mb-6">¥28,000</p>

          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">
              業界最高クラスのノイズキャンセリング機能を搭載したワイヤレスイヤホン。
              クリアな音質と快適な装着感で、長時間の使用でも疲れにくい設計です。
            </p>
          </div>

          <div className="space-y-3">
            <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              カートに追加
            </button>
            <button className="w-full px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50">
              お気に入りに追加
            </button>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// サムネイル選択状態
export const ThumbnailStates = {
  render: () => (
    <div className="w-full max-w-4xl space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">最初の画像選択（デフォルト）</h3>
        <div className="border rounded-lg p-4 inline-block">
          <ProductImageGallery
            images={sampleImages}
            productName="ワイヤレスイヤホン"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// 画像枚数による表示の違い
export const ImageCountVariations = {
  render: () => (
    <div className="space-y-12">
      <div>
        <h3 className="text-lg font-semibold mb-4">1枚（サムネイルなし）</h3>
        <div className="max-w-md border rounded-lg p-4">
          <ProductImageGallery
            images={['https://placehold.co/800x800/e2e8f0/1e293b?text=Single']}
            productName="商品A"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">2枚（サムネイルあり）</h3>
        <div className="max-w-md border rounded-lg p-4">
          <ProductImageGallery
            images={sampleImages.slice(0, 2)}
            productName="商品B"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">4枚（標準）</h3>
        <div className="max-w-md border rounded-lg p-4">
          <ProductImageGallery images={sampleImages} productName="商品C" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">6枚（多め）</h3>
        <div className="max-w-md border rounded-lg p-4">
          <ProductImageGallery
            images={Array.from({ length: 6 }, (_, i) =>
              `https://placehold.co/800x800/e2e8f0/1e293b?text=Image+${i + 1}`
            )}
            productName="商品D"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// レスポンシブデモ
export const ResponsiveDemo = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold mb-2">モバイル表示</h3>
        <div className="max-w-sm border rounded-lg p-4">
          <ProductImageGallery images={sampleImages} productName="商品" />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2">タブレット表示</h3>
        <div className="max-w-2xl border rounded-lg p-4">
          <ProductImageGallery images={sampleImages} productName="商品" />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2">デスクトップ表示</h3>
        <div className="max-w-4xl border rounded-lg p-4">
          <ProductImageGallery images={sampleImages} productName="商品" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// サムネイルラップ表示
export const ThumbnailWrapping = {
  render: () => (
    <div className="w-full max-w-md">
      <h3 className="text-lg font-semibold mb-4">
        サムネイルの折り返し表示（多数画像）
      </h3>
      <div className="border rounded-lg p-4">
        <ProductImageGallery
          images={Array.from({ length: 12 }, (_, i) =>
            `https://placehold.co/800x800/e2e8f0/1e293b?text=${i + 1}`
          )}
          productName="12枚画像商品"
        />
      </div>
      <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
        <p>
          サムネイルが多い場合は自動的に折り返して表示されます。
          各サムネイルは固定サイズ（w-24 h-24）で表示されます。
        </p>
      </div>
    </div>
  ),
};

// サムネイル選択ハイライト
export const ThumbnailHighlight = {
  render: () => (
    <div className="w-full max-w-2xl">
      <h3 className="text-lg font-semibold mb-4">サムネイル選択状態</h3>
      <ProductImageGallery images={sampleImages} productName="商品" />

      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-24 h-24 border-2 border-gray-200 rounded-lg flex items-center justify-center text-sm text-gray-500">
            通常
          </div>
          <p className="text-sm text-gray-600">未選択のサムネイル（グレーの枠線）</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-24 h-24 border-2 border-blue-600 rounded-lg flex items-center justify-center text-sm text-blue-600 font-semibold">
            選択中
          </div>
          <p className="text-sm text-gray-600">選択中のサムネイル（青い枠線）</p>
        </div>
      </div>
    </div>
  ),
};

// 異なるアスペクト比の画像
export const DifferentAspectRatios = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">正方形（1:1）</h3>
        <div className="max-w-md border rounded-lg p-4">
          <ProductImageGallery
            images={[
              'https://placehold.co/800x800/e2e8f0/1e293b?text=Square',
              'https://placehold.co/800x800/e2e8f0/1e293b?text=Square+2',
            ]}
            productName="正方形画像"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">横長（16:9）</h3>
        <div className="max-w-md border rounded-lg p-4">
          <ProductImageGallery
            images={[
              'https://placehold.co/1600x900/e2e8f0/1e293b?text=Wide',
              'https://placehold.co/1600x900/e2e8f0/1e293b?text=Wide+2',
            ]}
            productName="横長画像"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">縦長（9:16）</h3>
        <div className="max-w-md border rounded-lg p-4">
          <ProductImageGallery
            images={[
              'https://placehold.co/900x1600/e2e8f0/1e293b?text=Tall',
              'https://placehold.co/900x1600/e2e8f0/1e293b?text=Tall+2',
            ]}
            productName="縦長画像"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// 実装パターン
export const UsagePatterns = {
  render: () => (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">実装パターン</h2>

      <div className="space-y-6">
        <div className="border rounded-lg p-6">
          <h3 className="font-semibold text-lg mb-3">🖼️ 画像表示</h3>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>メイン画像: グレー背景、角丸、オブジェクトカバー</li>
            <li>サムネイル: 96px × 96px 固定サイズ</li>
            <li>画像が1枚のみの場合はサムネイル非表示</li>
          </ul>
        </div>

        <div className="border rounded-lg p-6">
          <h3 className="font-semibold text-lg mb-3">🎨 スタイリング</h3>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>未選択サムネイル: border-gray-200（グレー2pxボーダー）</li>
            <li>選択中サムネイル: border-blue-600（青2pxボーダー）</li>
            <li>サムネイルは横並び、折り返しあり（flex-wrap）</li>
          </ul>
        </div>

        <div className="border rounded-lg p-6">
          <h3 className="font-semibold text-lg mb-3">⚙️ 機能</h3>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>サムネイルクリックでメイン画像切り替え</li>
            <li>画像配列が変更されると選択をリセット（useEffect）</li>
            <li>アクセシビリティ: alt属性設定済み</li>
          </ul>
        </div>

        <div className="border rounded-lg p-6">
          <h3 className="font-semibold text-lg mb-3">📱 レスポンシブ</h3>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>サムネイルサイズは全デバイス共通（96px固定）</li>
            <li>メイン画像は親要素の幅に応じて自動調整</li>
            <li>サムネイルは自動折り返し（flex-wrap）</li>
          </ul>
        </div>
      </div>
    </div>
  ),
};
