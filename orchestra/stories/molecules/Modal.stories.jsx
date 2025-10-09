import { useState } from 'react';
import Modal from '@/components/common/Modal';

const meta = {
  title: 'Molecules/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'モーダルの開閉状態',
    },
    title: {
      control: 'text',
      description: 'モーダルのタイトル',
    },
    message: {
      control: 'text',
      description: 'モーダルの本文',
    },
    confirmText: {
      control: 'text',
      description: '確認ボタンのテキスト',
    },
    cancelText: {
      control: 'text',
      description: 'キャンセルボタンのテキスト',
    },
    confirmVariant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'danger'],
      description: '確認ボタンのスタイル',
    },
  },
};

export default meta;

// 基本的な確認モーダル
export const Default = {
  args: {
    isOpen: true,
    title: '確認',
    message: 'この操作を実行してもよろしいですか？',
    confirmText: 'OK',
    cancelText: 'キャンセル',
    confirmVariant: 'primary',
    onClose: () => console.log('閉じる'),
    onConfirm: () => console.log('確認'),
  },
};

// 削除確認モーダル
export const DeleteConfirmation = {
  args: {
    isOpen: true,
    title: '商品を削除',
    message: 'この商品をカートから削除してもよろしいですか？\nこの操作は取り消せません。',
    confirmText: '削除',
    cancelText: 'キャンセル',
    confirmVariant: 'danger',
    onClose: () => console.log('閉じる'),
    onConfirm: () => console.log('削除'),
  },
};

// 情報モーダル
export const Information = {
  args: {
    isOpen: true,
    title: 'ご利用ありがとうございます',
    message: 'ご注文が完了しました。確認メールを送信いたしましたのでご確認ください。',
    confirmText: '閉じる',
    cancelText: '',
    confirmVariant: 'primary',
    onClose: () => console.log('閉じる'),
    onConfirm: () => console.log('確認'),
  },
};

// 警告モーダル
export const Warning = {
  args: {
    isOpen: true,
    title: '⚠ 注意',
    message: '在庫が残りわずかです。この商品は売り切れる可能性があります。今すぐご注文されることをお勧めします。',
    confirmText: '購入する',
    cancelText: 'あとで',
    confirmVariant: 'primary',
    onClose: () => console.log('閉じる'),
    onConfirm: () => console.log('購入'),
  },
};

// 長いメッセージ
export const LongMessage = {
  args: {
    isOpen: true,
    title: '利用規約',
    message:
      '本サービスをご利用いただくにあたり、以下の利用規約をお読みいただき、同意いただく必要があります。\n\n1. 利用者は本サービスを適切に使用するものとします。\n2. 本サービスの内容は予告なく変更される場合があります。\n3. 利用者は自己責任において本サービスを利用するものとします。\n\nこれらの規約に同意いただける場合は、「同意する」ボタンをクリックしてください。',
    confirmText: '同意する',
    cancelText: '同意しない',
    confirmVariant: 'primary',
    onClose: () => console.log('閉じる'),
    onConfirm: () => console.log('同意'),
  },
};

// インタラクティブデモ
export const Interactive = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <button
          onClick={() => setIsOpen(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          モーダルを開く
        </button>

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={() => {
            console.log('確認しました');
            setIsOpen(false);
          }}
          title="確認"
          message="この操作を実行してもよろしいですか？"
          confirmText="OK"
          cancelText="キャンセル"
          confirmVariant="primary"
        />
      </div>
    );
  },
};

