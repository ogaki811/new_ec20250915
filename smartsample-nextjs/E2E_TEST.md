# E2Eテスト実行ガイド

このドキュメントでは、CypressによるE2Eテストの実行方法について説明します。

## 目次

- [前提条件](#前提条件)
- [テスト実行方法](#テスト実行方法)
- [テスト内容](#テスト内容)
- [テスト結果の確認](#テスト結果の確認)
- [トラブルシューティング](#トラブルシューティング)

## 前提条件

1. Node.jsがインストールされていること（v20以上推奨）
2. 依存パッケージがインストールされていること

```bash
npm install
```

## テスト実行方法

### 1. 開発サーバーの起動

テストを実行する前に、開発サーバーを起動してください。

```bash
# Turbopackなしモード（推奨）
npx next dev

# または、別のターミナルで
npm run dev
```

サーバーが `http://localhost:3000` で起動していることを確認してください。

### 2. E2Eテストの実行

#### ヘッドレスモードで実行（CI/CD向け）

```bash
npm run e2e
```

または

```bash
npm run cypress:headless
```

#### Cypress UIで実行（開発時）

```bash
npm run cypress
```

このコマンドでCypress Test Runnerが起動し、テストを視覚的に確認しながら実行できます。

## テスト内容

現在のE2Eテストでは以下のページと機能をテストしています：

### ページテスト

| テスト項目 | URL | 説明 |
|---------|-----|------|
| TOPページ | `/` | メインビジュアル、ヘッダー、フッターの表示確認 |
| 商品一覧ページ | `/products` | 商品カードの表示確認 |
| 商品詳細ページ | `/products/1` | 商品名、カートに追加ボタンの表示確認 |
| カートページ | `/cart` | カート状態の表示確認 |
| お気に入りページ | `/favorites` | ページの表示確認 |
| マイページ | `/mypage` | ページの表示確認 |

### 機能テスト

- **ナビゲーションテスト**: ヘッダーのナビゲーションリンク動作確認
- **レスポンシブテスト**:
  - モバイル（375x667）
  - タブレット（768x1024）
  - デスクトップ（1280x720）

## テスト結果の確認

### テスト実行結果

テスト実行後、以下の情報がターミナルに表示されます：

```
Tests:        15
Passing:      12
Failing:      3
Pending:      0
Skipped:      0
Duration:     40 seconds
```

### スクリーンショット

失敗したテストのスクリーンショットは以下のディレクトリに保存されます：

```
cypress/screenshots/pages.cy.ts/
```

### ビデオ録画（オプション）

ビデオ録画を有効にする場合は、`cypress.config.ts`を編集してください：

```typescript
export default defineConfig({
  e2e: {
    // ...
  },
  video: true, // falseからtrueに変更
});
```

ビデオは以下のディレクトリに保存されます：

```
cypress/videos/
```

## 現在の既知の問題

以下のテストは現在失敗します（仕様により）：

1. **TOPページ - "Welcome to"テキストテスト**
   - TOPページに該当テキストが存在しないため

2. **注文履歴ページ (`/orders`)**
   - 実際のルートは `/mypage/orders` です

3. **お届け先情報ページ (`/shipping`)**
   - このページは未実装です

## トラブルシューティング

### Cypress検証エラー

初回実行時にCypress検証エラーが発生した場合：

```bash
npx cypress verify
```

### ポート3000が使用中

開発サーバーが起動できない場合：

```bash
# プロセスを確認
lsof -ti:3000

# プロセスを終了
lsof -ti:3000 | xargs kill -9
```

### Turbopackフォントエラー

Turbopackでフォント関連のエラーが発生する場合は、Turbopackなしで起動：

```bash
npx next dev
```

## テストファイルの場所

- **設定ファイル**: `cypress.config.ts`
- **テストファイル**: `cypress/e2e/pages.cy.ts`
- **サポートファイル**: `cypress/support/e2e.ts`, `cypress/support/commands.ts`

## カスタムテストの追加

新しいテストを追加する場合は、`cypress/e2e/` ディレクトリに `.cy.ts` ファイルを作成してください。

例：

```typescript
// cypress/e2e/checkout.cy.ts
describe('チェックアウトフロー', () => {
  it('商品をカートに追加して購入できる', () => {
    cy.visit('/products/1');
    cy.contains('カートに追加').click();
    cy.visit('/cart');
    cy.contains('ご注文手続きへ').click();
    // ...
  });
});
```

## 参考リンク

- [Cypress公式ドキュメント](https://docs.cypress.io/)
- [Next.js E2Eテストガイド](https://nextjs.org/docs/testing#cypress)
