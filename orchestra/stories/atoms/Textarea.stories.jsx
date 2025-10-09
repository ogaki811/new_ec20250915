import { useState } from 'react';
import Textarea from '@/components/ui/Textarea';

const meta = {
  title: 'Atoms/Textarea',
  component: Textarea,
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
    rows: {
      control: 'number',
      description: '行数',
    },
    maxLength: {
      control: 'number',
      description: '最大文字数',
    },
    showCount: {
      control: 'boolean',
      description: '文字数カウント表示',
    },
    disabled: {
      control: 'boolean',
      description: '無効状態',
    },
    required: {
      control: 'boolean',
      description: '必須フィールド',
    },
    error: {
      control: 'text',
      description: 'エラーメッセージ',
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
    label: 'コメント',
    placeholder: 'ご意見・ご感想をお聞かせください',
  },
};

// 文字数カウント
export const WithCharacterCount = {
  args: {
    label: 'メッセージ',
    placeholder: 'メッセージを入力（最大200文字）',
    maxLength: 200,
    showCount: true,
  },
};

// エラー状態
export const WithError = {
  args: {
    label: '説明',
    placeholder: '説明を入力してください',
    error: 'この項目は必須です',
    defaultValue: '',
  },
};

// 無効状態
export const Disabled = {
  args: {
    label: '無効なテキストエリア',
    placeholder: '編集できません',
    disabled: true,
    defaultValue: 'この内容は編集できません',
  },
};

