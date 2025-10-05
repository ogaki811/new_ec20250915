# アトミックデザインリファクタリング計画 v2.0（検証済み）

**更新日**: 2025-10-06
**ブランチ**: `feature/atomic-design-refactoring`
**ステータス**: 実装準備完了

---

## 📋 変更履歴

| バージョン | 日付 | 変更内容 |
|-----------|------|---------|
| v1.0 | 2025-10-06 | 初版作成 |
| v2.0 | 2025-10-06 | 検証結果を反映、import自動化追加、コンポーネント数修正 |

---

## 🎯 目的

現在の**機能ベース（feature-based）** のコンポーネント構造を、**アトミックデザインの原則**に基づいて再構成し、コンポーネントの再利用性と保守性を向上させる。

---

## 📊 現在の構造と移行先

### 現在の構造（52コンポーネント）

```
src/components/
├── cart/           (6)  - カート関連コンポーネント
├── checkout/       (5)  - チェックアウト関連
├── common/         (4)  - 共通コンポーネント
├── favorites/      (1)  - お気に入り
├── home/           (2)  - ホームページ専用
├── layout/         (5)  - レイアウトコンポーネント
├── mypage/         (1)  - マイページ
├── order/          (1)  - 注文関連
├── product/       (13)  - 商品関連 ⚠️ v1では12と記載（実際は13）
├── search/         (3)  - 検索関連
└── ui/            (11)  - 基本UIコンポーネント
```

### 新しい構造（アトミックデザイン）

```
src/components/
├── atoms/          (12) - 最小単位のUIパーツ
├── molecules/      (14) - Atomsの組み合わせ（10既存 + 4新規）
├── organisms/      (24) - 独立した機能単位 ⚠️ v1では23（RecommendedItem追加）
└── templates/       (6) - レイアウトテンプレート（4既存 + 2新規）

合計: 56コンポーネント（52既存 + 4新規削除予定 = 52 → 52既存 + 6新規 = 58）
※実際は52既存をそのまま移行し、新規コンポーネントは将来的な追加として別途実装
```

---

## 🔧 Phase 0: 準備フェーズ（新規追加）

### 0.1 import文置換スクリプトの作成

**目的**: 112箇所のimport文を自動更新

**スクリプト**: `scripts/refactor-imports.js`

