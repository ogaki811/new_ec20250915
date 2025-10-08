import Divider from '@/components/ui/Divider';

const meta = {
  title: 'Atoms/Divider',
  component: Divider,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: '方向',
    },
    variant: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted'],
      description: 'スタイル',
    },
    spacing: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'スペーシング',
    },
    label: {
      control: 'text',
      description: 'ラベルテキスト（横方向のみ）',
    },
  },
};

export default meta;

// デフォルト（水平）
export const Default = {
  args: {
    orientation: 'horizontal',
  },
};

// バリアント - Solid
export const Solid = {
  args: {
    variant: 'solid',
  },
};

// バリアント - Dashed
export const Dashed = {
  args: {
    variant: 'dashed',
  },
};

// バリアント - Dotted
export const Dotted = {
  args: {
    variant: 'dotted',
  },
};

// ラベル付き
export const WithLabel = {
  args: {
    label: 'または',
  },
};

// 全バリアント
export const AllVariants = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-gray-600 mb-2">Solid</p>
        <Divider variant="solid" />
      </div>

      <div>
        <p className="text-sm text-gray-600 mb-2">Dashed</p>
        <Divider variant="dashed" />
      </div>

      <div>
        <p className="text-sm text-gray-600 mb-2">Dotted</p>
        <Divider variant="dotted" />
      </div>
    </div>
  ),
};

// スペーシングバリエーション
export const SpacingVariations = {
  render: () => (
    <div>
      <p>コンテンツ 1</p>
      <Divider spacing="none" />
      <p>スペーシング: none</p>

      <Divider spacing="sm" />
      <p>スペーシング: sm</p>

      <Divider spacing="md" />
      <p>スペーシング: md</p>

      <Divider spacing="lg" />
      <p>スペーシング: lg</p>
    </div>
  ),
};

// 垂直方向
export const Vertical = {
  render: () => (
    <div className="flex items-center h-32 gap-4">
      <div className="text-center">
        <p>セクション 1</p>
      </div>
      <Divider orientation="vertical" />
      <div className="text-center">
        <p>セクション 2</p>
      </div>
      <Divider orientation="vertical" />
      <div className="text-center">
        <p>セクション 3</p>
      </div>
    </div>
  ),
};

// セクション区切り
export const SectionDivider = {
  render: () => (
    <div>
      <section className="mb-4">
        <h2 className="text-xl font-bold mb-2">セクション 1</h2>
        <p className="text-gray-600">
          このセクションには最初の内容が含まれています。Dividerを使ってセクションを視覚的に分離します。
        </p>
      </section>

      <Divider />

      <section className="mt-4 mb-4">
        <h2 className="text-xl font-bold mb-2">セクション 2</h2>
        <p className="text-gray-600">
          このセクションには2番目の内容が含まれています。読みやすさを向上させます。
        </p>
      </section>

      <Divider />

      <section className="mt-4">
        <h2 className="text-xl font-bold mb-2">セクション 3</h2>
        <p className="text-gray-600">
          このセクションには3番目の内容が含まれています。
        </p>
      </section>
    </div>
  ),
};

// リスト区切り
export const InList = {
  render: () => (
    <div className="border rounded-lg overflow-hidden">
      <div className="p-4 hover:bg-gray-50">
        <h3 className="font-semibold">アイテム 1</h3>
        <p className="text-sm text-gray-600">説明文がここに入ります</p>
      </div>

      <Divider spacing="none" />

      <div className="p-4 hover:bg-gray-50">
        <h3 className="font-semibold">アイテム 2</h3>
        <p className="text-sm text-gray-600">説明文がここに入ります</p>
      </div>

      <Divider spacing="none" />

      <div className="p-4 hover:bg-gray-50">
        <h3 className="font-semibold">アイテム 3</h3>
        <p className="text-sm text-gray-600">説明文がここに入ります</p>
      </div>
    </div>
  ),
};

// フォームセクション区切り
export const InForm = {
  render: () => (
    <div className="max-w-md">
      <h2 className="text-xl font-bold mb-4">会員登録</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">メールアドレス</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-md"
            placeholder="example@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">パスワード</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-md"
            placeholder="8文字以上"
          />
        </div>
      </div>

      <Divider label="または" />

      <button className="w-full px-4 py-2 border rounded-md hover:bg-gray-50 transition-colors">
        Googleでログイン
      </button>
    </div>
  ),
};

