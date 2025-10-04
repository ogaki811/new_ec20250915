# BEM Class Naming Documentation

このドキュメントは、ECサイトReactアプリケーション全体に適用されたBEM（Block Element Modifier）クラス命名規則の完全なリファレンスです。

## 目次
- [命名規則](#命名規則)
- [実装済みコンポーネント](#実装済みコンポーネント)
- [使用方法](#使用方法)
- [進捗状況](#進捗状況)

---

## 命名規則

### 基本パターン
```
ec-{block}__{element}--{modifier}
```

### プレフィックス
すべてのBEMクラスは `ec-` プレフィックスで始まります（ECサイトの意味）。

### 例
```jsx
// Block (ルート要素)
<div className="ec-product-card">

// Element (子要素)
  <img className="ec-product-card__image" />
  <h3 className="ec-product-card__title" />

// Modifier (状態・バリエーション)
  <button className="ec-product-card__button ec-product-card__button--active">
```

### 共存
BEMクラスはTailwind CSSクラスと共存します：
```jsx
<div className="ec-header flex items-center justify-between">
  {/* BEMクラスが最初、Tailwindが後 */}
</div>
```

---

## 実装済みコンポーネント

### ✅ Phase 1-2: コアコンポーネント & メインページ (11ファイル)

#### 1. Header.jsx
```
ec-header                      // ルートコンテナ
ec-header--desktop            // デスクトップ版
ec-header--mobile             // モバイル版
ec-header__logo               // ロゴ画像
ec-header__search             // 検索エリア
ec-header__search-form        // 検索フォーム
ec-header__search-input       // 検索入力
ec-header__search-button      // 検索ボタン
ec-header__actions            // アクションエリア
ec-header__cart-icon          // カートアイコン
ec-header__badge              // カートバッジ
ec-header__mobile-toggle      // モバイルトグル
```

#### 2. Footer.jsx
```
ec-footer                     // ルートコンテナ
ec-footer__content            // コンテンツエリア
ec-footer__column             // 各カラム
ec-footer__column-title       // カラムタイトル
ec-footer__link-list          // リンクリスト
ec-footer__link               // 個別リンク
ec-footer__bottom             // 下部エリア
ec-footer__copyright          // コピーライト
```

#### 3. ProductCard.jsx
```
ec-product-card               // ルートカード
ec-product-card--compact      // コンパクトサイズ
ec-product-card--large        // ラージサイズ
ec-product-card__image-container  // 画像コンテナ
ec-product-card__image        // 商品画像
ec-product-card__badges       // バッジコンテナ
ec-product-card__badge        // 個別バッジ
ec-product-card__discount     // 割引バッジ
ec-product-card__favorite-btn // お気に入りボタン
ec-product-card__favorite-btn--active  // アクティブ状態
ec-product-card__content      // コンテンツエリア
ec-product-card__brand        // ブランド名
ec-product-card__title        // 商品タイトル
ec-product-card__rating       // 評価エリア
ec-product-card__rating-stars // 星アイコン
ec-product-card__rating-count // 評価数
ec-product-card__price-container  // 価格コンテナ
ec-product-card__original-price  // 元値
ec-product-card__price        // 現在価格
ec-product-card__tax-note     // 税込表記
ec-product-card__stock        // 在庫状態
ec-product-card__stock--in-stock    // 在庫あり
ec-product-card__stock--out-of-stock // 在庫切れ
ec-product-card__cart-btn     // カート追加ボタン
```

#### 4. CartItem.jsx
```
ec-cart-item                  // ルートアイテム
ec-cart-item--selected        // 選択状態
ec-cart-item--out-of-stock    // 在庫切れ状態
ec-cart-item__checkbox        // チェックボックス
ec-cart-item__image-container // 画像コンテナ
ec-cart-item__image           // 商品画像
ec-cart-item__details         // 詳細エリア
ec-cart-item__title           // 商品タイトル
ec-cart-item__info            // 情報エリア
ec-cart-item__code            // 商品コード
ec-cart-item__brand           // ブランド名
ec-cart-item__stock-status    // 在庫ステータス
ec-cart-item__stock-status--in-stock  // 在庫あり
ec-cart-item__stock-status--low-stock // 在庫少
ec-cart-item__stock-status--out-of-stock  // 在庫切れ
ec-cart-item__quantity        // 数量エリア
ec-cart-item__quantity-controls // 数量コントロール
ec-cart-item__quantity-decrease // 減少ボタン
ec-cart-item__quantity-input  // 数量入力
ec-cart-item__quantity-increase // 増加ボタン
ec-cart-item__price-section   // 価格セクション
ec-cart-item__unit-price      // 単価
ec-cart-item__subtotal        // 小計
ec-cart-item__remove          // 削除ボタン
```

#### 5. Button.jsx
```
ec-button                     // ベースボタン
ec-button--primary            // プライマリボタン
ec-button--secondary          // セカンダリボタン
ec-button--outline            // アウトラインボタン
ec-button--outline-danger     // アウトライン危険
ec-button--social             // ソーシャルボタン
ec-button--link               // リンクボタン
ec-button--sm                 // 小サイズ
ec-button--md                 // 中サイズ
ec-button--lg                 // 大サイズ
ec-button__icon               // アイコン
```

#### 6. Modal.jsx
```
ec-modal                      // ルートモーダル
ec-modal__overlay             // オーバーレイ
ec-modal__content             // コンテンツエリア
ec-modal__header              // ヘッダー
ec-modal__title               // タイトル
ec-modal__close               // 閉じるボタン
ec-modal__body                // ボディ
ec-modal__footer              // フッター
```

#### 7. Home.jsx
```
ec-home                       // ルートページ
ec-home__categories           // カテゴリセクション
ec-home__section-title        // セクションタイトル
ec-home__category-list        // カテゴリリスト
ec-home__category-item        // カテゴリアイテム
ec-home__category-icon        // カテゴリアイコン
ec-home__category-name        // カテゴリ名
ec-home__recommended          // おすすめセクション
ec-home__section-header       // セクションヘッダー
ec-home__view-all             // 全て見るリンク
ec-home__news                 // ニュースセクション
ec-home__news-container       // ニュースコンテナ
ec-home__news-list            // ニュースリスト
ec-home__news-item            // ニュースアイテム
ec-home__news-date            // ニュース日付
ec-home__news-label           // ニュースラベル
ec-home__news-link            // ニュースリンク
```

#### 8. ProductList.jsx
```
ec-product-list               // ルートページ
ec-product-list__header       // ヘッダー
ec-product-list__title        // タイトル
ec-product-list__count        // 商品数
ec-product-list__sidebar      // サイドバー
ec-product-list__filters      // フィルターエリア
ec-product-list__filter-header // フィルターヘッダー
ec-product-list__filter-title // フィルタータイトル
ec-product-list__filter-count // フィルター数
ec-product-list__filter-actions // フィルターアクション
ec-product-list__filter-clear // クリアボタン
ec-product-list__filter-toggle // トグルボタン
ec-product-list__filter-groups // フィルターグループ
ec-product-list__filter-group // 個別グループ
ec-product-list__filter-group-title // グループタイトル
ec-product-list__filter-option // フィルターオプション
ec-product-list__price-range  // 価格帯エリア
ec-product-list__price-input  // 価格入力
ec-product-list__price-apply  // 適用ボタン
ec-product-list__main         // メインエリア
ec-product-list__sort-bar     // ソートバー
ec-product-list__sort-control // ソートコントロール
ec-product-list__sort-select  // ソートセレクト
ec-product-list__result-info  // 結果情報
ec-product-list__grid         // 商品グリッド
```

#### 9. ProductDetail.jsx
```
ec-product-detail             // ルートページ
ec-product-detail__main       // メインセクション
ec-product-detail__images     // 画像エリア
ec-product-detail__main-image // メイン画像
ec-product-detail__thumbnails // サムネイル
ec-product-detail__thumbnail  // 個別サムネイル
ec-product-detail__thumbnail--active // アクティブサムネイル
ec-product-detail__info       // 商品情報
ec-product-detail__header     // ヘッダー
ec-product-detail__brand      // ブランド
ec-product-detail__title      // タイトル
ec-product-detail__code       // 商品コード
ec-product-detail__pricing    // 価格エリア
ec-product-detail__original-price // 元値
ec-product-detail__price      // 現在価格
ec-product-detail__discount   // 割引
ec-product-detail__tax-note   // 税込表記
ec-product-detail__stock-info // 在庫情報
ec-product-detail__stock-status // 在庫ステータス
ec-product-detail__stock-label // 在庫ラベル
ec-product-detail__stock-label--in-stock // 在庫あり
ec-product-detail__stock-label--out-of-stock // 在庫切れ
ec-product-detail__shipping-info // 配送情報
ec-product-detail__free-shipping // 送料無料
ec-product-detail__quantity   // 数量エリア
ec-product-detail__quantity-controls // 数量コントロール
ec-product-detail__quantity-decrease // 減少ボタン
ec-product-detail__quantity-input // 数量入力
ec-product-detail__quantity-increase // 増加ボタン
ec-product-detail__stock-count // 在庫数
ec-product-detail__actions    // アクションエリア
ec-product-detail__add-to-cart // カートに追加
ec-product-detail__favorite-btn // お気に入りボタン
ec-product-detail__favorite-btn--active // アクティブ
ec-product-detail__features   // 特徴エリア
ec-product-detail__features-title // 特徴タイトル
ec-product-detail__features-list // 特徴リスト
ec-product-detail__feature-item // 特徴アイテム
ec-product-detail__description // 説明セクション
ec-product-detail__section-title // セクションタイトル
ec-product-detail__description-text // 説明テキスト
ec-product-detail__specs      // 仕様セクション
ec-product-detail__specs-table // 仕様テーブル
ec-product-detail__spec-row   // 仕様行
ec-product-detail__spec-label // 仕様ラベル
ec-product-detail__spec-value // 仕様値
ec-product-detail__related    // 関連商品セクション
```

#### 10. Cart.jsx
```
ec-cart                       // ルートページ
ec-cart__content              // コンテンツエリア
ec-cart__items                // 商品エリア
ec-cart__items-header         // 商品ヘッダー
ec-cart__items-title          // 商品タイトル
ec-cart__items-count          // 商品数
ec-cart__items-actions        // アクション
ec-cart__select-all           // 全選択
ec-cart__remove-selected      // 選択削除
ec-cart__restore              // 復元エリア
ec-cart__stock-warning        // 在庫警告
ec-cart__items-list           // 商品リスト
ec-cart__summary              // 概要エリア
ec-cart__coupon               // クーポンエリア
ec-cart__coupon-field         // クーポン入力
ec-cart__coupon-apply         // クーポン適用
ec-cart__price-breakdown      // 価格詳細
ec-cart__subtotal             // 小計
ec-cart__total                // 合計
ec-cart__total-amount         // 合計金額
```

#### 11. Checkout.jsx
```
ec-checkout                   // ルートページ
ec-checkout__content          // コンテンツエリア
ec-checkout__form-area        // フォームエリア
ec-checkout__form             // フォーム
ec-checkout__customer-info    // 顧客情報
ec-checkout__section-title    // セクションタイトル
ec-checkout__shipping-info    // 配送情報
ec-checkout__postal-search    // 郵便番号検索
ec-checkout__delivery         // 配送オプション
ec-checkout__delivery-date    // 配送日
ec-checkout__date-input       // 日付入力
ec-checkout__payment          // 支払い
ec-checkout__payment-methods  // 支払い方法
ec-checkout__payment-option   // 支払いオプション
ec-checkout__payment-option--selected // 選択状態
ec-checkout__summary          // 概要エリア
ec-checkout__items-list       // 商品リスト
ec-checkout__item             // 商品アイテム
ec-checkout__item-image       // 商品画像
ec-checkout__item-info        // 商品情報
ec-checkout__item-name        // 商品名
ec-checkout__item-quantity    // 数量
ec-checkout__submit-btn       // 送信ボタン
```

### ✅ Phase 3: フォーム関連コンポーネント (4ファイル)

#### 12. Input.jsx
```
ec-input                      // ルートコンテナ
ec-input__label               // ラベル
ec-input__required            // 必須マーク
ec-input__container           // 入力コンテナ
ec-input__field               // 入力フィールド
ec-input__field--error        // エラー状態
ec-input__toggle              // パスワード表示切替
ec-input__error               // エラーメッセージ
```

#### 13. Select.jsx
```
ec-select                     // ルートコンテナ
ec-select__label              // ラベル
ec-select__required           // 必須マーク
ec-select__container          // セレクトコンテナ
ec-select__field              // セレクトフィールド
ec-select__field--error       // エラー状態
ec-select__field--disabled    // 無効状態
ec-select__arrow              // 矢印アイコン
ec-select__placeholder        // プレースホルダー
ec-select__option             // オプション
ec-select__error              // エラーメッセージ
```

#### 14. Checkbox.jsx
```
ec-checkbox                   // ルートラベル
ec-checkbox__input            // チェックボックス入力
ec-checkbox__label            // ラベルテキスト
```

#### 15. SearchFilters.jsx
```
ec-search-filters             // ルートコンテナ
ec-search-filters__header     // ヘッダー
ec-search-filters__title      // タイトル
ec-search-filters__clear-btn  // クリアボタン
ec-search-filters__section    // セクション
ec-search-filters__section-toggle // セクショントグル
ec-search-filters__section-title // セクションタイトル
ec-search-filters__section-icon // セクションアイコン
ec-search-filters__section-icon--open // 開いた状態
ec-search-filters__section-content // セクションコンテンツ
ec-search-filters__checkbox-list // チェックボックスリスト
ec-search-filters__price-range // 価格帯
ec-search-filters__price-input // 価格入力
ec-search-filters__price-separator // 価格セパレータ
ec-search-filters__rating-list // 評価リスト
ec-search-filters__rating-btn // 評価ボタン
ec-search-filters__rating-btn--active // アクティブ
ec-search-filters__rating-stars // 星コンテナ
ec-search-filters__rating-star // 星アイコン
ec-search-filters__rating-star--filled // 塗りつぶし星
```

### ✅ Phase 4: UI コンポーネント (6ファイル)

#### 16. Badge.jsx
```
ec-badge                      // ルートバッジ
ec-badge--default             // デフォルト
ec-badge--primary             // プライマリ
ec-badge--success             // 成功
ec-badge--warning             // 警告
ec-badge--danger              // 危険
ec-badge--info                // 情報
ec-badge--sm                  // 小サイズ
ec-badge--md                  // 中サイズ
ec-badge--lg                  // 大サイズ
```

#### 17. Loading.jsx
```
ec-loading                    // ルートコンテナ
ec-loading--fullscreen        // フルスクリーン
ec-loading__overlay           // オーバーレイ
ec-loading__content           // コンテンツ
ec-loading__spinner           // スピナー
ec-loading__spinner--sm       // 小スピナー
ec-loading__spinner--md       // 中スピナー
ec-loading__spinner--lg       // 大スピナー
ec-loading__spinner--xl       // 特大スピナー
ec-loading__text              // テキスト
```

#### 18. Pagination.jsx
```
ec-pagination                 // ルートナビゲーション
ec-pagination__prev           // 前へボタン
ec-pagination__prev--disabled // 無効状態
ec-pagination__next           // 次へボタン
ec-pagination__next--disabled // 無効状態
ec-pagination__list           // ページリスト
ec-pagination__page-btn       // ページボタン
ec-pagination__page-btn--active // アクティブページ
ec-pagination__ellipsis       // 省略記号
ec-pagination__icon           // アイコン
```

#### 19. FilterTag.jsx
```
ec-filter-tag                 // ルートタグ
ec-filter-tag__label          // ラベル
ec-filter-tag__remove         // 削除ボタン
ec-filter-tag__icon           // アイコン
```

#### 20. Icon.jsx
```
ec-icon                       // ルートSVG
ec-icon--{name}               // アイコン種類別修飾子
ec-icon--sm                   // 小アイコン
ec-icon--md                   // 中アイコン
ec-icon--lg                   // 大アイコン
```

#### 21. HeroSlider.jsx
```
ec-hero-slider                // ルートセクション
ec-hero-slider__container     // Swiperコンテナ
ec-hero-slider__slide         // スライド
ec-hero-slider__link          // リンク
ec-hero-slider__link--active  // アクティブリンク
ec-hero-slider__image         // 画像
```

### ✅ Phase 5: 認証ページ (1ファイル)

#### 22. Login.jsx
```
ec-login                      // ルートページ
ec-login__container           // コンテナ
ec-login__card                // カード
ec-login__decoration          // 装飾
ec-login__header              // ヘッダー
ec-login__title               // タイトル
ec-login__subtitle            // サブタイトル
ec-login__form                // フォーム
ec-login__options             // オプション
ec-login__remember-container  // Remember meコンテナ
ec-login__forgot-link         // パスワード忘れリンク
ec-login__submit-btn          // 送信ボタン
ec-login__divider             // 区切り線
ec-login__divider-line        // 区切り線
ec-login__divider-text        // 区切りテキスト
ec-login__social-buttons      // ソーシャルボタン
ec-login__social-btn          // ソーシャルボタン
ec-login__social-btn--google  // Google
ec-login__social-btn--facebook // Facebook
ec-login__social-btn--line    // LINE
ec-login__footer              // フッター
ec-login__footer-text         // フッターテキスト
ec-login__signup-link         // サインアップリンク
```

### ✅ Phase 6: ナビゲーション・スライダー (3ファイル)

#### 23. Breadcrumb.jsx
```
ec-breadcrumb                 // ルートセクション
ec-breadcrumb__container      // コンテナ
ec-breadcrumb__nav            // ナビゲーション
ec-breadcrumb__item           // アイテム
ec-breadcrumb__separator      // セパレータ
ec-breadcrumb__link           // リンク
ec-breadcrumb__current        // 現在地
```

#### 24. StepIndicator.jsx
```
ec-step-indicator             // ルートセクション
ec-step-indicator__container  // コンテナ
ec-step-indicator__title      // タイトル
ec-step-indicator__steps      // ステップリスト
ec-step-indicator__step-wrapper // ステップラッパー
ec-step-indicator__arrow      // 矢印
ec-step-indicator__step       // 個別ステップ
ec-step-indicator__number     // 番号
ec-step-indicator__number--current // 現在
ec-step-indicator__number--completed // 完了
ec-step-indicator__number--pending // 未完了
ec-step-indicator__check-icon // チェックアイコン
ec-step-indicator__label      // ラベル
ec-step-indicator__label--current // 現在ラベル
```

#### 25. ProductSlider.jsx
```
ec-product-slider             // ルートコンテナ
ec-product-slider__container  // Swiperコンテナ
ec-product-slider__slide      // スライド
```

### ✅ Phase 5 追加: 認証・ユーザーページ (9ファイル)

#### 26. Signup.jsx
```
ec-signup                     // ルートページ
ec-signup__container          // コンテナ
ec-signup__card               // カード
ec-signup__decoration         // 装飾バー
ec-signup__header             // ヘッダー
ec-signup__title              // タイトル
ec-signup__subtitle           // サブタイトル
ec-signup__form               // フォーム
ec-signup__name-fields        // 氏名フィールド
ec-signup__submit-btn         // 送信ボタン
ec-signup__terms              // 利用規約
ec-signup__footer             // フッター
ec-signup__footer-text        // フッターテキスト
ec-signup__login-link         // ログインリンク
```

#### 27. MyPage.jsx
```
ec-mypage                     // ルートページ
ec-mypage__container          // コンテナ
ec-mypage__layout             // レイアウト
ec-mypage__content            // コンテンツエリア
ec-mypage__profile-section    // プロフィールセクション
ec-mypage__profile-header     // プロフィールヘッダー
ec-mypage__profile-title      // プロフィールタイトル
ec-mypage__profile-info       // プロフィール情報
ec-mypage__orders-section     // 注文セクション
ec-mypage__section-header     // セクションヘッダー
ec-mypage__section-title      // セクションタイトル
ec-mypage__view-all-link      // 全て見るリンク
ec-mypage__order-card         // 注文カード
ec-mypage__order-header       // 注文ヘッダー
ec-mypage__order-number       // 注文番号
ec-mypage__order-date         // 注文日
ec-mypage__order-status       // 注文ステータス
ec-mypage__order-items        // 注文商品
ec-mypage__order-item         // 注文商品アイテム
ec-mypage__item-image         // 商品画像
ec-mypage__item-info          // 商品情報
ec-mypage__item-name          // 商品名
ec-mypage__item-quantity      // 数量
ec-mypage__order-total        // 合計金額
ec-mypage__recommendations-section // おすすめセクション
```

#### 28. Favorites.jsx
```
ec-favorites                  // ルートページ
ec-favorites__container       // コンテナ
ec-favorites__card            // カード
ec-favorites__header          // ヘッダー
ec-favorites__title           // タイトル
ec-favorites__count           // 商品数
ec-favorites__sort-controls   // ソートコントロール
ec-favorites__grid            // 商品グリッド
ec-favorites__empty           // 空状態
ec-favorites__empty-icon      // 空状態アイコン
ec-favorites__empty-title     // 空状態タイトル
ec-favorites__empty-text      // 空状態テキスト
ec-favorites__empty-button    // 空状態ボタン
```

#### 29. OrderHistory.jsx
```
ec-order-history              // ルートページ
ec-order-history__container   // コンテナ
ec-order-history__card        // カード
ec-order-history__header      // ヘッダー
ec-order-history__title       // タイトル
ec-order-history__filters     // フィルターエリア
ec-order-history__filter-select // フィルター選択
ec-order-history__orders-list // 注文リスト
ec-order-history__order-card  // 注文カード
ec-order-history__order-header // 注文ヘッダー
ec-order-history__order-number // 注文番号
ec-order-history__order-date  // 注文日
ec-order-history__order-status // 注文ステータス
ec-order-history__order-items // 注文商品
ec-order-history__order-item  // 注文商品アイテム
ec-order-history__item-image  // 商品画像
ec-order-history__item-info   // 商品情報
ec-order-history__item-name   // 商品名
ec-order-history__item-price  // 商品価格
ec-order-history__item-quantity // 数量
ec-order-history__order-footer // 注文フッター
ec-order-history__order-total // 合計金額
ec-order-history__reorder-btn // 再注文ボタン
ec-order-history__pagination  // ページネーション
```

#### 30. Search.jsx
```
ec-search                     // ルートページ
ec-search__section            // セクション
ec-search__container          // コンテナ
ec-search__header             // ヘッダー
ec-search__title              // タイトル
ec-search__query              // 検索クエリ
ec-search__active-filters     // アクティブフィルター
ec-search__layout             // レイアウト
ec-search__sidebar            // サイドバー
ec-search__main               // メインエリア
ec-search__products-grid      // 商品グリッド
```

#### 31. OrderComplete.jsx
```
ec-order-complete             // ルートページ
ec-order-complete__container  // コンテナ
ec-order-complete__success-card // 成功カード
ec-order-complete__check-icon // チェックアイコン
ec-order-complete__title      // タイトル
ec-order-complete__subtitle   // サブタイトル
ec-order-complete__order-number // 注文番号エリア
ec-order-complete__number-label // 番号ラベル
ec-order-complete__number     // 注文番号
ec-order-complete__details-card // 詳細カード
ec-order-complete__section-title // セクションタイトル
ec-order-complete__info-row   // 情報行
ec-order-complete__info-label // 情報ラベル
ec-order-complete__info-value // 情報値
ec-order-complete__items      // 商品リスト
ec-order-complete__item       // 商品アイテム
ec-order-complete__item-image // 商品画像
ec-order-complete__item-info  // 商品情報
ec-order-complete__item-name  // 商品名
ec-order-complete__item-price // 商品価格
ec-order-complete__item-quantity // 数量
ec-order-complete__price-details // 価格詳細
ec-order-complete__price-row  // 価格行
ec-order-complete__price-label // 価格ラベル
ec-order-complete__price-value // 価格値
ec-order-complete__total-row  // 合計行
ec-order-complete__next-steps-card // 次のステップカード
ec-order-complete__steps-list // ステップリスト
ec-order-complete__actions    // アクションエリア
ec-order-complete__action-btn // アクションボタン
```

#### 32. PasswordResetSent.jsx
```
ec-password-reset-sent        // ルートページ
ec-password-reset-sent__container // コンテナ
ec-password-reset-sent__card  // カード
ec-password-reset-sent__icon-wrapper // アイコンラッパー
ec-password-reset-sent__check-icon // チェックアイコン
ec-password-reset-sent__header // ヘッダー
ec-password-reset-sent__title // タイトル
ec-password-reset-sent__message // メッセージ
ec-password-reset-sent__steps-card // ステップカード
ec-password-reset-sent__steps-title // ステップタイトル
ec-password-reset-sent__steps-list // ステップリスト
ec-password-reset-sent__footer // フッター
ec-password-reset-sent__footer-text // フッターテキスト
ec-password-reset-sent__back-link // 戻るリンク
```

#### 33. ComingSoon.jsx
```
ec-coming-soon                // ルートページ
ec-coming-soon__container     // コンテナ
ec-coming-soon__card          // カード
ec-coming-soon__icon-wrapper  // アイコンラッパー
ec-coming-soon__icon          // アイコン
ec-coming-soon__title         // タイトル
ec-coming-soon__message       // メッセージ
ec-coming-soon__actions       // アクションエリア
```

#### 34. ForgotPassword.jsx
```
ec-forgot-password            // ルートページ
ec-forgot-password__container // コンテナ
ec-forgot-password__card      // カード
ec-forgot-password__decoration // 装飾バー
ec-forgot-password__header    // ヘッダー
ec-forgot-password__title     // タイトル
ec-forgot-password__subtitle  // サブタイトル
ec-forgot-password__form      // フォーム
ec-forgot-password__submit-btn // 送信ボタン
ec-forgot-password__footer    // フッター
ec-forgot-password__footer-text // フッターテキスト
ec-forgot-password__back-link // 戻るリンク
```

#### 35. ResetPassword.jsx
```
ec-reset-password             // ルートページ
ec-reset-password--error      // エラー状態修飾子
ec-reset-password__container  // コンテナ
ec-reset-password__card       // カード
ec-reset-password__error-card // エラーカード
ec-reset-password__error-icon // エラーアイコン
ec-reset-password__error-title // エラータイトル
ec-reset-password__error-message // エラーメッセージ
ec-reset-password__decoration // 装飾バー
ec-reset-password__header     // ヘッダー
ec-reset-password__title      // タイトル
ec-reset-password__subtitle   // サブタイトル
ec-reset-password__form       // フォーム
ec-reset-password__strength-indicator // 強度インジケーター
ec-reset-password__strength-bar // 強度バー
ec-reset-password__strength-bar--weak // 弱い
ec-reset-password__strength-bar--medium // 中間
ec-reset-password__strength-bar--strong // 強い
ec-reset-password__strength-text // 強度テキスト
ec-reset-password__requirements // 要件リスト
ec-reset-password__submit-btn // 送信ボタン
```

### ✅ Phase 6 追加: レイアウト・ナビゲーション (9ファイル)

#### 36. MobileMenu.jsx
```
ec-mobile-menu                // ルートコンテナ
ec-mobile-menu__overlay       // オーバーレイ
ec-mobile-menu__drawer        // ドロワー
ec-mobile-menu__header        // ヘッダー
ec-mobile-menu__close         // 閉じるボタン
ec-mobile-menu__close-icon    // 閉じるアイコン
ec-mobile-menu__nav           // ナビゲーション
ec-mobile-menu__section       // セクション
ec-mobile-menu__section-title // セクションタイトル
ec-mobile-menu__list          // リスト
ec-mobile-menu__item          // アイテム
ec-mobile-menu__link          // リンク
ec-mobile-menu__link--active  // アクティブリンク
```

#### 37. OptimizedImage.jsx
```
ec-optimized-image            // ルートコンテナ
ec-optimized-image__skeleton  // スケルトン
ec-optimized-image__image     // 画像
ec-optimized-image__image--loading // 読込中
ec-optimized-image__image--loaded // 読込完了
ec-optimized-image__error     // エラー表示
ec-optimized-image__error-icon // エラーアイコン
ec-optimized-image__error-text // エラーテキスト
```

#### 38. Sidebar.jsx
```
ec-sidebar                    // ルートナビゲーション
ec-sidebar__section           // セクション
ec-sidebar__section-title     // セクションタイトル
ec-sidebar__nav               // ナビゲーション
ec-sidebar__item              // アイテム
ec-sidebar__link              // リンク
ec-sidebar__link--active      // アクティブリンク
ec-sidebar__icon              // アイコン
ec-sidebar__label             // ラベル
```

#### 39. SimpleHeader.jsx
```
ec-simple-header              // ルートヘッダー
ec-simple-header__container   // コンテナ
ec-simple-header__logo-link   // ロゴリンク
ec-simple-header__logo        // ロゴ画像
```

#### 40. SimpleFooter.jsx
```
ec-simple-footer              // ルートフッター
ec-simple-footer__container   // コンテナ
ec-simple-footer__copyright   // コピーライト
```

#### 41. SidebarLayout.jsx
```
ec-sidebar-layout             // ルートレイアウト
ec-sidebar-layout__container  // コンテナ
ec-sidebar-layout__mobile-title // モバイルタイトル
ec-sidebar-layout__title      // タイトル
ec-sidebar-layout__mobile-toggle // モバイルトグル
ec-sidebar-layout__toggle-button // トグルボタン
ec-sidebar-layout__toggle-label // トグルラベル
ec-sidebar-layout__toggle-icon // トグルアイコン
ec-sidebar-layout__toggle-icon--open // 開いた状態
ec-sidebar-layout__wrapper    // ラッパー
ec-sidebar-layout__sidebar    // サイドバー
ec-sidebar-layout__sidebar--open // 開いた状態
ec-sidebar-layout__content    // コンテンツ
```

### ✅ Phase 7: ユーティリティ・その他 (8ファイル)

#### 42. SearchSort.jsx
```
ec-search-sort                // ルートコンテナ
ec-search-sort__count         // 結果数
ec-search-sort__count-value   // 結果数値
ec-search-sort__controls      // コントロール
ec-search-sort__label         // ラベル
```

#### 43. CategoryCard.jsx
```
ec-category-card              // ルートカード
ec-category-card__image-wrapper // 画像ラッパー
ec-category-card__image       // 画像
ec-category-card__overlay     // オーバーレイ
ec-category-card__content     // コンテンツ
ec-category-card__title       // タイトル
ec-category-card__count       // 商品数
```

#### 44. NewsItem.jsx
```
ec-news-item                  // ルートアイテム
ec-news-item__wrapper         // ラッパー
ec-news-item__content         // コンテンツ
ec-news-item__meta            // メタ情報
ec-news-item__date            // 日付
ec-news-item__category        // カテゴリ
ec-news-item__new-badge       // NEWバッジ
ec-news-item__title           // タイトル
ec-news-item__excerpt         // 抜粋
ec-news-item__arrow           // 矢印
```

#### 45. InfoField.jsx
```
ec-info-field                 // ルートフィールド
ec-info-field__icon           // アイコン
ec-info-field__content        // コンテンツ
ec-info-field__label          // ラベル
ec-info-field__value          // 値
```

#### 46. CategoryGrid.jsx
```
ec-category-grid              // ルートグリッド
```

#### 47. NewsList.jsx
```
ec-news-list                  // ルートリスト
ec-news-list--empty           // 空状態修飾子
ec-news-list__empty-icon      // 空状態アイコン
ec-news-list__empty-text      // 空状態テキスト
```

#### 48. ErrorBoundary.jsx
```
ec-error-boundary             // ルートコンテナ
ec-error-boundary__container  // コンテナ
ec-error-boundary__icon-wrapper // アイコンラッパー
ec-error-boundary__icon       // アイコン
ec-error-boundary__title      // タイトル
ec-error-boundary__message    // メッセージ
ec-error-boundary__actions    // アクション
```

#### 49. SkipToContent.jsx
```
ec-skip-to-content            // スキップリンク
```

#### 50. LiveRegion.jsx
```
ec-live-region                // ライブリージョン（スクリーンリーダー用）
```

#### 51. PageLayout.jsx
```
ec-page-layout                // 基本ページレイアウト
```

#### 52. ProtectedRoute.jsx
```
※ このコンポーネントは独自のDOM要素をレンダリングしないため、BEMクラスは不要
  - React Routerの<Navigate>コンポーネントを返すか、childrenをそのまま返す
  - 認証ルートガードとしての役割のみ
```

---

## 使用方法

### 基本的な使い方

1. **コンポーネントのルート要素に Block クラスを追加**
```jsx
<div className="ec-product-card">
```

2. **子要素に Element クラスを追加**
```jsx
<img className="ec-product-card__image" />
<h3 className="ec-product-card__title" />
```

3. **状態やバリエーションに Modifier を追加**
```jsx
<div className={`ec-product-card ${isLarge ? 'ec-product-card--large' : ''}`}>
```

### Tailwind CSS との併用

BEMクラスを先に記述し、その後Tailwindクラスを追加：

```jsx
<div className="ec-header flex items-center justify-between bg-white shadow-md">
  {/* ✅ 正しい: BEMが最初、Tailwindが後 */}
</div>

<div className="flex items-center ec-header">
  {/* ❌ 非推奨: Tailwindが最初 */}
</div>
```

### 動的クラス名

```jsx
// 推奨パターン
const buttonClass = `ec-button ec-button--${variant} ec-button--${size} ${className}`;

// または
<div className={`ec-modal ${isOpen ? 'ec-modal--open' : ''}`}>
```

---

## 進捗状況

### ✅ 完了: 52 / 52 ファイル (100%)

#### ✅ Phase 1-2: コアコンポーネント & メインページ (11ファイル)
- Header, Footer, ProductCard, CartItem, Button, Modal
- Home, ProductList, ProductDetail, Cart, Checkout

#### ✅ Phase 3: フォーム関連コンポーネント (4ファイル)
- Input, Select, Checkbox, SearchFilters

#### ✅ Phase 4: UI コンポーネント (6ファイル)
- Badge, Loading, Pagination, FilterTag, Icon, HeroSlider

#### ✅ Phase 5: 認証・ユーザーページ (10ファイル)
- Login, Signup, MyPage, Favorites, OrderHistory
- Search, OrderComplete, PasswordResetSent, ComingSoon, ForgotPassword, ResetPassword

#### ✅ Phase 6: ナビゲーション・レイアウト (12ファイル)
- Breadcrumb, StepIndicator, ProductSlider
- MobileMenu, OptimizedImage, Sidebar
- SimpleHeader, SimpleFooter, SidebarLayout

#### ✅ Phase 7: ユーティリティ・その他 (9ファイル)
- SearchSort, CategoryCard, NewsItem, InfoField
- CategoryGrid, NewsList, ErrorBoundary, SkipToContent
- LiveRegion, PageLayout, ProtectedRoute

### 📝 注意事項

#### DOM要素を持たないコンポーネント (1ファイル)
- **ProtectedRoute**: 認証ルートガードとして機能し、独自のDOM要素をレンダリングしないため、BEMクラスは適用対象外

---

## 保守とベストプラクティス

### クラス名の追加ルール

1. **必ずルート要素にBlockクラスを追加**
2. **意味のある要素にはElementクラスを追加**
3. **状態変化にはModifierを使用**
4. **深いネストは避け、フラットな構造を保つ**

### 例: 深いネスト（❌ 非推奨）
```jsx
// ❌ 深すぎるネスト
ec-product-card__content__info__price__amount
```

### 例: フラットな構造（✅ 推奨）
```jsx
// ✅ フラットな命名
ec-product-card__price-amount
```

### 検索とデバッグ

すべてのBEMクラスは `ec-` で始まるため、検索が容易：

```bash
# すべてのBEMクラスを検索
grep -r "ec-" src/

# 特定コンポーネントのBEMクラスを検索
grep -r "ec-product-card" src/
```

---

## まとめ

このBEM命名システムにより：

✅ **一貫性**: 全コンポーネントで統一された命名規則
✅ **可読性**: クラス名から役割が明確
✅ **保守性**: Tailwindと共存しながら意味的な構造を提供
✅ **拡張性**: 新規コンポーネント追加が容易
✅ **デバッグ性**: `ec-` プレフィックスで簡単に識別

---

**作成日**: 2025-10-05
**最終更新**: 2025-10-05
**バージョン**: 3.0 - 完全版
**プロジェクト**: ECサイト React アプリケーション
**完了率**: 52/52 ファイル (100%) ✅
