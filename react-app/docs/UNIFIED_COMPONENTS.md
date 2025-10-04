# 統一コンポーネント設計

## 概要
同じようなパーツを1つのコンポーネントで表示できるよう、柔軟なバリアント設計を行います。

## 🔍 重複パターンの分析

### 1. 商品カード（ProductCard）
**使用箇所:** Home, MyPage, Favorites

**共通要素:**
- 商品画像
- 商品名
- 商品コード
- 価格
- カートに追加ボタン

**差分:**
- バッジの有無（NEW, SALE）
- お気に入りボタンの表示/非表示
- セール価格表示の有無
- 在庫表示の有無（Favoritesのみ）

**統一コンポーネント設計:**
```jsx
<ProductCard
  id="8027341"
  name="ボールペン 10本セット"
  code="802734"
  price={1200}
  image="/img/product/8027341_l1.jpg"

  // オプション
  badge={{ text: 'NEW', color: 'blue' }}  // バッジ
  salePrice={4990}                        // セール価格
  originalPrice={7990}                    // 元の価格
  stock="あり"                            // 在庫表示
  showFavorite={true}                     // お気に入りボタン表示
  isFavorited={false}                     // お気に入り済み

  // イベント
  onAddToCart={() => {}}
  onToggleFavorite={() => {}}
/>
```

### 2. セクションヘッダー（SectionHeader）
**使用箇所:** Home（おすすめ商品、新着情報など）、MyPage（最近の注文）

**共通要素:**
- セクションタイトル
- 「すべて見る」リンク（オプション）

**差分:**
- タイトルのサイズ（h2, h3）
- 「すべて見る」の有無
- スタイル（中央寄せ、左寄せ）

**統一コンポーネント設計:**
```jsx
<SectionHeader
  title="おすすめ商品"
  level={2}                    // 1, 2, 3（h1, h2, h3）
  align="left"                 // 'left' | 'center'
  showViewAll={true}           // すべて見るリンク表示
  viewAllHref="/products"      // リンク先
  viewAllText="すべて見る"     // リンクテキスト
/>
```

### 3. 情報フィールド（InfoField）
**使用箇所:** MyPage（登録情報）

**共通要素:**
- ラベル
- 値

**差分:**
- 値の色（通常、強調、ポイントなど）
- 値のサイズ

**統一コンポーネント設計:**
```jsx
<InfoField
  label="お名前"
  value="山田 太郎"
  valueColor="default"  // 'default' | 'primary' | 'success' | 'warning'
  size="md"             // 'sm' | 'md' | 'lg'
/>

// 使用例
<InfoField label="会員ランク" value="ゴールド会員" valueColor="primary" />
<InfoField label="保有ポイント" value="2,500 ポイント" valueColor="success" />
```

### 4. カード（Card）
**使用箇所:** 商品カード、カテゴリーカード、ニュースカード

**共通要素:**
- 白背景
- 角丸
- ホバーエフェクト（影、移動）

**差分:**
- 内容（子要素）
- ホバーエフェクトの強さ

**統一コンポーネント設計:**
```jsx
<Card
  variant="default"     // 'default' | 'compact' | 'elevated'
  hover="medium"        // 'none' | 'light' | 'medium' | 'strong'
  as="div"              // 'div' | 'a' | Link
  href="#"              // as="a"またはLinkの場合
>
  {children}
</Card>

// variant別スタイル
// default: 通常の影、ホバーで少し浮く
// compact: 小さめの影、控えめなホバー
// elevated: 大きめの影、強めのホバー
```

### 5. グリッドコンテナ（Grid）
**使用箇所:** 商品グリッド、カテゴリーグリッド

**共通要素:**
- グリッドレイアウト
- レスポンシブ対応

**差分:**
- カラム数（2, 3, 4, 6）
- ギャップサイズ

**統一コンポーネント設計:**
```jsx
<Grid
  cols={{ base: 1, sm: 2, lg: 4 }}  // レスポンシブカラム数
  gap={6}                            // ギャップサイズ（Tailwindスケール）
>
  {children}
</Grid>

// 使用例
<Grid cols={{ base: 1, sm: 2, lg: 4 }} gap={6}>
  {products.map(p => <ProductCard key={p.id} {...p} />)}
</Grid>

<Grid cols={{ base: 2, md: 3, lg: 6 }} gap={4}>
  {categories.map(c => <CategoryCard key={c.id} {...c} />)}
</Grid>
```

### 6. リストアイテム（ListItem）
**使用箇所:** ニュースアイテム、注文アイテム

**共通要素:**
- 水平レイアウト
- 区切り線（オプション）

**差分:**
- 内容構成
- 区切り線の有無

**統一コンポーネント設計:**
```jsx
// ニュースアイテム用
<ListItem divider={true}>
  <div className="flex items-center gap-4">
    <span className="text-sm text-gray-500">2024.01.15</span>
    <Badge color="blue">お知らせ</Badge>
    <Link to="#" className="text-gray-800 hover:text-blue-600">
      サイトリニューアルのお知らせ
    </Link>
  </div>
</ListItem>

// または専用コンポーネント
<NewsItem
  date="2024.01.15"
  tag={{ text: 'お知らせ', color: 'blue' }}
  title="サイトリニューアルのお知らせ"
  href="#"
/>
```

