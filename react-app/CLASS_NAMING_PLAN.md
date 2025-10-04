# クラス名付与計画書

## 1. 命名規則

### 基本方針
- **BEM記法**をベースにしたコンポーネント指向の命名
- **プレフィックス**: `ec-` (ECサイトの略)
- **形式**: `ec-{component}__{element}--{modifier}`
- Tailwind CSSのユーティリティクラスは維持し、セマンティックなクラスを併用

### 命名パターン
```
Block:    ec-header
Element:  ec-header__logo, ec-header__search, ec-header__nav
Modifier: ec-header--mobile, ec-button--primary
```

---

## 2. 全コンポーネント調査対象項目

**総数:** コンポーネント36個 + ページ16個 = **52ファイル**

### 2.1 レイアウトコンポーネント (9個)

#### Header.jsx
**主要要素:**
- ルート: `ec-header`
- ロゴエリア: `ec-header__logo`
- 検索エリア: `ec-header__search`
  - 検索フォーム: `ec-header__search-form`
  - 検索インプット: `ec-header__search-input`
  - 検索ボタン: `ec-header__search-button`
- ナビゲーションエリア: `ec-header__nav`
- アクション: `ec-header__actions`
  - カートアイコン: `ec-header__cart-icon`
  - お気に入りアイコン: `ec-header__favorite-icon`
  - ログインボタン: `ec-header__login-button`
- バッジ: `ec-header__badge`
- モバイルメニュートグル: `ec-header__mobile-toggle`

**Modifier:**
- デスクトップ: `ec-header--desktop`
- モバイル: `ec-header--mobile`

#### Footer.jsx
**主要要素:**
- ルート: `ec-footer`
- リンクセクション: `ec-footer__section`
- リンクタイトル: `ec-footer__section-title`
- リンクリスト: `ec-footer__link-list`
- リンク項目: `ec-footer__link-item`
- コピーライト: `ec-footer__copyright`
- SNSリンク: `ec-footer__social-links`

#### SimpleHeader.jsx
**主要要素:**
- ルート: `ec-simple-header`
- ロゴ: `ec-simple-header__logo`
- タイトル: `ec-simple-header__title`

#### SimpleFooter.jsx
**主要要素:**
- ルート: `ec-simple-footer`
- リンク: `ec-simple-footer__link`
- コピーライト: `ec-simple-footer__copyright`

#### MobileMenu.jsx
**主要要素:**
- ルート: `ec-mobile-menu`
- オーバーレイ: `ec-mobile-menu__overlay`
- パネル: `ec-mobile-menu__panel`
- ヘッダー: `ec-mobile-menu__header`
- 閉じるボタン: `ec-mobile-menu__close`
- ナビリスト: `ec-mobile-menu__nav`
- ナビ項目: `ec-mobile-menu__nav-item`

**Modifier:**
- 開いている状態: `ec-mobile-menu--open`

#### Breadcrumb.jsx
**主要要素:**
- ルート: `ec-breadcrumb`
- リスト: `ec-breadcrumb__list`
- 項目: `ec-breadcrumb__item`
- リンク: `ec-breadcrumb__link`
- 区切り: `ec-breadcrumb__separator`

**Modifier:**
- アクティブ: `ec-breadcrumb__item--active`

#### StepIndicator.jsx
**主要要素:**
- ルート: `ec-step-indicator`
- ステップリスト: `ec-step-indicator__list`
- ステップ: `ec-step-indicator__step`
- ステップ番号: `ec-step-indicator__number`
- ステップタイトル: `ec-step-indicator__title`
- 接続線: `ec-step-indicator__connector`

**Modifier:**
- 完了: `ec-step-indicator__step--completed`
- 現在: `ec-step-indicator__step--current`
- 未完了: `ec-step-indicator__step--pending`

