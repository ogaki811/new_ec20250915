import Footer from '@/components/layout/Footer';

const meta = {
  title: 'Organisms/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
};

export default meta;

// デフォルト
export const Default = {
  render: () => <Footer />,
};

// ページ全体での表示例
export const WithPageContent = {
  render: () => (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-6">ページコンテンツ</h1>
          <p className="text-gray-600 mb-8">
            フッターはページの最下部に固定されて表示されます。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white border rounded-lg p-6">
                <h3 className="font-semibold mb-2">コンテンツ {i + 1}</h3>
                <p className="text-gray-600">サンプルテキスト</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  ),
};

// モバイル表示
export const Mobile = {
  render: () => <Footer />,
  globals: {
    viewport: {
      value: "mobile1",
      isRotated: false
    }
  },
};

// タブレット表示
export const Tablet = {
  render: () => <Footer />,
  globals: {
    viewport: {
      value: "tablet",
      isRotated: false
    }
  },
};

// デスクトップ表示
export const Desktop = {
  render: () => <Footer />,
};

// レスポンシブデモ
export const ResponsiveDemo = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold mb-2 px-4">モバイル表示（1列）</h3>
        <div className="max-w-sm border rounded-lg overflow-hidden">
          <Footer />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2 px-4">タブレット表示（2列）</h3>
        <div className="max-w-2xl border rounded-lg overflow-hidden">
          <Footer />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2 px-4">デスクトップ表示（4列）</h3>
        <div className="border rounded-lg overflow-hidden">
          <Footer />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// フルページレイアウト例
export const FullPageExample = {
  render: () => (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold">ECサイト</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold mb-8">商品一覧</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white border rounded-lg overflow-hidden">
                <div className="bg-gray-200 h-48"></div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">商品 {i + 1}</h3>
                  <p className="text-xl font-bold text-blue-600">¥12,800</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  ),
};

// フッターセクション構成
export const FooterSections = {
  render: () => (
    <div>
      <Footer />
      <div className="max-w-4xl mx-auto p-8 bg-white">
        <h2 className="text-2xl font-bold mb-6">フッター構成</h2>

        <div className="space-y-6">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-2">📋 会社情報</h3>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>会社概要</li>
              <li>採用情報</li>
              <li>IR情報</li>
              <li>プレスリリース</li>
            </ul>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-2">💁 カスタマーサポート</h3>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>お問い合わせ</li>
              <li>よくある質問</li>
              <li>返品・交換について</li>
              <li>サイズガイド</li>
            </ul>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-2">🎁 サービス</h3>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>配送について</li>
              <li>支払い方法</li>
              <li>ポイントプログラム</li>
              <li>ギフトカード</li>
            </ul>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-2">📱 SNS</h3>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Instagram</li>
            </ul>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-2">⚖️ 法的情報</h3>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>利用規約</li>
              <li>プライバシーポリシー</li>
              <li>特定商取引法に基づく表記</li>
              <li>© 2025 smartsample. All rights reserved.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ),
};

// ダークモード
export const DarkMode = {
  render: () => (
    <div className="bg-gray-900">
      <Footer />
    </div>
  ),
};

// コンテンツ量が少ないページ
export const ShortContent = {
  render: () => (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold">ECサイト</h1>
        </div>
      </header>

      <main className="flex-1 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">404 Not Found</h2>
          <p className="text-gray-600 mb-6">
            お探しのページが見つかりませんでした。
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            ホームに戻る
          </button>
        </div>
      </main>

      <Footer />
    </div>
  ),
};

// コンテンツ量が多いページ
export const LongContent = {
  render: () => (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold">ECサイト</h1>
        </div>
      </header>

      <main className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold mb-8">商品一覧</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="bg-white border rounded-lg overflow-hidden">
                <div className="bg-gray-200 h-48"></div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">商品 {i + 1}</h3>
                  <p className="text-xl font-bold text-blue-600">¥12,800</p>
                  <button className="w-full mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    カートに追加
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  ),
};

// SNSアイコンのホバー状態
export const SocialMediaIcons = {
  render: () => (
    <div className="bg-white p-8">
      <h3 className="text-lg font-semibold mb-4">SNSアイコン</h3>
      <p className="text-sm text-gray-600 mb-6">
        アイコンにホバーすると色が変わります
      </p>

      <div className="flex space-x-6">
        <div className="text-center">
          <a
            href="#"
            className="inline-block text-gray-600 hover:text-blue-500 transition-colors"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
          <p className="text-xs text-gray-600 mt-2">Facebook</p>
        </div>

        <div className="text-center">
          <a
            href="#"
            className="inline-block text-gray-600 hover:text-blue-400 transition-colors"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
            </svg>
          </a>
          <p className="text-xs text-gray-600 mt-2">Twitter</p>
        </div>

        <div className="text-center">
          <a
            href="#"
            className="inline-block text-gray-600 hover:text-pink-500 transition-colors"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
            </svg>
          </a>
          <p className="text-xs text-gray-600 mt-2">Instagram</p>
        </div>
      </div>
    </div>
  ),
};

// リンクのホバー状態
export const LinkHoverStates = {
  render: () => (
    <div className="bg-gray-900 text-white p-8">
      <h3 className="text-lg font-semibold mb-4">フッターリンク</h3>
      <p className="text-sm text-gray-400 mb-6">
        リンクにホバーすると白色に変わります
      </p>

      <div className="space-y-4">
        <div>
          <h4 className="font-semibold mb-2">通常状態（グレー）</h4>
          <ul className="space-y-2">
            <li className="text-gray-300">会社概要</li>
            <li className="text-gray-300">採用情報</li>
            <li className="text-gray-300">IR情報</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">ホバー状態（白）</h4>
          <ul className="space-y-2">
            <li className="text-white">会社概要</li>
            <li className="text-white">採用情報</li>
            <li className="text-white">IR情報</li>
          </ul>
        </div>
      </div>
    </div>
  ),
};

// グリッドレイアウトのブレークポイント
export const GridBreakpoints = {
  render: () => (
    <div className="space-y-8 p-8 bg-white">
      <div>
        <h3 className="text-lg font-semibold mb-4">レスポンシブグリッド</h3>

        <div className="space-y-6">
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold mb-2">モバイル（〜767px）</h4>
            <p className="text-sm text-gray-600">1列レイアウト</p>
            <div className="mt-4 grid grid-cols-1 gap-4">
              <div className="bg-gray-100 p-3 rounded">セクション1</div>
              <div className="bg-gray-100 p-3 rounded">セクション2</div>
              <div className="bg-gray-100 p-3 rounded">セクション3</div>
              <div className="bg-gray-100 p-3 rounded">セクション4</div>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h4 className="font-semibold mb-2">タブレット（768px〜1023px）</h4>
            <p className="text-sm text-gray-600">2列レイアウト</p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-gray-100 p-3 rounded">セクション1</div>
              <div className="bg-gray-100 p-3 rounded">セクション2</div>
              <div className="bg-gray-100 p-3 rounded">セクション3</div>
              <div className="bg-gray-100 p-3 rounded">セクション4</div>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h4 className="font-semibold mb-2">デスクトップ（1024px〜）</h4>
            <p className="text-sm text-gray-600">4列レイアウト</p>
            <div className="mt-4 grid grid-cols-4 gap-4">
              <div className="bg-gray-100 p-3 rounded">セクション1</div>
              <div className="bg-gray-100 p-3 rounded">セクション2</div>
              <div className="bg-gray-100 p-3 rounded">セクション3</div>
              <div className="bg-gray-100 p-3 rounded">セクション4</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};
