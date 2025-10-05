# アトミックデザインリファクタリング計画 v3.0

**作成日**: 2025-10-06
**ステータス**: ✅ **実装可能** - すべての問題を解決済み
**推定時間**: **8-9時間**

---

## 📝 v3での主な変更点

v2計画から以下の重大な問題を解決：

1. ✅ **名前付きimport（23箇所）の手動変換手順を追加**
2. ✅ **既存index.ts（11ファイル）の削除手順を明記**
3. ✅ **CSS importパスの手動修正を明記**
4. ✅ **推定時間を8-9時間に修正**
5. ✅ **Phase 8（オプション）を追加：個別importを名前付きimportに戻す**

---

## 🎯 目的

現在の機能ベース（feature-based）のコンポーネント構造を、アトミックデザインの原則に基づいて再構成し、コンポーネントの再利用性と保守性を向上させる。

---

## 📊 現状分析

### ファイル総数: 65ファイル

```
TSX/TSファイル: 63
├── コンポーネント: 52
└── index.ts: 11

CSSファイル: 2
├── HeroSlider.css
└── ProductSlider.css
```

### 現在のディレクトリ構造

```
src/components/
├── cart/           (6 .tsx + 1 index.ts)
├── checkout/       (5 .tsx + 1 index.ts)
├── common/         (4 .tsx + 1 index.ts)
├── favorites/      (1 .tsx, ❌ index.tsなし)
├── home/           (2 .tsx + 2 .css + 1 index.ts)
├── layout/         (5 .tsx + 1 index.ts)
├── mypage/         (1 .tsx + 1 index.ts)
├── order/          (1 .tsx + 1 index.ts)
├── product/        (13 .tsx + 1 index.ts)
├── search/         (3 .tsx + 1 index.ts)
└── ui/             (11 .tsx + 1 index.ts)
```

### import文の分析（117箇所）

| パターン | 箇所数 | 自動化 | 備考 |
|---------|--------|--------|------|
| 個別import | 86 | ✅ 可能 | `import Header from '@/components/layout/Header'` |
| 名前付きimport | 23 | ⚠️ 手動 | `import { Badge, Button } from '@/components/ui'` |
| 相対import | 8 | △ 一部 | `import './HeroSlider.css'` |

---

## 🚀 新しい構造（アトミックデザイン）

```
src/components/
├── atoms/          (12) - 最小単位のUIパーツ
├── molecules/      (10) - Atomsの組み合わせ
├── organisms/      (26) - 独立した機能単位
└── templates/       (4 + 2 CSS) - レイアウトテンプレート
```

---

## 📋 Phase 0: 準備作業【重要】

**推定時間**: 1.5時間

### 0-1. バックアップブランチの作成

```bash
# 現在のブランチを確認
git branch

# feature/atomic-design-refactoringブランチにいることを確認
git checkout -b backup/before-atomic-design-$(date +%Y%m%d)
git push -u origin backup/before-atomic-design-$(date +%Y%m%d)
git checkout feature/atomic-design-refactoring
```

### 0-2. 名前付きimportの完全リスト（23箇所）

#### パターンA: `@/components/ui`からの名前付きimport（22箇所）

