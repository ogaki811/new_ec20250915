# 開発ガイドライン

**プロジェクト**: Orchestra Design System / Maestro Headless Commerce
**作成日**: 2025-10-09
**最終更新**: 2025-10-09 - 複数商流・複数EC対応のコンセプトと要件定義プロセス確立

---

## 🎯 プロジェクトビジョン

**Orchestra Design Systemは、複数の商流・複数のECサイトで利用されることを前提に設計されています。**

### マルチテナント・マルチブランド対応

このデザインシステムは、以下のような多様なユースケースに対応します:

- **複数の商流**: BtoC、BtoB、CtoC など異なるビジネスモデル
- **複数のブランド**: 異なるブランドアイデンティティを持つECサイト
- **複数のテーマ**: カスタマイズ可能なデザイントークン
- **スケーラビリティ**: 小規模から大規模まで対応可能

### 設計思想

1. **高い汎用性**: 特定のブランドに依存しない汎用的なコンポーネント
2. **柔軟なカスタマイズ**: テーマとデザイントークンによる容易なブランディング
3. **一貫性の維持**: すべてのECサイトで統一されたUX体験
4. **保守性**: 一箇所の変更がすべてのECサイトに反映される効率的な運用

---

## 🚨 絶対遵守事項

### このプロジェクトで開発を行う全メンバーが守るべき3つの鉄則

#### 1. 要件定義なしの開発着手は絶対禁止

- **どんな小さな機能、バグ修正でも必ず要件定義書を作成する**
- 要件定義書は `docs/requirements/` に必ず保存する
- 要件変更時は既存ファイルを上書きせず、新リビジョンを作成し変更内容を追記する
- 要件定義書がないコードはレビューで即却下

#### 2. アトミックデザインの原則を厳守

- **すべてのコンポーネントは Atoms / Molecules / Organisms / Templates / Pages のいずれかに分類する**
- 依存関係のルールを守る（Molecules は Atoms のみ、Organisms は Molecules/Atoms を使用可能）
- 分類に迷ったら必ずチームメンバーに相談する
- 間違った階層のコンポーネントはリファクタリング対象

#### 3. ドキュメントの継続的更新

- **コードを書いたら、必ずドキュメントを更新する**
- 変更履歴は必ず記録する
- ドキュメントなしのコードは未完成と見なす
- Storybook Story の作成も必須

---

## 目次

