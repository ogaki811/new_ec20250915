# デザインシステム設計ガイドライン

## 概要

このプロジェクトは、最終的にデザインシステムに落とし込むことを前提として開発されています。
アトミックデザインの原則に基づき、再利用可能で保守性の高いコンポーネント設計を行います。

## アトミックデザインの階層構造

### 1. Atoms（原子）
最小単位のUIコンポーネント。これ以上分割できない基本的な要素。

**配置場所**: `src/components/ui/`

**例**:
- `Button.tsx` - ボタン
- `Input.tsx` - テキスト入力
- `Select.tsx` - セレクトボックス
- `Checkbox.tsx` - チェックボックス
- `Badge.tsx` - バッジ
- `Loading.tsx` - ローディングスピナー
- `Icon.tsx` - アイコン

**設計原則**:
- 単一責任の原則を守る
- propsで柔軟にカスタマイズできるようにする
- variantやsizeなどで見た目のバリエーションを提供
- TypeScriptで型安全性を確保

```typescript
// 良い例
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  children: ReactNode;
}
```

### 2. Molecules（分子）
複数のAtomsを組み合わせた小さな機能単位。

**配置場所**: `src/components/common/`

**例**:
- `Breadcrumb.tsx` - パンくずリスト（Link + Text）
- `StepIndicator.tsx` - ステップインジケーター
- `SearchBar.tsx` - 検索バー（Input + Button）
- `ProductCard.tsx` - 商品カード（Image + Text + Button）

**設計原則**:
- 特定の機能を持つ小さな単位
- 複数のAtomsを組み合わせて構成
- 再利用可能な設計を意識

```typescript
// 良い例: Breadcrumb
interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}
```

### 3. Organisms（有機体）
MoleculesとAtomsを組み合わせた、より複雑な機能単位。

**配置場所**:
- `src/components/layout/` - レイアウト関連
- `src/components/product/` - 商品関連
- `src/components/home/` - ホーム関連

**例**:
- `Header.tsx` - ヘッダー（ロゴ + ナビゲーション + 検索バー + カート）
- `Footer.tsx` - フッター
- `ProductDetailClient.tsx` - 商品詳細（画像ギャラリー + 商品情報 + カート追加ボタン）
- `ProductSlider.tsx` - 商品スライダー

**設計原則**:
- 独立した機能ブロック
- ページ内で再利用可能
- ビジネスロジックを含む場合がある

### 4. Templates（テンプレート）
Organismsを配置したページの骨格。

**配置場所**: `src/app/**/layout.tsx`

**例**:
- `RootLayout` - 全ページ共通レイアウト
- ページごとの特定レイアウト

**設計原則**:
- コンテンツの構造を定義
- 実際のデータは含まない
- レイアウトとスペーシングに集中

### 5. Pages（ページ）
実際のコンテンツを含む完成したページ。

**配置場所**: `src/app/**/page.tsx`

**例**:
- `page.tsx` - トップページ
- `products/[id]/page.tsx` - 商品詳細ページ
- `checkout/page.tsx` - チェックアウトページ

**設計原則**:
- 実際のデータを表示
- Templatesにコンテンツを流し込む
- ページ固有のロジックを含む

## コンポーネント設計の基本ルール

### 1. ファイル命名規則

```
PascalCase.tsx - コンポーネント名はPascalCase
index.ts - エクスポート用インデックスファイル
```

### 2. BEM命名規則

クラス名はBEM（Block Element Modifier）を使用：

```typescript
// Block
className="ec-button"

// Element
className="ec-button__icon"

// Modifier
className="ec-button--primary"
className="ec-button__icon--large"
```

**命名パターン**:
```
ec-[block]
ec-[block]__[element]
ec-[block]--[modifier]
ec-[block]__[element]--[modifier]
```

### 3. TypeScript型定義

すべてのコンポーネントで型定義を必須とします：

