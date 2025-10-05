# アトミックデザインリファクタリング計画

## 目的

現在の機能ベース（feature-based）のコンポーネント構造を、アトミックデザインの原則に基づいて再構成し、コンポーネントの再利用性と保守性を向上させる。

## アトミックデザインとは

Brad Frost氏が提唱したデザインシステムの方法論。コンポーネントを5つの階層に分類：

1. **Atoms（原子）**: 最小単位のUIパーツ（ボタン、入力欄など）
2. **Molecules（分子）**: Atomsを組み合わせた小さなコンポーネント群
3. **Organisms（有機体）**: Molecules/Atomsを組み合わせた独立した機能単位
4. **Templates**: ページのレイアウト構造（コンテンツなし）
5. **Pages**: 実際のページ（Next.jsでは`app/`配下で管理）

## 現在の構造（52コンポーネント）

```
src/components/
├── cart/           (7)  - カート関連コンポーネント
├── checkout/       (5)  - チェックアウト関連
├── common/         (4)  - 共通コンポーネント
├── favorites/      (1)  - お気に入り
├── home/           (2)  - ホームページ専用
├── layout/         (5)  - レイアウトコンポーネント
├── mypage/         (1)  - マイページ
├── order/          (1)  - 注文関連
├── product/       (12)  - 商品関連
├── search/         (3)  - 検索関連
└── ui/            (12)  - 基本UIコンポーネント
```

## 新しい構造（アトミックデザイン）

```
src/components/
├── atoms/          (12) - 最小単位のUIパーツ
├── molecules/      (14) - Atomsの組み合わせ
├── organisms/      (23) - 独立した機能単位
└── templates/       (4) - レイアウトテンプレート
```

---

## Phase 1: Atoms（原子）の整理

### 移行対象（12コンポーネント）

| 現在のパス | 新しいパス | 説明 |
|-----------|-----------|------|
| `ui/Badge.tsx` | `atoms/Badge.tsx` | バッジ |
| `ui/Button.tsx` | `atoms/Button.tsx` | ボタン |
| `ui/Checkbox.tsx` | `atoms/Checkbox.tsx` | チェックボックス |
| `ui/Divider.tsx` | `atoms/Divider.tsx` | 区切り線 |
| `ui/Icon.tsx` | `atoms/Icon.tsx` | アイコン |
| `ui/Input.tsx` | `atoms/Input.tsx` | 入力欄 |
| `ui/Loading.tsx` | `atoms/Loading.tsx` | ローディング |
| `ui/Radio.tsx` | `atoms/Radio.tsx` | ラジオボタン |
| `ui/Select.tsx` | `atoms/Select.tsx` | セレクトボックス |
| `ui/Textarea.tsx` | `atoms/Textarea.tsx` | テキストエリア |
| `search/FilterTag.tsx` | `atoms/Tag.tsx` | タグ（名称変更） |
| `ui/Card.tsx` | `atoms/Card.tsx` | カード |

### 作業内容
- [ ] `src/components/atoms/` ディレクトリ作成
- [ ] 各コンポーネントを移動
- [ ] import文を一括更新
- [ ] `atoms/index.ts` でエクスポート整理

---

## Phase 2: Molecules（分子）の整理

### 移行対象（14コンポーネント）

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
| **新規作成** | `molecules/FormField.tsx` | フォームフィールド（Label + Input） |
| **新規作成** | `molecules/PriceDisplay.tsx` | 価格表示（単価+合計） |
| **新規作成** | `molecules/ProductMeta.tsx` | 商品メタ情報（ブランド+品番） |
| **新規作成** | `molecules/RatingStars.tsx` | 評価星表示 |

### 作業内容
- [ ] `src/components/molecules/` ディレクトリ作成
- [ ] 各コンポーネントを移動
- [ ] 新規コンポーネント作成（4つ）
- [ ] import文を一括更新
- [ ] `molecules/index.ts` でエクスポート整理

---

## Phase 3: Organisms（有機体）の整理

### 移行対象（23コンポーネント）

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

#### その他（4）
| 現在のパス | 新しいパス |
|-----------|-----------|
| `search/SearchFilters.tsx` | `organisms/SearchFilters.tsx` |
| `search/SearchSort.tsx` | `organisms/SearchSort.tsx` |
| `mypage/MyPageSidebar.tsx` | `organisms/MyPageSidebar.tsx` |
| `order/OrderDetailModal.tsx` | `organisms/OrderDetailModal.tsx` |
| `favorites/FavoriteItem.tsx` | `organisms/FavoriteItem.tsx` |
| `product/RecommendedItem.tsx` | `organisms/RecommendedItem.tsx` |
| `common/Modal.tsx` | `organisms/Modal.tsx` |