#### Sidebar.jsx
**主要要素:**
- ルート: `ec-sidebar`
- セクション: `ec-sidebar__section`
- タイトル: `ec-sidebar__title`
- リスト: `ec-sidebar__list`
- 項目: `ec-sidebar__item`

#### PageLayout.jsx / SidebarLayout.jsx
**主要要素:**
- ルート: `ec-page-layout` / `ec-sidebar-layout`
- メインコンテンツ: `ec-page-layout__main`
- サイドバー: `ec-page-layout__sidebar`

---

### 2.2 商品関連コンポーネント (4個)

#### ProductCard.jsx
**主要要素:**
- ルート: `ec-product-card`
- リンク: `ec-product-card__link`
- 画像コンテナ: `ec-product-card__image-container`
- 画像: `ec-product-card__image`
- バッジコンテナ: `ec-product-card__badges`
- バッジ: `ec-product-card__badge`
- お気に入りボタン: `ec-product-card__favorite-btn`
- コンテンツ: `ec-product-card__content`
- ブランド: `ec-product-card__brand`
- タイトル: `ec-product-card__title`
- 価格コンテナ: `ec-product-card__price-container`
- 価格: `ec-product-card__price`
- 元価格: `ec-product-card__original-price`
- 割引率: `ec-product-card__discount`
- アクション: `ec-product-card__actions`
- カートボタン: `ec-product-card__cart-btn`

**Modifier:**
- サイズ: `ec-product-card--compact`, `ec-product-card--default`, `ec-product-card--large`
- お気に入り状態: `ec-product-card__favorite-btn--active`

#### ProductSlider.jsx
**主要要素:**
- ルート: `ec-product-slider`
- コンテナ: `ec-product-slider__container`
- スライド: `ec-product-slider__slide`
- ナビゲーション: `ec-product-slider__navigation`
  - 前へボタン: `ec-product-slider__prev`
  - 次へボタン: `ec-product-slider__next`
- ページネーション: `ec-product-slider__pagination`

#### CartItem.jsx
**主要要素:**
- ルート: `ec-cart-item`
- チェックボックス: `ec-cart-item__checkbox`
- 画像コンテナ: `ec-cart-item__image-container`
- 画像: `ec-cart-item__image`
- 詳細: `ec-cart-item__details`
- タイトル: `ec-cart-item__title`
- コード: `ec-cart-item__code`
- ブランド: `ec-cart-item__brand`
- バッジコンテナ: `ec-cart-item__badges`
- 在庫情報: `ec-cart-item__stock`
- 価格情報: `ec-cart-item__price-info`
- 単価: `ec-cart-item__unit-price`
- 元価格: `ec-cart-item__original-price`
- 割引率: `ec-cart-item__discount`
- 数量コンテナ: `ec-cart-item__quantity`
- 数量入力: `ec-cart-item__quantity-input`
- 数量ボタン: `ec-cart-item__quantity-btn`
- 合計: `ec-cart-item__total`
- アクション: `ec-cart-item__actions`
- お気に入りボタン: `ec-cart-item__favorite-btn`
- 削除ボタン: `ec-cart-item__remove-btn`

**Modifier:**
- 選択中: `ec-cart-item--selected`
- 在庫不足: `ec-cart-item--out-of-stock`
- 在庫少: `ec-cart-item--low-stock`

#### CategoryCard.jsx / CategoryGrid.jsx
**主要要素:**
- カード: `ec-category-card`
  - 画像: `ec-category-card__image`
  - タイトル: `ec-category-card__title`
- グリッド: `ec-category-grid`
  - コンテナ: `ec-category-grid__container`

---

### 2.3 フォーム関連コンポーネント (6個)

#### Input.jsx
**主要要素:**
- ルート: `ec-input`
- ラベル: `ec-input__label`
- フィールド: `ec-input__field`
- エラー: `ec-input__error`
- ヘルプテキスト: `ec-input__help`

**Modifier:**
- エラー状態: `ec-input--error`
- 無効: `ec-input--disabled`
- 必須: `ec-input--required`