```javascript
#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

// 置換マッピング
const replacements = {
  // Atoms (12)
  "@/components/ui/Badge": "@/components/atoms/Badge",
  "@/components/ui/Button": "@/components/atoms/Button",
  "@/components/ui/Card": "@/components/atoms/Card",
  "@/components/ui/Checkbox": "@/components/atoms/Checkbox",
  "@/components/ui/Divider": "@/components/atoms/Divider",
  "@/components/ui/Icon": "@/components/atoms/Icon",
  "@/components/ui/Input": "@/components/atoms/Input",
  "@/components/ui/Loading": "@/components/atoms/Loading",
  "@/components/ui/Radio": "@/components/atoms/Radio",
  "@/components/ui/Select": "@/components/atoms/Select",
  "@/components/ui/Textarea": "@/components/atoms/Textarea",
  "@/components/search/FilterTag": "@/components/atoms/Tag",

  // Molecules (10既存)
  "@/components/product/QuantitySelector": "@/components/molecules/QuantitySelector",
  "@/components/product/SearchBar": "@/components/molecules/SearchBar",
  "@/components/product/SortDropdown": "@/components/molecules/SortDropdown",
  "@/components/product/PriceRange": "@/components/molecules/PriceRange",
  "@/components/cart/CouponForm": "@/components/molecules/CouponForm",
  "@/components/checkout/DeliveryDateSelector": "@/components/molecules/DeliveryDateSelector",
  "@/components/checkout/PaymentMethodSelector": "@/components/molecules/PaymentMethodSelector",
  "@/components/common/Breadcrumb": "@/components/molecules/Breadcrumb",
  "@/components/common/Pagination": "@/components/molecules/Pagination",
  "@/components/common/StepIndicator": "@/components/molecules/StepIndicator",

  // Organisms (24)
  "@/components/layout/Header": "@/components/organisms/Header",
  "@/components/layout/Footer": "@/components/organisms/Footer",
  "@/components/layout/SimpleHeader": "@/components/organisms/SimpleHeader",
  "@/components/layout/SimpleFooter": "@/components/organisms/SimpleFooter",
  "@/components/layout/MobileMenu": "@/components/organisms/MobileMenu",
  "@/components/product/ProductCard": "@/components/organisms/ProductCard",
  "@/components/product/HorizontalProductCard": "@/components/organisms/HorizontalProductCard",
  "@/components/product/ProductListItem": "@/components/organisms/ProductListItem",
  "@/components/product/ProductImageGallery": "@/components/organisms/ProductImageGallery",
  "@/components/product/FilterSidebar": "@/components/organisms/FilterSidebar",
  "@/components/product/ProductDetailClient": "@/components/organisms/ProductDetail",
  "@/components/cart/CartItem": "@/components/organisms/CartItem",
  "@/components/cart/CartSummary": "@/components/organisms/CartSummary",
  "@/components/cart/CartHoverCard": "@/components/organisms/CartHoverCard",
  "@/components/cart/CartAddedNotification": "@/components/organisms/CartNotification",
  "@/components/cart/EmptyCart": "@/components/organisms/EmptyCart",
  "@/components/checkout/CheckoutSummary": "@/components/organisms/CheckoutSummary",
  "@/components/checkout/CustomerInfoForm": "@/components/organisms/CustomerInfoForm",
  "@/components/checkout/ShippingInfoForm": "@/components/organisms/ShippingInfoForm",
  "@/components/search/SearchFilters": "@/components/organisms/SearchFilters",
  "@/components/search/SearchSort": "@/components/organisms/SearchSort",
  "@/components/mypage/MyPageSidebar": "@/components/organisms/MyPageSidebar",
  "@/components/order/OrderDetailModal": "@/components/organisms/OrderDetailModal",
  "@/components/favorites/FavoriteItem": "@/components/organisms/FavoriteItem",
  "@/components/product/RecommendedItem": "@/components/organisms/RecommendedItem",
  "@/components/common/Modal": "@/components/organisms/Modal",

  // Templates (4既存)
  "@/components/product/ProductGrid": "@/components/templates/ProductGrid",
  "@/components/product/ProductSlider": "@/components/templates/ProductSlider",
  "@/components/home/ProductSlider": "@/components/templates/HomeProductSlider",
  "@/components/home/HeroSlider": "@/components/templates/HeroSlider",

  // CSS imports
  "@/components/home/HeroSlider.css": "@/components/templates/HeroSlider.css",
  "@/components/home/ProductSlider.css": "@/components/templates/HomeProductSlider.css",
};

// 相対importの置換マッピング
const relativeReplacements = {
  // Organisms内での相対import
  "../product/QuantitySelector": "@/components/molecules/QuantitySelector",
  "./QuantitySelector": "@/components/molecules/QuantitySelector",
  "../ui/": "@/components/atoms/",
  "./HeroSlider.css": "./HeroSlider.css", // 変更なし（同一ディレクトリ）
};

async function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // 絶対パスの置換
  Object.entries(replacements).forEach(([from, to]) => {
    const regex = new RegExp(from.replace(/\//g, '\\/'), 'g');
    if (content.match(regex)) {
      content = content.replace(regex, to);
      modified = true;
    }
  });

  // 相対パスの置換（components内のファイルのみ）
  if (filePath.includes('/components/')) {
    Object.entries(relativeReplacements).forEach(([from, to]) => {
      const regex = new RegExp(from.replace(/\//g, '\\/').replace(/\./g, '\\.'), 'g');
      if (content.match(regex)) {
        content = content.replace(regex, to);
        modified = true;
      }
    });
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Updated: ${filePath}`);
    return 1;
  }
  return 0;
}

async function main() {
  console.log('🔍 Searching for TypeScript files...\n');

  const files = await glob('src/**/*.{ts,tsx}', {
    ignore: ['node_modules/**', '.next/**'],
    absolute: true
  });

  console.log(`📝 Found ${files.length} files\n`);
  console.log('🔄 Updating import statements...\n');

  let updatedCount = 0;
  for (const file of files) {
    updatedCount += await replaceInFile(file);
  }

  console.log(`\n✅ Updated ${updatedCount} files`);
  console.log(`📊 Total files scanned: ${files.length}`);
}

