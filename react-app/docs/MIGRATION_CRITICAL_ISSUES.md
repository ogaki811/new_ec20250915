# Next.js 移行における重要課題と解決策

**作成日**: 2025年10月5日
**重要度**: ⚠️ 高（移行前に必読）

---

## 概要

現在のプロジェクトを詳細に分析した結果、移行計画書では**不十分な説明**や**見落としていた重要な技術的課題**が発見されました。

このドキュメントでは、**移行時に必ず直面する問題**とその**具体的な解決策**を記載します。

---

## 🚨 重大な課題

### 1. localStorage の SSR 対応（⚠️ 最重要）

#### 問題

現在のプロジェクトは **localStorage を大量に使用**:

```javascript
// useCartStore.js - Line 275
persist(
  (set, get) => ({ ... }),
  { name: 'cart-storage' } // localStorage に保存
)

// useAuthStore.js - Line 37
persist(
  (set, get) => ({ ... }),
  { name: 'auth-storage' } // localStorage に保存
)

// useFormPersist.js - Line 11-13
const stored = localStorage.getItem(storageKey);
localStorage.setItem(storageKey, JSON.stringify(debouncedFormData));
```

**Next.js の SSR では `window` オブジェクトが存在しないため、`localStorage` を直接使うとエラーが発生します。**

```
ReferenceError: localStorage is not defined
```

#### 解決策

**方法1: Zustand Persist の SSR 対応（推奨）**

Zustand の `persist` ミドルウェアは SSR に対応していますが、適切な設定が必要です。

```typescript
// src/store/useCartStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  // ...
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => set({ items: [...get().items, item] }),
      // ...
    }),
    {
      name: 'cart-storage',
      // SSR 対応: クライアントでのみ localStorage を使用
      storage: createJSONStorage(() => {
        if (typeof window !== 'undefined') {
          return window.localStorage;
        }
        // サーバーサイドでは何もしない（ダミーストレージ）
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
    }
  )
);

export default useCartStore;
```

**方法2: ハイドレーション完了後に Zustand を初期化**

```typescript
// src/components/providers/StoreProvider.tsx
'use client';

import { useEffect, useState } from 'react';

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // クライアントサイドでのみ実行
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    // SSR 時は初期状態で表示
    return <>{children}</>;
  }

  return <>{children}</>;
}
```

```typescript
// src/app/layout.tsx
import { StoreProvider } from '@/components/providers/StoreProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
```

**方法3: useFormPersist の SSR 対応**

```typescript
// src/hooks/useFormPersist.ts
import { useEffect, useState } from 'react';
import { useDebounce } from './useDebounce';

export function useFormPersist<T>(storageKey: string, initialData: T) {
  const [formData, setFormData] = useState<T>(initialData);
  const [isClient, setIsClient] = useState(false);
  const debouncedFormData = useDebounce(formData, 500);

  // クライアントサイドでのみ localStorage にアクセス
  useEffect(() => {
    setIsClient(true);

    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(storageKey);
        if (stored) {
          setFormData(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Failed to load form data:', error);
      }
    }
  }, [storageKey]);

  // 自動保存
  useEffect(() => {
    if (!isClient) return;

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(storageKey, JSON.stringify(debouncedFormData));
      } catch (error) {
        console.error('Failed to save form data:', error);
      }
    }
  }, [debouncedFormData, storageKey, isClient]);

  const clearStorage = () => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(storageKey);
      } catch (error) {
        console.error('Failed to clear form data:', error);
      }
    }
  };

  return { formData, setFormData, clearStorage };
}
```

**重要**: 全てのコンポーネントで `'use client'` ディレクティブを追加

```typescript
// src/pages/Cart.tsx
'use client';

import useCartStore from '@/store/useCartStore';

export default function Cart() {
  const items = useCartStore((state) => state.items);
  // ...
}
```

---

### 2. ハイドレーションエラーの回避（⚠️ 重要）

#### 問題

SSR で生成された HTML とクライアントでの初回レンダリング結果が異なると、**ハイドレーションエラー**が発生します。

```
Error: Hydration failed because the initial UI does not match what was rendered on the server.
```

localStorage からデータを読み込むコンポーネントは、この問題に直面します。

#### 解決策

**パターン1: マウント後にのみ表示**

```typescript
'use client';

import { useEffect, useState } from 'react';
import useCartStore from '@/store/useCartStore';

export default function CartBadge() {
  const [mounted, setMounted] = useState(false);
  const itemCount = useCartStore((state) => state.getItemCount());

  useEffect(() => {
    setMounted(true);
  }, []);

  // SSR 時は何も表示しない
  if (!mounted) {
    return <div className="w-6 h-6" />; // スケルトン表示
  }

  return (
    <div className="cart-badge">
      {itemCount > 0 && <span>{itemCount}</span>}
    </div>
  );
}
```

