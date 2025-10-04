# デザインシステム計画 - 総括

## 📚 計画書一覧

すべての計画書が完成しました。以下のドキュメントを参照してください。

### 1. **DESIGN_SYSTEM_PLAN.md** - 基本設計
- Atomic Design構造の概要
- コンポーネント一覧（Atoms, Molecules, Organisms, Templates）
- デザイントークン定義
- 実装フェーズ計画

### 2. **CSS_TO_TAILWIND_MAPPING.md** - スタイル変換計画
- 既存CSSクラスのTailwindへの完全マッピング
- 商品カード、ボタン、バッジ等の詳細変換例
- 独自CSS最小化戦略
- レスポンシブ対応パターン

### 3. **IMPLEMENTATION_STRATEGY.md** - 実装戦略
- 詳細なコンポーネント実装例（完全なコード付き）
- 5週間の実装スケジュール
- 成功基準の定義
- 次のアクションプラン

### 4. **UNIFIED_COMPONENTS.md** - 統一コンポーネント設計
- 重複パターンの統一設計
- ProductCard、SectionHeader、Card、Grid等の完全仕様
- Before/After比較
- コード削減効果

### 5. **BUTTON_VARIANTS.md** - ボタンバリエーション定義
- 8種類のボタンバリアント詳細仕様
- 4種類のサイズバリエーション
- 状態（disabled, loading, active）
- 完全な実装コード

### 6. **ADDITIONAL_PAGES_PLAN.md** - 追加ページ計画
- Cart（カート）ページ設計
- Login（ログイン）ページ設計
- Signup（サインアップ）ページ設計
- 必要な新規コンポーネント（CartItem, QuantitySelector等）

### 7. **SLIDER_COMPONENT_PLAN.md** - スライダーコンポーネント計画
- TOPページメインビジュアルスライダー設計
- Swiper.js使用の実装計画
- 自動再生・ナビゲーション・ページネーション機能
- 完全な実装コード

### 8. **IMPLEMENTATION_REVIEW.md** - 実装計画レビュー
- 全7つの計画書の整合性チェック
- コンポーネント一覧の確認
- 発見された問題点と修正案
- 実装前の最終確認ドキュメント

### 9. **SSR_MIGRATION_PLAN.md** - SSR実装計画 ★NEW
- Next.js 14 (App Router)への移行計画
- Vite→Next.js移行マッピング
- Server Components実装戦略
- SEO・OGP・パフォーマンス最適化

### 10. **PROGRESS.md** - 実装進捗管理 ★NEW
- コンポーネント別実装状況（26個）
- 週次進捗記録
- 品質指標管理（Lighthouse等）
- 課題管理・メモ

### 11. **RESPONSIVE_DESIGN_DETAILS.md** - レスポンシブ詳細設計 ★NEW
- ブレークポイント定義
- コンポーネント別レスポンシブ仕様
- **おすすめ商品: 横6列（デスクトップ）**
- **ヘッダー: 横幅100%、sticky固定**
- モバイル・タブレット・デスクトップ対応

### 12. **REQUIREMENTS_UPDATE.md** - 追加要件対応状況
- **12の追加要件と対応状況**
- おすすめ商品小型化・6列表示
- ヘッダー共通化・横幅100%
- SSR・進捗管理・レスポンシブ対応
- **スライダー仕様変更（3枚同時表示・中央フォーカス）**

### 13. **SLIDER_VISUAL_SPEC.md** - スライダービジュアル仕様書 ★NEW
- レイアウト図解（デスクトップ・タブレット・モバイル）
- 3枚同時表示の詳細設計
- 視覚効果・アニメーション仕様
- サイズ計算・レスポンシブ設定表

---

## 🎯 コンポーネント構成

### Atoms（基礎コンポーネント）- 6個

#### 1. Button（完全版）
**8バリアント:**
- `primary` - カートに追加、検索、ログイン
- `secondary` - 詳細を見る、キャンセル、ページネーション
- `outline` - 追跡、再注文、レシート
- `outline-danger` - 注文キャンセル、削除
- `ghost` - ドロップダウン内ボタン
- `link` - すべて見る、もっと見る
- `icon` - お気に入り、閉じるボタン
- `icon-filled` - 検索アイコンボタン

