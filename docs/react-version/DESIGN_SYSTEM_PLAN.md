# デザインシステム実装計画

## 概要
既存のReactアプリケーションをAtomic Design原則に基づいてコンポーネント化し、
再利用可能なデザインシステムを構築します。

## ディレクトリ構造

```
src/
├── components/
│   ├── atoms/           # 最小単位のコンポーネント
│   │   ├── Button/
│   │   ├── Badge/
│   │   ├── Input/
│   │   ├── Select/
│   │   └── Icon/
│   ├── molecules/       # atomsを組み合わせたコンポーネント
│   │   ├── ProductCard/
│   │   ├── CategoryCard/
│   │   ├── NewsItem/
│   │   ├── OrderCard/
│   │   ├── OrderItem/
│   │   ├── InfoField/
│   │   └── SearchBar/
│   ├── organisms/       # moleculesを組み合わせた複雑なコンポーネント
│   │   ├── ProductGrid/
│   │   ├── CategoryGrid/
│   │   ├── OrderList/
│   │   ├── NewsList/
│   │   ├── Pagination/
│   │   ├── Header/
│   │   ├── Footer/
│   │   └── Sidebar/
│   └── templates/       # ページレイアウトのテンプレート
│       ├── PageLayout/
│       └── SidebarLayout/
├── pages/              # 実際のページ
└── styles/            # グローバルスタイル、テーマ設定
```

## コンポーネント詳細

### 1. Atoms（原子）- 最小単位のコンポーネント

#### Button
**バリエーション:**
- `primary`: メインアクション（例: カートに追加）
  - `bg-blue-600 text-white hover:bg-blue-700`
- `secondary`: サブアクション（例: 詳細を見る）
  - `border border-gray-300 hover:bg-gray-50`
- `link`: テキストリンクボタン（例: すべて見る）
  - `text-blue-600 hover:text-blue-800`

**Props:**
```typescript
{
  variant: 'primary' | 'secondary' | 'link'
  size: 'sm' | 'md' | 'lg'
  disabled?: boolean
  fullWidth?: boolean
  onClick?: () => void
  children: ReactNode
}
```

#### Badge
**バリエーション:**
- `status`: ステータス表示（配送中、配送完了）
  - `bg-blue-100 text-blue-800`, `bg-green-100 text-green-800`
- `category`: カテゴリー表示（NEW, SALE）
  - `bg-blue-600 text-white`, `bg-orange-600 text-white`
- `tag`: タグ表示（お知らせ、キャンペーン）
  - `bg-blue-600 text-white`, `bg-orange-600 text-white`, `bg-green-600 text-white`

**Props:**
```typescript
{
  variant: 'status' | 'category' | 'tag'
  color: 'blue' | 'green' | 'orange' | 'red'
  children: string
}
```

#### Input
**種類:**
- Text Input
- Select

**Props:**
```typescript
{
  type?: 'text' | 'email' | 'password'
  placeholder?: string
  value?: string
  onChange?: (e) => void
  label?: string
  error?: string
}
```

#### Icon
**種類:**
- SVGアイコンラッパー
- FontAwesomeアイコン対応

### 2. Molecules（分子）- 複合コンポーネント

#### ProductCard
**使用箇所:** Home, MyPage, Favorites
**構成要素:**
- 商品画像（aspect-square）
- Badge（NEW, SALEなど）
- 商品名（Link）
- 商品コード
- 価格
- Button（カートに追加）

**Props:**
```typescript
{
  id: string
  name: string
  code: string
  price: string
  image: string
  badge?: { text: string, color: string }
  onAddToCart?: () => void
}
```

#### CategoryCard
**使用箇所:** Home
**構成要素:**
- Icon（カテゴリーアイコン）
- カテゴリー名

**Props:**
```typescript
{
  name: string
  icon: ReactNode
  href: string
}
```

#### NewsItem
**使用箇所:** Home
**構成要素:**
- 日付
- Badge（タグ）
- タイトル（Link）

**Props:**
```typescript
{
  date: string
  tag: { text: string, color: string }
  title: string
  href: string
}
```

#### OrderCard
**使用箇所:** MyPage, OrderHistory
**構成要素:**
- 注文番号、日付
- Badge（ステータス）
- OrderItem[]
- 合計金額
- Button（詳細を見る）

**Props:**
```typescript
{
  id: string
  date: string
  status: { text: string, color: string }
  items: OrderItem[]
  total: string
  onViewDetail?: () => void
}
```

#### OrderItem
**使用箇所:** OrderCard内
**構成要素:**
- 商品画像
- 商品名、コード
- 数量
- 価格

**Props:**
```typescript
{
  name: string
  code: string
  image: string
  quantity: number
  price: string
}
```

#### InfoField
**使用箇所:** MyPage（登録情報）
**構成要素:**
- ラベル（text-sm text-gray-600）
- 値（text-lg font-medium）

