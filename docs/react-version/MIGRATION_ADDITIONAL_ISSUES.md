# Next.js 移行 - 追加の重要課題

**作成日**: 2025年10月5日
**重要度**: ⚠️ 高（再検証で発見）

---

## 概要

移行計画の再検証により、**新たな重要課題**が発見されました。

このドキュメントは **[MIGRATION_CRITICAL_ISSUES.md](./MIGRATION_CRITICAL_ISSUES.md) の補足**です。

---

## 🚨 新たに発見された課題

### 1. Swiper.js のSSR非対応（⚠️ 重要）

#### 問題

**Swiper.js は React Server Components をサポートしていません。**

Next.js 15 の App Router ではデフォルトで Server Components が使用されるため、そのままでは動作しません。

```tsx
// ❌ エラーが発生
// Server Component (default)
import { Swiper, SwiperSlide } from 'swiper/react';

export default function HeroSlider() {
  return <Swiper>...</Swiper>; // Error: requires Client Component
}
```

**エラーメッセージ**:
```
It only works in a Client Component but none of its parents are marked with 'use client'
```

#### 解決策

**HeroSlider コンポーネントに `'use client'` を追加**

```tsx
// ✅ 正しい実装
'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function HeroSlider({ slides }) {
  return (
    <section className="ec-hero-slider">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        centeredSlides={true}
        slidesPerView="auto"
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        className="hero-slider"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <a href={slide.link}>
              <img src={slide.image} alt={slide.alt} />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
```

**なぜ Server Components で動かないか**:
- Swiper は React hooks（useEffect, useState, useRef）に依存
- ブラウザ DOM API を使用
- これらはサーバーサイドでは利用不可

**影響範囲**: HeroSlider コンポーネントのみ

---

### 2. react-hot-toast のClient Component制約（⚠️ 重要）

#### 問題

**`toast()` 関数は Client Component でのみ呼び出し可能です。**

Server Components や Server Actions から直接 `toast()` を呼ぶことはできません。

```tsx
// ❌ Server Component でエラー
export default async function ProductPage() {
  const product = await getProduct();

  if (!product) {
    toast.error('商品が見つかりません'); // Error!
    notFound();
  }

  return <ProductDetail product={product} />;
}
```

#### 解決策

**パターン1: Client Component でトーストを表示**

```tsx
// ✅ Client Component
'use client';

import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function ProductDetail({ product, error }) {
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return <div>...</div>;
}
```

**パターン2: Toaster を root layout に配置**

```tsx
// app/layout.tsx
import { Toaster } from 'react-hot-toast';

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </body>
    </html>
  );
}
```

**パターン3: カスタムフックで状態管理**

```tsx
// hooks/useToast.ts
'use client';

import { useEffect } from 'react';
import toast from 'react-hot-toast';

export function useToast(message: string | null, type: 'success' | 'error' = 'success') {
  useEffect(() => {
    if (message) {
      if (type === 'error') {
        toast.error(message);
      } else {
        toast.success(message);
      }
    }
  }, [message, type]);
}
```

**影響範囲**: Login, Signup, Cart, Checkout等のトースト表示箇所

---

### 3. `<style jsx>` の互換性（⚠️ 注意）

#### 問題

現在の HeroSlider コンポーネントは **`<style jsx>`** を使用しています。

```jsx
// 現在の実装
<style jsx>{`
  .hero-slider {
    padding: 0;
    height: 280px;
  }
`}</style>
```

**Next.js では `<style jsx>` は styled-jsx パッケージが必要です。**

#### 解決策

**方法1: Tailwind CSS + CSS Modules に移行（推奨）**

```tsx
// styles/HeroSlider.module.css
.heroSlider {
  padding: 0;
  height: 280px;
}

.slide {
  height: 280px;
  width: 900px !important;
}

// HeroSlider.tsx
import styles from './HeroSlider.module.css';

export default function HeroSlider() {
  return (
    <Swiper className={styles.heroSlider}>
      <SwiperSlide className={styles.slide}>
        ...
      </SwiperSlide>
    </Swiper>
  );
}
```

