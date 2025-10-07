# コンポーネントリファクタリング計画

## 現状分析

現在のプロジェクトをアトミックデザインの観点から分析した結果、以下の問題点が確認されました。

### 問題点の分類

#### 1. Pageコンポーネント内にOrganismレベルのロジックが混在
- `cart/page.tsx` - カートアイテム表示部分が直接実装されている
- `products/page.tsx` - 商品一覧とフィルター処理が直接実装されている
- `checkout/page.tsx` - チェックアウトフォームが直接実装されている

#### 2. 再利用可能なMoleculesが不足
- カートアイテムコンポーネント
- クーポン入力フォーム
- 価格サマリー
- 検索バー

#### 3. Atomsの不足
- テキストエリア
- ラジオボタン
- カード（コンテナ）
- セパレーター（区切り線）

#### 4. BEM命名規則の不統一
- 一部のコンポーネントでBEM命名が適用されていない
- クラス名の接頭辞（`ec-`）が統一されていない箇所がある

---

## リファクタリング優先順位

### Phase 1: 不足しているAtomsの作成【優先度: 高】

#### 1.1 追加が必要なAtomsコンポーネント

```
src/components/ui/
├── Textarea.tsx          【新規】 - テキストエリア
├── Radio.tsx             【新規】 - ラジオボタン
├── Card.tsx              【新規】 - カードコンテナ
├── Divider.tsx           【新規】 - 区切り線
└── Avatar.tsx            【新規】 - アバター（将来的なユーザープロフィール用）
```

**実装例**:
```typescript
// Card.tsx
interface CardProps {
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: ReactNode;
  className?: string;
}

// Textarea.tsx
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  rows?: number;
  maxLength?: number;
}

// Radio.tsx
interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
}
```

---

### Phase 2: Moleculesの抽出と作成【優先度: 高】

#### 2.1 カート関連Molecules

```
src/components/cart/          【新規ディレクトリ】
├── CartItem.tsx              【新規】 - カートアイテム
├── CartSummary.tsx           【新規】 - 価格サマリー
├── CouponForm.tsx            【新規】 - クーポン入力フォーム
└── EmptyCart.tsx             【新規】 - 空カート表示
```

**抽出元**: `src/app/cart/page.tsx`

**CartItem.tsx 設計**:
```typescript
interface CartItemProps {
  item: CartItem;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}
```

**CartSummary.tsx 設計**:
```typescript
interface CartSummaryProps {
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  itemCount: number;
}
```

#### 2.2 商品関連Molecules

```
src/components/product/
├── ProductCard.tsx           【既存】 - そのまま
├── SearchBar.tsx             【新規】 - 検索バー
├── SortDropdown.tsx          【新規】 - ソート選択
└── PriceRange.tsx            【新規】 - 価格範囲フィルター
```

**抽出元**: `src/app/products/page.tsx`

#### 2.3 チェックアウト関連Molecules

```
src/components/checkout/      【新規ディレクトリ】
├── CheckoutSummary.tsx       【新規】 - 注文サマリー
├── CustomerInfoForm.tsx      【新規】 - お客様情報フォーム
├── ShippingInfoForm.tsx      【新規】 - 配送先情報フォーム
├── PaymentMethodSelector.tsx 【新規】 - 支払い方法選択
└── DeliveryDateSelector.tsx  【新規】 - 配送日時選択
```

**抽出元**: `src/app/checkout/page.tsx`

---

### Phase 3: Organismsのリファクタリング【優先度: 中】

#### 3.1 カートOrganism

```
src/components/cart/
└── CartList.tsx              【新規】 - カートアイテムリスト全体
    ├── 使用: CartItem (Molecule)
    ├── 使用: Checkbox (Atom)
    └── 使用: Button (Atom)
```

#### 3.2 商品一覧Organism

```
src/components/product/
├── ProductGrid.tsx           【既存】 - そのまま
└── ProductListWithFilters.tsx 【新規】 - フィルター付き商品一覧
    ├── 使用: FilterSidebar (既存Organism)
    ├── 使用: ProductGrid (既存Organism)
    ├── 使用: SearchBar (Molecule)
    └── 使用: SortDropdown (Molecule)
```

#### 3.3 チェックアウトOrganism

```
src/components/checkout/
└── CheckoutForm.tsx          【新規】 - チェックアウトフォーム全体
    ├── 使用: CustomerInfoForm (Molecule)
    ├── 使用: ShippingInfoForm (Molecule)
    ├── 使用: PaymentMethodSelector (Molecule)
    └── 使用: DeliveryDateSelector (Molecule)
```

---

### Phase 4: Pageコンポーネントのシンプル化【優先度: 中】

#### 4.1 カートページのリファクタリング

**Before**:
```typescript
// src/app/cart/page.tsx
export default function CartPage() {
  // 200行以上のロジックとUI
}
```

