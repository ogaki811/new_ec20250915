# 追加ページ実装計画（カート・ログイン・サインアップ）

## 概要
既存HTMLから、カート、ログイン、サインアップページのReact版を作成します。

## 📄 対象ページ

### 1. Cart（カート）
**ファイル:** `html/cart.html`
**React:** `src/pages/Cart.jsx`

### 2. Login（ログイン）
**ファイル:** `html/login.html`
**React:** `src/pages/Login.jsx`

### 3. Signup（サインアップ）
**ファイル:** `html/signup.html`
**React:** `src/pages/Signup.jsx`

---

## 🛒 1. Cart（カートページ）

### 主要機能
- カート内商品一覧表示
- 商品数量変更
- 商品削除
- 小計・送料・合計金額表示
- レジに進むボタン

### 必要なコンポーネント

#### 新規作成
1. **CartItem（Molecule）**
   - 商品画像
   - 商品名・コード
   - 価格
   - 数量変更（+/-ボタン）
   - 削除ボタン
   - 小計

2. **CartSummary（Molecule）**
   - 小計
   - 送料
   - 合計金額
   - レジに進むボタン

3. **QuantitySelector（Atom）**
   - 数量減ボタン
   - 数量表示
   - 数量増ボタン

#### 再利用
- Button（primary, secondary, outline-danger）
- Grid
- SectionHeader

### ページ構成

```jsx
// src/pages/Cart.jsx
import CartItem from '../components/molecules/CartItem';
import CartSummary from '../components/molecules/CartSummary';

function Cart() {
  const cartItems = [
    {
      id: '1',
      name: 'A4コピー用紙 5000枚',
      code: 'AWA4132',
      price: 7990,
      quantity: 2,
      image: '/img/product/AWA4132_l1.jpg',
    },
    // ...
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          ショッピングカート
        </h1>

        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            {/* カート商品一覧 */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="space-y-4">
                  {cartItems.map(item => (
                    <CartItem
                      key={item.id}
                      {...item}
                      onQuantityChange={(newQty) => {}}
                      onRemove={() => {}}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* 注文サマリー */}
            <div className="lg:col-span-1 mt-8 lg:mt-0">
              <CartSummary
                subtotal={15980}
                shipping={500}
                total={16480}
                onCheckout={() => {}}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
```

### CartItem コンポーネント

```jsx
// src/components/molecules/CartItem/index.jsx
import QuantitySelector from '../../atoms/QuantitySelector';
import Button from '../../atoms/Button';

function CartItem({
  id,
  name,
  code,
  price,
  quantity,
  image,
  onQuantityChange,
  onRemove,
}) {
  return (
    <div className="flex items-center gap-4 border-b border-gray-200 pb-4 last:border-0">
      {/* 商品画像 */}
      <img
        src={image}
        alt={name}
        className="w-24 h-24 object-cover rounded"
      />

      {/* 商品情報 */}
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-500">商品コード: {code}</p>
        <p className="text-lg font-bold text-blue-600 mt-2">
          ¥{price.toLocaleString()}
        </p>
      </div>

      {/* 数量選択 */}
      <QuantitySelector
        quantity={quantity}
        onChange={onQuantityChange}
      />

      {/* 小計 */}
      <div className="text-right">
        <p className="text-sm text-gray-500">小計</p>
        <p className="text-lg font-bold text-gray-900">
          ¥{(price * quantity).toLocaleString()}
        </p>
      </div>

      {/* 削除ボタン */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onRemove}
        aria-label="削除"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M6 18L18 6M6 6l12 12" />
        </svg>
      </Button>
    </div>
  );
}
```

### QuantitySelector コンポーネント

```jsx
// src/components/atoms/QuantitySelector/index.jsx
import Button from '../Button';

function QuantitySelector({ quantity, onChange, min = 1, max = 99 }) {
  const handleDecrease = () => {
    if (quantity > min) onChange(quantity - 1);
  };

  const handleIncrease = () => {
    if (quantity < max) onChange(quantity + 1);
  };

  return (
    <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleDecrease}
        disabled={quantity <= min}
        className="px-2"
      >
        -
      </Button>
      <span className="px-4 py-1 font-medium min-w-[3rem] text-center">
        {quantity}
      </span>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleIncrease}
        disabled={quantity >= max}
        className="px-2"
      >
        +
      </Button>
    </div>
  );
}
```

