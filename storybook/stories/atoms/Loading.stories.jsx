import Loading from '@/components/ui/Loading';

const meta = {
  title: 'Atoms/Loading',
  component: Loading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'サイズ',
    },
    variant: {
      control: 'select',
      options: ['spinner', 'dots', 'pulse'],
      description: 'バリエーション',
    },
    text: {
      control: 'text',
      description: 'ローディングテキスト',
    },
    fullScreen: {
      control: 'boolean',
      description: 'フルスクリーン表示',
    },
  },
};

export default meta;

// デフォルト（Spinner）
export const Default = {
  args: {
    variant: 'spinner',
    size: 'md',
  },
};

// Spinner
export const Spinner = {
  args: {
    variant: 'spinner',
    size: 'md',
  },
};

// Dots
export const Dots = {
  args: {
    variant: 'dots',
    size: 'md',
  },
};

// Pulse
export const Pulse = {
  args: {
    variant: 'pulse',
    size: 'md',
  },
};

// テキスト付き
export const WithText = {
  args: {
    variant: 'spinner',
    size: 'md',
    text: '読み込み中...',
  },
};

// サイズバリエーション - Spinner
export const SpinnerSizes = {
  render: () => (
    <div className="flex items-end gap-6">
      <div className="flex flex-col items-center gap-2">
        <Loading variant="spinner" size="sm" />
        <span className="text-xs text-gray-600">sm</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loading variant="spinner" size="md" />
        <span className="text-xs text-gray-600">md</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loading variant="spinner" size="lg" />
        <span className="text-xs text-gray-600">lg</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loading variant="spinner" size="xl" />
        <span className="text-xs text-gray-600">xl</span>
      </div>
    </div>
  ),
};

// サイズバリエーション - Dots
export const DotsSizes = {
  render: () => (
    <div className="flex items-end gap-6">
      <div className="flex flex-col items-center gap-2">
        <Loading variant="dots" size="sm" />
        <span className="text-xs text-gray-600">sm</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loading variant="dots" size="md" />
        <span className="text-xs text-gray-600">md</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loading variant="dots" size="lg" />
        <span className="text-xs text-gray-600">lg</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loading variant="dots" size="xl" />
        <span className="text-xs text-gray-600">xl</span>
      </div>
    </div>
  ),
};

// サイズバリエーション - Pulse
export const PulseSizes = {
  render: () => (
    <div className="flex items-end gap-6">
      <div className="flex flex-col items-center gap-2">
        <Loading variant="pulse" size="sm" />
        <span className="text-xs text-gray-600">sm</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loading variant="pulse" size="md" />
        <span className="text-xs text-gray-600">md</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loading variant="pulse" size="lg" />
        <span className="text-xs text-gray-600">lg</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loading variant="pulse" size="xl" />
        <span className="text-xs text-gray-600">xl</span>
      </div>
    </div>
  ),
};

// 全バリアント比較
export const AllVariants = {
  render: () => (
    <div className="grid grid-cols-3 gap-8">
      <div className="flex flex-col items-center gap-3">
        <Loading variant="spinner" size="lg" />
        <span className="text-sm font-medium">Spinner</span>
      </div>
      <div className="flex flex-col items-center gap-3">
        <Loading variant="dots" size="lg" />
        <span className="text-sm font-medium">Dots</span>
      </div>
      <div className="flex flex-col items-center gap-3">
        <Loading variant="pulse" size="lg" />
        <span className="text-sm font-medium">Pulse</span>
      </div>
    </div>
  ),
};

// ボタン内
export const InButton = {
  render: () => (
    <div className="flex gap-4">
      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md">
        <Loading variant="spinner" size="sm" />
        <span>処理中...</span>
      </button>

      <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md">
        <Loading variant="dots" size="sm" />
        <span>読み込み中...</span>
      </button>
    </div>
  ),
};

// カード内
export const InCard = {
  render: () => (
    <div className="w-80 border rounded-lg p-6">
      <div className="flex flex-col items-center justify-center min-h-[200px]">
        <Loading variant="spinner" size="lg" text="データを読み込んでいます..." />
      </div>
    </div>
  ),
};