| ファイルパス | 現在のimport文 |
|-------------|---------------|
| `app/cart/page.tsx` | `import { Badge, Button } from '@/components/ui'` |
| `app/checkout/page.tsx` | `import { Button, Input, Select, Textarea } from '@/components/ui'` |
| `app/favorites/page.tsx` | `import { Button } from '@/components/ui'` |
| `app/mypage/page.tsx` | `import { Button } from '@/components/ui'` |
| `app/product/[id]/page.tsx` | `import { Badge, Button } from '@/components/ui'` |
| `app/product/page.tsx` | `import { Button } from '@/components/ui'` |
| `app/search/page.tsx` | `import { Button } from '@/components/ui'` |
| `src/components/cart/CartHoverCard.tsx` | `import { Badge, Button } from '@/components/ui'` |
| `src/components/cart/CartItem.tsx` | `import { Button } from '@/components/ui'` |
| `src/components/cart/CartSummary.tsx` | `import { Button } from '@/components/ui'` |
| `src/components/checkout/CustomerInfoForm.tsx` | `import { Input, Select, Textarea } from '@/components/ui'` |
| `src/components/checkout/DeliveryDateSelector.tsx` | `import { Select } from '@/components/ui'` |
| `src/components/checkout/PaymentMethodSelector.tsx` | `import { Radio } from '@/components/ui'` |
| `src/components/checkout/ShippingInfoForm.tsx` | `import { Input, Select, Textarea } from '@/components/ui'` |
| `src/components/common/Modal.tsx` | `import { Button } from '@/components/ui'` |
| `src/components/favorites/FavoriteItem.tsx` | `import { Button } from '@/components/ui'` |
| `src/components/mypage/MyPageSidebar.tsx` | `import { Button } from '@/components/ui'` |
| `src/components/product/FilterSidebar.tsx` | `import { Checkbox, Select } from '@/components/ui'` |
| `src/components/product/ProductDetailClient.tsx` | `import { Badge, Button } from '@/components/ui'` |
| `src/components/product/QuantitySelector.tsx` | `import { Button } from '@/components/ui'` |
| `src/components/product/RecommendedItem.tsx` | `import { Button } from '@/components/ui'` |
| `src/components/search/SearchBar.tsx` | `import { Input, Button } from '@/components/ui'` |

#### パターンB: `@/components/cart`からの名前付きimport（1箇所）

| ファイルパス | 現在のimport文 |
|-------------|---------------|
| `app/layout.tsx` | `import { CartAddedNotification } from '@/components/cart'` |

### 0-3. 名前付きimport変換手順（手動）

#### ステップ1: VSCodeの一括置換を使用

```
検索パターン（正規表現ON）:
import \{ (.+) \} from '@/components/ui';

置換先:
（個別に手動で変換）
```

#### ステップ2: 変換例

**Before**:
```typescript
// app/cart/page.tsx
import { Badge, Button } from '@/components/ui';
```

**After**:
```typescript
// app/cart/page.tsx
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
```

#### ステップ3: 変換の検証

各ファイルを変換後、以下を実行して型エラーがないか確認：

```bash
npx tsc --noEmit
```

#### ステップ4: 変換完了後のコミット

```bash
git add .
git commit -m "refactor: 名前付きimportを個別importに変換（Phase 0完了）"
```

### 0-4. import置換スクリプトの作成

**ファイル**: `scripts/refactor-imports.js`