### CartSummary コンポーネント

```jsx
// src/components/molecules/CartSummary/index.jsx
import Button from '../../atoms/Button';

function CartSummary({ subtotal, shipping, total, onCheckout }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        注文サマリー
      </h2>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>小計</span>
          <span>¥{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>送料</span>
          <span>¥{shipping.toLocaleString()}</span>
        </div>
        <div className="border-t pt-3 flex justify-between text-lg font-bold text-gray-900">
          <span>合計</span>
          <span>¥{total.toLocaleString()}</span>
        </div>
      </div>

      <Button
        variant="primary"
        size="lg"
        fullWidth
        onClick={onCheckout}
      >
        レジに進む
      </Button>

      <div className="mt-4 text-center">
        <Button variant="link" size="sm">
          買い物を続ける
        </Button>
      </div>
    </div>
  );
}
```

---

## 🔐 2. Login（ログインページ）

### 主要機能
- メールアドレス・パスワード入力
- ログインボタン
- パスワード忘れリンク
- 新規登録リンク
- SNSログイン（UI のみ）

### 必要なコンポーネント

#### 新規作成
1. **LoginForm（Organism）**
   - メールアドレス入力
   - パスワード入力
   - ログインボタン
   - パスワード忘れリンク

2. **SocialLogin（Molecule）**
   - Google ログインボタン
   - Facebook ログインボタン
   - その他SNSボタン

#### 再利用
- Input
- Button（primary, link）

### ページ構成

```jsx
// src/pages/Login.jsx
import { Link } from 'react-router-dom';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';

function Login() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* ロゴ */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">ログイン</h1>
          <p className="mt-2 text-sm text-gray-600">
            アカウントにログインしてください
          </p>
        </div>

        {/* ログインフォーム */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <form className="space-y-6">
            <Input
              type="email"
              label="メールアドレス"
              placeholder="example@email.com"
            />

            <Input
              type="password"
              label="パスワード"
              placeholder="••••••••"
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">
                  ログイン状態を保持
                </span>
              </label>

              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                パスワードを忘れた方
              </Link>
            </div>

            <Button variant="primary" size="lg" fullWidth type="submit">
              ログイン
            </Button>
          </form>

          {/* 区切り線 */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">または</span>
            </div>
          </div>

          {/* SNSログイン */}
          <div className="space-y-3">
            <Button variant="secondary" fullWidth>
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                {/* Google icon */}
              </svg>
              Googleでログイン
            </Button>

            <Button variant="secondary" fullWidth>
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                {/* Facebook icon */}
              </svg>
              Facebookでログイン
            </Button>
          </div>
        </div>

        {/* 新規登録リンク */}
        <p className="mt-6 text-center text-sm text-gray-600">
          アカウントをお持ちでない方{' '}
          <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-800">
            新規登録
          </Link>
        </p>
      </div>
    </main>
  );
}
```

---

## 📝 3. Signup（サインアップページ）

### 主要機能
- 個人情報入力フォーム
  - 氏名（姓・名）
  - メールアドレス
  - パスワード
  - パスワード確認
  - 電話番号
  - 住所（郵便番号・都道府県・市区町村・番地）
- 利用規約同意チェックボックス
- 登録ボタン

### 必要なコンポーネント

#### 新規作成
1. **SignupForm（Organism）**
   - 複数の Input フィールド
   - パスワード強度表示
   - 利用規約同意

2. **PasswordStrength（Molecule）**
   - パスワード強度インジケーター

#### 再利用
- Input
- Select（都道府県選択）
- Button（primary, link）

### ページ構成

