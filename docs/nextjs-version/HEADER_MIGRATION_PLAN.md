# ヘッダー移行計画

## 📋 目的

React AppのHeaderコンポーネントをNext.js Appに完全移行し、同様の機能とデザインを実現する。

---

## 🔍 現状分析：差分確認

### React App（元）の特徴

#### 構造
- ✅ デスクトップとモバイルで**完全に分離された構造**
  - `ec-header--desktop` (hidden lg:block)
  - `ec-header--mobile` (lg:hidden)
- ✅ **ナビゲーションメニューバー** (bg-gray-800)
  - ホーム、商品一覧、カテゴリーリンク（6個）
- ✅ **MobileMenuコンポーネント**統合
  - ハンバーガーメニュー
  - ドロワー式メニュー

#### 機能
- ✅ **カートアイコン**のみ（お気に入りなし）
- ✅ **検索クエリのURL同期**
  - `useSearchParams` でURLパラメータと検索窓を同期
- ✅ **モバイル専用検索フォーム**
  - シンプルなプレースホルダー「商品を検索」

#### スタイル
- ✅ **BEM命名規則**
  - `ec-header__logo`, `ec-header__search`, etc.
- ✅ **詳細なクラス名**
  - `ec-header__cart-icon`, `ec-header__badge`, etc.

---

### Next.js App（現在）の特徴

#### 構造
- ❌ **単一構造**（デスクトップ/モバイル分離なし）
- ❌ **ナビゲーションメニューバーなし**
- ❌ **MobileMenuコンポーネントなし**

#### 機能
- ❌ **お気に入りアイコンあり**（元にはない）
- ❌ **検索クエリのURL同期なし**
  - Phase 5で`useSearchParams`を削除済み
- ✅ カート、ログイン/ログアウト機能

#### スタイル
- ❌ **シンプルなクラス名**
- ❌ BEM命名規則未適用

---

## 🎯 修正計画

### Phase 1: コンポーネント準備（所要時間: 30分）

#### 1.1 MobileMenuコンポーネントの移行
- [ ] React AppのMobileMenu.jsxを読み込み
- [ ] TypeScript化（MobileMenu.tsx）
- [ ] Next.js用に修正（react-router-dom → next/link）
- [ ] `src/components/layout/MobileMenu.tsx` に配置

#### 1.2 必要な型定義の追加
- [ ] `src/types/components.ts` にMobileMenu用の型を追加

---

### Phase 2: Headerコンポーネントの完全書き換え（所要時間: 45分）

#### 2.1 デスクトップ/モバイル分離構造の実装
```tsx
<header className="ec-header w-full">
  {/* デスクトップヘッダー */}
  <div className="ec-header--desktop hidden lg:block">
    {/* メインヘッダー */}
    <div className="bg-white">...</div>
    {/* ナビゲーションメニュー */}
    <nav className="ec-header__nav bg-gray-800 text-white">...</nav>
  </div>

  {/* モバイルメニュー */}
  <MobileMenu isOpen={isMobileMenuOpen} onClose={...} />

  {/* モバイルヘッダー */}
  <div className="ec-header--mobile lg:hidden bg-white">...</div>
</header>
```

#### 2.2 ナビゲーションバーの追加
- [ ] グレー背景 (bg-gray-800)
- [ ] 白文字 (text-white)
- [ ] ナビゲーションリンク
  - ホーム (/)
  - 商品一覧 (/products)
  - オフィス用品 (/category/office)
  - 文具 (/category/stationery)
  - 電化製品 (/category/electronics)
  - 家具 (/category/furniture)

#### 2.3 お気に入りアイコンの削除
- [ ] デスクトップヘッダーからお気に入りリンクを削除
- [ ] カート、ログイン/ログアウトのみ残す

#### 2.4 BEMクラス名の適用
```tsx
// Before
className="flex flex-col items-center"

// After
className="ec-header__cart-icon flex flex-col items-center p-2"
```

主なクラス：
- `ec-header__logo`
- `ec-header__search`
- `ec-header__search-form`
- `ec-header__search-input`
- `ec-header__search-button`
- `ec-header__actions`
- `ec-header__cart-icon`
- `ec-header__badge`
- `ec-header__login-button`
- `ec-header__mobile-toggle`
- `ec-header__nav`

