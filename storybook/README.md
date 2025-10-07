# Orchestra デザインシステム

**プロジェクト**: Orchestra Design System for Maestro Headless Commerce
**バージョン**: 1.0.0
**作成日**: 2025-10-07

---

## 概要

**Orchestra（オーケストラ）**は、アトミックデザインの原則に基づいて構築されたデザインシステムです。

**Maestro（マエストロ）**は、このOrchestraデザインシステムを使用して構築されるNext.js 15ベースのヘッドレスコマースプラットフォームです。

このStorybookは、Orchestraデザインシステムのコンポーネントライブラリを可視化・管理するための環境です。

## 特徴

- **完全独立プロジェクト**: Next.jsプロジェクトとは別の独立したディレクトリ構造
- **アトミックデザイン準拠**: Atoms → Molecules → Organisms の階層構造
- **Next.js統合**: next/image, next/linkなどのNext.js機能に対応
- **Tailwind CSS**: Next.jsプロジェクトのTailwind設定を共有
- **Zustandモック**: 状態管理のモックDecoratorを提供

## ディレクトリ構造

```
storybook/
├── .storybook/                    # Storybook設定
│   ├── main.ts                    # メイン設定
│   ├── preview.ts                 # プレビュー設定
│   ├── manager.ts                 # マネージャー設定
│   └── decorators/
│       └── StoreDecorator.tsx     # Zustandモック
│
├── stories/                       # Stories
│   ├── Introduction.mdx           # デザインシステム概要
│   ├── DesignTokens.mdx           # デザイントークン
│   │
│   ├── atoms/                     # Atoms Stories（11コンポーネント）
│   │   ├── Button.stories.tsx
│   │   ├── Input.stories.tsx
│   │   └── ...
│   │
│   ├── molecules/                 # Molecules Stories（4コンポーネント）
│   │   ├── Breadcrumb.stories.tsx
│   │   ├── Pagination.stories.tsx
│   │   └── ...
│   │
│   ├── organisms/                 # Organisms Stories（10コンポーネント）
│   │   ├── ProductCard.stories.tsx
│   │   ├── Header.stories.tsx
│   │   └── ...
│   │
│   └── templates/                 # Templates Stories（将来）
│       └── README.mdx
│
├── package.json                   # 依存関係
├── tsconfig.json                  # TypeScript設定
└── README.md                      # このファイル
```

## セットアップ

### 前提条件

- Node.js 20以上
- `smartsample-nextjs`プロジェクトが同じ階層に存在すること

```
ec_Design/
├── smartsample-nextjs/    # Next.jsプロジェクト
└── storybook/             # このプロジェクト
```

### インストール

```bash
cd storybook
npm install
```

### 開発サーバー起動

```bash
npm run storybook
```

ブラウザで http://localhost:6006 が開きます。

### ビルド

```bash
npm run build-storybook
```

静的ファイルが `storybook-static/` に生成されます。

## コンポーネントimport方法

Storybookから`smartsample-nextjs`のコンポーネントをimportする際は、パスエイリアスを使用します。

```typescript
// stories/atoms/Button.stories.tsx
import Button from '@/components/ui/Button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
} satisfies Meta<typeof Button>;
```

**パスエイリアス設定**:
- `@/components/*` → `../smartsample-nextjs/src/components/*`
- `@/app/*` → `../smartsample-nextjs/src/app/*`

設定は `.storybook/main.ts` の `webpackFinal` で定義されています。

## Story作成ルール

### ファイル命名規則

```
stories/
├── atoms/ComponentName.stories.tsx
├── molecules/ComponentName.stories.tsx
└── organisms/ComponentName.stories.tsx
```

### Storyテンプレート

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import ComponentName from '@/components/path/ComponentName';

const meta = {
  title: 'Atoms/ComponentName',  // 階層/コンポーネント名
  component: ComponentName,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Props
  },
};
```

## 実装フェーズ

- **Phase 1**: 環境構築（Week 1）
- **Phase 2**: Atoms実装（Week 2）
- **Phase 3**: Molecules実装（Week 3）
- **Phase 4**: Organisms実装（Week 4-5）
- **Phase 5**: 高度な機能・デプロイ（Week 6）

詳細は `docs/nextjs-version/storybook/STORYBOOK_IMPLEMENTATION_PLAN.md` を参照。

## アクセシビリティ目標

- **Atoms**: a11yスコア 90点以上
- **Molecules**: a11yスコア 85点以上
- **Organisms**: a11yスコア 80点以上

## 開発コマンド

```bash
# 開発サーバー起動
npm run storybook

# ビルド
npm run build-storybook

# 型チェック（今後追加）
npm run type-check

# Lintチェック（今後追加）
npm run lint
```

## トラブルシューティング

### コンポーネントがimportできない

パスエイリアスが正しく設定されているか確認してください。
`.storybook/main.ts` の `webpackFinal` セクションを確認。

### Tailwind CSSが適用されない

`.storybook/preview.ts` で `globals.css` が正しくimportされているか確認してください。

```typescript
import '../../smartsample-nextjs/src/app/globals.css';
```

### Zustandの状態管理が動作しない

`StoreDecorator.tsx` を使用してモックストアを注入してください。

```typescript
import { withMockStore } from '../../.storybook/decorators/StoreDecorator';

const meta = {
  decorators: [withMockStore],
  // ...
};
```

## 参考リンク

- [Storybook公式ドキュメント](https://storybook.js.org/docs)
- [Storybook for Next.js](https://storybook.js.org/docs/get-started/frameworks/nextjs)
- [アトミックデザイン](https://bradfrost.com/blog/post/atomic-web-design/)
- [プロジェクト実装計画](../docs/nextjs-version/storybook/STORYBOOK_IMPLEMENTATION_PLAN.md)

## ライセンス

プロジェクト内部使用

---

**管理者**: プロジェクトチーム
**最終更新**: 2025-10-07