```typescript
// Props型の定義
interface ComponentProps {
  // 必須プロパティ
  children: ReactNode;

  // オプショナルプロパティ
  variant?: 'primary' | 'secondary';
  className?: string;

  // イベントハンドラー
  onClick?: () => void;
}

// コンポーネント定義
export default function Component({ children, variant = 'primary' }: ComponentProps) {
  // 実装
}
```

### 4. Props設計

- デフォルト値を適切に設定
- variantパターンで見た目のバリエーションを提供
- classNameプロップで拡張可能にする
- 必要最小限のpropsに留める

```typescript
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  children: ReactNode;
}
```

### 5. スタイリング

Tailwind CSSを使用し、デザイントークンを活用：

```typescript
// 色のバリエーション定義
const variants = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-gray-600 text-white hover:bg-gray-700',
  outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
};

// サイズのバリエーション定義
const sizes = {
  sm: 'px-3 py-1.5 text-sm rounded',
  md: 'px-4 py-2 text-base rounded-md',
  lg: 'px-6 py-3 text-lg rounded-lg',
};
```

## ディレクトリ構造

```
src/
├── components/
│   ├── ui/                    # Atoms - 基本UIコンポーネント
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Checkbox.tsx
│   │   ├── Badge.tsx
│   │   ├── Loading.tsx
│   │   ├── Icon.tsx
│   │   └── index.ts           # エクスポート集約
│   │
│   ├── common/                # Molecules - 共通コンポーネント
│   │   ├── Breadcrumb.tsx
│   │   ├── StepIndicator.tsx
│   │   └── SearchBar.tsx
│   │
│   ├── layout/                # Organisms - レイアウトコンポーネント
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   │
│   ├── product/               # Organisms - 商品関連コンポーネント
│   │   ├── ProductCard.tsx
│   │   ├── ProductDetailClient.tsx
│   │   └── ProductImageGallery.tsx
│   │
│   └── home/                  # Organisms - ホーム関連コンポーネント
│       ├── ProductSlider.tsx
│       └── HeroSection.tsx
│
├── app/                       # Pages & Templates
│   ├── layout.tsx             # Root Template
│   ├── page.tsx               # Top Page
│   ├── products/
│   │   └── [id]/
│   │       └── page.tsx       # Product Detail Page
│   └── checkout/
│       └── page.tsx           # Checkout Page
│
├── data/                      # データ・定数
│   ├── sampleProducts.ts
│   └── prefectures.ts
│
├── hooks/                     # カスタムフック
│   ├── usePostalCode.ts
│   └── useFormPersist.ts
│
├── store/                     # 状態管理
│   ├── useCartStore.ts
│   ├── useAuthStore.ts
│   └── useFavoritesStore.ts
│
└── types/                     # 型定義
    └── index.ts
```

## コンポーネント作成チェックリスト

新しいコンポーネントを作成する際は、以下を確認してください：

- [ ] 適切な階層（Atom/Molecule/Organism）に配置されているか
- [ ] TypeScriptで型定義されているか
- [ ] BEM命名規則に従っているか
- [ ] propsのデフォルト値が設定されているか
- [ ] 再利用可能な設計になっているか
- [ ] 単一責任の原則を守っているか
- [ ] 必要に応じてvariant/sizeパターンを実装しているか
- [ ] classNameプロップで拡張可能になっているか

## 今後の展開

このプロジェクトは、以下の方向で発展させます：

1. **Storybookの導入** - コンポーネントカタログの構築
2. **デザイントークンの体系化** - 色・スペース・タイポグラフィの統一
3. **テーマシステム** - ダークモード対応
4. **アクセシビリティ強化** - ARIA属性の追加
5. **パフォーマンス最適化** - 遅延読み込み・メモ化
6. **ドキュメント整備** - 使用例・ガイドライン

## 参考資料

- [Atomic Design by Brad Frost](https://bradfrost.com/blog/post/atomic-web-design/)
- [BEM Methodology](https://en.bem.info/methodology/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