#### Select.jsx
**主要要素:**
- ルート: `ec-select`
- ラベル: `ec-select__label`
- フィールド: `ec-select__field`
- アイコン: `ec-select__icon`
- エラー: `ec-select__error`

**Modifier:**
- エラー状態: `ec-select--error`
- 無効: `ec-select--disabled`

#### Checkbox.jsx
**主要要素:**
- ルート: `ec-checkbox`
- インプット: `ec-checkbox__input`
- ラベル: `ec-checkbox__label`
- マーク: `ec-checkbox__mark`

**Modifier:**
- チェック済み: `ec-checkbox--checked`
- 無効: `ec-checkbox--disabled`

#### Button.jsx
**主要要素:**
- ルート: `ec-button`
- アイコン: `ec-button__icon`
- テキスト: `ec-button__text`

**Modifier:**
- バリアント: `ec-button--primary`, `ec-button--secondary`, `ec-button--outline`, `ec-button--ghost`, `ec-button--link`, `ec-button--danger`
- サイズ: `ec-button--small`, `ec-button--medium`, `ec-button--large`
- 全幅: `ec-button--full-width`
- 無効: `ec-button--disabled`
- ローディング: `ec-button--loading`

#### SearchFilters.jsx
**主要要素:**
- ルート: `ec-search-filters`
- セクション: `ec-search-filters__section`
- タイトル: `ec-search-filters__title`
- オプション: `ec-search-filters__options`
- オプション項目: `ec-search-filters__option`
- 適用ボタン: `ec-search-filters__apply-btn`
- クリアボタン: `ec-search-filters__clear-btn`

#### SearchSort.jsx
**主要要素:**
- ルート: `ec-search-sort`
- ラベル: `ec-search-sort__label`
- セレクト: `ec-search-sort__select`

---

### 2.4 UI部品コンポーネント (14個)

#### Modal.jsx
**主要要素:**
- ルート: `ec-modal`
- オーバーレイ: `ec-modal__overlay`
- コンテナ: `ec-modal__container`
- ヘッダー: `ec-modal__header`
- タイトル: `ec-modal__title`
- 閉じるボタン: `ec-modal__close`
- ボディ: `ec-modal__body`
- フッター: `ec-modal__footer`
- アクション: `ec-modal__actions`

**Modifier:**
- 開いている状態: `ec-modal--open`
- サイズ: `ec-modal--small`, `ec-modal--medium`, `ec-modal--large`

#### Badge.jsx
**主要要素:**
- ルート: `ec-badge`
- アイコン: `ec-badge__icon`
- テキスト: `ec-badge__text`

**Modifier:**
- バリアント: `ec-badge--primary`, `ec-badge--secondary`, `ec-badge--success`, `ec-badge--warning`, `ec-badge--danger`, `ec-badge--info`

#### Loading.jsx
**主要要素:**
- ルート: `ec-loading`
- スピナー: `ec-loading__spinner`
- テキスト: `ec-loading__text`

**Modifier:**
- サイズ: `ec-loading--small`, `ec-loading--medium`, `ec-loading--large`
- フルスクリーン: `ec-loading--fullscreen`

#### Pagination.jsx
**主要要素:**
- ルート: `ec-pagination`
- リスト: `ec-pagination__list`
- 項目: `ec-pagination__item`
- ボタン: `ec-pagination__button`
- 前へボタン: `ec-pagination__prev`
- 次へボタン: `ec-pagination__next`

**Modifier:**
- アクティブ: `ec-pagination__item--active`
- 無効: `ec-pagination__item--disabled`

#### FilterTag.jsx
**主要要素:**
- ルート: `ec-filter-tag`
- ラベル: `ec-filter-tag__label`
- 削除ボタン: `ec-filter-tag__remove`

#### Icon.jsx
**主要要素:**
- ルート: `ec-icon`
- SVG: `ec-icon__svg`