main().catch(console.error);
```

**使用方法**:
```bash
cd smartsample-nextjs
node scripts/refactor-imports.js
```

### 0.2 新規Moleculesコンポーネントの仕様定義（将来実装）

以下は将来的な追加候補として記録（Phase 2では実装しない）:

#### FormField.tsx
```typescript
interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password' | 'tel';
  required?: boolean;
  error?: string;
  value: string;
  onChange: (value: string) => void;
}
```

#### PriceDisplay.tsx
```typescript
interface PriceDisplayProps {
  unitPrice: number;
  quantity: number;
  showUnitPrice?: boolean;
}
```

#### ProductMeta.tsx
```typescript
interface ProductMetaProps {
  brand: string;
  code: string;
  category?: string;
}
```

#### RatingStars.tsx
```typescript
interface RatingStarsProps {
  rating: number; // 0-5
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
}
```

### 0.3 新規Templatesコンポーネントの仕様定義（将来実装）

#### SidebarLayout.tsx
```typescript
interface SidebarLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
  sidebarPosition?: 'left' | 'right';
}
```

#### AuthLayout.tsx
```typescript
interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  showLogo?: boolean;
}
```

### チェックリスト

- [ ] scripts/ディレクトリ作成
- [ ] refactor-imports.js作成
- [ ] npm install glob（必要な場合）
- [ ] スクリプトのドライラン実行（--dry-run追加）
- [ ] 新規コンポーネント仕様のレビュー承認

---

## 📦 Phase 1: Atoms（原子）の移行

### 移行対象（12コンポーネント）

| # | 現在のパス | 新しいパス | 説明 |
|---|-----------|-----------|------|
| 1 | `ui/Badge.tsx` | `atoms/Badge.tsx` | バッジ |
| 2 | `ui/Button.tsx` | `atoms/Button.tsx` | ボタン |
| 3 | `ui/Card.tsx` | `atoms/Card.tsx` | カード |
| 4 | `ui/Checkbox.tsx` | `atoms/Checkbox.tsx` | チェックボックス |
| 5 | `ui/Divider.tsx` | `atoms/Divider.tsx` | 区切り線 |
| 6 | `ui/Icon.tsx` | `atoms/Icon.tsx` | アイコン |
| 7 | `ui/Input.tsx` | `atoms/Input.tsx` | 入力欄 |
| 8 | `ui/Loading.tsx` | `atoms/Loading.tsx` | ローディング |
| 9 | `ui/Radio.tsx` | `atoms/Radio.tsx` | ラジオボタン |
| 10 | `ui/Select.tsx` | `atoms/Select.tsx` | セレクトボックス |
| 11 | `ui/Textarea.tsx` | `atoms/Textarea.tsx` | テキストエリア |
| 12 | `search/FilterTag.tsx` | `atoms/Tag.tsx` | タグ（名称変更） |

### 作業手順

```bash
# 1. ディレクトリ作成
mkdir -p src/components/atoms

# 2. ファイル移動（git mvを使用）
git mv src/components/ui/Badge.tsx src/components/atoms/Badge.tsx
git mv src/components/ui/Button.tsx src/components/atoms/Button.tsx
git mv src/components/ui/Card.tsx src/components/atoms/Card.tsx
git mv src/components/ui/Checkbox.tsx src/components/atoms/Checkbox.tsx
git mv src/components/ui/Divider.tsx src/components/atoms/Divider.tsx
git mv src/components/ui/Icon.tsx src/components/atoms/Icon.tsx
git mv src/components/ui/Input.tsx src/components/atoms/Input.tsx
git mv src/components/ui/Loading.tsx src/components/atoms/Loading.tsx
git mv src/components/ui/Radio.tsx src/components/atoms/Radio.tsx
git mv src/components/ui/Select.tsx src/components/atoms/Select.tsx
git mv src/components/ui/Textarea.tsx src/components/atoms/Textarea.tsx
git mv src/components/search/FilterTag.tsx src/components/atoms/Tag.tsx

