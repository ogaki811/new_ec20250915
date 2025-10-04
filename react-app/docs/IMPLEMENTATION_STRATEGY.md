# デザインシステム実装戦略

## 📋 プロジェクト概要

既存のHTMLベースECサイトをReactコンポーネント化し、Tailwind CSSを活用した保守性の高いデザインシステムを構築します。

**主要な方針:**
- ✅ 既存HTMLの構造とスタイルを最大限活用
- ✅ Tailwind CSSで実装（独自CSS最小化）
- ✅ Atomic Design原則に基づくコンポーネント設計
- ✅ 再利用性と拡張性を重視

## 🏗️ アーキテクチャ概要

### ディレクトリ構造

```
src/
├── components/
│   ├── atoms/              # 最小単位（Button, Badge, Input等）
│   │   ├── Button/
│   │   │   ├── index.jsx
│   │   │   └── Button.stories.jsx  # (オプション)
│   │   ├── Badge/
│   │   ├── Input/
│   │   ├── Select/
│   │   └── Icon/
│   │
│   ├── molecules/          # 組み合わせ（ProductCard, OrderCard等）
│   │   ├── ProductCard/
│   │   ├── CategoryCard/
│   │   ├── OrderCard/
│   │   ├── OrderItem/
│   │   ├── NewsItem/
│   │   └── InfoField/
│   │
│   ├── organisms/          # 複雑な構造（ProductGrid, Header等）
│   │   ├── ProductGrid/
│   │   ├── CategoryGrid/
│   │   ├── OrderList/
│   │   ├── NewsList/
│   │   ├── Pagination/
│   │   ├── Header/
│   │   ├── Footer/
│   │   └── Sidebar/
│   │
│   └── templates/          # ページレイアウト
│       ├── PageLayout/
│       └── SidebarLayout/
│
├── pages/                  # ページコンポーネント
│   ├── Home.jsx
│   ├── MyPage.jsx
│   ├── OrderHistory.jsx
│   └── Favorites.jsx
│
├── hooks/                  # カスタムフック（今後）
│   └── useProductCard.js
│
└── utils/                  # ユーティリティ関数
    └── classNames.js       # クラス名結合用
```

## 🎨 スタイリング戦略

### 1. Tailwind優先アプローチ

**基本方針:**
- すべてのスタイルをTailwindユーティリティクラスで記述
- 独自CSSは極力使用しない
- `@apply`ディレクティブも使用しない（バンドルサイズ削減）

**Tailwindで実装するもの:**
- レイアウト（flexbox, grid）
- スペーシング（padding, margin）
- タイポグラフィ（font-size, font-weight）
- カラー（background, text, border）
- トランジション・アニメーション（基本的なもの）
- レスポンシブデザイン（sm:, md:, lg:）

**独自CSS/JSで実装するもの（最小限）:**
- 複雑なキーフレームアニメーション
- スライダー固有の動作（JavaScriptで制御）

### 2. 既存HTMLからのマッピング

#### 商品カード例

**既存HTML:**
```html
<div class="product-card">
  <div class="product-image">
    <img src="..." alt="...">
    <span class="product-badge">NEW</span>
    <button class="product-favorite">♡</button>
  </div>
  <div class="product-info">
    <h3 class="product-title">商品名</h3>
    <p class="product-code">商品コード: XXX</p>
    <p class="product-price">¥2,990</p>
    <button class="btn btn-add-cart">カートに追加</button>
  </div>
</div>
```

