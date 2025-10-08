import Input from '@/components/ui/Input';

const meta = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'ラベルテキスト',
    },
    placeholder: {
      control: 'text',
      description: 'プレースホルダーテキスト',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url', 'date', 'time'],
      description: '入力タイプ',
    },
    error: {
      control: 'text',
      description: 'エラーメッセージ',
    },
    helperText: {
      control: 'text',
      description: 'ヘルパーテキスト',
    },
    disabled: {
      control: 'boolean',
      description: '無効状態',
    },
    required: {
      control: 'boolean',
      description: '必須フィールド',
    },
    fullWidth: {
      control: 'boolean',
      description: '全幅表示',
    },
  },
};

export default meta;

// デフォルト
export const Default = {
  args: {
    placeholder: 'テキストを入力してください',
  },
};

// ラベル付き
export const WithLabel = {
  args: {
    label: 'メールアドレス',
    placeholder: 'example@email.com',
    type: 'email',
  },
};

// ヘルパーテキスト付き
export const WithHelperText = {
  args: {
    label: 'ユーザー名',
    placeholder: 'username',
    helperText: '半角英数字で入力してください',
  },
};

// エラー状態
export const WithError = {
  args: {
    label: 'メールアドレス',
    placeholder: 'example@email.com',
    type: 'email',
    error: 'メールアドレスの形式が正しくありません',
    defaultValue: 'invalid-email',
  },
};

// 必須フィールド
export const Required = {
  args: {
    label: 'お名前',
    placeholder: '山田 太郎',
    required: true,
    helperText: '必須項目です',
  },
};

// 無効状態
export const Disabled = {
  args: {
    label: '無効なフィールド',
    placeholder: '編集できません',
    disabled: true,
    defaultValue: '固定値',
  },
};

// 全幅表示
export const FullWidth = {
  args: {
    label: '全幅入力',
    placeholder: '全幅で表示されます',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

// テキストタイプ
export const TypeText = {
  args: {
    label: 'テキスト',
    type: 'text',
    placeholder: 'テキストを入力',
  },
};

// メールタイプ
export const TypeEmail = {
  args: {
    label: 'メールアドレス',
    type: 'email',
    placeholder: 'example@email.com',
  },
};

// パスワードタイプ
export const TypePassword = {
  args: {
    label: 'パスワード',
    type: 'password',
    placeholder: 'パスワードを入力',
  },
};

// 数値タイプ
export const TypeNumber = {
  args: {
    label: '年齢',
    type: 'number',
    placeholder: '30',
    min: 0,
    max: 150,
  },
};

// 検索タイプ
export const TypeSearch = {
  args: {
    label: '検索',
    type: 'search',
    placeholder: 'キーワードで検索',
  },
};

// 電話番号タイプ
export const TypeTel = {
  args: {
    label: '電話番号',
    type: 'tel',
    placeholder: '090-1234-5678',
  },
};

// URLタイプ
export const TypeUrl = {
  args: {
    label: 'ウェブサイト',
    type: 'url',
    placeholder: 'https://example.com',
  },
};

// 日付タイプ
export const TypeDate = {
  args: {
    label: '生年月日',
    type: 'date',
  },
};

// 時刻タイプ
export const TypeTime = {
  args: {
    label: '時刻',
    type: 'time',
  },
};

// 全タイプ一覧
export const AllTypes = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input type="text" label="テキスト" placeholder="テキスト入力" />
      <Input type="email" label="メール" placeholder="example@email.com" />
      <Input type="password" label="パスワード" placeholder="パスワード" />
      <Input type="number" label="数値" placeholder="123" />
      <Input type="search" label="検索" placeholder="検索キーワード" />
      <Input type="tel" label="電話番号" placeholder="090-1234-5678" />
      <Input type="url" label="URL" placeholder="https://example.com" />
      <Input type="date" label="日付" />
      <Input type="time" label="時刻" />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// 全状態一覧
export const AllStates = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input label="通常状態" placeholder="入力してください" />
      <Input
        label="ヘルパーテキスト"
        placeholder="入力してください"
        helperText="補足情報を表示します"
      />
      <Input
        label="エラー状態"
        placeholder="入力してください"
        error="入力内容が正しくありません"
        defaultValue="エラー値"
      />
      <Input
        label="必須フィールド"
        placeholder="入力してください"
        required
        helperText="※必須項目です"
      />
      <Input
        label="無効状態"
        placeholder="編集できません"
        disabled
        defaultValue="固定値"
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// フォーム例
export const FormExample = {
  render: () => (
    <form className="space-y-4 w-96">
      <h3 className="text-lg font-semibold mb-4">お問い合わせフォーム</h3>

      <Input
        label="お名前"
        placeholder="山田 太郎"
        required
        fullWidth
      />

      <Input
        label="メールアドレス"
        type="email"
        placeholder="example@email.com"
        required
        fullWidth
        helperText="返信先のメールアドレスを入力してください"
      />

      <Input
        label="電話番号"
        type="tel"
        placeholder="090-1234-5678"
        fullWidth
        helperText="ハイフンありでも無しでも構いません"
      />

      <Input
        label="ウェブサイト"
        type="url"
        placeholder="https://yoursite.com"
        fullWidth
      />

      <div className="pt-4">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          送信
        </button>
      </div>
    </form>
  ),
  parameters: {
    layout: 'padded',
  },
};

// バリデーション例
export const ValidationExample = {
  render: () => (
    <div className="space-y-4 w-96">
      <h3 className="text-lg font-semibold mb-4">入力バリデーション例</h3>

      <Input
        label="ユーザー名（3文字以上）"
        placeholder="username"
        minLength={3}
        fullWidth
        helperText="3文字以上で入力してください"
      />

      <Input
        label="年齢（0-150）"
        type="number"
        min={0}
        max={150}
        fullWidth
        helperText="0から150の範囲で入力してください"
      />

      <Input
        label="メールアドレス（必須）"
        type="email"
        required
        fullWidth
        error="メールアドレスを入力してください"
      />

      <Input
        label="パスワード（8文字以上）"
        type="password"
        minLength={8}
        fullWidth
        helperText="8文字以上で入力してください"
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// グリッドレイアウト例
export const GridLayout = {
  render: () => (
    <div className="w-full max-w-4xl">
      <h3 className="text-lg font-semibold mb-4">配送先情報</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="姓" placeholder="山田" required fullWidth />
        <Input label="名" placeholder="太郎" required fullWidth />

        <Input
          label="郵便番号"
          placeholder="123-4567"
          fullWidth
          className="md:col-span-1"
        />
        <Input
          label="電話番号"
          type="tel"
          placeholder="090-1234-5678"
          fullWidth
        />

        <Input
          label="都道府県"
          placeholder="東京都"
          fullWidth
          className="md:col-span-2"
        />

        <Input
          label="市区町村"
          placeholder="渋谷区"
          fullWidth
          className="md:col-span-2"
        />

        <Input
          label="番地・建物名"
          placeholder="1-2-3 サンプルビル101"
          fullWidth
          className="md:col-span-2"
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
