# レスポンシブデザイン詳細設計

## 概要
モバイルファーストアプローチで、すべてのデバイスサイズに最適化されたUIを提供します。

---

## 📱 ブレークポイント定義

### Tailwind CSS デフォルトブレークポイント
```typescript
{
  'sm': '640px',   // スマートフォン横向き・小型タブレット
  'md': '768px',   // タブレット縦向き
  'lg': '1024px',  // タブレット横向き・ノートPC
  'xl': '1280px',  // デスクトップ
  '2xl': '1536px', // 大型デスクトップ
}
```

### デバイスカテゴリ
| カテゴリ | 画面幅 | ブレークポイント | 主なデバイス |
|---------|-------|----------------|-------------|
| モバイル（縦） | 320px - 639px | デフォルト | iPhone, Android |
| モバイル（横） | 640px - 767px | sm | iPhone横向き |
| タブレット（縦） | 768px - 1023px | md | iPad縦向き |
| タブレット（横）/ノートPC | 1024px - 1279px | lg | iPad横向き、ノートPC |
| デスクトップ | 1280px - 1535px | xl | デスクトップ |
| 大型デスクトップ | 1536px+ | 2xl | 大型モニター |

---

## 🎨 コンポーネント別レスポンシブ設計

### 1. Header（ヘッダー）

#### 要件
- ✅ 横幅100%
- ✅ スクロール時に固定（sticky）
- ✅ モバイル: ハンバーガーメニュー
- ✅ デスクトップ: フルナビゲーション

#### 実装
```tsx
// src/components/organisms/Header/index.tsx
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      {/* コンテナ: 横幅制限 */}
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* ロゴ */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/img/header_logo.png"
                alt="smartsample"
                width={150}
                height={40}
                className="h-10 w-auto" // レスポンシブ対応
              />
            </Link>
          </div>

          {/* デスクトップナビゲーション（lg以上で表示） */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              ホーム
            </Link>
            <Link href="/mypage" className="text-gray-700 hover:text-blue-600 transition-colors">
              マイページ
            </Link>
            <Link href="/favorites" className="text-gray-700 hover:text-blue-600 transition-colors">
              お気に入り
            </Link>
            <Link href="/cart" className="text-gray-700 hover:text-blue-600 transition-colors">
              カート
            </Link>
          </nav>

          {/* 検索バー（md以上で表示） */}
          <div className="hidden md:flex items-center flex-1 max-w-md ml-8">
            <SearchBar />
          </div>

          {/* ユーザーメニュー & カートアイコン */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="icon" size="icon">
              <UserIcon className="w-5 h-5" />
            </Button>
            <Button variant="icon" size="icon">
              <ShoppingCartIcon className="w-5 h-5" />
            </Button>
          </div>

          {/* モバイルメニューボタン（lg未満で表示） */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700"
          >
            {mobileMenuOpen ? (
              <XIcon className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* モバイルメニュー（ドロワー） */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <nav className="px-4 py-4 space-y-3">
            <Link href="/" className="block py-2 text-gray-700">
              ホーム
            </Link>
            <Link href="/mypage" className="block py-2 text-gray-700">
              マイページ
            </Link>
            <Link href="/favorites" className="block py-2 text-gray-700">
              お気に入り
            </Link>
            <Link href="/cart" className="block py-2 text-gray-700">
              カート
            </Link>
          </nav>
          {/* モバイル検索 */}
          <div className="px-4 pb-4">
            <SearchBar />
          </div>
        </div>
      )}
    </header>
  );
}
```

#### レスポンシブ仕様
| デバイス | ロゴ | ナビゲーション | 検索バー | アクション |
|---------|------|--------------|---------|-----------|
| モバイル（<lg） | 表示 | ハンバーガーメニュー | ドロワー内 | ハンバーガー |
| デスクトップ（≥lg） | 表示 | 横並び表示 | ヘッダー内 | アイコン |

---

### 2. ProductGrid（商品グリッド）

#### 要件
- ✅ **おすすめ商品: 横6列（デスクトップ）**
- ✅ 通常商品: 横4列（デスクトップ）
- ✅ タブレット: 3-4列
- ✅ モバイル: 2列

#### 実装
```tsx
// src/components/organisms/ProductGrid/index.tsx
interface ProductGridProps {
  title: string;
  products: Product[];
  variant?: 'recommended' | 'normal'; // おすすめ or 通常
  showViewAll?: boolean;
  viewAllHref?: string;
}

export default function ProductGrid({
  title,
  products,
  variant = 'normal',
  showViewAll = false,
  viewAllHref = '#',
}: ProductGridProps) {
  // おすすめ商品は横6列、通常商品は横4列
  const gridClasses = variant === 'recommended'
    ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'
    : 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6';

  // おすすめ商品はcompactサイズ
  const productSize = variant === 'recommended' ? 'compact' : 'default';

  return (
    <section className="py-8">
      {/* セクションヘッダー */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        {showViewAll && (
          <Link href={viewAllHref}>
            <Button variant="link">
              すべて見る →
            </Button>
          </Link>
        )}
      </div>

      {/* 商品グリッド */}
      <div className={gridClasses}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            size={productSize}
          />
        ))}
      </div>
    </section>
  );
}
```