**パターン2: Suspense でラップ**

```typescript
import { Suspense } from 'react';

export default function Header() {
  return (
    <header>
      {/* ... */}
      <Suspense fallback={<div className="w-6 h-6" />}>
        <CartBadge />
      </Suspense>
    </header>
  );
}
```

---

### 3. 認証ミドルウェアの実装（⚠️ 重要）

#### 問題

現在の `ProtectedRoute` コンポーネントは、Next.js では使用できません。

```jsx
// 現在の実装（React Router）
function ProtectedRoute({ children }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
```

Next.js では、**ミドルウェア**で認証チェックを行う必要があります。

#### 解決策

**Step 1: ミドルウェアファイルの作成**

```typescript
// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 保護されたルート
  const protectedRoutes = ['/mypage', '/order-history', '/favorites'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtectedRoute) {
    // Cookie から認証情報を取得
    const authToken = request.cookies.get('auth-token')?.value;

    if (!authToken) {
      // 未ログインの場合はログインページへリダイレクト
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('from', pathname); // リダイレクト元を保存
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// ミドルウェアを適用するパス
export const config = {
  matcher: ['/mypage/:path*', '/order-history/:path*', '/favorites/:path*'],
};
```

**Step 2: 認証情報を Cookie に保存（localStorage → Cookie）**

localStorage は SSR で使えないため、認証情報は **Cookie** に保存します。

```typescript
// src/store/useAuthStore.ts
'use client';

import { create } from 'zustand';
import Cookies from 'js-cookie';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: (userData) => {
    // Cookie に保存（7日間有効）
    Cookies.set('auth-token', 'dummy-token', { expires: 7 });
    Cookies.set('user', JSON.stringify(userData), { expires: 7 });

    set({
      user: userData,
      isAuthenticated: true,
    });
  },

  logout: () => {
    // Cookie を削除
    Cookies.remove('auth-token');
    Cookies.remove('user');

    set({
      user: null,
      isAuthenticated: false,
    });
  },
}));

export default useAuthStore;
```

**Step 3: 初期化時に Cookie から復元**

```typescript
// src/components/providers/AuthProvider.tsx
'use client';

import { useEffect } from 'react';
import Cookies from 'js-cookie';
import useAuthStore from '@/store/useAuthStore';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { login } = useAuthStore();

  useEffect(() => {
    // Cookie から認証情報を復元
    const authToken = Cookies.get('auth-token');
    const userStr = Cookies.get('user');

    if (authToken && userStr) {
      try {
        const user = JSON.parse(userStr);
        login(user);
      } catch (error) {
        console.error('Failed to restore auth:', error);
      }
    }
  }, [login]);

  return <>{children}</>;
}
```

```typescript
// src/app/layout.tsx
import { AuthProvider } from '@/components/providers/AuthProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
```

**必要な依存関係**:

```bash
npm install js-cookie
npm install -D @types/js-cookie
```

---

## ⚠️ 重要な課題

### 4. Server Actions の活用

#### 説明

Next.js 15 では、**Server Actions** を使ってサーバーサイドでデータ処理ができます。

フォーム送信や API 呼び出しを、クライアント JavaScript なしで実行できます。

#### 実装例: ログインフォーム

```typescript
// src/app/(auth)/login/actions.ts
'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // ここで実際の認証処理（API呼び出しなど）
  // デモ用の簡易実装
  if (email && password) {
    const userData = {
      email,
      name: '山田 太郎',
    };

    // Cookie に保存
    cookies().set('auth-token', 'dummy-token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7日間
    });

    cookies().set('user', JSON.stringify(userData), {
      maxAge: 60 * 60 * 24 * 7,
    });

    // マイページへリダイレクト
    redirect('/mypage');
  }

  return { error: 'ログインに失敗しました' };
}
```

```typescript
// src/app/(auth)/login/page.tsx
import { loginAction } from './actions';

export default function LoginPage() {
  return (
    <form action={loginAction}>
      <input type="email" name="email" required />
      <input type="password" name="password" required />
      <button type="submit">ログイン</button>
    </form>
  );
}
```

**メリット**:
- JavaScript 無効でも動作
- SEO フレンドリー
- セキュリティ向上（httpOnly Cookie）

---

### 5. データフェッチのパターン

#### SSG（Static Site Generation）- 商品一覧・詳細

