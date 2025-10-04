# 状態管理実装 - Zustand

最終更新日: 2025-10-04

## 概要

Zustandを使用してグローバル状態管理を実装しました。

## 📦 インストール済みパッケージ

```bash
npm install zustand
```

## 🗂️ Store構成

### 1. useCartStore - カート管理

**ファイル:** `src/store/useCartStore.js`

**State:**
- `items`: カート内商品配列

**Actions:**
- `addItem(product)`: 商品をカートに追加
- `removeItem(productId)`: 商品をカートから削除
- `updateQuantity(productId, quantity)`: 数量を更新
- `clearCart()`: カートを空にする

**Computed Values:**
- `getTotal()`: 小計を計算
- `getItemCount()`: 商品数を計算
- `getShippingFee()`: 配送料を計算（3000円未満は500円）
- `getGrandTotal()`: 合計金額を計算

**LocalStorage連携:**
- `cart-storage` キーで永続化

#### 使用例

```jsx
import useCartStore from '../store/useCartStore';

function Cart() {
  const { items, updateQuantity, removeItem, getTotal } = useCartStore();

  return (
    <div>
      {items.map(item => (
        <CartItem
          key={item.id}
          item={item}
          onQuantityChange={updateQuantity}
          onRemove={removeItem}
        />
      ))}
      <p>合計: ¥{getTotal()}</p>
    </div>
  );
}
```

### 2. useFavoritesStore - お気に入り管理

**ファイル:** `src/store/useFavoritesStore.js`

**State:**
- `favorites`: お気に入り商品配列

**Actions:**
- `addFavorite(product)`: お気に入りに追加
- `removeFavorite(productId)`: お気に入りから削除
- `toggleFavorite(product)`: お気に入り状態を切り替え
- `isFavorite(productId)`: お気に入りか判定
- `clearFavorites()`: お気に入りをクリア

**Computed Values:**
- `getFavoriteCount()`: お気に入り数を取得

**LocalStorage連携:**
- `favorites-storage` キーで永続化

#### 使用例

```jsx
import useFavoritesStore from '../store/useFavoritesStore';

function ProductCard({ product }) {
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const isFav = isFavorite(product.id);

  return (
    <div>
      <button onClick={() => toggleFavorite(product)}>
        {isFav ? '❤️' : '♡'}
      </button>
    </div>
  );
}
```

### 3. useAuthStore - 認証管理

**ファイル:** `src/store/useAuthStore.js`

**State:**
- `user`: ユーザー情報オブジェクト
- `isAuthenticated`: 認証状態（boolean）

**Actions:**
- `login(userData)`: ログイン
- `logout()`: ログアウト
- `updateUser(userData)`: ユーザー情報を更新
- `isLoggedIn()`: ログイン状態を確認

**LocalStorage連携:**
- `auth-storage` キーで永続化

#### 使用例

```jsx
import useAuthStore from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email: 'user@example.com', name: '山田太郎' });
    navigate('/mypage');
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

## 🔗 連携済みコンポーネント

### Header.jsx
- カートアイテム数をバッジ表示
- お気に入り数を表示（予定）

```jsx
const itemCount = useCartStore((state) => state.getItemCount());
const favoriteCount = useFavoritesStore((state) => state.getFavoriteCount());
```

### ProductCard.jsx
- カート追加機能
- お気に入りトグル機能

```jsx
const addItem = useCartStore((state) => state.addItem);
const { toggleFavorite, isFavorite } = useFavoritesStore();
```

### Cart.jsx
- カート全機能（追加・削除・数量変更・合計計算）
- LocalStorageから自動復元

```jsx
const { items, updateQuantity, removeItem, getTotal, getShippingFee, getGrandTotal } = useCartStore();
```

### Favorites.jsx
- お気に入り商品一覧表示
- 空の状態表示

```jsx
const favorites = useFavoritesStore((state) => state.favorites);
```

### Login.jsx
- ログイン処理
- マイページへリダイレクト

```jsx
const login = useAuthStore((state) => state.login);
```

## 🎯 実装済み機能

### ✅ カート機能
- [x] 商品追加
- [x] 数量変更
- [x] 商品削除
- [x] 小計・送料・合計計算
- [x] LocalStorage永続化
- [x] ヘッダーバッジ表示

### ✅ お気に入り機能
- [x] お気に入り追加/削除
- [x] お気に入り一覧表示
- [x] LocalStorage永続化
- [x] ハートアイコン切り替え

### ✅ 認証機能
- [x] ログイン
- [x] ログアウト（実装予定）
- [x] ユーザー情報表示（実装予定）
- [x] LocalStorage永続化

## 📈 次のステップ

### 未実装機能
- [ ] Headerでお気に入り数を表示
- [ ] ログアウト機能
- [ ] MyPageでユーザー情報表示
- [ ] Protected Route（未ログイン時のリダイレクト）
- [ ] カート商品の在庫チェック
- [ ] お気に入りからカートへの一括追加

### UI/UX改善
- [ ] カート追加時のトースト通知
- [ ] ローディング状態の表示
- [ ] エラーハンドリング
- [ ] アニメーション追加

## 🔧 技術詳細

### Zustand Middleware

**Persist Middleware:**
```js
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set, get) => ({
      // state and actions
    }),
    {
      name: 'storage-key',
    }
  )
);
```

### セレクター最適化

効率的な状態取得:
```js
// 👍 Good - 必要な値のみ取得
const itemCount = useCartStore((state) => state.getItemCount());

// 👎 Bad - 全体を取得（不要な再レンダリング）
const { items } = useCartStore();
const itemCount = items.length;
```

## 🚀 パフォーマンス

### LocalStorage
- 自動保存/読み込み
- ブラウザ再起動後もデータ保持

### 再レンダリング最適化
- セレクター関数で必要な値のみ取得
- Computed valuesでメモ化

## 📚 参考資料

- [Zustand公式ドキュメント](https://zustand-demo.pmnd.rs/)
- [Zustand GitHub](https://github.com/pmndrs/zustand)