```javascript
const fs = require('fs');
const path = require('path');
const glob = require('glob');

// import置換マッピング（個別importのみ対応）
const replacements = [
  // Atoms (12)
  { from: '@/components/ui/Badge', to: '@/components/atoms/Badge' },
  { from: '@/components/ui/Button', to: '@/components/atoms/Button' },
  { from: '@/components/ui/Card', to: '@/components/atoms/Card' },
  { from: '@/components/ui/Checkbox', to: '@/components/atoms/Checkbox' },
  { from: '@/components/ui/Divider', to: '@/components/atoms/Divider' },
  { from: '@/components/ui/Icon', to: '@/components/atoms/Icon' },
  { from: '@/components/ui/Input', to: '@/components/atoms/Input' },
  { from: '@/components/ui/Loading', to: '@/components/atoms/Loading' },
  { from: '@/components/ui/Radio', to: '@/components/atoms/Radio' },
  { from: '@/components/ui/Select', to: '@/components/atoms/Select' },
  { from: '@/components/ui/Textarea', to: '@/components/atoms/Textarea' },
  { from: '@/components/search/FilterTag', to: '@/components/atoms/Tag' },

  // Molecules (10)
  { from: '@/components/product/QuantitySelector', to: '@/components/molecules/QuantitySelector' },
  { from: '@/components/product/SearchBar', to: '@/components/molecules/SearchBar' },
  { from: '@/components/product/SortDropdown', to: '@/components/molecules/SortDropdown' },
  { from: '@/components/product/PriceRange', to: '@/components/molecules/PriceRange' },
  { from: '@/components/cart/CouponForm', to: '@/components/molecules/CouponForm' },
  { from: '@/components/checkout/DeliveryDateSelector', to: '@/components/molecules/DeliveryDateSelector' },
  { from: '@/components/checkout/PaymentMethodSelector', to: '@/components/molecules/PaymentMethodSelector' },
  { from: '@/components/common/Breadcrumb', to: '@/components/molecules/Breadcrumb' },
  { from: '@/components/common/Pagination', to: '@/components/molecules/Pagination' },
  { from: '@/components/common/StepIndicator', to: '@/components/molecules/StepIndicator' },

  // Organisms (26)
  { from: '@/components/layout/Header', to: '@/components/organisms/Header' },
  { from: '@/components/layout/Footer', to: '@/components/organisms/Footer' },
  { from: '@/components/layout/SimpleHeader', to: '@/components/organisms/SimpleHeader' },
  { from: '@/components/layout/SimpleFooter', to: '@/components/organisms/SimpleFooter' },
  { from: '@/components/layout/MobileMenu', to: '@/components/organisms/MobileMenu' },
  { from: '@/components/product/ProductCard', to: '@/components/organisms/ProductCard' },
  { from: '@/components/product/HorizontalProductCard', to: '@/components/organisms/HorizontalProductCard' },
  { from: '@/components/product/ProductListItem', to: '@/components/organisms/ProductListItem' },
  { from: '@/components/product/ProductImageGallery', to: '@/components/organisms/ProductImageGallery' },
  { from: '@/components/product/FilterSidebar', to: '@/components/organisms/FilterSidebar' },
  { from: '@/components/product/ProductDetailClient', to: '@/components/organisms/ProductDetail' },
  { from: '@/components/cart/CartItem', to: '@/components/organisms/CartItem' },
  { from: '@/components/cart/CartSummary', to: '@/components/organisms/CartSummary' },
  { from: '@/components/cart/CartHoverCard', to: '@/components/organisms/CartHoverCard' },
  { from: '@/components/cart/CartAddedNotification', to: '@/components/organisms/CartNotification' },
  { from: '@/components/cart/EmptyCart', to: '@/components/organisms/EmptyCart' },
  { from: '@/components/checkout/CheckoutSummary', to: '@/components/organisms/CheckoutSummary' },
  { from: '@/components/checkout/CustomerInfoForm', to: '@/components/organisms/CustomerInfoForm' },
  { from: '@/components/checkout/ShippingInfoForm', to: '@/components/organisms/ShippingInfoForm' },
  { from: '@/components/search/SearchFilters', to: '@/components/organisms/SearchFilters' },
  { from: '@/components/search/SearchSort', to: '@/components/organisms/SearchSort' },
  { from: '@/components/mypage/MyPageSidebar', to: '@/components/organisms/MyPageSidebar' },
  { from: '@/components/order/OrderDetailModal', to: '@/components/organisms/OrderDetailModal' },
  { from: '@/components/favorites/FavoriteItem', to: '@/components/organisms/FavoriteItem' },
  { from: '@/components/product/RecommendedItem', to: '@/components/organisms/RecommendedItem' },
  { from: '@/components/common/Modal', to: '@/components/organisms/Modal' },

  // Templates (4)
  { from: '@/components/product/ProductGrid', to: '@/components/templates/ProductGrid' },
  { from: '@/components/product/ProductSlider', to: '@/components/templates/ProductSlider' },
  { from: '@/components/home/ProductSlider', to: '@/components/templates/HomeProductSlider' },
  { from: '@/components/home/HeroSlider', to: '@/components/templates/HeroSlider' },
];

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  replacements.forEach(({ from, to }) => {
    const regex = new RegExp(from.replace(/\//g, '\\/'), 'g');
    if (regex.test(content)) {
      content = content.replace(regex, to);
      modified = true;
    }
  });

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated: ${filePath}`);
  }
}

// app/ディレクトリとsrc/components/ディレクトリを対象
const files = [
  ...glob.sync('app/**/*.{ts,tsx}'),
  ...glob.sync('src/components/**/*.{ts,tsx}')
];

console.log(`Processing ${files.length} files...`);
files.forEach(replaceInFile);
console.log('✅ Import replacement completed!');
```

### 0-5. スクリプトのドライラン実行

```bash
# globパッケージのインストール
npm install --save-dev glob

# ドライラン（実際には書き換えない）
node scripts/refactor-imports.js --dry-run

