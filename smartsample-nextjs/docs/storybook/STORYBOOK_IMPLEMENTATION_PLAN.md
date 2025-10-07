# Storybook導入計画書

**プロジェクト**: smartsample Next.js ECサイト
**作成日**: 2025年10月7日
**ステータス**: 計画中
**ブランチ**: `feature/storybook`

---

## 目次

1. [プロジェクト概要](#プロジェクト概要)
2. [目的と期待効果](#目的と期待効果)
3. [現状分析](#現状分析)
4. [技術スタック](#技術スタック)
5. [導入アプローチ](#導入アプローチ)
6. [実装フェーズ](#実装フェーズ)
7. [コンポーネント優先度](#コンポーネント優先度)
8. [成果物](#成果物)
9. [リスクと対策](#リスクと対策)
10. [スケジュール](#スケジュール)

---

## プロジェクト概要

Next.js 15 + TypeScript + Tailwind CSSで構築されたECサイトプロジェクトに、Storybook 8系を導入し、コンポーネントカタログとデザインシステムの基盤を構築する。

### ビジョン

- **開発効率の向上**: コンポーネントを独立して開発・テスト
- **品質の保証**: 視覚的リグレッションテストの基盤
- **ドキュメント化**: 自己文書化されたコンポーネントライブラリ
- **チーム協業**: デザイナー・開発者間のコミュニケーション改善

---

## 目的と期待効果

### 主要目的

1. **コンポーネントの可視化**
   - 全コンポーネントを一覧表示
   - バリエーション（variant, size等）の確認
   - レスポンシブ対応の検証

2. **開発体験の向上**
   - ページ全体をビルドせずにコンポーネント開発
   - ホットリロードによる高速フィードバック
   - Props変更の即時反映

3. **品質保証**
   - アクセシビリティチェック（a11yアドオン）
   - レスポンシブデザイン検証（viewport切替）
   - 視覚的リグレッションテスト（将来的にChromatic導入）

4. **ドキュメント化**
   - コンポーネントAPIの自動生成
   - 使用例の提供
   - デザインガイドラインの統一

### 期待効果

| 指標 | 現状 | 目標 |
|------|------|------|
| コンポーネント開発速度 | 基準値 | 30%向上 |
| UIバグ発見率 | 事後発見 | 事前発見80% |
| ドキュメント作成時間 | 手動作成 | 自動生成 |
| デザイン一貫性 | 目視確認 | 自動チェック |

---

## 現状分析

### コンポーネント構成

```
src/components/ (合計52ファイル)
├── ui/           (11) ← 最優先
├── product/      (13)
├── cart/         (6)
├── checkout/     (5)
├── layout/       (5)
├── common/       (4)
├── search/       (3)
├── home/         (2)
├── favorites/    (1)
├── mypage/       (1)
└── order/        (1)
```

### UIコンポーネント詳細（最優先カテゴリ）

| コンポーネント | 説明 | Props数 | 優先度 |
|--------------|------|---------|--------|
| **Button** | プライマリUI | 5 variants × 3 sizes | 最高 |
| **Input** | フォーム入力 | label, error, helper | 最高 |
| **Card** | コンテナ | variant, padding | 高 |
| **Badge** | ステータス表示 | variant, size | 高 |
| **Checkbox** | チェックボックス | label, error | 高 |
| **Radio** | ラジオボタン | label, error | 高 |
| **Select** | セレクトボックス | options, error | 高 |
| **Textarea** | テキストエリア | label, error | 中 |
| **Icon** | アイコン | name, size, color | 中 |
| **Divider** | 区切り線 | variant | 低 |
| **Loading** | ローディング | size, text | 低 |

### コンポーネントの特徴

#### ✅ Storybook向きな点

1. **型定義が明確**
   ```typescript
   interface ButtonProps {
     variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
     size?: 'sm' | 'md' | 'lg';
     fullWidth?: boolean;
     loading?: boolean;
   }
   ```

2. **バリエーションが豊富**
   - Button: 5 variants × 3 sizes = 15パターン
   - Input: 通常/エラー/ヘルパーテキスト
   - Badge: 4 variants × 2 sizes = 8パターン

3. **Props駆動**
   - 状態管理（Zustand）への依存が少ない
   - 純粋なプレゼンテーションコンポーネント

#### ⚠️ 注意が必要な点

1. **Zustand依存コンポーネント**
   - ProductCard: useCartStore, useFavoritesStore
   - Header: useCartStore
   - 対策: Storybook用のモックProviderを作成

2. **Next.js依存**
   - Link, Image コンポーネント
   - 対策: next.config.jsとの連携設定

3. **Tailwind CSS依存**
   - 動的クラス名の生成
   - 対策: .storybook/preview.tsでTailwind CSSをインポート

---

## 技術スタック

### Storybookバージョン

- **Storybook**: 8.x（最新安定版）
- **フレームワーク**: @storybook/nextjs
- **ビルダー**: Webpack 5（Next.js互換）

### 必須アドオン

| アドオン | 用途 | 優先度 |
|---------|------|--------|
| `@storybook/addon-essentials` | 基本機能セット | 必須 |
| `@storybook/addon-interactions` | インタラクション記録 | 必須 |
| `@storybook/addon-a11y` | アクセシビリティ | 高 |
| `@storybook/addon-viewport` | レスポンシブ | 高 |

### オプションアドオン（Phase 2以降）

- `@storybook/addon-themes`: テーマ切替
- `storybook-dark-mode`: ダークモード
- `chromatic`: ビジュアルリグレッションテスト

---

## 導入アプローチ

### 戦略: 段階的導入（推奨）

**理由**:
- リスクを分散
- 学習曲線を緩やか
- 早期フィードバック獲得

### Phase分け

```
Phase 1: 基盤構築（1週間）
  ↓
Phase 2: UIコンポーネント（1週間）
  ↓
Phase 3: 機能コンポーネント（2週間）
  ↓
Phase 4: 高度な機能（1週間）
```

---

## 実装フェーズ

### Phase 1: 基盤構築とセットアップ（Week 1）

#### 目標
Storybook環境の構築と基本設定完了

#### タスク

1. **Storybookインストール**
   ```bash
   npx storybook@latest init --type nextjs
   ```

2. **設定ファイル作成**
   - `.storybook/main.ts`: メイン設定
   - `.storybook/preview.ts`: グローバル設定
   - `.storybook/manager.ts`: UI設定

3. **Tailwind CSS統合**
   ```typescript
   // .storybook/preview.ts
   import '../src/app/globals.css';
   ```

4. **Next.js機能の設定**
   - next/image のモック
   - next/link のモック
   - next/font のモック

5. **Zustand用モックProvider作成**
   ```typescript
   // .storybook/decorators/StoreDecorator.tsx
   ```

6. **動作確認**
   - Welcome Storyの作成
   - Button Storyのサンプル作成

#### 成果物
- [ ] Storybook起動成功
- [ ] Tailwind CSSスタイル適用確認
- [ ] サンプルStory動作確認
- [ ] ドキュメント: `STORYBOOK_SETUP_GUIDE.md`

---

### Phase 2: UIコンポーネントのStory作成（Week 2）

#### 目標
11個のUIコンポーネントのStoryを完成

#### 優先度別実装順序

**優先度: 最高（1-2日目）**
1. Button - 全variant × 全size
2. Input - 通常/エラー/ヘルパーテキスト

**優先度: 高（3-4日目）**
3. Card
4. Badge
5. Checkbox
6. Radio
7. Select

**優先度: 中-低（5日目）**
8. Textarea
9. Icon
10. Divider
11. Loading

#### Storyテンプレート

```typescript
// src/components/ui/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'プライマリボタン',
  },
};

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

#### 成果物
- [ ] 11個のUIコンポーネントStory完成
- [ ] 各コンポーネントの全バリエーション表示
- [ ] インタラクティブControls動作確認
- [ ] ドキュメント自動生成確認

---

### Phase 3: 機能コンポーネントのStory作成（Week 3-4）

#### 目標
ProductCard等の複雑なコンポーネントのStory化

#### 対象コンポーネント（優先度順）

**Week 3（機能コンポーネント）**
1. **ProductCard** - 最重要
   - サイズバリエーション（compact/default/large）
   - 状態（通常/在庫切れ/お気に入り）
   - Storeモックの適用

2. **CartItem** - カート表示
3. **CheckoutForm** - フォーム系
4. **Breadcrumb** - ナビゲーション
5. **Pagination** - ページネーション

**Week 4（レイアウトコンポーネント）**
6. **Header** - 複雑なレイアウト
7. **Footer** - レイアウト
8. **MobileMenu** - モバイルUI

#### Zustand依存コンポーネントの対応

```typescript
// .storybook/decorators/StoreDecorator.tsx
export const withStore = (Story: any, context: any) => {
  const mockCartStore = {
    items: [],
    addItem: (item: any) => console.log('Add item:', item),
    removeItem: (id: number) => console.log('Remove item:', id),
  };

  return (
    <StoreProvider value={mockCartStore}>
      <Story {...context} />
    </StoreProvider>
  );
};
```

#### 成果物
- [ ] ProductCardの完全なStory
- [ ] Zustand依存コンポーネントのモック対応
- [ ] レスポンシブ表示確認（mobile/tablet/desktop）
- [ ] インタラクション記録（Interactions addon）

---

### Phase 4: 高度な機能とドキュメント整備（Week 5）

#### 目標
Storybookの運用体制確立

#### タスク

1. **アクセシビリティ対応**
   - a11yアドオンでのチェック
   - ARIA属性の追加
   - キーボードナビゲーション確認

2. **ドキュメントページ作成**
   - デザインシステム概要
   - カラーパレット
   - タイポグラフィ
   - スペーシングシステム

3. **ビルド・デプロイ設定**
   ```bash
   npm run build-storybook
   ```
   - 静的ファイル生成
   - Vercel/Netlifyへのデプロイ検討

4. **チーム運用ルール策定**
   - Storyファイルの命名規則
   - コミット時のStory追加ルール
   - レビュープロセス

#### 成果物
- [ ] アクセシビリティスコア改善
- [ ] デザインシステムドキュメント完成
- [ ] Storybook静的サイト公開
- [ ] 運用ガイドライン作成

---

## コンポーネント優先度

### 優先度マトリクス

| 優先度 | コンポーネント | 理由 | 期待工数 |
|--------|--------------|------|----------|
| **P0（最優先）** | Button, Input | 最も使用頻度が高い | 0.5日 |
| **P1（高）** | Card, Badge, Checkbox, Radio, Select | フォーム・UI基盤 | 1.5日 |
| **P2（中）** | ProductCard, CartItem | ビジネスロジック含む | 2日 |
| **P3（低）** | Header, Footer | 複雑なレイアウト | 1.5日 |
| **P4（将来）** | その他 | 必要に応じて | - |

### 実装順序の根拠

1. **依存関係**: Button → Card → ProductCard
2. **使用頻度**: 全ページで使用 → 特定ページのみ
3. **複雑度**: シンプル → 複雑
4. **学習効果**: 基本 → 応用

---

## 成果物

### ドキュメント

- [x] `STORYBOOK_IMPLEMENTATION_PLAN.md` - 本ドキュメント
- [ ] `STORYBOOK_SETUP_GUIDE.md` - セットアップ手順
- [ ] `STORYBOOK_BEST_PRACTICES.md` - ベストプラクティス
- [ ] `STORYBOOK_TROUBLESHOOTING.md` - トラブルシューティング

### コード

- [ ] `.storybook/` ディレクトリ
  - [ ] `main.ts` - メイン設定
  - [ ] `preview.ts` - グローバル設定
  - [ ] `manager.ts` - UI設定
- [ ] `src/components/**/*.stories.tsx` - 各Storyファイル
- [ ] `.storybook/decorators/` - デコレーター
- [ ] `package.json` - スクリプト追加

### 運用

- [ ] Storybookデプロイ（静的サイト）
- [ ] CI/CDパイプライン統合
- [ ] チーム向け運用ガイドライン

---

## リスクと対策

### リスク1: Next.js機能との互換性

**リスク**: next/image, next/link等のNext.js固有機能がStorybook上で動作しない

**対策**:
- `@storybook/nextjs` フレームワークアダプタを使用
- 必要に応じてモックコンポーネント作成
- Next.js公式ドキュメントの「Storybook」セクション参照

**影響度**: 中
**発生確率**: 高

---

### リスク2: Zustand依存コンポーネントのモック

**リスク**: グローバルストアに依存するコンポーネントの表示が困難

**対策**:
- Storybook用のモックProviderを作成
- Context APIでストアを注入
- 各Storyで必要な初期状態を設定

**影響度**: 高
**発生確率**: 中

---

### リスク3: 学習コスト

**リスク**: チームメンバーのStorybook習熟に時間がかかる

**対策**:
- サンプルStoryを豊富に用意
- テンプレートファイルの提供
- ハンズオン研修の実施
- 段階的導入によるスモールスタート

**影響度**: 低
**発生確率**: 高

---

### リスク4: メンテナンスコスト

**リスク**: コンポーネント変更時にStoryも更新が必要

**対策**:
- コミット時のチェックリストに追加
- PRレビュー時にStory確認
- 自動生成ツールの活用（将来的に）

**影響度**: 中
**発生確率**: 高

---

## スケジュール

### 全体スケジュール（5週間）

```
Week 1: Phase 1 - 基盤構築
├── Day 1-2: Storybookインストールと設定
├── Day 3-4: Next.js/Tailwind統合
└── Day 5: 動作確認とサンプル作成

Week 2: Phase 2 - UIコンポーネント
├── Day 1-2: Button, Input（最優先）
├── Day 3-4: Card, Badge, Checkbox, Radio, Select
└── Day 5: Textarea, Icon, Divider, Loading

Week 3: Phase 3a - 機能コンポーネント
├── Day 1-2: ProductCard
├── Day 3: CartItem, CheckoutForm
└── Day 4-5: Breadcrumb, Pagination

Week 4: Phase 3b - レイアウトコンポーネント
├── Day 1-2: Header
├── Day 3: Footer
└── Day 4-5: MobileMenu

Week 5: Phase 4 - 高度な機能
├── Day 1-2: アクセシビリティ対応
├── Day 3: ドキュメント整備
├── Day 4: ビルド・デプロイ
└── Day 5: 運用ルール策定
```

### マイルストーン

| マイルストーン | 期日 | 達成基準 |
|--------------|------|----------|
| **M1: 環境構築完了** | Week 1終了 | Storybook起動、サンプルStory動作 |
| **M2: UIコンポーネント完了** | Week 2終了 | 11個のUIコンポーネントStory完成 |
| **M3: 機能コンポーネント完了** | Week 4終了 | ProductCard等の主要コンポーネント完成 |
| **M4: 本番運用開始** | Week 5終了 | Storybook公開、運用ルール策定 |

---

## 次のステップ

### 即座に実行すべきこと

1. ✅ このドキュメントのレビューと承認
2. [ ] Storybookインストール実行
3. [ ] Phase 1のタスク着手
4. [ ] 進捗管理用のTodoリスト作成

### 承認後のアクション

```bash
# 1. Storybookインストール
npx storybook@latest init --type nextjs

# 2. 依存パッケージインストール
npm install --save-dev @storybook/addon-a11y @storybook/addon-viewport

# 3. Storybook起動
npm run storybook
```

---

## 付録

### A. 参考リンク

- [Storybook公式ドキュメント](https://storybook.js.org/docs)
- [Storybook for Next.js](https://storybook.js.org/docs/get-started/frameworks/nextjs)
- [Tailwind CSS with Storybook](https://storybook.js.org/recipes/tailwindcss)

### B. 用語集

- **Story**: コンポーネントの単一の状態やバリエーション
- **Addon**: Storybookの機能拡張プラグイン
- **Decorator**: Storyをラップする高階コンポーネント
- **Args**: Storyに渡すPropsの値
- **Controls**: ブラウザ上でPropsを動的に変更するUI

---

**文書バージョン**: 1.0
**作成者**: Claude Code
**承認者**: -
**次回レビュー日**: Phase 1完了時
