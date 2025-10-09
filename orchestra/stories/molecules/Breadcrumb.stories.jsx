import Breadcrumb from '@/components/common/Breadcrumb';

const meta = {
  title: 'Molecules/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      description: 'パンくずリストの項目配列',
    },
  },
};

export default meta;

// 2階層（ホーム > 商品一覧）
export const TwoLevels = {
  args: {
    items: [
      { label: 'ホーム', href: '/' },
      { label: '商品一覧' },
    ],
  },
};

// 3階層（ホーム > 商品一覧 > カテゴリー）
export const ThreeLevels = {
  args: {
    items: [
      { label: 'ホーム', href: '/' },
      { label: '商品一覧', href: '/products' },
      { label: '電化製品' },
    ],
  },
};

// 4階層（ホーム > 商品一覧 > カテゴリー > 商品名）
export const FourLevels = {
  args: {
    items: [
      { label: 'ホーム', href: '/' },
      { label: '商品一覧', href: '/products' },
      { label: '電化製品', href: '/products/electronics' },
      { label: 'ワイヤレスイヤホン' },
    ],
  },
};

// 5階層以上
export const FiveLevels = {
  args: {
    items: [
      { label: 'ホーム', href: '/' },
      { label: '商品一覧', href: '/products' },
      { label: '電化製品', href: '/products/electronics' },
      { label: 'オーディオ', href: '/products/electronics/audio' },
      { label: 'ワイヤレスイヤホン' },
    ],
  },
};

// 長いラベル
export const LongLabels = {
  args: {
    items: [
      { label: 'ホーム', href: '/' },
      { label: '商品一覧', href: '/products' },
      { label: 'ワイヤレスBluetoothノイズキャンセリングイヤホン' },
    ],
  },
};

// カートページ
export const CartPage = {
  args: {
    items: [
      { label: 'ホーム', href: '/' },
      { label: 'カート' },
    ],
  },
};

// チェックアウトフロー
export const CheckoutPage = {
  args: {
    items: [
      { label: 'ホーム', href: '/' },
      { label: 'カート', href: '/cart' },
      { label: 'ご注文手続き' },
    ],
  },
};

// 注文完了
export const OrderCompletePage = {
  args: {
    items: [
      { label: 'ホーム', href: '/' },
      { label: 'カート', href: '/cart' },
      { label: 'ご注文手続き', href: '/checkout' },
      { label: 'ご注文完了' },
    ],
  },
};

// マイページ
export const MyPage = {
  args: {
    items: [
      { label: 'ホーム', href: '/' },
      { label: 'マイページ' },
    ],
  },
};

// マイページ - 注文履歴
export const MyPageOrders = {
  args: {
    items: [
      { label: 'ホーム', href: '/' },
      { label: 'マイページ', href: '/mypage' },
      { label: '注文履歴' },
    ],
  },
};

// マイページ - アカウント設定
export const MyPageSettings = {
  args: {
    items: [
      { label: 'ホーム', href: '/' },
      { label: 'マイページ', href: '/mypage' },
      { label: 'アカウント設定' },
    ],
  },
};

// お気に入り
export const FavoritesPage = {
  args: {
    items: [
      { label: 'ホーム', href: '/' },
      { label: 'お気に入り' },
    ],
  },
};

// 検索結果
export const SearchPage = {
  args: {
    items: [
      { label: 'ホーム', href: '/' },
      { label: '検索結果' },
    ],
  },
};

// 全パターン一覧
export const AllPatterns = {
  render: () => (
    <div className="space-y-6 p-6">
      <div>
        <h3 className="text-sm font-semibold mb-2">2階層</h3>
        <Breadcrumb
          items={[
            { label: 'ホーム', href: '/' },
            { label: '商品一覧' },
          ]}
        />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2">3階層</h3>
        <Breadcrumb
          items={[
            { label: 'ホーム', href: '/' },
            { label: '商品一覧', href: '/products' },
            { label: '電化製品' },
          ]}
        />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2">4階層</h3>
        <Breadcrumb
          items={[
            { label: 'ホーム', href: '/' },
            { label: '商品一覧', href: '/products' },
            { label: '電化製品', href: '/products/electronics' },
            { label: 'ワイヤレスイヤホン' },
          ]}
        />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2">チェックアウトフロー</h3>
        <Breadcrumb
          items={[
            { label: 'ホーム', href: '/' },
            { label: 'カート', href: '/cart' },
            { label: 'ご注文手続き' },
          ]}
        />
      </div>
    </div>
  ),
};

// ページコンテキスト例
export const WithPageContent = {
  render: () => (
    <div>
      <Breadcrumb
        items={[
          { label: 'ホーム', href: '/' },
          { label: '商品一覧', href: '/products' },
          { label: '電化製品' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6">電化製品</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border rounded-lg p-4">
              <div className="bg-gray-200 h-48 rounded mb-3"></div>
              <h3 className="font-semibold mb-2">商品 {i}</h3>
              <p className="text-gray-600 text-sm">¥12,800</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

// 商品詳細ページコンテキスト
export const ProductDetailContext = {
  render: () => (
    <div>
      <Breadcrumb
        items={[
          { label: 'ホーム', href: '/' },
          { label: '商品一覧', href: '/products' },
          { label: '電化製品', href: '/products/electronics' },
          { label: 'ワイヤレスイヤホン' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-200 h-96 rounded-lg"></div>
          <div>
            <h1 className="text-3xl font-bold mb-4">ワイヤレスイヤホン</h1>
            <p className="text-2xl font-bold text-blue-600 mb-4">¥12,800</p>
            <p className="text-gray-600 mb-6">
              高品質なノイズキャンセリング機能を搭載したワイヤレスイヤホンです。
              長時間の使用でも快適な装着感を実現しています。
            </p>
            <button className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              カートに追加
            </button>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

// レスポンシブ表示
export const Responsive = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold mb-2 px-4">モバイル幅（短いラベル）</h3>
        <div className="max-w-sm border rounded">
          <Breadcrumb
            items={[
              { label: 'ホーム', href: '/' },
              { label: '商品', href: '/products' },
              { label: '電化製品' },
            ]}
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2 px-4">モバイル幅（長いラベル）</h3>
        <div className="max-w-sm border rounded">
          <Breadcrumb
            items={[
              { label: 'ホーム', href: '/' },
              { label: '商品一覧', href: '/products' },
              { label: 'ワイヤレスBluetoothイヤホン' },
            ]}
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2 px-4">タブレット幅</h3>
        <div className="max-w-2xl border rounded">
          <Breadcrumb
            items={[
              { label: 'ホーム', href: '/' },
              { label: '商品一覧', href: '/products' },
              { label: '電化製品', href: '/products/electronics' },
              { label: 'ワイヤレスイヤホン' },
            ]}
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2 px-4">デスクトップ幅</h3>
        <div className="border rounded">
          <Breadcrumb
            items={[
              { label: 'ホーム', href: '/' },
              { label: '商品一覧', href: '/products' },
              { label: '電化製品', href: '/products/electronics' },
              { label: 'オーディオ', href: '/products/electronics/audio' },
              { label: 'ワイヤレスイヤホン' },
            ]}
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