## 📦 コンポーネント統一設計

### 1. ProductCard（完全版）

```jsx
// src/components/molecules/ProductCard/index.jsx
import { Link } from 'react-router-dom';
import Button from '../../atoms/Button';
import Badge from '../../atoms/Badge';

export default function ProductCard({
  // 必須
  id,
  name,
  code,
  image,

  // 価格（どちらか必須）
  price,              // 通常価格
  salePrice,          // セール価格
  originalPrice,      // 元の価格（セール時）

  // オプション
  badge,              // { text: 'NEW', color: 'blue', variant: 'new' }
  stock,              // '在庫あり' | '残りわずか' | '在庫なし'
  showFavorite = true,
  isFavorited = false,

  // レイアウト
  size = 'default',   // 'compact' | 'default' | 'large'

  // イベント
  onAddToCart,
  onToggleFavorite,

  // その他
  className = '',
}) {
  // サイズ別スタイル
  const sizeStyles = {
    compact: {
      card: 'rounded-md',
      image: 'h-32',
      padding: 'p-3',
      title: 'text-sm',
      price: 'text-sm',
      button: 'py-1 text-xs',
    },
    default: {
      card: 'rounded-lg',
      image: 'h-45',
      padding: 'p-4',
      title: 'text-lg',
      price: 'text-base',
      button: 'py-2 text-sm',
    },
    large: {
      card: 'rounded-xl',
      image: 'h-60',
      padding: 'p-6',
      title: 'text-xl',
      price: 'text-lg',
      button: 'py-3 text-base',
    },
  };

  const styles = sizeStyles[size];

  return (
    <div className={`bg-white ${styles.card} overflow-hidden transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5 ${className}`}>
      {/* 画像エリア */}
      <div className="relative overflow-hidden group">
        <Link to={`/product/${id}`}>
          <img
            className={`w-full ${styles.image} object-cover transition-transform duration-300 group-hover:scale-105`}
            src={image}
            alt={name}
          />
        </Link>

        {/* バッジ */}
        {badge && (
          <Badge variant={badge.variant || 'new'} color={badge.color}>
            {badge.text}
          </Badge>
        )}

        {/* お気に入りボタン */}
        {showFavorite && (
          <button
            onClick={onToggleFavorite}
            className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow hover:bg-gray-100 hover:scale-110 transition-all"
            aria-label="お気に入りに追加"
          >
            <svg
              className={`w-5 h-5 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
              viewBox="0 0 24 24"
              fill={isFavorited ? 'currentColor' : 'none'}
              stroke="currentColor"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        )}
      </div>

      {/* 情報エリア */}
      <div className={styles.padding}>
        <Link to={`/product/${id}`}>
          <h3 className={`${styles.title} font-semibold mb-2 text-gray-900 hover:text-blue-600 transition-colors line-clamp-2`}>
            {name}
          </h3>
        </Link>

        <p className="text-xs text-gray-500 mb-2">商品コード: {code}</p>

        {/* 価格 */}
        {salePrice ? (
          <div className="mb-3">
            <span className={`${styles.price} font-semibold text-red-600 mr-1.5`}>
              ¥{salePrice.toLocaleString()}
            </span>
            <span className="text-sm text-gray-400 line-through">
              ¥{originalPrice.toLocaleString()}
            </span>
          </div>
        ) : (
          <p className={`${styles.price} font-semibold text-blue-600 mb-3`}>
            ¥{price.toLocaleString()}
          </p>
        )}

        {/* 在庫表示 */}
        {stock && (
          <p className={`text-sm mb-3 ${
            stock === '在庫あり' ? 'text-green-600' :
            stock === '残りわずか' ? 'text-orange-600' :
            'text-red-600'
          }`}>
            在庫: {stock}
          </p>
        )}

        {/* カートボタン */}
        {onAddToCart && (
          <Button
            variant="primary"
            fullWidth
            onClick={onAddToCart}
            className={styles.button}
          >
            カートに追加
          </Button>
        )}
      </div>
    </div>
  );
}
```

### 2. SectionHeader（完全版）

```jsx
// src/components/atoms/SectionHeader/index.jsx
import { Link } from 'react-router-dom';

export default function SectionHeader({
  title,
  level = 2,              // 1, 2, 3
  align = 'left',         // 'left' | 'center'
  showViewAll = false,
  viewAllHref = '#',
  viewAllText = 'すべて見る',
  className = '',
}) {
  const Tag = `h${level}`;

  const sizeClasses = {
    1: 'text-4xl',
    2: 'text-3xl',
    3: 'text-2xl',
  };

  const alignClass = align === 'center' ? 'text-center' : '';
  const containerClass = showViewAll && align === 'left' ? 'flex justify-between items-center' : '';

  return (
    <div className={`mb-8 ${containerClass} ${className}`}>
      <Tag className={`${sizeClasses[level]} font-bold text-gray-900 ${alignClass}`}>
        {title}
      </Tag>
      {showViewAll && (
        <Link
          to={viewAllHref}
          className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          {viewAllText} →
        </Link>
      )}
    </div>
  );
}
```

### 3. Card（汎用カード）

```jsx
// src/components/atoms/Card/index.jsx
import { Link } from 'react-router-dom';