**Reactコンポーネント（Tailwind使用）:**
```jsx
<div className="bg-white rounded-lg overflow-hidden transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5">
  <div className="relative overflow-hidden group">
    <img
      className="w-full h-45 object-cover transition-transform duration-300 group-hover:scale-105"
      src={image}
      alt={name}
    />
    <Badge variant="new" className="absolute top-2 left-2">NEW</Badge>
    <button className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow hover:bg-gray-100 hover:scale-110 transition-all">
      ♡
    </button>
  </div>
  <div className="p-4">
    <h3 className="text-lg font-semibold mb-2 text-gray-900 hover:text-blue-600">
      {name}
    </h3>
    <p className="text-xs text-gray-500 mb-2">商品コード: {code}</p>
    <p className="text-base font-semibold text-blue-600 mb-3">¥{price}</p>
    <Button variant="primary" fullWidth>カートに追加</Button>
  </div>
</div>
```

### 3. レスポンシブ設計

**ブレークポイント:**
```javascript
// Tailwind defaults
sm: '640px'   // タブレット縦
md: '768px'   // タブレット横
lg: '1024px'  // デスクトップ
xl: '1280px'  // 大画面
```

**レスポンシブパターン:**
```jsx
// グリッドレイアウト
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

// 表示/非表示切り替え
<div className="hidden lg:block">デスクトップのみ</div>
<div className="lg:hidden">モバイル/タブレットのみ</div>

// スペーシング調整
<div className="p-4 lg:p-8">
```

## 🧩 コンポーネント実装計画

### Phase 1: Atoms（基礎コンポーネント）

#### 1.1 Button（完全版）
> **詳細:** `BUTTON_VARIANTS.md` 参照

