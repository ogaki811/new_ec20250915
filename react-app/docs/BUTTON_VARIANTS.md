# ボタンバリエーション定義

## 概要
ECサイト全体で使用するボタンのバリエーションを統一定義します。
すべてのボタンは1つの`Button`コンポーネントで実装し、Propsでバリエーションを制御します。

## 🎨 ボタンバリエーション一覧

### 1. Primary（主要アクション）
**用途:** カートに追加、検索、ログイン、送信など

**スタイル:**
```jsx
<Button variant="primary">
  カートに追加
</Button>
```

**Tailwind クラス:**
```
bg-blue-600 text-white hover:bg-blue-700 transition-colors
```

**使用例:**
- カートに追加ボタン
- 検索ボタン
- ログイン/サインアップボタン
- フォーム送信ボタン

---

### 2. Secondary（副次的アクション）
**用途:** キャンセル、戻る、詳細を見るなど

**スタイル:**
```jsx
<Button variant="secondary">
  詳細を見る
</Button>
```

**Tailwind クラス:**
```
border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 transition-colors
```

**使用例:**
- 詳細を見るボタン
- キャンセルボタン
- 戻るボタン
- ページネーション（非アクティブ）

---

### 3. Outline（枠線・強調）
**用途:** 補助的な重要アクション

**スタイル:**
```jsx
<Button variant="outline">
  再注文
</Button>
```

**Tailwind クラス:**
```
border-2 border-blue-600 text-blue-600 bg-transparent hover:bg-blue-600 hover:text-white transition-colors
```

**使用例:**
- 追跡ボタン
- 再注文ボタン
- レシート表示ボタン
- レビュー投稿ボタン

---

### 4. Outline Danger（枠線・危険）
**用途:** 削除、キャンセルなどの破壊的アクション

**スタイル:**
```jsx
<Button variant="outline-danger">
  注文をキャンセル
</Button>
```

**Tailwind クラス:**
```
border-2 border-red-600 text-red-600 bg-transparent hover:bg-red-600 hover:text-white transition-colors
```

**使用例:**
- 注文キャンセルボタン
- 削除ボタン
- お気に入り解除ボタン

---

### 5. Ghost（透明・控えめ）
**用途:** 控えめなアクション、ドロップダウン内など

**スタイル:**
```jsx
<Button variant="ghost">
  もっと見る
</Button>
```

**Tailwind クラス:**
```
bg-transparent text-gray-700 hover:bg-gray-100 transition-colors
```

**使用例:**
- ドロップダウン内のボタン
- もっと見るボタン
- 折りたたみトグル

---

### 6. Link（リンクスタイル）
**用途:** テキストリンク風のボタン

**スタイル:**
```jsx
<Button variant="link">
  すべて見る →
</Button>
```

**Tailwind クラス:**
```
bg-transparent text-blue-600 hover:text-blue-800 transition-colors underline-offset-2 hover:underline
```

**使用例:**
- すべて見るリンク
- もっと見るリンク
- ヘルプリンク

---

### 7. Icon（アイコンのみ）
**用途:** アイコンのみのボタン

**スタイル:**
```jsx
<Button variant="icon" size="icon">
  <HeartIcon />
</Button>
```

**Tailwind クラス:**
```
bg-white p-2 rounded-full shadow hover:bg-gray-100 hover:scale-110 transition-all
```

**使用例:**
- お気に入りボタン
- 閉じるボタン
- メニュートグル

---

### 8. Icon Filled（アイコンのみ・塗りつぶし）
**用途:** アイコンのみ、背景あり

**スタイル:**
```jsx
<Button variant="icon-filled" size="icon">
  <SearchIcon />
</Button>
```

**Tailwind クラス:**
```
bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors
```

**使用例:**
- 検索アイコンボタン
- ナビゲーションアイコン

---

## 📏 サイズバリエーション

### sm（小）
**Padding:** `px-3 py-1.5`
**Font Size:** `text-sm`

**使用例:**
- ページネーション
- タグ
- フィルターボタン

```jsx
<Button variant="primary" size="sm">
  適用
</Button>
```

---

### md（中）- デフォルト
**Padding:** `px-4 py-2`
**Font Size:** `text-base`

**使用例:**
- 通常のボタン
- フォームボタン

```jsx
<Button variant="primary" size="md">
  カートに追加
</Button>
```

---

### lg（大）
**Padding:** `px-6 py-3`
**Font Size:** `text-lg`

**使用例:**
- 主要なCTA
- ランディングページ
- モーダルの主要ボタン

```jsx
<Button variant="primary" size="lg">
  今すぐ購入
</Button>
```

---

### icon（アイコン専用）
**Padding:** `p-2` (正方形)
**Size:** `w-10 h-10` (デフォルト)

```jsx
<Button variant="icon" size="icon">
  <HeartIcon className="w-5 h-5" />
</Button>
```

---

## 🔄 状態バリエーション

### Disabled（無効）
```jsx
<Button variant="primary" disabled>
  カートに追加
</Button>
```

**スタイル:**
```
disabled:opacity-50 disabled:cursor-not-allowed
```

---

### Loading（ローディング）
```jsx
<Button variant="primary" loading>
  送信中...
</Button>
```

**動作:**
- ボタンテキストを「送信中...」に変更
- スピナーアイコンを表示
- クリック無効化

