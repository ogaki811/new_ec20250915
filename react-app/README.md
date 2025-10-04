# ECサイト - React/Next.js版

完全なECサイトのReact/Next.js実装プロジェクト。SSR対応、Atomic Design、Tailwind CSSを採用。

## 📁 プロジェクト構造

```
react-app/
├── docs/                    # 📚 計画・設計ドキュメント（16個）
│   ├── README.md           # ドキュメント総括・目次
│   ├── PLAN_REVIEW.md      # 計画全体レビュー
│   ├── SCREEN_TRANSITION.md # 画面遷移図
│   └── ... (他13個のドキュメント)
├── src/                     # ソースコード（実装予定）
│   ├── app/                # Next.js App Router
│   ├── components/         # Atomic Designコンポーネント
│   ├── lib/               # ユーティリティ
│   └── types/             # TypeScript型定義
├── public/                  # 静的ファイル
├── package.json
├── next.config.js
└── tailwind.config.ts
```

## 🚀 クイックスタート

### 1. プロジェクトセットアップ

```bash
# Next.jsプロジェクト作成（まだ実行していない場合）
npx create-next-app@latest next-app --typescript --tailwind --app --src-dir --import-alias "@/*"

# ディレクトリ移動
cd next-app

# 依存関係インストール
npm install swiper react-hook-form @heroicons/react
```

### 2. 開発サーバー起動

```bash
npm run dev
```

ブラウザで http://localhost:3000 を開く

### 3. ビルド

```bash
npm run build
npm run start
```

## 📚 ドキュメント

すべての計画・設計ドキュメントは `/docs` フォルダにあります。

### 📖 主要ドキュメント

| ドキュメント | 説明 |
|------------|------|
| [README.md](./docs/README.md) | ドキュメント総括・全体像 |
| [PLAN_REVIEW.md](./docs/PLAN_REVIEW.md) | 計画全体レビュー・最終確認 |
| [SCREEN_TRANSITION.md](./docs/SCREEN_TRANSITION.md) | 画面遷移図・ユーザーフロー |
| [DESIGN_SYSTEM_PLAN.md](./docs/DESIGN_SYSTEM_PLAN.md) | Atomic Design設計 |
| [SSR_MIGRATION_PLAN.md](./docs/SSR_MIGRATION_PLAN.md) | Next.js移行計画 |
| [PROGRESS.md](./docs/PROGRESS.md) | 実装進捗管理 |

### 📂 全ドキュメント一覧

<details>
<summary>クリックで展開</summary>

1. **README.md** - ドキュメント総括
2. **PLAN_REVIEW.md** - 計画全体レビュー ⭐ NEW
3. **SCREEN_TRANSITION.md** - 画面遷移図 ⭐ NEW
4. **DESIGN_SYSTEM_PLAN.md** - Atomic Design設計
5. **CSS_TO_TAILWIND_MAPPING.md** - CSS→Tailwind変換
6. **IMPLEMENTATION_STRATEGY.md** - 実装戦略
7. **UNIFIED_COMPONENTS.md** - 統一コンポーネント設計
8. **BUTTON_VARIANTS.md** - ボタンバリエーション（8種）
9. **ADDITIONAL_PAGES_PLAN.md** - Cart/Login/Signup計画
10. **SLIDER_COMPONENT_PLAN.md** - スライダー実装計画
11. **SLIDER_VISUAL_SPEC.md** - スライダービジュアル仕様
12. **IMPLEMENTATION_REVIEW.md** - 整合性チェック
13. **SSR_MIGRATION_PLAN.md** - Next.js移行計画
14. **PROGRESS.md** - 実装進捗管理
15. **RESPONSIVE_DESIGN_DETAILS.md** - レスポンシブ詳細
16. **REQUIREMENTS_UPDATE.md** - 追加要件対応状況

</details>

## 🎯 プロジェクト概要

### 主要機能

- ✅ **SSR対応** - Next.js 14 (App Router)
- ✅ **レスポンシブ** - モバイル・タブレット・デスクトップ完全対応
- ✅ **デザインシステム** - Atomic Design + Tailwind CSS
- ✅ **画面遷移** - 全フロー設計完了
- ✅ **コンポーネント化** - 26個の再利用可能コンポーネント

### 技術スタック

