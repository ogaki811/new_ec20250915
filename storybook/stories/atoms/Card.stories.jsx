import Card from '@/components/ui/Card';

const meta = {
  title: 'Atoms/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'elevated'],
      description: 'カードのスタイルバリエーション',
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'カード内パディング',
    },
    children: {
      control: 'text',
      description: 'カードの内容',
    },
  },
};

export default meta;

// デフォルト
export const Default = {
  args: {
    children: 'これはカードコンテンツです',
    variant: 'default',
    padding: 'md',
  },
};

// バリエーション - デフォルト
export const VariantDefault = {
  args: {
    variant: 'default',
    children: (
      <div>
        <h3 className="text-lg font-semibold mb-2">デフォルトカード</h3>
        <p className="text-gray-600">シンプルな背景色のみのカードです</p>
      </div>
    ),
  },
};

// バリエーション - アウトライン
export const VariantOutlined = {
  args: {
    variant: 'outlined',
    children: (
      <div>
        <h3 className="text-lg font-semibold mb-2">アウトラインカード</h3>
        <p className="text-gray-600">境界線付きのカードです</p>
      </div>
    ),
  },
};

// バリエーション - エレベーテッド
export const VariantElevated = {
  args: {
    variant: 'elevated',
    children: (
      <div>
        <h3 className="text-lg font-semibold mb-2">エレベーテッドカード</h3>
        <p className="text-gray-600">影付きで浮き上がったカードです</p>
      </div>
    ),
  },
};

// パディング - なし
export const PaddingNone = {
  args: {
    variant: 'outlined',
    padding: 'none',
    children: (
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">パディングなし</h3>
        <p className="text-gray-600">内部でパディングを制御できます</p>
      </div>
    ),
  },
};

// パディング - 小
export const PaddingSmall = {
  args: {
    variant: 'outlined',
    padding: 'sm',
    children: (
      <div>
        <h3 className="text-lg font-semibold mb-2">小パディング</h3>
        <p className="text-gray-600">p-4（16px）のパディングです</p>
      </div>
    ),
  },
};

// パディング - 中
export const PaddingMedium = {
  args: {
    variant: 'outlined',
    padding: 'md',
    children: (
      <div>
        <h3 className="text-lg font-semibold mb-2">中パディング</h3>
        <p className="text-gray-600">p-6（24px）のパディングです</p>
      </div>
    ),
  },
};

// パディング - 大
export const PaddingLarge = {
  args: {
    variant: 'outlined',
    padding: 'lg',
    children: (
      <div>
        <h3 className="text-lg font-semibold mb-2">大パディング</h3>
        <p className="text-gray-600">p-8（32px）のパディングです</p>
      </div>
    ),
  },
};

// 全バリエーション一覧
export const AllVariants = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Card variant="default" className="w-64">
        <h3 className="text-lg font-semibold mb-2">Default</h3>
        <p className="text-gray-600">デフォルトスタイル</p>
      </Card>
      <Card variant="outlined" className="w-64">
        <h3 className="text-lg font-semibold mb-2">Outlined</h3>
        <p className="text-gray-600">境界線付きスタイル</p>
      </Card>
      <Card variant="elevated" className="w-64">
        <h3 className="text-lg font-semibold mb-2">Elevated</h3>
        <p className="text-gray-600">影付きスタイル</p>
      </Card>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// 全パディング一覧