**Modifier:**
- サイズ: `ec-icon--small`, `ec-icon--medium`, `ec-icon--large`
- 色: `ec-icon--primary`, `ec-icon--secondary`, `ec-icon--danger`

#### HeroSlider.jsx
**主要要素:**
- ルート: `ec-hero-slider`
- スライド: `ec-hero-slider__slide`
- 画像: `ec-hero-slider__image`
- リンク: `ec-hero-slider__link`
- ナビゲーション: `ec-hero-slider__navigation`
- ページネーション: `ec-hero-slider__pagination`
- 前へボタン: `ec-hero-slider__prev`
- 次へボタン: `ec-hero-slider__next`

#### NewsItem.jsx / NewsList.jsx
**主要要素:**
- 項目: `ec-news-item`
  - 日付: `ec-news-item__date`
  - カテゴリ: `ec-news-item__category`
  - タイトル: `ec-news-item__title`
- リスト: `ec-news-list`
  - コンテナ: `ec-news-list__container`

#### InfoField.jsx
**主要要素:**
- ルート: `ec-info-field`
- ラベル: `ec-info-field__label`
- 値: `ec-info-field__value`

#### OptimizedImage.jsx
**主要要素:**
- ルート: `ec-optimized-image`
- 画像: `ec-optimized-image__img`
- プレースホルダー: `ec-optimized-image__placeholder`

#### ErrorBoundary.jsx
**主要要素:**
- ルート: `ec-error-boundary`
- コンテナ: `ec-error-boundary__container`
- タイトル: `ec-error-boundary__title`
- メッセージ: `ec-error-boundary__message`
- スタックトレース: `ec-error-boundary__stack`
- リロードボタン: `ec-error-boundary__reload-btn`

#### LiveRegion.jsx
**主要要素:**
- ルート: `ec-live-region`
- メッセージ: `ec-live-region__message`

**Modifier:**
- 丁寧: `ec-live-region--polite`
- 緊急: `ec-live-region--assertive`

#### SkipToContent.jsx
**主要要素:**
- ルート: `ec-skip-to-content`
- リンク: `ec-skip-to-content__link`

#### ProtectedRoute.jsx
**主要要素:**
※ルーティング用コンポーネント（UI要素なし）

---

### 2.5 ページコンポーネント (16個)

#### Home.jsx
**主要要素:**
- ルート: `ec-home-page`
- ヒーローセクション: `ec-home-page__hero`
- カテゴリセクション: `ec-home-page__categories`
- おすすめ商品セクション: `ec-home-page__recommended`
- ニュースセクション: `ec-home-page__news`
- セクションタイトル: `ec-home-page__section-title`

#### ProductList.jsx
**主要要素:**
- ルート: `ec-product-list-page`
- フィルターエリア: `ec-product-list-page__filters`
- コンテンツエリア: `ec-product-list-page__content`
- ヘッダー: `ec-product-list-page__header`
- ソート: `ec-product-list-page__sort`
- 商品グリッド: `ec-product-list-page__grid`
- ページネーション: `ec-product-list-page__pagination`

#### ProductDetail.jsx
**主要要素:**
- ルート: `ec-product-detail-page`
- ギャラリー: `ec-product-detail-page__gallery`
  - メイン画像: `ec-product-detail-page__main-image`
  - サムネイル: `ec-product-detail-page__thumbnails`
  - サムネイル項目: `ec-product-detail-page__thumbnail`
- 情報: `ec-product-detail-page__info`
  - ブランド: `ec-product-detail-page__brand`
  - タイトル: `ec-product-detail-page__title`
  - コード: `ec-product-detail-page__code`
  - 価格: `ec-product-detail-page__price`
  - 在庫: `ec-product-detail-page__stock`