# 3. index.ts作成
cat > src/components/atoms/index.ts << 'EOF'
export { default as Badge } from './Badge';
export { default as Button } from './Button';
export { default as Card } from './Card';
export { default as Checkbox } from './Checkbox';
export { default as Divider } from './Divider';
export { default as Icon } from './Icon';
export { default as Input } from './Input';
export { default as Loading } from './Loading';
export { default as Radio } from './Radio';
export { default as Select } from './Select';
export { default as Textarea } from './Textarea';
export { default as Tag } from './Tag';
EOF

# 4. 動作確認
npm run dev
```

### チェックリスト

- [ ] ディレクトリ作成完了
- [ ] 12ファイルすべて移動完了
- [ ] index.ts作成完了
- [ ] ビルドエラーなし
- [ ] 開発サーバー起動確認

---

## 🧬 Phase 2: Molecules（分子）の移行

### 移行対象（10コンポーネント）

| # | 現在のパス | 新しいパス |
|---|-----------|-----------|
| 1 | `product/QuantitySelector.tsx` | `molecules/QuantitySelector.tsx` |
| 2 | `product/SearchBar.tsx` | `molecules/SearchBar.tsx` |
| 3 | `product/SortDropdown.tsx` | `molecules/SortDropdown.tsx` |
| 4 | `product/PriceRange.tsx` | `molecules/PriceRange.tsx` |
| 5 | `cart/CouponForm.tsx` | `molecules/CouponForm.tsx` |
| 6 | `checkout/DeliveryDateSelector.tsx` | `molecules/DeliveryDateSelector.tsx` |
| 7 | `checkout/PaymentMethodSelector.tsx` | `molecules/PaymentMethodSelector.tsx` |
| 8 | `common/Breadcrumb.tsx` | `molecules/Breadcrumb.tsx` |
| 9 | `common/Pagination.tsx` | `molecules/Pagination.tsx` |
| 10 | `common/StepIndicator.tsx` | `molecules/StepIndicator.tsx` |

### 作業手順

```bash
# 1. ディレクトリ作成
mkdir -p src/components/molecules

# 2. ファイル移動
git mv src/components/product/QuantitySelector.tsx src/components/molecules/QuantitySelector.tsx
git mv src/components/product/SearchBar.tsx src/components/molecules/SearchBar.tsx
git mv src/components/product/SortDropdown.tsx src/components/molecules/SortDropdown.tsx
git mv src/components/product/PriceRange.tsx src/components/molecules/PriceRange.tsx
git mv src/components/cart/CouponForm.tsx src/components/molecules/CouponForm.tsx
git mv src/components/checkout/DeliveryDateSelector.tsx src/components/molecules/DeliveryDateSelector.tsx
git mv src/components/checkout/PaymentMethodSelector.tsx src/components/molecules/PaymentMethodSelector.tsx
git mv src/components/common/Breadcrumb.tsx src/components/molecules/Breadcrumb.tsx
git mv src/components/common/Pagination.tsx src/components/molecules/Pagination.tsx
git mv src/components/common/StepIndicator.tsx src/components/molecules/StepIndicator.tsx

