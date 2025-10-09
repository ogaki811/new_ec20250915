# Tailwind CSS v4 移行修正計画書

**作成日**: 2025-10-09
**緊急度**: 高
**影響範囲**: 全ページのスタイリング

---

## 📋 問題の概要

### 現状
- Tailwind CSS v4.1.14がインストールされているが、設定がv3形式のまま
- `globals.css`で旧形式の`@tailwind`ディレクティブを使用
- 結果として**CSSが全く適用されていない状態**

### 原因
Tailwind CSS v4では、従来の`@tailwind`ディレクティブが廃止され、`@import "tailwindcss"`形式に変更されました。

---

## 🎯 修正目標

1. ✅ Tailwind CSS v4の正しい設定に移行
2. ✅ 既存のカスタムCSS（アニメーション、input統一スタイル）を保持
3. ✅ ゼロダウンタイムでの移行
4. ✅ Orchestra/Maestroアーキテクチャとの互換性維持

---

## 🔍 診断結果

### 現在の設定

#### ❌ globals.css（v3形式）
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### ✅ postcss.config.mjs（正しい）
```js
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

#### ❌ tailwind.config.ts（v3形式）
```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

---

## 📝 修正計画（優先度順）

### Phase 1: Tailwind CSS v4形式への移行 ⚡（最優先）

#### Task 1-1: globals.cssの更新

**変更前**:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #ffffff;
  --foreground: #171717;
}
/* ... その他のカスタムCSS ... */
```

**変更後**:
```css
@import "tailwindcss";

/* カスタムテーマ設定（Tailwind v4形式） */
@theme {
  --color-background: #ffffff;
  --color-foreground: #171717;
}

/* 既存のカスタムCSS（そのまま保持） */
:root {
  --background: #ffffff;
  --foreground: #171717;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

/* アニメーション定義（そのまま保持） */
@keyframes slideInRight { ... }
@keyframes slideOutRight { ... }
@keyframes bounceIn { ... }
@keyframes badgePop { ... }
@keyframes slideInBounce { ... }

/* Input統一スタイル（そのまま保持） */
input[type="text"],
input[type="email"],
... { ... }
```

#### Task 1-2: tailwind.config.tsの削除または最小化

Tailwind v4では、CSS内で`@theme`を使って設定するため、`tailwind.config.ts`は基本的に不要です。

**オプションA: 削除**
```bash
rm tailwind.config.ts
```

**オプションB: 最小限の設定のみ残す（推奨）**
```ts
// tailwind.config.ts（v4互換）
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};

export default config;
```

---

### Phase 2: フォント設定の移行（中優先）

#### Task 2-1: Noto Sans JP設定をCSSに移行

**globals.css に追加**:
```css
@import "tailwindcss";

/* フォント設定 */
@theme {
  --font-family-sans: var(--font-noto-sans-jp), ui-sans-serif, system-ui, sans-serif;
}
```

---

### Phase 3: カスタムカラー・スペーシングの移行（低優先）

現在のプロジェクトで追加のカスタマイズが必要な場合のみ対応。

#### globals.css に追加
```css
@theme {
  /* カスタムカラー */
  --color-primary: #3b82f6;
  --color-secondary: #8b5cf6;

  /* カスタムスペーシング */
  --spacing-18: 4.5rem;
}
```

---

## 🛠️ 実装手順

### Step 1: バックアップ

```bash
cp src/app/globals.css src/app/globals.css.backup
cp tailwind.config.ts tailwind.config.ts.backup
```

### Step 2: globals.cssの更新

```bash
# Tailwind v4形式に変更
# @tailwind → @import "tailwindcss"
```

### Step 3: 開発サーバーの再起動

```bash
# 既存プロセスを停止
pkill -f "next dev"

# 再起動
npm run dev
```

### Step 4: 動作確認

- ✅ トップページ（http://localhost:3000）
- ✅ 商品一覧（http://localhost:3000/products）
- ✅ Tailwindクラスが適用されているか
- ✅ カスタムアニメーションが動作しているか
- ✅ Input要素のスタイルが適用されているか

### Step 5: ビルドテスト

```bash
npm run build
```

エラーがないことを確認。

---

## ⚠️ リスクと対策

| リスク | 影響度 | 発生確率 | 対策 |
|--------|--------|---------|------|
| カスタムCSSが消失 | 高 | 低 | バックアップ作成、段階的移行 |
| ビルドエラー | 中 | 中 | 型チェック、ビルドテスト実施 |
| Storybook側の影響 | 中 | 低 | Orchestra側は独立しているため影響なし |
| ダークモード動作不良 | 低 | 低 | CSS変数をそのまま保持 |

---

## 📊 移行チェックリスト

### 事前準備
- [ ] バックアップ作成（globals.css, tailwind.config.ts）
- [ ] 現在の表示状態をスクリーンショット

### Phase 1: Tailwind v4移行
- [ ] globals.cssを`@import "tailwindcss"`形式に変更
- [ ] カスタムCSSを確認・保持
- [ ] tailwind.config.tsを最小化
- [ ] 開発サーバー再起動
- [ ] トップページ表示確認

### Phase 2: 動作確認
- [ ] すべてのページで表示確認
  - [ ] トップページ（/）
  - [ ] 商品一覧（/products）
  - [ ] 商品詳細（/products/[id]）
  - [ ] カート（/cart）
  - [ ] チェックアウト（/checkout）
- [ ] レスポンシブ確認（Mobile/Tablet/Desktop）
- [ ] アニメーション動作確認
- [ ] Input要素スタイル確認

### Phase 3: ビルド・デプロイ
- [ ] `npm run build` 成功
- [ ] 型チェック（`npm run type-check`）成功
- [ ] E2Eテスト実施（`npm run e2e`）
- [ ] 本番デプロイ

---

## 📚 参考資料

- [Tailwind CSS v4.0 Blog](https://tailwindcss.com/blog/tailwindcss-v4)
- [Tailwind CSS v4 Migration Guide](https://tailwindcss.com/docs/upgrade-guide)
- [Next.js + Tailwind CSS Setup](https://tailwindcss.com/docs/installation/framework-guides/nextjs)

---

## 🔄 ロールバック手順

問題が発生した場合の緊急ロールバック：

```bash
# バックアップから復元
cp src/app/globals.css.backup src/app/globals.css
cp tailwind.config.ts.backup tailwind.config.ts

# サーバー再起動
pkill -f "next dev"
npm run dev
```

---

## 📝 変更履歴

| 日付 | ステータス | 作業内容 | 担当者 |
|------|----------|---------|--------|
| 2025-10-09 | 計画作成 | 修正計画書作成 | プロジェクトチーム |
| 2025-10-09 | 実装予定 | globals.css更新 | - |
| 2025-10-09 | 実装予定 | tailwind.config.ts最小化 | - |
| 2025-10-09 | テスト予定 | 全ページ動作確認 | - |

---

**作成者**: プロジェクトチーム
**承認者**: -
**緊急連絡先**: -
