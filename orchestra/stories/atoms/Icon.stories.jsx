import Icon from '@/components/ui/Icon';

const meta = {
  title: 'Atoms/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: [
        'home', 'search', 'cart', 'heart', 'user',
        'check', 'close', 'plus', 'minus', 'trash',
        'arrowLeft', 'arrowRight', 'arrowUp', 'arrowDown',
        'info', 'alert',
        'menu', 'star', 'mail',
        'creditCard', 'bank', 'truck', 'package',
      ],
      description: 'アイコン名',
    },
    size: {
      control: 'number',
      description: 'アイコンサイズ（px）',
    },
    color: {
      control: 'color',
      description: 'アイコン色',
    },
    strokeWidth: {
      control: 'number',
      description: '線の太さ',
    },
  },
};

export default meta;

// デフォルト
export const Default = {
  args: {
    name: 'home',
  },
};

// サイズバリエーション
export const Sizes = {
  render: () => (
    <div className="flex items-end gap-4">
      <Icon name="home" size={16} />
      <Icon name="home" size={24} />
      <Icon name="home" size={32} />
      <Icon name="home" size={48} />
      <Icon name="home" size={64} />
    </div>
  ),
};

// 色バリエーション
export const Colors = {
  render: () => (
    <div className="flex gap-4">
      <Icon name="heart" size={32} color="#000000" />
      <Icon name="heart" size={32} color="#ef4444" />
      <Icon name="heart" size={32} color="#3b82f6" />
      <Icon name="heart" size={32} color="#10b981" />
      <Icon name="heart" size={32} color="#f59e0b" />
      <Icon name="heart" size={32} color="#8b5cf6" />
    </div>
  ),
};

// 線の太さバリエーション
export const StrokeWidths = {
  render: () => (
    <div className="flex gap-4">
      <Icon name="star" size={32} strokeWidth={1} />
      <Icon name="star" size={32} strokeWidth={2} />
      <Icon name="star" size={32} strokeWidth={3} />
      <Icon name="star" size={32} strokeWidth={4} />
    </div>
  ),
};

// ナビゲーションアイコン
export const NavigationIcons = {
  render: () => (
    <div className="grid grid-cols-5 gap-6">
      {['home', 'search', 'cart', 'heart', 'user'].map((icon) => (
        <div key={icon} className="flex flex-col items-center gap-2">
          <Icon name={icon} size={32} />
          <span className="text-xs text-gray-600">{icon}</span>
        </div>
      ))}
    </div>
  ),
};

// アクションアイコン
export const ActionIcons = {
  render: () => (
    <div className="grid grid-cols-5 gap-6">
      {['check', 'close', 'plus', 'minus', 'trash'].map((icon) => (
        <div key={icon} className="flex flex-col items-center gap-2">
          <Icon name={icon} size={32} />
          <span className="text-xs text-gray-600">{icon}</span>
        </div>
      ))}
    </div>
  ),
};

// 矢印アイコン
export const ArrowIcons = {
  render: () => (
    <div className="grid grid-cols-4 gap-6">
      {['arrowLeft', 'arrowRight', 'arrowUp', 'arrowDown'].map((icon) => (
        <div key={icon} className="flex flex-col items-center gap-2">
          <Icon name={icon} size={32} />
          <span className="text-xs text-gray-600">{icon}</span>
        </div>
      ))}
    </div>
  ),
};

// ステータスアイコン
export const StatusIcons = {
  render: () => (
    <div className="grid grid-cols-2 gap-6">
      {['info', 'alert'].map((icon) => (
        <div key={icon} className="flex flex-col items-center gap-2">
          <Icon name={icon} size={32} />
          <span className="text-xs text-gray-600">{icon}</span>
        </div>
      ))}
    </div>
  ),
};

// その他アイコン
export const OtherIcons = {
  render: () => (
    <div className="grid grid-cols-3 gap-6">
      {['menu', 'star', 'mail'].map((icon) => (
        <div key={icon} className="flex flex-col items-center gap-2">
          <Icon name={icon} size={32} />
          <span className="text-xs text-gray-600">{icon}</span>
        </div>
      ))}
    </div>
  ),
};