---

### Active（アクティブ）
```jsx
<Button variant="secondary" active>
  1
</Button>
```

**スタイル（ページネーション用）:**
```
bg-blue-600 text-white
```

---

## 🎯 完全なProps定義

```typescript
interface ButtonProps {
  // バリエーション
  variant?: 'primary' | 'secondary' | 'outline' | 'outline-danger' | 'ghost' | 'link' | 'icon' | 'icon-filled';

  // サイズ
  size?: 'sm' | 'md' | 'lg' | 'icon';

  // 状態
  disabled?: boolean;
  loading?: boolean;
  active?: boolean;

  // レイアウト
  fullWidth?: boolean;  // w-full

  // イベント
  onClick?: () => void;

  // その他
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  children?: ReactNode;
  leftIcon?: ReactNode;   // 左アイコン
  rightIcon?: ReactNode;  // 右アイコン
}
```

---

## 💻 実装例

### Button コンポーネント

```jsx
// src/components/atoms/Button/index.jsx
export default function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  active = false,
  fullWidth = false,
  type = 'button',
  onClick,
  className = '',
  children,
  leftIcon,
  rightIcon,
  ...props
}) {
  // バリアントスタイル
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50',
    outline: 'border-2 border-blue-600 text-blue-600 bg-transparent hover:bg-blue-600 hover:text-white',
    'outline-danger': 'border-2 border-red-600 text-red-600 bg-transparent hover:bg-red-600 hover:text-white',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
    link: 'bg-transparent text-blue-600 hover:text-blue-800 hover:underline underline-offset-2',
    icon: 'bg-white p-2 rounded-full shadow hover:bg-gray-100 hover:scale-110',
    'icon-filled': 'bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700',
  };

  // サイズスタイル
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    icon: 'p-2 w-10 h-10',
  };

  // アクティブスタイル（ページネーション用）
  const activeStyle = active && variant === 'secondary' ? 'bg-blue-600 text-white hover:bg-blue-600' : '';

  // ベーススタイル
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium transition-colors rounded-lg disabled:opacity-50 disabled:cursor-not-allowed';

  // 幅スタイル
  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${widthStyle}
        ${activeStyle}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {leftIcon && <span className="flex items-center">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="flex items-center">{rightIcon}</span>}
    </button>
  );
}
```

---

## 📋 使用例

### 商品カード内
```jsx
<Button variant="primary" size="sm" fullWidth>
  カートに追加
</Button>
```

### 注文履歴
```jsx
<div className="flex gap-2">
  <Button variant="outline" size="sm">追跡</Button>
  <Button variant="outline" size="sm">再注文</Button>
  <Button variant="outline" size="sm">レシート</Button>
</div>

<Button variant="outline-danger" size="sm">
  キャンセル
</Button>
```

### ページネーション
```jsx
<div className="flex gap-2">
  <Button variant="secondary" size="sm" disabled>前へ</Button>
  <Button variant="secondary" size="sm" active>1</Button>
  <Button variant="secondary" size="sm">2</Button>
  <Button variant="secondary" size="sm">3</Button>
  <Button variant="secondary" size="sm">次へ</Button>
</div>
```

### ヘッダー検索
```jsx
<Button variant="primary" type="submit">
  検索
</Button>
```

### お気に入りボタン
```jsx
<Button variant="icon" size="icon">
  <HeartIcon className="w-5 h-5" />
</Button>
```

### ローディング付きボタン
```jsx
<Button variant="primary" loading>
  処理中...
</Button>
```

### アイコン付きボタン
```jsx
<Button
  variant="primary"
  leftIcon={<ShoppingCartIcon className="w-5 h-5" />}
>
  カートに追加
</Button>
```

---

## 🎨 カラーバリエーション（拡張可能）

将来的に色違いが必要な場合は、`color` propを追加：

```jsx
<Button variant="primary" color="blue">ボタン</Button>
<Button variant="primary" color="green">ボタン</Button>
<Button variant="primary" color="red">ボタン</Button>
```

現時点では青色（blue-600）を基本とし、危険なアクションのみ赤色（red-600）を使用。

---

## ✅ バリアント一覧表

| バリアント | 背景 | 文字色 | 枠線 | ホバー | 用途 |
|-----------|------|--------|------|--------|------|
| primary | blue-600 | white | なし | bg-blue-700 | 主要アクション |
| secondary | white | gray-700 | gray-300 | bg-gray-50 | 副次的アクション |
| outline | transparent | blue-600 | blue-600 (2px) | bg-blue-600 + white | 補助的重要アクション |
| outline-danger | transparent | red-600 | red-600 (2px) | bg-red-600 + white | 破壊的アクション |
| ghost | transparent | gray-700 | なし | bg-gray-100 | 控えめなアクション |
| link | transparent | blue-600 | なし | text-blue-800 + underline | リンク風 |
| icon | white | inherit | なし | bg-gray-100 + scale-110 | アイコンのみ |
| icon-filled | blue-600 | white | なし | bg-blue-700 | アイコンのみ（塗り） |

---

## 🚀 次のステップ

1. ✅ ボタンバリアント定義完了
2. ⏳ Button コンポーネント実装
3. ⏳ Storybook でプレビュー（オプション）
4. ⏳ 既存ページのボタンをすべて統一コンポーネントに置き換え