#### グリッド列数一覧
| variant | モバイル | sm | md | lg | xl |
|---------|---------|----|----|----|----|
| recommended | 2列 | 3列 | 4列 | **6列** | 6列 |
| normal | 2列 | 2列 | 3列 | 4列 | 4列 |

#### 使用例
```tsx
// おすすめ商品（横6列）
<ProductGrid
  title="おすすめ商品"
  products={recommendedProducts}
  variant="recommended"
  showViewAll
/>

// 通常商品（横4列）
<ProductGrid
  title="新着商品"
  products={newProducts}
  variant="normal"
  showViewAll
/>
```

---

### 3. ProductCard（商品カード）

#### サイズバリアント
```tsx
// src/components/molecules/ProductCard/index.tsx
type ProductSize = 'compact' | 'default' | 'large';

interface ProductCardProps {
  id: string;
  name: string;
  code: string;
  price: number;
  image: string;
  size?: ProductSize;
  // ... 他のprops
}

export default function ProductCard({
  size = 'default',
  ...props
}: ProductCardProps) {
  const sizeClasses = {
    compact: {
      card: 'p-2',
      image: 'h-32 sm:h-36 md:h-40',
      title: 'text-xs sm:text-sm line-clamp-2',
      code: 'text-xs',
      price: 'text-sm font-bold',
      button: 'text-xs py-1.5',
    },
    default: {
      card: 'p-4',
      image: 'h-48 sm:h-56',
      title: 'text-sm sm:text-base line-clamp-2',
      code: 'text-sm',
      price: 'text-lg font-bold',
      button: 'text-sm py-2',
    },
    large: {
      card: 'p-6',
      image: 'h-64 sm:h-72',
      title: 'text-base sm:text-lg line-clamp-2',
      code: 'text-base',
      price: 'text-xl font-bold',
      button: 'text-base py-2.5',
    },
  };

  const classes = sizeClasses[size];

  return (
    <div className={`bg-white rounded-lg shadow-sm hover:shadow-lg transition-all ${classes.card}`}>
      {/* 商品画像 */}
      <div className={`relative ${classes.image} mb-3`}>
        <Image
          src={props.image}
          alt={props.name}
          fill
          className="object-cover rounded-md"
        />
        {props.badge && (
          <Badge {...props.badge} className="absolute top-2 left-2" />
        )}
      </div>

      {/* 商品情報 */}
      <h3 className={`${classes.title} mb-1`}>{props.name}</h3>
      <p className={`text-gray-500 ${classes.code} mb-2`}>品番: {props.code}</p>
      <p className={`text-blue-600 ${classes.price} mb-3`}>
        ¥{props.price.toLocaleString()}
      </p>

      {/* カートに追加ボタン */}
      <Button variant="primary" size={size === 'compact' ? 'sm' : 'md'} fullWidth>
        カートに追加
      </Button>
    </div>
  );
}
```

#### サイズ比較
| サイズ | 用途 | 画像高さ | フォントサイズ | パディング |
|-------|------|---------|--------------|-----------|
| compact | おすすめ商品（6列） | 32-40px | xs-sm | p-2 |
| default | 通常商品（4列） | 48-56px | sm-base | p-4 |
| large | 特集商品（2-3列） | 64-72px | base-lg | p-6 |

---

### 4. Footer（フッター）

#### 要件
- ✅ 横幅100%
- ✅ モバイル: アコーディオン形式
- ✅ デスクトップ: 4列グリッド

#### 実装
```tsx
// src/components/organisms/Footer/index.tsx
export default function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className="w-full bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 max-w-7xl py-12">
        {/* デスクトップ: グリッドレイアウト */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-8">
          {/* カラム1 */}
          <div>
            <h3 className="font-bold text-lg mb-4">カテゴリー</h3>
            <ul className="space-y-2">
              <li><Link href="#">文房具</Link></li>
              <li><Link href="#">オフィス家具</Link></li>
              <li><Link href="#">PC周辺機器</Link></li>
            </ul>
          </div>

          {/* カラム2-4 同様 */}
        </div>

        {/* モバイル: アコーディオン */}
        <div className="lg:hidden space-y-4">
          {/* カテゴリー */}
          <div className="border-b border-gray-700">
            <button
              onClick={() => toggleSection('category')}
              className="w-full flex items-center justify-between py-4"
            >
              <span className="font-bold">カテゴリー</span>
              {openSection === 'category' ? (
                <ChevronUpIcon className="w-5 h-5" />
              ) : (
                <ChevronDownIcon className="w-5 h-5" />
              )}
            </button>
            {openSection === 'category' && (
              <ul className="pb-4 space-y-2">
                <li><Link href="#">文房具</Link></li>
                <li><Link href="#">オフィス家具</Link></li>
                <li><Link href="#">PC周辺機器</Link></li>
              </ul>
            )}
          </div>

          {/* 他のセクション同様 */}
        </div>

        {/* コピーライト */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          © 2025 smartsample. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
```

---

### 5. HeroSlider（メインスライダー）

