# Orchestra Design System - 開発ガイド

**バージョン**: 1.0.0
**最終更新**: 2025-10-09

このドキュメントでは、Orchestraデザインシステムへのコンポーネント追加・変更方法を説明します。

---

## 目次

1. [開発環境セットアップ](#開発環境セットアップ)
2. [コンポーネント追加ワークフロー](#コンポーネント追加ワークフロー)
3. [Story作成ルール](#story作成ルール)
4. [命名規則](#命名規則)
5. [コミットルール](#コミットルール)
6. [プルリクエストプロセス](#プルリクエストプロセス)

---

## 開発環境セットアップ

### 前提条件

- Node.js 20以上
- npm 10以上
- Git

### インストール

```bash
# リポジトリクローン
git clone https://github.com/your-org/ec_Design.git
cd ec_Design

# Storybookディレクトリに移動
cd storybook

# 依存関係インストール
npm install

# 開発サーバー起動
npm run storybook
# → http://localhost:6006 で起動
```

---

## コンポーネント追加ワークフロー

### Step 1: 要件定義

新しいコンポーネントを追加する前に、要件定義書を作成します。

**テンプレート**: `docs/nextjs-version/templates/REQUIREMENTS_TEMPLATE.md`
**保存先**: `docs/nextjs-version/requirements/COMPONENT_NAME_REQUIREMENTS.md`

### Step 2: アトミックデザイン階層の決定

コンポーネントがどの階層に属するかを判断します。

| 階層 | 判断基準 | 例 |
|------|---------|---|
| **Atoms** | 最小単位、他のコンポーネントに依存しない | Button, Input, Badge |
| **Molecules** | Atomsを2〜5個組み合わせ | Breadcrumb, Pagination |
| **Organisms** | Atoms + Molecules + ビジネスロジック | Header, ProductCard |
| **Templates** | ページレイアウト構造 | HomePage, ProductListPage |

**参考**: `docs/nextjs-version/design/DESIGN_SYSTEM.md`

### Step 3: コンポーネント実装

#### Next.jsプロジェクトに実装

```bash
cd smartsample-nextjs/src/components

# Atomsの場合
# → ui/ComponentName.tsx

# Moleculesの場合
# → common/ComponentName.tsx

# Organismsの場合
# → layout/ComponentName.tsx (レイアウト関連)
# → product/ComponentName.tsx (商品関連)
```

#### TypeScript型定義

```typescript
// ComponentName.tsx
interface ComponentNameProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function ComponentName({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  onClick,
}: ComponentNameProps) {
  // 実装
}
```

#### BEM命名規則

```typescript
const baseClass = 'ec-component-name';
const variantClass = variant ? `${baseClass}--${variant}` : '';
const sizeClass = size ? `${baseClass}--${size}` : '';

<div className={`${baseClass} ${variantClass} ${sizeClass} ${className}`}>
  {children}
</div>
```

### Step 4: Story作成

#### ファイル配置

```bash
cd storybook/stories

# Atomsの場合
# → atoms/ComponentName.stories.tsx

# Moleculesの場合
# → molecules/ComponentName.stories.tsx

# Organismsの場合
# → organisms/ComponentName.stories.tsx

# Templatesの場合
# → templates/ComponentName.stories.tsx
```

#### Storyテンプレート

```typescript
// ComponentName.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import ComponentName from '@/components/path/ComponentName';

const meta = {
  title: 'Atoms/ComponentName',  // 階層/コンポーネント名
  component: ComponentName,
  parameters: {
    layout: 'centered',  // 'centered' | 'fullscreen' | 'padded'
  },
  tags: ['autodocs'],  // 自動ドキュメント生成
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline'],
      description: 'ボタンのスタイルバリエーション',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'ボタンのサイズ',
    },
  },
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

// デフォルトStory（必須）
export const Default: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'ボタン',
  },
};

// バリエーションStories
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
};

// 状態Stories
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};
```

### Step 5: アクセシビリティチェック

Storybookの「Accessibility」タブでa11yスコアを確認します。

**目標スコア**:
- Atoms: 90点以上
- Molecules: 85点以上
- Organisms: 80点以上

**主なチェック項目**:
- [ ] キーボード操作可能（Tab, Enter, Space, Escape）
- [ ] 適切なARIA属性（aria-label, aria-describedby等）
- [ ] カラーコントラスト比 4.5:1以上
- [ ] フォーカス表示が明確

### Step 6: テスト

```bash
# ビルドテスト
npm run build-storybook

# 型チェック（今後追加予定）
npm run type-check

# Lintチェック（今後追加予定）
npm run lint
```

---

## Story作成ルール

### 必須Stories

すべてのコンポーネントには以下のStoriesを作成します。

1. **Default**: デフォルト状態
2. **Variants**: すべてのvariantバリエーション
3. **Sizes**: すべてのsizeバリエーション（該当する場合）
4. **States**: disabled, loading等の状態（該当する場合）

### 推奨Stories

コンポーネントに応じて以下のStoriesを追加します。

- **WithIcon**: アイコン付き（該当する場合）
- **FullWidth**: 幅100%（該当する場合）
- **Error**: エラー状態（フォーム要素等）
- **Mobile**: モバイル表示
- **Tablet**: タブレット表示
- **Desktop**: デスクトップ表示

### Story命名規則

- **PascalCase**を使用
- 状態や用途が明確にわかる名前
- 例: `Default`, `Primary`, `Large`, `Disabled`, `WithIcon`

---

## 命名規則

### ファイル名

```
PascalCase.tsx       # コンポーネントファイル
PascalCase.stories.tsx  # Storyファイル
README.mdx           # ドキュメント
```

### BEMクラス名

```
ec-[block]                    # Block
ec-[block]__[element]         # Element
ec-[block]--[modifier]        # Modifier
```

**例**:
```css
.ec-button                     /* Block */
.ec-button__icon               /* Element */
.ec-button--primary            /* Modifier */
.ec-button--lg                 /* Modifier */
.ec-button__icon--left         /* Element + Modifier */
```

### Story Title

```
階層/コンポーネント名

例:
- Atoms/Button
- Molecules/Breadcrumb
- Organisms/Header
- Templates/HomePage
```

---

## コミットルール

### Conventional Commits形式

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type一覧

| Type | 用途 | 例 |
|------|------|---|
| `feat` | 新機能追加 | `feat(atoms): add Rating component` |
| `fix` | バグ修正 | `fix(button): resolve disabled state style` |
| `docs` | ドキュメント変更 | `docs(atoms): update Button README` |
| `style` | スタイル変更（機能に影響なし） | `style(button): adjust padding` |
| `refactor` | リファクタリング | `refactor(header): simplify nav logic` |
| `test` | テスト追加・修正 | `test(button): add a11y tests` |
| `chore` | ビルド・設定変更 | `chore: update storybook to 8.7.0` |

### コミットメッセージ例

```bash
# 良い例
feat(atoms): add Loading component with 3 variants

- Add spinner, dots, pulse variants
- Implement size options (sm, md, lg)
- Add ARIA attributes for screen readers
- Create comprehensive stories

Closes #123

# 悪い例
add loading
update button
fix bug
```

---

## プルリクエストプロセス

### 1. ブランチ作成

```bash
# 命名規則: feature/component-name または fix/issue-description
git checkout -b feature/rating-component
```

### 2. 変更実装

- コンポーネント実装
- Story作成
- ドキュメント更新

### 3. セルフチェック

**チェックリスト**:
- [ ] TypeScript型定義がある
- [ ] BEM命名規則に従っている
- [ ] すべてのvariant/sizeのStoryがある
- [ ] アクセシビリティスコア達成（Atoms:90, Molecules:85, Organisms:80）
- [ ] レスポンシブ対応（該当する場合）
- [ ] ビルドが成功する

### 4. プルリクエスト作成

**タイトル形式**:
```
[階層] コンポーネント名の追加/修正

例:
[Atoms] Rating component の追加
[Fix] Button disabled state の修正
```

**説明テンプレート**:
```markdown
## 概要
Rating componentをAtomsに追加

## 変更内容
- 5段階評価のRatingコンポーネント実装
- 3サイズバリエーション (sm, md, lg)
- 読み取り専用モード
- カスタマイズ可能な星アイコン

## チェックリスト
- [x] TypeScript型定義
- [x] BEM命名規則
- [x] 5+ Stories作成
- [x] a11yスコア 92点（Atoms目標: 90点以上）
- [x] ビルド成功

## スクリーンショット
（コンポーネントのスクリーンショットを添付）

## 関連Issue
Closes #123
```

### 5. レビュー対応

- レビュアーからのフィードバックに対応
- 修正をコミット・プッシュ
- 承認後、マージ

---

## よくある質問（FAQ）

### Q1: どの階層に属するか迷ったら？

**A**: 以下の判断基準を使用してください。

1. 他のコンポーネントに依存しない → **Atoms**
2. Atomsのみに依存し、2〜5個組み合わせ → **Molecules**
3. Atoms + Molecules + ビジネスロジック → **Organisms**
4. ページレイアウト構造 → **Templates**

不明な場合は、`docs/nextjs-version/design/DESIGN_SYSTEM.md`を参照するか、チームに相談してください。

### Q2: Storybookが起動しない

**A**: 以下を確認してください。

```bash
# Node.jsバージョン確認
node -v  # 20以上であること

# 依存関係再インストール
rm -rf node_modules package-lock.json
npm install

# キャッシュクリア
npm run storybook -- --no-manager-cache
```

### Q3: ビルドエラーが発生する

**A**: 以下を確認してください。

- TypeScript型エラーがないか
- import文のパスが正しいか（`@/components/*`）
- Next.jsコンポーネントが正しくモックされているか

```bash
# TypeScriptエラー確認
cd ../smartsample-nextjs
npx tsc --noEmit
```

### Q4: a11yスコアが低い

**A**: 以下を追加してください。

```tsx
// ARIA属性
<button
  aria-label="説明文"
  aria-describedby="説明要素のID"
  aria-pressed={isActive}
>

// キーボード操作
<div
  role="button"
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onClick();
    }
  }}
>
```

---

## サポート

質問やフィードバックは以下まで：

- **Issues**: [GitHub Issues](https://github.com/your-org/ec_Design/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/ec_Design/discussions)
- **ドキュメント**: `docs/nextjs-version/`

---

**Happy Coding! 🎼**