**4サイズ:** sm, md, lg, icon

**3状態:** disabled, loading, active

**詳細:** `BUTTON_VARIANTS.md`

#### 2. Badge
**4バリアント:**
- default - 通常バッジ
- new - NEW表示
- sale - SALE表示
- status - ステータス表示

**4色:** blue, red, green, orange

#### 3. Input
テキスト入力フィールド（label, error対応）

#### 4. Select
セレクトボックス（label, error対応）

#### 5. Icon
SVGアイコンラッパー

#### 6. QuantitySelector
数量選択コンポーネント（-/+ボタン、数値入力）

---

### Molecules（複合コンポーネント）- 9個

#### 1. ProductCard（統一版）
**使用箇所:** Home, MyPage, Favorites

**主要Props:**
```jsx
<ProductCard
  id="8027341"
  name="ボールペン 10本セット"
  code="802734"
  price={1200}
  image="/img/product/8027341_l1.jpg"

  // オプション
  badge={{ text: 'NEW', color: 'blue' }}
  salePrice={4990}
  stock="在庫あり"
  showFavorite={true}
  isFavorited={false}
  size="default"  // 'compact' | 'default' | 'large'
/>
```

**詳細:** `UNIFIED_COMPONENTS.md`

#### 2. OrderCard
注文カード（注文番号、ステータス、商品、合計）

#### 3. OrderItem
注文内商品アイテム

#### 4. CategoryCard
カテゴリーカード（アイコン、名前）

#### 5. NewsItem
新着情報アイテム（日付、タグ、タイトル）

#### 6. InfoField
情報表示フィールド（ラベル+値）

#### 7. CartItem
カート内商品アイテム（画像、名前、数量、価格、削除）

#### 8. CartSummary
カート合計表示（小計、送料、合計、購入ボタン）

#### 9. PasswordStrength
パスワード強度表示（進捗バー、強度テキスト）

---

### Organisms（複雑なコンポーネント）- 9個

#### 1. ProductGrid
商品グリッド表示（タイトル、すべて見る、グリッド）

#### 2. CategoryGrid
カテゴリーグリッド表示

#### 3. OrderList
注文リスト（フィルター、ページネーション付き）

#### 4. NewsList
新着情報リスト

#### 5. Pagination
ページネーション

#### 6. Header
ヘッダー（既存をリファクタ）

#### 7. Footer
フッター（既存をリファクタ）

#### 8. Sidebar
サイドバー（既存をリファクタ）

#### 9. HeroSlider
メインビジュアルスライダー（7枚、自動再生、ナビゲーション）

**詳細:** `SLIDER_COMPONENT_PLAN.md`

---

### Templates（レイアウト）- 2個

#### 1. PageLayout
基本ページレイアウト（Header + main + Footer）

#### 2. SidebarLayout
サイドバー付きレイアウト（Header + Sidebar + main + Footer）

---

## 🎨 スタイリング戦略

### ✅ Tailwind優先
- すべてのスタイルをTailwindユーティリティクラスで記述
- 独自CSS使用率 < 10%を目標
- `@apply`ディレクティブは使用しない

### ✅ 既存HTML活用
- HTMLの構造を可能な限り維持
- 既存のデザインパターンを踏襲

### ✅ レスポンシブ設計
```jsx
// グリッド
<Grid cols={{ base: 1, sm: 2, lg: 4 }} gap={6}>

// 表示切替
<div className="hidden lg:block">デスクトップ</div>
<div className="lg:hidden">モバイル</div>
```

---

## 📊 実装スケジュール

### Week 1: Atoms
- [x] 計画・設計完了
- [ ] Button コンポーネント実装
- [ ] Badge コンポーネント実装
- [ ] Input コンポーネント実装
- [ ] Select コンポーネント実装
- [ ] Icon コンポーネント実装
- [ ] QuantitySelector コンポーネント実装

### Week 2: Molecules
- [ ] ProductCard コンポーネント実装
- [ ] CategoryCard コンポーネント実装
- [ ] OrderCard コンポーネント実装
- [ ] OrderItem コンポーネント実装
- [ ] NewsItem コンポーネント実装
- [ ] InfoField コンポーネント実装
- [ ] CartItem コンポーネント実装
- [ ] CartSummary コンポーネント実装
- [ ] PasswordStrength コンポーネント実装