export const AllPaddings = {
  render: () => (
    <div className="space-y-4">
      <Card variant="outlined" padding="none" className="w-80">
        <div className="p-2 bg-blue-50">
          <p className="text-sm">padding: none（パディングなし）</p>
        </div>
      </Card>
      <Card variant="outlined" padding="sm" className="w-80">
        <p className="text-sm">padding: sm（p-4 / 16px）</p>
      </Card>
      <Card variant="outlined" padding="md" className="w-80">
        <p className="text-sm">padding: md（p-6 / 24px）</p>
      </Card>
      <Card variant="outlined" padding="lg" className="w-80">
        <p className="text-sm">padding: lg（p-8 / 32px）</p>
      </Card>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// 商品カード例
export const ProductCard = {
  render: () => (
    <Card variant="outlined" padding="none" className="w-72 overflow-hidden">
      <img
        src="https://placehold.co/288x200/e2e8f0/64748b?text=Product+Image"
        alt="商品画像"
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">商品名</h3>
        <p className="text-gray-600 text-sm mb-3">
          商品の説明文がここに入ります。魅力的な商品の特徴を記載します。
        </p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-blue-600">¥12,800</span>
          <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors">
            カートに追加
          </button>
        </div>
      </div>
    </Card>
  ),
};

// ユーザープロフィールカード例
export const UserProfileCard = {
  render: () => (
    <Card variant="elevated" className="w-80">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
          YO
        </div>
        <div>
          <h3 className="text-lg font-semibold">山田 太郎</h3>
          <p className="text-gray-600 text-sm">yamada@example.com</p>
        </div>
      </div>
      <div className="pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-blue-600">128</p>
            <p className="text-xs text-gray-600">投稿</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600">1.2k</p>
            <p className="text-xs text-gray-600">フォロワー</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600">324</p>
            <p className="text-xs text-gray-600">フォロー中</p>
          </div>
        </div>
      </div>
    </Card>
  ),
};

// 情報パネルカード例
export const InfoPanelCard = {
  render: () => (
    <Card variant="outlined" className="w-96">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="flex-1">
          <h4 className="font-semibold mb-1">重要なお知らせ</h4>
          <p className="text-sm text-gray-600">
            2025年10月1日より、サービスの利用規約が改定されます。詳細は利用規約ページをご確認ください。
          </p>
        </div>
      </div>
    </Card>
  ),
};

// 統計カード例
export const StatsCard = {
  render: () => (
    <div className="flex gap-4">
      <Card variant="elevated" className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">総売上</p>
            <p className="text-2xl font-bold">¥1,234,567</p>
            <p className="text-sm text-green-600 mt-1">+12.5% 前月比</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </Card>

      <Card variant="elevated" className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">新規顧客</p>
            <p className="text-2xl font-bold">342</p>
            <p className="text-sm text-blue-600 mt-1">+8.2% 前月比</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
        </div>
      </Card>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// クリック可能なカード例
export const ClickableCard = {
  render: () => (
    <Card
      variant="outlined"
      className="w-80 cursor-pointer hover:border-blue-500 hover:shadow-md transition-all"
      onClick={() => alert('カードがクリックされました！')}
    >
      <h3 className="text-lg font-semibold mb-2">クリック可能なカード</h3>
      <p className="text-gray-600">
        このカードはクリック可能です。ホバー時にスタイルが変化します。
      </p>
      <div className="mt-4 text-blue-600 text-sm font-medium">
        詳細を見る →
      </div>
    </Card>
  ),
};

// グリッドレイアウト例
export const GridLayout = {
  render: () => (
    <div className="w-full max-w-6xl">
      <h2 className="text-2xl font-bold mb-6">注目の商品</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} variant="outlined" padding="none" className="overflow-hidden">
            <img
              src={`https://placehold.co/400x300/e2e8f0/64748b?text=Product+${i}`}
              alt={`商品 ${i}`}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold mb-2">商品名 {i}</h3>
              <p className="text-sm text-gray-600 mb-3">
                商品の説明がここに入ります
              </p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-blue-600">
                  ¥{(i * 1000).toLocaleString()}
                </span>
                <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                  詳細
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// リストレイアウト例
export const ListLayout = {
  render: () => (
    <div className="w-full max-w-2xl space-y-4">
      {[
        { title: 'タスク1', status: '完了', color: 'green' },
        { title: 'タスク2', status: '進行中', color: 'blue' },
        { title: 'タスク3', status: '保留', color: 'yellow' },
        { title: 'タスク4', status: '未着手', color: 'gray' },
      ].map((task, i) => (
        <Card key={i} variant="outlined" padding="sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={task.status === '完了'}
                onChange={() => {}}
                className="w-5 h-5"
              />
              <div>
                <h4 className="font-semibold">{task.title}</h4>
                <p className="text-sm text-gray-600">サンプルタスクの説明</p>
              </div>
            </div>
            <span
              className={`px-3 py-1 text-xs rounded-full bg-${task.color}-100 text-${task.color}-700`}
            >
              {task.status}
            </span>
          </div>
        </Card>
      ))}
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
