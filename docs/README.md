# ECサイトプロジェクト ドキュメント

**最終更新**: 2025-10-07
**バージョン**: 2.0

このディレクトリには、ECサイトプロジェクト全体のドキュメントが統合されています。

---

## プロジェクト名称

### 🎼 Orchestra（オーケストラ）
**デザインシステムの名称**

Orchestra（オーケストラ）は、アトミックデザインの原則に基づいて構築された体系的なデザインシステムです。
楽器が調和して美しい音楽を奏でるように、UIコンポーネントが調和して優れたユーザー体験を創造します。

**特徴**:
- Atoms（原子）→ Molecules（分子）→ Organisms（有機体）の階層構造
- 再利用可能で保守性の高いコンポーネントライブラリ
- Storybookによる可視化とドキュメント管理

### 🎭 Maestro（マエストロ）
**ヘッドレスコマースプラットフォームの名称**

Maestro（マエストロ）は、Orchestraデザインシステムを使用して構築されるNext.js 15ベースのヘッドレスコマースプラットフォームです。
指揮者がオーケストラを導くように、MaestroがEコマース体験全体を統率します。

**技術スタック**:
- Next.js 15.1.4 (App Router)
- TypeScript 5.7.3
- Tailwind CSS 4.0.14
- Zustand 5.0.8

---

## ディレクトリ構成

```
docs/
├── project/                # プロジェクト全体の共通ドキュメント
│   ├── CLAUDE.md          # Claude Code用プロジェクト概要
│   └── requirements.md    # 元の要件定義（静的HTML版）
│
├── react-version/         # React+Vite版の移行ドキュメント（29ファイル）
│   ├── MIGRATION_*.md     # 移行計画・手順書
│   ├── DESIGN_*.md        # 設計ドキュメント
│   └── その他開発ドキュメント
│
└── nextjs-version/        # Next.js 15版（本番環境）
    ├── requirements/      # 機能別要件定義書
    ├── design/            # 設計ドキュメント
    │   └── DESIGN_SYSTEM.md  # アトミックデザイン定義
    ├── guidelines/        # 開発ガイドライン
    │   └── DEVELOPMENT_GUIDELINES.md
    ├── reports/           # 開発報告書
    ├── storybook/         # Storybook関連
    │   ├── STORYBOOK_IMPLEMENTATION_PLAN.md
    │   └── COMPONENT_PRIORITY_MATRIX.md
    ├── templates/         # テンプレート集
    │   └── REQUIREMENTS_TEMPLATE.md
    ├── E2E_TEST.md       # Cypress E2Eテスト実行ガイド
    └── README.md         # Next.js版プロジェクト概要
```

---

## プロジェクトバージョン

### 1. 静的HTML版（完成）
- **ディレクトリ**: `/` (ルート)
- **技術スタック**: HTML5, CSS3, JavaScript (Vanilla)
- **状態**: プロトタイプ完成（8画面）
- **ドキュメント**: `docs/project/requirements.md`, `docs/project/CLAUDE.md`

### 2. React版（移行中）
- **ディレクトリ**: `/react-app/`
- **技術スタック**: React 18 + Vite
- **状態**: 移行作業進行中
- **ドキュメント**: `docs/react-version/` (29ファイル)

### 3. Next.js版（本番環境 ⭐）- **Maestro**
- **プロジェクト名**: Maestro（マエストロ）ヘッドレスコマース
- **デザインシステム**: Orchestra（オーケストラ）
- **ディレクトリ**: `/smartsample-nextjs/`（Maestro実装）、`/storybook/`（Orchestra）
- **技術スタック**: Next.js 15 + TypeScript + Tailwind CSS + Zustand
- **状態**: Phase 1-5 完成（100%）、Storybook Phase 1完了
- **ドキュメント**: `docs/nextjs-version/`

---

## ドキュメントカテゴリ

### 要件定義（Requirements）
新機能開発前に必須のドキュメント。テンプレートに従って作成。

- **テンプレート**: `docs/nextjs-version/templates/REQUIREMENTS_TEMPLATE.md`
- **保存場所**: `docs/nextjs-version/requirements/`

### 設計（Design）
アーキテクチャ、デザインシステム、コンポーネント設計。

- **アトミックデザイン**: `docs/nextjs-version/design/DESIGN_SYSTEM.md`
- **Storybook計画**: `docs/nextjs-version/storybook/`

### ガイドライン（Guidelines）
開発ルール、コーディング規約、ワークフロー。

- **開発ガイドライン**: `docs/nextjs-version/guidelines/DEVELOPMENT_GUIDELINES.md`

### 報告書（Reports）
開発完了報告、テスト結果、リリースノート。

- **保存場所**: `docs/nextjs-version/reports/`

---

## ドキュメント作成ルール

### 1. 新規ドキュメントの配置
- **Next.js関連**: `docs/nextjs-version/[カテゴリ]/`
- **React移行関連**: `docs/react-version/`
- **プロジェクト全体**: `docs/project/`

### 2. 必須ドキュメント
開発着手前に以下を作成：
- 要件定義書（テンプレート使用）
- 設計ドキュメント（必要に応じて）

### 3. 変更履歴
すべてのドキュメントに変更履歴テーブルを記載：

```markdown
| 日付 | バージョン | 変更内容 | 変更者 | レビュアー |
|------|-----------|---------|--------|----------|
| YYYY-MM-DD | 1.0 | 初版作成 | 氏名 | 氏名 |
```

---

## 主要技術スタック（Next.js版）

- **フレームワーク**: Next.js 15.1.4 (App Router)
- **言語**: TypeScript 5.7.3
- **スタイリング**: Tailwind CSS 4.0.14
- **状態管理**: Zustand 5.0.8
- **テスト**: Cypress 15.3.0
- **開発環境**: Storybook 8.x (計画中)

---

## 開発プロセス

1. **要件定義** → `docs/nextjs-version/requirements/`にドキュメント作成
2. **設計** → アトミックデザインに基づいてコンポーネント設計
3. **実装** → Atoms → Molecules → Organisms の順に開発
4. **テスト** → Cypress E2Eテスト実施
5. **報告** → `docs/nextjs-version/reports/`に完了報告

---

## 参考リンク

- [Next.js公式ドキュメント](https://nextjs.org/docs)
- [Tailwind CSS公式ドキュメント](https://tailwindcss.com/docs)
- [Cypress公式ドキュメント](https://docs.cypress.io/)
- [アトミックデザイン概念](https://bradfrost.com/blog/post/atomic-web-design/)

---

**管理者**: プロジェクトチーム
**最終更新者**: Claude Code
**承認日**: 2025-10-07
