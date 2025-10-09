# ec_Design - ECサイトデザインシステムプロジェクト

**プロジェクト名**: Orchestra Design System & Maestro Headless Commerce
**作成日**: 2025-10-07
**最終更新**: 2025-10-09

---

## 概要

このプロジェクトは、ECサイト構築のための包括的なデザインシステムとヘッドレスコマースプラットフォームです。

### プロジェクト構成

```
ec_Design/
├── html/                      # 静的HTMLプロトタイプ (Phase 1)
├── react-app/                 # React+Vite版 (Phase 2)
├── smartsample-nextjs/        # Next.js 15本番環境 (Phase 3) ✅
├── storybook/                 # Storybookコンポーネントライブラリ ✅
└── docs/                      # ドキュメント
```

### 2つの主要プロダクト

#### 1. Orchestra (オーケストラ) - デザインシステム
アトミックデザインに基づく再利用可能なUIコンポーネントライブラリ

- **場所**: `storybook/`
- **技術**: React 19 + Storybook 9.1 + Tailwind CSS 4.0
- **URL**: http://localhost:6006/

#### 2. Maestro (マエストロ) - ヘッドレスコマース
Orchestraを使用して構築されたNext.js 15ベースのECプラットフォーム

- **場所**: `smartsample-nextjs/`
- **技術**: Next.js 15 + React 19 + TypeScript + Zustand
- **URL**: http://localhost:3000/

---

## 🚀 クイックスタート

### 前提条件

- Node.js 20以上
- npm 10以上

### Maestro (Next.js) の起動

```bash
cd smartsample-nextjs
npm install
npm run dev
```

→ http://localhost:3000/

### Orchestra (Storybook) の起動

```bash
cd storybook
npm install
npm run storybook
```

→ http://localhost:6006/

---

## 📚 ドキュメント

### 必読ドキュメント

1. **[開発ガイドライン](docs/DEVELOPMENT_GUIDELINES.md)** ⭐ 最重要
   - 要件定義プロセス
   - アトミックデザイン原則
   - コンポーネント設計ルール
   - コーディング規約

2. **[要件定義テンプレート](docs/templates/REQUIREMENTS_TEMPLATE.md)**
   - すべての開発作業で使用する要件定義書のテンプレート

### プロジェクトドキュメント

- [Storybook実装計画](docs/nextjs-version/storybook/STORYBOOK_IMPLEMENTATION_PLAN.md)
- [Storybook v9アップグレード報告](storybook/STORYBOOK_V9_UPGRADE.md)
- [Storybook README](storybook/README.md)
- [Next.js README](smartsample-nextjs/README.md)

---

## 🏗️ アトミックデザイン構造

Orchestra Design Systemは、Brad Frostのアトミックデザイン手法を採用しています。

```
Atoms (原子)         11個 ✅
  ↓
Molecules (分子)      4個 ✅
  ↓
Organisms (有機体)   10個 ✅
  ↓
Templates            5個 ✅
  ↓
Pages               8個 ✅
```

### コンポーネント一覧

#### Atoms (基本要素)
Button, Input, Checkbox, RadioButton, Select, TextArea, Badge, Tag, Rating, PriceDisplay, LoadingSpinner

#### Molecules (複合要素)
Breadcrumb, Pagination, FilterTag, SearchSort

#### Organisms (有機体)
Header, Footer, ProductCard, SearchBar, SearchFilters, ProductListItem, ProductImageGallery, ProductGrid, CartItem, CheckoutForms

#### Templates
HomePage, ProductListPage, ProductDetailPage, CartPage, CheckoutPage

---

## 🛠️ 技術スタック

### フロントエンド

| 技術 | バージョン | 用途 |
|------|-----------|------|
| React | 19.0.0 | UIライブラリ |
| Next.js | 15.5.4 | フレームワーク |
| TypeScript | 5.7 | 型安全性 |
| Tailwind CSS | 4.0 | スタイリング |
| Zustand | 5.0.8 | 状態管理 |
| Storybook | 9.1.10 | コンポーネント開発 |

### 開発ツール

- ESLint + Prettier: コード品質
- Turbopack: 高速ビルド
- React Hot Toast: 通知

---

## 📋 開発フロー

### 1. 要件定義 (必須)

すべての開発は要件定義から開始します。

```bash
# テンプレートをコピー
cp docs/templates/REQUIREMENTS_TEMPLATE.md docs/requirements/YYYY-MM-DD_機能名.md

# 要件定義書を作成
vim docs/requirements/YYYY-MM-DD_機能名.md
```

### 2. アトミックデザイン分類

コンポーネントがどの階層に属するか決定します。

```
質問1: 他のコンポーネントに依存しますか?
  NO  → Atoms
  YES → 質問2へ

質問2: Atomsのみに依存しますか?
  YES → Molecules
  NO  → 質問3へ

質問3: ビジネスロジックを持ちますか?
  YES → Organisms
  NO  → Templates
```

### 3. 実装