- 数量選択: `ec-product-detail-page__quantity`
- アクション: `ec-product-detail-page__actions`
- タブ: `ec-product-detail-page__tabs`
- タブコンテンツ: `ec-product-detail-page__tab-content`
- 関連商品: `ec-product-detail-page__related`

**Modifier:**
- サムネイルアクティブ: `ec-product-detail-page__thumbnail--active`

#### Cart.jsx
**主要要素:**
- ルート: `ec-cart-page`
- コンテンツ: `ec-cart-page__content`
- アイテムリスト: `ec-cart-page__items`
  - ヘッダー: `ec-cart-page__items-header`
  - タイトル: `ec-cart-page__items-title`
  - 全選択: `ec-cart-page__select-all`
  - 削除ボタン: `ec-cart-page__delete-selected`
- 復元バナー: `ec-cart-page__restore-banner`
- 警告バナー: `ec-cart-page__warning-banner`
- サマリー: `ec-cart-page__summary`
  - クーポン: `ec-cart-page__coupon`
  - 価格内訳: `ec-cart-page__price-breakdown`
  - 小計: `ec-cart-page__subtotal`
  - 送料: `ec-cart-page__shipping`
  - 割引: `ec-cart-page__discount`
  - 合計: `ec-cart-page__total`
  - チェックアウトボタン: `ec-cart-page__checkout-btn`
- おすすめ: `ec-cart-page__recommendations`
- 空カート: `ec-cart-page__empty`

#### Checkout.jsx
**主要要素:**
- ルート: `ec-checkout-page`
- フォーム: `ec-checkout-page__form`
- セクション: `ec-checkout-page__section`
- 配送情報: `ec-checkout-page__shipping`
- 支払い情報: `ec-checkout-page__payment`
- 注文サマリー: `ec-checkout-page__summary`
- 注文確定ボタン: `ec-checkout-page__submit-btn`

#### OrderComplete.jsx
**主要要素:**
- ルート: `ec-order-complete-page`
- メッセージ: `ec-order-complete-page__message`
- 注文番号: `ec-order-complete-page__order-number`
- 詳細: `ec-order-complete-page__details`
- アクション: `ec-order-complete-page__actions`

#### Login.jsx / Signup.jsx / ForgotPassword.jsx / ResetPassword.jsx
**主要要素:**
- ルート: `ec-login-page`, `ec-signup-page`, `ec-forgot-password-page`, `ec-reset-password-page`
- フォーム: `ec-auth-page__form`
- タイトル: `ec-auth-page__title`
- フィールド: `ec-auth-page__field`
- 送信ボタン: `ec-auth-page__submit`
- リンク: `ec-auth-page__link`
- SNSボタン: `ec-auth-page__sns-buttons`

#### PasswordResetSent.jsx
**主要要素:**
- ルート: `ec-password-reset-sent-page`
- コンテナ: `ec-password-reset-sent-page__container`
- アイコン: `ec-password-reset-sent-page__icon`
- タイトル: `ec-password-reset-sent-page__title`
- 説明: `ec-password-reset-sent-page__description`
- メールアドレス: `ec-password-reset-sent-page__email`
- ステップ: `ec-password-reset-sent-page__steps`
- ステップリスト: `ec-password-reset-sent-page__step-list`
- 注意事項: `ec-password-reset-sent-page__notice`
- アクション: `ec-password-reset-sent-page__actions`
- ヘルプ: `ec-password-reset-sent-page__help`

#### ComingSoon.jsx
**主要要素:**
- ルート: `ec-coming-soon-page`
- コンテナ: `ec-coming-soon-page__container`
- アイコン: `ec-coming-soon-page__icon`
- タイトル: `ec-coming-soon-page__title`
- メッセージ: `ec-coming-soon-page__message`
- アクション: `ec-coming-soon-page__actions`
- ボタン: `ec-coming-soon-page__button`