# 3. index.ts作成
cat > src/components/molecules/index.ts << 'EOF'
export { default as QuantitySelector } from './QuantitySelector';
export { default as SearchBar } from './SearchBar';
export { default as SortDropdown } from './SortDropdown';
export { default as PriceRange } from './PriceRange';
export { default as CouponForm } from './CouponForm';
export { default as DeliveryDateSelector } from './DeliveryDateSelector';
export { default as PaymentMethodSelector } from './PaymentMethodSelector';
export { default as Breadcrumb } from './Breadcrumb';
export { default as Pagination } from './Pagination';
export { default as StepIndicator } from './StepIndicator';
EOF
```

### チェックリスト

- [ ] 10ファイルすべて移動完了
- [ ] index.ts作成完了
- [ ] ビルドエラーなし

---

## 🌿 Phase 3: Organisms（有機体）の移行

### 移行対象（24コンポーネント）⚠️ v1から+1

#### レイアウト系（5）

| # | 現在のパス | 新しいパス |
|---|-----------|-----------|
| 1 | `layout/Header.tsx` | `organisms/Header.tsx` |
| 2 | `layout/Footer.tsx` | `organisms/Footer.tsx` |
| 3 | `layout/SimpleHeader.tsx` | `organisms/SimpleHeader.tsx` |
| 4 | `layout/SimpleFooter.tsx` | `organisms/SimpleFooter.tsx` |
| 5 | `layout/MobileMenu.tsx` | `organisms/MobileMenu.tsx` |

#### 商品系（6）

| # | 現在のパス | 新しいパス | 備考 |
|---|-----------|-----------|------|
| 6 | `product/ProductCard.tsx` | `organisms/ProductCard.tsx` | |
| 7 | `product/HorizontalProductCard.tsx` | `organisms/HorizontalProductCard.tsx` | |
| 8 | `product/ProductListItem.tsx` | `organisms/ProductListItem.tsx` | |
| 9 | `product/ProductImageGallery.tsx` | `organisms/ProductImageGallery.tsx` | |
| 10 | `product/FilterSidebar.tsx` | `organisms/FilterSidebar.tsx` | |
| 11 | `product/ProductDetailClient.tsx` | `organisms/ProductDetail.tsx` | 名称変更 |

#### カート系（5）

| # | 現在のパス | 新しいパス | 備考 |
|---|-----------|-----------|------|
| 12 | `cart/CartItem.tsx` | `organisms/CartItem.tsx` | |
| 13 | `cart/CartSummary.tsx` | `organisms/CartSummary.tsx` | |
| 14 | `cart/CartHoverCard.tsx` | `organisms/CartHoverCard.tsx` | |
| 15 | `cart/CartAddedNotification.tsx` | `organisms/CartNotification.tsx` | 名称変更 |
| 16 | `cart/EmptyCart.tsx` | `organisms/EmptyCart.tsx` | |

#### チェックアウト系（3）

| # | 現在のパス | 新しいパス |
|---|-----------|-----------|
| 17 | `checkout/CheckoutSummary.tsx` | `organisms/CheckoutSummary.tsx` |
| 18 | `checkout/CustomerInfoForm.tsx` | `organisms/CustomerInfoForm.tsx` |
| 19 | `checkout/ShippingInfoForm.tsx` | `organisms/ShippingInfoForm.tsx` |

#### その他（5）

| # | 現在のパス | 新しいパス |
|---|-----------|-----------|
| 20 | `search/SearchFilters.tsx` | `organisms/SearchFilters.tsx` |
| 21 | `search/SearchSort.tsx` | `organisms/SearchSort.tsx` |
| 22 | `mypage/MyPageSidebar.tsx` | `organisms/MyPageSidebar.tsx` |
| 23 | `order/OrderDetailModal.tsx` | `organisms/OrderDetailModal.tsx` |
| 24 | `common/Modal.tsx` | `organisms/Modal.tsx` |

#### 商品カード系（2）⚠️ v1で抜けていた

| # | 現在のパス | 新しいパス |
|---|-----------|-----------|
| 25 | `favorites/FavoriteItem.tsx` | `organisms/FavoriteItem.tsx` |
| 26 | `product/RecommendedItem.tsx` | `organisms/RecommendedItem.tsx` |

### 作業手順

```bash
# 1. ディレクトリ作成
mkdir -p src/components/organisms

# 2. レイアウト系移動
git mv src/components/layout/Header.tsx src/components/organisms/Header.tsx
git mv src/components/layout/Footer.tsx src/components/organisms/Footer.tsx
git mv src/components/layout/SimpleHeader.tsx src/components/organisms/SimpleHeader.tsx
git mv src/components/layout/SimpleFooter.tsx src/components/organisms/SimpleFooter.tsx
git mv src/components/layout/MobileMenu.tsx src/components/organisms/MobileMenu.tsx

# 3. 商品系移動
git mv src/components/product/ProductCard.tsx src/components/organisms/ProductCard.tsx
git mv src/components/product/HorizontalProductCard.tsx src/components/organisms/HorizontalProductCard.tsx
git mv src/components/product/ProductListItem.tsx src/components/organisms/ProductListItem.tsx
git mv src/components/product/ProductImageGallery.tsx src/components/organisms/ProductImageGallery.tsx
git mv src/components/product/FilterSidebar.tsx src/components/organisms/FilterSidebar.tsx
git mv src/components/product/ProductDetailClient.tsx src/components/organisms/ProductDetail.tsx
git mv src/components/product/RecommendedItem.tsx src/components/organisms/RecommendedItem.tsx