**方法2: styled-jsx をインストール（非推奨）**

```bash
npm install styled-jsx
```

```js
// next.config.js
module.exports = {
  compiler: {
    styledJsx: true,
  },
};
```

**推奨**: CSS Modules または Tailwind の `@apply` を使用

---

### 4. Cookie 認証のセキュリティ強化（⚠️ 重要）

#### 問題

[MIGRATION_CRITICAL_ISSUES.md](./MIGRATION_CRITICAL_ISSUES.md) で提案した Cookie 実装に、**セキュリティ設定が不足**しています。

特に：
- `SameSite` 属性が未設定（CSRF 対策不足）
- `path` 属性が未設定
- Cookie の暗号化なし

#### 解決策

**改善版: セキュアな Cookie 設定**

```typescript
// src/app/(auth)/login/actions.ts
'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // 認証処理（実際にはAPI呼び出し）
  if (email && password) {
    const userData = {
      email,
      name: '山田 太郎',
    };

    // ✅ セキュアな Cookie 設定
    cookies().set('auth-token', 'dummy-token', {
      httpOnly: true,           // JavaScript からアクセス不可（XSS 対策）
      secure: process.env.NODE_ENV === 'production', // HTTPS のみ
      sameSite: 'lax',          // CSRF 対策
      path: '/',                // 全パスで有効
      maxAge: 60 * 60 * 24 * 7, // 7日間
    });

    cookies().set('user', JSON.stringify(userData), {
      httpOnly: false,          // クライアントから読み取り可能（表示用）
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    redirect('/mypage');
  }

  return { error: 'ログインに失敗しました' };
}
```

**セキュリティ設定の説明**:

| 属性 | 値 | 理由 |
|-----|---|------|
| `httpOnly` | `true` (auth-token) | XSS攻撃からトークンを保護 |
| `secure` | `true` (本番環境) | HTTPS通信のみで送信 |
| `sameSite` | `'lax'` | CSRF攻撃を防止、通常のリンク遷移では送信 |
| `path` | `'/'` | 全ページで Cookie 有効 |
| `maxAge` | `7日間` | 自動ログアウト |