#### 2.5 モバイルヘッダーの実装
- [ ] ハンバーガーメニューボタン
- [ ] ロゴ（中央配置）
- [ ] カートアイコン
- [ ] 検索フォーム（プレースホルダー: 「商品を検索」）

---

### Phase 3: 検索クエリの同期（所要時間: 20分）

#### 3.1 クライアントサイドでの同期実装
Next.jsのSSG対応のため、`useSearchParams`は使用せず、`useEffect`でクエリパラメータを取得：

```tsx
'use client';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const query = params.get('q');
      if (query) {
        setSearchQuery(query);
      } else {
        setSearchQuery('');
      }
    }
  }, [pathname]); // pathname変更時に再実行
}
```

---

### Phase 4: スタイル調整（所要時間: 15分）

#### 4.1 検索ボタンのpadding調整
```tsx
// Before
className="... px-6 ..."

// After
className="... px-4 ..."
```

#### 4.2 アイコンサイズの統一
- デスクトップ: 24x24
- モバイル: 20x20 or 24x24

#### 4.3 スペーシングの調整
```tsx
// Desktop actions
className="... space-x-4"

// Mobile header
className="... py-3 mb-3"
```

---

### Phase 5: テスト・検証（所要時間: 20分）

#### 5.1 機能テスト
- [ ] デスクトップ表示確認（lg以上）
- [ ] モバイル表示確認（lg未満）
- [ ] ナビゲーションリンク動作確認
- [ ] MobileMenu開閉確認
- [ ] 検索機能確認
- [ ] カート/ログイン/ログアウト動作確認

#### 5.2 レスポンシブテスト
- [ ] 320px（最小）
- [ ] 768px（タブレット）
- [ ] 1024px（デスクトップ）
- [ ] 1920px（大画面）

#### 5.3 アクセシビリティ確認
- [ ] キーボード操作
- [ ] フォーカス表示
- [ ] ARIA属性

---

## 📝 実装順序

### Step 1: MobileMenuコンポーネントの移行
1. React AppのMobileMenu.jsxを読み込む
2. TypeScript化
3. Next.js用にルーティングを修正
4. テスト

### Step 2: Headerコンポーネントの書き換え
1. デスクトップ/モバイル構造の分離
2. ナビゲーションバーの追加
3. お気に入りアイコンの削除
4. BEMクラス名の適用
5. モバイルヘッダーの実装

### Step 3: 検索クエリ同期の実装
1. useEffect + window.location.search
2. pathname変更時の同期

### Step 4: スタイル調整・テスト
1. 細かいスタイル調整
2. 全画面サイズでテスト
3. 動作確認

---

## 🎯 完了基準

- [ ] React AppとNext.js Appのヘッダーが**視覚的に同一**
- [ ] デスクトップ/モバイルで**適切に表示切り替え**
- [ ] **ナビゲーションメニュー**が正常動作
- [ ] **MobileMenu**が正常に開閉
- [ ] **検索クエリ**がURL同期
- [ ] **カート、ログイン/ログアウト**が正常動作
- [ ] **BEMクラス名**が適切に適用
- [ ] **TypeScriptエラー 0件**
- [ ] **ビルドエラー 0件**

---

## ⚠️ 注意事項

### Next.js固有の制約
1. **useSearchParams の使用禁止**
   - SSG対応のため、useSearchParams()は使用しない
   - window.location.searchで代替

2. **'use client' ディレクティブ必須**
   - useState, useEffectを使用するため

3. **next/link の使用**
   - react-router-domのLinkではなくnext/linkを使用

### CSS
- 既存のTailwind CSSクラスを最大限活用
- BEM命名規則を追加（機能的な意味はないが、元のコードに合わせる）

---

## 📊 見積もり時間

| Phase | タスク | 時間 |
|-------|-------|------|
| Phase 1 | MobileMenuコンポーネント移行 | 30分 |
| Phase 2 | Headerコンポーネント書き換え | 45分 |
| Phase 3 | 検索クエリ同期実装 | 20分 |
| Phase 4 | スタイル調整 | 15分 |
| Phase 5 | テスト・検証 | 20分 |
| **合計** | | **2時間10分** |

---

**作成日**: 2025年10月5日
**更新日**: 2025年10月5日
**ステータス**: 計画中 → 実装待ち
