# Next.js + TypeScript 移行 クイックスタート

**📅 作成日**: 2025年10月5日
**⏱️ 所要時間**: 12-18日
**📄 詳細計画**: [NEXTJS_MIGRATION_PLAN.md](./NEXTJS_MIGRATION_PLAN.md)

---

## 🎯 移行の目的

現在の**CSR（Vite + React）**から**SSR/SSG（Next.js + TypeScript）**に移行し、以下を実現:

✅ **SEO大幅向上** - サーバーサイドでメタタグ生成、検索エンジン最適化
✅ **初期表示高速化** - HTMLが完成した状態で配信、LCP改善
✅ **型安全性** - TypeScriptによるバグ削減
✅ **開発体験向上** - IDE補完、リファクタリング支援

---

## 📊 現状 vs 移行後

| 項目 | 現在 | 移行後 |
|-----|------|--------|
| フレームワーク | Vite + React | Next.js 15 |
| 言語 | JavaScript | TypeScript |
| レンダリング | CSR | SSR/SSG/ISR |
| SEO | react-helmet-async（制限あり） | Metadata API（完全対応） |
| ルーティング | React Router | App Router |
| 画像最適化 | カスタムコンポーネント | next/image（自動） |

---

## 🚀 5フェーズ実装計画

### Phase 1: プロジェクトセットアップ（1-2日）

```bash
# プロジェクト作成
npx create-next-app@latest smartsample-nextjs \
  --typescript --tailwind --app --src-dir

cd smartsample-nextjs

# 依存関係追加
npm install zustand react-hot-toast swiper
npm install -D @types/node

# 開発サーバー起動
npm run dev
```

**成果物**: 基本的なNext.jsプロジェクト構造

---

### Phase 2: 共通機能移行（2-3日）

**作業内容**:
1. 型定義作成（`src/types/`）
   - `product.ts` - 商品型
   - `user.ts` - ユーザー型
   - `cart.ts` - カート型
   - `order.ts` - 注文型

2. Zustand ストア TypeScript化
   - `useAuthStore.ts`
   - `useCartStore.ts`
   - `useFavoritesStore.ts`

3. カスタムフック TypeScript化
   - `useDebounce.ts`, `useSearch.ts`, `useFilters.ts` など

4. UIコンポーネント TypeScript化
   - `Button.tsx`, `Input.tsx`, `Select.tsx` など

5. レイアウトコンポーネント TypeScript化
   - `Header.tsx`, `Footer.tsx`, `Sidebar.tsx` など

**成果物**: 型安全な共通機能・コンポーネント

---

### Phase 3: ページ移行（5-7日）

#### 優先順位

**1️⃣ 公開ページ（2日）**
- `app/page.tsx` - トップページ（SSG）
- `app/(marketing)/products/page.tsx` - 商品一覧（SSG + ISR）
- `app/(marketing)/products/[id]/page.tsx` - 商品詳細（SSG）
- `app/(marketing)/search/page.tsx` - 検索（SSR）

**2️⃣ 認証ページ（1日）**
- `app/(auth)/login/page.tsx` - ログイン
- `app/(auth)/signup/page.tsx` - サインアップ
- その他認証フロー

**3️⃣ 購入フロー（2日）**
- `app/(shop)/cart/page.tsx` - カート
- `app/(shop)/checkout/page.tsx` - チェックアウト
- `app/(shop)/order-complete/page.tsx` - 注文完了

**4️⃣ 保護ページ（1日）**
- `app/(protected)/mypage/page.tsx` - マイページ
- `app/(protected)/order-history/page.tsx` - 注文履歴
- `app/(protected)/favorites/page.tsx` - お気に入り

**成果物**: 全17ページの移行完了

---

### Phase 4: SEO・パフォーマンス最適化（2-3日）

**チェックリスト**:

- [ ] 全ページに `generateMetadata` 実装
- [ ] OGタグ・Twitterカード設定
- [ ] 構造化データ（JSON-LD）実装
  - [ ] WebSite スキーマ（トップページ）
  - [ ] Product スキーマ（商品詳細）
  - [ ] BreadcrumbList スキーマ（全ページ）
  - [ ] ItemList スキーマ（商品一覧）
  - [ ] Order スキーマ（注文完了）
- [ ] `next/image` で画像最適化
- [ ] `app/sitemap.ts` 実装
- [ ] `app/robots.ts` 実装
- [ ] Lighthouse SEO スコア 95+
- [ ] Lighthouse Performance スコア 90+

**成果物**: SEO完全最適化、高速ページ

---

### Phase 5: テスト・デバッグ（2-3日）

**検証項目**:

