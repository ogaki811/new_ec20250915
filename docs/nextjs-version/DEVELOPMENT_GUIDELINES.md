# 開発ガイドライン

**プロジェクト**: smartsample Next.js ECサイト
**作成日**: 2025年10月7日
**最終更新**: 2025年10月7日
**バージョン**: 1.0

---

## 目次

1. [基本方針](#基本方針)
2. [要件定義プロセス](#要件定義プロセス)
3. [アトミックデザインの適用](#アトミックデザインの適用)
4. [開発フロー](#開発フロー)
5. [ドキュメント管理](#ドキュメント管理)
6. [コンポーネント設計](#コンポーネント設計)
7. [品質保証](#品質保証)

---

## 基本方針

### 絶対遵守事項

#### 1. 要件定義の必須化

**原則**: すべての開発作業の前に要件定義を行い、ドキュメント化する

```
開発作業 = 要件定義 → ドキュメント作成 → 実装 → レビュー
```

**禁止事項**:
- ❌ 要件定義なしでの実装着手
- ❌ 口頭での要件共有のみ
- ❌ ドキュメント化の省略

**必須事項**:
- ✅ 要件定義書の作成（`docs/requirements/`）
- ✅ 変更履歴の記録
- ✅ レビュー承認プロセスの実施

---

#### 2. アトミックデザインの適用

**原則**: すべてのコンポーネント開発はアトミックデザインの概念に基づく

```
Atoms（原子）→ Molecules（分子）→ Organisms（有機体）→ Templates → Pages
```

**設計原則**:
- コンポーネントの階層分類を明確にする
- 下位層の完成後に上位層を構築する
- 依存関係を意識した設計を行う

---

#### 3. ドキュメントファースト

**原則**: コードよりも先にドキュメントを書く

```
要件定義書 → 設計書 → 実装 → テスト → レビュー
```

---

## 要件定義プロセス

### Step 1: 要件定義書の作成

#### 必須項目

すべての開発タスクについて、以下の項目を含む要件定義書を作成する：

```markdown
# [機能名] 要件定義書

## 1. 概要
- 機能の目的
- ビジネス価値
- 対象ユーザー

## 2. 背景・課題
- なぜこの機能が必要か
- 解決したい課題

## 3. 機能要件
- 必須機能（Must Have）
- 推奨機能（Should Have）
- 任意機能（Nice to Have）

## 4. 非機能要件
- パフォーマンス要件
- セキュリティ要件
- アクセシビリティ要件

## 5. アトミックデザイン階層
- 該当階層（Atoms/Molecules/Organisms/Templates/Pages）
- 依存コンポーネント
- 構成要素

## 6. 受入基準
- [ ] 受入条件1
- [ ] 受入条件2
- [ ] 受入条件3

## 7. スケジュール
- 要件定義: YYYY-MM-DD
- 設計: YYYY-MM-DD
- 実装: YYYY-MM-DD
- テスト: YYYY-MM-DD
- レビュー: YYYY-MM-DD

## 8. 変更履歴
| 日付 | バージョン | 変更内容 | 変更者 |
|------|-----------|---------|--------|
| YYYY-MM-DD | 1.0 | 初版作成 | 氏名 |
```

---

### Step 2: 要件のレビューと承認

#### レビュープロセス

1. **要件定義書作成**
   - 担当者が要件定義書を作成
   - `docs/requirements/[機能名]_REQUIREMENTS.md` に保存

2. **レビュー依頼**
   - プルリクエストを作成
   - レビュアーをアサイン

3. **レビュー実施**
   - 要件の明確性を確認
   - 受入基準の妥当性を確認
   - アトミックデザイン階層の適切性を確認

4. **承認**
   - レビュー承認後、実装着手可能

---

### Step 3: 要件変更管理

#### 要件変更時のプロセス

**原則**: すべての要件変更は文書化し、変更履歴に記録する

#### 変更手順

1. **変更内容の明確化**
   ```markdown
   ## 変更内容
   - 変更前: [説明]
   - 変更後: [説明]
   - 理由: [説明]
   - 影響範囲: [説明]
   ```

2. **要件定義書の更新**
   - 変更箇所を修正
   - バージョン番号を更新（例: 1.0 → 1.1）
   - 変更履歴セクションに追記

   ```markdown
   ## 変更履歴
   | 日付 | バージョン | 変更内容 | 変更者 |
   |------|-----------|---------|--------|
   | 2025-10-07 | 1.0 | 初版作成 | 山田太郎 |
   | 2025-10-10 | 1.1 | ボタンサイズを3種類から4種類に変更 | 山田太郎 |
   ```

3. **影響分析**
   - 依存コンポーネントへの影響を確認
   - テストケースの更新必要性を確認
   - ドキュメントの更新必要性を確認

4. **再レビュー**
   - 変更内容をレビュー
   - 承認後、実装に反映

---

## アトミックデザインの適用

### 階層分類の原則

#### Atoms（原子）- `src/components/ui/`

**定義**: 最小単位のUIコンポーネント、これ以上分割できない基本要素

**特徴**:
- ✅ 他のコンポーネントに依存しない
- ✅ 単一責任
- ✅ 高い再利用性
- ✅ Props駆動

**例**:
- Button, Input, Select, Checkbox, Radio
- Badge, Icon, Divider, Loading

**実装要件**:
```typescript
// ✅ 良い例: 依存なし、Props駆動
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

// ❌ 悪い例: 状態管理に依存
const Button = () => {
  const cart = useCartStore(); // Atomsでは禁止
  // ...
}
```

---

#### Molecules（分子）- `src/components/common/`

**定義**: 2-3個のAtomsを組み合わせた小さな機能単位

**特徴**:
- ✅ Atomsのみに依存
- ✅ 特定の機能を持つ
- ✅ 再利用可能
- ❌ 状態管理（Zustand）には依存しない

**例**:
- Breadcrumb (Link + Text)
- Pagination (Button + Text)
- StepIndicator (Badge + Line + Text)
- Modal (Card + Button + Overlay)

**実装要件**:
```typescript
// ✅ 良い例: Atomsの組み合わせ
const Pagination = ({ currentPage, totalPages }) => (
  <div>
    <Button>前へ</Button> {/* Atoms */}
    <span>{currentPage} / {totalPages}</span>
    <Button>次へ</Button> {/* Atoms */}
  </div>
);

// ❌ 悪い例: 状態管理に依存
const Pagination = () => {
  const items = useCartStore(); // Moleculesでは避ける
  // ...
}
```

---

#### Organisms（有機体）- `src/components/[domain]/`

**定義**: Atoms + Molecules + 状態管理を組み合わせた複雑な機能ブロック

**特徴**:
- ✅ Atoms + Molecules に依存
- ✅ 状態管理（Zustand）に依存可
- ✅ ビジネスロジックを含む
- ✅ 4個以上のコンポーネント組み合わせ

**配置**:
- `src/components/layout/` - Header, Footer等
- `src/components/product/` - ProductCard, ProductGrid等
- `src/components/cart/` - CartItem, CartSummary等

**例**:
- ProductCard (Badge + Button + QuantitySelector + useCartStore)
- Header (SearchBar + Navigation + useCartStore)
- CartItem (Image + QuantitySelector + Button + useCartStore)

**実装要件**:
```typescript
// ✅ 良い例: Atoms + Molecules + Store
const ProductCard = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem); // OK
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite); // OK

  return (
    <div>
      <Badge>{product.tag}</Badge> {/* Atoms */}
      <h3>{product.name}</h3>
      <QuantitySelector /> {/* Molecules */}
      <Button onClick={() => addItem(product)}>カートに追加</Button> {/* Atoms */}
    </div>
  );
};
```

---

### 階層判断フローチャート

新しいコンポーネントを作成する際の判断フロー：

```
START
  │
  ├─ 他のコンポーネントに依存しない？
  │   YES → Atoms (src/components/ui/)
  │   NO  → 次へ
  │
  ├─ 依存するのはAtomsのみ？
  │   YES → Molecules (src/components/common/)
  │   NO  → 次へ
  │
  ├─ 状態管理（Zustand）に依存する？
  │   YES → Organisms (src/components/[domain]/)
  │   NO  → 次へ
  │
  ├─ 4個以上のコンポーネントを組み合わせる？
  │   YES → Organisms (src/components/[domain]/)
  │   NO  → Molecules (src/components/common/)
  │
END
```

---

### 階層判断基準表

| 基準 | Atoms | Molecules | Organisms |
|------|-------|-----------|-----------|
| **依存関係** | なし | Atomsのみ | Atoms + Molecules + Store |
| **構成要素数** | 1 | 2-3 | 4+ |
| **ビジネスロジック** | なし | 最小限 | あり |
| **状態管理** | なし | ローカルのみ | グローバル可 |
| **再利用性** | 最大 | 高 | 中～低 |
| **配置ディレクトリ** | `ui/` | `common/` | `[domain]/` |

---

## 開発フロー

### 標準開発フロー（必須）

```
1. 要件定義
   ↓
2. 要件定義書作成（docs/requirements/）
   ↓
3. レビュー・承認
   ↓
4. アトミックデザイン階層の決定
   ↓
5. 依存コンポーネントの確認（下位層が完成しているか）
   ↓
6. 設計書作成（必要に応じて）
   ↓
7. 実装
   ↓
8. テスト
   ↓
9. ドキュメント更新
   ↓
10. レビュー・承認
   ↓
11. マージ
```

---

### Phase別開発フロー

#### Phase開始前

- [ ] Phase要件定義書の作成
- [ ] Phase完了基準の明確化
- [ ] 前Phaseの完了確認（上位層の場合）

#### Phase実行中

- [ ] 各コンポーネントの要件定義書作成
- [ ] アトミックデザイン階層の確認
- [ ] 依存関係の確認
- [ ] 実装
- [ ] テスト
- [ ] ドキュメント更新

#### Phase完了時

- [ ] Phase完了チェックリストの確認
- [ ] ドキュメントの整合性確認
- [ ] レビュー実施
- [ ] 次Phaseへの進行判断

---

## ドキュメント管理

### ドキュメント配置ルール

#### 基本原則

すべてのドキュメントは `docs/` ディレクトリ配下に配置する

```
docs/
├── requirements/           # 要件定義書
│   ├── [機能名]_REQUIREMENTS.md
│   └── [Phase名]_REQUIREMENTS.md
│
├── design/                # 設計書
│   ├── DESIGN_SYSTEM.md  # デザインシステム全体
│   └── [機能名]_DESIGN.md
│
├── storybook/            # Storybook関連
│   ├── STORYBOOK_IMPLEMENTATION_PLAN.md
│   └── COMPONENT_PRIORITY_MATRIX.md
│
├── guidelines/           # ガイドライン
│   └── DEVELOPMENT_GUIDELINES.md  # 本ドキュメント
│
└── reports/             # 完了報告書
    ├── PHASE1_COMPLETION_REPORT.md
    └── [Phase名]_COMPLETION_REPORT.md
```

---

### ドキュメント種別と必須項目

#### 1. 要件定義書（REQUIREMENTS.md）

**必須項目**:
- 概要
- 背景・課題
- 機能要件（Must/Should/Nice to Have）
- 非機能要件
- アトミックデザイン階層
- 受入基準
- スケジュール
- 変更履歴

**テンプレート**: `docs/templates/REQUIREMENTS_TEMPLATE.md`

---

#### 2. 設計書（DESIGN.md）

**必須項目**:
- コンポーネント構成
- Props定義
- 状態管理
- 依存関係
- スタイリング方針

**テンプレート**: `docs/templates/DESIGN_TEMPLATE.md`

---

#### 3. 完了報告書（COMPLETION_REPORT.md）

**必須項目**:
- 実装内容
- 達成した要件
- 未達成の要件（理由含む）
- 次Phaseへの引継ぎ事項

**テンプレート**: `docs/templates/COMPLETION_REPORT_TEMPLATE.md`

---

### ドキュメントバージョン管理

#### バージョニングルール

**セマンティックバージョニング**: `MAJOR.MINOR.PATCH`

- **MAJOR**: 大幅な要件変更、破壊的変更
- **MINOR**: 機能追加、非破壊的変更
- **PATCH**: 軽微な修正、誤字脱字

**例**:
- 1.0 → 初版
- 1.1 → 機能追加
- 1.1.1 → 誤字修正
- 2.0 → 大幅な要件変更

---

#### 変更履歴の記録方法

すべてのドキュメントに変更履歴セクションを設ける：

```markdown
## 変更履歴

| 日付 | バージョン | 変更内容 | 変更者 | レビュアー |
|------|-----------|---------|--------|----------|
| 2025-10-07 | 1.0 | 初版作成 | 山田太郎 | 佐藤花子 |
| 2025-10-10 | 1.1 | ボタンサイズ追加（sm/md/lg → sm/md/lg/xl） | 山田太郎 | 佐藤花子 |
| 2025-10-12 | 1.1.1 | 誤字修正 | 山田太郎 | - |
| 2025-10-15 | 2.0 | アトミックデザイン階層の全面見直し | 山田太郎 | 佐藤花子 |
```

---

## コンポーネント設計

### 設計原則

#### 1. 単一責任の原則

各コンポーネントは1つの責任のみを持つ

```typescript
// ✅ 良い例: Buttonは表示のみ
const Button = ({ onClick, children }) => (
  <button onClick={onClick}>{children}</button>
);

// ❌ 悪い例: Buttonが状態管理とビジネスロジックを持つ
const Button = () => {
  const [count, setCount] = useState(0);
  const saveToAPI = () => { /* API呼び出し */ };
  // ...
}
```

---

#### 2. Props駆動

コンポーネントの動作はPropsで制御する

```typescript
// ✅ 良い例
interface ButtonProps {
  variant: 'primary' | 'secondary';
  size: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant, size, children, ...props }) => {
  // Props駆動で動作
};
```

---

#### 3. TypeScript型定義の必須化

すべてのコンポーネントでTypeScript型定義を行う

```typescript
// ✅ 良い例: インターフェース定義
interface ComponentProps {
  title: string;
  description?: string;
  onSubmit: (value: string) => void;
}

const Component: React.FC<ComponentProps> = ({ title, description, onSubmit }) => {
  // 実装
};

// ❌ 悪い例: any型の使用
const Component = (props: any) => {
  // 型安全性なし
};
```

---

#### 4. デフォルト値の設定

オプショナルなPropsには適切なデフォルト値を設定する

```typescript
// ✅ 良い例
const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  children,
  ...props
}) => {
  // 実装
};
```

---

#### 5. classNameプロップでの拡張性

外部からのスタイル拡張を許可する

```typescript
// ✅ 良い例
interface ButtonProps {
  className?: string;
  // その他のprops
}

const Button: React.FC<ButtonProps> = ({ className = '', ...props }) => (
  <button className={`base-styles ${className}`} {...props} />
);
```

---

### 命名規則

#### コンポーネントファイル

- **PascalCase**: `ComponentName.tsx`
- **例**: `Button.tsx`, `ProductCard.tsx`, `SearchBar.tsx`

#### Props interface

- **コンポーネント名 + Props**: `ComponentNameProps`
- **例**: `ButtonProps`, `ProductCardProps`, `SearchBarProps`

#### BEM命名（クラス名）

```typescript
// Block
className="ec-button"

// Element
className="ec-button__icon"

// Modifier
className="ec-button--primary"
className="ec-button__icon--large"
```

---

## 品質保証

### レビュープロセス

#### コードレビューチェックリスト

**要件定義**
- [ ] 要件定義書が存在するか
- [ ] 受入基準が明確か
- [ ] 変更履歴が記録されているか

**アトミックデザイン**
- [ ] 正しい階層に配置されているか（Atoms/Molecules/Organisms）
- [ ] 依存関係が適切か
- [ ] 下位層が完成しているか（上位層の場合）

**コード品質**
- [ ] TypeScript型定義がされているか
- [ ] Props駆動の設計になっているか
- [ ] 単一責任の原則を守っているか
- [ ] 命名規則に従っているか

**ドキュメント**
- [ ] ドキュメントが更新されているか
- [ ] 変更内容が変更履歴に記録されているか

---

### テスト

#### 必須テスト項目

**Atoms**
- [ ] 全バリエーション（variant, size等）のテスト
- [ ] Props変更時の動作確認
- [ ] アクセシビリティ（a11y）テスト

**Molecules**
- [ ] Atomsとの統合テスト
- [ ] Props変更時の動作確認
- [ ] レスポンシブ表示確認

**Organisms**
- [ ] 状態管理（Zustand）との統合テスト
- [ ] ビジネスロジックのテスト
- [ ] レスポンシブ表示確認
- [ ] インタラクションテスト

---

## テンプレート

### 要件定義書テンプレート

```markdown
# [機能名] 要件定義書

**作成日**: YYYY-MM-DD
**最終更新**: YYYY-MM-DD
**バージョン**: 1.0
**担当者**: 氏名
**レビュアー**: 氏名

---

## 1. 概要

[機能の目的、ビジネス価値、対象ユーザーを記載]

## 2. 背景・課題

[なぜこの機能が必要か、解決したい課題を記載]

## 3. 機能要件

### Must Have（必須）
- [ ] 要件1
- [ ] 要件2

### Should Have（推奨）
- [ ] 要件3
- [ ] 要件4

### Nice to Have（任意）
- [ ] 要件5

## 4. 非機能要件

- **パフォーマンス**: [要件]
- **セキュリティ**: [要件]
- **アクセシビリティ**: [要件]

## 5. アトミックデザイン階層

- **階層**: Atoms / Molecules / Organisms
- **配置ディレクトリ**: `src/components/[階層]/[コンポーネント名].tsx`
- **依存コンポーネント**:
  - [コンポーネント名1] (Atoms)
  - [コンポーネント名2] (Molecules)
- **状態管理**: useCartStore / useFavoritesStore / なし

## 6. 受入基準

- [ ] 受入条件1
- [ ] 受入条件2
- [ ] 受入条件3
- [ ] a11yスコア90点以上（Atoms）/ 85点以上（Molecules）/ 80点以上（Organisms）
- [ ] レスポンシブ表示確認（mobile/tablet/desktop）

## 7. スケジュール

| フェーズ | 期間 | 担当者 |
|---------|------|--------|
| 要件定義 | YYYY-MM-DD | 氏名 |
| 設計 | YYYY-MM-DD | 氏名 |
| 実装 | YYYY-MM-DD | 氏名 |
| テスト | YYYY-MM-DD | 氏名 |
| レビュー | YYYY-MM-DD | 氏名 |

## 8. 変更履歴

| 日付 | バージョン | 変更内容 | 変更者 | レビュアー |
|------|-----------|---------|--------|----------|
| YYYY-MM-DD | 1.0 | 初版作成 | 氏名 | 氏名 |
```

このテンプレートを `docs/templates/REQUIREMENTS_TEMPLATE.md` に保存してください。

---

## 適用開始日

**2025年10月7日より、本ガイドラインを適用する**

すべての開発作業は本ガイドラインに従って実施すること。

---

## ガイドライン違反時の対応

1. レビュー時に指摘
2. 修正後、再レビュー
3. 繰り返し違反の場合、チームミーティングで共有

---

## 改訂履歴

| 日付 | バージョン | 変更内容 | 変更者 | 承認者 |
|------|-----------|---------|--------|--------|
| 2025-10-07 | 1.0 | 初版作成 | Claude Code | - |

---

**文書管理責任者**: プロジェクトリーダー
**次回レビュー予定日**: 3ヶ月後（2026年1月7日）
