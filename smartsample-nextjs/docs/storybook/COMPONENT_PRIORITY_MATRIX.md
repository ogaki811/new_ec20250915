# Storybookコンポーネント優先度マトリクス（アトミックデザインベース）

**プロジェクト**: smartsample Next.js ECサイト
**作成日**: 2025年10月7日
**更新日**: 2025年10月7日（アトミックデザイン対応）

---

## 優先度判定基準（アトミックデザイン準拠）

コンポーネントの実装優先度を**アトミックデザイン階層**と**依存関係**を軸に評価：

### 評価基準

| 評価軸 | 説明 | 重要度 |
|--------|------|--------|
| **階層** | Atoms > Molecules > Organisms（下位層優先） | 最重要 |
| **依存関係** | 依存なし > 依存あり（依存が少ない順） | 重要 |
| **使用頻度** | 全ページで使用 > 特定ページのみ | 中 |
| **複雑度** | シンプル > 複雑（学習コスト考慮） | 中 |

### 実装順序の原則

```
Phase 2: Atoms（依存なし）
  ↓ すべてのAtoms完成後
Phase 3: Molecules（Atomsに依存）
  ↓ すべてのMolecules完成後
Phase 4: Organisms（Atoms + Molecules + Storeに依存）
```

**重要**: 下位層の完成なしに上位層は着手しない

---

## Phase 2: Atoms（原子） - 11コンポーネント

### 特徴
- **依存関係**: なし（完全に独立）
- **再利用性**: 最大
- **実装難易度**: 低～中
- **合計工数**: 2.5日

### P0: 最優先（Day 1-2）

| # | コンポーネント | バリエーション数 | 使用箇所 | 実装工数 | 理由 |
|---|--------------|----------------|---------|---------|------|
| 1 | **Button** | 15+ (5 variants × 3 sizes) | 全ページ | 0.25日 | 全システムの基盤、最も使用頻度が高い |
| 2 | **Input** | 8+ (通常/エラー/ヘルパー等) | フォーム全般 | 0.25日 | フォームの基盤、認証・検索・チェックアウト |

#### Button実装詳細
```typescript
// 5 variants: primary, secondary, outline, ghost, danger
// 3 sizes: sm, md, lg
// 状態: default, hover, active, disabled, loading
// オプション: fullWidth
// 合計Story数: 15+
```

#### Input実装詳細
```typescript
// バリエーション:
// - 通常（label有/無）
// - エラー状態（error message表示）
// - ヘルパーテキスト付き
// - Disabled状態
// - Full Width
// 合計Story数: 8+
```

---

### P1: 高優先度（Day 3-4）

| # | コンポーネント | バリエーション数 | 使用箇所 | 実装工数 | 理由 |
|---|--------------|----------------|---------|---------|------|
| 3 | **Card** | 6+ (variant, padding) | 商品カード、情報パネル | 0.25日 | コンテナとして広く使用 |
| 4 | **Badge** | 8+ (4 variants × 2 sizes) | 商品タグ、ステータス | 0.25日 | 視覚的フィードバック |
| 5 | **Checkbox** | 6+ (通常/checked/error) | フォーム、フィルター | 0.25日 | フォーム必須要素 |
| 6 | **Radio** | 6+ (通常/selected/group) | 支払い方法、配送方法 | 0.25日 | フォーム必須要素 |
| 7 | **Select** | 6+ (通常/error/multiple) | 並び替え、カテゴリー選択 | 0.25日 | ドロップダウン選択 |

---

### P2: 中優先度（Day 5）

| # | コンポーネント | バリエーション数 | 使用箇所 | 実装工数 | 理由 |
|---|--------------|----------------|---------|---------|------|
| 8 | **Textarea** | 6+ (通常/error/resizable) | お問い合わせ、レビュー | 0.25日 | 長文入力 |
| 9 | **Icon** | 20+ (アイコン一覧) | ボタン、ナビゲーション | 0.25日 | UI装飾 |

---

### P3: 低優先度（Day 5）

| # | コンポーネント | バリエーション数 | 使用箇所 | 実装工数 | 理由 |
|---|--------------|----------------|---------|---------|------|
| 10 | **Divider** | 4+ (horizontal/vertical) | セクション区切り | 0.1日 | シンプルな区切り線 |
| 11 | **Loading** | 4+ (spinner/size) | データ読み込み中 | 0.1日 | ローディング表示 |

