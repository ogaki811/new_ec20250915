# 📚 Next.js 移行ドキュメント - 目次

**プロジェクト**: smartsample EC サイト
**移行元**: Vite + React 19 + JavaScript
**移行先**: Next.js 15 + TypeScript

---

## 🗂️ ドキュメント一覧

### 🔴 必読ドキュメント

#### 1. [MIGRATION_REVIEW_REPORT.md](./MIGRATION_REVIEW_REPORT.md)
**最初に読むべきドキュメント**

- ✅ 移行計画の検証結果
- ⚠️ 発見された課題と対策
- 📊 リスク評価の更新
- 🎯 総合評価と推奨事項

**対象読者**: 全員（PM、エンジニア、デザイナー）
**所要時間**: 10分

---

#### 2. [MIGRATION_CRITICAL_ISSUES.md](./MIGRATION_CRITICAL_ISSUES.md) ⚠️ **最重要**
**移行前に必ず読むべき技術ドキュメント**

- 🚨 localStorage の SSR 対応（最重要）
- ⚠️ ハイドレーションエラーの回避
- 🔐 認証ミドルウェアの実装
- ⚡ Server Actions の活用
- 📦 データフェッチのパターン

**対象読者**: エンジニア全員
**所要時間**: 20-30分
**内容**: 具体的なコード例、解決策

---

#### 3. [NEXTJS_MIGRATION_PLAN.md](./NEXTJS_MIGRATION_PLAN.md)
**詳細な移行計画書（11セクション）**

1. プロジェクト現状分析
2. 移行戦略（5フェーズ、13-19日）
3. 技術スタック比較
4. ファイル構造マッピング
5. TypeScript型定義設計
6. ルーティング移行計画
7. SEO強化戦略
8. 段階的実装計画
9. 依存関係の変更
10. テスト戦略
11. リスクと対策

**対象読者**: エンジニアリーダー、PM
**所要時間**: 30-40分

---

#### 4. [MIGRATION_ADDITIONAL_ISSUES.md](./MIGRATION_ADDITIONAL_ISSUES.md) ⚠️ **重要**
**追加の重要課題（再検証で発見）**

- 🚨 Swiper.js のSSR非対応（`'use client'` 必須）
- ⚠️ react-hot-toast のClient Component制約
- 🎨 `<style jsx>` の移行方法
- 🔐 Cookie 認証のセキュリティ強化
- ⚡ ISR設定とビルド時間短縮

**対象読者**: エンジニア全員
**所要時間**: 20分
**内容**: 具体的なコード例、セキュリティ対策

---

#### 5. [MIGRATION_QUICK_START.md](./MIGRATION_QUICK_START.md)
**クイックスタートガイド**

- 🚀 5フェーズの実装手順
- 💻 コマンド例・コードサンプル
- ✅ チェックリスト
- 📋 次のアクション

**対象読者**: 実装担当エンジニア
**所要時間**: 15分

---

### 🟡 推奨ドキュメント

#### 6. [ARCHITECTURE_COMPARISON.md](./ARCHITECTURE_COMPARISON.md)
**Before/After の詳細比較**

- 📊 技術スタック比較表
- ⚡ パフォーマンス予測（FCP 68%改善、LCP 66%改善）
- 🔍 SEOスコア向上（85-90点 → 95-100点）
- 💰 投資対効果分析（3-6ヶ月で回収）

**対象読者**: PM、ステークホルダー
**所要時間**: 20分

---

#### 7. [CLASS_NAMING_PLAN.md](./CLASS_NAMING_PLAN.md)
**BEM クラス命名規則**

- 📝 BEM 命名規則の詳細
- 🎨 実装済みの790クラス
- ✅ Next.js でも継続使用可能

**対象読者**: デザイナー、フロントエンドエンジニア
**所要時間**: 10分

---

## 📖 読む順番（推奨）

### 全員（PM、エンジニア、デザイナー）

1. **[MIGRATION_REVIEW_REPORT.md](./MIGRATION_REVIEW_REPORT.md)** (10分)
   - 移行の概要と結論を理解

2. **[ARCHITECTURE_COMPARISON.md](./ARCHITECTURE_COMPARISON.md)** (20分)
   - Before/After を理解、メリットを確認

### エンジニア

1. **[MIGRATION_REVIEW_REPORT.md](./MIGRATION_REVIEW_REPORT.md)** (10分)

2. **[MIGRATION_CRITICAL_ISSUES.md](./MIGRATION_CRITICAL_ISSUES.md)** ⚠️ **必読** (30分)
   - localStorage、ハイドレーション、認証の対応方法

