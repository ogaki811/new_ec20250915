# SEO & UX 改善計画

このドキュメントは、ヘッダーのSEO対策、商品詳細ページのUX改善、ドキュメント整理の実装計画です。

**作成日**: 2025-10-05
**ステータス**: 計画中

---

## 目次

1. [ヘッダーの修正（SEO対策）](#1-ヘッダーの修正seo対策)
2. [商品詳細ページの修正](#2-商品詳細ページの修正)
3. [ドキュメントディレクトリの整理](#3-ドキュメントディレクトリの整理)
4. [コーディング規約の策定](#4-コーディング規約の策定)
5. [実装順序](#5-実装順序)

---

## 1. ヘッダーの修正（SEO対策）

### 1.1 OGタグの実装

**目的**: SNSでのシェア時に適切な情報を表示

**実装内容**:
```html
<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://smartsample.example.com/" />
<meta property="og:title" content="smartsample - ECサイト" />
<meta property="og:description" content="オフィス用品から文具まで、豊富な品揃えのECサイト。高品質な商品をお手頃価格で提供します。" />
<meta property="og:image" content="https://smartsample.example.com/og-image.jpg" />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="https://smartsample.example.com/" />
<meta property="twitter:title" content="smartsample - ECサイト" />
<meta property="twitter:description" content="オフィス用品から文具まで、豊富な品揃えのECサイト。高品質な商品をお手頃価格で提供します。" />
<meta property="twitter:image" content="https://smartsample.example.com/og-image.jpg" />
```

**動的OGタグの実装**:
- React Helmetまたはreact-helmet-asyncを使用
- ページごとに適切なタイトル・説明・画像を設定
- 商品詳細ページでは商品情報を動的に反映

### 1.2 構造化データの実装

**目的**: 検索エンジンにコンテンツの意味を正確に伝える

**実装する構造化データ**:

#### 1.2.1 WebSite（サイト全体）
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "smartsample",
  "url": "https://smartsample.example.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://smartsample.example.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

#### 1.2.2 Organization（組織情報）
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "smartsample",
  "url": "https://smartsample.example.com",
  "logo": "https://smartsample.example.com/logo.png",
  "sameAs": [
    "https://twitter.com/smartsample",
    "https://facebook.com/smartsample"
  ]
}
```

#### 1.2.3 Product（商品詳細ページ）
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "商品名",
  "image": ["商品画像URL"],
  "description": "商品説明",
  "sku": "商品コード",
  "brand": {
    "@type": "Brand",
    "name": "ブランド名"
  },
  "offers": {
    "@type": "Offer",
    "url": "商品ページURL",
    "priceCurrency": "JPY",
    "price": "価格",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "smartsample"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "reviewCount": "89"
  }
}
```

#### 1.2.4 BreadcrumbList（パンくずリスト）
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "ホーム",
      "item": "https://smartsample.example.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "商品一覧",
      "item": "https://smartsample.example.com/products"
    }
  ]
}
```

### 1.3 SEO対策の実装

**基本的なSEOタグ**:
```html
<!-- 基本メタタグ -->
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="description" content="オフィス用品から文具まで、豊富な品揃えのECサイト。高品質な商品をお手頃価格で提供します。" />
<meta name="keywords" content="オフィス用品,文具,EC,通販,smartsample" />
<meta name="author" content="smartsample" />

<!-- 言語とロケール -->
<meta http-equiv="content-language" content="ja" />
<link rel="canonical" href="https://smartsample.example.com/" />

<!-- ファビコン -->
<link rel="icon" type="image/x-icon" href="/favicon.ico" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

<!-- robots -->
<meta name="robots" content="index, follow" />
```

**動的タイトルとメタディスクリプション**:
- ページごとに適切なタイトルを設定
- 60文字以内のタイトル
- 120-160文字のメタディスクリプション

**実装方法**:
1. `react-helmet-async` をインストール
2. `HelmetProvider` でアプリをラップ
3. 各ページコンポーネントで `Helmet` を使用
4. 構造化データは `<script type="application/ld+json">` で挿入

---

## 2. 商品詳細ページの修正

### 2.1 ページ遷移時のスクロール位置を最上部に

**問題点**:
- 別の商品ページに遷移した際、前のページのスクロール位置が維持される
- ユーザーが意図しない位置から閲覧を開始する

**解決方法**:

#### 方法1: ScrollToTop コンポーネント（推奨）
```jsx
// src/components/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
```

App.jsx で使用:
```jsx
<Router>
  <ScrollToTop />
  <Routes>
    {/* ... */}
  </Routes>
</Router>
```

#### 方法2: useEffect で各ページに実装
```jsx
// ProductDetail.jsx
import { useEffect } from 'react';

function ProductDetail() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ...
}
```

**採用**: 方法1（ScrollToTopコンポーネント）
- 全ページで一貫した動作
- 各ページへの変更不要
- メンテナンス性が高い

### 2.2 おすすめ商品のクリックで商品ページに遷移

**現状確認**:
- ProductSlider コンポーネントを確認
- ProductCard コンポーネントのリンク機能を確認

**実装内容**:
1. ProductSlider が ProductCard を使用していることを確認
2. ProductCard に `to={`/products/${product.id}`}` が設定されていることを確認
3. 商品詳細ページで関連商品が正しく ProductSlider に渡されていることを確認
4. 必要に応じて、useParams の id の変更を監視して商品データを再取得

**ProductDetail.jsx の修正**:
```jsx
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();

  // id が変更されたら最上部にスクロール（ScrollToTopがあれば不要）
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // 商品データの再取得
  useEffect(() => {
    // 商品データを取得する処理
  }, [id]);

  // ...
}
```

---

## 3. ドキュメントディレクトリの整理

### 3.1 現状

**ルートディレクトリ**:
- `CLASS_NAMING_PLAN.md`
- `README.md`

**docs ディレクトリ**:
- 18個のドキュメントファイル

### 3.2 移動するファイル

**ルート → docs への移動**:
```bash
mv CLASS_NAMING_PLAN.md docs/
```

**docs 内の整理**:
- すでに適切に配置されている

### 3.3 今後のルール

**ドキュメント配置ルール**:
1. **プロジェクトのREADME**: `/README.md` （ルート）
2. **その他すべてのドキュメント**: `/docs/` 配下
3. **カテゴリ別サブディレクトリ**（必要に応じて）:
   - `/docs/architecture/` - アーキテクチャ関連
   - `/docs/design/` - デザインシステム関連
   - `/docs/planning/` - 計画・仕様書
   - `/docs/guides/` - ガイド・チュートリアル

**docs/README.md の作成**:
```markdown
# ドキュメント一覧