✅ **機能テスト**
- 全ページ動作確認
- フォーム送信
- 認証フロー
- カート操作

✅ **SEOテスト**
- [Google 構造化データテストツール](https://search.google.com/test/rich-results)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)

✅ **パフォーマンステスト**
- Lighthouse（全ページ）
- Core Web Vitals
- バンドルサイズ

✅ **型チェック**
```bash
npm run type-check  # エラーなし
npm run lint        # エラーなし
```

**成果物**: 本番デプロイ可能な品質

---

## 📁 ファイル構造（Before → After）

### Before（現在）

```
react-app/
├── src/
│   ├── App.jsx                 # ルーター設定
│   ├── pages/                  # 17ページ
│   ├── components/             # 36コンポーネント
│   ├── hooks/                  # 7フック
│   └── store/                  # 3ストア
└── index.html                  # SPAエントリ
```

### After（移行後）

```
smartsample-nextjs/
├── src/
│   ├── app/                    # App Router（ルーティング）
│   │   ├── layout.tsx          # ルートレイアウト
│   │   ├── page.tsx            # トップページ
│   │   ├── (marketing)/        # 公開ページグループ
│   │   ├── (auth)/             # 認証ページグループ
│   │   ├── (shop)/             # 購入フローグループ
│   │   ├── (protected)/        # ログイン必須グループ
│   │   ├── sitemap.ts          # サイトマップ生成
│   │   └── robots.ts           # robots.txt生成
│   ├── components/             # UIコンポーネント
│   │   ├── layout/             # Header, Footer等
│   │   ├── product/            # ProductCard等
│   │   └── ui/                 # Button, Input等
│   ├── types/                  # TypeScript型定義
│   │   ├── product.ts
│   │   ├── user.ts
│   │   ├── cart.ts
│   │   └── order.ts
│   ├── hooks/                  # カスタムフック
│   ├── store/                  # Zustandストア
│   └── lib/                    # ユーティリティ
├── public/                     # 静的ファイル
├── next.config.js              # Next.js設定
└── tsconfig.json               # TypeScript設定
```

---

## 💻 主要な実装例

### 1. メタデータAPI（SEO）

```typescript
// app/(marketing)/products/[id]/page.tsx

import { Metadata } from 'next';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.id);

  return {
    title: `${product.name} - ${product.brand} | smartsample`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.images[0]],
      type: 'product',
    },
  };
}
```

### 2. 構造化データ（JSON-LD）

```typescript
export default function ProductPage({ product }: { product: Product }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'JPY',
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

### 3. 静的サイト生成（SSG）

```typescript
// 商品詳細ページを全て事前生成
export async function generateStaticParams() {
  const products = await getAllProducts();

  return products.map((product) => ({
    id: product.id,
  }));
}
```

### 4. サーバーコンポーネント vs クライアントコンポーネント

```typescript
// サーバーコンポーネント（デフォルト）
export default async function ProductList() {
  const products = await getProducts(); // サーバーでデータ取得
  return <div>{products.map(...)}</div>;
}

// クライアントコンポーネント（状態管理が必要な場合）
'use client';

export default function Cart() {
  const { items } = useCartStore(); // Zustand
  return <div>{items.map(...)}</div>;
}
```

---

## ⚠️ 注意点・リスク

| リスク | 対策 |
|-------|------|
| Zustandがサーバーコンポーネントで使えない | `'use client'` で明示的にクライアントコンポーネント化 |
| TypeScript学習コスト | 最初は `any` 許容、段階的に型を強化 |
| SSR/SSGの理解不足 | 公式ドキュメント熟読、最初は SSR で統一 |
| 画像パス変更 | `/img/...` 形式で絶対パス指定 |

---

## 📚 参考リンク

- [Next.js 公式ドキュメント](https://nextjs.org/docs)
- [Next.js App Router 入門](https://nextjs.org/docs/app)
- [TypeScript ハンドブック](https://www.typescriptlang.org/docs/)
- [Metadata API リファレンス](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [next/image 最適化](https://nextjs.org/docs/app/building-your-application/optimizing/images)

---

## 🎬 次のアクション

1. **ステークホルダー承認**
   - 移行計画共有
   - スケジュール調整

2. **Phase 1 着手**
   ```bash
   npx create-next-app@latest smartsample-nextjs \
     --typescript --tailwind --app --src-dir
   ```

3. **週次進捗報告**
   - 各Phase完了時に報告
   - リスク早期発見・対応

---

**📖 詳細な実装手順は [NEXTJS_MIGRATION_PLAN.md](./NEXTJS_MIGRATION_PLAN.md) を参照してください。**