| 項目 | 技術 |
|-----|------|
| **フレームワーク** | Next.js 14 (App Router) |
| **言語** | TypeScript |
| **スタイリング** | Tailwind CSS |
| **スライダー** | Swiper.js |
| **フォーム** | React Hook Form |
| **アイコン** | @heroicons/react |
| **状態管理** | Zustand（推奨） |
| **認証** | NextAuth.js（推奨） |

## 🏗️ アーキテクチャ

### Atomic Design階層

```
Atoms (6個)
  └─ Button, Badge, Input, Select, Icon, QuantitySelector

Molecules (9個)
  └─ ProductCard, OrderCard, CartItem, CartSummary, etc.

Organisms (9個)
  └─ ProductGrid, HeroSlider, Header, Footer, Sidebar, etc.

Templates (2個)
  └─ PageLayout, SidebarLayout

Pages (7個 実装 + 7個 今後)
  └─ Home, Login, Signup, MyPage, Cart, etc.
```

## 🎨 主要機能

### 1. HeroSlider（メインスライダー）

- **3枚同時表示** - デスクトップで中央フル + 左右半分見切れ
- **中央フォーカス** - 中央スライドを拡大・強調
- **レスポンシブ** - モバイル1枚・タブレット1.5枚・デスクトップ2.2枚
- **細めの高さ** - 250px-400px（デバイスに応じて）

### 2. 商品グリッド

- **おすすめ商品** - デスクトップで横6列（compactサイズ）
- **通常商品** - デスクトップで横4列
- **レスポンシブ** - モバイル2列・タブレット3-4列

### 3. ヘッダー

- **横幅100%** - 画面幅いっぱいに表示
- **Sticky固定** - スクロール時にページ上部に固定
- **レスポンシブ** - モバイルはハンバーガーメニュー

## 📊 実装進捗

詳細は [PROGRESS.md](./docs/PROGRESS.md) を参照

```
計画フェーズ:   ████████████████████ 100% (完了)
実装フェーズ:   ░░░░░░░░░░░░░░░░░░░░   0% (未開始)
```

## 🎯 実装スケジュール

| Week | フェーズ | タスク |
|------|---------|--------|
| **Week 1** | Atoms | Button, Badge, Input, Select, Icon, QuantitySelector |
| **Week 2** | Molecules | ProductCard, CartItem, CartSummary等（9個） |
| **Week 3** | Organisms | ProductGrid, HeroSlider, Header, Footer等（9個） |
| **Week 4** | Pages | Home, MyPage, Cart, Login, Signup等（7個） |
| **Week 5-6** | 拡張機能 | 状態管理、認証、追加ページ |
| **Week 7-8** | 最適化 | Lighthouse、SEO、テスト |

## 📋 要件一覧

### 第1回追加要件（7項目）

1. ✅ おすすめ商品を小さく表示
2. ✅ 横6列表示
3. ✅ ヘッダー共通化
4. ✅ SSRで実装
5. ✅ 進捗記録管理
6. ✅ ヘッダー横幅100%
7. ✅ レスポンシブ対応

### 第2回追加要件（5項目 - スライダー）

8. ✅ スライダー縦幅細め
9. ✅ 3枚同時表示
10. ✅ 中央の画像フル表示
11. ✅ 左右の画像半分見切れ
12. ✅ スライダーレスポンシブ対応

**全12項目 計画完了** ✅

## 🔗 画面遷移

主要なユーザーフローは [SCREEN_TRANSITION.md](./docs/SCREEN_TRANSITION.md) を参照

```
Home → 商品詳細 → Cart → Checkout → OrderComplete
  │
  └→ Login/Signup → MyPage → OrderHistory/Favorites
```

## 📈 品質目標

- [ ] Lighthouse Performance: 90点以上
- [ ] Lighthouse SEO: 90点以上
- [ ] Lighthouse Accessibility: 90点以上
- [ ] 独自CSS使用率: < 10%
- [ ] コンポーネント重複率: < 5%

## 📝 ライセンス

このプロジェクトは学習・開発用です。

## 🤝 貢献

1. ドキュメントを確認: `/docs/README.md`
2. 実装ガイドに従う: `/docs/IMPLEMENTATION_STRATEGY.md`
3. 進捗を更新: `/docs/PROGRESS.md`

## 📞 サポート

質問や問題がある場合は、`/docs` フォルダの関連ドキュメントを参照してください。

---

**プロジェクトステータス:** 計画完了・実装準備完了 ✅

**最終更新:** 2025-10-04

**ドキュメント数:** 16個

**コンポーネント総数:** 26個

**要件対応:** 全12項目完了