## 設計・仕様
- [BEM_CLASS_NAMING.md](./BEM_CLASS_NAMING.md) - BEMクラス命名規則
- [CLASS_NAMING_PLAN.md](./CLASS_NAMING_PLAN.md) - クラス命名計画
- [DESIGN_SYSTEM_PLAN.md](./DESIGN_SYSTEM_PLAN.md) - デザインシステム計画

## 実装
- [IMPLEMENTATION_STRATEGY.md](./IMPLEMENTATION_STRATEGY.md) - 実装戦略
- [STATE_MANAGEMENT.md](./STATE_MANAGEMENT.md) - 状態管理

## レビュー・進捗
- [PROGRESS.md](./PROGRESS.md) - 進捗状況
- [IMPLEMENTATION_REVIEW.md](./IMPLEMENTATION_REVIEW.md) - 実装レビュー

（以下略）
```

### 3.4 .gitignore の確認

ドキュメントファイルが適切にコミットされるよう確認:
```gitignore
# ドキュメントファイルは含める
!docs/**/*.md
```

---

## 4. コーディング規約の策定

### 4.1 BEMクラス命名規則（今後のルール）

**目的**: プロジェクト全体で一貫したクラス命名を維持

**規則**:
```
ec-{block}__{element}--{modifier}
```

#### 基本ルール

1. **プレフィックス**: すべてのBEMクラスは `ec-` で始める
2. **Block（ブロック）**: コンポーネント名をケバブケースで記述
3. **Element（要素）**: ブロック内の要素を `__` で接続
4. **Modifier（修飾子）**: 状態やバリエーションを `--` で接続

#### 命名例

```jsx
// ✅ 正しい例
<div className="ec-product-card">
  <img className="ec-product-card__image" />
  <h3 className="ec-product-card__title" />
  <button className="ec-product-card__button ec-product-card__button--primary">