// ナビゲーション区切り
export const InNavigation = {
  render: () => (
    <nav className="w-64 border rounded-lg p-2">
      <div className="space-y-1">
        <a href="#" className="block px-3 py-2 rounded-md hover:bg-gray-100">
          ホーム
        </a>
        <a href="#" className="block px-3 py-2 rounded-md hover:bg-gray-100">
          商品一覧
        </a>
        <a href="#" className="block px-3 py-2 rounded-md hover:bg-gray-100">
          カート
        </a>
      </div>

      <Divider spacing="sm" />

      <div className="space-y-1">
        <a href="#" className="block px-3 py-2 rounded-md hover:bg-gray-100">
          マイページ
        </a>
        <a href="#" className="block px-3 py-2 rounded-md hover:bg-gray-100">
          注文履歴
        </a>
      </div>

      <Divider spacing="sm" />

      <div className="space-y-1">
        <a href="#" className="block px-3 py-2 rounded-md hover:bg-gray-100">
          設定
        </a>
        <a href="#" className="block px-3 py-2 rounded-md hover:bg-gray-100">
          ログアウト
        </a>
      </div>
    </nav>
  ),
};

// カード内での使用
export const InCard = {
  render: () => (
    <div className="max-w-md border rounded-lg overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2">商品名</h3>
        <p className="text-2xl font-bold text-blue-600 mb-2">¥12,800</p>
        <p className="text-sm text-gray-600">
          この商品の詳細説明がここに表示されます。
        </p>
      </div>

      <Divider spacing="none" />

      <div className="p-6">
        <h4 className="font-semibold mb-3">仕様</h4>
        <dl className="space-y-2">
          <div className="flex justify-between">
            <dt className="text-gray-600">サイズ</dt>
            <dd className="font-medium">M</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-600">カラー</dt>
            <dd className="font-medium">ブルー</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-600">在庫</dt>
            <dd className="font-medium text-green-600">あり</dd>
          </div>
        </dl>
      </div>

      <Divider spacing="none" />

      <div className="p-6">
        <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          カートに追加
        </button>
      </div>
    </div>
  ),
};

// テーブル内での使用
export const InTable = {
  render: () => (
    <div className="border rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left p-3 font-semibold">商品名</th>
            <th className="text-right p-3 font-semibold">価格</th>
          </tr>
        </thead>
      </table>
      <Divider spacing="none" />
      <table className="w-full">
        <tbody>
          <tr className="hover:bg-gray-50">
            <td className="p-3">商品A</td>
            <td className="text-right p-3">¥1,980</td>
          </tr>
          <tr>
            <td colSpan={2} className="p-0">
              <Divider spacing="none" />
            </td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="p-3">商品B</td>
            <td className="text-right p-3">¥2,980</td>
          </tr>
          <tr>
            <td colSpan={2} className="p-0">
              <Divider spacing="none" />
            </td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="p-3">商品C</td>
            <td className="text-right p-3">¥3,980</td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
};

// 複数ラベル
export const MultipleLabels = {
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="mb-4">メールアドレスでログイン</p>
        <Divider label="または" />
        <p className="mt-4">ソーシャルアカウントでログイン</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold">2024年</h3>
        <Divider label="10月" spacing="sm" />
        <p className="text-sm text-gray-600 mt-2">投稿: 15件</p>
      </div>

      <div>
        <Divider label="ここまで読みました" />
      </div>
    </div>
  ),
};

// グリッドレイアウト
export const InGrid = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <div className="p-4 border rounded-lg">
        <h4 className="font-semibold mb-2">カラム 1</h4>
        <p className="text-sm text-gray-600">内容</p>
      </div>

      <Divider orientation="vertical" className="hidden md:block" />

      <div className="p-4 border rounded-lg">
        <h4 className="font-semibold mb-2">カラム 2</h4>
        <p className="text-sm text-gray-600">内容</p>
      </div>

      <Divider orientation="vertical" className="hidden md:block" />

      <div className="p-4 border rounded-lg">
        <h4 className="font-semibold mb-2">カラム 3</h4>
        <p className="text-sm text-gray-600">内容</p>
      </div>
    </div>
  ),
};
