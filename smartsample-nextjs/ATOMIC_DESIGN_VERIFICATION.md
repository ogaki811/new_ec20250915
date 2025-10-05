# アトミックデザインリファクタリング計画 - 検証レポート

## 検証日時
2025-10-06

## 検証結果: ⚠️ 計画に一部修正が必要

---

## 1. コンポーネント総数の確認

### 現在のコンポーネント数
```
合計: 52コンポーネント ✅
```

### ディレクトリ別内訳
| ディレクトリ | コンポーネント数 | 計画との差異 |
|------------|----------------|-------------|
| cart | 6 | ✅ 一致 |
| checkout | 5 | ✅ 一致 |
| common | 4 | ✅ 一致 |
| favorites | 1 | ✅ 一致 |
| home | 2 | ✅ 一致 |
| layout | 5 | ✅ 一致 |
| mypage | 1 | ✅ 一致 |
| order | 1 | ✅ 一致 |
| product | 13 | ⚠️ 計画: 12 (1つ多い) |
| search | 3 | ✅ 一致 |
| ui | 11 | ✅ 一致 |

---

## 2. 発見された問題点

### 問題1: Phase 3のOrganismsでRecommendedItemが抜けていた

**現状**: `product/RecommendedItem.tsx` が存在する
**計画**: Phase 3の「その他」セクションに記載されているが、テーブルに含まれていない

**修正**: Phase 3のOrganismsテーブルに追加

### 問題2: import文の更新箇所が計画に明記されていない

**発見事項**:
- `app/` ディレクトリ内: **86箇所**のimport文
- `components/` ディレクトリ内: **18箇所**の絶対パスimport
- `components/` ディレクトリ内: **8箇所**の相対パスimport
- **合計: 112箇所**のimport文更新が必要

**リスク**: 手動更新では漏れが発生する可能性が高い

**推奨対策**:
```bash
# 一括置換スクリプトの作成
# 例: sed/awk/perlによる自動置換
# または: TypeScript Language Server APIを使った自動リファクタリング
```

---

## 3. Phase別の詳細検証

### Phase 1: Atoms (12コンポーネント) ✅

すべて存在確認済み:
```
✓ Badge.tsx
✓ Button.tsx
✓ Card.tsx
✓ Checkbox.tsx
✓ Divider.tsx
✓ Icon.tsx
✓ Input.tsx
✓ Loading.tsx
✓ Radio.tsx
✓ Select.tsx
✓ Textarea.tsx
✓ FilterTag.tsx (search/FilterTag.tsx → atoms/Tag.tsx)
```

### Phase 2: Molecules (14コンポーネント) ⚠️

既存コンポーネント (10):
```
✓ QuantitySelector.tsx
✓ SearchBar.tsx
✓ SortDropdown.tsx
✓ PriceRange.tsx
✓ CouponForm.tsx
✓ DeliveryDateSelector.tsx
✓ PaymentMethodSelector.tsx
✓ Breadcrumb.tsx
✓ Pagination.tsx
✓ StepIndicator.tsx
```

新規作成予定 (4):
```
⚠️ FormField.tsx - 実装詳細が未定義
⚠️ PriceDisplay.tsx - 実装詳細が未定義
⚠️ ProductMeta.tsx - 実装詳細が未定義
⚠️ RatingStars.tsx - 実装詳細が未定義
```

**問題**: 新規コンポーネントのAPI設計が計画に含まれていない

### Phase 3: Organisms (24コンポーネント) ⚠️

計画では23だが、実際は24:

```
✓ Header.tsx
✓ Footer.tsx
✓ SimpleHeader.tsx
✓ SimpleFooter.tsx
✓ MobileMenu.tsx
✓ ProductCard.tsx
✓ HorizontalProductCard.tsx
✓ ProductListItem.tsx
✓ ProductImageGallery.tsx
✓ FilterSidebar.tsx
✓ ProductDetailClient.tsx → ProductDetail.tsx
✓ CartItem.tsx
✓ CartSummary.tsx
✓ CartHoverCard.tsx
✓ CartAddedNotification.tsx → CartNotification.tsx
✓ EmptyCart.tsx
✓ CheckoutSummary.tsx
✓ CustomerInfoForm.tsx
✓ ShippingInfoForm.tsx
✓ SearchFilters.tsx
✓ SearchSort.tsx
✓ MyPageSidebar.tsx
✓ OrderDetailModal.tsx
✓ FavoriteItem.tsx
⚠️ RecommendedItem.tsx ← 計画に抜けていた
✓ Modal.tsx
```

### Phase 4: Templates (6コンポーネント) ✅

既存 (4):
```
✓ ProductGrid.tsx
✓ ProductSlider.tsx (product/)
✓ ProductSlider.tsx (home/) → HomeProductSlider.tsx
✓ HeroSlider.tsx
```