```jsx
// src/components/atoms/Button/index.jsx
export default function Button({
  variant = 'primary',  // 'primary' | 'secondary' | 'outline' | 'outline-danger' | 'ghost' | 'link' | 'icon' | 'icon-filled'
  size = 'md',          // 'sm' | 'md' | 'lg' | 'icon'
  disabled = false,
  loading = false,
  active = false,
  fullWidth = false,
  type = 'button',
  onClick,
  className = '',
  children,
  leftIcon,
  rightIcon,
  ...props
}) {
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50',
    outline: 'border-2 border-blue-600 text-blue-600 bg-transparent hover:bg-blue-600 hover:text-white',
    'outline-danger': 'border-2 border-red-600 text-red-600 bg-transparent hover:bg-red-600 hover:text-white',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
    link: 'bg-transparent text-blue-600 hover:text-blue-800 hover:underline underline-offset-2',
    icon: 'bg-white p-2 rounded-full shadow hover:bg-gray-100 hover:scale-110',
    'icon-filled': 'bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    icon: 'p-2 w-10 h-10',
  };

  const activeStyle = active && variant === 'secondary' ? 'bg-blue-600 text-white hover:bg-blue-600' : '';
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium transition-colors rounded-lg disabled:opacity-50 disabled:cursor-not-allowed';
  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${activeStyle} ${className}`.trim().replace(/\s+/g, ' ')}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {leftIcon && <span className="flex items-center">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="flex items-center">{rightIcon}</span>}
    </button>
  );
}
```

**バリアント一覧:**
- `primary`: カートに追加、検索、ログインなど
- `secondary`: 詳細を見る、キャンセル、ページネーション
- `outline`: 追跡、再注文、レシートなど
- `outline-danger`: 注文キャンセル、削除など
- `ghost`: ドロップダウン内ボタン
- `link`: すべて見る、もっと見る
- `icon`: お気に入り、閉じるボタン
- `icon-filled`: 検索アイコンボタン

**使用例:**
```jsx
<Button variant="primary" size="sm" fullWidth>カートに追加</Button>
<Button variant="outline" size="sm">追跡</Button>
<Button variant="outline-danger" size="sm">キャンセル</Button>
<Button variant="secondary" size="sm" active>1</Button>
<Button variant="icon" size="icon"><HeartIcon /></Button>
<Button variant="primary" loading>処理中...</Button>
```

#### 1.2 Badge
```jsx
// src/components/atoms/Badge/index.jsx
export default function Badge({
  variant = 'default',  // 'default' | 'new' | 'sale' | 'status'
  color = 'blue',       // 'blue' | 'red' | 'green' | 'orange'
  children,
  className = '',
}) {
  const baseClasses = 'inline-block px-2 py-0.5 text-xs font-semibold rounded';

  const colorClasses = {
    blue: 'bg-blue-600 text-white',
    red: 'bg-red-600 text-white',
    green: 'bg-green-100 text-green-800',
    orange: 'bg-orange-600 text-white',
  };

  const variantClasses = {
    default: '',
    new: 'absolute top-2 left-2',
    sale: 'absolute top-2 left-2',
    status: 'px-3 py-1 rounded-full',
  };

  return (
    <span className={`${baseClasses} ${colorClasses[color]} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
}
```

#### 1.3 Input & Select
```jsx
// src/components/atoms/Input/index.jsx
export default function Input({
  label,
  error,
  className = '',
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${error ? 'border-red-500' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
```

### Phase 2: Molecules（複合コンポーネント）

#### 2.1 ProductCard
```jsx
// src/components/molecules/ProductCard/index.jsx
import Button from '../../atoms/Button';
import Badge from '../../atoms/Badge';

export default function ProductCard({
  id,
  name,
  code,
  price,
  salePrice,
  originalPrice,
  image,
  badge,
  onAddToCart,
  onToggleFavorite,
}) {
  return (
    <div className="bg-white rounded-lg overflow-hidden transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5">
      {/* 画像エリア */}
      <div className="relative overflow-hidden group">
        <Link to={`/product/${id}`}>
          <img
            className="w-full h-45 object-cover transition-transform duration-300 group-hover:scale-105"
            src={image}
            alt={name}
          />
        </Link>

        {/* バッジ */}
        {badge && (
          <Badge variant={badge.variant} color={badge.color}>
            {badge.text}
          </Badge>
        )}

        {/* お気に入りボタン */}
        <button
          onClick={onToggleFavorite}
          className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow hover:bg-gray-100 hover:scale-110 transition-all"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      {/* 情報エリア */}
      <div className="p-4">
        <Link to={`/product/${id}`}>
          <h3 className="text-lg font-semibold mb-2 text-gray-900 hover:text-blue-600 transition-colors">
            {name}
          </h3>
        </Link>
        <p className="text-xs text-gray-500 mb-2">商品コード: {code}</p>

        {/* 価格 */}
        {salePrice ? (
          <p className="mb-3">
            <span className="text-base font-semibold text-red-600 mr-1.5">
              ¥{salePrice.toLocaleString()}
            </span>
            <span className="text-sm text-gray-400 line-through">
              ¥{originalPrice.toLocaleString()}
            </span>
          </p>
        ) : (
          <p className="text-base font-semibold text-blue-600 mb-3">
            ¥{price.toLocaleString()}
          </p>
        )}

        <Button variant="primary" size="sm" fullWidth onClick={onAddToCart}>
          カートに追加
        </Button>
      </div>
    </div>
  );
}
```

#### 2.2 OrderCard
```jsx
// src/components/molecules/OrderCard/index.jsx
import Badge from '../../atoms/Badge';
import Button from '../../atoms/Button';
import OrderItem from '../OrderItem';

export default function OrderCard({
  id,
  date,
  status,
  items,
  total,
  onViewDetail,
}) {
  const statusColorMap = {
    '配送中': 'blue',
    '配送完了': 'green',
    'キャンセル': 'red',
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6">
      {/* ヘッダー */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 pb-4 border-b border-gray-200">
        <div className="mb-4 md:mb-0">
          <p className="font-semibold text-gray-900 text-lg">注文番号: {id}</p>
          <p className="text-sm text-gray-600 mt-1">{date}</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="status" color={statusColorMap[status.text]}>
            {status.text}
          </Badge>
          <Button variant="secondary" size="sm" onClick={onViewDetail}>
            詳細を見る
          </Button>
        </div>
      </div>

      {/* 商品リスト */}
      <div className="space-y-4">
        {items.map((item, index) => (
          <OrderItem key={index} {...item} />
        ))}
      </div>

      {/* 合計 */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold text-gray-900">合計金額</p>
          <p className="text-2xl font-bold text-gray-900">¥{total.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
```

### Phase 3: Organisms（複雑なコンポーネント）

#### 3.1 ProductGrid
```jsx
// src/components/organisms/ProductGrid/index.jsx
import ProductCard from '../../molecules/ProductCard';
import { Link } from 'react-router-dom';

export default function ProductGrid({
  title,
  products,
  columns = 4,
  showViewAll = false,
  viewAllHref = '#',
}) {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
          {showViewAll && (
            <Link to={viewAllHref} className="text-blue-600 hover:text-blue-800 font-medium">
              すべて見る →
            </Link>
          )}
        </div>

        <div className={`grid ${gridCols[columns]} gap-6`}>
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

### Phase 4: Templates（レイアウト）

#### 4.1 PageLayout
```jsx
// src/components/templates/PageLayout/index.jsx
import Header from '../../organisms/Header';
import Footer from '../../organisms/Footer';

export default function PageLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
```

#### 4.2 SidebarLayout
```jsx
// src/components/templates/SidebarLayout/index.jsx
import Header from '../../organisms/Header';
import Footer from '../../organisms/Footer';
import Sidebar from '../../organisms/Sidebar';

export default function SidebarLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            <Sidebar />
            <div className="lg:col-span-3 mt-8 lg:mt-0">
              {children}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
```

## 📝 実装スケジュール

### Week 1: Atoms
- [x] 計画・設計
- [ ] Button コンポーネント
- [ ] Badge コンポーネント
- [ ] Input コンポーネント
- [ ] Select コンポーネント
- [ ] Icon コンポーネント

### Week 2: Molecules
- [ ] ProductCard コンポーネント
- [ ] CategoryCard コンポーネント
- [ ] OrderCard コンポーネント
- [ ] OrderItem コンポーネント
- [ ] NewsItem コンポーネント
- [ ] InfoField コンポーネント

### Week 3: Organisms
- [ ] ProductGrid コンポーネント
- [ ] CategoryGrid コンポーネント
- [ ] OrderList コンポーネント
- [ ] NewsList コンポーネント
- [ ] Pagination コンポーネント
- [ ] Header リファクタリング
- [ ] Footer リファクタリング
- [ ] Sidebar リファクタリング

### Week 4: Templates & Pages
- [ ] PageLayout テンプレート
- [ ] SidebarLayout テンプレート
- [ ] Home ページリファクタリング
- [ ] MyPage ページリファクタリング
- [ ] OrderHistory ページリファクタリング
- [ ] Favorites ページリファクタリング

### Week 5: ドキュメント & 仕上げ
- [ ] コンポーネントドキュメント作成
- [ ] 使用例・サンプルコード追加
- [ ] Storybook構築（オプション）
- [ ] パフォーマンス最適化
- [ ] アクセシビリティチェック

## ✅ 成功基準

1. **コード品質**
   - すべてのコンポーネントが再利用可能
   - Propsの型定義が明確
   - 独自CSS使用率 < 10%

2. **パフォーマンス**
   - バンドルサイズ削減
   - 初期ロード時間 < 2秒

3. **保守性**
   - 新規コンポーネント追加が容易
   - スタイル変更が一箇所で完結
   - ドキュメントが充実

## 🚀 次のアクション

1. **Atomsコンポーネントの実装開始**
   - Button, Badge, Input, Selectを実装
   - 100% Tailwindで記述
   - Propsの型定義を追加

2. **コミット戦略**
   - 各コンポーネント実装ごとにコミット
   - フィーチャーブランチで作業
   - レビュー後にmainへマージ

進捗状況は`DESIGN_SYSTEM_PLAN.md`で随時更新します。