---

### Atoms完了チェックリスト

- [ ] 11個すべてのAtoms Storyが完成
- [ ] 各Atomsで全バリエーション（variant, size等）のStoryが作成（合計70+ Stories）
- [ ] Interactive Controls（argTypes）が動作
- [ ] autodocs が自動生成
- [ ] a11yアドオンでスコア90点以上
- [ ] すべてのAtomsでレスポンシブ表示確認

**Phase 3への進行条件**: 上記すべてチェック完了

---

## Phase 3: Molecules（分子） - 4コンポーネント

### 特徴
- **依存関係**: Atomsのみ
- **構成**: 2-3個のAtomsの組み合わせ
- **実装難易度**: 中
- **合計工数**: 2日

### P0: 最優先（Day 1-2）

| # | コンポーネント | 構成 | 依存Atoms | 使用箇所 | 実装工数 |
|---|--------------|------|----------|---------|---------|
| 1 | **Breadcrumb** | Link + Text | なし（Next.js） | 全詳細ページ | 0.5日 |
| 2 | **Pagination** | Button + Text | Button | 商品一覧、検索結果 | 0.5日 |

#### Breadcrumb実装詳細
```typescript
// バリエーション:
// - 2階層 (ホーム > 商品一覧)
// - 3階層 (ホーム > 商品一覧 > カテゴリー)
// - 4階層以上
// - アイコン付き
// 合計Story数: 6+
```

#### Pagination実装詳細
```typescript
// バリエーション:
// - 最初のページ (← disabled, 1, 2, 3, →)
// - 中間ページ (←, ..., 4, 5, 6, ..., →)
// - 最後のページ (←, 8, 9, 10, → disabled)
// - 多ページ (1...5...10...20)
// 合計Story数: 6+
```

---

### P1: 高優先度（Day 3-4）

| # | コンポーネント | 構成 | 依存Atoms | 使用箇所 | 実装工数 |
|---|--------------|------|----------|---------|---------|
| 3 | **StepIndicator** | Badge + Line + Text | Badge | チェックアウトフロー | 0.5日 |
| 4 | **Modal** | Card + Button + Overlay | Card, Button | 確認ダイアログ | 0.5日 |

#### StepIndicator実装詳細
```typescript
// バリエーション:
// - 3ステップ (カート > 情報入力 > 確認)
// - 4ステップ
// - 現在ステップ強調
// - 完了ステップ表示
// 合計Story数: 6+
```

#### Modal実装詳細
```typescript
// バリエーション:
// - シンプルモーダル（タイトル + 本文 + ボタン）
// - 確認モーダル（OK/キャンセル）
// - フォームモーダル
// - フルスクリーンモーダル
// 合計Story数: 6+
```

---

### Molecules完了チェックリスト

- [ ] 4個すべてのMolecules Storyが完成
- [ ] Atomsとの組み合わせが正しく動作
- [ ] Next.jsのLinkコンポーネントがモックで動作
- [ ] レスポンシブ表示確認（viewport切替）
- [ ] 合計24+ Storiesが作成
- [ ] a11yアドオンでスコア85点以上

**Phase 4への進行条件**: 上記すべてチェック完了

---

## Phase 4: Organisms（有機体） - 8-10コンポーネント

### 特徴
- **依存関係**: Atoms + Molecules + 状態管理（Zustand）
- **構成**: 4個以上のコンポーネント + ビジネスロジック
- **実装難易度**: 高
- **合計工数**: 5日

---

### Week 4: 最優先Organisms

#### P0: 最優先（Day 1-2）

| # | コンポーネント | 構成 | 依存 | Storeモック | 使用箇所 | 実装工数 |
|---|--------------|------|------|-----------|---------|---------|
| 1 | **ProductCard** | Badge + Button + QuantitySelector + Image | Atoms + Molecules | useCartStore, useFavoritesStore | トップ、一覧、検索 | 1日 |