// 行数バリエーション
export const RowsVariations = {
  render: () => (
    <div className="space-y-4 w-96">
      <Textarea label="2行" rows={2} placeholder="rows={2}" />
      <Textarea label="4行（デフォルト）" rows={4} placeholder="rows={4}" />
      <Textarea label="6行" rows={6} placeholder="rows={6}" />
      <Textarea label="10行" rows={10} placeholder="rows={10}" />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// インタラクティブ（文字数カウント）
export const Interactive = {
  render: () => {
    const [text, setText] = useState('');

    return (
      <div className="w-96">
        <Textarea
          label="お問い合わせ内容"
          placeholder="お問い合わせ内容を入力してください"
          maxLength={500}
          showCount
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
        />
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            入力文字数: {text.length}文字
            {text.length > 0 && text.length < 50 && (
              <span className="text-orange-600 ml-2">（もう少し詳しく入力してください）</span>
            )}
            {text.length >= 50 && (
              <span className="text-green-600 ml-2">✓</span>
            )}
          </p>
        </div>
      </div>
    );
  },
};

// コメントフォーム
export const CommentForm = {
  render: () => {
    const [comment, setComment] = useState('');

    return (
      <div className="w-full max-w-2xl border rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex-shrink-0"></div>
          <div className="flex-1">
            <Textarea
              placeholder="コメントを追加..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              maxLength={1000}
              showCount
            />
            <div className="flex justify-end gap-2 mt-3">
              <button
                className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50 transition-colors"
                onClick={() => setComment('')}
              >
                キャンセル
              </button>
              <button
                className={`px-4 py-2 text-sm rounded-md transition-colors ${
                  comment.trim()
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!comment.trim()}
              >
                コメントする
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};

// レビューフォーム
export const ReviewForm = {
  render: () => {
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);

    return (
      <div className="w-full max-w-lg border rounded-lg p-6">
        <h3 className="font-semibold text-lg mb-4">レビューを投稿</h3>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            評価
          </label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="text-2xl focus:outline-none"
              >
                {star <= rating ? '⭐' : '☆'}
              </button>
            ))}
          </div>
        </div>

        <Textarea
          label="レビュー"
          placeholder="商品の感想をお聞かせください"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          rows={5}
          maxLength={500}
          showCount
        />

        <button
          className={`w-full mt-4 px-4 py-2 rounded-md transition-colors ${
            rating > 0 && review.trim().length >= 10
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          disabled={rating === 0 || review.trim().length < 10}
        >
          レビューを投稿
        </button>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};

// お問い合わせフォーム
export const ContactForm = {
  render: () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: '',
    });

    return (
      <div className="w-full max-w-2xl space-y-4">
        <h3 className="text-lg font-semibold">お問い合わせフォーム</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            お名前
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="山田 太郎"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            メールアドレス
          </label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="example@email.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>

        <Textarea
          label="お問い合わせ内容"
          placeholder="お問い合わせ内容をできるだけ詳しくご記入ください"
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          rows={8}
          maxLength={2000}
          showCount
        />

        <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          送信
        </button>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};

// ブログ投稿エディタ
export const BlogEditor = {
  render: () => {
    const [post, setPost] = useState({
      title: '',
      content: '',
    });

    return (
      <div className="w-full max-w-4xl space-y-4">
        <div className="border-b pb-4">
          <h2 className="text-2xl font-bold">新規投稿</h2>
        </div>

        <div>
          <input
            type="text"
            className="w-full px-4 py-3 text-2xl border-0 border-b-2 border-gray-200 focus:outline-none focus:border-blue-600"
            placeholder="タイトルを入力"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />
        </div>

        <Textarea
          placeholder="本文を入力..."
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
          rows={15}
          maxLength={10000}
          showCount
        />

        <div className="flex justify-between items-center pt-4 border-t">
          <div className="text-sm text-gray-600">
            {post.content.length > 0 && (
              <>
                約 {Math.ceil(post.content.length / 400)} 分で読めます
              </>
            )}
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border rounded-md hover:bg-gray-50 transition-colors">
              下書き保存
            </button>
            <button
              className={`px-4 py-2 rounded-md transition-colors ${
                post.title.trim() && post.content.trim()
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!post.title.trim() || !post.content.trim()}
            >
              公開
            </button>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};

// アンケートフォーム
export const SurveyForm = {
  render: () => {
    const [answers, setAnswers] = useState({
      q1: '',
      q2: '',
      q3: '',
    });

    return (
      <div className="w-full max-w-2xl space-y-6">
        <h3 className="text-lg font-semibold">顧客満足度アンケート</h3>

        <div>
          <Textarea
            label="1. サービスの良かった点をお聞かせください"
            placeholder="ご意見をお聞かせください"
            value={answers.q1}
            onChange={(e) => setAnswers({ ...answers, q1: e.target.value })}
            rows={4}
            maxLength={500}
            showCount
          />
        </div>

        <div>
          <Textarea
            label="2. 改善してほしい点をお聞かせください"
            placeholder="ご意見をお聞かせください"
            value={answers.q2}
            onChange={(e) => setAnswers({ ...answers, q2: e.target.value })}
            rows={4}
            maxLength={500}
            showCount
          />
        </div>

        <div>
          <Textarea
            label="3. その他ご意見・ご要望"
            placeholder="自由にご記入ください"
            value={answers.q3}
            onChange={(e) => setAnswers({ ...answers, q3: e.target.value })}
            rows={4}
            maxLength={500}
            showCount
          />
        </div>

        <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          送信
        </button>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};

// チャットメッセージ入力
export const ChatInput = {
  render: () => {
    const [message, setMessage] = useState('');

    const handleSend = () => {
      if (message.trim()) {
        alert(`送信: ${message}`);
        setMessage('');
      }
    };

    return (
      <div className="w-full max-w-2xl border rounded-lg">
        <div className="bg-gray-50 border-b p-3">
          <h4 className="font-semibold">チャット</h4>
        </div>

        <div className="h-64 p-4 overflow-y-auto bg-gray-50">
          <div className="space-y-3">
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex-shrink-0"></div>
              <div className="bg-white rounded-lg p-3 max-w-xs">
                <p className="text-sm">こんにちは！</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 border-t bg-white">
          <Textarea
            placeholder="メッセージを入力... (Ctrl+Enterで送信)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.ctrlKey) {
                handleSend();
              }
            }}
            rows={2}
            maxLength={1000}
            showCount
          />
          <div className="flex justify-end mt-2">
            <button
              className={`px-4 py-2 text-sm rounded-md transition-colors ${
                message.trim()
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              onClick={handleSend}
              disabled={!message.trim()}
            >
              送信
            </button>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};

// バリデーション例
export const WithValidation = {
  render: () => {
    const [text, setText] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
      const value = e.target.value;
      setText(value);

      if (value.length === 0) {
        setError('この項目は必須です');
      } else if (value.length < 10) {
        setError('10文字以上入力してください');
      } else {
        setError('');
      }
    };

    return (
      <div className="w-96">
        <Textarea
          label="説明（10文字以上）"
          placeholder="詳細な説明を入力してください"
          value={text}
          onChange={handleChange}
          error={error}
          rows={5}
          maxLength={200}
          showCount
        />
      </div>
    );
  },
};
