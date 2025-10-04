import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // 簡単なバリデーション
    if (!email) {
      setError('メールアドレスを入力してください');
      return;
    }

    // メール送信処理（実際にはAPI呼び出し）
    console.log('Password reset email sent to:', email);

    // PasswordResetSentページに遷移
    navigate(`/password-reset-sent?email=${encodeURIComponent(email)}`);
  };

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
