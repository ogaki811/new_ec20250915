import Button from '@/components/ui/Button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
      description: 'ボタンのスタイルバリエーション',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'ボタンのサイズ',
    },
    fullWidth: {
      control: 'boolean',
      description: '全幅表示',
    },
    loading: {
      control: 'boolean',
      description: 'ローディング状態',
    },
    disabled: {
      control: 'boolean',
      description: '無効状態',
    },
    children: {
      control: 'text',
      description: 'ボタンのテキスト',
    },
  },
};

export default meta;

// デフォルト
export const Default = {
  args: {
    children: 'ボタン',
    variant: 'primary',
    size: 'md',
  },
};

// Variants（バリエーション）
export const Primary = {
  args: {
    children: 'プライマリ',
    variant: 'primary',
  },
};

export const Secondary = {
  args: {
    children: 'セカンダリ',
    variant: 'secondary',
  },
};

export const Outline = {
  args: {
    children: 'アウトライン',
    variant: 'outline',
  },
};

export const Ghost = {
  args: {
    children: 'ゴースト',
    variant: 'ghost',
  },
};

export const Danger = {
  args: {
    children: '削除',
    variant: 'danger',
  },
};

// Sizes（サイズ）
export const Small = {
  args: {
    children: '小サイズ',
    size: 'sm',
  },
};

export const Medium = {
  args: {
    children: '中サイズ',
    size: 'md',
  },
};

export const Large = {
  args: {
    children: '大サイズ',
    size: 'lg',
  },
};

// States（状態）
export const Loading = {
  args: {
    children: '読み込み中...',
    loading: true,
  },
};

export const Disabled = {
  args: {
    children: '無効',
    disabled: true,
  },
};

export const FullWidth = {
  args: {
    children: '全幅ボタン',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

// 全バリエーションの組み合わせ例
export const AllVariants = {
  render: () => (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        <Button variant="primary">プライマリ</Button>
        <Button variant="secondary">セカンダリ</Button>
        <Button variant="outline">アウトライン</Button>
        <Button variant="ghost">ゴースト</Button>
        <Button variant="danger">削除</Button>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const AllSizes = {
  render: () => (
    <div className="flex items-center gap-2">
      <Button size="sm">小</Button>
      <Button size="md">中</Button>
      <Button size="lg">大</Button>
    </div>
  ),
};

// アイコン付きボタン例
export const WithIcon = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Button>
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        追加
      </Button>
      <Button variant="secondary">
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
        編集
      </Button>
      <Button variant="danger">
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
        削除
      </Button>
    </div>
  ),
};

// ボタングループ例
export const ButtonGroup = {
  render: () => (
    <div className="space-y-4">
      {/* 水平配置 */}
      <div className="flex gap-2">
        <Button variant="outline">キャンセル</Button>
        <Button>保存</Button>
      </div>

      {/* 垂直配置 */}
      <div className="flex flex-col gap-2 w-64">
        <Button fullWidth>ログイン</Button>
        <Button variant="outline" fullWidth>
          新規登録
        </Button>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