</div>

// ❌ 間違った例
<div className="productCard">  // プレフィックスなし
  <img className="ec-product-card-image" />  // アンダースコア1つ
  <h3 className="ec-product-card__title__main" />  // 深すぎるネスト
</div>
```

#### Tailwind CSS との共存

**クラス記述順序**: BEMクラスを先に、Tailwindクラスを後に

```jsx
// ✅ 正しい順序
<div className="ec-header flex items-center justify-between bg-white shadow-md">

// ❌ 間違った順序
<div className="flex items-center ec-header">
```

#### 状態管理用Modifier

```jsx
// アクティブ状態
className={`ec-nav__link ${isActive ? 'ec-nav__link--active' : ''}`}

// 開閉状態
className={`ec-menu ${isOpen ? 'ec-menu--open' : ''}`}

// エラー状態
className={`ec-input__field ${hasError ? 'ec-input__field--error' : ''}`}
```

### 4.2 コンポーネント作成規約

#### ファイル構成

```
src/
├── components/          # 汎用コンポーネント
│   ├── Button.jsx
│   ├── Input.jsx
│   └── templates/       # レイアウトテンプレート
│       └── PageLayout.jsx
├── pages/              # ページコンポーネント
│   ├── Home.jsx
│   └── ProductDetail.jsx
└── data/               # データファイル
    └── sampleProducts.js
```

#### コンポーネント命名

- **PascalCase**: コンポーネント名とファイル名
- **ファイル拡張子**: `.jsx`（JSXを含むファイル）
- **export**: `export default ComponentName`

#### コンポーネントテンプレート

```jsx
/**
 * ComponentName - コンポーネントの説明
 * 用途や使い方の説明
 */
function ComponentName({ prop1, prop2, className = '' }) {
  // ステート定義
  const [state, setState] = useState(initialValue);

  // イベントハンドラ
  const handleClick = () => {
    // 処理
  };

  return (
    <div className={`ec-component-name ${className}`}>
      {/* コンテンツ */}
    </div>
  );
}

export default ComponentName;
```

### 4.3 Props の型定義（将来的にTypeScript導入を想定）

```jsx
/**
 * @param {string} title - タイトル
 * @param {number} count - 件数
 * @param {boolean} isActive - アクティブ状態
 * @param {Function} onClick - クリックハンドラ
 * @param {string} className - 追加クラス名
 */
```

### 4.4 ディレクトリ構造規約

```
react-app/
├── public/              # 静的ファイル
├── src/
│   ├── components/      # 再利用可能なコンポーネント
│   ├── pages/          # ページコンポーネント
│   ├── store/          # Zustand store
│   ├── data/           # サンプルデータ
│   ├── hooks/          # カスタムフック（将来）
│   ├── utils/          # ユーティリティ関数（将来）
│   └── styles/         # グローバルスタイル
├── docs/               # ドキュメント（すべて）
└── README.md           # プロジェクトREADME
```

### 4.5 Git コミットメッセージ規約

```
<type>: <subject>

<body>

<footer>
```

**type**:
- `feat`: 新機能
- `fix`: バグ修正
- `docs`: ドキュメント更新
- `style`: コードスタイル修正（動作に影響なし）
- `refactor`: リファクタリング
- `perf`: パフォーマンス改善
- `test`: テスト追加・修正
- `chore`: ビルドプロセスやツールの変更

**例**:
```
feat: 商品詳細ページにOGタグを追加

SEO対策として、商品詳細ページに動的なOGタグを実装。
react-helmet-asyncを使用して、商品情報をSNSシェア時に表示。