# 4. カート系移動
git mv src/components/cart/CartItem.tsx src/components/organisms/CartItem.tsx
git mv src/components/cart/CartSummary.tsx src/components/organisms/CartSummary.tsx
git mv src/components/cart/CartHoverCard.tsx src/components/organisms/CartHoverCard.tsx
git mv src/components/cart/CartAddedNotification.tsx src/components/organisms/CartNotification.tsx
git mv src/components/cart/EmptyCart.tsx src/components/organisms/EmptyCart.tsx

# 5. チェックアウト系移動
git mv src/components/checkout/CheckoutSummary.tsx src/components/organisms/CheckoutSummary.tsx
git mv src/components/checkout/CustomerInfoForm.tsx src/components/organisms/CustomerInfoForm.tsx
git mv src/components/checkout/ShippingInfoForm.tsx src/components/organisms/ShippingInfoForm.tsx

# 6. その他移動
git mv src/components/search/SearchFilters.tsx src/components/organisms/SearchFilters.tsx
git mv src/components/search/SearchSort.tsx src/components/organisms/SearchSort.tsx
git mv src/components/mypage/MyPageSidebar.tsx src/components/organisms/MyPageSidebar.tsx
git mv src/components/order/OrderDetailModal.tsx src/components/organisms/OrderDetailModal.tsx
git mv src/components/favorites/FavoriteItem.tsx src/components/organisms/FavoriteItem.tsx
git mv src/components/common/Modal.tsx src/components/organisms/Modal.tsx

# 7. index.ts作成
cat > src/components/organisms/index.ts << 'EOF'
// Layout
export { default as Header } from './Header';
export { default as Footer } from './Footer';
export { default as SimpleHeader } from './SimpleHeader';
export { default as SimpleFooter } from './SimpleFooter';
export { default as MobileMenu } from './MobileMenu';

// Product
export { default as ProductCard } from './ProductCard';
export { default as HorizontalProductCard } from './HorizontalProductCard';
export { default as ProductListItem } from './ProductListItem';
export { default as ProductImageGallery } from './ProductImageGallery';
export { default as FilterSidebar } from './FilterSidebar';
export { default as ProductDetail } from './ProductDetail';
export { default as RecommendedItem } from './RecommendedItem';

// Cart
export { default as CartItem } from './CartItem';
export { default as CartSummary } from './CartSummary';
export { default as CartHoverCard } from './CartHoverCard';
export { default as CartNotification } from './CartNotification';
export { default as EmptyCart } from './EmptyCart';

// Checkout
export { default as CheckoutSummary } from './CheckoutSummary';
export { default as CustomerInfoForm } from './CustomerInfoForm';
export { default as ShippingInfoForm } from './ShippingInfoForm';

// Other
export { default as SearchFilters } from './SearchFilters';
export { default as SearchSort } from './SearchSort';
export { default as MyPageSidebar } from './MyPageSidebar';
export { default as OrderDetailModal } from './OrderDetailModal';
export { default as FavoriteItem } from './FavoriteItem';
export { default as Modal } from './Modal';
EOF
```

### チェックリスト

- [ ] 26ファイルすべて移動完了
- [ ] 名称変更2件完了（ProductDetailClient→ProductDetail, CartAddedNotification→CartNotification）
- [ ] index.ts作成完了
- [ ] ビルドエラーなし

---

## 📐 Phase 4: Templates（テンプレート）の移行

### 移行対象（4コンポーネント + CSS 2ファイル）

| # | 現在のパス | 新しいパス | 備考 |
|---|-----------|-----------|------|
| 1 | `product/ProductGrid.tsx` | `templates/ProductGrid.tsx` | |
| 2 | `product/ProductSlider.tsx` | `templates/ProductSlider.tsx` | |
| 3 | `home/ProductSlider.tsx` | `templates/HomeProductSlider.tsx` | 名称変更 |
| 4 | `home/HeroSlider.tsx` | `templates/HeroSlider.tsx` | |
| - | `home/HeroSlider.css` | `templates/HeroSlider.css` | CSS |
| - | `home/ProductSlider.css` | `templates/HomeProductSlider.css` | CSS（名称変更） |

### 作業手順

```bash
# 1. ディレクトリ作成
mkdir -p src/components/templates