```bash
# コンポーネント作成
src/components/[階層]/ComponentName.tsx

# Storybook Story作成
storybook/stories/[階層]/ComponentName.stories.tsx

# 型定義
src/types/componentName.ts
```

### 4. テストとレビュー

```bash
# 型チェック
npm run type-check

# Lint
npm run lint

# ビルド
npm run build
```

---

## 📁 ディレクトリ構造

```
ec_Design/
│
├── docs/                          # ドキュメント
│   ├── DEVELOPMENT_GUIDELINES.md  # 開発ガイドライン ⭐
│   ├── requirements/              # 要件定義書
│   ├── templates/                 # テンプレート
│   └── nextjs-version/            # Next.js関連ドキュメント
│
├── smartsample-nextjs/            # Next.js本番環境
│   ├── src/
│   │   ├── app/                   # Pages (App Router)
│   │   ├── components/            # コンポーネント
│   │   │   ├── ui/                # Atoms
│   │   │   ├── common/            # Molecules
│   │   │   ├── layout/            # Organisms (Layout)
│   │   │   ├── product/           # Organisms (Product)
│   │   │   ├── cart/              # Organisms (Cart)
│   │   │   └── checkout/          # Organisms (Checkout)
│   │   ├── hooks/                 # カスタムフック
│   │   ├── store/                 # Zustand Store
│   │   ├── types/                 # 型定義
│   │   ├── utils/                 # ユーティリティ
│   │   └── data/                  # サンプルデータ
│   ├── public/                    # 静的ファイル
│   └── package.json
│
└── storybook/                     # Storybook
    ├── .storybook/                # Storybook設定
    ├── stories/                   # Stories
    │   ├── atoms/                 # Atoms Stories
    │   ├── molecules/             # Molecules Stories
    │   ├── organisms/             # Organisms Stories
    │   └── templates/             # Templates Stories
    └── package.json
```

---

## ✅ 開発チェックリスト

新機能開発時の必須チェック項目:

### 開発開始前
- [ ] 要件定義書を作成した (`docs/requirements/`)
- [ ] アトミックデザインの階層を決定した
- [ ] 依存コンポーネントを確認した
- [ ] 設計レビューを受けた

### 開発中
- [ ] TypeScript型定義を行った
- [ ] BEM命名規則に従った
- [ ] アクセシビリティ対応を実施した
- [ ] エラーハンドリングを実装した

### 開発完了時
- [ ] Storybook Storyを作成した
- [ ] TypeScriptエラー 0件
- [ ] ESLint警告 0件
- [ ] コードレビューを受けた
- [ ] ドキュメントを更新した

---

## 🎯 アクセシビリティ目標

| 階層 | Lighthouse Accessibility スコア |
|------|--------------------------------|
| Atoms | 90点以上 |
| Molecules | 85点以上 |
| Organisms | 80点以上 |

### 必須対応項目

- キーボード操作のみで全機能が利用可能
- スクリーンリーダー対応 (ARIA属性)
- カラーコントラスト比 4.5:1以上
- フォーカスインジケーター表示

---

## 🔄 ブランチ戦略

```
main                  # 本番環境
  └── feature/*       # 機能開発
  └── fix/*           # バグ修正
  └── docs/*          # ドキュメント更新
```

### コミットメッセージ規約

```
feat: 新機能追加
fix: バグ修正
docs: ドキュメント更新
style: コードスタイル変更
refactor: リファクタリング
test: テスト追加
chore: ビルド・設定変更
```

---

## 📊 プロジェクト進捗

### Phase 1-5 完了 ✅

- [x] Storybook環境構築
- [x] Atoms実装 (11コンポーネント)
- [x] Molecules実装 (4コンポーネント)
- [x] Organisms実装 (10コンポーネント)
- [x] Templates実装 (5テンプレート)
- [x] Storybook 9.1アップグレード

### Next Steps

- [ ] ユニットテスト実装
- [ ] E2Eテスト実装
- [ ] パフォーマンス最適化
- [ ] 管理画面開発

---

## 🤝 コントリビューション

### 開発参加方法

1. **開発ガイドラインを熟読**
   - [docs/DEVELOPMENT_GUIDELINES.md](docs/DEVELOPMENT_GUIDELINES.md)

2. **要件定義書を作成**
   - テンプレート: [docs/templates/REQUIREMENTS_TEMPLATE.md](docs/templates/REQUIREMENTS_TEMPLATE.md)

3. **ブランチを作成**
   ```bash
   git checkout -b feature/機能名
   ```

4. **実装**
   - アトミックデザイン原則に従う
   - TypeScript型定義を徹底
   - Storybook Storyを作成

5. **レビュー依頼**
   - Pull Request作成
   - チェックリスト確認

---

## 📞 サポート

質問や問題がある場合:

1. [開発ガイドライン](docs/DEVELOPMENT_GUIDELINES.md)を確認
2. [要件定義テンプレート](docs/templates/REQUIREMENTS_TEMPLATE.md)を参照
3. プロジェクトリーダーに連絡

---

## 📝 ライセンス

プロジェクト内部使用

---

**最終更新**: 2025-10-09
**管理者**: プロジェクトチーム