##### ProductCard実装詳細
```typescript
// 構成要素:
// - 商品画像 (Image)
// - バッジ (Badge × 複数: 新着、セール、おすすめ)
// - お気に入りボタン (Button + Icon)
// - ブランド名 (Text)
// - 商品名 (Text)
// - 品番 (Text)
// - 評価 (Icon × 5)
// - 価格 (Text)
// - 数量選択 (QuantitySelector)
// - カートに追加ボタン (Button)

// 状態管理:
// - useCartStore: カート追加機能
// - useFavoritesStore: お気に入り機能

// バリエーション:
// - 3サイズ (compact, default, large)
// - 在庫あり/なし
// - タグあり/なし
// - お気に入り済み/未登録
// - ローディング状態
// 合計Story数: 10+
```

---

#### P1: 高優先度（Day 3）

| # | コンポーネント | 構成 | 依存 | Storeモック | 実装工数 |
|---|--------------|------|------|-----------|---------|
| 2 | **QuantitySelector** | Button × 2 + Input | Button, Input | なし | 0.5日 |
| 3 | **SearchBar** | Input + Button + Icon | Input, Button, Icon | なし | 0.5日 |

---

#### P0: 最複雑（Day 4-5）

| # | コンポーネント | 構成 | 依存 | Storeモック | 使用箇所 | 実装工数 |
|---|--------------|------|------|-----------|---------|---------|
| 4 | **Header** | Logo + SearchBar + Navigation + Cart + UserMenu | Molecules + Atoms | useCartStore | 全ページ | 1日 |

##### Header実装詳細
```typescript
// 構成要素:
// - ロゴ (Image + Link)
// - 検索バー (SearchBar)
// - ナビゲーション (Links)
// - カートアイコン + バッジ (Icon + Badge)
// - ユーザーメニュー (Dropdown)

// 状態管理:
// - useCartStore: カート内商品数表示

// バリエーション:
// - デスクトップ表示
// - モバイル表示（ハンバーガーメニュー）
// - カート0件/複数件
// - ログイン済み/未ログイン
// - 検索バー展開/折りたたみ
// 合計Story数: 8+
```

---

### Week 5: その他のOrganisms

#### P1: レイアウトOrganisms（Day 1-2）

| # | コンポーネント | 構成 | 依存 | Storeモック | 実装工数 |
|---|--------------|------|------|-----------|---------|
| 5 | **Footer** | Links + Text + SNS Icons | Atoms | なし | 0.5日 |
| 6 | **MobileMenu** | Links + Icons + Accordion | Atoms + Molecules | なし | 0.5日 |

---

#### P2: 機能Organisms（Day 3-4）

| # | コンポーネント | 構成 | 依存 | Storeモック | 実装工数 |
|---|--------------|------|------|-----------|---------|
| 7 | **ProductImageGallery** | Image + Thumbnails + Navigation | Atoms | なし | 0.5日 |
| 8 | **ProductGrid** | ProductCard × n + Pagination | Molecules + Organisms | なし | 0.5日 |
| 9 | **CartItem** | Image + Text + QuantitySelector + Button | Atoms + Molecules | useCartStore | 0.5日 |
| 10 | **CheckoutForm** | Input × n + Select + Checkbox + Button | Atoms + Molecules | なし | 0.5日 |

---

### Organisms完了チェックリスト

- [ ] ProductCard Storyが完成（10+ バリエーション）
- [ ] Header Storyが完成（8+ バリエーション）
- [ ] Zustand StoreのモックProviderが動作
- [ ] 合計8-10個のOrganisms Storyが完成
- [ ] 状態管理依存コンポーネントがStorybook上で正常動作
- [ ] レスポンシブ表示確認（mobile/tablet/desktop）
- [ ] インタラクション記録（Interactions addon）
- [ ] a11yアドオンでスコア80点以上

**Phase 5への進行条件**: 上記すべてチェック完了

---

## 合計工数見積もり（アトミックデザインベース）

| Phase | 階層 | コンポーネント数 | 合計工数 | 期間 |
|-------|------|----------------|---------|------|
| **Phase 1** | 環境構築 | - | 1週間 | Week 1 |
| **Phase 2** | Atoms | 11個 | 2.5日 | Week 2 |
| **Phase 3** | Molecules | 4個 | 2日 | Week 3 |
| **Phase 4** | Organisms | 8-10個 | 5日 | Week 4-5 |
| **Phase 5** | 高度な機能 | - | 1週間 | Week 6 |
| **合計** | - | **23-25個** | **約6週間** | - |

---

## アトミックデザイン階層別サマリー

### Atoms（Phase 2）