新規作成予定 (2):
```
⚠️ SidebarLayout.tsx - 実装詳細が未定義
⚠️ AuthLayout.tsx - 実装詳細が未定義
```

---

## 4. 追加で必要な作業

### 4.1 CSS/スタイルファイルの移動

現在、以下のCSSファイルが存在:
```
src/components/home/HeroSlider.css
src/components/home/ProductSlider.css
```

**対応**:
```
HeroSlider.css → templates/HeroSlider.css
ProductSlider.css → templates/HomeProductSlider.css
```

### 4.2 index.tsファイルの整備

各階層で`index.ts`を作成してre-exportが必要:
```
src/components/atoms/index.ts
src/components/molecules/index.ts
src/components/organisms/index.ts
src/components/templates/index.ts
src/components/index.ts (トップレベル)
```

### 4.3 TypeScript型定義の確認

移動後も型が正しく解決されるか確認:
```bash
npx tsc --noEmit
```

---

## 5. import文更新の自動化スクリプト案

### 提案: Nodeスクリプトによる一括置換

```javascript
// scripts/refactor-imports.js
const fs = require('fs');
const path = require('path');

const replacements = [
  // Atoms
  { from: "@/components/ui/Badge", to: "@/components/atoms/Badge" },
  { from: "@/components/ui/Button", to: "@/components/atoms/Button" },
  // ... (全112パターン)
];

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  replacements.forEach(({ from, to }) => {
    content = content.replace(new RegExp(from, 'g'), to);
  });
  fs.writeFileSync(filePath, content, 'utf8');
}
```

または**VSCodeの一括置換機能**を使用:
```
検索: @/components/ui/Badge
置換: @/components/atoms/Badge
```

---

## 6. リスク評価の更新

### 高リスク
- ⚠️ **112箇所のimport文更新**: 手動では漏れ発生の可能性
  - **対策**: 自動化スクリプトまたはVSCode一括置換

- ⚠️ **新規6コンポーネントの実装**: 仕様が未定義
  - **対策**: Phase 2, 4で実装前に仕様を明確化

### 中リスク
- ⚠️ **CSSファイルの移動**: インポートパスの更新が必要
  - **対策**: cssファイルのimport文も一括置換対象に含める

### 低リスク
- ✅ コンポーネントファイルの移動: gitで追跡可能
- ✅ ディレクトリ構造の変更: 明確な計画がある

---

## 7. 修正された実装順序の提案

### 修正案: 自動化を先に実施

1. **準備フェーズ（新規追加）**
   - [ ] import文置換スクリプトの作成
   - [ ] 新規6コンポーネントの仕様定義

2. **Phase 1**: Atoms移行
3. **Phase 2**: Molecules移行 + 新規4コンポーネント実装
4. **Phase 3**: Organisms移行（24コンポーネント）
5. **Phase 4**: Templates移行 + 新規2コンポーネント実装
6. **Phase 5**: 一括import更新（スクリプト実行）
7. **Phase 6**: クリーンアップ
8. **Phase 7**: テスト・検証

---

## 8. 推定時間の再計算

| フェーズ | 作業内容 | 修正前 | 修正後 |
|---------|---------|--------|--------|
| 準備 | スクリプト作成・仕様定義 | - | **1時間** |
| Phase 1 | Atoms移行 | 30分 | 30分 |
| Phase 2 | Molecules移行+新規 | 1時間 | **1.5時間** |
| Phase 3 | Organisms移行 | 1時間 | **1.5時間** (24個) |
| Phase 4 | Templates移行+新規 | 45分 | **1時間** |
| Phase 5 | import一括更新 | - | **30分** |
| Phase 6 | クリーンアップ | 30分 | 30分 |
| Phase 7 | テスト・検証 | 1時間 | 1時間 |
| **合計** | | **5時間** | **7.5時間** |

---

## 9. 結論

### ✅ 実行可能だが修正が必要

計画は概ね正しいが、以下の修正が必要:

1. **Phase 3のOrganismsにRecommendedItemを追加** (24コンポーネント)
2. **import文更新の自動化を計画に含める**
3. **新規6コンポーネントの仕様を事前定義**
4. **CSSファイルの移動を計画に含める**
5. **推定時間を7.5時間に修正**

### 推奨アクション

1. 修正された計画書を作成
2. import文置換スクリプトを先に実装
3. 新規コンポーネントの仕様をチームで合意
4. Phase単位で段階的に実行

---

## 10. チェックリスト

実装前に確認すべき項目:

- [ ] import文置換スクリプトの動作確認
- [ ] 新規Moleculesコンポーネントの仕様承認
- [ ] 新規Templatesコンポーネントの仕様承認
- [ ] CSSファイル移動の影響範囲確認
- [ ] バックアップブランチの作成
- [ ] Phase完了ごとのコミットポイント設定
