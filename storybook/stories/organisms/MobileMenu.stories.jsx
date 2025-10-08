import { useState } from 'react';
import MobileMenu from '@/components/layout/MobileMenu';

const meta = {
  title: 'Organisms/MobileMenu',
  component: MobileMenu,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'メニューの開閉状態',
    },
    onClose: {
      description: 'メニューを閉じるコールバック',
    },
  },
};

export default meta;

// デフォルト（ログアウト状態、開いている）
export const Default = {
  args: {
    isOpen: true,
    onClose: () => console.log('Menu closed'),
  },
};

// 閉じている状態
export const Closed = {
  args: {
    isOpen: false,
    onClose: () => console.log('Menu closed'),
  },
};

// ログイン状態
export const LoggedIn = {
  render: () => <MobileMenu isOpen={true} onClose={() => console.log('Menu closed')} />,
};

// お気に入りあり
export const WithFavorites = {
  args: {
    isOpen: true,
    onClose: () => console.log('Menu closed'),
  },
};

// インタラクティブ例
export const Interactive = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">モバイルメニューデモ</h1>
          <button
            onClick={() => setIsOpen(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            メニューを開く
          </button>
        </div>

        <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    );
  },
};

// オーバーレイとドロワーの動作
export const OverlayAndDrawer = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <div className="p-8">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {isOpen ? 'メニューを閉じる' : 'メニューを開く'}
          </button>

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold mb-2">💡 操作方法</h3>
            <ul className="text-sm space-y-1">
              <li>• ボタンクリック: メニューを開く</li>
              <li>• オーバーレイクリック: メニューを閉じる</li>
              <li>• ✕ ボタンクリック: メニューを閉じる</li>
              <li>• Escapeキー: メニューを閉じる</li>
            </ul>
          </div>
        </div>

        <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    );
  },
};

// ヘッダーとの連携例
export const WithHeader = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* モバイルヘッダー */}
        <header className="bg-white border-b px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 text-gray-700 hover:text-blue-600"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <div className="font-bold text-lg">ECサイト</div>
            <div className="w-6"></div>
          </div>
        </header>

        {/* メインコンテンツ */}
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">ホームページ</h1>
          <p className="text-gray-600">ハンバーガーメニューをクリックしてメニューを開きます</p>
        </main>

        <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    );
  },
};

// 認証状態の比較
export const AuthenticationStates = {
  render: () => {
    const [loggedOutOpen, setLoggedOutOpen] = useState(false);
    const [loggedInOpen, setLoggedInOpen] = useState(false);

    return (
      <div className="p-8 space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">ログアウト状態</h3>
          <button
            onClick={() => setLoggedOutOpen(true)}
            className="px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            ログアウトメニューを開く
          </button>
          <div className="mt-4 text-sm text-gray-600">
            <p>• ヘッダーに「メニュー」と表示</p>
            <p>• ログイン、新規登録リンクを表示</p>
          </div>
          <MobileMenu isOpen={loggedOutOpen} onClose={() => setLoggedOutOpen(false)} />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">ログイン状態</h3>
          <button
            onClick={() => setLoggedInOpen(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            ログインメニューを開く
          </button>
          <div className="mt-4 text-sm text-gray-600">
            <p>• ヘッダーにユーザー名とメールアドレスを表示</p>
            <p>• マイページ、ログアウトボタンを表示</p>
          </div>
          <MobileMenu isOpen={loggedInOpen} onClose={() => setLoggedInOpen(false)} />
        </div>
      </div>
    );
  },
};

// メニュー構造の説明
export const MenuStructure = {
  render: () => (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">モバイルメニュー構造</h2>

      <div className="space-y-6">
        <div className="bg-white border rounded-lg p-6">
          <h3 className="font-semibold text-lg mb-3">📱 ヘッダーセクション</h3>
          <p className="text-gray-600 mb-2">ダークグレー背景（bg-gray-800）</p>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>ログアウト時: 「メニュー」テキスト</li>
            <li>ログイン時: ユーザー名 + メールアドレス</li>
            <li>閉じるボタン（✕）</li>
          </ul>
        </div>

        <div className="bg-white border rounded-lg p-6">
          <h3 className="font-semibold text-lg mb-3">🏠 メインリンク</h3>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>ホーム</li>
            <li>商品一覧</li>
            <li>お気に入り（バッジ付き）</li>
          </ul>
        </div>

        <div className="bg-white border rounded-lg p-6">
          <h3 className="font-semibold text-lg mb-3">📦 カテゴリー</h3>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>オフィス用品</li>
            <li>文具</li>
            <li>電化製品</li>
            <li>家具</li>
          </ul>
        </div>

        <div className="bg-white border rounded-lg p-6">
          <h3 className="font-semibold text-lg mb-3">👤 アカウント</h3>
          <p className="text-sm text-gray-600 mb-2">ログアウト時:</p>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 mb-3">
            <li>ログイン</li>
            <li>新規登録</li>
          </ul>
          <p className="text-sm text-gray-600 mb-2">ログイン時:</p>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>マイページ</li>
            <li>ログアウト（赤色）</li>
          </ul>
        </div>
      </div>
    </div>
  ),
};

// アニメーション状態
export const AnimationStates = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-6">アニメーションデモ</h2>

        <div className="space-y-4 mb-6">
          <button
            onClick={() => setIsOpen(true)}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            メニューを開く
          </button>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
            <h3 className="font-semibold mb-2">アニメーション仕様</h3>
            <ul className="space-y-1 text-gray-700">
              <li>• ドロワー: 左からスライドイン（-translate-x-full → translate-x-0）</li>
              <li>• オーバーレイ: フェードイン（opacity-0 → opacity-100）</li>
              <li>• 所要時間: 300ms</li>
              <li>• イージング: ease-in-out</li>
            </ul>
          </div>
        </div>

        <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    );
  },
};

