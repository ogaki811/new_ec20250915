# CSS to Tailwind マッピング計画

## 概要
既存のカスタムCSSをTailwind CSSクラスに置き換え、独自CSSの使用を最小限に抑えます。

## 既存CSSクラスのTailwindへのマッピング

### 1. ボタン関連

#### `.btn` (基本ボタン)
```css
/* 既存CSS */
.btn {
    display: inline-block;
    padding: var(--spacing-md) var(--spacing-xl);  /* 12px 24px */
    border: none;
    border-radius: var(--border-radius-sm);  /* 4px */
    text-align: center;
    font-size: var(--font-size-sm);  /* 14px */
    font-weight: var(--font-weight-medium);  /* 500 */
    cursor: pointer;
    transition: var(--transition-all);
}

/* Tailwind変換 */
className="inline-block px-6 py-3 border-0 rounded text-center text-sm font-medium cursor-pointer transition-all"
```

#### `.btn-primary`, `.btn-add-cart`
```css
/* 既存CSS */
.btn-primary, .btn-add-cart {
    background-color: var(--color-primary);  /* #2563eb / blue-600 */
    color: var(--color-text-white);
}
.btn-primary:hover, .btn-add-cart:hover {
    background-color: var(--color-primary-hover);  /* #1d4ed8 / blue-700 */
}

/* Tailwind変換 */
className="bg-blue-600 text-white hover:bg-blue-700"
```

#### `.btn-add-cart`（商品カード用）
```css
/* 既存CSS */
.btn-add-cart {
    width: 100%;
    padding: 0.5rem;
    border-radius: 6px;
    font-size: 0.85rem;
}

/* Tailwind変換 */
className="w-full py-2 rounded-md text-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors"
```

### 2. 商品カード関連

#### `.product-card`
```css
/* 既存CSS */
.product-card {
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.3s, box-shadow 0.3s;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.08);
}
.product-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.12);
}

/* Tailwind変換 */
className="bg-white rounded-lg overflow-hidden transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5"
```

#### `.product-image`
```css
/* 既存CSS */
.product-image {
    position: relative;
    overflow: hidden;
}
.product-image img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    transition: transform 0.3s;
}
.product-card:hover .product-image img {
    transform: scale(1.05);
}

/* Tailwind変換 */
<div className="relative overflow-hidden group">
  <img className="w-full h-45 object-cover transition-transform duration-300 group-hover:scale-105" />
</div>
```

#### `.product-badge`
```css
/* 既存CSS */
.product-badge {
    position: absolute;
    top: 8px;
    left: 8px;
    background-color: #007bff;  /* blue-600相当 */
    color: white;
    padding: 2px 6px;
    font-size: 10px;
    font-weight: 600;
    border-radius: 3px;
}
.product-badge.sale {
    background-color: #dc3545;  /* red-600相当 */
}

/* Tailwind変換 */
className="absolute top-2 left-2 bg-blue-600 text-white px-1.5 py-0.5 text-xs font-semibold rounded"
className="absolute top-2 left-2 bg-red-600 text-white px-1.5 py-0.5 text-xs font-semibold rounded"  /* SALE用 */
```

#### `.product-favorite`
```css
/* 既存CSS */
.product-favorite {
    position: absolute;
    top: 8px;
    right: 8px;
    background-color: white;
    border: none;
    padding: 6px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}
.product-favorite:hover {
    background-color: #f8f9fa;
    transform: scale(1.1);
}

/* Tailwind変換 */
className="absolute top-2 right-2 bg-white border-0 p-1.5 rounded-full cursor-pointer transition-all duration-300 shadow hover:bg-gray-100 hover:scale-110"
```

#### `.product-info`
```css
/* 既存CSS */
.product-info {
    padding: 1rem;
}

/* Tailwind変換 */
className="p-4"
```

#### `.product-title`
```css
/* 既存CSS */
.product-title {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    line-height: 1.3;
    color: var(--color-text-primary);
}
.product-title-link:hover .product-title {
    color: var(--color-primary);
}

/* Tailwind変換 */
className="text-lg font-semibold mb-2 leading-tight text-gray-900 hover:text-blue-600"
```