```
合計: 11コンポーネント
工数: 2.5日
Story数: 70+

優先度:
  P0: Button, Input (0.5日)
  P1: Card, Badge, Checkbox, Radio, Select (1.25日)
  P2: Textarea, Icon (0.5日)
  P3: Divider, Loading (0.2日)

特徴:
  - 依存関係なし
  - 最も再利用性が高い
  - 実装難易度: 低～中
```

### Molecules（Phase 3）

```
合計: 4コンポーネント
工数: 2日
Story数: 24+

優先度:
  P0: Breadcrumb, Pagination (1日)
  P1: StepIndicator, Modal (1日)

特徴:
  - Atomsに依存
  - 2-3個のAtomsの組み合わせ
  - 実装難易度: 中
```

### Organisms（Phase 4）

```
合計: 8-10コンポーネント
工数: 5日
Story数: 50+

優先度:
  P0: ProductCard, Header (2日)
  P1: QuantitySelector, SearchBar, Footer, MobileMenu (2日)
  P2: ProductImageGallery, ProductGrid, CartItem, CheckoutForm (2日)

特徴:
  - Atoms + Molecules + Storeに依存
  - 4個以上のコンポーネント組み合わせ
  - ビジネスロジック含む
  - 実装難易度: 高
```

---

## 依存関係グラフ

```
Phase 2: Atoms（独立）
  │
  ├── Button ──────────┐
  ├── Input ───────────┤
  ├── Card ────────────┤
  ├── Badge ───────────┤
  ├── Icon ────────────┤
  └── その他 ───────────┤
                      │
Phase 3: Molecules    ↓
  │
  ├── Breadcrumb ← (Next.js Link)
  ├── Pagination ← Button
  ├── StepIndicator ← Badge
  └── Modal ← Card + Button
                      │
Phase 4: Organisms    ↓
  │
  ├── ProductCard ← Badge + Button + QuantitySelector + useCartStore + useFavoritesStore
  ├── QuantitySelector ← Button + Input
  ├── SearchBar ← Input + Button + Icon
  ├── Header ← SearchBar + Logo + Navigation + useCartStore
  ├── Footer ← Atoms
  ├── MobileMenu ← Atoms + Molecules
  ├── ProductImageGallery ← Atoms
  ├── ProductGrid ← ProductCard + Pagination
  ├── CartItem ← Image + QuantitySelector + useCartStore
  └── CheckoutForm ← Input + Select + Checkbox + Button
```

---

## 実装スケジュール（6週間）

### Week 1: Phase 1 - 基盤構築
- Storybookインストール
- アトミックデザイン階層設定
- モックProvider作成
- イントロダクションページ

### Week 2: Phase 2 - Atoms（11コンポーネント）
- **Day 1-2**: Button, Input（P0）
- **Day 3-4**: Card, Badge, Checkbox, Radio, Select（P1）
- **Day 5**: Textarea, Icon, Divider, Loading（P2-P3）

### Week 3: Phase 3 - Molecules（4コンポーネント）
- **Day 1-2**: Breadcrumb, Pagination（P0）
- **Day 3-4**: StepIndicator, Modal（P1）
- **Day 5**: レビューと調整

### Week 4: Phase 4a - Organisms（ProductCard重点）
- **Day 1-2**: ProductCard（最重要）
- **Day 3**: QuantitySelector, SearchBar
- **Day 4-5**: Header（最複雑）

### Week 5: Phase 4b - Organisms（その他）
- **Day 1-2**: Footer, MobileMenu
- **Day 3-4**: ProductImageGallery, ProductGrid
- **Day 5**: CartItem, CheckoutForm

### Week 6: Phase 5 - 高度な機能と運用
- **Day 1-2**: アクセシビリティ対応（a11y）
- **Day 3**: デザインシステムドキュメント作成
- **Day 4**: ビルド・デプロイ・CI/CD
- **Day 5**: 運用ルール策定

---

## Phase別進捗トラッキング

### Phase 2完了チェックリスト（Atoms）

**P0 - 最優先**
- [ ] Button.stories.tsx（15+ Stories）
- [ ] Input.stories.tsx（8+ Stories）

