import { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // 簡単なバリデーション
    if (!email) {
      setError('メールアドレスを入力してください');
      return;
    }

    // メール送信処理
    console.log('Password reset email sent to:', email);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <main className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 bg-gradient-to-br from-gray-50 to-blue-100">
        <div className="w-full max-w-md mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-blue-800 rounded-t-2xl"></div>

            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h1 className="text-3xl font-semibold text-gray-900 mb-2">メールを送信しました</h1>
              <p className="text-gray-600 text-sm leading-6">
                パスワード再設定用のリンクを<br />
                {email} に送信しました
              </p>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-700">
                メールが届かない場合は、迷惑メールフォルダもご確認ください。
              </p>
            </div>

            <Button to="/login" variant="primary" fullWidth>
              ログイン画面に戻る
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 bg-gradient-to-br from-gray-50 to-blue-100">
      <div className="w-full max-w-md mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-blue-800 rounded-t-2xl"></div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">パスワードを忘れた方</h1>
            <p className="text-gray-600 text-sm leading-6">
              ご登録のメールアドレスを入力してください<br />
              パスワード再設定用のリンクをお送りします
            </p>
          </div>

          <form className="mb-8" onSubmit={handleSubmit}>
            <Input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="メールアドレス"
              placeholder="example@email.com"
              autoComplete="email"
              required
              error={error}
            />

            <Button type="submit" variant="primary" fullWidth>
              送信する
            </Button>
          </form>

          <div className="text-center pt-6 border-t border-gray-200">
            <Link to="/login" className="text-blue-600 no-underline text-sm transition-colors hover:text-blue-800 hover:underline">
              ← ログイン画面に戻る
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ForgotPassword;
