import { useState } from 'react';
import Header from '@/components/layout/Header';

const meta = {
  title: 'Organisms/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
};

export default meta;

// デフォルト（ログアウト状態）
export const Default = {
  render: () => <Header />,
};

// ログイン状態
export const LoggedIn = {
  render: () => <Header />,
};

// カートにアイテムあり
export const WithCartItems = {
  render: () => <Header />,
};

// 検索機能デモ
export const SearchDemo = {
  render: () => (
    <div>
      <Header />
      <div className="p-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">検索機能</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            ヘッダーの検索バーにキーワードを入力して検索できます。
            Enterキーまたは「検索」ボタンをクリックすると検索が実行されます。
          </p>
        </div>
      </div>
    </div>
  ),
};

// モバイル表示
export const Mobile = {
  render: () => <Header />,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

// タブレット表示
export const Tablet = {
  render: () => <Header />,
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};

// スクロール時の表示（固定ヘッダー）
export const ScrolledFixed = {
  render: () => <Header />,
};

// ページ全体でのヘッダー表示
export const WithPageContent = {
  render: () => (
    <div>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-6">Welcome to Our Store</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white border rounded-lg p-6">
                <div className="bg-gray-200 h-48 rounded mb-4"></div>
                <h3 className="font-semibold mb-2">商品 {i + 1}</h3>
                <p className="text-gray-600">¥12,800</p>
              </div>
            ))}
          </div>

          <div className="bg-white border rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">About Us</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </main>
    </div>
  ),
};

// ナビゲーションリンク比較
export const NavigationStates = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold mb-2 px-4">通常状態（ナビゲーション表示）</h3>
        <Header />
      </div>

      <div className="h-px bg-gray-200" />

      <div>
        <h3 className="text-sm font-semibold mb-2 px-4">
          スクロール時（ナビゲーション非表示、コンパクトヘッダー）
        </h3>
        <p className="text-xs text-gray-500 px-4 mb-2">
          実装ではスクロール時にナビゲーションが非表示になり、ヘッダーがコンパクトになります
        </p>
        <Header />
      </div>
    </div>
  ),
};

// 認証状態比較
export const AuthenticationStates = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold mb-2 px-4">ログアウト状態</h3>
        <p className="text-xs text-gray-500 px-4 mb-2">
          「ログイン」ボタンが表示されます
        </p>
        <Header />
      </div>

      <div className="h-px bg-gray-200" />

      <div>
        <h3 className="text-sm font-semibold mb-2 px-4">ログイン状態</h3>
        <p className="text-xs text-gray-500 px-4 mb-2">
          「マイページ」と「ログアウト」ボタンが表示されます
        </p>
        <Header />
      </div>
    </div>
  ),
};

// レスポンシブデモ
export const ResponsiveDemo = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold mb-2">デスクトップ表示</h3>
        <p className="text-xs text-gray-500 mb-2">
          検索バー、ナビゲーション、各種アイコンが横並びで表示されます
        </p>
        <div className="border rounded-lg overflow-hidden">
          <Header />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2">モバイル表示</h3>
        <p className="text-xs text-gray-500 mb-2">
          ハンバーガーメニュー、ロゴ、カートアイコンがコンパクトに配置されます
        </p>
        <div className="max-w-sm border rounded-lg overflow-hidden">
          <Header />
        </div>
      </div>
    </div>
  ),
};

// ヘッダーの各機能説明
export const Features = {
  render: () => (
    <div>
      <Header />
      <div className="max-w-4xl mx-auto p-8">
        <h2 className="text-2xl font-bold mb-6">ヘッダー機能一覧</h2>

        <div className="space-y-6">
          <div className="bg-white border rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-3">🔍 検索機能</h3>
            <p className="text-gray-600 mb-2">
              商品名、メーカー、品番から商品を検索できます。
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>リアルタイム入力</li>
              <li>Enterキーで検索実行</li>
              <li>検索ボタンクリックで検索実行</li>
            </ul>
          </div>

          <div className="bg-white border rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-3">🛒 カート</h3>
            <p className="text-gray-600 mb-2">
              カートアイコンにアイテム数のバッジが表示されます。
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>商品追加時にバッジアニメーション</li>
              <li>アイテム数リアルタイム更新</li>
              <li>クリックでカートページへ移動</li>
            </ul>
          </div>

          <div className="bg-white border rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-3">👤 認証</h3>
            <p className="text-gray-600 mb-2">
              ログイン状態によって表示が変わります。
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>ログアウト時: ログインボタン</li>
              <li>ログイン時: マイページ、ログアウトボタン</li>
            </ul>
          </div>

          <div className="bg-white border rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-3">📱 レスポンシブ</h3>
            <p className="text-gray-600 mb-2">
              画面サイズに応じて表示が最適化されます。
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>デスクトップ: フルメニュー表示</li>
              <li>モバイル: ハンバーガーメニュー</li>
              <li>スクロール時: 固定ヘッダー（デスクトップのみ）</li>
            </ul>
          </div>

          <div className="bg-white border rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-3">🎯 ナビゲーション</h3>
            <p className="text-gray-600 mb-2">
              主要なカテゴリーへ素早くアクセスできます。
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>ホーム</li>
              <li>商品一覧</li>
              <li>カテゴリー別ページ</li>
              <li>メガメニュー（モバイル）</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ),
};

// カートバッジの状態
export const CartBadgeStates = {
  render: () => {
    const BadgeExample = ({ count, label }) => (
      <div className="border rounded-lg p-4">
        <p className="text-sm font-semibold mb-2">{label}</p>
        <div className="flex justify-center">
          <div className="relative p-2">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                {count}
              </span>
            )}
          </div>
        </div>
      </div>
    );

    return (
      <div className="max-w-4xl mx-auto p-8">
        <h2 className="text-2xl font-bold mb-6">カートバッジ状態</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <BadgeExample count={0} label="アイテムなし" />
          <BadgeExample count={1} label="1アイテム" />
          <BadgeExample count={5} label="5アイテム" />
          <BadgeExample count={99} label="99アイテム" />
        </div>
      </div>
    );
  },
};

// 実装パターン例
export const ImplementationExample = {
  render: () => (
    <div>
      <Header />
      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <div className="bg-blue-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold mb-4">新着商品続々入荷</h1>
            <p className="text-xl mb-8">今すぐチェック！</p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              商品を見る
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold mb-8">おすすめ商品</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="bg-gray-200 h-48"></div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">商品名 {i + 1}</h3>
                  <p className="text-xl font-bold text-blue-600">¥12,800</p>
                  <button className="w-full mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    カートに追加
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
};