#### MyPage.jsx
**主要要素:**
- ルート: `ec-mypage`
- サイドバー: `ec-mypage__sidebar`
- ナビ: `ec-mypage__nav`
- コンテンツ: `ec-mypage__content`
- セクション: `ec-mypage__section`
- プロフィール: `ec-mypage__profile`

#### Favorites.jsx
**主要要素:**
- ルート: `ec-favorites-page`
- ヘッダー: `ec-favorites-page__header`
- カウント: `ec-favorites-page__count`
- グリッド: `ec-favorites-page__grid`
- 空状態: `ec-favorites-page__empty`

#### OrderHistory.jsx
**主要要素:**
- ルート: `ec-order-history-page`
- リスト: `ec-order-history-page__list`
- 項目: `ec-order-history-page__item`
- 詳細: `ec-order-history-page__details`

#### Search.jsx
**主要要素:**
- ルート: `ec-search-page`
- ヘッダー: `ec-search-page__header`
- キーワード: `ec-search-page__keyword`
- 結果カウント: `ec-search-page__result-count`
- フィルター: `ec-search-page__filters`
- 結果: `ec-search-page__results`

---

## 3. 実装計画

### Phase 1: コアコンポーネント (優先度: 高)
**対象:** Header, Footer, ProductCard, CartItem, Button, Modal
**期間:** 1-2日
**理由:** 最も使用頻度が高く、全ページで使用される

### Phase 2: ページコンポーネント (優先度: 高)
**対象:** Home, ProductList, ProductDetail, Cart, Checkout
**期間:** 2-3日
**理由:** ユーザーフローの主要ページ

### Phase 3: フォームコンポーネント (優先度: 中)
**対象:** Input, Select, Checkbox, SearchFilters
**期間:** 1日
**理由:** 認証やフィルタリングで使用

### Phase 4: UIコンポーネント (優先度: 中)
**対象:** Badge, Loading, Pagination, FilterTag, Icon, HeroSlider
**期間:** 1日
**理由:** UI強化とユーザビリティ向上

### Phase 5: その他ページ (優先度: 低)
**対象:** Login, Signup, MyPage, Favorites, OrderHistory, PasswordResetSent, ComingSoon
**期間:** 1-2日
**理由:** 重要だが使用頻度は相対的に低い

### Phase 6: アクセシビリティコンポーネント (優先度: 低)
**対象:** ErrorBoundary, LiveRegion, SkipToContent
**期間:** 0.5日
**理由:** アクセシビリティ向上のための補助機能

---

## 4. 実装ガイドライン

### 4.1 クラス追加の原則
```jsx
// Before
<div className="flex items-center justify-between p-6">

// After
<div className="ec-cart-page__items-header flex items-center justify-between p-6">
```

### 4.2 動的クラスの扱い
```jsx
// Modifier付き
<button className={`ec-button ec-button--${variant} ${className}`}>

// 条件付きModifier
<div className={`ec-cart-item ${isSelected ? 'ec-cart-item--selected' : ''}`}>
```

### 4.3 既存のクラス名との共存
- Tailwind CSSのユーティリティクラスは維持
- セマンティックなクラス名を先頭に追加
- カスタムスタイルが必要な場合のみCSS追加

### 4.4 テスト方法
- E2Eテストでクラス名をセレクタとして使用可能か確認
- 開発者ツールで要素の特定が容易になっているか確認
- CSSの競合が発生していないか確認

---

## 5. メンテナンス

### 5.1 新規コンポーネント作成時
1. このドキュメントに命名規則を追加
2. BEM記法に従ったクラス名を設計
3. コンポーネントのJSDocにクラス名を記載

### 5.2 既存コンポーネント修正時
1. 新規要素追加時は命名規則に従う
2. 大幅な変更時は該当セクションを更新

### 5.3 定期レビュー
- 月1回、命名の一貫性をチェック
- 使用されていないクラス名の削除
- 命名規則の改善提案

---

## 6. 参考資料