# 問題なければ本実行（Phase 5で実施）
```

### Phase 0 完了チェックリスト

- [ ] バックアップブランチ作成
- [ ] 名前付きimport 23箇所をすべて個別importに変換
- [ ] `npx tsc --noEmit`で型エラーなし確認
- [ ] Phase 0完了のコミット
- [ ] import置換スクリプト作成
- [ ] スクリプトのドライラン実行で動作確認

---

## 📋 Phase 1: Atoms（原子）の移行

**推定時間**: 30分

### 移行対象（12コンポーネント）

| 現在のパス | 新しいパス | 説明 |
|-----------|-----------|------|
| `ui/Badge.tsx` | `atoms/Badge.tsx` | バッジ |
| `ui/Button.tsx` | `atoms/Button.tsx` | ボタン |
| `ui/Card.tsx` | `atoms/Card.tsx` | カード |
| `ui/Checkbox.tsx` | `atoms/Checkbox.tsx` | チェックボックス |
| `ui/Divider.tsx` | `atoms/Divider.tsx` | 区切り線 |
| `ui/Icon.tsx` | `atoms/Icon.tsx` | アイコン |
| `ui/Input.tsx` | `atoms/Input.tsx` | 入力欄 |
| `ui/Loading.tsx` | `atoms/Loading.tsx` | ローディング |
| `ui/Radio.tsx` | `atoms/Radio.tsx` | ラジオボタン |
| `ui/Select.tsx` | `atoms/Select.tsx` | セレクトボックス |
| `ui/Textarea.tsx` | `atoms/Textarea.tsx` | テキストエリア |
| `search/FilterTag.tsx` | `atoms/Tag.tsx` | タグ（名称変更） |

### 作業手順

```bash
# 1. ディレクトリ作成
mkdir -p src/components/atoms

# 2. ファイル移動
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

# 4. コミット
git add .
git commit -m "refactor: Atoms移行完了（Phase 1）"
```

### Phase 1 完了チェックリスト

- [ ] 12コンポーネントを`atoms/`に移動
- [ ] `atoms/index.ts`作成
- [ ] コミット

---

## 📋 Phase 2: Molecules（分子）の移行

**推定時間**: 1時間

### 移行対象（10コンポーネント）

| 現在のパス | 新しいパス | 説明 |
|-----------|-----------|------|
| `product/QuantitySelector.tsx` | `molecules/QuantitySelector.tsx` | 数量選択 |
| `product/SearchBar.tsx` | `molecules/SearchBar.tsx` | 検索バー |
| `product/SortDropdown.tsx` | `molecules/SortDropdown.tsx` | ソートドロップダウン |
| `product/PriceRange.tsx` | `molecules/PriceRange.tsx` | 価格範囲選択 |
| `cart/CouponForm.tsx` | `molecules/CouponForm.tsx` | クーポンフォーム |
| `checkout/DeliveryDateSelector.tsx` | `molecules/DeliveryDateSelector.tsx` | 配送日選択 |
| `checkout/PaymentMethodSelector.tsx` | `molecules/PaymentMethodSelector.tsx` | 支払い方法選択 |
| `common/Breadcrumb.tsx` | `molecules/Breadcrumb.tsx` | パンくずリスト |
| `common/Pagination.tsx` | `molecules/Pagination.tsx` | ページネーション |
| `common/StepIndicator.tsx` | `molecules/StepIndicator.tsx` | ステップインジケーター |

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

# 4. コミット
git add .
git commit -m "refactor: Molecules移行完了（Phase 2）"
```

### Phase 2 完了チェックリスト

- [ ] 10コンポーネントを`molecules/`に移動
- [ ] `molecules/index.ts`作成
- [ ] コミット

---

## 📋 Phase 3: Organisms（有機体）の移行

**推定時間**: 1.5時間

### 移行対象（26コンポーネント）

#### レイアウト系（5）
| 現在のパス | 新しいパス |
|-----------|-----------|
| `layout/Header.tsx` | `organisms/Header.tsx` |
| `layout/Footer.tsx` | `organisms/Footer.tsx` |
| `layout/SimpleHeader.tsx` | `organisms/SimpleHeader.tsx` |
| `layout/SimpleFooter.tsx` | `organisms/SimpleFooter.tsx` |
| `layout/MobileMenu.tsx` | `organisms/MobileMenu.tsx` |

