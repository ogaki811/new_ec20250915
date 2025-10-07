# Orchestra デザインシステム - Storybook導入計画書

**プロジェクト**: Orchestra Design System for Maestro Headless Commerce
**作成日**: 2025年10月7日
**更新日**: 2025年10月7日（Orchestra/Maestro命名）
**バージョン**: 5.0
**ステータス**: Phase 1完了
**ブランチ**: なし（独立プロジェクト）

---

## プロジェクト名

- **Orchestra（オーケストラ）**: デザインシステムの名称
- **Maestro（マエストロ）**: ヘッドレスコマースプラットフォームの名称

---

## 目次

1. [プロジェクト概要](#プロジェクト概要)
2. [アトミックデザインとStorybook](#アトミックデザインとstorybook)
3. [目的と期待効果](#目的と期待効果)
4. [現状分析](#現状分析)
5. [技術スタック](#技術スタック)
6. [実装フェーズ](#実装フェーズ)
7. [アトミックデザイン階層別実装計画](#アトミックデザイン階層別実装計画)
8. [成果物](#成果物)
9. [リスクと対策](#リスクと対策)
10. [スケジュール](#スケジュール)

---

## プロジェクト概要

**Orchestra（オーケストラ）**デザインシステムは、アトミックデザインの原則に基づいて構築された、体系的で再利用可能なコンポーネントライブラリです。

**Maestro（マエストロ）**ヘッドレスコマースは、Next.js 15 + TypeScript + Tailwind CSSで構築され、Orchestraデザインシステムを使用したヘッドレスコマースプラットフォームです。

このStorybookプロジェクトは、Orchestraデザインシステムのコンポーネントカタログを可視化・管理します。

### ビジョン

- **Orchestra（デザインシステム）の確立**: アトミックデザイン階層に沿った体系的なコンポーネントライブラリ
- **Maestro（プラットフォーム）の構築**: Orchestraを活用した高品質なヘッドレスコマース
- **開発効率の向上**: Atoms → Molecules → Organisms の順で段階的に開発
- **品質の保証**: 依存関係を意識した視覚的リグレッションテスト基盤
- **チーム協業**: デザイナー・開発者間の共通言語としてのStorybook

---

## アトミックデザインとStorybook

### アトミックデザイン階層とStorybookディレクトリ構造

このプロジェクトは既に `DESIGN_SYSTEM.md` でアトミックデザインの原則に基づいて設計されています。Storybookは**完全に独立したプロジェクト**として構築します。

| 階層 | 説明 | コンポーネント元ディレクトリ | Storybook配置先 | 依存関係 |
|------|------|--------------------------|----------------|---------|
| **Atoms** | 最小単位のUI | `smartsample-nextjs/src/components/ui/` | `storybook/stories/atoms/` | なし |
| **Molecules** | Atomsの組み合わせ | `smartsample-nextjs/src/components/common/` | `storybook/stories/molecules/` | Atoms |
| **Organisms** | 複雑な機能ブロック | `smartsample-nextjs/src/components/layout/`, `product/`, `home/` 等 | `storybook/stories/organisms/` | Atoms + Molecules |
| **Templates** | ページの骨格 | `smartsample-nextjs/src/app/**/layout.tsx` | `storybook/stories/templates/` | すべて |
| **Pages** | 完成したページ | `smartsample-nextjs/src/app/**/page.tsx` | （Storybook対象外） | すべて |

### ディレクトリ構造

```
ec_Design/
│
├── smartsample-nextjs/            # Next.jsプロジェクト（既存）
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/               # Atoms実装
│   │   │   ├── common/           # Molecules実装
│   │   │   ├── layout/           # Organisms実装
│   │   │   └── product/          # Organisms実装
│   │   ├── app/
│   │   └── ...
│   ├── package.json
│   └── tsconfig.json
│
└── storybook/                     # Storybook専用プロジェクト（新規作成）
    ├── .storybook/                # Storybook設定
    │   ├── main.ts
    │   ├── preview.ts
    │   ├── manager.ts
    │   └── decorators/
    │       └── StoreDecorator.tsx
    │
    ├── stories/                   # Stories配置
    │   ├── Introduction.mdx       # デザインシステム概要
    │   ├── DesignTokens.mdx       # トークン定義
    │   │
    │   ├── atoms/                 # Atoms Stories
    │   │   ├── Button.stories.tsx
    │   │   ├── Input.stories.tsx
    │   │   ├── Card.stories.tsx
    │   │   ├── Badge.stories.tsx
    │   │   ├── Checkbox.stories.tsx
    │   │   ├── Radio.stories.tsx
    │   │   ├── Select.stories.tsx
    │   │   ├── Textarea.stories.tsx
    │   │   ├── Icon.stories.tsx
    │   │   ├── Divider.stories.tsx
    │   │   ├── Loading.stories.tsx
    │   │   └── README.mdx         # Atoms設計原則
    │   │
    │   ├── molecules/             # Molecules Stories
    │   │   ├── Breadcrumb.stories.tsx
    │   │   ├── Pagination.stories.tsx
    │   │   ├── StepIndicator.stories.tsx
    │   │   ├── Modal.stories.tsx
    │   │   └── README.mdx         # Molecules設計原則
    │   │
    │   ├── organisms/             # Organisms Stories
    │   │   ├── ProductCard.stories.tsx
    │   │   ├── QuantitySelector.stories.tsx
    │   │   ├── SearchBar.stories.tsx
    │   │   ├── Header.stories.tsx
    │   │   ├── Footer.stories.tsx
    │   │   ├── MobileMenu.stories.tsx
    │   │   ├── ProductImageGallery.stories.tsx
    │   │   ├── ProductGrid.stories.tsx
    │   │   ├── CartItem.stories.tsx
    │   │   ├── CheckoutForm.stories.tsx
    │   │   └── README.mdx         # Organisms設計原則
    │   │
    │   └── templates/             # Templates Stories（Phase 5以降）
    │       └── README.mdx
    │
    ├── package.json               # Storybook専用依存関係
    ├── tsconfig.json              # TypeScript設定（Next.js継承）
    └── README.md                  # Storybookプロジェクト説明
```

### Story命名規則とimportパス

```typescript
// storybook/stories/atoms/Button.stories.tsx
import Button from '../../../smartsample-nextjs/src/components/ui/Button';

const meta = {
  title: 'Atoms/Button',  // Storybook階層表示
  component: Button,
} satisfies Meta<typeof Button>;

// storybook/stories/molecules/Breadcrumb.stories.tsx
import Breadcrumb from '../../../smartsample-nextjs/src/components/common/Breadcrumb';

const meta = {
  title: 'Molecules/Breadcrumb',
  component: Breadcrumb,
} satisfies Meta<typeof Breadcrumb>;

// storybook/stories/organisms/ProductCard.stories.tsx
import ProductCard from '../../../smartsample-nextjs/src/components/product/ProductCard';

const meta = {
  title: 'Organisms/ProductCard',
  component: ProductCard,
} satisfies Meta<typeof ProductCard>;
```

**Note**: tsconfig.jsonでパスエイリアスを設定することで、相対パスを短縮可能：

```json
// storybook/tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/components/*": ["../smartsample-nextjs/src/components/*"],
      "@/app/*": ["../smartsample-nextjs/src/app/*"]
    }
  }
}
```

---

## 目的と期待効果

### 主要目的

1. **アトミックデザイン体系の可視化**
   - 階層構造を明確に表現
   - 依存関係の理解促進
   - デザインシステムのドキュメント化

2. **段階的な開発フロー確立**
   - Atoms → Molecules → Organisms の順で実装
   - 下位層の安定後に上位層を構築
   - 依存関係による影響範囲の最小化

3. **再利用性の向上**
   - Atomsの徹底的な再利用
   - Moleculesでの組み合わせパターン確立
   - Organismsでのビジネスロジック統合

4. **品質保証とテスト**
   - 各階層での独立したテスト
   - アクセシビリティチェック（a11yアドオン）
   - 視覚的リグレッションテスト（Chromatic - Phase 5）

### 期待効果

| 指標 | 現状 | 目標 | 測定方法 |
|------|------|------|---------|
| コンポーネント開発速度 | 基準値 | 30%向上 | 開発時間計測 |
| UIバグ発見率 | 事後発見 | 事前発見80% | Storybook上での検証 |
| コンポーネント再利用率 | 不明 | Atoms 90%以上 | 使用箇所カウント |
| デザイン一貫性スコア | 目視確認 | 自動チェック90点 | a11yスコア |

---

## 現状分析

### コンポーネント構成（アトミックデザイン階層別）

```
src/components/ (合計52ファイル)

Atoms（原子）
├── ui/              (11) ← Phase 2優先
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   ├── Badge.tsx
│   ├── Checkbox.tsx
│   ├── Radio.tsx
│   ├── Select.tsx
│   ├── Textarea.tsx
│   ├── Icon.tsx
│   ├── Divider.tsx
│   └── Loading.tsx

Molecules（分子）
├── common/          (4) ← Phase 3優先
│   ├── Breadcrumb.tsx     ← Link + Text
│   ├── Pagination.tsx     ← Button + Text
│   ├── StepIndicator.tsx  ← Badge + Line
│   └── Modal.tsx          ← Card + Button

Organisms（有機体）
├── layout/          (5) ← Phase 4
│   ├── Header.tsx         ← SearchBar + Navigation + Cart
│   ├── Footer.tsx         ← Links + Text
│   ├── SimpleHeader.tsx
│   ├── SimpleFooter.tsx
│   └── MobileMenu.tsx
│
├── product/         (13) ← Phase 4優先
│   ├── ProductCard.tsx    ← Image + Badge + Button + QuantitySelector
│   ├── QuantitySelector.tsx
│   ├── ProductImageGallery.tsx
│   ├── ProductGrid.tsx
│   ├── ProductSlider.tsx
│   ├── SearchBar.tsx      ← Input + Button + Icon
│   └── ... (その他7ファイル)
│
├── home/            (2) ← Phase 4
│   ├── HeroSlider.tsx
│   └── ProductSlider.tsx
│
├── cart/            (6) ← Phase 4
├── checkout/        (5) ← Phase 4
├── search/          (3) ← Phase 4
├── favorites/       (1) ← Phase 4
├── mypage/          (1) ← Phase 4
└── order/           (1) ← Phase 4
```

### 依存関係分析

#### Atoms（依存なし）
- Button, Input, Card, Badge 等
- **特徴**: 完全に独立、他のコンポーネントに依存しない
- **Storybook対応**: 容易（モック不要）

#### Molecules（Atomsに依存）
- **Breadcrumb**: Link（Next.js） + Text
- **Pagination**: Button + Text
- **SearchBar**: Input + Button + Icon
- **特徴**: Atomsの組み合わせ、ロジックは最小限
- **Storybook対応**: 比較的容易（Atomsが完成していれば）

#### Organisms（Atoms + Molecules + 状態管理に依存）
- **ProductCard**: Badge + Button + QuantitySelector + useCartStore + useFavoritesStore
- **Header**: SearchBar + Navigation + useCartStore
- **特徴**: 複雑なビジネスロジック、状態管理依存
- **Storybook対応**: モックProvider必須

---

## 技術スタック

### Storybookバージョン

- **Storybook**: 8.x（最新安定版）
- **フレームワーク**: @storybook/nextjs
- **ビルダー**: Webpack 5（Next.js互換）

### 必須アドオン

| アドオン | 用途 | Phase |
|---------|------|-------|
| `@storybook/addon-essentials` | 基本機能セット | Phase 1 |
| `@storybook/addon-interactions` | インタラクション記録 | Phase 1 |
| `@storybook/addon-a11y` | アクセシビリティ | Phase 1 |
| `@storybook/addon-viewport` | レスポンシブ | Phase 1 |

### オプションアドオン（Phase 5以降）

- `@storybook/addon-themes`: テーマ切替
- `storybook-dark-mode`: ダークモード
- `chromatic`: ビジュアルリグレッションテスト

---

## 実装フェーズ

### 全体フロー（アトミックデザイン準拠）

```
Phase 1: 基盤構築（Week 1）
  ↓
Phase 2: Atoms（Week 2）         ← 依存なし
  ↓
Phase 3: Molecules（Week 3）     ← Atomsに依存
  ↓
Phase 4: Organisms（Week 4-5）   ← Atoms + Molecules + Storeに依存
  ↓
Phase 5: 高度な機能（Week 6）
```

**重要原則**: 下位層の完成なしに上位層は着手しない

---

## アトミックデザイン階層別実装計画

### Phase 1: 基盤構築とセットアップ（Week 1）

#### 目標
Storybook環境の構築とアトミックデザイン対応設定

#### タスク

1. **Storybookインストール**
   ```bash
   npx storybook@latest init --type nextjs
   ```

2. **ディレクトリ構造作成**
   ```bash
   mkdir -p storybook/{.storybook/decorators,stories/{atoms,molecules,organisms,templates}}
   ```

3. **設定ファイル作成**

   `storybook/.storybook/main.ts`:
   ```typescript
   import type { StorybookConfig } from '@storybook/nextjs';
   import path from 'path';

   const config: StorybookConfig = {
     stories: [
       '../stories/**/*.mdx',
       '../stories/**/*.stories.@(js|jsx|ts|tsx)',
     ],
     addons: [
       '@storybook/addon-essentials',
       '@storybook/addon-interactions',
       '@storybook/addon-a11y',
       '@storybook/addon-viewport',
     ],
     framework: '@storybook/nextjs',
     webpackFinal: async (config) => {
       // Next.jsプロジェクトへのエイリアス設定
       config.resolve = config.resolve || {};
       config.resolve.alias = {
         ...config.resolve.alias,
         '@': path.resolve(__dirname, '../../smartsample-nextjs/src'),
       };
       return config;
     },
   };

   export default config;
   ```

   `storybook/.storybook/preview.ts`:
   ```typescript
   import '../../smartsample-nextjs/src/app/globals.css'; // Tailwind CSS

   export const parameters = {
     // アトミックデザイン階層でのソート
     options: {
       storySort: {
         order: [
           'Introduction',
           'Design System',
           'Atoms',
           'Molecules',
           'Organisms',
           'Templates',
         ],
       },
     },
   };
   ```

3. **Next.js機能の設定**
   - next/image のモック
   - next/link のモック
   - next/font のモック

4. **Zustand用モックProvider作成**
   ```typescript
   // .storybook/decorators/StoreDecorator.tsx
   export const withMockStore = (Story, context) => {
     // useCartStore, useFavoritesStore等のモック
   };
   ```

5. **イントロダクションページ作成**
   ```typescript
   // stories/Introduction.stories.mdx
   # smartsample デザインシステム

   このStorybookはアトミックデザインの原則に基づいて構成されています。

   ## 階層構造
   - Atoms: 最小単位のUIコンポーネント
   - Molecules: Atomsの組み合わせ
   - Organisms: 複雑な機能ブロック
   ```

#### 成果物
- [ ] Storybook起動成功（`npm run storybook`）
- [ ] Tailwind CSSスタイル適用確認
- [ ] アトミックデザイン階層でのカテゴリ表示
- [ ] イントロダクションページ表示
- [ ] ドキュメント: `STORYBOOK_SETUP_GUIDE.md`

---

### Phase 2: Atoms（原子）の実装（Week 2）

#### 目標
11個のAtomsコンポーネントのStory完成

#### 実装原則
- **依存関係**: なし（完全に独立）
- **再利用性**: 最大化
- **バリエーション**: すべてのvariant/sizeを網羅

#### 優先度順実装計画

**Day 1-2: 最優先Atoms（P0）**

1. **Button** - 全システムの基盤
   ```typescript
   // storybook/stories/atoms/Button.stories.tsx
   import type { Meta, StoryObj } from '@storybook/react';
   import Button from '@/components/ui/Button';

   const meta = {
     title: 'Atoms/Button',
     component: Button,
     parameters: { layout: 'centered' },
     tags: ['autodocs'],
   } satisfies Meta<typeof Button>;

   export default meta;
   type Story = StoryObj<typeof meta>;

   // 5 variants
   export const Primary: Story = { args: { variant: 'primary', children: 'Primary Button' } };
   export const Secondary: Story = { args: { variant: 'secondary', children: 'Secondary Button' } };
   export const Outline: Story = { args: { variant: 'outline', children: 'Outline Button' } };
   export const Ghost: Story = { args: { variant: 'ghost', children: 'Ghost Button' } };
   export const Danger: Story = { args: { variant: 'danger', children: 'Danger Button' } };

   // 3 sizes
   export const Small: Story = { args: { size: 'sm', children: 'Small' } };
   export const Medium: Story = { args: { size: 'md', children: 'Medium' } };
   export const Large: Story = { args: { size: 'lg', children: 'Large' } };

   // States
   export const Loading: Story = { args: { loading: true, children: 'Loading...' } };
   export const Disabled: Story = { args: { disabled: true, children: 'Disabled' } };
   export const FullWidth: Story = { args: { fullWidth: true, children: 'Full Width' } };

   // All Variants Showcase
   export const AllVariants: Story = {
     render: () => (
       <div className="space-y-4">
         <Button variant="primary">Primary</Button>
         <Button variant="secondary">Secondary</Button>
         <Button variant="outline">Outline</Button>
         <Button variant="ghost">Ghost</Button>
         <Button variant="danger">Danger</Button>
       </div>
     ),
   };
   ```

2. **Input** - フォームの基盤
   - 通常、エラー、ヘルパーテキスト
   - ラベル付き/なし
   - Disabled状態
   - Full Width

**Day 3-4: 高優先度Atoms（P1）**

3. **Card** - コンテナ
4. **Badge** - ステータス表示
5. **Checkbox** - 選択UI
6. **Radio** - 選択UI
7. **Select** - ドロップダウン

**Day 5: 中低優先度Atoms（P2-P3）**

8. **Textarea** - テキスト入力
9. **Icon** - アイコン
10. **Divider** - 区切り線
11. **Loading** - ローディング

#### Storyの必須要素

各AtomのStoryには以下を含める：

1. **基本バリエーション**: すべてのvariant
2. **サイズバリエーション**: すべてのsize
3. **状態バリエーション**: default/hover/active/disabled
4. **インタラクション**: クリック、フォーカス等
5. **アクセシビリティ**: a11yアドオンでのチェック

#### 成果物
- [ ] 11個のAtomsコンポーネントStory完成
- [ ] 各コンポーネントの全バリエーション表示（合計50+ Stories）
- [ ] インタラクティブControls動作確認
- [ ] autodocs自動生成確認
- [ ] a11yスコア90点以上

---

### Phase 3: Molecules（分子）の実装（Week 3）

#### 目標
4個のMoleculesコンポーネントのStory完成

#### 実装原則
- **依存関係**: Atomsのみに依存
- **構成**: 2-3個のAtomsの組み合わせ
- **ロジック**: 最小限（表示ロジックのみ）

#### 対象コンポーネント

**Day 1-2: ナビゲーション系Molecules**

1. **Breadcrumb** (優先度: 高)
   - **構成**: Link（Next.js） + Text
   - **依存Atoms**: なし（Next.jsコンポーネント）

   ```typescript
   // storybook/stories/molecules/Breadcrumb.stories.tsx
   import type { Meta, StoryObj } from '@storybook/react';
   import Breadcrumb from '@/components/common/Breadcrumb';

   const meta = {
     title: 'Molecules/Breadcrumb',
     component: Breadcrumb,
     parameters: { layout: 'padded' },
     tags: ['autodocs'],
   } satisfies Meta<typeof Breadcrumb>;

   export default meta;
   type Story = StoryObj<typeof meta>;

   export const TwoLevels: Story = {
     args: {
       items: [
         { label: 'ホーム', href: '/' },
         { label: '商品一覧' },
       ],
     },
   };

   export const ThreeLevels: Story = {
     args: {
       items: [
         { label: 'ホーム', href: '/' },
         { label: '商品一覧', href: '/products' },
         { label: 'オフィス家具' },
       ],
     },
   };

   export const FourLevels: Story = {
     args: {
       items: [
         { label: 'ホーム', href: '/' },
         { label: '商品一覧', href: '/products' },
         { label: 'オフィス家具', href: '/products?category=furniture' },
         { label: 'オフィスチェア' },
       ],
     },
   };
   ```

2. **Pagination** (優先度: 高)
   - **構成**: Button + Text
   - **依存Atoms**: Button

   ```typescript
   export const FirstPage: Story = {
     args: { currentPage: 1, totalPages: 10 },
   };

   export const MiddlePage: Story = {
     args: { currentPage: 5, totalPages: 10 },
   };

   export const LastPage: Story = {
     args: { currentPage: 10, totalPages: 10 },
   };
   ```

**Day 3-4: UI系Molecules**

3. **StepIndicator** (優先度: 中)
   - **構成**: Badge + Line + Text
   - **依存Atoms**: Badge

   ```typescript
   export const ThreeSteps: Story = {
     args: {
       steps: ['カート', 'お客様情報', '注文確認'],
       currentStep: 1,
     },
   };
   ```

4. **Modal** (優先度: 中)
   - **構成**: Card + Button + Overlay
   - **依存Atoms**: Card, Button

   ```typescript
   export const SimpleModal: Story = {
     args: {
       isOpen: true,
       title: 'モーダルタイトル',
       children: 'モーダルの内容',
     },
   };
   ```

#### Moleculesの特別な注意点

**Next.jsコンポーネントのモック**
- `next/link`の`<Link>`コンポーネントは`.storybook/preview.tsx`でモック設定
- Storybook内でのルーティングは`@storybook/addon-links`を使用

#### 成果物
- [ ] 4個のMoleculesコンポーネントStory完成
- [ ] Atomsとの組み合わせ動作確認
- [ ] Next.js機能（Link等）のモック動作確認
- [ ] レスポンシブ表示確認（mobile/tablet/desktop）

---

### Phase 4: Organisms（有機体）の実装（Week 4-5）

#### 目標
主要Organismsコンポーネント（8-10個）のStory完成

#### 実装原則
- **依存関係**: Atoms + Molecules + 状態管理（Zustand）
- **複雑度**: 高（ビジネスロジック含む）
- **モック**: StoreProviderが必須

#### Week 4: 最優先Organisms

**Day 1-2: ProductCard（最重要）**

1. **ProductCard** (優先度: 最高)
   - **構成**: Badge + Button + QuantitySelector + Image
   - **依存**: useCartStore, useFavoritesStore
   - **モック戦略**: StoreDecoratorで状態を注入

   ```typescript
   // storybook/stories/organisms/ProductCard.stories.tsx
   import type { Meta, StoryObj } from '@storybook/react';
   import ProductCard from '@/components/product/ProductCard';
   import { withMockStore } from '../../.storybook/decorators/StoreDecorator';

   const meta = {
     title: 'Organisms/ProductCard',
     component: ProductCard,
     decorators: [withMockStore],
     parameters: { layout: 'centered' },
     tags: ['autodocs'],
   } satisfies Meta<typeof ProductCard>;

   export default meta;
   type Story = StoryObj<typeof meta>;

   const sampleProduct = {
     id: 1,
     name: 'プラス オフィスチェア',
     brand: 'PLUS',
     code: 'KC-100',
     price: 29800,
     image: '/img/product/chair-001.jpg',
     rating: 4.5,
     stock: true,
     tags: ['新着', 'おすすめ'],
   };

   export const DefaultSize: Story = {
     args: { product: sampleProduct, size: 'default' },
   };

   export const CompactSize: Story = {
     args: { product: sampleProduct, size: 'compact' },
   };

   export const LargeSize: Story = {
     args: { product: sampleProduct, size: 'large' },
   };

   export const OutOfStock: Story = {
     args: {
       product: { ...sampleProduct, stock: false },
     },
   };

   export const WithTags: Story = {
     args: {
       product: { ...sampleProduct, tags: ['セール', '新着', 'おすすめ'] },
     },
   };

   export const InFavorites: Story = {
     args: { product: sampleProduct },
     decorators: [
       (Story) => {
         // お気に入り状態のモック
         return <Story />;
       },
     ],
   };
   ```

**Day 3: QuantitySelector + SearchBar**

2. **QuantitySelector**
   - **構成**: Button + Input
   - **依存Atoms**: Button, Input

3. **SearchBar**
   - **構成**: Input + Button + Icon
   - **依存Atoms**: Input, Button, Icon

**Day 4-5: Header（最複雑）**

4. **Header** (優先度: 高、複雑度: 最高)
   - **構成**: Logo + SearchBar + Navigation + CartIcon + UserMenu
   - **依存**: useCartStore
   - **モック**: カート内商品数、ログイン状態

   ```typescript
   export const DesktopView: Story = {
     parameters: {
       viewport: { defaultViewport: 'desktop' },
     },
   };

   export const MobileView: Story = {
     parameters: {
       viewport: { defaultViewport: 'mobile' },
     },
   };

   export const WithCartItems: Story = {
     decorators: [
       (Story) => {
         // カート内に3件の商品があるモック
         return <Story />;
       },
     ],
   };

   export const UserLoggedIn: Story = {
     decorators: [
       (Story) => {
         // ログイン済み状態のモック
         return <Story />;
       },
     ],
   };
   ```

#### Week 5: その他のOrganisms

**Day 1-2: レイアウトOrganisms**

5. **Footer**
6. **MobileMenu**

**Day 3-4: 機能Organisms**

7. **ProductImageGallery**
8. **ProductGrid**
9. **CartItem**
10. **CheckoutForm**

#### Zustand依存コンポーネントのモック戦略

```typescript
// .storybook/decorators/StoreDecorator.tsx
import { create } from 'zustand';

export const withMockStore = (Story: any, context: any) => {
  // モックストアの作成
  const mockCartStore = create((set) => ({
    items: context.args.mockCartItems || [],
    addItem: (item) => console.log('Mock: Add item', item),
    removeItem: (id) => console.log('Mock: Remove item', id),
  }));

  const mockFavoritesStore = create((set) => ({
    favorites: context.args.mockFavorites || [],
    toggleFavorite: (item) => console.log('Mock: Toggle favorite', item),
  }));

  // ストアのモック注入
  return (
    <MockStoreProvider cartStore={mockCartStore} favoritesStore={mockFavoritesStore}>
      <Story {...context} />
    </MockStoreProvider>
  );
};
```

#### 成果物
- [ ] ProductCardの完全なStory（8+ バリエーション）
- [ ] Headerの完全なStory（レスポンシブ対応）
- [ ] Zustand依存コンポーネントのモック動作確認
- [ ] レスポンシブ表示確認（mobile/tablet/desktop）
- [ ] インタラクション記録（Interactions addon）
- [ ] 合計8-10個のOrganisms Story完成

---

### Phase 5: 高度な機能とドキュメント整備（Week 6）

#### 目標
Storybookの運用体制確立とデザインシステムドキュメント

#### タスク

**Day 1-2: アクセシビリティ対応**

1. **a11yアドオンでの全コンポーネントチェック**
   - Atoms: 全コンポーネントでスコア90点以上
   - Molecules: 全コンポーネントでスコア85点以上
   - Organisms: 主要コンポーネントでスコア80点以上

2. **ARIA属性の追加**
   - ボタン: `aria-label`, `aria-pressed`
   - フォーム: `aria-invalid`, `aria-describedby`
   - ナビゲーション: `aria-current`

3. **キーボードナビゲーション確認**
   - Tab順序の確認
   - Enter/Spaceでの操作
   - Escapeでのモーダル閉じる

**Day 3: デザインシステムドキュメント作成**

4. **Introduction.mdx**
   - アトミックデザインの説明
   - 階層構造の図解
   - 使用方法ガイド

5. **DesignTokens.mdx**
   - カラーパレット
   - タイポグラフィ
   - スペーシング
   - ブレークポイント

6. **各階層のガイド**
   - `Atoms/README.mdx`: Atoms設計原則
   - `Molecules/README.mdx`: Molecules設計原則
   - `Organisms/README.mdx`: Organisms設計原則

**Day 4: ビルド・デプロイ設定**

7. **静的ビルド**
   ```bash
   npm run build-storybook
   ```
   - `storybook-static/` ディレクトリ生成
   - 最適化確認

8. **デプロイ先検討**
   - Vercel: 最も簡単
   - Netlify: 代替案
   - GitHub Pages: 無料オプション

9. **CI/CD統合**
   ```yaml
   # .github/workflows/storybook.yml
   name: Build and Deploy Storybook
   on: [push]
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: npm ci
         - run: npm run build-storybook
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./storybook-static
   ```

**Day 5: 運用ルール策定**

10. **Storyファイルの命名規則**
    ```
    ComponentName.stories.tsx
    ```

11. **コミット時のルール**
    - 新規コンポーネント作成時は必ずStoryも作成
    - コンポーネント変更時はStoryも更新
    - PRレビュー時にStorybook確認

12. **運用ガイドライン作成**
    - `STORYBOOK_BEST_PRACTICES.md`
    - `STORYBOOK_TROUBLESHOOTING.md`

#### 成果物
- [ ] a11yスコア目標達成（Atoms 90+, Molecules 85+, Organisms 80+）
- [ ] デザインシステムドキュメント完成
- [ ] Storybook静的サイト公開（URL発行）
- [ ] CI/CD統合完了
- [ ] 運用ガイドライン作成
- [ ] チーム向けハンズオン資料

---

## 成果物

### ドキュメント

- [x] `STORYBOOK_IMPLEMENTATION_PLAN.md` - 本ドキュメント（アトミックデザイン版）
- [x] `COMPONENT_PRIORITY_MATRIX.md` - 優先度マトリクス（更新予定）
- [ ] `STORYBOOK_SETUP_GUIDE.md` - セットアップ手順
- [ ] `STORYBOOK_BEST_PRACTICES.md` - ベストプラクティス
- [ ] `STORYBOOK_TROUBLESHOOTING.md` - トラブルシューティング

### コード

**Phase 1: 基盤**
- [ ] `.storybook/main.ts`
- [ ] `.storybook/preview.ts`
- [ ] `.storybook/manager.ts`
- [ ] `.storybook/decorators/StoreDecorator.tsx`

**Phase 2: Atoms（11ファイル）**
- [ ] `storybook/stories/atoms/Button.stories.tsx`
- [ ] `storybook/stories/atoms/Input.stories.tsx`
- [ ] `storybook/stories/atoms/Card.stories.tsx`
- [ ] `storybook/stories/atoms/Badge.stories.tsx`
- [ ] `storybook/stories/atoms/Checkbox.stories.tsx`
- [ ] `storybook/stories/atoms/Radio.stories.tsx`
- [ ] `storybook/stories/atoms/Select.stories.tsx`
- [ ] `storybook/stories/atoms/Textarea.stories.tsx`
- [ ] `storybook/stories/atoms/Icon.stories.tsx`
- [ ] `storybook/stories/atoms/Divider.stories.tsx`
- [ ] `storybook/stories/atoms/Loading.stories.tsx`
- [ ] `storybook/stories/atoms/README.mdx`

**Phase 3: Molecules（4ファイル）**
- [ ] `storybook/stories/molecules/Breadcrumb.stories.tsx`
- [ ] `storybook/stories/molecules/Pagination.stories.tsx`
- [ ] `storybook/stories/molecules/StepIndicator.stories.tsx`
- [ ] `storybook/stories/molecules/Modal.stories.tsx`
- [ ] `storybook/stories/molecules/README.mdx`

**Phase 4: Organisms（8-10ファイル）**
- [ ] `storybook/stories/organisms/ProductCard.stories.tsx`
- [ ] `storybook/stories/organisms/QuantitySelector.stories.tsx`
- [ ] `storybook/stories/organisms/SearchBar.stories.tsx`
- [ ] `storybook/stories/organisms/Header.stories.tsx`
- [ ] `storybook/stories/organisms/Footer.stories.tsx`
- [ ] `storybook/stories/organisms/MobileMenu.stories.tsx`
- [ ] `storybook/stories/organisms/ProductImageGallery.stories.tsx`
- [ ] `storybook/stories/organisms/ProductGrid.stories.tsx`
- [ ] `storybook/stories/organisms/CartItem.stories.tsx`
- [ ] `storybook/stories/organisms/CheckoutForm.stories.tsx`
- [ ] `storybook/stories/organisms/README.mdx`

**Phase 5: ドキュメント（MDX）**
- [ ] `storybook/stories/Introduction.mdx`
- [ ] `storybook/stories/DesignTokens.mdx`
- [ ] `storybook/stories/templates/README.mdx`

### 運用

- [ ] Storybookデプロイ（URL発行）
- [ ] CI/CDパイプライン統合
- [ ] チーム向け運用ガイドライン
- [ ] ハンズオン研修資料

---

## リスクと対策

### リスク1: アトミックデザイン階層の混乱

**リスク**: コンポーネントの階層分類が不明確になる

**対策**:
- `DESIGN_SYSTEM.md`に明確な分類基準を記載
- レビュー時に階層の妥当性を確認
- 境界線が曖昧なコンポーネントは都度チームで議論

**影響度**: 中
**発生確率**: 中

---

### リスク2: 依存関係の逆転

**リスク**: 上位層（Organisms）が下位層（Atoms）より先に完成してしまう

**対策**:
- Phase制御を厳格に適用
- Phase完了チェックリストを必須化
- 上位層開発前に下位層のレビュー完了を必須化

**影響度**: 高
**発生確率**: 低

---

### リスク3: Zustand依存コンポーネントのモック複雑化

**リスク**: 状態管理が複雑なコンポーネントのモックが困難

**対策**:
- Phase 1でモックDecoratorを完全に構築
- 汎用的なモックProvider作成
- 必要に応じてMSW（Mock Service Worker）導入

**影響度**: 高
**発生確率**: 中

---

### リスク4: Next.js機能との互換性

**リスク**: next/image, next/link等の機能がStorybook上で動作しない

**対策**:
- `@storybook/nextjs`フレームワークアダプタを使用
- Next.js公式のStorybook連携ドキュメント参照
- 必要に応じてモックコンポーネント作成

**影響度**: 中
**発生確率**: 高

---

## スケジュール

### 全体スケジュール（6週間）

```
Week 1: Phase 1 - 基盤構築
├── Day 1-2: Storybookインストールと基本設定
├── Day 3-4: Next.js/Tailwind/Zustand統合
└── Day 5: イントロダクションページ、動作確認

Week 2: Phase 2 - Atoms（11コンポーネント）
├── Day 1-2: Button, Input（P0）
├── Day 3-4: Card, Badge, Checkbox, Radio, Select（P1）
└── Day 5: Textarea, Icon, Divider, Loading（P2-P3）

Week 3: Phase 3 - Molecules（4コンポーネント）
├── Day 1-2: Breadcrumb, Pagination
├── Day 3-4: StepIndicator, Modal
└── Day 5: レビューと調整

Week 4: Phase 4a - Organisms（ProductCard重点）
├── Day 1-2: ProductCard（最重要）
├── Day 3: QuantitySelector, SearchBar
└── Day 4-5: Header（最複雑）

Week 5: Phase 4b - Organisms（その他）
├── Day 1-2: Footer, MobileMenu
├── Day 3-4: ProductImageGallery, ProductGrid
└── Day 5: CartItem, CheckoutForm

Week 6: Phase 5 - 高度な機能と運用
├── Day 1-2: アクセシビリティ対応（a11y）
├── Day 3: デザインシステムドキュメント作成
├── Day 4: ビルド・デプロイ・CI/CD
└── Day 5: 運用ルール策定、ハンズオン資料作成
```

### マイルストーン

| マイルストーン | 期日 | 達成基準 |
|--------------|------|----------|
| **M1: 環境構築完了** | Week 1終了 | Storybook起動、アトミックデザイン階層表示 |
| **M2: Atoms完了** | Week 2終了 | 11個のAtoms Story完成、autodocs動作 |
| **M3: Molecules完了** | Week 3終了 | 4個のMolecules Story完成、Atoms統合確認 |
| **M4: 主要Organisms完了** | Week 4終了 | ProductCard, Header Story完成、モック動作確認 |
| **M5: Organisms完了** | Week 5終了 | 8-10個のOrganisms Story完成 |
| **M6: 本番運用開始** | Week 6終了 | Storybook公開、運用ルール策定、a11yスコア達成 |

### 各Phaseの完了条件

#### Phase 1完了条件
- [ ] `npm run storybook`でStorybookが起動
- [ ] Tailwind CSSスタイルが正しく適用
- [ ] アトミックデザイン階層（Atoms/Molecules/Organisms）でカテゴリ表示
- [ ] イントロダクションページが表示
- [ ] Next.jsコンポーネント（Link, Image）のモック動作確認

#### Phase 2完了条件
- [ ] 11個すべてのAtoms Storyが完成
- [ ] 各Atomsで全バリエーション（variant, size等）のStoryが作成
- [ ] Interactive Controls（argTypes）が動作
- [ ] autodocs が自動生成
- [ ] a11yアドオンでスコア90点以上

#### Phase 3完了条件
- [ ] 4個すべてのMolecules Storyが完成
- [ ] Atomsとの組み合わせが正しく動作
- [ ] Next.jsのLinkコンポーネントがモックで動作
- [ ] レスポンシブ表示確認（viewport切替）

#### Phase 4完了条件
- [ ] ProductCard Storyが完成（8+ バリエーション）
- [ ] Header Storyが完成（レスポンシブ対応）
- [ ] Zustand StoreのモックProviderが動作
- [ ] 合計8-10個のOrganisms Storyが完成
- [ ] 状態管理依存コンポーネントがStorybook上で正常動作

#### Phase 5完了条件
- [ ] a11yスコア目標達成（Atoms 90+, Molecules 85+, Organisms 80+）
- [ ] デザインシステムドキュメント（Introduction, DesignTokens等）完成
- [ ] Storybook静的サイトがデプロイ、URL発行
- [ ] CI/CD統合完了（GitHub Actions等）
- [ ] 運用ガイドライン作成完了
- [ ] チーム向けハンズオン実施

---

## 次のステップ

### 即座に実行すべきこと（承認後）

1. ✅ このドキュメント（アトミックデザイン版）のレビューと承認
2. [ ] `COMPONENT_PRIORITY_MATRIX.md`のアトミックデザイン対応版への更新
3. [ ] Phase 1のタスク着手
4. [ ] 進捗管理用のTodoリスト作成（Phase/階層別）

### Phase 1開始コマンド

```bash
# 1. Storybookインストール
npx storybook@latest init --type nextjs

# 2. 追加アドオンインストール
npm install --save-dev @storybook/addon-a11y @storybook/addon-viewport

# 3. Storybook起動
npm run storybook
```

### 承認確認項目

- [ ] アトミックデザイン階層でのStory分類に合意
- [ ] 実装順序（Atoms → Molecules → Organisms）に合意
- [ ] 6週間のスケジュールに合意
- [ ] Zustandモック戦略に合意
- [ ] Phase完了条件に合意

---

## 付録

### A. 参考リンク

- [Atomic Design by Brad Frost](https://bradfrost.com/blog/post/atomic-web-design/)
- [Storybook公式ドキュメント](https://storybook.js.org/docs)
- [Storybook for Next.js](https://storybook.js.org/docs/get-started/frameworks/nextjs)
- [Tailwind CSS with Storybook](https://storybook.js.org/recipes/tailwindcss)
- [既存のDESIGN_SYSTEM.md](../DESIGN_SYSTEM.md)

### B. 用語集

- **Atoms**: 最小単位のUIコンポーネント（Button, Input等）
- **Molecules**: Atomsの組み合わせ（Breadcrumb, Pagination等）
- **Organisms**: 複雑な機能ブロック（ProductCard, Header等）
- **Story**: コンポーネントの単一の状態やバリエーション
- **Addon**: Storybookの機能拡張プラグイン
- **Decorator**: Storyをラップする高階コンポーネント
- **Args**: Storyに渡すPropsの値
- **Controls**: ブラウザ上でPropsを動的に変更するUI
- **autodocs**: コンポーネントのドキュメントを自動生成する機能

### C. アトミックデザイン分類の判断基準

| 基準 | Atoms | Molecules | Organisms |
|------|-------|-----------|-----------|
| **依存関係** | なし | Atomsのみ | Atoms + Molecules + Store |
| **構成要素数** | 1 | 2-3 | 4+ |
| **ビジネスロジック** | なし | 最小限 | あり |
| **状態管理** | なし | ローカルのみ | グローバル可 |
| **再利用性** | 最大 | 高 | 中～低 |

**例**:
- Button → Atoms（単一要素）
- Breadcrumb → Molecules（Link + Text、2要素）
- ProductCard → Organisms（Badge + Button + Image + Store、4要素以上 + 状態管理）

---

**文書バージョン**: 5.0（Orchestra/Maestro命名版）
**作成者**: Claude Code
**承認者**: -
**次回レビュー日**: Phase 2完了時
**変更履歴**:
- v1.0: 初版作成（機能ベース分類）
- v2.0: アトミックデザインベースに全面改訂
- v3.0: Storybookを独立ディレクトリ構造（src/stories/）に変更
- v4.0: Storybookを完全独立プロジェクト（ec_Design/storybook/）として分離
- v5.0: デザインシステム名を「Orchestra」、ヘッドレスコマース名を「Maestro」に命名