**Props:**
```typescript
{
  label: string
  value: string
  valueColor?: string
}
```

#### SearchBar
**使用箇所:** Header
**構成要素:**
- Icon（検索アイコン）
- Input
- Button（検索ボタン）

### 3. Organisms（有機体）- 複雑なコンポーネント

#### ProductGrid
**使用箇所:** Home, MyPage
**構成要素:**
- ProductCard[] をグリッドレイアウトで表示
- セクションタイトル
- Link（すべて見る）

**Props:**
```typescript
{
  title: string
  products: Product[]
  columns?: 2 | 3 | 4
  showViewAll?: boolean
  viewAllHref?: string
}
```

#### CategoryGrid
**使用箇所:** Home
**構成要素:**
- CategoryCard[] をグリッドレイアウトで表示
- セクションタイトル

#### OrderList
**使用箇所:** OrderHistory
**構成要素:**
- OrderCard[]
- フィルター（Select）
- Pagination

#### NewsList
**使用箇所:** Home
**構成要素:**
- NewsItem[]
- セクションタイトル
- Link（すべて見る）

#### Pagination
**使用箇所:** OrderHistory
**構成要素:**
- Button（前へ、次へ）
- ページ番号ボタン

### 4. Templates（テンプレート）

#### PageLayout
**用途:** 基本的なページレイアウト
**構成要素:**
- Header
- main（children）
- Footer

#### SidebarLayout
**用途:** サイドバー付きページレイアウト
**構成要素:**
- Header
- コンテナ（max-w-7xl）
  - Sidebar
  - main（children）
- Footer

## 実装順序

### Phase 1: Atoms（優先度: 高）
1. ✅ Button（8バリアント：primary, secondary, outline, outline-danger, ghost, link, icon, icon-filled）
   - 詳細: `BUTTON_VARIANTS.md` 参照
   - サイズ: sm, md, lg, icon
   - 状態: disabled, loading, active
   - オプション: fullWidth, leftIcon, rightIcon
2. ✅ Badge（4バリアント：default, new, sale, status）
3. ✅ Input
4. ✅ Select
5. ✅ Icon

### Phase 2: Molecules（優先度: 高）
1. ✅ ProductCard
2. ✅ OrderCard
3. ✅ OrderItem
4. ✅ CategoryCard
5. ✅ NewsItem
6. ✅ InfoField

### Phase 3: Organisms（優先度: 中）
1. ✅ ProductGrid
2. ✅ OrderList
3. ✅ CategoryGrid
4. ✅ NewsList
5. ✅ Pagination
6. ✅ Header（既存をリファクタ）
7. ✅ Footer（既存をリファクタ）
8. ✅ Sidebar（既存をリファクタ）

### Phase 4: Templates（優先度: 中）
1. ✅ PageLayout
2. ✅ SidebarLayout

### Phase 5: Refactoring（優先度: 高）
1. ✅ Home ページをリファクタ
2. ✅ MyPage ページをリファクタ
3. ✅ OrderHistory ページをリファクタ
4. ✅ Favorites ページをリファクタ

### Phase 6: Documentation（優先度: 低）
1. ✅ Storybook または ドキュメントサイト構築
2. ✅ 各コンポーネントの使用例
3. ✅ デザイントークン定義

## デザイントークン

### Colors
```css
/* Primary */
--color-primary: #2563eb; /* blue-600 */
--color-primary-hover: #1d4ed8; /* blue-700 */

/* Status */
--color-status-info: #dbeafe; /* blue-100 */
--color-status-success: #d1fae5; /* green-100 */
--color-status-warning: #fed7aa; /* orange-100 */

/* Text */
--color-text-primary: #111827; /* gray-900 */
--color-text-secondary: #6b7280; /* gray-600 */
--color-text-muted: #9ca3af; /* gray-500 */

/* Background */
--color-bg-primary: #ffffff;
--color-bg-secondary: #f9fafb; /* gray-50 */
```

### Spacing
Tailwind標準のスペーシングシステムを使用
- `4` = 1rem = 16px
- `8` = 2rem = 32px
- `12` = 3rem = 48px

### Typography
```css
/* Headings */
--font-size-h1: 1.875rem; /* text-3xl */
--font-size-h2: 1.5rem; /* text-2xl */
--font-size-h3: 1.25rem; /* text-xl */

/* Body */
--font-size-base: 1rem; /* text-base */
--font-size-sm: 0.875rem; /* text-sm */
--font-size-xs: 0.75rem; /* text-xs */
```

## 次のステップ
1. Atomsコンポーネントの実装から開始
2. 各コンポーネントにPropsの型定義を追加
3. 既存ページを新しいコンポーネントを使用してリファクタリング
4. Storybookでコンポーネントカタログを作成（オプション）