#### 商品系（6）
| 現在のパス | 新しいパス |
|-----------|-----------|
| `product/ProductCard.tsx` | `organisms/ProductCard.tsx` |
| `product/HorizontalProductCard.tsx` | `organisms/HorizontalProductCard.tsx` |
| `product/ProductListItem.tsx` | `organisms/ProductListItem.tsx` |
| `product/ProductImageGallery.tsx` | `organisms/ProductImageGallery.tsx` |
| `product/FilterSidebar.tsx` | `organisms/FilterSidebar.tsx` |
| `product/ProductDetailClient.tsx` | `organisms/ProductDetail.tsx` |

#### カート系（5）
| 現在のパス | 新しいパス |
|-----------|-----------|
| `cart/CartItem.tsx` | `organisms/CartItem.tsx` |
| `cart/CartSummary.tsx` | `organisms/CartSummary.tsx` |
| `cart/CartHoverCard.tsx` | `organisms/CartHoverCard.tsx` |
| `cart/CartAddedNotification.tsx` | `organisms/CartNotification.tsx` |
| `cart/EmptyCart.tsx` | `organisms/EmptyCart.tsx` |

#### チェックアウト系（3）
| 現在のパス | 新しいパス |
|-----------|-----------|
| `checkout/CheckoutSummary.tsx` | `organisms/CheckoutSummary.tsx` |
| `checkout/CustomerInfoForm.tsx` | `organisms/CustomerInfoForm.tsx` |
| `checkout/ShippingInfoForm.tsx` | `organisms/ShippingInfoForm.tsx` |

#### その他（7）
| 現在のパス | 新しいパス |
|-----------|-----------|
| `search/SearchFilters.tsx` | `organisms/SearchFilters.tsx` |
| `search/SearchSort.tsx` | `organisms/SearchSort.tsx` |
| `mypage/MyPageSidebar.tsx` | `organisms/MyPageSidebar.tsx` |
| `order/OrderDetailModal.tsx` | `organisms/OrderDetailModal.tsx` |
| `favorites/FavoriteItem.tsx` | `organisms/FavoriteItem.tsx` |
| `product/RecommendedItem.tsx` | `organisms/RecommendedItem.tsx` |
| `common/Modal.tsx` | `organisms/Modal.tsx` |

### 作業手順

```bash
# 1. ディレクトリ作成
mkdir -p src/components/organisms

# 2. レイアウト系ファイル移動
git mv src/components/layout/Header.tsx src/components/organisms/Header.tsx
git mv src/components/layout/Footer.tsx src/components/organisms/Footer.tsx
git mv src/components/layout/SimpleHeader.tsx src/components/organisms/SimpleHeader.tsx
git mv src/components/layout/SimpleFooter.tsx src/components/organisms/SimpleFooter.tsx
git mv src/components/layout/MobileMenu.tsx src/components/organisms/MobileMenu.tsx

# 3. 商品系ファイル移動
git mv src/components/product/ProductCard.tsx src/components/organisms/ProductCard.tsx
git mv src/components/product/HorizontalProductCard.tsx src/components/organisms/HorizontalProductCard.tsx
git mv src/components/product/ProductListItem.tsx src/components/organisms/ProductListItem.tsx
git mv src/components/product/ProductImageGallery.tsx src/components/organisms/ProductImageGallery.tsx
git mv src/components/product/FilterSidebar.tsx src/components/organisms/FilterSidebar.tsx
git mv src/components/product/ProductDetailClient.tsx src/components/organisms/ProductDetail.tsx

# 4. カート系ファイル移動
git mv src/components/cart/CartItem.tsx src/components/organisms/CartItem.tsx
git mv src/components/cart/CartSummary.tsx src/components/organisms/CartSummary.tsx
git mv src/components/cart/CartHoverCard.tsx src/components/organisms/CartHoverCard.tsx
git mv src/components/cart/CartAddedNotification.tsx src/components/organisms/CartNotification.tsx
git mv src/components/cart/EmptyCart.tsx src/components/organisms/EmptyCart.tsx

# 5. チェックアウト系ファイル移動
git mv src/components/checkout/CheckoutSummary.tsx src/components/organisms/CheckoutSummary.tsx
git mv src/components/checkout/CustomerInfoForm.tsx src/components/organisms/CustomerInfoForm.tsx
git mv src/components/checkout/ShippingInfoForm.tsx src/components/organisms/ShippingInfoForm.tsx

# 6. その他ファイル移動
git mv src/components/search/SearchFilters.tsx src/components/organisms/SearchFilters.tsx
git mv src/components/search/SearchSort.tsx src/components/organisms/SearchSort.tsx
git mv src/components/mypage/MyPageSidebar.tsx src/components/organisms/MyPageSidebar.tsx
git mv src/components/order/OrderDetailModal.tsx src/components/organisms/OrderDetailModal.tsx
git mv src/components/favorites/FavoriteItem.tsx src/components/organisms/FavoriteItem.tsx
git mv src/components/product/RecommendedItem.tsx src/components/organisms/RecommendedItem.tsx
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
export { default as RecommendedItem } from './RecommendedItem';
export { default as Modal } from './Modal';
EOF

# 8. コミット
git add .
git commit -m "refactor: Organisms移行完了（Phase 3）"
```

