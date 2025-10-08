# SSR実装計画 - Next.js移行

## 概要
現在のVite + ReactアプリケーションをSSR（Server-Side Rendering）対応にするため、Next.js 14 (App Router)へ移行します。

## なぜNext.jsか？

### SSRのメリット
- ✅ **SEO最適化**: 検索エンジンがコンテンツを正しくクロール可能
- ✅ **初期表示高速化**: サーバーでHTMLを生成してから配信
- ✅ **パフォーマンス向上**: クライアント側のJavaScript処理を削減
- ✅ **OGP対応**: SNSシェア時のプレビュー表示

### Next.js 14の特徴
- ✅ **App Router**: 新しいファイルベースルーティング
- ✅ **React Server Components**: サーバーコンポーネントでデータ取得
- ✅ **自動コード分割**: ページごとに最適化されたバンドル
- ✅ **画像最適化**: next/imageで自動最適化
- ✅ **TypeScript標準サポート**: 型安全な開発

---

## 📦 移行手順

### Phase 1: Next.jsプロジェクトセットアップ

#### 1. Next.jsプロジェクト作成
```bash
cd /Users/ogawayuuki/Documents/htdocs/ec_Design
npx create-next-app@latest next-app --typescript --tailwind --app --src-dir --import-alias "@/*"
```

オプション選択:
- ✅ TypeScript
- ✅ ESLint
- ✅ Tailwind CSS
- ✅ `src/` directory
- ✅ App Router
- ✅ Import alias `@/*`

#### 2. ディレクトリ構造
```
next-app/
├── src/
│   ├── app/                    # App Router（ページ）
│   │   ├── layout.tsx         # ルートレイアウト
│   │   ├── page.tsx           # Homeページ
│   │   ├── mypage/
│   │   │   └── page.tsx       # MyPageページ
│   │   ├── order-history/
│   │   │   └── page.tsx       # 注文履歴ページ
│   │   ├── favorites/
│   │   │   └── page.tsx       # お気に入りページ
│   │   ├── cart/
│   │   │   └── page.tsx       # カートページ
│   │   ├── login/
│   │   │   └── page.tsx       # ログインページ
│   │   └── signup/
│   │       └── page.tsx       # サインアップページ
│   ├── components/             # コンポーネント
│   │   ├── atoms/
│   │   ├── molecules/
│   │   ├── organisms/
│   │   └── templates/
│   ├── lib/                    # ユーティリティ関数
│   ├── types/                  # TypeScript型定義
│   └── styles/                 # グローバルスタイル
├── public/                     # 静的ファイル
│   ├── img/
│   └── ...
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
└── package.json
```

---

## 🔄 Vite→Next.js 移行マッピング

### ルーティング変更

**Vite (React Router):**
```jsx
// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/mypage" element={<MyPage />} />
</Routes>
```

**Next.js (App Router):**
```
src/app/
├── page.tsx              → "/" (Home)
├── mypage/
│   └── page.tsx          → "/mypage"
├── order-history/
│   └── page.tsx          → "/order-history"
└── ...
```

### レイアウト共通化

**Vite:**
```jsx
// App.jsx
function App() {
  return (
    <div>
      <Header />
      <Routes>...</Routes>
      <Footer />
    </div>
  );
}
```

**Next.js:**
```tsx
// src/app/layout.tsx
import Header from '@/components/organisms/Header';
import Footer from '@/components/organisms/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
```

### 画像最適化

**Vite:**
```jsx
<img src="/img/product/8027341_l1.jpg" alt="商品名" />
```

**Next.js:**
```tsx
import Image from 'next/image';

<Image
  src="/img/product/8027341_l1.jpg"
  alt="商品名"
  width={300}
  height={300}
  className="object-cover"
/>
```

### リンク

**Vite:**
```jsx
import { Link } from 'react-router-dom';

<Link to="/mypage">マイページ</Link>
```

**Next.js:**
```tsx
import Link from 'next/link';

<Link href="/mypage">マイページ</Link>
```

---

## 🎨 Tailwind CSS設定

