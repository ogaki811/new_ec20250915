# Next.js + TypeScript リファクタリング計画

**作成日**: 2025年10月5日
**対象プロジェクト**: smartsample EC サイト
**現在の構成**: Vite 7.1.7 + React 19.1.1 + JavaScript
**移行先**: Next.js 15.x + TypeScript 5.x

---

## 目次

1. [プロジェクト現状分析](#1-プロジェクト現状分析)
2. [移行戦略](#2-移行戦略)
3. [技術スタック比較](#3-技術スタック比較)
4. [ファイル構造マッピング](#4-ファイル構造マッピング)
5. [TypeScript型定義設計](#5-typescript型定義設計)
6. [ルーティング移行計画](#6-ルーティング移行計画)
7. [SEO強化戦略](#7-seo強化戦略)
8. [段階的実装計画](#8-段階的実装計画)
9. [依存関係の変更](#9-依存関係の変更)
10. [テスト戦略](#10-テスト戦略)
11. [リスクと対策](#11-リスクと対策)

---

## 1. プロジェクト現状分析

### 現在のファイル構成

```
react-app/
├── src/
│   ├── components/          # 36個のコンポーネント
│   │   ├── templates/       # レイアウトテンプレート
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   └── ...
│   ├── pages/              # 17個のページ
│   │   ├── Home.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── ProductList.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Login.jsx
│   │   └── ...
│   ├── hooks/              # 7個のカスタムフック
│   │   ├── useDebounce.js
│   │   ├── useSearch.js
│   │   ├── useFilters.js
│   │   └── ...
│   ├── store/              # 3個のZustandストア
│   │   ├── useAuthStore.js
│   │   ├── useCartStore.js
│   │   └── useFavoritesStore.js
│   ├── data/               # サンプルデータ
│   │   ├── sampleProducts.js
│   │   ├── sampleCoupons.js
│   │   └── prefectures.js
│   └── assets/             # 静的リソース
├── public/                 # 画像・アイコン
└── index.html             # SPAエントリポイント
```

### 主要機能

- **ページ数**: 17ページ（Home, 商品一覧, 商品詳細, カート, チェックアウト, マイページ等）
- **コンポーネント数**: 36個（Header, Footer, ProductCard等）
- **状態管理**: Zustand（認証、カート、お気に入り）
- **ルーティング**: React Router v7
- **スタイリング**: Tailwind CSS + BEM命名規則（790クラス）
- **SEO**: react-helmet-async（CSR制限あり）
- **フォーム**: カスタムInput, Checkbox, Select コンポーネント
- **画像**: 最適化済み（OptimizedImage コンポーネント）
- **アクセシビリティ**: スキップリンク、ライブリージョン、キーボードナビゲーション

### 現在の課題

1. **SEO制限**: CSRのため、OGタグ・構造化データが検索エンジン/SNSクローラーに認識されにくい
2. **初期表示速度**: JavaScriptバンドル読み込み後にレンダリング開始
3. **型安全性**: JavaScriptのため、実行時エラーのリスク
4. **コード補完**: IDEの補完機能が限定的

---

## 2. 移行戦略

### 推奨アプローチ: **App Router + TypeScript 完全移行**

#### 選定理由

- **App Router**: Next.js 13+の新しいルーティングシステム
  - Server Components デフォルト（パフォーマンス向上）
  - レイアウトの階層化（共通ヘッダー・フッター管理が容易）
  - メタデータAPI（SEO最適化が簡単）
  - ストリーミングSSR対応

- **完全移行**: 段階的移行よりも推奨
  - 新規プロジェクトとして構築（既存コードは参照用に保持）
  - Next.js の機能を最大限活用
  - TypeScript化も同時に実施（二度手間を避ける）

### 移行フェーズ

**Phase 1: プロジェクトセットアップ（1-2日）**
- Next.js + TypeScript プロジェクト作成
- 必要な依存関係インストール
- 基本設定ファイル作成

**Phase 2: 共通機能移行（2-3日）**
- 型定義作成
- レイアウトコンポーネント移行
- Zustandストア TypeScript化
- カスタムフック TypeScript化

**Phase 3: ページ移行（5-7日）**
- 公開ページ優先（Home, ProductList, ProductDetail）
- 認証ページ（Login, Signup）
- 保護ページ（MyPage, Cart, Checkout）

**Phase 4: SEO・パフォーマンス最適化（2-3日）**
- メタデータAPI実装
- 画像最適化（next/image）
- 動的ルート・SSG設定
- サイトマップ生成

**Phase 5: テスト・デバッグ（2-3日）**
- 全ページ動作確認
- SEOタグ検証
- パフォーマンス測定
- アクセシビリティ検証

**合計見積: 12-18日**

---

## 3. 技術スタック比較

### Before (現在)

| カテゴリ | 技術 |
|---------|------|
| ビルドツール | Vite 7.1.7 |
| フレームワーク | React 19.1.1 |
| 言語 | JavaScript |
| ルーティング | React Router v7 |
| 状態管理 | Zustand 5.0.8 |
| SEO | react-helmet-async（CSR制限） |
| スタイリング | Tailwind CSS + BEM |
| 画像最適化 | カスタムOptimizedImageコンポーネント |
| レンダリング | CSR（クライアントサイド） |

### After (移行後)

| カテゴリ | 技術 |
|---------|------|
| フレームワーク | Next.js 15.x |
| 言語 | TypeScript 5.x |
| ルーティング | App Router（ファイルベース） |
| 状態管理 | Zustand 5.0.8（継続使用） |
| SEO | Metadata API（SSR/SSG対応） |
| スタイリング | Tailwind CSS + BEM（継続使用） |
| 画像最適化 | next/image（自動最適化） |
| レンダリング | SSR/SSG/ISR（選択可能） |

### 主な改善点

✅ **SEO大幅向上**: サーバーサイドでメタタグ・構造化データ生成
✅ **初期表示高速化**: HTMLが完成した状態で配信
✅ **型安全性**: TypeScriptによる開発時エラー検出
✅ **開発体験向上**: IDEの補完・リファクタリング機能強化
✅ **画像最適化**: 自動WebP変換、レスポンシブ画像生成
✅ **コード分割**: 自動的な最適化

---

## 4. ファイル構造マッピング

### Next.js App Router 構造

```
smartsample-nextjs/
├── src/
│   ├── app/                        # App Router（ルーティング）
│   │   ├── layout.tsx             # ルートレイアウト（全ページ共通）
│   │   ├── page.tsx               # トップページ（/）
│   │   ├── (marketing)/           # グループルート（認証不要）
│   │   │   ├── layout.tsx         # Header + Footer レイアウト
│   │   │   ├── products/
│   │   │   │   ├── page.tsx       # 商品一覧（/products）
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx   # 商品詳細（/products/[id]）
│   │   │   ├── search/
│   │   │   │   └── page.tsx       # 検索ページ（/search）
│   │   │   └── category/
│   │   │       └── [categoryId]/
│   │   │           └── page.tsx   # カテゴリ（/category/[categoryId]）
│   │   ├── (auth)/                # 認証ページグループ
│   │   │   ├── layout.tsx         # SimpleHeader + SimpleFooter
│   │   │   ├── login/
│   │   │   │   └── page.tsx       # ログイン（/login）
│   │   │   ├── signup/
│   │   │   │   └── page.tsx       # サインアップ（/signup）
│   │   │   ├── forgot-password/
│   │   │   │   └── page.tsx       # パスワード忘れ（/forgot-password）
│   │   │   ├── password-reset-sent/
│   │   │   │   └── page.tsx       # メール送信完了
│   │   │   └── reset-password/
│   │   │       └── page.tsx       # パスワード再設定
│   │   ├── (shop)/                # 購入フロー（認証不要）
│   │   │   ├── layout.tsx         # Header + Footer
│   │   │   ├── cart/
│   │   │   │   └── page.tsx       # カート（/cart）
│   │   │   ├── checkout/
│   │   │   │   └── page.tsx       # チェックアウト（/checkout）
│   │   │   └── order-complete/
│   │   │       └── page.tsx       # 注文完了（/order-complete）
│   │   ├── (protected)/           # ログイン必須ページ
│   │   │   ├── layout.tsx         # 認証チェック + Header + Footer
│   │   │   ├── mypage/
│   │   │   │   └── page.tsx       # マイページ（/mypage）
│   │   │   ├── order-history/
│   │   │   │   └── page.tsx       # 注文履歴（/order-history）
│   │   │   └── favorites/
│   │   │       └── page.tsx       # お気に入り（/favorites）
│   │   ├── coming-soon/
│   │   │   └── page.tsx           # Coming Soon ページ
│   │   ├── terms/
│   │   │   └── page.tsx           # 利用規約
│   │   ├── privacy/
│   │   │   └── page.tsx           # プライバシーポリシー
│   │   ├── not-found.tsx          # 404ページ
│   │   └── error.tsx              # エラーページ
│   ├── components/                 # UIコンポーネント
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── SimpleHeader.tsx
│   │   │   ├── SimpleFooter.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── product/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductSlider.tsx
│   │   │   └── ProductGrid.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Checkbox.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Loading.tsx
│   │   ├── common/
│   │   │   ├── Breadcrumb.tsx
│   │   │   ├── Pagination.tsx
│   │   │   ├── SearchFilters.tsx
│   │   │   └── CategoryGrid.tsx
│   │   └── ...
│   ├── lib/                       # ユーティリティ関数
│   │   ├── utils.ts
│   │   ├── api.ts
│   │   └── constants.ts
│   ├── hooks/                     # カスタムフック
│   │   ├── useDebounce.ts
│   │   ├── useSearch.ts
│   │   ├── useFilters.ts
│   │   ├── usePagination.ts
│   │   ├── usePostalCode.ts
│   │   ├── useFormPersist.ts
│   │   └── useKeyboardNavigation.ts
│   ├── store/                     # Zustand ストア
│   │   ├── useAuthStore.ts
│   │   ├── useCartStore.ts
│   │   └── useFavoritesStore.ts
│   ├── types/                     # TypeScript型定義
│   │   ├── product.ts
│   │   ├── user.ts
│   │   ├── cart.ts
│   │   ├── order.ts
│   │   └── index.ts
│   └── data/                      # 静的データ
│       ├── sampleProducts.ts
│       ├── sampleCoupons.ts
│       └── prefectures.ts
├── public/                        # 静的ファイル
│   ├── img/
│   │   ├── mainbanner/
│   │   ├── product/
│   │   └── header_logo.png
│   ├── favicon.ico
│   └── robots.txt
├── next.config.js                 # Next.js設定
├── tsconfig.json                  # TypeScript設定
├── tailwind.config.ts             # Tailwind設定
└── package.json
```

### ルート構造の説明

- **App Router**: ディレクトリ = ルート
- **グループルート `(name)`**: URLに影響せず、レイアウト共有用
  - `(marketing)`: 公開ページ（Header + Footer）
  - `(auth)`: 認証ページ（SimpleHeader + SimpleFooter）
  - `(shop)`: 購入フロー（Header + Footer）
  - `(protected)`: ログイン必須（認証チェック + Header + Footer）
- **動的ルート `[param]`**: URLパラメータ
  - `products/[id]`: `/products/1`, `/products/2` など

---

## 5. TypeScript型定義設計

### 主要型定義

#### types/product.ts

```typescript
export interface Product {
  id: string;
  name: string;
  code: string;
  brand: string;
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  images: string[];
  stock: number;
  rating: number;
  reviewCount: number;
  category: string;
  tags?: string[];
  isNew?: boolean;
  isSale?: boolean;
  discountRate?: number;
}

export interface ProductListItem {
  id: string;
  name: string;
  code: string;
  price: number;
  image: string;
  brand?: string;
  rating?: number;
  isNew?: boolean;
  isSale?: boolean;
}

export interface ProductFilter {
  category?: string;
  brand?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: number;
  inStock?: boolean;
  tags?: string[];
}

export interface ProductSort {
  field: 'price' | 'rating' | 'name' | 'newest';
  order: 'asc' | 'desc';
}
```

#### types/user.ts

```typescript
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  memberRank?: 'standard' | 'silver' | 'gold' | 'platinum';
  points?: number;
  registeredAt?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

export interface SignupFormData {
  lastName: string;
  firstName: string;
  lastNameKana: string;
  firstNameKana: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}
```

#### types/cart.ts

```typescript
export interface CartItem {
  productId: string;
  name: string;
  code: string;
  price: number;
  quantity: number;
  image: string;
  stock: number;
}

export interface Coupon {
  id: string;
  code: string;
  name: string;
  discount: number;
  discountType: 'percentage' | 'fixed';
  minPurchase?: number;
  expiresAt?: string;
}

export interface CartState {
  items: CartItem[];
  appliedCoupon: Coupon | null;
  addItem: (item: Omit<CartItem, 'quantity'>, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  applyCoupon: (coupon: Coupon) => void;
  removeCoupon: () => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  getDiscountAmount: () => number;
  getFinalPrice: () => number;
}
```

#### types/order.ts

```typescript
export interface ShippingAddress {
  lastName: string;
  firstName: string;
  postalCode: string;
  prefecture: string;
  city: string;
  address: string;
  building?: string;
  phone: string;
}

export interface Order {
  id: string;
  userId?: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: 'credit' | 'bank' | 'convenience' | 'cod';
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt?: string;
}

export interface CheckoutFormData extends ShippingAddress {
  paymentMethod: 'credit' | 'bank' | 'convenience' | 'cod';
  useDifferentBilling: boolean;
  billingAddress?: ShippingAddress;
  cardNumber?: string;
  cardExpiry?: string;
  cardCVC?: string;
  saveAddress: boolean;
}
```

#### types/index.ts

```typescript
export * from './product';
export * from './user';
export * from './cart';
export * from './order';

// Component Props Types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'social';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
  to?: string;
  onClick?: () => void;
}

export interface InputProps extends BaseComponentProps {
  type?: 'text' | 'email' | 'password' | 'tel' | 'number';
  id: string;
  name: string;
  value: string | number;
  label?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  autoComplete?: string;
  showPasswordToggle?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export interface SelectProps extends BaseComponentProps {
  id: string;
  name: string;
  value: string;
  label?: string;
  options: Array<{ value: string; label: string }>;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

// Utility Types
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type AsyncFunction<T = void> = () => Promise<T>;
```

---

## 6. ルーティング移行計画

### React Router → App Router マッピング

| 現在のルート（React Router） | 移行先（Next.js App Router） | レンダリング |
|---------------------------|---------------------------|-----------|
| `/` | `app/page.tsx` | SSG |
| `/products` | `app/(marketing)/products/page.tsx` | SSG/ISR |
| `/product/:id` | `app/(marketing)/products/[id]/page.tsx` | SSG |
| `/search` | `app/(marketing)/search/page.tsx` | SSR |
| `/category/:categoryId` | `app/(marketing)/category/[categoryId]/page.tsx` | SSG |
| `/login` | `app/(auth)/login/page.tsx` | SSR |
| `/signup` | `app/(auth)/signup/page.tsx` | SSR |
| `/forgot-password` | `app/(auth)/forgot-password/page.tsx` | SSR |
| `/password-reset-sent` | `app/(auth)/password-reset-sent/page.tsx` | SSR |
| `/reset-password` | `app/(auth)/reset-password/page.tsx` | SSR |
| `/cart` | `app/(shop)/cart/page.tsx` | CSR |
| `/checkout` | `app/(shop)/checkout/page.tsx` | SSR |
| `/order-complete` | `app/(shop)/order-complete/page.tsx` | SSR |
| `/mypage` | `app/(protected)/mypage/page.tsx` | SSR |
| `/order-history` | `app/(protected)/order-history/page.tsx` | SSR |
| `/favorites` | `app/(protected)/favorites/page.tsx` | SSR |
| `/coming-soon` | `app/coming-soon/page.tsx` | SSG |
| `/terms` | `app/terms/page.tsx` | SSG |
| `/privacy` | `app/privacy/page.tsx` | SSG |

### レンダリング戦略の選定理由

- **SSG（Static Site Generation）**: ビルド時に生成
  - トップページ、利用規約、プライバシーポリシー
  - 商品一覧（ISR併用で定期更新）
  - 商品詳細（全商品を事前生成）

- **SSR（Server-Side Rendering）**: リクエスト毎に生成
  - 検索ページ（クエリパラメータに依存）
  - 認証ページ（セッション情報必要）
  - マイページ、注文履歴（ユーザー固有データ）

- **CSR（Client-Side Rendering）**: クライアントで生成
  - カートページ（リアルタイム更新、SEO不要）

### 動的ルート実装例

#### app/(marketing)/products/[id]/page.tsx

```typescript
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductDetail from '@/components/product/ProductDetail';
import { getProduct, getAllProducts } from '@/lib/api';

interface Props {
  params: { id: string };
}

// メタデータ生成（SEO）
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.id);

  if (!product) {
    return {
      title: '商品が見つかりません',
    };
  }

  return {
    title: `${product.name} - ${product.brand} | smartsample`,
    description: product.description,
    openGraph: {
      title: `${product.name} - ${product.brand}`,
      description: product.description,
      images: [product.images[0]],
      type: 'product',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} - ${product.brand}`,
      description: product.description,
      images: [product.images[0]],
    },
  };
}

// 静的パス生成（SSG）
export async function generateStaticParams() {
  const products = await getAllProducts();

  return products.map((product) => ({
    id: product.id,
  }));
}

// ページコンポーネント
export default async function ProductPage({ params }: Props) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
```

---

## 7. SEO強化戦略

### Metadata API 実装

Next.js 13+ では、`generateMetadata` 関数でメタデータを動的生成できます。

#### 実装例: トップページ（app/page.tsx）

```typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'smartsample - オフィス用品・文具のECサイト',
  description: 'オフィス用品から文具まで、豊富な品揃えのECサイト。高品質な商品をお手頃価格で提供します。送料無料キャンペーン実施中。',
  keywords: ['オフィス用品', '文具', 'EC', '通販', 'smartsample'],
  openGraph: {
    type: 'website',
    url: 'https://smartsample.example.com/',
    title: 'smartsample - オフィス用品・文具のECサイト',
    description: 'オフィス用品から文具まで、豊富な品揃えのECサイト。',
    images: [
      {
        url: 'https://smartsample.example.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'smartsample',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'smartsample - オフィス用品・文具のECサイト',
    description: 'オフィス用品から文具まで、豊富な品揃えのECサイト。',
    images: ['https://smartsample.example.com/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  return (
    <main>
      {/* ページコンテンツ */}
    </main>
  );
}
```

### 構造化データ（JSON-LD）

Next.js では、`script` タグで JSON-LD を直接埋め込めます。

```typescript
export default function ProductPage({ product }: { product: Product }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images,
    description: product.description,
    sku: product.code,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    offers: {
      '@type': 'Offer',
      url: `https://smartsample.example.com/products/${product.id}`,
      priceCurrency: 'JPY',
      price: product.price,
      availability: product.stock > 0
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetail product={product} />
    </>
  );
}
```

### サイトマップ生成

Next.js では、`app/sitemap.ts` で自動生成できます。

```typescript
import { MetadataRoute } from 'next';
import { getAllProducts } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProducts();

  const productUrls = products.map((product) => ({
    url: `https://smartsample.example.com/products/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  return [
    {
      url: 'https://smartsample.example.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://smartsample.example.com/products',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...productUrls,
    {
      url: 'https://smartsample.example.com/terms',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: 'https://smartsample.example.com/privacy',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];
}
```

### robots.txt 生成

```typescript
// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/mypage/', '/order-history/', '/favorites/', '/checkout/', '/cart/'],
    },
    sitemap: 'https://smartsample.example.com/sitemap.xml',
  };
}
```

---

## 8. 段階的実装計画

### Phase 1: プロジェクトセットアップ（1-2日）

#### タスク

1. **Next.js プロジェクト作成**
   ```bash
   npx create-next-app@latest smartsample-nextjs --typescript --tailwind --app --src-dir
   cd smartsample-nextjs
   ```

2. **依存関係インストール**
   ```bash
   npm install zustand react-hot-toast swiper
   npm install -D @types/node
   ```

3. **設定ファイル作成**
   - `next.config.js`: 画像ドメイン設定、BEM対応
   - `tsconfig.json`: パスエイリアス設定
   - `tailwind.config.ts`: 既存のTailwind設定移行

4. **ディレクトリ構造準備**
   - `src/app/` ルート構造作成
   - `src/components/` フォルダ構造作成
   - `src/types/` 型定義ファイル準備

#### 完了基準

- ✅ プロジェクトビルド成功
- ✅ 開発サーバー起動成功
- ✅ Tailwind CSS 動作確認

---

### Phase 2: 型定義・共通機能移行（2-3日）

#### タスク

1. **型定義作成**
   - `types/product.ts`
   - `types/user.ts`
   - `types/cart.ts`
   - `types/order.ts`
   - `types/index.ts`

2. **Zustand ストア TypeScript化**
   - `store/useAuthStore.ts`
   - `store/useCartStore.ts`
   - `store/useFavoritesStore.ts`

3. **カスタムフック TypeScript化**
   - `hooks/useDebounce.ts`
   - `hooks/useSearch.ts`
   - `hooks/useFilters.ts`
   - `hooks/usePagination.ts`
   - `hooks/usePostalCode.ts`
   - `hooks/useFormPersist.ts`
   - `hooks/useKeyboardNavigation.ts`

4. **UIコンポーネント TypeScript化**
   - `components/ui/Button.tsx`
   - `components/ui/Input.tsx`
   - `components/ui/Select.tsx`
   - `components/ui/Checkbox.tsx`
   - `components/ui/Badge.tsx`
   - `components/ui/Modal.tsx`
   - `components/ui/Loading.tsx`

5. **レイアウトコンポーネント TypeScript化**
   - `components/layout/Header.tsx`
   - `components/layout/Footer.tsx`
   - `components/layout/SimpleHeader.tsx`
   - `components/layout/SimpleFooter.tsx`
   - `components/layout/Sidebar.tsx`

#### 完了基準

- ✅ 全型定義作成完了
- ✅ Zustand ストア動作確認
- ✅ カスタムフック動作確認
- ✅ UIコンポーネント Storybook 確認（オプション）

---

### Phase 3: ページ移行（5-7日）

#### 3-1. 公開ページ（2日）

**優先度: 高**

- `app/page.tsx` - トップページ（SSG）
- `app/(marketing)/products/page.tsx` - 商品一覧（SSG + ISR）
- `app/(marketing)/products/[id]/page.tsx` - 商品詳細（SSG）
- `app/(marketing)/search/page.tsx` - 検索（SSR）
- `app/(marketing)/category/[categoryId]/page.tsx` - カテゴリ（SSG）

**作業内容**:
- 既存JSXコンポーネントをTSXに変換
- `generateMetadata` 実装
- 構造化データ（JSON-LD）追加
- `generateStaticParams` 実装（動的ルート）

#### 3-2. 認証ページ（1日）

- `app/(auth)/login/page.tsx` - ログイン（SSR）
- `app/(auth)/signup/page.tsx` - サインアップ（SSR）
- `app/(auth)/forgot-password/page.tsx` - パスワード忘れ（SSR）
- `app/(auth)/password-reset-sent/page.tsx` - メール送信完了（SSR）
- `app/(auth)/reset-password/page.tsx` - パスワード再設定（SSR）

**作業内容**:
- フォームバリデーションロジック移行
- エラーハンドリング実装
- `noindex` メタタグ設定

#### 3-3. 購入フロー（2日）

- `app/(shop)/cart/page.tsx` - カート（CSR）
- `app/(shop)/checkout/page.tsx` - チェックアウト（SSR）
- `app/(shop)/order-complete/page.tsx` - 注文完了（SSR）

**作業内容**:
- Zustand カートストア連携
- フォーム永続化（localStorage）
- 郵便番号API連携
- クーポン適用ロジック
- 注文データ構造化データ生成

#### 3-4. 保護ページ（1日）

- `app/(protected)/mypage/page.tsx` - マイページ（SSR）
- `app/(protected)/order-history/page.tsx` - 注文履歴（SSR）
- `app/(protected)/favorites/page.tsx` - お気に入り（SSR）

**作業内容**:
- 認証チェックミドルウェア実装
- `ProtectedRoute` ロジック移行
- ユーザーデータ取得

#### 3-5. その他ページ（0.5日）

- `app/coming-soon/page.tsx` - Coming Soon（SSG）
- `app/terms/page.tsx` - 利用規約（SSG）
- `app/privacy/page.tsx` - プライバシーポリシー（SSG）
- `app/not-found.tsx` - 404ページ
- `app/error.tsx` - エラーページ

#### 完了基準

- ✅ 全17ページ移行完了
- ✅ ルーティング動作確認
- ✅ SEOタグ設定完了
- ✅ 認証フロー動作確認

---

### Phase 4: SEO・パフォーマンス最適化（2-3日）

#### タスク

1. **メタデータ最適化**
   - 全ページ `generateMetadata` 実装
   - OGタグ、Twitterカード設定
   - canonical URL 設定

2. **構造化データ最適化**
   - WebSite スキーマ（トップページ）
   - Organization スキーマ（会社情報）
   - Product スキーマ（商品詳細）
   - BreadcrumbList スキーマ（全ページ）
   - ItemList スキーマ（商品一覧）
   - Order スキーマ（注文完了）

3. **画像最適化**
   - `next/image` コンポーネント使用
   - 画像サイズ最適化
   - WebP自動変換
   - レスポンシブ画像設定

4. **パフォーマンス最適化**
   - コード分割最適化
   - 動的インポート活用
   - バンドルサイズ削減
   - Core Web Vitals 計測

5. **サイトマップ・robots.txt**
   - `app/sitemap.ts` 実装
   - `app/robots.ts` 実装
   - 動的サイトマップ生成

#### 完了基準

- ✅ Lighthouse SEO スコア 95+
- ✅ Lighthouse Performance スコア 90+
- ✅ Google 構造化データテストツール エラーなし
- ✅ サイトマップ生成成功

---

### Phase 5: テスト・デバッグ（2-3日）

#### タスク

1. **機能テスト**
   - 全ページ手動テスト
   - ルーティングテスト
   - フォーム送信テスト
   - 認証フローテスト
   - カート操作テスト

2. **SEOテスト**
   - メタタグ検証（各ページ）
   - 構造化データ検証
   - OGタグ検証（Facebook Debugger）
   - Twitterカード検証（Twitter Card Validator）
   - robots.txt 検証
   - サイトマップ検証

3. **パフォーマンステスト**
   - Lighthouse 計測（全ページ）
   - Core Web Vitals 計測
   - バンドルサイズ確認
   - 画像最適化確認

4. **アクセシビリティテスト**
   - キーボードナビゲーション確認
   - スクリーンリーダーテスト
   - ARIA属性確認
   - カラーコントラスト確認

5. **ブラウザ互換性テスト**
   - Chrome
   - Safari
   - Firefox
   - Edge
   - モバイルブラウザ

6. **型安全性確認**
   - `npm run type-check` エラーなし
   - ESLint エラーなし

#### 完了基準

- ✅ 全機能動作確認完了
- ✅ SEOタグ検証完了
- ✅ パフォーマンス基準達成
- ✅ アクセシビリティ基準達成
- ✅ 型エラーなし

---

## 9. 依存関係の変更

### 削除する依存関係

| パッケージ | 理由 |
|-----------|------|
| `vite` | Next.js に置き換え |
| `@vitejs/plugin-react` | Next.js に置き換え |
| `react-router-dom` | App Router に置き換え |
| `react-helmet-async` | Metadata API に置き換え |

### 追加する依存関係

| パッケージ | バージョン | 用途 |
|-----------|----------|------|
| `next` | `^15.0.0` | フレームワーク |
| `typescript` | `^5.3.0` | 型安全性 |
| `@types/react` | `^19.0.0` | React型定義 |
| `@types/react-dom` | `^19.0.0` | ReactDOM型定義 |
| `@types/node` | `^20.0.0` | Node.js型定義 |

### 継続使用する依存関係

| パッケージ | バージョン | 用途 |
|-----------|----------|------|
| `react` | `^19.1.1` | UIライブラリ |
| `react-dom` | `^19.1.1` | DOM操作 |
| `zustand` | `^5.0.8` | 状態管理 |
| `react-hot-toast` | `^2.6.0` | トースト通知 |
| `swiper` | `^12.0.2` | スライダー |
| `tailwindcss` | `^3.4.0` | CSSフレームワーク |

### package.json 例

```json
{
  "name": "smartsample-nextjs",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "react-hot-toast": "^2.6.0",
    "swiper": "^12.0.2",
    "zustand": "^5.0.8"
  },
  "devDependencies": {
    "@types/node": "^20.10.0",
    "@types/react": "^19.1.16",
    "@types/react-dom": "^19.1.9",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.55.0",
    "eslint-config-next": "^15.0.0",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.3.3"
  }
}
```

---

## 10. テスト戦略

### 型チェック

TypeScript コンパイラで型エラーを検出します。

```bash
npm run type-check
```

### ESLint

Next.js 推奨設定で静的解析します。

```bash
npm run lint
```

### 単体テスト（オプション）

Jest + React Testing Library でコンポーネントテストを実施します。

```bash
npm install -D jest @testing-library/react @testing-library/jest-dom
npm run test
```

### E2Eテスト（オプション）

Playwright でブラウザテストを実施します。

```bash
npm install -D @playwright/test
npx playwright test
```

### SEO検証ツール

- **Google 構造化データテストツール**: https://search.google.com/test/rich-results
- **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator
- **Lighthouse**: Chrome DevTools

### パフォーマンス測定

- **Lighthouse**: Chrome DevTools
- **WebPageTest**: https://www.webpagetest.org/
- **Next.js Speed Insights**: Vercelデプロイ時に自動計測

---

## 11. リスクと対策

### リスク1: Zustand の Next.js 互換性

**リスク**: Zustand がサーバーコンポーネントで使えない可能性

**対策**:
- クライアントコンポーネント（`'use client'`）で Zustand を使用
- サーバーコンポーネントでは、props でデータを渡す
- 必要に応じて、Next.js の Server Actions を活用

### リスク2: BEM クラス名の肥大化

**リスク**: Next.js のコード分割で BEM クラスが重複する可能性

**対策**:
- Tailwind CSS の `@apply` ディレクティブ活用
- CSS Modules との併用検討
- コンポーネント単位でスタイル分離

### リスク3: 画像パスの変更

**リスク**: `public/` 配下の画像パスが変わる可能性

**対策**:
- `next/image` の `src` プロパティは `/img/...` で指定
- 相対パスではなく絶対パス（`/` から始まる）を使用

### リスク4: TypeScript 学習コスト

**リスク**: チームに TypeScript 経験者が少ない場合、開発速度低下

**対策**:
- 段階的に型定義を強化（最初は `any` 許容）
- ESLint + TypeScript で自動修正
- ペアプログラミングで知識共有

### リスク5: SSR/SSG の挙動理解

**リスク**: サーバーコンポーネント・クライアントコンポーネントの使い分けが難しい

**対策**:
- Next.js 公式ドキュメント熟読
- 最初は SSR（デフォルト）で実装し、必要に応じて CSR に変更
- `'use client'` ディレクティブの使い方をマスター

---

## まとめ

この移行計画に従うことで、以下のメリットが得られます:

✅ **SEO大幅向上**: サーバーサイドでメタタグ・構造化データ生成
✅ **初期表示高速化**: HTMLが完成した状態で配信（SSR/SSG）
✅ **型安全性**: TypeScriptによる開発時エラー検出
✅ **開発体験向上**: IDEの補完・リファクタリング機能強化
✅ **画像最適化**: 自動WebP変換、レスポンシブ画像生成
✅ **コード分割**: 自動的な最適化

**実装期間**: 12-18日（フルタイム換算）

**次のアクションアイテム**:
1. ステークホルダーへの計画共有
2. 移行スケジュール調整
3. Phase 1 着手（プロジェクトセットアップ）

---

**更新履歴**:
- 2025-10-05: 初版作成