**After**:
```typescript
// src/app/cart/page.tsx
export default function CartPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Breadcrumb items={breadcrumbItems} />
        <CartList />                    {/* Organism */}
        <CartSummary />                 {/* Molecule */}
      </main>
      <Footer />
    </div>
  );
}
```

#### 4.2 商品一覧ページのリファクタリング

**Before**:
```typescript
// src/app/products/page.tsx
export default function ProductsPage() {
  // フィルタリング、ソート、ページネーションロジック
  // 150行以上のロジックとUI
}
```

**After**:
```typescript
// src/app/products/page.tsx
export default function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Breadcrumb items={breadcrumbItems} />
        <ProductListWithFilters />      {/* Organism */}
      </main>
      <Footer />
    </div>
  );
}
```

#### 4.3 チェックアウトページのリファクタリング

**Before**:
```typescript
// src/app/checkout/page.tsx
export default function CheckoutPage() {
  // 500行以上のフォームロジックとUI
}
```

**After**:
```typescript
// src/app/checkout/page.tsx
export default function CheckoutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="ec-checkout">
        <Breadcrumb items={breadcrumbItems} />
        <StepIndicator currentStep={2} />
        <CheckoutForm />                {/* Organism */}
      </main>
      <Footer />
    </div>
  );
}
```

---

### Phase 5: BEM命名規則の統一【優先度: 低】

#### 5.1 対象コンポーネント

以下のコンポーネントで `ec-` 接頭辞とBEM命名を徹底：

```
- ProductCard.tsx
- CartItem.tsx（新規作成時に適用）
- All new Molecules
- All new Organisms
```

#### 5.2 命名パターン例

```typescript
// Before
className="product-card"
className="card-header"
className="primary-button"

// After
className="ec-product-card"
className="ec-product-card__header"
className="ec-button ec-button--primary"
```

---

### Phase 6: ユーティリティ関数の整理【優先度: 低】

#### 6.1 共通ロジックの抽出

```
src/utils/                    【新規ディレクトリ】
├── formatters.ts             【新規】 - 価格、日付フォーマット
├── validators.ts             【新規】 - バリデーション関数
└── calculations.ts           【新規】 - 計算ロジック（割引、送料等）
```

**例**:
```typescript
// formatters.ts
export const formatPrice = (price: number): string => {
  return `¥${price.toLocaleString()}`;
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// calculations.ts
export const calculateShippingFee = (total: number): number => {
  return total >= 3000 ? 0 : 500;
};

export const calculateDiscount = (
  subtotal: number,
  coupon?: Coupon
): number => {
  if (!coupon) return 0;
  // 割引計算ロジック
};
```

---

## 実装スケジュール

### Week 1-2: Phase 1 & 2
- [ ] Atoms追加（Card, Textarea, Radio, Divider）
- [ ] Cart Molecules作成（CartItem, CartSummary, CouponForm）
- [ ] Product Molecules作成（SearchBar, SortDropdown）

### Week 3-4: Phase 3
- [ ] Cart Organism作成（CartList）
- [ ] Product Organism作成（ProductListWithFilters）
- [ ] Checkout Molecules & Organism作成

### Week 5: Phase 4
- [ ] Pageコンポーネントのリファクタリング
- [ ] カートページ
- [ ] 商品一覧ページ
- [ ] チェックアウトページ

### Week 6: Phase 5 & 6
- [ ] BEM命名規則の統一
- [ ] ユーティリティ関数の整理
- [ ] 最終テスト・調整

---

## 成功基準

### 定量的指標
- [ ] Pageコンポーネントのコード行数を50%削減
- [ ] 再利用可能なMoleculesを15個以上作成
- [ ] すべてのコンポーネントでBEM命名を100%適用
- [ ] TypeScript型カバレッジ100%維持

### 定性的指標
- [ ] 新機能追加時のコンポーネント作成時間50%短縮
- [ ] コンポーネントの単体テストが容易になる
- [ ] デザイナーとの協業がスムーズになる
- [ ] Storybookでのコンポーネントカタログ作成が可能

---

## リスクと対策

### リスク1: 大規模リファクタリングによる既存機能の破壊
**対策**:
- 段階的な移行（Phase単位で実装）
- 各Phase完了時に回帰テスト実施
- Gitブランチ戦略（feature/atomic-design-phaseX）

### リスク2: 過度な細分化による複雑性の増加
**対策**:
- コンポーネント粒度のガイドライン遵守
- 単一責任の原則を厳格に適用
- 定期的なコードレビュー

### リスク3: 開発速度の一時的な低下
**対策**:
- 優先度の高いPhaseから着手
- テンプレート・ジェネレータの活用
- ペアプログラミングでの知識共有

---

## 参考資料

- [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) - デザインシステム基本ガイドライン
- [Atomic Design Methodology](https://bradfrost.com/blog/post/atomic-web-design/)
- [BEM Naming Convention](https://en.bem.info/methodology/naming-convention/)