// 支払・配送アイコン
export const PaymentShippingIcons = {
  render: () => (
    <div className="grid grid-cols-4 gap-6">
      {['creditCard', 'bank', 'truck', 'package'].map((icon) => (
        <div key={icon} className="flex flex-col items-center gap-2">
          <Icon name={icon} size={32} />
          <span className="text-xs text-gray-600">{icon}</span>
        </div>
      ))}
    </div>
  ),
};

// 全アイコン一覧
export const AllIcons = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3">ナビゲーション</h3>
        <div className="grid grid-cols-5 gap-4">
          {['home', 'search', 'cart', 'heart', 'user'].map((icon) => (
            <div key={icon} className="flex flex-col items-center gap-2 p-3 border rounded hover:bg-gray-50">
              <Icon name={icon} size={28} />
              <span className="text-xs text-gray-600">{icon}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">アクション</h3>
        <div className="grid grid-cols-5 gap-4">
          {['check', 'close', 'plus', 'minus', 'trash'].map((icon) => (
            <div key={icon} className="flex flex-col items-center gap-2 p-3 border rounded hover:bg-gray-50">
              <Icon name={icon} size={28} />
              <span className="text-xs text-gray-600">{icon}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">矢印</h3>
        <div className="grid grid-cols-4 gap-4">
          {['arrowLeft', 'arrowRight', 'arrowUp', 'arrowDown'].map((icon) => (
            <div key={icon} className="flex flex-col items-center gap-2 p-3 border rounded hover:bg-gray-50">
              <Icon name={icon} size={28} />
              <span className="text-xs text-gray-600">{icon}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">ステータス</h3>
        <div className="grid grid-cols-2 gap-4">
          {['info', 'alert'].map((icon) => (
            <div key={icon} className="flex flex-col items-center gap-2 p-3 border rounded hover:bg-gray-50">
              <Icon name={icon} size={28} />
              <span className="text-xs text-gray-600">{icon}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">その他</h3>
        <div className="grid grid-cols-3 gap-4">
          {['menu', 'star', 'mail'].map((icon) => (
            <div key={icon} className="flex flex-col items-center gap-2 p-3 border rounded hover:bg-gray-50">
              <Icon name={icon} size={28} />
              <span className="text-xs text-gray-600">{icon}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">支払・配送</h3>
        <div className="grid grid-cols-4 gap-4">
          {['creditCard', 'bank', 'truck', 'package'].map((icon) => (
            <div key={icon} className="flex flex-col items-center gap-2 p-3 border rounded hover:bg-gray-50">
              <Icon name={icon} size={28} />
              <span className="text-xs text-gray-600">{icon}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// ボタンと組み合わせ
export const WithButtons = {
  render: () => (
    <div className="flex gap-3 flex-wrap">
      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
        <Icon name="plus" size={20} color="white" />
        <span>追加</span>
      </button>

      <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
        <Icon name="trash" size={20} color="white" />
        <span>削除</span>
      </button>

      <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
        <Icon name="search" size={20} />
        <span>検索</span>
      </button>

      <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
        <Icon name="heart" size={20} />
        <span>お気に入り</span>
      </button>
    </div>
  ),
};

// バッジとカウント
export const WithBadges = {
  render: () => (
    <div className="flex gap-6">
      <div className="relative">
        <Icon name="cart" size={28} />
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          3
        </span>
      </div>

      <div className="relative">
        <Icon name="mail" size={28} />
        <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          9
        </span>
      </div>

      <div className="relative">
        <Icon name="heart" size={28} />
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-2 h-2"></span>
      </div>
    </div>
  ),
};

// ナビゲーションメニュー
export const InNavigation = {
  render: () => (
    <nav className="border rounded-lg p-2 w-64">
      <div className="space-y-1">
        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100">
          <Icon name="home" size={20} color="#2563eb" />
          <span>ホーム</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100">
          <Icon name="search" size={20} />
          <span>検索</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100">
          <Icon name="cart" size={20} />
          <span>カート</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100">
          <Icon name="heart" size={20} />
          <span>お気に入り</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100">
          <Icon name="user" size={20} />
          <span>マイページ</span>
        </a>
      </div>
    </nav>
  ),
};

// ステータス表示
export const StatusDisplay = {
  render: () => (
    <div className="space-y-3 w-96">
      <div className="flex items-start gap-3 p-3 border rounded-lg bg-blue-50 border-blue-200">
        <Icon name="info" size={20} color="#2563eb" />
        <div>
          <h4 className="font-semibold text-blue-900">お知らせ</h4>
          <p className="text-sm text-blue-800">重要な情報をお知らせします</p>
        </div>
      </div>

      <div className="flex items-start gap-3 p-3 border rounded-lg bg-yellow-50 border-yellow-200">
        <Icon name="alert" size={20} color="#f59e0b" />
        <div>
          <h4 className="font-semibold text-yellow-900">警告</h4>
          <p className="text-sm text-yellow-800">注意が必要な項目があります</p>
        </div>
      </div>

      <div className="flex items-start gap-3 p-3 border rounded-lg bg-green-50 border-green-200">
        <Icon name="check" size={20} color="#10b981" />
        <div>
          <h4 className="font-semibold text-green-900">成功</h4>
          <p className="text-sm text-green-800">処理が正常に完了しました</p>
        </div>
      </div>
    </div>
  ),
};

// 配送ステップ
export const ShippingSteps = {
  render: () => (
    <div className="w-full max-w-2xl">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center flex-1">
          <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center mb-2">
            <Icon name="check" size={24} color="white" />
          </div>
          <span className="text-sm font-medium">注文確定</span>
          <span className="text-xs text-gray-500">2024/10/01</span>
        </div>

        <div className="flex-1 h-1 bg-blue-600 -mt-8"></div>

        <div className="flex flex-col items-center flex-1">
          <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center mb-2">
            <Icon name="package" size={24} color="white" />
          </div>
          <span className="text-sm font-medium">発送準備</span>
          <span className="text-xs text-gray-500">2024/10/02</span>
        </div>

        <div className="flex-1 h-1 bg-gray-300 -mt-8"></div>

        <div className="flex flex-col items-center flex-1">
          <div className="w-12 h-12 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center mb-2">
            <Icon name="truck" size={24} />
          </div>
          <span className="text-sm font-medium text-gray-500">配送中</span>
          <span className="text-xs text-gray-400">-</span>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// 支払い方法選択
export const PaymentMethods = {
  render: () => (
    <div className="space-y-3 w-96">
      <div className="flex items-center gap-3 p-4 border rounded-lg hover:border-blue-500 cursor-pointer">
        <Icon name="creditCard" size={24} />
        <div>
          <div className="font-medium">クレジットカード</div>
          <div className="text-sm text-gray-600">Visa, Mastercard, JCB</div>
        </div>
      </div>

      <div className="flex items-center gap-3 p-4 border rounded-lg hover:border-blue-500 cursor-pointer">
        <Icon name="bank" size={24} />
        <div>
          <div className="font-medium">銀行振込</div>
          <div className="text-sm text-gray-600">振込確認後に発送</div>
        </div>
      </div>
    </div>
  ),
};

// アクションボタングループ
export const ActionButtons = {
  render: () => (
    <div className="flex gap-2">
      <button className="p-2 rounded-md hover:bg-gray-100 transition-colors">
        <Icon name="plus" size={20} />
      </button>
      <button className="p-2 rounded-md hover:bg-gray-100 transition-colors">
        <Icon name="minus" size={20} />
      </button>
      <button className="p-2 rounded-md hover:bg-gray-100 transition-colors">
        <Icon name="trash" size={20} color="#ef4444" />
      </button>
    </div>
  ),
};