#### レスポンシブ高さ
```tsx
// src/components/organisms/HeroSlider/index.tsx
<section className="
  relative
  w-full
  h-[300px]      /* モバイル: 300px */
  sm:h-[400px]   /* 小型タブレット: 400px */
  md:h-[500px]   /* タブレット: 500px */
  lg:h-[600px]   /* デスクトップ: 600px */
  overflow-hidden
">
  <Swiper {...swiperConfig}>
    {slides.map((slide, index) => (
      <SwiperSlide key={index}>
        <a href={slide.link} className="block w-full h-full">
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            className="object-cover"
            priority={index === 0} // 最初の画像は優先読み込み
          />
        </a>
      </SwiperSlide>
    ))}
  </Swiper>

  {/* ナビゲーションボタン */}
  <button className="
    hero-slider-prev
    absolute left-2 md:left-4  /* モバイルは端に近く */
    top-1/2 -translate-y-1/2 z-10
    w-10 h-10 md:w-12 md:h-12  /* モバイルは小さめ */
    bg-white/80 hover:bg-white
    rounded-full shadow-lg
  ">
    {/* アイコン */}
  </button>

  {/* 次へボタンも同様 */}
</section>
```

---

### 6. Cart（カートページ）

#### レスポンシブレイアウト
```tsx
// src/app/cart/page.tsx
export default function Cart() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">ショッピングカート</h1>

      <div className="
        grid grid-cols-1     /* モバイル: 1列 */
        lg:grid-cols-3       /* デスクトップ: 3列（2:1比率） */
        gap-8
      ">
        {/* カート商品リスト（2/3幅） */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
        </div>

        {/* カート合計（1/3幅） */}
        <div className="lg:col-span-1">
          <div className="
            sticky top-20    /* デスクトップでは固定 */
            bg-white
            rounded-lg
            shadow-lg
            p-6
          ">
            <CartSummary
              subtotal={15980}
              shipping={500}
              total={16480}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## 📏 スペーシング・タイポグラフィ

### コンテナ幅
```tsx
// すべてのページで統一
<div className="container mx-auto px-4 max-w-7xl">
  {/* コンテンツ */}
</div>
```

| ブレークポイント | パディング | 最大幅 |
|---------------|----------|--------|
| モバイル | px-4 (16px) | 100% |
| タブレット | px-6 (24px) | 100% |
| デスクトップ | px-8 (32px) | 1280px (max-w-7xl) |

### セクション間隔
```tsx
// セクション間のスペース
<section className="py-8 md:py-12 lg:py-16">
```

| ブレークポイント | py（上下） |
|---------------|-----------|
| モバイル | py-8 (2rem) |
| タブレット | py-12 (3rem) |
| デスクトップ | py-16 (4rem) |

### 見出しサイズ
```tsx
// H1
<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">

// H2
<h2 className="text-xl md:text-2xl lg:text-3xl font-bold">

// H3
<h3 className="text-lg md:text-xl lg:text-2xl font-semibold">
```

---

## 🎨 レスポンシブユーティリティパターン

### 表示/非表示切替
```tsx
{/* モバイルのみ表示 */}
<div className="block lg:hidden">モバイル専用コンテンツ</div>

{/* デスクトップのみ表示 */}
<div className="hidden lg:block">デスクトップ専用コンテンツ</div>

{/* タブレット以上で表示 */}
<div className="hidden md:block">タブレット・デスクトップ</div>
```

### Flexbox方向切替
```tsx
{/* モバイル: 縦並び、デスクトップ: 横並び */}
<div className="flex flex-col lg:flex-row gap-4">
```

### テキスト配置
```tsx
{/* モバイル: 中央、デスクトップ: 左 */}
<div className="text-center lg:text-left">
```

---

## ✅ レスポンシブチェックリスト

### すべてのコンポーネントで確認
- [ ] モバイル（375px）で表示崩れがない
- [ ] タブレット（768px）で適切にレイアウト変更
- [ ] デスクトップ（1280px）で最適表示
- [ ] タッチ操作対応（ボタンサイズ最低44x44px）
- [ ] テキストの可読性（最小14px）
- [ ] 画像のアスペクト比維持
- [ ] ナビゲーションの使いやすさ

### ページ別チェック
- [ ] Home: スライダー、6列グリッド、レスポンシブ
- [ ] MyPage: サイドバー配置切替
- [ ] OrderHistory: テーブル → カードレイアウト
- [ ] Cart: 2列 → 1列レイアウト
- [ ] Login/Signup: フォーム幅調整

---

## 📱 テスト用デバイスサイズ

### 開発時に確認すべき画面幅
```
320px  - iPhone SE（最小幅）
375px  - iPhone 12/13/14
390px  - iPhone 12/13/14 Pro
414px  - iPhone 14 Plus
768px  - iPad縦向き
1024px - iPad横向き
1280px - ノートPC
1920px - デスクトップ
```

### Chrome DevTools設定
```
1. F12でDevTools開く
2. デバイスツールバー表示（Ctrl+Shift+M）
3. 各デバイスサイズで表示確認
```

---

**すべてのコンポーネントがレスポンシブ対応で実装されます。** 📱💻