# 2. ファイル移動
git mv src/components/product/ProductGrid.tsx src/components/templates/ProductGrid.tsx
git mv src/components/product/ProductSlider.tsx src/components/templates/ProductSlider.tsx
git mv src/components/home/ProductSlider.tsx src/components/templates/HomeProductSlider.tsx
git mv src/components/home/HeroSlider.tsx src/components/templates/HeroSlider.tsx

# 3. CSSファイル移動
git mv src/components/home/HeroSlider.css src/components/templates/HeroSlider.css
git mv src/components/home/ProductSlider.css src/components/templates/HomeProductSlider.css

# 4. HomeProductSlider.tsx内のCSS importパスを修正
sed -i '' "s|import './ProductSlider.css'|import './HomeProductSlider.css'|g" src/components/templates/HomeProductSlider.tsx

# 5. index.ts作成
cat > src/components/templates/index.ts << 'EOF'
export { default as ProductGrid } from './ProductGrid';
export { default as ProductSlider } from './ProductSlider';
export { default as HomeProductSlider } from './HomeProductSlider';
export { default as HeroSlider } from './HeroSlider';
EOF
```

### チェックリスト

- [ ] 4コンポーネントファイル移動完了
- [ ] 2CSSファイル移動完了
- [ ] CSS importパス修正完了
- [ ] index.ts作成完了
- [ ] ビルドエラーなし

---

## 🔄 Phase 5: import文の一括更新

### 実行手順

```bash
# 1. スクリプト実行（ドライラン）
node scripts/refactor-imports.js --dry-run

# 2. 結果確認後、本番実行
node scripts/refactor-imports.js

# 3. 変更内容の確認
git diff

# 4. TypeScript型チェック
npx tsc --noEmit

# 5. ビルドテスト
npm run build
```

### 想定される更新内容

```
✓ Updated: src/app/page.tsx (6 imports)
✓ Updated: src/app/products/page.tsx (8 imports)
✓ Updated: src/app/cart/page.tsx (5 imports)
...
✅ Updated 104 files
📊 Total files scanned: 152
```

### チェックリスト

- [ ] スクリプト実行完了
- [ ] 104ファイル更新確認
- [ ] TypeScript型エラーなし
- [ ] ビルド成功

---

## 🧹 Phase 6: クリーンアップ

### 削除対象ディレクトリ（全11個）

```bash
# 空ディレクトリの確認
find src/components -type d -empty

# 削除実行
rm -rf src/components/cart
rm -rf src/components/checkout
rm -rf src/components/common
rm -rf src/components/favorites
rm -rf src/components/home
rm -rf src/components/layout
rm -rf src/components/mypage
rm -rf src/components/order
rm -rf src/components/product
rm -rf src/components/search
rm -rf src/components/ui
```

### トップレベルindex.ts作成

```typescript
// src/components/index.ts
export * from './atoms';
export * from './molecules';
export * from './organisms';
export * from './templates';
```

### チェックリスト

- [ ] 旧ディレクトリ11個削除完了
- [ ] トップレベルindex.ts作成完了
- [ ] 削除後のビルド成功確認

---

## ✅ Phase 7: テスト・検証

### 7.1 全ページの動作確認

| ページ | URL | チェック項目 | ステータス |
|-------|-----|------------|-----------|
| トップ | `/` | スライダー、商品カード表示 | □ |
| 商品一覧 | `/products` | フィルター、ソート、ページネーション | □ |
| 商品詳細 | `/products/1` | 画像ギャラリー、カート追加 | □ |
| 検索 | `/search?q=test` | 検索結果表示 | □ |
| カート | `/cart` | 数量変更、削除、合計計算 | □ |
| チェックアウト | `/checkout` | フォーム入力、バリデーション | □ |
| お気に入り | `/favorites` | 一覧表示、削除 | □ |
| マイページ | `/mypage` | ダッシュボード表示 | □ |
| 注文履歴 | `/mypage/orders` | 履歴一覧、詳細モーダル | □ |
| ログイン | `/login` | SimpleHeader/Footer表示 | □ |
| サインアップ | `/signup` | SimpleHeader/Footer表示 | □ |
| 404 | `/not-found` | Header/Footer表示 | □ |

### 7.2 ビルドテスト

```bash
# プロダクションビルド
npm run build