### Phase 3 完了チェックリスト

- [ ] 26コンポーネントを`organisms/`に移動
- [ ] `ProductDetailClient.tsx`を`ProductDetail.tsx`にリネーム
- [ ] `CartAddedNotification.tsx`を`CartNotification.tsx`にリネーム
- [ ] `organisms/index.ts`作成
- [ ] コミット

---

## 📋 Phase 4: Templates（テンプレート）の移行

**推定時間**: 45分

### 移行対象（4コンポーネント + 2 CSS）

| 現在のパス | 新しいパス | 備考 |
|-----------|-----------|------|
| `product/ProductGrid.tsx` | `templates/ProductGrid.tsx` | 商品グリッド |
| `product/ProductSlider.tsx` | `templates/ProductSlider.tsx` | 商品スライダー |
| `home/ProductSlider.tsx` | `templates/HomeProductSlider.tsx` | ホーム用スライダー |
| `home/HeroSlider.tsx` | `templates/HeroSlider.tsx` | メインバナー |
| `home/HeroSlider.css` | `templates/HeroSlider.css` | CSS |
| `home/ProductSlider.css` | `templates/HomeProductSlider.css` | CSS（名称変更） |

### 作業手順

```bash
# 1. ディレクトリ作成
mkdir -p src/components/templates

# 2. TSXファイル移動
git mv src/components/product/ProductGrid.tsx src/components/templates/ProductGrid.tsx
git mv src/components/product/ProductSlider.tsx src/components/templates/ProductSlider.tsx
git mv src/components/home/ProductSlider.tsx src/components/templates/HomeProductSlider.tsx
git mv src/components/home/HeroSlider.tsx src/components/templates/HeroSlider.tsx

# 3. CSSファイル移動
git mv src/components/home/HeroSlider.css src/components/templates/HeroSlider.css
git mv src/components/home/ProductSlider.css src/components/templates/HomeProductSlider.css

# 4. index.ts作成
cat > src/components/templates/index.ts << 'EOF'
export { default as ProductGrid } from './ProductGrid';
export { default as ProductSlider } from './ProductSlider';
export { default as HomeProductSlider } from './HomeProductSlider';
export { default as HeroSlider } from './HeroSlider';
EOF

# 5. コミット
git add .
git commit -m "refactor: Templates移行完了（Phase 4）"
```

### ⚠️ 手動修正が必要なファイル

**ファイル**: `src/components/templates/HomeProductSlider.tsx`

**修正箇所**: CSS importパス

```typescript
// Before
import './ProductSlider.css';

// After
import './HomeProductSlider.css';
```

### Phase 4 完了チェックリスト

- [ ] 4コンポーネントを`templates/`に移動
- [ ] 2 CSSファイルを`templates/`に移動
- [ ] `HomeProductSlider.tsx`内のCSS importパス修正（手動）
- [ ] `templates/index.ts`作成
- [ ] コミット

---