**CSRF 対策の追加（推奨）**:

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // CSRF トークンチェック（POST リクエスト時）
  if (request.method === 'POST') {
    const csrfToken = request.headers.get('x-csrf-token');
    const cookieCsrfToken = request.cookies.get('csrf-token')?.value;

    if (csrfToken !== cookieCsrfToken) {
      return NextResponse.json(
        { error: 'Invalid CSRF token' },
        { status: 403 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};
```

---

### 5. 動的ルートのビルド時間（⚠️ 注意）

#### 問題

`generateStaticParams` で全商品ページを事前生成する場合、**ビルド時間が大幅に増加**する可能性があります。

```typescript
// 商品が1000個ある場合
export async function generateStaticParams() {
  const products = await getAllProducts(); // 1000個

  return products.map((product) => ({
    id: product.id,
  }));
}
```

**ビルド時間の予測**:
- 100商品: ~30秒
- 500商品: ~2分
- 1000商品: ~5分

#### 解決策

**方法1: ISR（Incremental Static Regeneration）を使用**

```typescript
// app/(marketing)/products/[id]/page.tsx

// 最初のビルドで生成する商品を限定
export async function generateStaticParams() {
  const products = await getPopularProducts(); // 人気商品のみ（例: 50個）

  return products.map((product) => ({
    id: product.id,
  }));
}

// その他の商品はアクセス時に生成 + キャッシュ
export const dynamicParams = true; // デフォルト: true

// 1時間ごとに再検証（データ更新を反映）
export const revalidate = 3600; // 秒
```

**方法2: On-Demand ISR（推奨）**

```typescript
// app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { productId } = await request.json();

  // 特定の商品ページのみ再生成
  revalidatePath(`/products/${productId}`);

  return NextResponse.json({ revalidated: true });
}
```

**商品データ更新時に API を叩く**:
```bash
curl -X POST https://yoursite.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"productId": "123"}'
```

---

### 6. 画像最適化の注意点（⚠️ 注意）

#### 問題

`next/image` を使う際、**外部ドメインの画像**は設定が必要です。

現在の実装では画像が `/img/product/...` にあるため問題ありませんが、将来的に CDN を使う場合は設定が必要です。

#### 解決策

**next.config.js で外部ドメインを許可**

```js
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.smartsample.com',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
```

**ローカル画像の最適化**:

```tsx
// ✅ ローカル画像（public/配下）
import Image from 'next/image';

<Image
  src="/img/product/sample.jpg"
  alt="商品画像"
  width={800}
  height={600}
  priority // LCP 改善（above the fold の画像）
/>

// ✅ CDN画像
<Image
  src="https://cdn.smartsample.com/products/sample.jpg"
  alt="商品画像"
  width={800}
  height={600}
/>
```

---

## 📋 更新されたチェックリスト

### Phase 2 で追加すべきタスク

- [ ] **HeroSlider に `'use client'` 追加**
- [ ] **`<style jsx>` を CSS Modules に移行**
- [ ] **react-hot-toast を root layout に配置**
- [ ] **toast() 呼び出しを Client Component に移動**
- [ ] **Cookie 認証のセキュリティ設定追加**
  - [ ] `httpOnly: true`
  - [ ] `secure: true` (本番)
  - [ ] `sameSite: 'lax'`
- [ ] **ISR 設定追加（商品詳細ページ）**
- [ ] **next/image の設定確認**

---

## 📊 影響範囲まとめ

| 課題 | 影響コンポーネント | 対応難易度 | 所要時間 |
|-----|-----------------|-----------|---------|
| Swiper SSR | HeroSlider | ⭐ (低) | 5分 |
| react-hot-toast | Login, Signup, Cart等 | ⭐⭐ (中) | 30分 |
| `<style jsx>` | HeroSlider | ⭐⭐ (中) | 1時間 |
| Cookie セキュリティ | 認証全般 | ⭐⭐⭐ (中) | 2時間 |
| ISR 設定 | 商品詳細 | ⭐⭐ (中) | 1時間 |
| 画像最適化 | 全画像 | ⭐ (低) | 30分 |

**合計追加時間**: 約5時間（Phase 2 で実施）

---

## 🎯 更新された所要時間

| Phase | 当初見積 | 再評価（前回） | **最終見積** |
|-------|---------|--------------|-------------|
| Phase 1 | 1-2日 | 1-2日 | **1-2日** |
| Phase 2 | 2-3日 | 3-4日 | **4-5日** |
| Phase 3 | 5-7日 | 5-7日 | **5-7日** |
| Phase 4 | 2-3日 | 2-3日 | **2-3日** |
| Phase 5 | 2-3日 | 2-3日 | **2-3日** |
| **合計** | 12-18日 | 13-19日 | **14-20日** |

**変更点**: Phase 2 が +1日（追加課題対応で +5時間）

---

## まとめ

### 新たに発見された重要課題

1. ✅ **Swiper.js**: `'use client'` 必須
2. ✅ **react-hot-toast**: Client Component で使用
3. ✅ **`<style jsx>`**: CSS Modules に移行
4. ✅ **Cookie セキュリティ**: `httpOnly`, `secure`, `sameSite` 設定
5. ✅ **ISR 設定**: ビルド時間短縮
6. ✅ **画像最適化**: 外部ドメイン設定

### 対応方針

- Phase 2 で全て対応
- 所要時間: +1日（合計 14-20日）
- リスクレベル: 🟡 中（対処方法明確）

---

**関連ドキュメント**:
- [MIGRATION_CRITICAL_ISSUES.md](./MIGRATION_CRITICAL_ISSUES.md) - 最重要課題
- [MIGRATION_REVIEW_REPORT.md](./MIGRATION_REVIEW_REPORT.md) - 検証レポート
- [NEXTJS_MIGRATION_PLAN.md](./NEXTJS_MIGRATION_PLAN.md) - 全体計画

**作成日**: 2025年10月5日
**ステータス**: ✅ 追加課題特定完了