### 作業内容
- [ ] `src/components/organisms/` ディレクトリ作成
- [ ] 各コンポーネントを移動
- [ ] import文を一括更新
- [ ] `organisms/index.ts` でエクスポート整理

---

## Phase 4: Templates（テンプレート）の整理

### 移行対象（4コンポーネント + 新規2）

| 現在のパス | 新しいパス | 説明 |
|-----------|-----------|------|
| `product/ProductGrid.tsx` | `templates/ProductGrid.tsx` | 商品グリッドレイアウト |
| `product/ProductSlider.tsx` | `templates/ProductSlider.tsx` | 商品スライダー |
| `home/ProductSlider.tsx` | `templates/HomeProductSlider.tsx` | ホーム用スライダー |
| `home/HeroSlider.tsx` | `templates/HeroSlider.tsx` | メインバナースライダー |
| **新規作成** | `templates/SidebarLayout.tsx` | サイドバー付きレイアウト |
| **新規作成** | `templates/AuthLayout.tsx` | 認証ページ用レイアウト |

### 作業内容
- [ ] `src/components/templates/` ディレクトリ作成
- [ ] 各コンポーネントを移動
- [ ] 新規テンプレート作成（2つ）
- [ ] import文を一括更新
- [ ] `templates/index.ts` でエクスポート整理

---

## Phase 5: クリーンアップと最適化

### 作業内容
- [ ] 旧ディレクトリ削除
  - `src/components/cart/`
  - `src/components/checkout/`
  - `src/components/common/`
  - `src/components/favorites/`
  - `src/components/home/`
  - `src/components/layout/`
  - `src/components/mypage/`
  - `src/components/order/`
  - `src/components/product/`
  - `src/components/search/`
  - `src/components/ui/`

- [ ] エクスポートの整理
  - `src/components/index.ts` でトップレベルエクスポート
  - 各階層の `index.ts` で re-export

- [ ] ドキュメント更新
  - `DESIGN_SYSTEM.md` 更新
  - `README.md` 更新
  - Storybook設定（将来対応）

---

## Phase 6: テストと検証

### 作業内容
- [ ] 全ページの動作確認
  - トップページ
  - 商品一覧・詳細
  - カート・チェックアウト
  - マイページ
  - 認証ページ

- [ ] ビルドテスト
  ```bash
  npm run build
  ```

- [ ] 型チェック
  ```bash
  npx tsc --noEmit
  ```

- [ ] Lighthouse スコア確認（パフォーマンス影響なし確認）

---

## 期待される効果

### 1. **明確な責任範囲**
- 各コンポーネントの役割が階層で明確になる
- どこに何があるかが直感的に理解できる

### 2. **再利用性の向上**
- Atoms/Moleculesが純粋な関数コンポーネントとして再利用可能
- デザインシステムとしての一貫性が保たれる

### 3. **保守性の向上**
- 変更の影響範囲が予測しやすい
- 新しいページ・機能の追加が容易

### 4. **チーム開発の効率化**
- 命名規則が統一される
- コンポーネントの検索が容易

### 5. **テスト戦略の明確化**
- Atomsは単体テスト
- Organismsは統合テスト
- Templatesはビジュアルテスト

---

## 移行スケジュール（推定）

| Phase | 作業内容 | 推定時間 |
|-------|---------|---------|
| Phase 1 | Atoms移行 | 30分 |
| Phase 2 | Molecules移行 + 新規作成 | 1時間 |
| Phase 3 | Organisms移行 | 1時間 |
| Phase 4 | Templates移行 + 新規作成 | 45分 |
| Phase 5 | クリーンアップ | 30分 |
| Phase 6 | テスト・検証 | 1時間 |
| **合計** | | **約5時間** |

---

## リスクと対策

### リスク1: Import文の更新漏れ
**対策**:
- git grepで旧パスを全検索
- TypeScriptの型チェックで検出

### リスク2: 既存機能の破壊
**対策**:
- 段階的な移行（Phase単位）
- 各Phase後に動作確認

### リスク3: パフォーマンスへの影響
**対策**:
- バンドルサイズの確認
- Lighthouse スコアの比較

---

## 成功基準

✅ すべてのコンポーネントがアトミックデザインの階層に分類される
✅ すべてのページが正常に動作する
✅ ビルドエラーがゼロ
✅ TypeScript型エラーがゼロ
✅ Lighthouseスコアが維持される（±5点以内）

---

## 次のステップ

このリファクタリング完了後の追加施策：

1. **Storybook導入**: コンポーネントカタログの作成
2. **ビジュアルリグレッションテスト**: Chromatic/Percy導入
3. **コンポーネントドキュメント**: 各コンポーネントの使用例とPropsドキュメント
4. **デザイントークン**: 色・スペーシング・タイポグラフィの定数化