## 📋 Phase 5: import文一括更新

**推定時間**: 30分

### 作業手順

```bash
# 1. スクリプト実行前の状態確認
git status

# 2. import置換スクリプト実行
node scripts/refactor-imports.js

# 3. 型チェック
npx tsc --noEmit

# 4. 変更内容確認
git diff

# 5. 問題なければコミット
git add .
git commit -m "refactor: import文を一括更新（Phase 5）"
```

### 更新される箇所（86箇所）

- `app/`ディレクトリ: 86箇所
- `src/components/`ディレクトリ: 相対importが自動更新される

### Phase 5 完了チェックリスト

- [ ] import置換スクリプト実行
- [ ] `npx tsc --noEmit`で型エラーなし確認
- [ ] コミット

---

## 📋 Phase 6: クリーンアップ

**推定時間**: 30分

### 6-1. 旧index.tsファイルの削除（11ファイル）

```bash
# 既存のindex.tsファイルを削除
rm src/components/cart/index.ts
rm src/components/checkout/index.ts
rm src/components/common/index.ts
rm src/components/home/index.ts
rm src/components/layout/index.ts
rm src/components/mypage/index.ts
rm src/components/order/index.ts
rm src/components/product/index.ts
rm src/components/search/index.ts
rm src/components/ui/index.ts

# favoritesディレクトリにはindex.tsがないため対象外
```

### 6-2. 旧ディレクトリの削除（11個）

```bash
# 空になったディレクトリを削除
rmdir src/components/cart
rmdir src/components/checkout
rmdir src/components/common
rmdir src/components/favorites
rmdir src/components/home
rmdir src/components/layout
rmdir src/components/mypage
rmdir src/components/order
rmdir src/components/product
rmdir src/components/search
rmdir src/components/ui
```

### 6-3. トップレベルindex.tsの作成

```bash
cat > src/components/index.ts << 'EOF'
// Atomic Design階層別エクスポート
export * from './atoms';
export * from './molecules';
export * from './organisms';
export * from './templates';
EOF
```

### 6-4. コミット

```bash
git add .
git commit -m "refactor: クリーンアップ完了（Phase 6）"
```

### Phase 6 完了チェックリスト

- [ ] 旧index.ts 11ファイル削除
- [ ] 旧ディレクトリ11個削除
- [ ] トップレベル`index.ts`作成
- [ ] コミット

---

## 📋 Phase 7: テスト・検証

**推定時間**: 1時間

### 7-1. 型チェック

```bash
npx tsc --noEmit
```

### 7-2. ビルドテスト

```bash
npm run build
```

### 7-3. 開発サーバー起動

```bash
npm run dev
```

### 7-4. 全ページ動作確認

- [ ] トップページ (`/`)
- [ ] 商品一覧 (`/product`)
- [ ] 商品詳細 (`/product/[id]`)
- [ ] カート (`/cart`)
- [ ] チェックアウト (`/checkout`)
- [ ] お気に入り (`/favorites`)
- [ ] マイページ (`/mypage`)
- [ ] 検索 (`/search`)

### 7-5. Lighthouseスコア確認

```bash
# Chrome DevToolsのLighthouseで各ページのスコアを確認
# 元のスコアと±5点以内であればOK
```

### 7-6. 最終コミット

```bash
git add .
git commit -m "test: 全ページ動作確認・ビルドテスト完了（Phase 7）"
```

### Phase 7 完了チェックリスト

- [ ] 型チェック成功
- [ ] ビルド成功
- [ ] 全8ページ動作確認
- [ ] Lighthouseスコア維持
- [ ] 最終コミット

---

## 📋 Phase 8（オプション）: 名前付きimportへの再変換

**推定時間**: 1時間（オプション）

### 概要

Phase 0で個別importに変換した箇所を、新しいアトミックデザイン階層の名前付きimportに戻すことで、import文をより簡潔にできます。

### メリット

```typescript
// Before (Phase 0-7完了時点)
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';

// After (Phase 8実施後)
import { Badge, Button, Input } from '@/components/atoms';
```

### 作業手順

#### 1. 同一階層の複数importを検索

```bash
# 同じ階層から複数のコンポーネントをimportしているファイルを検索
grep -r "import.*from '@/components/atoms'" app/ src/components/
```

