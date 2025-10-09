import Badge from '@/components/ui/Badge';

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'danger'],
      description: 'バッジのスタイルバリエーション',
    },
    children: {
      control: 'text',
      description: 'バッジのテキスト',
    },
  },
};

export default meta;

// デフォルト
export const Default = {
  args: {
    children: 'Default',
    variant: 'default',
  },
};

// プライマリ
export const Primary = {
  args: {
    children: 'Primary',
    variant: 'primary',
  },
};

// 成功
export const Success = {
  args: {
    children: 'Success',
    variant: 'success',
  },
};

// 警告
export const Warning = {
  args: {
    children: 'Warning',
    variant: 'warning',
  },
};

// 危険
export const Danger = {
  args: {
    children: 'Danger',
    variant: 'danger',
  },
};

// 全バリエーション
export const AllVariants = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Badge variant="default">Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
    </div>
  ),
};

// ステータスバッジ
export const StatusBadges = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Badge variant="success">承認済み</Badge>
      <Badge variant="warning">保留中</Badge>
      <Badge variant="danger">却下</Badge>
      <Badge variant="primary">処理中</Badge>
      <Badge variant="default">下書き</Badge>
    </div>
  ),
};

// 注文ステータス
export const OrderStatusBadges = {
  render: () => (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span className="text-sm w-32">注文確認：</span>
        <Badge variant="primary">確認中</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm w-32">発送準備：</span>
        <Badge variant="warning">準備中</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm w-32">配送中：</span>
        <Badge variant="primary">配送中</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm w-32">配送完了：</span>
        <Badge variant="success">配達済み</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm w-32">キャンセル：</span>
        <Badge variant="danger">キャンセル</Badge>
      </div>
    </div>
  ),
};

// カウントバッジ
export const CountBadges = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <div className="relative inline-block">
        <button className="px-4 py-2 bg-gray-100 rounded-md">
          通知
        </button>
        <Badge variant="danger" className="absolute -top-2 -right-2">
          99+
        </Badge>
      </div>

      <div className="relative inline-block">
        <button className="px-4 py-2 bg-gray-100 rounded-md">
          メッセージ
        </button>
        <Badge variant="primary" className="absolute -top-2 -right-2">
          5
        </Badge>
      </div>

      <div className="relative inline-block">
        <button className="px-4 py-2 bg-gray-100 rounded-md">
          カート
        </button>
        <Badge variant="success" className="absolute -top-2 -right-2">
          3
        </Badge>
      </div>
    </div>
  ),
};

// アイコン付きバッジ
export const WithIcons = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Badge variant="success">
        <svg
          className="w-3 h-3 mr-1"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
        完了
      </Badge>

      <Badge variant="warning">
        <svg
          className="w-3 h-3 mr-1"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
        注意
      </Badge>

      <Badge variant="danger">
        <svg
          className="w-3 h-3 mr-1"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
        エラー
      </Badge>

      <Badge variant="primary">
        <svg
          className="w-3 h-3 mr-1"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
        情報
      </Badge>
    </div>
  ),
};

// タグとして使用
export const AsTags = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-2">商品カテゴリ</h3>
        <div className="flex gap-2 flex-wrap">
          <Badge variant="primary">電化製品</Badge>
          <Badge variant="primary">スマートフォン</Badge>
          <Badge variant="primary">アクセサリー</Badge>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2">スキルタグ</h3>
        <div className="flex gap-2 flex-wrap">
          <Badge variant="default">JavaScript</Badge>
          <Badge variant="default">React</Badge>
          <Badge variant="default">TypeScript</Badge>
          <Badge variant="default">Next.js</Badge>
          <Badge variant="default">Tailwind CSS</Badge>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2">特徴タグ</h3>
        <div className="flex gap-2 flex-wrap">
          <Badge variant="success">送料無料</Badge>
          <Badge variant="warning">在庫わずか</Badge>
          <Badge variant="primary">NEW</Badge>
          <Badge variant="danger">セール</Badge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// サイズバリエーション（className使用）
export const SizeVariations = {
  render: () => (
    <div className="flex items-center gap-4">
      <Badge variant="primary" className="text-[10px] px-2 py-0.5">
        極小
      </Badge>
      <Badge variant="primary" className="text-xs px-3 py-1">
        小（デフォルト）
      </Badge>
      <Badge variant="primary" className="text-sm px-4 py-1.5">
        中
      </Badge>
      <Badge variant="primary" className="text-base px-5 py-2">
        大
      </Badge>
    </div>
  ),
};

// 商品リストでの使用例
export const InProductList = {
  render: () => (
    <div className="w-full max-w-2xl space-y-3">
      {[
        { name: '商品A', price: 3980, status: 'NEW', variant: 'primary' },
        { name: '商品B', price: 1980, status: 'セール', variant: 'danger' },
        { name: '商品C', price: 5980, status: '人気', variant: 'success' },
        { name: '商品D', price: 2980, status: '残りわずか', variant: 'warning' },
      ].map((product, i) => (
        <div
          key={i}
          className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 bg-gray-200 rounded"></div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-semibold">{product.name}</h4>
                <Badge variant={product.variant}>{product.status}</Badge>
              </div>
              <p className="text-sm text-gray-600">商品の説明がここに入ります</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold">¥{product.price.toLocaleString()}</p>
            <button className="mt-1 text-sm text-blue-600 hover:underline">
              詳細
            </button>
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// ユーザーロール表示
export const UserRoleBadges = {
  render: () => (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500"></div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">山田 太郎</span>
            <Badge variant="danger">管理者</Badge>
          </div>
          <p className="text-sm text-gray-600">yamada@example.com</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500"></div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">佐藤 花子</span>
            <Badge variant="primary">編集者</Badge>
          </div>
          <p className="text-sm text-gray-600">sato@example.com</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500"></div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">鈴木 次郎</span>
            <Badge variant="default">閲覧者</Badge>
          </div>
          <p className="text-sm text-gray-600">suzuki@example.com</p>
        </div>
      </div>
    </div>
  ),
};

// テーブルでの使用例
export const InTable = {
  render: () => (
    <div className="w-full max-w-4xl overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left p-3 font-semibold">注文ID</th>
            <th className="text-left p-3 font-semibold">顧客名</th>
            <th className="text-left p-3 font-semibold">金額</th>
            <th className="text-left p-3 font-semibold">ステータス</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b hover:bg-gray-50">
            <td className="p-3">#12345</td>
            <td className="p-3">山田 太郎</td>
            <td className="p-3">¥12,800</td>
            <td className="p-3">
              <Badge variant="success">配達済み</Badge>
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="p-3">#12346</td>
            <td className="p-3">佐藤 花子</td>
            <td className="p-3">¥8,500</td>
            <td className="p-3">
              <Badge variant="primary">配送中</Badge>
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="p-3">#12347</td>
            <td className="p-3">鈴木 次郎</td>
            <td className="p-3">¥23,400</td>
            <td className="p-3">
              <Badge variant="warning">処理中</Badge>
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="p-3">#12348</td>
            <td className="p-3">田中 美咲</td>
            <td className="p-3">¥5,200</td>
            <td className="p-3">
              <Badge variant="danger">キャンセル</Badge>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