#### `.product-code`
```css
/* 既存CSS */
.product-code {
    font-size: 0.7rem;
    color: var(--color-text-muted);
    margin-bottom: 0.5rem;
}

/* Tailwind変換 */
className="text-xs text-gray-500 mb-2"
```

#### `.product-price`
```css
/* 既存CSS */
.product-price {
    font-size: 0.95rem;
    font-weight: 600;
    color: #007bff;
    margin-bottom: 0.75rem;
}

/* Tailwind変換 */
className="text-base font-semibold text-blue-600 mb-3"
```

#### `.price-sale`, `.price-original`
```css
/* 既存CSS */
.price-sale {
    color: #dc3545;
    margin-right: 0.4rem;
}
.price-original {
    color: #999;
    text-decoration: line-through;
    font-size: 0.8rem;
    font-weight: 400;
}

/* Tailwind変換 */
className="text-red-600 mr-1.5"  /* SALE価格 */
className="text-gray-400 line-through text-sm font-normal"  /* 元の価格 */
```

### 3. カテゴリーカード関連

#### `.category-card`
```css
/* 既存CSS */
.category-card {
    text-decoration: none;
    color: inherit;
    border-radius: 12px;
    overflow: hidden;
    transition: transform 0.3s, box-shadow 0.3s;
    background-color: white;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}
.category-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

/* Tailwind変換 */
className="no-underline text-inherit rounded-xl overflow-hidden transition-all duration-300 bg-white shadow-md hover:shadow-2xl hover:-translate-y-1"
```

#### `.category-card.compact`
```css
/* 既存CSS */
.category-card.compact {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    height: 100px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
.category-card.compact:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

/* Tailwind変換 */
className="flex flex-col items-center justify-center p-4 h-25 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
```

#### `.category-icon`
```css
/* 既存CSS */
.category-icon {
    display: flex;
    align-items: center;
    justify-center: center;
    width: 40px;
    height: 40px;
    background-color: #e3f2fd;  /* blue-100相当 */
    border-radius: 50%;
    margin-bottom: 0.5rem;
}

/* Tailwind変換 */
className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full mb-2"
```

### 4. セクション・レイアウト関連

#### `.section-title`
```css
/* 既存CSS */
.section-title {
    font-size: var(--font-size-xxxl);  /* 2rem / text-3xl */
    font-weight: var(--font-weight-semibold);  /* 600 */
    margin-bottom: var(--spacing-xl);  /* 24px / mb-6 */
    text-align: center;
    color: var(--color-text-primary);
}

/* Tailwind変換 */
className="text-3xl font-semibold mb-6 text-center text-gray-900"
```

#### `.container`
```css
/* 既存CSS */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Tailwind変換 */
className="max-w-7xl mx-auto px-5"
```

### 5. グリッドレイアウト

#### `.products-grid`
```css
/* 既存CSS */
.products-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
}

/* Tailwind変換 */
className="grid grid-cols-4 gap-6"
/* レスポンシブ版 */
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
```

#### `.categories-grid.compact`
```css
/* 既存CSS */
.categories-grid.compact {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 1rem;
    padding: 1rem 0;
}

/* Tailwind変換 */
className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 py-4"
```

### 6. スライダー関連（独自CSS必要）

#### `.slider-arrow`
```css
/* 独自CSS必要（複雑なホバー効果） */
.slider-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(255, 255, 255, 0.9);
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;
    z-index: 10;
}
.slider-arrow:hover {
    background-color: white;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    transform: translateY(-50%) scale(1.1);
}

/* Tailwind + カスタムクラス */
className="absolute top-1/2 -translate-y-1/2 bg-white/90 border-0 rounded-full w-12 h-12 flex items-center justify-center cursor-pointer transition-all duration-300 z-10 hover:bg-white hover:shadow-lg hover:scale-110"
```

## コンポーネント別Tailwindクラス定義

### Button コンポーネント