1. [開発フロー](#開発フロー)
2. [要件定義](#要件定義)
3. [アトミックデザイン原則](#アトミックデザイン原則)
4. [コンポーネント設計](#コンポーネント設計)
5. [コーディング規約](#コーディング規約)
6. [ドキュメント管理](#ドキュメント管理)
7. [クイックリファレンス](#クイックリファレンス)

---

## 開発フロー

### 基本原則

**⚠️ すべての開発作業は、必ず要件定義から開始する**

```
要件定義書作成（必須・最優先）
    ↓
設計 → 実装 → テスト → レビュー → デプロイ
    ↓
ドキュメント更新（必須）
```

**重要**:
- 要件定義書がない開発作業は一切認められません
- 要件が変更された場合は、必ず変更内容を追記してください
- すべてのコンポーネントはアトミックデザインの原則に従って設計してください

### ステップ

1. **要件定義書の作成** (必須・最優先)
2. **設計ドキュメントの作成**
3. **アトミックデザイン分類の決定**
4. **実装**
5. **テスト**
6. **コードレビュー**
7. **ドキュメント更新**

---

## 要件定義

### 1. 要件定義の必須化

**🚫 絶対ルール**:
- **機能追加、変更、バグ修正を問わず、すべての開発作業には要件定義書が必要**
- **要件定義書なしでの開発着手は絶対禁止**
- どんなに小さな変更でも例外なく要件定義書を作成する
- 要件定義書がないPull Requestは即座に却下される

### 2. 要件定義書の作成場所

```
docs/requirements/
├── YYYY-MM-DD_機能名.md          # 新規要件
├── YYYY-MM-DD_機能名_rev01.md    # 要件変更1回目
└── YYYY-MM-DD_機能名_rev02.md    # 要件変更2回目
```

### 3. 要件定義書テンプレート

```markdown
# 要件定義書: [機能名]

**作成日**: YYYY-MM-DD
**担当者**: [名前]
**ステータス**: 要件定義中 / 承認待ち / 承認済み / 実装中 / 完了
**リビジョン**: 1.0

---

## 1. 概要

### 背景・目的
[この機能が必要な理由と目的を記載]

### スコープ
- 対象範囲: [何を含むか]
- 対象外: [何を含まないか]

---

## 2. 機能要件

### 2.1 機能一覧
1. [機能1]
2. [機能2]
3. [機能3]

### 2.2 詳細仕様

#### 機能1: [名称]
- **説明**: [機能の詳細説明]
- **入力**: [必要な入力]
- **出力**: [期待される出力]
- **バリデーション**: [入力チェック内容]
- **エラーハンドリング**: [エラー時の動作]

---

## 3. 非機能要件

### 3.1 パフォーマンス
- レスポンスタイム: [目標値]
- 同時アクセス数: [想定値]

### 3.2 アクセシビリティ
- WCAG準拠レベル: [AA / AAA]
- キーボード操作: [対応 / 非対応]
- スクリーンリーダー: [対応 / 非対応]

### 3.3 セキュリティ
- 認証: [必要 / 不要]
- 入力サニタイゼーション: [対応方法]

---

## 4. UI/UX要件

### 4.1 画面設計
[ワイヤーフレームまたはモックアップのリンク]

### 4.2 インタラクション
- ユーザー操作フロー
- エラー表示方法
- 成功時のフィードバック

---

## 5. 技術要件

### 5.1 使用技術
- フレームワーク: [React, Next.js, etc.]
- ライブラリ: [必要なライブラリ]
- API: [使用するAPI]

### 5.2 アトミックデザイン分類
- **階層**: Atoms / Molecules / Organisms / Templates / Pages
- **依存コンポーネント**: [使用する既存コンポーネント]

### 5.3 状態管理
- グローバル状態: [Zustand store名]
- ローカル状態: [useState使用箇所]

---

## 6. 受け入れ基準

### 6.1 機能的受け入れ基準
- [ ] 機能1が正常に動作する
- [ ] 機能2が正常に動作する
- [ ] エラーハンドリングが適切

### 6.2 非機能的受け入れ基準
- [ ] パフォーマンス基準を満たす
- [ ] アクセシビリティ基準を満たす
- [ ] レスポンシブ対応完了

### 6.3 品質基準
- [ ] TypeScriptエラーなし
- [ ] ESLint警告なし
- [ ] Storybook Storyが作成されている
- [ ] ユニットテストが作成されている

---

## 7. 制約事項

### 7.1 技術的制約
[技術的な制約や制限事項]

### 7.2 スケジュール制約
- 開始予定: YYYY-MM-DD
- 完了予定: YYYY-MM-DD

### 7.3 リソース制約
[人的リソースや予算の制約]

---

## 8. リスクと対応策

| リスク | 影響度 | 発生確率 | 対応策 |
|--------|--------|----------|--------|
| [リスク1] | 高/中/低 | 高/中/低 | [対応内容] |

---

## 9. 変更履歴

| 日付 | バージョン | 変更内容 | 担当者 |
|------|-----------|----------|--------|
| YYYY-MM-DD | 1.0 | 初版作成 | [名前] |

---

## 10. 承認

| 役割 | 名前 | 承認日 | サイン |
|------|------|--------|--------|
| 要件定義者 | | | |
| レビュアー | | | |
| 承認者 | | | |
```

### 4. 要件変更時の対応

**⚠️ 要件変更が発生した場合の必須手順**:

1. **既存の要件定義書は絶対に削除・上書きしない** (履歴保持のため)
2. **新しいリビジョンの要件定義書を作成**
   - ファイル名: `YYYY-MM-DD_機能名_rev0X.md`
   - リビジョン番号を必ずインクリメント
3. **変更履歴セクションに変更内容を詳細に記載**
   - 何を変更したのか
   - なぜ変更したのか（変更理由）
   - いつ変更したのか
4. **変更の影響範囲を明記**
5. **関連する他のドキュメントも更新**

**重要**: 要件変更は必ず追記で管理し、過去の履歴を保持してください。

#### 変更履歴の記載例

```markdown
## 9. 変更履歴

| 日付 | バージョン | 変更内容 | 変更理由 | 担当者 |
|------|-----------|----------|----------|--------|
| 2025-10-09 | 1.0 | 初版作成 | - | 山田 |
| 2025-10-12 | 1.1 | バリデーションロジック変更 | ユーザーフィードバックによる改善 | 山田 |
| 2025-10-15 | 2.0 | UI設計全面変更 | デザインレビュー結果を反映 | 佐藤 |
```

---

## アトミックデザイン原則

### 概要

**🎯 Orchestra Design Systemは、Brad Frostのアトミックデザイン手法を厳密に適用します。**

**重要**: すべてのコンポーネントは必ずアトミックデザインの階層に従って分類され、実装されなければなりません。

```
Atoms (原子) - 最小単位、依存なし
  ↓ 組み合わせ
Molecules (分子) - Atomsのみを使用
  ↓ 組み合わせ
Organisms (有機体) - Molecules/Atomsを使用、ビジネスロジック含む
  ↓ 組み合わせ
Templates (テンプレート) - レイアウト構造、データなし
  ↓ データ注入
Pages (ページ) - 完成ページ、データ取得
```

**⚠️ 依存関係ルールの厳守**:
- Atoms: 他のコンポーネントに依存しない
- Molecules: Atomsのみに依存可能
- Organisms: Molecules と Atoms に依存可能
- Templates: Organisms、Molecules、Atoms に依存可能
- Pages: すべてのコンポーネントに依存可能

このルールを破ったコンポーネントは即座にリファクタリング対象となります。

### 1. Atoms (基本要素)

**定義**: 最小単位のコンポーネント。他のコンポーネントに依存しない。

#### 特徴
- **単一責任**: 1つの明確な役割のみを持つ
- **依存なし**: 他のカスタムコンポーネントに依存しない
- **再利用性**: 高い汎用性を持つ
- **状態**: 基本的にステートレス (props駆動)

#### 例
```typescript
// ✅ 良い例: Atom
// components/ui/Button.tsx
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

export default function Button({ children, variant, onClick }: ButtonProps) {
  return (
    <button
      className={`btn btn--${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

#### Atomsの配置場所
```
src/components/ui/
├── Button.tsx          # ボタン
├── Input.tsx           # 入力フィールド
├── Checkbox.tsx        # チェックボックス
├── Badge.tsx           # バッジ
└── LoadingSpinner.tsx  # ローディング
```

---

### 2. Molecules (複合要素)

**定義**: 複数のAtomsを組み合わせた小さな機能単位。

#### 特徴
- **Atomsのみに依存**: 他のMoleculesやOrganismsに依存しない
- **単一機能**: 1つの明確な機能を提供
- **再利用可能**: 複数の場所で使用可能

#### 依存関係ルール
```
Molecule
  └── Atoms のみ使用可能
      ❌ 他のMolecules
      ❌ Organisms
```

#### 例
```typescript
// ✅ 良い例: Molecule
// components/common/SearchBox.tsx
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
  const [query, setQuery] = useState('');

  return (
    <div className="search-box">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="検索"
      />
      <Button onClick={() => onSearch(query)}>
        検索
      </Button>
    </div>
  );
}
```

#### Moleculesの配置場所
```
src/components/common/
├── Breadcrumb.tsx      # パンくずリスト
├── Pagination.tsx      # ページネーション
├── FilterTag.tsx       # フィルタータグ
└── SearchBox.tsx       # 検索ボックス
```

---

### 3. Organisms (有機体)

**定義**: Molecules、Atoms、ビジネスロジックを組み合わせた複雑なコンポーネント。

#### 特徴
- **複雑な機能**: 複数の機能を統合
- **ビジネスロジック**: 状態管理やAPI呼び出しを含む
- **特定のコンテキスト**: 特定の用途に特化

#### 依存関係ルール
```
Organism
  ├── Atoms 使用可能
  ├── Molecules 使用可能
  └── 他のOrganisms 使用可能（慎重に）
```

#### 例
```typescript
// ✅ 良い例: Organism
// components/product/ProductCard.tsx
import Image from 'next/image';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import PriceDisplay from '@/components/ui/PriceDisplay';
import Rating from '@/components/ui/Rating';
import useCartStore from '@/store/useCartStore';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();

  return (
    <div className="product-card">
      <Image src={product.image} alt={product.name} />
      {product.isNew && <Badge variant="primary">新商品</Badge>}

      <h3>{product.name}</h3>
      <Rating value={product.rating} />
      <PriceDisplay
        price={product.price}
        originalPrice={product.originalPrice}
      />

      <Button onClick={() => addItem(product)}>
        カートに追加
      </Button>
    </div>
  );
}
```

#### Organismsの配置場所
```
src/components/
├── layout/
│   ├── Header.tsx          # ヘッダー
│   └── Footer.tsx          # フッター
├── product/
│   ├── ProductCard.tsx     # 商品カード
│   ├── ProductGrid.tsx     # 商品グリッド
│   └── ProductListItem.tsx # 商品リスト項目
├── cart/
│   └── CartItem.tsx        # カート商品
└── checkout/
    └── CheckoutForm.tsx    # チェックアウトフォーム
```

---

### 4. Templates (テンプレート)

**定義**: ページのレイアウト構造。データは含まない。

#### 特徴
- **レイアウトのみ**: 構造とレイアウトを定義
- **データなし**: propsでデータスロットを提供
- **再利用可能**: 複数のページで使用可能

#### 例
```typescript
// ✅ 良い例: Template
// components/templates/ProductListTemplate.tsx
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/common/Breadcrumb';
import SearchFilters from '@/components/search/SearchFilters';
import ProductGrid from '@/components/product/ProductGrid';

interface ProductListTemplateProps {
  breadcrumbs: BreadcrumbItem[];
  filters: ReactNode;
  products: ReactNode;
  pagination: ReactNode;
}

export default function ProductListTemplate({
  breadcrumbs,
  filters,
  products,
  pagination
}: ProductListTemplateProps) {
  return (
    <div className="product-list-template">
      <Header />
      <main>
        <Breadcrumb items={breadcrumbs} />
        <div className="content">
          <aside className="filters">{filters}</aside>
          <section className="products">
            {products}
            {pagination}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
```

---

### 5. Pages (ページ)

**定義**: Templatesにデータを注入した完成ページ。

#### 特徴
- **データ取得**: APIからデータをfetch
- **状態管理**: グローバル状態を使用
- **ルーティング**: Next.js App Routerのページファイル

#### 例
```typescript
// ✅ 良い例: Page
// app/products/page.tsx
'use client';

import { useState, useEffect } from 'react';
import ProductListTemplate from '@/components/templates/ProductListTemplate';
import ProductCard from '@/components/product/ProductCard';
import SearchFilters from '@/components/search/SearchFilters';
import Pagination from '@/components/common/Pagination';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});

  // データ取得
  useEffect(() => {
    fetchProducts(filters).then(setProducts);
  }, [filters]);

  return (
    <ProductListTemplate
      breadcrumbs={[
        { label: 'ホーム', href: '/' },
        { label: '商品一覧', href: '/products' }
      ]}
      filters={
        <SearchFilters
          filters={filters}
          onChange={setFilters}
        />
      }
      products={
        <div className="grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      }
      pagination={<Pagination page={1} total={10} />}
    />
  );
}
```

---

## コンポーネント設計

### 1. コンポーネント作成チェックリスト

新しいコンポーネントを作成する際の必須チェック項目:

- [ ] **要件定義書が存在する**
- [ ] **アトミックデザインの階層が決定されている**
- [ ] **依存関係が適切** (上位階層のコンポーネントに依存していない)
- [ ] **TypeScriptで型定義されている**
- [ ] **Propsインターフェースが定義されている**
- [ ] **BEM命名規則に従っている**
- [ ] **アクセシビリティ対応済み** (ARIA属性、キーボード操作)
- [ ] **Storybook Storyが作成されている**
- [ ] **ドキュメントが更新されている**

### 2. ファイル構成

```typescript
// components/ui/Button.tsx

// 1. Import
import { ReactNode } from 'react';

// 2. 型定義
interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: () => void;
}

// 3. コンポーネント
export default function Button({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick
}: ButtonProps) {
  return (
    <button
      className={`ec-button ec-button--${variant} ec-button--${size}`}
      disabled={disabled}
      onClick={onClick}
      aria-label={typeof children === 'string' ? children : undefined}
    >
      {children}
    </button>
  );
}
```

### 3. 命名規則

#### BEM (Block Element Modifier)

```css
/* Block */
.ec-button { }

/* Element */
.ec-button__icon { }

/* Modifier */
.ec-button--primary { }
.ec-button--large { }
```

#### TypeScript

```typescript
// コンポーネント名: PascalCase
export default function ProductCard() {}

// Props型: コンポーネント名 + Props
interface ProductCardProps {}

// 関数名: camelCase
const handleClick = () => {}

// 定数: UPPER_SNAKE_CASE
const MAX_ITEMS = 10;
```

---

## コーディング規約

### 1. TypeScript

```typescript
// ✅ 良い例: 明示的な型定義
interface User {
  id: string;
  name: string;
  email: string;
}

function getUser(id: string): Promise<User> {
  return fetch(`/api/users/${id}`).then(res => res.json());
}

// ❌ 悪い例: any型の使用
function getUser(id: any): any {
  return fetch(`/api/users/${id}`).then(res => res.json());
}
```

### 2. React Hooks

```typescript
// ✅ 良い例: カスタムフックの分離
function useProductSearch() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const search = async (query: string) => {
    setLoading(true);
    const results = await fetchProducts(query);
    setProducts(results);
    setLoading(false);
  };

  return { products, loading, search };
}

// コンポーネントで使用
function ProductList() {
  const { products, loading, search } = useProductSearch();
  // ...
}
```

### 3. 状態管理 (Zustand)

```typescript
// store/useCartStore.ts
import { create } from 'zustand';

interface CartState {
  items: CartItem[];
  addItem: (item: Product) => void;
  removeItem: (id: string) => void;
}

const useCartStore = create<CartState>((set) => ({
  items: [],

  addItem: (product) => set((state) => ({
    items: [...state.items, { ...product, quantity: 1 }]
  })),

  removeItem: (id) => set((state) => ({
    items: state.items.filter(item => item.id !== id)
  }))
}));
```

---

## ドキュメント管理

### 1. 必須ドキュメント

すべての機能開発には以下のドキュメントが必要:

1. **要件定義書** (`docs/requirements/`)
2. **設計書** (必要に応じて `docs/design/`)
3. **Storybook Story** (`storybook/stories/`)
4. **README更新** (該当する場合)

### 2. ドキュメント配置

```
docs/
├── requirements/                  # 要件定義書
│   ├── 2025-10-09_商品検索機能.md
│   └── 2025-10-09_商品検索機能_rev01.md
│
├── design/                        # 設計書
│   ├── architecture/              # アーキテクチャ設計
│   ├── database/                  # DB設計
│   └── api/                       # API設計
│
├── guidelines/                    # ガイドライン
│   ├── DEVELOPMENT_GUIDELINES.md  # 本ドキュメント
│   ├── CODING_STANDARDS.md        # コーディング規約
│   └── ACCESSIBILITY.md           # アクセシビリティ
│
└── references/                    # 参考資料
    └── atomic-design.md           # アトミックデザイン
```

### 3. ドキュメント更新タイミング

| タイミング | 更新対象 |
|-----------|----------|
| 要件変更時 | 要件定義書 (新リビジョン作成) |
| 設計変更時 | 設計書 |
| コンポーネント追加時 | README、Storybook |
| API変更時 | API設計書、README |
| リリース時 | CHANGELOG |

---

## まとめ

### 開発の基本原則

1. **要件定義ファースト**: すべての開発は要件定義から
2. **ドキュメント駆動**: ドキュメントなしの開発は禁止
3. **アトミックデザイン厳守**: 依存関係ルールを守る
4. **型安全性**: TypeScriptの型を活用
5. **アクセシビリティ**: WCAG 2.1 Level AA準拠

### チェックリスト

開発開始前:
- [ ] 要件定義書を作成した
- [ ] アトミックデザインの階層を決定した
- [ ] 依存コンポーネントを確認した

開発中:
- [ ] TypeScript型定義を行った
- [ ] BEM命名規則に従った
- [ ] アクセシビリティ対応を実施した

開発完了時:
- [ ] Storybook Storyを作成した
- [ ] ドキュメントを更新した
- [ ] コードレビューを受けた

---

## クイックリファレンス

### 開発開始前の必須チェックリスト

```
□ 要件定義書を作成した (`docs/requirements/YYYY-MM-DD_機能名.md`)
□ アトミックデザインの階層を決定した (Atoms/Molecules/Organisms/Templates/Pages)
□ 依存コンポーネントを確認した
□ 依存関係ルールに違反していないことを確認した
```

### コンポーネント階層の判断フローチャート

```
質問1: 他のコンポーネントに依存しますか?
  NO  → Atoms
  YES → 質問2へ

質問2: Atomsのみに依存しますか?
  YES → Molecules
  NO  → 質問3へ

質問3: ビジネスロジックを持ちますか?
  YES → Organisms
  NO  → Templates
```

### 要件変更時の手順

```
1. 既存の要件定義書を保持（削除・上書き禁止）
2. 新しいリビジョンを作成
   ファイル名: YYYY-MM-DD_機能名_rev0X.md
3. 変更履歴セクションに以下を記載:
   - 変更内容（何を変更したか）
   - 変更理由（なぜ変更したか）
   - 変更日時
   - 変更者
4. 影響範囲を明記
5. 関連ドキュメントを更新
```

### 依存関係ルール早見表

| 階層 | 依存可能なコンポーネント | ビジネスロジック | 状態管理 |
|------|----------------------|--------------|---------|
| Atoms | なし | なし | 基本的にステートレス |
| Molecules | Atoms のみ | なし | ローカル状態のみ |
| Organisms | Molecules, Atoms | あり | Zustand使用可 |
| Templates | Organisms, Molecules, Atoms | なし | props経由 |
| Pages | すべて | あり | Zustand使用可 |

### ファイル配置早見表

```
smartsample-nextjs/src/
├── components/
│   ├── ui/              # Atoms
│   ├── common/          # Molecules
│   ├── layout/          # Organisms (レイアウト)
│   ├── product/         # Organisms (商品関連)
│   ├── cart/            # Organisms (カート関連)
│   └── checkout/        # Organisms (チェックアウト関連)
└── app/                 # Pages (Next.js App Router)

storybook/stories/
├── atoms/               # Atoms Stories
├── molecules/           # Molecules Stories
├── organisms/           # Organisms Stories
└── templates/           # Templates Stories
```

### Pull Request チェックリスト

```
□ 要件定義書が存在する
□ TypeScriptエラー 0件
□ ESLint警告 0件
□ アトミックデザインの階層が適切
□ 依存関係ルールを遵守
□ Storybook Story を作成
□ ドキュメントを更新
□ アクセシビリティ対応済み
□ コードレビュー済み
```

---

**このガイドラインは、すべてのプロジェクトメンバーが遵守する必要があります。**

質問や提案がある場合は、プロジェクトリーダーに相談してください。