```jsx
// src/pages/Signup.jsx
import { Link } from 'react-router-dom';
import Input from '../components/atoms/Input';
import Select from '../components/atoms/Select';
import Button from '../components/atoms/Button';

function Signup() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">新規会員登録</h1>
          <p className="mt-2 text-sm text-gray-600">
            必要事項を入力してアカウントを作成してください
          </p>
        </div>

        {/* 登録フォーム */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <form className="space-y-6">
            {/* 氏名 */}
            <div className="grid grid-cols-2 gap-4">
              <Input label="姓" placeholder="山田" required />
              <Input label="名" placeholder="太郎" required />
            </div>

            {/* メールアドレス */}
            <Input
              type="email"
              label="メールアドレス"
              placeholder="example@email.com"
              required
            />

            {/* パスワード */}
            <div>
              <Input
                type="password"
                label="パスワード"
                placeholder="8文字以上の英数字"
                required
              />
              {/* パスワード強度インジケーター */}
              <div className="mt-2 flex gap-1">
                <div className="h-1 flex-1 bg-red-500 rounded"></div>
                <div className="h-1 flex-1 bg-gray-200 rounded"></div>
                <div className="h-1 flex-1 bg-gray-200 rounded"></div>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                パスワード強度: 弱
              </p>
            </div>

            {/* パスワード確認 */}
            <Input
              type="password"
              label="パスワード（確認）"
              placeholder="パスワードを再入力"
              required
            />

            {/* 電話番号 */}
            <Input
              type="tel"
              label="電話番号"
              placeholder="090-1234-5678"
              required
            />

            {/* 住所 */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700">住所</h3>

              <Input
                type="text"
                label="郵便番号"
                placeholder="123-4567"
              />

              <Select
                label="都道府県"
                options={[
                  { value: '', label: '選択してください' },
                  { value: 'tokyo', label: '東京都' },
                  { value: 'osaka', label: '大阪府' },
                  // ...
                ]}
              />

              <Input
                label="市区町村"
                placeholder="渋谷区"
              />

              <Input
                label="番地・建物名"
                placeholder="神南1-1-1 ABCビル101"
              />
            </div>

            {/* 利用規約同意 */}
            <div className="flex items-start">
              <input
                type="checkbox"
                className="w-4 h-4 mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                required
              />
              <label className="ml-2 text-sm text-gray-600">
                <Link to="/terms" className="text-blue-600 hover:text-blue-800">
                  利用規約
                </Link>
                と
                <Link to="/privacy" className="text-blue-600 hover:text-blue-800">
                  プライバシーポリシー
                </Link>
                に同意します
              </label>
            </div>

            <Button variant="primary" size="lg" fullWidth type="submit">
              登録する
            </Button>
          </form>
        </div>

        {/* ログインリンク */}
        <p className="mt-6 text-center text-sm text-gray-600">
          すでにアカウントをお持ちの方{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-800">
            ログイン
          </Link>
        </p>
      </div>
    </main>
  );
}
```

---

## 📋 実装順序

### Phase 1: Atoms（基礎コンポーネント）
1. ✅ Button
2. ✅ Badge
3. ✅ Input
4. ✅ Select
5. ✅ QuantitySelector（新規）

### Phase 2: Molecules（複合コンポーネント）
1. ✅ ProductCard
2. **CartItem**（新規）
3. **CartSummary**（新規）
4. **PasswordStrength**（新規）

### Phase 3: ページ実装
1. **Cart**（カートページ）
2. **Login**（ログインページ）
3. **Signup**（サインアップページ）

---

## 🎯 追加コンポーネント一覧

| コンポーネント | 種類 | 用途 | 優先度 |
|--------------|------|------|--------|
| QuantitySelector | Atom | 数量選択 | 高 |
| CartItem | Molecule | カート商品アイテム | 高 |
| CartSummary | Molecule | 注文サマリー | 高 |
| PasswordStrength | Molecule | パスワード強度表示 | 中 |
| EmptyCart | Molecule | 空カート表示 | 中 |
| SocialLoginButton | Atom | SNSログインボタン | 低 |

---

## 🔄 ルーティング追加

```jsx
// src/App.jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/cart" element={<Cart />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/mypage" element={<MyPage />} />
  <Route path="/order-history" element={<OrderHistory />} />
  <Route path="/favorites" element={<Favorites />} />
  <Route path="/coming-soon" element={<ComingSoon />} />
</Routes>
```

---

## ✅ 完成基準

- [x] 計画書作成
- [ ] QuantitySelector 実装
- [ ] CartItem 実装
- [ ] CartSummary 実装
- [ ] Cart ページ実装
- [ ] Login ページ実装
- [ ] Signup ページ実装
- [ ] ルーティング設定
- [ ] 動作確認

---

## 🚀 次のアクション

1. QuantitySelector コンポーネント実装
2. CartItem, CartSummary コンポーネント実装
3. Cart ページ実装
4. Login ページ実装
5. Signup ページ実装
6. App.jsx にルーティング追加