export default function Card({
  variant = 'default',    // 'default' | 'compact' | 'elevated'
  hover = 'medium',       // 'none' | 'light' | 'medium' | 'strong'
  as = 'div',            // 'div' | 'a' | Link
  href,
  className = '',
  children,
  ...props
}) {
  const variantClasses = {
    default: 'rounded-lg shadow-sm',
    compact: 'rounded-md shadow-xs',
    elevated: 'rounded-xl shadow-md',
  };

  const hoverClasses = {
    none: '',
    light: 'hover:shadow-md hover:-translate-y-0.5',
    medium: 'hover:shadow-lg hover:-translate-y-1',
    strong: 'hover:shadow-2xl hover:-translate-y-2',
  };

  const baseClasses = `bg-white overflow-hidden transition-all duration-300 ${variantClasses[variant]} ${hoverClasses[hover]} ${className}`;

  if (as === Link) {
    return (
      <Link to={href} className={baseClasses} {...props}>
        {children}
      </Link>
    );
  }

  if (as === 'a') {
    return (
      <a href={href} className={baseClasses} {...props}>
        {children}
      </a>
    );
  }

  return (
    <div className={baseClasses} {...props}>
      {children}
    </div>
  );
}
```

### 4. Grid（汎用グリッド）

```jsx
// src/components/atoms/Grid/index.jsx
export default function Grid({
  cols = { base: 1, sm: 2, lg: 4 },  // レスポンシブカラム数
  gap = 6,                            // ギャップサイズ
  className = '',
  children,
}) {
  const getColsClass = () => {
    const classes = [];

    if (cols.base) classes.push(`grid-cols-${cols.base}`);
    if (cols.sm) classes.push(`sm:grid-cols-${cols.sm}`);
    if (cols.md) classes.push(`md:grid-cols-${cols.md}`);
    if (cols.lg) classes.push(`lg:grid-cols-${cols.lg}`);
    if (cols.xl) classes.push(`xl:grid-cols-${cols.xl}`);

    return classes.join(' ');
  };

  return (
    <div className={`grid ${getColsClass()} gap-${gap} ${className}`}>
      {children}
    </div>
  );
}
```

## 📋 使用例

### Home.jsx での使用

```jsx
import SectionHeader from '../components/atoms/SectionHeader';
import Grid from '../components/atoms/Grid';
import ProductCard from '../components/molecules/ProductCard';

function Home() {
  const products = [
    {
      id: '1',
      name: 'プレミアム商品',
      code: '802734',
      price: 2990,
      image: '/img/product/8027341_l1.jpg',
      badge: { text: 'NEW', color: 'blue' },
    },
    // ...
  ];

  return (
    <main>
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="おすすめ商品"
            showViewAll={true}
            viewAllHref="/products"
          />

          <Grid cols={{ base: 1, sm: 2, lg: 4 }} gap={6}>
            {products.map(product => (
              <ProductCard
                key={product.id}
                {...product}
                onAddToCart={() => console.log('Add to cart:', product.id)}
                onToggleFavorite={() => console.log('Toggle favorite:', product.id)}
              />
            ))}
          </Grid>
        </div>
      </section>
    </main>
  );
}
```

### Favorites.jsx での使用

```jsx
function Favorites() {
  const favorites = [
    {
      id: '1',
      name: 'A4コピー用紙 5000枚',
      code: 'AWA4132',
      price: 7990,
      image: '/img/product/AWA4132_l1.jpg',
      stock: '在庫あり',
    },
    // ...
  ];

  return (
    <main>
      <SectionHeader title="お気に入り" level={1} />

      <Grid cols={{ base: 1, sm: 2, lg: 3 }} gap={6}>
        {favorites.map(product => (
          <ProductCard
            key={product.id}
            {...product}
            showFavorite={true}
            isFavorited={true}
            stock={product.stock}
            onAddToCart={() => console.log('Add to cart')}
            onToggleFavorite={() => console.log('Remove from favorites')}
          />
        ))}
      </Grid>
    </main>
  );
}
```

## ✅ メリット

1. **コードの重複削減**
   - 同じようなパーツは1つのコンポーネントで表示
   - メンテナンスが容易

2. **柔軟性**
   - Propsでバリエーション制御
   - 新しい用途にも対応可能

3. **一貫性**
   - デザインの統一
   - 予測可能な動作

4. **保守性**
   - 変更が一箇所で完結
   - バグ修正が容易

## 🚀 次のステップ

1. 統一コンポーネントの実装
2. 既存ページのリファクタリング
3. デザインシステムドキュメント作成
