# admin-nextjs

**Maestro Commerce 管理画面**

Next.js 15 + TypeScript + Tailwind CSS v4

## 🚀 セットアップ

```bash
npm install
```

## 🛠️ 開発

```bash
npm run dev
```

ブラウザで http://localhost:3001 を開く

## 📦 ビルド

```bash
npm run build
npm start
```

## 📁 プロジェクト構造

```
src/
├── app/                  # Next.js App Router
├── components/
│   ├── ui/              # 共通UIコンポーネント（12個）
│   └── admin/           # 管理画面専用コンポーネント
├── store/               # Zustand状態管理
├── types/               # TypeScript型定義
├── lib/                 # ユーティリティ
├── data/                # サンプルデータ
└── hooks/               # カスタムフック
```

## 🎨 使用技術

- Next.js 15.5.4
- React 19.1.0
- TypeScript 5
- Tailwind CSS 4
- Zustand 5.0.8
- react-hot-toast 2.6.0
- bcryptjs 2.4.3
- date-fns 4.1.0

## 📝 開発フェーズ

- **Week 1-2**: 環境構築・認証・基本コンポーネント ✅
- **Week 3**: 商品管理
- **Week 4**: 注文管理・ダッシュボード
- **Week 5**: 顧客・クーポン管理
- **Week 6**: グラフ・最終調整

## 🔗 関連プロジェクト

- **smartsample-nextjs**: ECサイト（顧客向け）- localhost:3000
- **storybook**: Orchestraデザインシステム - localhost:6006