### next-app/tailwind.config.ts
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb', // blue-600
          hover: '#1d4ed8',   // blue-700
        },
      },
      spacing: {
        // カスタムスペーシング
      },
    },
  },
  plugins: [],
}
export default config
```

---

## 📊 レスポンシブデザイン実装

### グリッドレイアウト（横6列対応）

#### おすすめ商品グリッド
```tsx
// src/components/organisms/ProductGrid/index.tsx
export default function ProductGrid({
  title,
  products,
  columns = { base: 2, sm: 3, md: 4, lg: 6 } // ← 横6列
}: ProductGridProps) {
  return (
    <section>
      <h2>{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {products.map(product => (
          <ProductCard
            key={product.id}
            {...product}
            size="compact" // ← 小さいサイズ
          />
        ))}
      </div>
    </section>
  );
}
```

#### ProductCard サイズバリエーション
```tsx
// src/components/molecules/ProductCard/index.tsx
export default function ProductCard({
  size = 'default', // 'compact' | 'default' | 'large'
  ...props
}: ProductCardProps) {
  const sizeClasses = {
    compact: 'text-sm',      // おすすめ商品用（横6列）
    default: 'text-base',    // 通常商品（横4列）
    large: 'text-lg',        // 特集商品（横2-3列）
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow ${sizeClasses[size]}`}>
      {/* コンテンツ */}
    </div>
  );
}
```

### ヘッダー横幅100%実装
```tsx
// src/components/organisms/Header/index.tsx
export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* ヘッダーコンテンツ */}
      </div>
    </header>
  );
}
```

**ポイント:**
- `w-full`: 横幅100%
- `sticky top-0 z-50`: スクロール時に固定
- `container mx-auto max-w-7xl`: 中身は最大幅制限

### レスポンシブブレークポイント
```typescript
// Tailwindデフォルトブレークポイント
{
  sm: '640px',   // スマートフォン横向き・小型タブレット
  md: '768px',   // タブレット
  lg: '1024px',  // ノートPC
  xl: '1280px',  // デスクトップ
  '2xl': '1536px', // 大型デスクトップ
}
```

**使用例:**
```tsx
<div className="
  grid
  grid-cols-2     /* モバイル: 2列 */
  sm:grid-cols-3  /* タブレット: 3列 */
  md:grid-cols-4  /* ノートPC: 4列 */
  lg:grid-cols-6  /* デスクトップ: 6列 */
  gap-4
">
```

---

## 🚀 Next.js特有の機能実装

### Server Components（データ取得）
```tsx
// src/app/page.tsx (Homeページ)
async function getProducts() {
  // サーバー側でデータ取得（APIなし）
  const products = [
    { id: '1', name: '商品A', price: 1200, ... },
    // ...
  ];
  return products;
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div>
      <HeroSlider slides={heroSlides} />
      <ProductGrid title="おすすめ商品" products={products} />
    </div>
  );
}
```

### Metadata（SEO）
```tsx
// src/app/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'smartsample - ECサイト',
  description: 'オフィス用品・文具の通販サイト',
  openGraph: {
    title: 'smartsample - ECサイト',
    description: 'オフィス用品・文具の通販サイト',
    images: ['/img/og-image.png'],
  },
};
```

### 動的ルート（商品詳細ページ）
```
src/app/
└── product/
    └── [id]/
        └── page.tsx  → "/product/8027341"
```

```tsx
// src/app/product/[id]/page.tsx
export default function ProductDetail({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>商品ID: {params.id}</h1>
    </div>
  );
}
```

---

## 📝 実装進捗管理ドキュメント

### PROGRESS.md 作成
```markdown
# 実装進捗管理

## 進捗状況
- [x] 計画フェーズ完了
- [ ] Next.jsセットアップ
- [ ] Atomsコンポーネント実装
- [ ] Moleculesコンポーネント実装
- ...

## 実装完了コンポーネント
| コンポーネント | ファイル | 実装日 | レビュー | 備考 |
|--------------|---------|--------|---------|------|
| Button | src/components/atoms/Button/index.tsx | - | - | 8バリアント |
| Badge | src/components/atoms/Badge/index.tsx | - | - | 4バリアント |
...

## 週次進捗
### Week 1 (2025-XX-XX ~ 2025-XX-XX)
- [x] Next.jsプロジェクトセットアップ
- [x] Tailwind設定
- [ ] Button実装
- [ ] Badge実装
...
```

---

## 📋 移行チェックリスト

### Phase 1: セットアップ（1日）
- [ ] Next.jsプロジェクト作成
- [ ] Tailwind CSS設定
- [ ] ディレクトリ構造作成
- [ ] 必要パッケージインストール
  - [ ] swiper
  - [ ] react-hook-form
  - [ ] @heroicons/react

### Phase 2: コンポーネント移行（2週間）
- [ ] Atoms（6個）
  - [ ] Button（8バリアント、レスポンシブ対応）
  - [ ] Badge
  - [ ] Input
  - [ ] Select
  - [ ] Icon
  - [ ] QuantitySelector
- [ ] Molecules（9個）
  - [ ] ProductCard（compactサイズ追加）
  - [ ] OrderCard
  - [ ] OrderItem
  - [ ] CategoryCard
  - [ ] NewsItem
  - [ ] InfoField
  - [ ] CartItem
  - [ ] CartSummary
  - [ ] PasswordStrength
- [ ] Organisms（9個）
  - [ ] ProductGrid（横6列対応）
  - [ ] CategoryGrid
  - [ ] OrderList
  - [ ] NewsList
  - [ ] Pagination
  - [ ] HeroSlider（Swiper.js）
  - [ ] Header（横幅100%、レスポンシブ）
  - [ ] Footer
  - [ ] Sidebar

### Phase 3: ページ実装（1週間）
- [ ] Home（`/`）
- [ ] MyPage（`/mypage`）
- [ ] OrderHistory（`/order-history`）
- [ ] Favorites（`/favorites`）
- [ ] Cart（`/cart`）
- [ ] Login（`/login`）
- [ ] Signup（`/signup`）

### Phase 4: 最適化（3日）
- [ ] 画像最適化（next/image）
- [ ] メタデータ設定（SEO）
- [ ] OGP設定
- [ ] パフォーマンステスト（Lighthouse）
- [ ] レスポンシブ動作確認

---

## 🎯 レスポンシブ対応詳細

### モバイル（< 640px）
- ヘッダー: ハンバーガーメニュー
- 商品グリッド: 2列
- サイドバー: 下部に配置またはドロワー
- フッター: アコーディオン

### タブレット（640px ~ 1024px）
- ヘッダー: 簡略版ナビゲーション
- 商品グリッド: 3-4列
- サイドバー: 表示/非表示切替

### デスクトップ（≥ 1024px）
- ヘッダー: フルナビゲーション
- おすすめ商品グリッド: **6列** ← 新要件
- 通常商品グリッド: 4列
- サイドバー: 常時表示

### ヘッダーレスポンシブ実装例
```tsx
// src/components/organisms/Header/index.tsx
export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* ロゴ */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image src="/img/header_logo.png" alt="Logo" width={150} height={40} />
            </Link>
          </div>

          {/* デスクトップナビゲーション */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600">
              ホーム
            </Link>
            <Link href="/mypage" className="text-gray-700 hover:text-blue-600">
              マイページ
            </Link>
            {/* ... */}
          </nav>

          {/* モバイルメニューボタン */}
          <button className="lg:hidden">
            <MenuIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
```

---

## 🔧 next.config.js 設定

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 画像最適化
  images: {
    domains: ['localhost'],
    formats: ['image/webp'],
  },

  // Strict Mode
  reactStrictMode: true,

  // 出力設定（静的エクスポート時）
  // output: 'export', // 完全静的サイトの場合
}

module.exports = nextConfig
```

---

## 📈 期待される効果

### SSR導入による効果
- **SEO向上**: 検索順位の改善
- **初期表示速度**: 30-50%高速化
- **ユーザー体験**: LCP（Largest Contentful Paint）の改善
- **SNS対応**: OGP画像の正しい表示

### Next.js特有の最適化
- **自動コード分割**: ページごとのバンドルサイズ削減
- **画像最適化**: WebP自動変換、遅延読み込み
- **フォント最適化**: next/fontによる最適化
- **プリフェッチ**: リンクホバー時の先読み

---

## 🚀 開発・デプロイコマンド

### 開発サーバー起動
```bash
cd next-app
npm run dev
# → http://localhost:3000
```

### 本番ビルド
```bash
npm run build
npm run start
```

### 静的エクスポート（オプション）
```bash
# next.config.js に output: 'export' 追加後
npm run build
# → out/ ディレクトリに静的ファイル生成
```

---

## ✅ 成功基準

- [ ] すべてのページがSSRで動作
- [ ] Lighthouseスコア90点以上（Performance, SEO, Accessibility）
- [ ] おすすめ商品が横6列で表示
- [ ] ヘッダーが横幅100%で表示
- [ ] モバイル・タブレット・デスクトップで正しく表示
- [ ] 画像が最適化されている（WebP）
- [ ] OGPが正しく設定されている
- [ ] PROGRESS.mdで進捗が可視化されている

---

**Next.js移行により、SEO対応・パフォーマンス向上・開発体験の改善を実現します。** 🎉