// テーブルローディング
export const TableLoading = {
  render: () => (
    <div className="border rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left p-3 font-semibold">商品名</th>
            <th className="text-left p-3 font-semibold">価格</th>
            <th className="text-left p-3 font-semibold">在庫</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={3} className="p-12">
              <div className="flex justify-center">
                <Loading variant="spinner" size="lg" text="商品を読み込んでいます..." />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
};

// ページローディング
export const PageLoading = {
  render: () => (
    <div className="w-full h-96 flex items-center justify-center border rounded-lg">
      <Loading variant="spinner" size="xl" text="ページを読み込んでいます..." />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// インラインローディング
export const InlineLoading = {
  render: () => (
    <div className="space-y-4">
      <p className="flex items-center gap-2">
        <Loading variant="spinner" size="sm" />
        <span>データを取得しています...</span>
      </p>

      <p className="flex items-center gap-2">
        <Loading variant="dots" size="sm" />
        <span>処理を実行しています...</span>
      </p>

      <p className="flex items-center gap-2">
        <Loading variant="pulse" size="sm" />
        <span>アップロード中...</span>
      </p>
    </div>
  ),
};

// オーバーレイローディング
export const OverlayLoading = {
  render: () => (
    <div className="relative w-96 h-64 border rounded-lg">
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2">コンテンツ</h3>
        <p className="text-gray-600">
          このコンテンツは読み込み中はオーバーレイで覆われます。
        </p>
      </div>

      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-lg">
        <Loading variant="spinner" size="lg" text="更新中..." />
      </div>
    </div>
  ),
};

// 商品カードローディング
export const ProductCardLoading = {
  render: () => (
    <div className="w-72 border rounded-lg overflow-hidden">
      <div className="h-48 bg-gray-100 flex items-center justify-center">
        <Loading variant="spinner" size="lg" />
      </div>
      <div className="p-4">
        <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
      </div>
    </div>
  ),
};

// リストローディング
export const ListLoading = {
  render: () => (
    <div className="w-96 space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-3 p-4 border rounded-lg">
          <div className="flex-shrink-0">
            <Loading variant="pulse" size="md" />
          </div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  ),
};

// スケルトンスクリーン
export const SkeletonScreen = {
  render: () => (
    <div className="w-96 space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">
          <Loading variant="pulse" size="lg" />
        </div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
        </div>
      </div>

      <div className="h-48 bg-gray-200 rounded animate-pulse"></div>

      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
      </div>
    </div>
  ),
};

// 検索中
export const Searching = {
  render: () => (
    <div className="w-96 border rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <input
          type="text"
          className="flex-1 px-4 py-2 border rounded-md"
          placeholder="検索キーワード"
          value="React"
          readOnly
        />
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
          検索
        </button>
      </div>

      <div className="flex flex-col items-center justify-center py-8">
        <Loading variant="dots" size="lg" text="検索中..." />
      </div>
    </div>
  ),
};

// アップロード中
export const Uploading = {
  render: () => (
    <div className="w-96 border rounded-lg p-6">
      <h3 className="font-semibold mb-4">ファイルアップロード</h3>

      <div className="border-2 border-dashed rounded-lg p-8 text-center">
        <Loading variant="spinner" size="lg" text="アップロード中..." />

        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">45% 完了</p>
        </div>
      </div>
    </div>
  ),
};

// 送信中
export const Submitting = {
  render: () => (
    <div className="w-96 border rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">お問い合わせフォーム</h3>

      <div className="space-y-4 mb-4">
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-md"
          placeholder="お名前"
          disabled
        />
        <textarea
          className="w-full px-4 py-2 border rounded-md"
          rows={4}
          placeholder="お問い合わせ内容"
          disabled
        ></textarea>
      </div>

      <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md flex items-center justify-center gap-2" disabled>
        <Loading variant="spinner" size="sm" />
        <span>送信中...</span>
      </button>
    </div>
  ),
};