# ビルド成功確認
# ✓ Compiled successfully
# ✓ Collecting page data
# ✓ Generating static pages
```

### 7.3 型チェック

```bash
npx tsc --noEmit

# エラーなし確認
# No errors found
```

### 7.4 Lighthouseスコア確認

| 項目 | Before | After | 差分 | 合格 |
|-----|--------|-------|------|------|
| Performance | - | - | - | □ |
| Accessibility | - | - | - | □ |
| Best Practices | - | - | - | □ |
| SEO | - | - | - | □ |

**合格基準**: スコア差±5点以内

### チェックリスト

- [ ] 全12ページの動作確認完了
- [ ] ビルドエラーなし
- [ ] TypeScript型エラーなし
- [ ] Lighthouseスコア維持

---

## 📊 最終検証

### コンポーネント数の確認

```bash
# Atoms
find src/components/atoms -name "*.tsx" | wc -l
# Expected: 12

# Molecules
find src/components/molecules -name "*.tsx" | wc -l
# Expected: 10

# Organisms
find src/components/organisms -name "*.tsx" | wc -l
# Expected: 26

# Templates
find src/components/templates -name "*.tsx" | wc -l
# Expected: 4

# Total
find src/components -name "*.tsx" | wc -l
# Expected: 52
```

### ディレクトリ構造の確認

```bash
tree src/components -L 1
```

期待される出力:
```
src/components
├── atoms
├── molecules
├── organisms
├── templates
└── index.ts

4 directories, 1 file
```

---

## ⏱️ 推定作業時間（修正版）

| Phase | 作業内容 | 推定時間 |
|-------|---------|---------|
| Phase 0 | 準備（スクリプト作成） | **1時間** |
| Phase 1 | Atoms移行 | 30分 |
| Phase 2 | Molecules移行 | 30分 |
| Phase 3 | Organisms移行 | **1.5時間** (26個) |
| Phase 4 | Templates移行 | 30分 |
| Phase 5 | import一括更新 | **30分** |
| Phase 6 | クリーンアップ | 30分 |
| Phase 7 | テスト・検証 | **1.5時間** |
| **合計** | | **7時間** |

---

## 🎯 成功基準

- ✅ すべてのコンポーネントがアトミックデザインの階層に分類される
- ✅ すべてのページが正常に動作する
- ✅ ビルドエラーがゼロ
- ✅ TypeScript型エラーがゼロ
- ✅ Lighthouseスコアが維持される（±5点以内）
- ✅ 旧ディレクトリが完全に削除される
- ✅ index.tsによるクリーンなエクスポートが提供される

---

## 📝 コミット戦略

各Phaseごとにコミットを作成:

```bash
# Phase 1完了後
git add .
git commit -m "refactor(atoms): Atoms層へのコンポーネント移行 (12件)"

# Phase 2完了後
git commit -m "refactor(molecules): Molecules層へのコンポーネント移行 (10件)"

# Phase 3完了後
git commit -m "refactor(organisms): Organisms層へのコンポーネント移行 (26件)"

# Phase 4完了後
git commit -m "refactor(templates): Templates層へのコンポーネント移行 (4件+CSS)"

# Phase 5完了後
git commit -m "refactor(imports): import文の一括更新 (104ファイル)"

# Phase 6完了後
git commit -m "refactor(cleanup): 旧ディレクトリ削除とindex.ts整備"

# Phase 7完了後
git commit -m "test: アトミックデザインリファクタリング検証完了"
```

---

## 🚀 次のステップ（リファクタリング完了後）

1. **Storybook導入**: コンポーネントカタログの作成
2. **ビジュアルリグレッションテスト**: Chromatic/Percy導入
3. **コンポーネントドキュメント**: 各コンポーネントの使用例
4. **デザイントークン**: 色・スペーシング・タイポグラフィの定数化
5. **単体テスト**: Atoms/Moleculesのテストカバレッジ向上

---

## 📚 参考資料

- [Atomic Design by Brad Frost](https://atomicdesign.bradfrost.com/)
- [Next.js Project Structure Best Practices](https://nextjs.org/docs/app/building-your-application/routing/colocation)
- [TypeScript Path Mapping](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping)

---

**最終更新**: 2025-10-06
**レビュー**: 検証済み
**承認**: 実装準備完了