### Week 3: Organisms
- [ ] ProductGrid コンポーネント実装
- [ ] CategoryGrid コンポーネント実装
- [ ] OrderList コンポーネント実装
- [ ] NewsList コンポーネント実装
- [ ] Pagination コンポーネント実装
- [ ] HeroSlider コンポーネント実装（Swiper.js使用）
- [ ] Header リファクタリング
- [ ] Footer リファクタリング
- [ ] Sidebar リファクタリング

### Week 4: Templates & Pages
- [ ] PageLayout テンプレート実装
- [ ] SidebarLayout テンプレート実装
- [ ] Home ページリファクタリング（HeroSlider統合）
- [ ] MyPage ページリファクタリング
- [ ] OrderHistory ページリファクタリング
- [ ] Favorites ページリファクタリング
- [ ] Cart ページ実装
- [ ] Login ページ実装
- [ ] Signup ページ実装

### Week 5: ドキュメント & 仕上げ
- [ ] コンポーネントドキュメント作成
- [ ] 使用例・サンプルコード追加
- [ ] Storybook構築（オプション）
- [ ] パフォーマンス最適化
- [ ] アクセシビリティチェック

---

## 📈 期待される効果

### コード削減
- 重複コード: **80%以上削減**
- 独自CSS: **90%削減**（Tailwindへ移行）

### 保守性向上
- コンポーネントベース設計
- 変更が一箇所で完結
- 統一されたデザイン

### 開発効率向上
- 再利用可能なコンポーネント
- 新規ページ作成が高速化
- デザインの一貫性確保

### パフォーマンス
- バンドルサイズ削減
- 初期ロード時間改善

---

## 🚀 次のアクション

### 1. Atomsコンポーネント実装開始
```bash
cd react-app
mkdir -p src/components/atoms/{Button,Badge,Input,Select,Icon}
```

### 2. Button実装
```bash
# ファイル作成
touch src/components/atoms/Button/index.jsx

# 実装内容
- 8バリアント実装
- 4サイズ実装
- 3状態実装
- ローディングアニメーション
- アイコンサポート
```

### 3. コミット戦略
```bash
# フィーチャーブランチ作成
git checkout -b feature/design-system-atoms

# 各コンポーネント実装ごとにコミット
git commit -m "feat: Add Button component with 8 variants"
git commit -m "feat: Add Badge component with 4 variants"
...

# レビュー後にmainへマージ
git checkout main
git merge feature/design-system-atoms
```

---

## 📁 ファイル構成

```
react-app/
├── DESIGN_SYSTEM_PLAN.md          # 基本設計
├── CSS_TO_TAILWIND_MAPPING.md     # CSS→Tailwind変換
├── IMPLEMENTATION_STRATEGY.md     # 実装戦略（コード例）
├── UNIFIED_COMPONENTS.md          # 統一コンポーネント設計
├── BUTTON_VARIANTS.md             # ボタンバリエーション定義
├── ADDITIONAL_PAGES_PLAN.md       # 追加ページ計画（Cart/Login/Signup）
├── SLIDER_COMPONENT_PLAN.md       # スライダーコンポーネント計画（3枚表示）
├── SLIDER_VISUAL_SPEC.md          # スライダービジュアル仕様書
├── IMPLEMENTATION_REVIEW.md       # 実装計画レビュー
├── SSR_MIGRATION_PLAN.md          # SSR実装計画（Next.js移行）
├── PROGRESS.md                    # 実装進捗管理
├── RESPONSIVE_DESIGN_DETAILS.md   # レスポンシブ詳細設計
├── REQUIREMENTS_UPDATE.md         # 追加要件対応状況（全12要件）
└── DESIGN_SYSTEM_SUMMARY.md       # この総括（全体像）
```

**計画ドキュメント:** 13個完成 ✅

---

## ✅ 完了した作業