// 複数モーダル例
export const MultipleModals = {
  render: () => {
    const [modal1, setModal1] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [modal3, setModal3] = useState(false);

    return (
      <div className="flex gap-4">
        <button
          onClick={() => setModal1(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          情報モーダル
        </button>

        <button
          onClick={() => setModal2(true)}
          className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
        >
          警告モーダル
        </button>

        <button
          onClick={() => setModal3(true)}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          削除モーダル
        </button>

        <Modal
          isOpen={modal1}
          onClose={() => setModal1(false)}
          onConfirm={() => setModal1(false)}
          title="お知らせ"
          message="新しい機能が追加されました！"
          confirmText="確認"
        />

        <Modal
          isOpen={modal2}
          onClose={() => setModal2(false)}
          onConfirm={() => setModal2(false)}
          title="⚠ 注意"
          message="この操作は元に戻せません。"
          confirmText="続行"
          cancelText="キャンセル"
          confirmVariant="secondary"
        />

        <Modal
          isOpen={modal3}
          onClose={() => setModal3(false)}
          onConfirm={() => setModal3(false)}
          title="削除確認"
          message="本当に削除してもよろしいですか？"
          confirmText="削除"
          cancelText="キャンセル"
          confirmVariant="danger"
        />
      </div>
    );
  },
};

// カートから削除
export const RemoveFromCart = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="w-96 border rounded-lg p-4">
        <div className="flex gap-4 mb-4">
          <div className="w-20 h-20 bg-gray-200 rounded"></div>
          <div className="flex-1">
            <h3 className="font-semibold">商品名</h3>
            <p className="text-sm text-gray-600">¥12,800</p>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="w-full px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-50"
        >
          カートから削除
        </button>

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={() => {
            alert('削除しました');
            setIsOpen(false);
          }}
          title="商品を削除"
          message="この商品をカートから削除してもよろしいですか？"
          confirmText="削除"
          cancelText="キャンセル"
          confirmVariant="danger"
        />
      </div>
    );
  },
};

// ログアウト確認
export const LogoutConfirmation = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <button
          onClick={() => setIsOpen(true)}
          className="px-6 py-2 border rounded-md hover:bg-gray-50"
        >
          ログアウト
        </button>

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={() => {
            alert('ログアウトしました');
            setIsOpen(false);
          }}
          title="ログアウト"
          message="ログアウトしてもよろしいですか？"
          confirmText="ログアウト"
          cancelText="キャンセル"
          confirmVariant="primary"
        />
      </div>
    );
  },
};

// 注文確認
export const OrderConfirmation = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="w-96 border rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4">注文内容</h3>

        <div className="space-y-3 mb-4 pb-4 border-b">
          <div className="flex justify-between">
            <span>商品合計</span>
            <span>¥12,800</span>
          </div>
          <div className="flex justify-between">
            <span>送料</span>
            <span>¥500</span>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <span className="text-xl font-bold">合計</span>
          <span className="text-2xl font-bold text-blue-600">¥13,300</span>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          注文を確定
        </button>

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={() => {
            alert('注文が完了しました！');
            setIsOpen(false);
          }}
          title="注文確認"
          message="この内容で注文を確定してもよろしいですか？\n合計金額: ¥13,300"
          confirmText="注文を確定"
          cancelText="戻る"
          confirmVariant="primary"
        />
      </div>
    );
  },
};

// お気に入りに追加
export const AddToFavorites = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="w-80 border rounded-lg overflow-hidden">
        <div className="bg-gray-200 h-48"></div>
        <div className="p-4">
          <h3 className="font-semibold mb-2">商品名</h3>
          <p className="text-gray-600 mb-4">¥12,800</p>

          <button
            onClick={() => setIsOpen(true)}
            className="w-full px-4 py-2 border rounded-md hover:bg-gray-50"
          >
            ♡ お気に入りに追加
          </button>
        </div>

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={() => {
            alert('お気に入りに追加しました');
            setIsOpen(false);
          }}
          title="お気に入りに追加"
          message="この商品をお気に入りに追加しますか？"
          confirmText="追加"
          cancelText="キャンセル"
          confirmVariant="primary"
        />
      </div>
    );
  },
};

// 会員登録完了
export const SignupComplete = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => {
          alert('ホームページへ移動');
          setIsOpen(false);
        }}
        title="🎉 会員登録完了"
        message="会員登録が完了しました！\nご登録いただきありがとうございます。\n\n登録確認メールを送信いたしましたのでご確認ください。"
        confirmText="ホームへ"
        confirmVariant="primary"
      />
    );
  },
};

// エラーモーダル
export const Error = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => setIsOpen(false)}
        title="❌ エラー"
        message="処理中にエラーが発生しました。\nしばらく時間をおいてから再度お試しください。"
        confirmText="閉じる"
        confirmVariant="danger"
      />
    );
  },
};

// セッションタイムアウト
export const SessionTimeout = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => {
          alert('再ログインページへ移動');
          setIsOpen(false);
        }}
        title="セッションタイムアウト"
        message="セッションの有効期限が切れました。\n再度ログインしてください。"
        confirmText="ログインページへ"
        cancelText="閉じる"
        confirmVariant="primary"
      />
    );
  },
};
