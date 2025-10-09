# 親テーマ・子テーマアーキテクチャ 要件定義書

**作成日**: 2025-10-09
**最終更新**: 2025-10-09
**バージョン**: 1.0
**担当者**: プロジェクトチーム
**レビュアー**: -

---

## 1. 概要

Orchestra（親テーマ）とMaestro（子テーマ）の継承モデルを確立し、WordPressの親テーマ・子テーマの関係性をNext.jsプロジェクトに適用する。
Orchestraの更新がMaestroに容易に反映でき、Maestroは独自のカスタマイズを保持できる仕組みを構築する。

**目的**:
- Orchestraコンポーネントの更新をMaestroに簡単に反映
- Maestroの独自カスタマイズを保護
- 保守性と拡張性の向上
- コンポーネントの再利用性の最大化

**対象ユーザー**:
- 開発者（Orchestra/Maestro両方の保守担当）
- デザイナー（デザインシステムの管理者）

---

## 2. 背景・課題

### 現状の課題

1. **コンポーネントの重複管理**
   - Storybookのコンポーネントとsmartсample-nextjsのコンポーネントが別々に存在
   - 変更時に両方を手動で同期する必要がある

2. **更新の複雑さ**
   - Orchestraのコンポーネントを更新した際、Maestroへの反映が困難
   - どのファイルを変更すべきか不明確

3. **カスタマイズの管理**
   - 親のコンポーネントを直接変更すると、更新時にコンフリクトが発生
   - 子テーマ側の独自機能が親の更新で消失するリスク

### 解決すべき課題

- Orchestraの更新をMaestroに簡単に反映できる仕組み
- Maestroの独自カスタマイズを保護する仕組み
- 親・子の依存関係を明確化
- 開発者が迷わない命名規則とディレクトリ構造

---

## 3. 機能要件

### Must Have（必須）

- [x] **コンポーネント継承システム**
  - Orchestra（親）のコンポーネントをMaestro（子）で上書き可能
  - パスエイリアスによる参照解決

- [x] **Wrapper（ラッパー）コンポーネントパターン**
  - Maestro側で`@orchestra/[Component]`をラップして拡張
  - 親コンポーネントの変更を自動反映

- [x] **明確な命名規則**
  - Orchestra: `@orchestra/components/[階層]/[Component]`
  - Maestro: `@/components/[階層]/[Component]`（Wrapper or 独自）

- [x] **バージョン管理**
  - Orchestraのバージョン追跡
  - 互換性マトリクスの管理

### Should Have（推奨）

- [ ] **自動同期ツール**
  - Orchestraの変更を検知してMaestroに通知
  - npm scriptによる更新支援

- [ ] **依存関係の可視化**
  - どのコンポーネントがOrchestraに依存しているか一覧化
  - Maestro独自コンポーネントの識別

- [ ] **マイグレーションガイド**
  - Orchestraメジャーバージョンアップ時の移行手順
  - Breaking Changes対応ドキュメント

### Nice to Have（任意）

- [ ] **Orchestraのnpmパッケージ化**
  - `@orchestra/design-system` として配布
  - semverによるバージョン管理

- [ ] **CLI ツール**
  - `npx orchestra sync` でコンポーネント同期
  - `npx orchestra check` で互換性チェック

---

## 4. 非機能要件

- **保守性**: 親の更新が子に簡単に反映できること（30分以内）
- **拡張性**: 子が親の機能を上書き・拡張できること
- **明瞭性**: 開発者が親・子の区別を一目で判断できること
- **パフォーマンス**: パス解決によるビルド時間の増加を最小限に（+5%以内）
- **TypeScript型安全性**: 親・子間の型整合性を保証

---

## 5. アーキテクチャ設計

### ディレクトリ構造

```
ec_Design/
├── storybook/                          # Orchestra（親テーマ）
│   ├── stories/
│   │   ├── atoms/
│   │   ├── molecules/
│   │   ├── organisms/
│   │   └── templates/
│   └── package.json
│
└── smartsample-nextjs/                 # Maestro（子テーマ）
    ├── src/
    │   └── components/
    │       ├── ui/                     # Atoms（Wrapper or 独自）
    │       │   ├── Button.tsx          # Wrapper: Orchestraを継承
    │       │   ├── CustomButton.tsx    # 独自: Maestro専用
    │       │   └── Input.tsx           # Wrapper
    │       │
    │       ├── common/                 # Molecules
    │       ├── product/                # Organisms
    │       └── layout/                 # Organisms
    │
    ├── orchestra/                      # Orchestra参照用（symlink or submodule）
    │   └── components/
    │       ├── ui/                     # Atoms（親テーマソース）
    │       ├── common/
    │       ├── product/
    │       └── layout/
    │
    └── tsconfig.json
```