- Facebook OGタグ対応
- Twitter Cardタグ対応
- 商品画像、名前、価格を動的に設定
```

### 4.6 今後のルール適用

**新規コンポーネント作成時**:
1. BEMクラス命名規則に従う
2. コンポーネントテンプレートを使用
3. JSDocコメントで説明を追加
4. /docs に必要に応じてドキュメント作成

**既存コンポーネント修正時**:
1. 可能な限りBEMクラスを追加（既存のTailwindクラスは維持）
2. 一貫性を保つ

**レビュー時のチェックポイント**:
- [ ] BEMクラスが適切に使用されているか
- [ ] クラスの記述順序が正しいか（BEM → Tailwind）
- [ ] コンポーネント名がPascalCaseか
- [ ] 適切なディレクトリに配置されているか

---

## 5. 実装順序

### Phase 1: ドキュメント整理（優先度: 低）
- [ ] CLASS_NAMING_PLAN.md を docs/ へ移動
- [ ] docs/README.md を作成
- [ ] 必要に応じてサブディレクトリを作成

**所要時間**: 10分

### Phase 2: スクロール位置の修正（優先度: 高）
- [ ] ScrollToTop コンポーネントを作成
- [ ] App.jsx に ScrollToTop を追加
- [ ] 動作確認（全ページ遷移をテスト）

**所要時間**: 15分

### Phase 3: おすすめ商品クリック機能（優先度: 中）
- [ ] ProductCard のリンク機能を確認
- [ ] ProductDetail の useParams 監視を確認
- [ ] 商品詳細ページでの遷移をテスト
- [ ] 必要に応じて修正

**所要時間**: 20分

### Phase 4: react-helmet-async のセットアップ（優先度: 高）
- [ ] react-helmet-async をインストール
- [ ] HelmetProvider を App.jsx に追加
- [ ] 基本的なSEOタグを index.html に追加

**所要時間**: 20分

### Phase 5: OGタグの実装（優先度: 高）
- [ ] 各ページに Helmet コンポーネントを追加
- [ ] ページごとの適切なタイトル・説明を設定
- [ ] OGタグ（Facebook, Twitter）を設定
- [ ] OG画像を準備（public/og-image.jpg）

**所要時間**: 30分

### Phase 6: 構造化データの実装（優先度: 中）
- [ ] WebSite 構造化データを追加（全ページ）
- [ ] Organization 構造化データを追加（全ページ）
- [ ] Product 構造化データを追加（商品詳細ページ）
- [ ] BreadcrumbList 構造化データを追加（該当ページ）

**所要時間**: 40分

### Phase 7: SEO基本対策（優先度: 高）
- [ ] メタディスクリプションを各ページに追加
- [ ] canonical URLを設定
- [ ] robots メタタグを設定
- [ ] ファビコンの設定

**所要時間**: 20分

### Phase 8: テストと検証（優先度: 高）
- [ ] 全ページのタイトルを確認
- [ ] OGタグをFacebookデバッガーで確認
- [ ] 構造化データをGoogle Rich Results Testで確認
- [ ] スクロール位置の動作確認
- [ ] おすすめ商品クリックの動作確認

**所要時間**: 30分

---

## 総所要時間: 約3時間

### 優先順位別の実装推奨順序

**即座に実装すべき（UX改善）**:
1. Phase 2: スクロール位置の修正（15分）
2. Phase 3: おすすめ商品クリック機能（20分）

**SEO対策として優先**:
3. Phase 4: react-helmet-async のセットアップ（20分）
4. Phase 5: OGタグの実装（30分）
5. Phase 7: SEO基本対策（20分）

**追加の最適化**:
6. Phase 6: 構造化データの実装（40分）

**その他**:
7. Phase 1: ドキュメント整理（10分）
8. Phase 8: テストと検証（30分）

---

## 必要なパッケージ

```bash
npm install react-helmet-async
```

---

## 参考リンク

- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Schema.org](https://schema.org/)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)

---

**次のステップ**: 実装フェーズに移行