```typescript
// src/app/(marketing)/products/[id]/page.tsx
import { notFound } from 'next/navigation';
import { getProduct, getAllProducts } from '@/lib/api';

// 静的パス生成（ビルド時に全商品ページ生成）
export async function generateStaticParams() {
  const products = await getAllProducts();

  return products.map((product) => ({
    id: product.id,
  }));
}

// ページコンポーネント（サーバーコンポーネント）
export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
```

#### SSR（Server-Side Rendering）- 検索ページ

```typescript
// src/app/(marketing)/search/page.tsx
import { searchProducts } from '@/lib/api';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string; category?: string };
}) {
  const { q, category } = searchParams;

  // サーバーサイドで検索実行
  const results = await searchProducts({ query: q, category });

  return (
    <div>
      <h1>検索結果: {q}</h1>
      <ProductGrid products={results} />
    </div>
  );
}
```

#### CSR（Client-Side Rendering）- カートページ

```typescript
// src/app/(shop)/cart/page.tsx
'use client';

import useCartStore from '@/store/useCartStore';

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <div>
      {items.map((item) => (
        <CartItem key={item.id} item={item} onRemove={removeItem} />
      ))}
    </div>
  );
}
```

---

### 6. 画像パスの確認

#### 問題

現在の画像パス: `/img/product/sample.jpg`

Next.js では、`public/` 配下のファイルは `/` でアクセスできます。

#### 確認事項

```
public/
├── img/
│   ├── mainbanner/
│   │   ├── banner1.jpg
│   │   └── ...
│   └── product/
│       ├── sample.jpg
│       └── ...
└── favicon.ico
```

**画像参照**:

```tsx
import Image from 'next/image';

// ✅ 正しい
<Image src="/img/product/sample.jpg" alt="商品" width={800} height={600} />

// ❌ 間違い
<Image src="img/product/sample.jpg" alt="商品" width={800} height={600} />
<Image src="./img/product/sample.jpg" alt="商品" width={800} height={600} />
```

**確認コマンド**:

```bash
ls -R public/img
```

---

### 7. 環境変数の設定

Next.js では、環境変数を `.env.local` に記載します。

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://smartsample.example.com
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

**使用例**:

```typescript
// クライアント・サーバー両方で使える（NEXT_PUBLIC_ プレフィックス）
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

// サーバーサイドのみ（プレフィックスなし）
const apiSecret = process.env.API_SECRET;
```

---

### 8. エラーハンドリング

#### エラーバウンダリの移行

Next.js では、`error.tsx` でエラーをキャッチできます。

```typescript
// src/app/error.tsx
'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="error-page">
      <h2>エラーが発生しました</h2>
      <p>{error.message}</p>
      <button onClick={reset}>もう一度試す</button>
    </div>
  );
}
```

#### 404ページ

```typescript
// src/app/not-found.tsx
export default function NotFound() {
  return (
    <div className="not-found-page">
      <h1>404</h1>
      <p>ページが見つかりません</p>
      <a href="/">トップページへ戻る</a>
    </div>
  );
}
```

---

## 📋 移行時のチェックリスト

### 必須対応

- [ ] Zustand persist を SSR 対応版に変更
- [ ] useFormPersist を SSR 対応版に変更
- [ ] 全ての localStorage アクセスを `typeof window !== 'undefined'` でガード
- [ ] 認証情報を Cookie に移行
- [ ] middleware.ts で認証チェックを実装
- [ ] ハイドレーションエラーを回避（mounted 状態チェック）
- [ ] 全てのクライアントコンポーネントに `'use client'` 追加
- [ ] 画像パスを確認（`/img/...` 形式）
- [ ] 環境変数を `.env.local` に設定

### 推奨対応

- [ ] Server Actions でフォーム処理を実装
- [ ] エラーバウンダリ（error.tsx）を実装
- [ ] 404ページ（not-found.tsx）を実装
- [ ] Loading UI（loading.tsx）を実装
- [ ] API Routes を実装（現在はダミーデータ）

---

## まとめ

これらの課題を事前に理解し、適切な対策を講じることで、**スムーズな移行**が可能になります。

**特に重要**: localStorage の SSR 対応とハイドレーションエラーの回避は、**移行初日から直面する問題**です。

**次のステップ**: 各課題の解決策をコピーして、Phase 2（共通機能移行）で実装してください。

---

**関連ドキュメント**:
- [NEXTJS_MIGRATION_PLAN.md](./NEXTJS_MIGRATION_PLAN.md) - 全体計画
- [MIGRATION_QUICK_START.md](./MIGRATION_QUICK_START.md) - クイックスタート
- [ARCHITECTURE_COMPARISON.md](./ARCHITECTURE_COMPARISON.md) - アーキテクチャ比較