**P1 - 高優先度**
- [ ] Card.stories.tsx（6+ Stories）
- [ ] Badge.stories.tsx（8+ Stories）
- [ ] Checkbox.stories.tsx（6+ Stories）
- [ ] Radio.stories.tsx（6+ Stories）
- [ ] Select.stories.tsx（6+ Stories）

**P2-P3 - 中低優先度**
- [ ] Textarea.stories.tsx（6+ Stories）
- [ ] Icon.stories.tsx（20+ Stories）
- [ ] Divider.stories.tsx（4+ Stories）
- [ ] Loading.stories.tsx（4+ Stories）

**完了条件**
- [ ] 合計70+ Stories作成完了
- [ ] autodocs自動生成確認
- [ ] a11yスコア90点以上
- [ ] すべてのControls動作確認

---

### Phase 3完了チェックリスト（Molecules）

**P0 - 最優先**
- [ ] Breadcrumb.stories.tsx（6+ Stories）
- [ ] Pagination.stories.tsx（6+ Stories）

**P1 - 高優先度**
- [ ] StepIndicator.stories.tsx（6+ Stories）
- [ ] Modal.stories.tsx（6+ Stories）

**完了条件**
- [ ] 合計24+ Stories作成完了
- [ ] Atomsとの統合動作確認
- [ ] Next.js機能モック動作確認
- [ ] a11yスコア85点以上

---

### Phase 4完了チェックリスト（Organisms）

**Week 4 - 最優先Organisms**
- [ ] ProductCard.stories.tsx（10+ Stories）
- [ ] QuantitySelector.stories.tsx（4+ Stories）
- [ ] SearchBar.stories.tsx（4+ Stories）
- [ ] Header.stories.tsx（8+ Stories）

**Week 5 - その他Organisms**
- [ ] Footer.stories.tsx（4+ Stories）
- [ ] MobileMenu.stories.tsx（4+ Stories）
- [ ] ProductImageGallery.stories.tsx（4+ Stories）
- [ ] ProductGrid.stories.tsx（4+ Stories）
- [ ] CartItem.stories.tsx（4+ Stories）
- [ ] CheckoutForm.stories.tsx（4+ Stories）

**完了条件**
- [ ] 合計50+ Stories作成完了
- [ ] Zustand Storeモック動作確認
- [ ] レスポンシブ表示確認（全デバイス）
- [ ] Interactions addon動作確認
- [ ] a11yスコア80点以上

---

## アトミックデザイン分類の判断基準

コンポーネントがどの階層に属するか迷った場合の判断フローチャート：

```
START
  │
  ├─ 他のコンポーネントに依存しない？
  │   YES → Atoms
  │   NO  → 次へ
  │
  ├─ 依存するのはAtomsのみ？
  │   YES → Molecules
  │   NO  → 次へ
  │
  ├─ 状態管理（Zustand）に依存する？
  │   YES → Organisms
  │   NO  → 次へ
  │
  ├─ 4個以上のコンポーネントを組み合わせる？
  │   YES → Organisms
  │   NO  → Molecules
  │
END
```

### 判断基準表

| 基準 | Atoms | Molecules | Organisms |
|------|-------|-----------|-----------|
| **依存関係** | なし | Atomsのみ | Atoms + Molecules + Store |
| **構成要素数** | 1 | 2-3 | 4+ |
| **ビジネスロジック** | なし | 最小限 | あり |
| **状態管理** | なし | ローカルのみ | グローバル可 |
| **再利用性** | 最大 | 高 | 中～低 |
| **実装難易度** | 低～中 | 中 | 高 |

### 具体例

| コンポーネント | 階層 | 理由 |
|--------------|------|------|
| Button | Atoms | 単一要素、依存なし |
| Input | Atoms | 単一要素、依存なし |
| Breadcrumb | Molecules | Link + Text（2要素） |
| Pagination | Molecules | Button + Text（2要素） |
| QuantitySelector | Molecules | Button × 2 + Input（3要素） |
| ProductCard | Organisms | Badge + Button + QuantitySelector + useCartStore（4要素以上 + 状態管理） |
| Header | Organisms | SearchBar + Navigation + Cart + useCartStore（4要素以上 + 状態管理） |

---

**文書バージョン**: 2.0（アトミックデザイン対応版）
**最終更新**: 2025年10月7日
**変更履歴**:
- v1.0: 初版作成（機能ベース優先度）
- v2.0: アトミックデザイン階層ベースに全面改訂