// スクロール動作
export const ScrollBehavior = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-4">スクロール動作デモ</h2>
          <button
            onClick={() => setIsOpen(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 mb-6"
          >
            メニューを開く
          </button>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm mb-8">
            <p className="font-semibold mb-2">⚠️ スクロールロック機能</p>
            <p className="text-gray-700">
              メニューが開いている間、背景のスクロールが無効化されます。
              メニューを閉じると元に戻ります。
            </p>
          </div>

          {/* 長いコンテンツ */}
          <div className="space-y-4">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="bg-white border rounded-lg p-6">
                <h3 className="font-semibold mb-2">コンテンツブロック {i + 1}</h3>
                <p className="text-gray-600">
                  これは長いページのコンテンツです。メニューを開くとスクロールがロックされます。
                </p>
              </div>
            ))}
          </div>
        </div>

        <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    );
  },
};

// お気に入りバッジのバリエーション
export const FavoriteBadges = {
  render: () => {
    const BadgeExample = ({ count, label }) => (
      <div className="border rounded-lg p-4">
        <p className="text-sm font-semibold mb-3">{label}</p>
        <div className="flex items-center px-4 py-3 bg-gray-100 rounded-lg">
          <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <span>お気に入り</span>
          {count > 0 && (
            <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {count}
            </span>
          )}
        </div>
      </div>
    );

    return (
      <div className="p-8 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">お気に入りバッジ</h2>
        <div className="grid grid-cols-2 gap-4">
          <BadgeExample count={0} label="アイテムなし" />
          <BadgeExample count={1} label="1アイテム" />
          <BadgeExample count={5} label="5アイテム" />
          <BadgeExample count={99} label="99アイテム" />
        </div>
      </div>
    );
  },
};

// キーボードナビゲーション
export const KeyboardNavigation = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">キーボードナビゲーション</h2>
        <button
          onClick={() => setIsOpen(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 mb-6"
        >
          メニューを開く
        </button>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold mb-2">⌨️ キーボード操作</h3>
          <ul className="text-sm space-y-1 text-gray-700">
            <li>• Escapeキー: メニューを閉じる</li>
            <li>• Tabキー: フォーカス移動</li>
            <li>• Enterキー: リンク/ボタンを実行</li>
          </ul>
        </div>

        <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    );
  },
};

// レスポンシブ幅
export const ResponsiveWidth = {
  render: () => (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">メニュー幅: 320px（w-80）</h2>
      <p className="text-gray-600 mb-4">
        モバイルメニューは常に320pxの固定幅で表示されます。
      </p>
      <div className="border-2 border-blue-600 rounded-lg" style={{ width: '320px', height: '500px' }}>
        <div className="bg-gray-800 text-white p-4">
          <p className="font-semibold">メニュー</p>
        </div>
        <div className="p-4 bg-white">
          <p className="text-sm text-gray-600">320px幅のエリア</p>
        </div>
      </div>
    </div>
  ),
};