```jsx
// Primary Button
<button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium transition-colors hover:bg-blue-700">
  {children}
</button>

// Secondary Button
<button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium transition-colors hover:bg-gray-50">
  {children}
</button>

// Add to Cart Button
<button className="w-full py-2 bg-blue-600 text-white rounded-md text-sm font-medium transition-colors hover:bg-blue-700">
  カートに追加
</button>

// Link Button
<button className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
  {children} →
</button>
```

### Badge コンポーネント

```jsx
// Status Badge - Info
<span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
  配送中
</span>

// Status Badge - Success
<span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
  配送完了
</span>

// Product Badge - NEW
<span className="absolute top-2 left-2 bg-blue-600 text-white px-1.5 py-0.5 text-xs font-semibold rounded">
  NEW
</span>

// Product Badge - SALE
<span className="absolute top-2 left-2 bg-red-600 text-white px-1.5 py-0.5 text-xs font-semibold rounded">
  SALE
</span>

// Tag Badge
<span className="bg-blue-600 text-white px-2 py-1 text-xs rounded">
  お知らせ
</span>
```

### ProductCard コンポーネント

```jsx
<div className="bg-white rounded-lg overflow-hidden transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5">
  {/* 商品画像エリア */}
  <div className="relative overflow-hidden group">
    <img
      className="w-full h-45 object-cover transition-transform duration-300 group-hover:scale-105"
      src={image}
      alt={name}
    />
    {/* バッジ */}
    <span className="absolute top-2 left-2 bg-blue-600 text-white px-1.5 py-0.5 text-xs font-semibold rounded">
      NEW
    </span>
    {/* お気に入りボタン */}
    <button className="absolute top-2 right-2 bg-white border-0 p-1.5 rounded-full cursor-pointer transition-all duration-300 shadow hover:bg-gray-100 hover:scale-110">
      <svg>...</svg>
    </button>
  </div>

  {/* 商品情報エリア */}
  <div className="p-4">
    <h3 className="text-lg font-semibold mb-2 leading-tight text-gray-900 hover:text-blue-600">
      {name}
    </h3>
    <p className="text-xs text-gray-500 mb-2">商品コード: {code}</p>
    <p className="text-base font-semibold text-blue-600 mb-3">¥{price}</p>
    <button className="w-full py-2 bg-blue-600 text-white rounded-md text-sm font-medium transition-colors hover:bg-blue-700">
      カートに追加
    </button>
  </div>
</div>
```

### CategoryCard コンポーネント

```jsx
<a
  href={href}
  className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
>
  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3">
    {icon}
  </div>
  <h3 className="font-medium text-gray-900">{name}</h3>
</a>
```

## 残すべき独自CSS

以下のケースは独自CSSまたはTailwindのカスタマイズが必要：

1. **複雑なホバーエフェクト**
   - `transform: translateY(-50%) scale(1.1)` のような組み合わせ

2. **グループホバー効果**
   - 親のホバーで子要素が変化するパターン（Tailwindの`group`で対応可能）

3. **カスタムアニメーション**
   - スライダーのトランジション効果

4. **ブレークポイント固有の複雑なレイアウト**
   - メディアクエリでの特殊なレイアウト変更

## 実装方針

1. **Phase 1: 基本コンポーネントをTailwindで実装**
   - Button, Badge, Input, Select
   - 100% Tailwindで実装可能

2. **Phase 2: 複合コンポーネントをTailwindで実装**
   - ProductCard, CategoryCard, OrderCard
   - 主にTailwind、一部`group`機能使用

3. **Phase 3: 独自CSS最小化**
   - Tailwindで表現困難な部分のみ独自CSS
   - `@apply`ディレクティブは使用しない（ビルドサイズ削減のため）

4. **Phase 4: レスポンシブ対応**
   - Tailwindのブレークポイントを活用
   - `sm:`, `md:`, `lg:`プレフィックス使用

## 次のステップ

1. ✅ CSS → Tailwindマッピング完了
2. ⏳ Atomsコンポーネント実装（100% Tailwind）
3. ⏳ Moleculesコンポーネント実装（主にTailwind + group）
4. ⏳ 既存ページリファクタリング