### BEM記法
- Block: 独立した意味を持つコンポーネント
- Element: Blockの構成要素（`__`で接続）
- Modifier: BlockやElementのバリエーション（`--`で接続）

### 命名のベストプラクティス
- 具体的で理解しやすい名前
- 略語は避ける（必要な場合は一般的なものを使用）
- 階層構造を反映
- 一貫性を保つ

---

## 7. 完全性チェックリスト

### ✅ 調査完了項目
- [x] 全ページファイル調査 (16個)
  - Cart, Checkout, ComingSoon, Favorites, ForgotPassword, Home, Login, MyPage, OrderComplete, OrderHistory, PasswordResetSent, ProductDetail, ProductList, ResetPassword, Search, Signup
- [x] 全コンポーネント調査 (36個)
  - レイアウト: 9個
  - 商品関連: 4個
  - フォーム関連: 6個
  - UI部品: 14個
  - テンプレート: 2個
  - その他ユーティリティ: 1個
- [x] 各要素のクラス名設計完了
- [x] BEM記法に基づく命名規則確立
- [x] Phase別実装計画策定

### 📋 全ファイル一覧

**ページ (16個):**
1. Cart.jsx
2. Checkout.jsx
3. ComingSoon.jsx ⭐新規追加
4. Favorites.jsx
5. ForgotPassword.jsx
6. Home.jsx
7. Login.jsx
8. MyPage.jsx
9. OrderComplete.jsx
10. OrderHistory.jsx
11. PasswordResetSent.jsx ⭐新規追加
12. ProductDetail.jsx
13. ProductList.jsx
14. ResetPassword.jsx
15. Search.jsx
16. Signup.jsx

**コンポーネント (36個):**
1. Badge.jsx
2. Breadcrumb.jsx
3. Button.jsx
4. CartItem.jsx
5. CategoryCard.jsx
6. CategoryGrid.jsx
7. Checkbox.jsx
8. ErrorBoundary.jsx ⭐新規追加
9. FilterTag.jsx
10. Footer.jsx
11. Header.jsx
12. HeroSlider.jsx
13. Icon.jsx
14. InfoField.jsx
15. Input.jsx
16. LiveRegion.jsx ⭐新規追加
17. Loading.jsx
18. MobileMenu.jsx
19. Modal.jsx
20. NewsItem.jsx
21. NewsList.jsx
22. OptimizedImage.jsx
23. Pagination.jsx
24. ProductCard.jsx
25. ProductSlider.jsx
26. ProtectedRoute.jsx ⭐新規追加
27. SearchFilters.jsx
28. SearchSort.jsx
29. Select.jsx
30. Sidebar.jsx
31. SimpleFooter.jsx
32. SimpleHeader.jsx
33. SkipToContent.jsx ⭐新規追加
34. StepIndicator.jsx
35. templates/PageLayout.jsx
36. templates/SidebarLayout.jsx

---

## 8. 次のステップ

1. **Phase 1の実装開始**
   - Header.jsx にクラス名追加
   - Footer.jsx にクラス名追加
   - ProductCard.jsx にクラス名追加
   - CartItem.jsx にクラス名追加
   - Button.jsx にクラス名追加
   - Modal.jsx にクラス名追加

2. **テストとレビュー**
   - 各コンポーネントの動作確認
   - クラス名の一貫性チェック
   - E2Eテストの更新

3. **次のPhaseへ進行**
   - Phase 2: ページコンポーネント
   - Phase 3以降: 優先度に応じて実施

---

## 9. 更新履歴

### v1.1 (再調査完了)
- ComingSoon.jsx を追加
- PasswordResetSent.jsx を追加
- ErrorBoundary.jsx を追加
- LiveRegion.jsx を追加
- ProtectedRoute.jsx を追加
- SkipToContent.jsx を追加
- Phase 6 (アクセシビリティコンポーネント) を追加
- 総ファイル数を52個に更新
- 完全性チェックリストを追加