### パスエイリアス設定

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@orchestra/*": ["./orchestra/*"]
    }
  }
}
```

### コンポーネント継承パターン

#### パターン1: 完全継承（変更なし）

```tsx
// Maestro: src/components/ui/Badge.tsx
export { default } from '@orchestra/components/ui/Badge';
export * from '@orchestra/components/ui/Badge';
```

#### パターン2: Wrapper（拡張）

```tsx
// Maestro: src/components/ui/Button.tsx
import OrchestraButton, { ButtonProps } from '@orchestra/components/ui/Button';

export interface MaestroButtonProps extends ButtonProps {
  analytics?: boolean; // Maestro独自機能
}

export default function Button({ analytics, ...props }: MaestroButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (analytics) {
      // Maestro独自のアナリティクス送信
      trackEvent('button_click', { label: props.children });
    }
    props.onClick?.(e);
  };

  return <OrchestraButton {...props} onClick={handleClick} />;
}
```

#### パターン3: 完全上書き（独自実装）

```tsx
// Maestro: src/components/ui/CustomButton.tsx
export default function CustomButton(props: CustomButtonProps) {
  // Maestro完全独自実装
  return <button className="maestro-custom-button">{props.children}</button>;
}
```

---

## 6. 受入基準

- [x] パスエイリアス設定完了（`@orchestra/*`）
- [ ] 既存コンポーネントのWrapper化完了（20コンポーネント）
- [ ] TypeScript型定義の互換性確認
- [ ] ビルド時間の増加が5%以内
- [ ] ドキュメント更新完了
- [ ] 開発者向けガイドライン作成完了
- [ ] サンプル実装（Button, Input）の動作確認

---

## 7. スケジュール

| フェーズ | 期間 | 担当者 | ステータス |
|---------|------|--------|----------|
| 要件定義 | 2025-10-09 | プロジェクトチーム | 完了 |
| アーキテクチャ設計 | 2025-10-09 | プロジェクトチーム | 進行中 |
| パスエイリアス設定 | 2025-10-10 | 開発者 | 未着手 |
| Wrapper実装（Phase 1: Atoms） | 2025-10-11～10-12 | 開発者 | 未着手 |
| Wrapper実装（Phase 2: Molecules） | 2025-10-13～10-14 | 開発者 | 未着手 |
| Wrapper実装（Phase 3: Organisms） | 2025-10-15～10-17 | 開発者 | 未着手 |
| テスト・検証 | 2025-10-18～10-19 | 開発者 | 未着手 |
| ドキュメント作成 | 2025-10-20 | 開発者 | 未着手 |
| レビュー | 2025-10-21 | プロジェクトチーム | 未着手 |

---

## 8. 技術仕様

### Orchestra コンポーネント構造

```typescript
// Orchestra: components/ui/Button.tsx
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  children,
  onClick
}: ButtonProps) {
  return (
    <button
      className={`orchestra-button orchestra-button--${variant} orchestra-button--${size}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

### Maestro Wrapper 構造

```typescript
// Maestro: src/components/ui/Button.tsx
import OrchestraButton, { ButtonProps as OrchestraButtonProps } from '@orchestra/components/ui/Button';

export interface ButtonProps extends OrchestraButtonProps {
  // Maestro拡張プロパティ
  analytics?: {
    category: string;
    action: string;
    label?: string;
  };
  theme?: 'light' | 'dark'; // Maestro独自テーマ
}

export default function Button({
  analytics,
  theme = 'light',
  className,
  onClick,
  ...orchestraProps
}: ButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    // Maestro独自処理
    if (analytics) {
      trackEvent(analytics.category, analytics.action, analytics.label);
    }
    onClick?.(e);
  };

  return (
    <OrchestraButton
      {...orchestraProps}
      className={`${className || ''} maestro-theme-${theme}`}
      onClick={handleClick}
    />
  );
}
```

### バージョン管理

```json
// smartsample-nextjs/package.json
{
  "name": "maestro",
  "version": "1.0.0",
  "dependencies": {
    "orchestra-design-system": "^1.0.0"
  },
  "peerDependencies": {
    "orchestra-design-system": "^1.x"
  }
}
```

---

## 9. リスクと対策

| リスク | 影響度 | 発生確率 | 対策 |
|--------|--------|---------|------|
| Orchestra更新時のBreaking Changes | 高 | 中 | semverによるバージョン管理、変更通知システム |
| パス解決の複雑化によるビルドエラー | 中 | 中 | TypeScript strict設定、CI/CDでの型チェック |
| Wrapper実装の手間 | 中 | 高 | 自動生成スクリプトの提供、ボイラープレート用意 |
| Orchestraとの型不整合 | 高 | 低 | 共通型定義の共有、定期的な型チェック |
| Storybook参照の循環依存 | 中 | 低 | webpack設定の最適化、import順序の統一 |

---

## 10. 参考資料

### WordPress親テーマ・子テーマモデル
- [WordPress Child Themes](https://developer.wordpress.org/themes/advanced-topics/child-themes/)
- 親テーマの`functions.php`を子テーマで拡張する仕組みを参考

### モノレポ・パッケージ管理
- [Nx Monorepo](https://nx.dev/)
- [Turborepo](https://turbo.build/)
- [npm workspaces](https://docs.npmjs.com/cli/v8/using-npm/workspaces)

### コンポーネント継承パターン
- [React Composition vs Inheritance](https://react.dev/learn/composition-vs-inheritance)
- [Design System Component Inheritance](https://www.designsystems.com/)

---

## 11. 変更履歴

| 日付 | バージョン | 変更内容 | 変更者 | レビュアー |
|------|-----------|---------|--------|----------|
| 2025-10-09 | 1.0 | 初版作成 | プロジェクトチーム | - |

---

**承認者**: -
**承認日**: 2025-10-09
