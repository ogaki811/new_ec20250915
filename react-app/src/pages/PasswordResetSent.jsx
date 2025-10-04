import { useSearchParams, Link } from 'react-router-dom';
import Button from '../components/Button';

function PasswordResetSent() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || 'example@email.com';

  return (
    <main className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 bg-gradient-to-br from-gray-50 to-blue-100">
      <div className="w-full max-w-lg mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full relative">
          {/* トップボーダー */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-blue-800 rounded-t-2xl"></div>

          {/* ヘッダー */}
          <div className="text-center mb-8">
            <div className="text-center mb-6">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#28a745"
                strokeWidth="2"
                className="mx-auto"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22,4 12,14.01 9,11.01"></polyline>
              </svg>
            </div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              メールを送信しました
            </h1>
            <p className="text-gray-600 text-sm leading-6">
              パスワード再設定用のメールを<br />
              <strong className="text-blue-600">{email}</strong><br />
              に送信しました
            </p>
          </div>

          {/* 次のステップ */}
          <div className="mb-8">
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="text-gray-900 mb-4 text-lg font-medium">次のステップ</h3>
              <ol className="mb-6 pl-6 space-y-2 list-decimal">
                <li className="text-gray-700 leading-6">メールボックスを確認してください</li>
                <li className="text-gray-700 leading-6">「パスワード再設定」のメールを開いてください</li>
                <li className="text-gray-700 leading-6">メール内のリンクをクリックしてパスワードを再設定してください</li>
              </ol>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <div className="flex items-start">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="2"
                    className="mr-3 flex-shrink-0 mt-0.5"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                  <div>
                    <p className="text-sm text-blue-800 font-medium mb-1">メールが届かない場合</p>
                    <ul className="text-xs text-blue-700 space-y-1">
                      <li>• 迷惑メールフォルダをご確認ください</li>
                      <li>• メールアドレスが正しいかご確認ください</li>
                      <li>• 数分待ってから再度お試しください</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* アクション */}
          <div className="space-y-3">
            <Button variant="primary" fullWidth to="/">
              ホームに戻る
            </Button>
            <Button variant="secondary" fullWidth to="/login">
              ログインページに戻る
            </Button>
          </div>

          {/* ヘルプ */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              問題が解決しない場合は
              <Link to="/coming-soon" className="text-blue-600 hover:text-blue-800 font-medium ml-1">
                お問い合わせ
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PasswordResetSent;