- [x] 既存コード分析
- [x] Atomic Design設計
- [x] CSS→Tailwindマッピング
- [x] 重複パターン統一設計
- [x] ボタンバリエーション定義
- [x] 追加ページ計画（Cart/Login/Signup）
- [x] スライダーコンポーネント計画（Swiper.js使用）
- [x] 実装計画レビュー（全体整合性チェック）
- [x] **SSR実装計画（Next.js 14 App Router採用）**
- [x] **実装進捗管理ドキュメント作成（PROGRESS.md）**
- [x] **レスポンシブ詳細設計（横6列、ヘッダー100%幅）**
- [x] **追加要件対応状況まとめ（REQUIREMENTS_UPDATE.md - 全12要件）**
- [x] **スライダー仕様変更（3枚同時表示・中央フォーカス・細め）**
- [x] **スライダービジュアル仕様書作成（SLIDER_VISUAL_SPEC.md）**
- [x] 全体計画書作成（**13ドキュメント完成**）

## ⏳ 次のステップ

### 1. Next.jsプロジェクトセットアップ（SSR対応）
```bash
cd /Users/ogawayuuki/Documents/htdocs/ec_Design
npx create-next-app@latest next-app --typescript --tailwind --app --src-dir --import-alias "@/*"
```

**オプション選択:**
- ✅ TypeScript
- ✅ ESLint
- ✅ Tailwind CSS
- ✅ `src/` directory
- ✅ App Router
- ✅ Import alias `@/*`

### 2. 必要パッケージのインストール
```bash
cd next-app
npm install swiper
npm install react-hook-form
npm install @heroicons/react
```

### 3. コンポーネント実装（Next.js環境）
- [ ] Atomsコンポーネント実装（Button, Input, Badge, Select, Icon, QuantitySelector）
- [ ] Moleculesコンポーネント実装（ProductCard（compactサイズ）, CartItem, CartSummary, PasswordStrength等）
- [ ] Organismsコンポーネント実装（ProductGrid（横6列）, HeroSlider, Header（横幅100%）, Footer等）
- [ ] Templatesコンポーネント実装（PageLayout, SidebarLayout）

### 4. ページ実装（App Router）
- [ ] Home実装（`src/app/page.tsx`）- HeroSlider統合、おすすめ商品6列
- [ ] MyPage実装（`src/app/mypage/page.tsx`）
- [ ] OrderHistory実装（`src/app/order-history/page.tsx`）
- [ ] Favorites実装（`src/app/favorites/page.tsx`）
- [ ] Cart実装（`src/app/cart/page.tsx`）
- [ ] Login実装（`src/app/login/page.tsx`）
- [ ] Signup実装（`src/app/signup/page.tsx`）

### 5. レスポンシブ対応確認
- [ ] モバイル（375px）表示確認
- [ ] タブレット（768px）表示確認
- [ ] デスクトップ（1280px）表示確認
- [ ] おすすめ商品グリッド6列確認
- [ ] ヘッダー横幅100%確認

### 6. 進捗管理
- [ ] PROGRESS.mdを週次更新
- [ ] コンポーネント実装完了時にチェック
- [ ] 品質指標測定（Lighthouse）

---

**すべての計画が完成しました（13ドキュメント）。実装を開始する準備が整っています。** 🎉

## 📋 重要な実装要件まとめ

### ✅ SSR対応
- Next.js 14 (App Router)で実装
- Server Componentsでデータ取得
- SEO・OGP対応

### ✅ レスポンシブデザイン
- **おすすめ商品: デスクトップで横6列**（compactサイズ）
- 通常商品: デスクトップで横4列
- **ヘッダー: 横幅100%、sticky固定**
- モバイル・タブレット・デスクトップ完全対応

### ✅ スライダー（HeroSlider）
- **縦幅細め: 250px-400px**（レスポンシブ）
- **デスクトップ: 3枚同時表示**（slidesPerView: 2.2）
- **中央の画像: フル表示**（100%）
- **左右の画像: 半分見切れ**（約40%見切れ）
- 中央スライドを拡大・強調（scale: 1.05）
- 左右スライドを暗め表示（opacity: 0.7）

### ✅ コンポーネント共通化
- ヘッダー・フッターは`src/app/layout.tsx`で共通化
- 全ページで統一されたレイアウト

### ✅ 進捗管理
- PROGRESS.mdで実装状況を可視化
- 週次で進捗更新

**コンポーネント総数: Atoms 6個 + Molecules 9個 + Organisms 9個 + Templates 2個 = 26コンポーネント**
**追加要件: 全12項目対応完了**