3. **[MIGRATION_ADDITIONAL_ISSUES.md](./MIGRATION_ADDITIONAL_ISSUES.md)** ⚠️ **重要** (20分)
   - Swiper.js、react-hot-toast、Cookie セキュリティ

4. **[NEXTJS_MIGRATION_PLAN.md](./NEXTJS_MIGRATION_PLAN.md)** (40分)
   - 全体計画、Phase 2-5 の詳細

5. **[MIGRATION_QUICK_START.md](./MIGRATION_QUICK_START.md)** (15分)
   - 実装時のクイックリファレンス

### PM・リーダー

1. **[MIGRATION_REVIEW_REPORT.md](./MIGRATION_REVIEW_REPORT.md)** (10分)

2. **[ARCHITECTURE_COMPARISON.md](./ARCHITECTURE_COMPARISON.md)** (20分)

3. **[NEXTJS_MIGRATION_PLAN.md](./NEXTJS_MIGRATION_PLAN.md)** (40分)
   - セクション 2, 8, 11 を重点的に

---

## 🎯 移行の目的（再掲）

現在の **CSR（Vite + React）** から **SSR/SSG（Next.js + TypeScript）** に移行し、以下を実現:

✅ **SEO大幅向上** - 検索流入 30-50%増加
✅ **初期表示高速化** - FCP 2.5s→0.8s、直帰率 20-30%削減
✅ **型安全性** - バグ 50-70%削減
✅ **開発体験向上** - 開発工数 15-25%削減

---

## 📊 移行スケジュール

| Phase | 内容 | 期間 |
|-------|------|------|
| **Phase 1** | プロジェクトセットアップ | 1-2日 |
| **Phase 2** | 共通機能移行 | **4-5日** |
| **Phase 3** | ページ移行（17ページ） | 5-7日 |
| **Phase 4** | SEO・パフォーマンス最適化 | 2-3日 |
| **Phase 5** | テスト・デバッグ | 2-3日 |
| **合計** | | **14-20日** |

**注意**: 当初計画の 12-18日 から **+2日** （localStorage/認証/追加課題対応で増加）

---

## ⚠️ 重要な注意事項

### 移行前に必ず対応すること

1. **[MIGRATION_CRITICAL_ISSUES.md](./MIGRATION_CRITICAL_ISSUES.md) を熟読**
   - localStorage の SSR 対応方法
   - 認証フローの変更

2. **依存関係の追加**
   ```bash
   npm install js-cookie
   npm install -D @types/js-cookie
   ```

3. **環境変数の準備**
   ```bash
   # .env.local を作成
   NEXT_PUBLIC_SITE_URL=https://smartsample.example.com
   ```

### Phase 2 で優先すべきタスク

1. 🔴 **最優先**: Zustand persist の SSR 対応
2. 🔴 **高優先**: 認証を Cookie に移行（セキュリティ設定含む）
3. 🔴 **高優先**: useFormPersist の SSR 対応
4. 🔴 **高優先**: HeroSlider に `'use client'` 追加
5. 🔴 **高優先**: react-hot-toast を root layout に配置
6. 🟡 **中優先**: ハイドレーションエラーの回避
7. 🟡 **中優先**: `<style jsx>` を CSS Modules に移行

---

## 🚀 移行開始コマンド

```bash
# Phase 1: プロジェクト作成
npx create-next-app@latest smartsample-nextjs \
  --typescript --tailwind --app --src-dir

cd smartsample-nextjs

# 依存関係追加
npm install zustand react-hot-toast swiper js-cookie
npm install -D @types/js-cookie

# 開発サーバー起動
npm run dev
```

---

## 📞 サポート

質問や問題が発生した場合:

1. まず **[MIGRATION_CRITICAL_ISSUES.md](./MIGRATION_CRITICAL_ISSUES.md)** を確認
2. Next.js 公式ドキュメントを参照: https://nextjs.org/docs
3. チーム内で共有・相談

---

## 📝 ドキュメント更新履歴

| 日付 | 更新内容 |
|-----|---------|
| 2025-10-05 | 初版作成（全6ドキュメント） |
| 2025-10-05 | 再検証実施、MIGRATION_CRITICAL_ISSUES.md 追加 |
| 2025-10-05 | MIGRATION_REVIEW_REPORT.md 追加 |
| 2025-10-05 | MIGRATION_INDEX.md 追加（このファイル） |
| 2025-10-05 | **最終検証実施、MIGRATION_ADDITIONAL_ISSUES.md 追加** |
| 2025-10-05 | **所要時間を14-20日に更新（+2日）** |

---

**最終更新**: 2025年10月5日
**ステータス**: ✅ 移行計画最終検証完了、全課題特定済み、実行可能