#### 2. VSCodeの一括置換で変換

**検索パターン（正規表現）**:
```
import (\w+) from '@/components/(atoms|molecules|organisms|templates)/\1';
```

#### 3. 手動でグルーピング

同じファイル内の同一階層importをまとめる：

```typescript
// Before
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';

// After
import { Badge, Button, Input } from '@/components/atoms';
```

#### 4. コミット

```bash
git add .
git commit -m "refactor: 個別importを名前付きimportに変換（Phase 8・オプション）"
```

### Phase 8 完了チェックリスト（オプション）

- [ ] 同一階層の複数importを名前付きimportに変換
- [ ] `npx tsc --noEmit`で型エラーなし確認
- [ ] コミット

---

## 📊 推定時間まとめ

| Phase | 作業内容 | 時間 |
|-------|---------|------|
| Phase 0 | 準備（名前付きimport変換・スクリプト作成） | 1.5時間 |
| Phase 1 | Atoms移行 | 30分 |
| Phase 2 | Molecules移行 | 1時間 |
| Phase 3 | Organisms移行 | 1.5時間 |
| Phase 4 | Templates移行 | 45分 |
| Phase 5 | import文一括更新 | 30分 |
| Phase 6 | クリーンアップ | 30分 |
| Phase 7 | テスト・検証 | 1時間 |
| **合計（必須）** | | **7.75時間 ≈ 8時間** |
| Phase 8（オプション） | 名前付きimportへの再変換 | 1時間 |
| **合計（オプション含む）** | | **8.75時間 ≈ 9時間** |

---

## ✅ 期待される効果

### 1. 明確な責任範囲
- 各コンポーネントの役割が階層で明確になる
- どこに何があるかが直感的に理解できる

### 2. 再利用性の向上
- Atoms/Moleculesが純粋な関数コンポーネントとして再利用可能
- デザインシステムとしての一貫性が保たれる

### 3. 保守性の向上
- 変更の影響範囲が予測しやすい
- 新しいページ・機能の追加が容易

### 4. チーム開発の効率化
- 命名規則が統一される
- コンポーネントの検索が容易

### 5. テスト戦略の明確化
- Atomsは単体テスト
- Organismsは統合テスト
- Templatesはビジュアルテスト

---

## 🚨 リスクと対策

### リスク1: import文の更新漏れ
**対策**:
- Phase 0で名前付きimportをすべて個別importに変換
- Phase 5でスクリプトによる自動置換
- 各Phase後に`npx tsc --noEmit`で型チェック

### リスク2: 既存機能の破壊
**対策**:
- Phase単位でコミット
- 各Phase後に動作確認
- Phase 7で全ページの動作確認

### リスク3: パフォーマンスへの影響
**対策**:
- Phase 7でLighthouseスコアの比較
- バンドルサイズの確認

---

## 🎯 成功基準

✅ すべてのコンポーネントがアトミックデザインの階層に分類される
✅ すべてのページが正常に動作する
✅ ビルドエラーがゼロ
✅ TypeScript型エラーがゼロ
✅ Lighthouseスコアが維持される（±5点以内）

---

## 📝 次のステップ（リファクタリング完了後）

1. **Storybook導入**: コンポーネントカタログの作成
2. **ビジュアルリグレッションテスト**: Chromatic/Percy導入
3. **コンポーネントドキュメント**: 各コンポーネントの使用例とPropsドキュメント
4. **デザイントークン**: 色・スペーシング・タイポグラフィの定数化

---

## 📄 関連ドキュメント

- `ATOMIC_DESIGN_REFACTORING_PLAN.md` (v1.0)
- `ATOMIC_DESIGN_VERIFICATION.md` (第1回検証)
- `ATOMIC_DESIGN_REFACTORING_PLAN_V2.md` (v2.0)
- `ATOMIC_DESIGN_VERIFICATION_V2.md` (第2回検証)
- このドキュメント: `ATOMIC_DESIGN_REFACTORING_PLAN_V3.md` (v3.0・最終版)

---

**作成者**: Claude Code
**最終更新**: 2025-10-06
**ステータス**: ✅ **実装準備完了**
