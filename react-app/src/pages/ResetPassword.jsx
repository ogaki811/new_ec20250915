import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Input from '../components/Input';
import Button from '../components/Button';

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // パスワード強度チェック
    if (name === 'password') {
      let strength = 0;
      if (value.length >= 8) strength++;
      if (/[a-z]/.test(value)) strength++;
      if (/[A-Z]/.test(value)) strength++;
      if (/[0-9]/.test(value)) strength++;
      if (/[^a-zA-Z0-9]/.test(value)) strength++;
      setPasswordStrength(strength);
    }

    // エラークリア
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.password) {
      newErrors.password = 'パスワードを入力してください';
    } else if (formData.password.length < 8) {
      newErrors.password = 'パスワードは8文字以上で入力してください';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = '確認用パスワードを入力してください';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'パスワードが一致しません';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // パスワードリセット処理（実際にはAPI呼び出し）
    toast.success('パスワードを変更しました');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 1) return 'bg-red-500';
    if (passwordStrength === 2) return 'bg-orange-500';
    if (passwordStrength === 3) return 'bg-yellow-500';
    if (passwordStrength === 4) return 'bg-lime-500';
    return 'bg-green-500';
  };

  const getStrengthText = () => {
    if (passwordStrength <= 1) return '弱い';
    if (passwordStrength === 2) return 'やや弱い';
    if (passwordStrength === 3) return '普通';
    if (passwordStrength === 4) return '強い';
    return '非常に強い';
  };

  if (!token) {
    return (
      <main className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 bg-gradient-to-br from-gray-50 to-blue-100">
        <div className="w-full max-w-lg mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#dc2626"
              strokeWidth="2"
              className="mx-auto mb-6"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">無効なリンクです</h1>
            <p className="text-gray-600 mb-6">
              パスワードリセットリンクが無効または期限切れです
            </p>
            <Button variant="primary" fullWidth to="/forgot-password">
              再度パスワードリセットを申請
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 bg-gradient-to-br from-gray-50 to-blue-100">
      <div className="w-full max-w-lg mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full relative">
          {/* トップボーダー */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-blue-800 rounded-t-2xl"></div>

          {/* ヘッダー */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              新しいパスワード設定
            </h1>
            <p className="text-gray-600 text-sm leading-6">
              新しいパスワードを設定してください
            </p>
          </div>

          {/* トークン確認ステータス */}
          <div className="mb-8">
            <div className="flex items-center gap-2 py-3 px-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm font-medium">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22,4 12,14.01 9,11.01"></polyline>
              </svg>
              <span>リンクが確認されました</span>
            </div>
          </div>

          {/* フォーム */}
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="space-y-6">
              {/* 新しいパスワード */}
              <div>
                <Input
                  type="password"
                  name="password"
                  label="新しいパスワード"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  placeholder="8文字以上で入力"
                />

                {/* パスワード強度インジケーター */}
                {formData.password && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-600">パスワード強度</span>
                      <span className={`text-xs font-medium ${
                        passwordStrength <= 1 ? 'text-red-600' :
                        passwordStrength === 2 ? 'text-orange-600' :
                        passwordStrength === 3 ? 'text-yellow-600' :
                        passwordStrength === 4 ? 'text-lime-600' :
                        'text-green-600'
                      }`}>
                        {getStrengthText()}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${getStrengthColor()}`}
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      ></div>
                    </div>
                    <ul className="mt-3 text-xs text-gray-600 space-y-1">
                      <li className={formData.password.length >= 8 ? 'text-green-600' : ''}>
                        {formData.password.length >= 8 ? '✓' : '○'} 8文字以上
                      </li>
                      <li className={/[a-z]/.test(formData.password) ? 'text-green-600' : ''}>
                        {/[a-z]/.test(formData.password) ? '✓' : '○'} 小文字を含む
                      </li>
                      <li className={/[A-Z]/.test(formData.password) ? 'text-green-600' : ''}>
                        {/[A-Z]/.test(formData.password) ? '✓' : '○'} 大文字を含む
                      </li>
                      <li className={/[0-9]/.test(formData.password) ? 'text-green-600' : ''}>
                        {/[0-9]/.test(formData.password) ? '✓' : '○'} 数字を含む
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* 確認用パスワード */}
              <div>
                <Input
                  type="password"
                  name="confirmPassword"
                  label="パスワード（確認）"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={errors.confirmPassword}
                  placeholder="もう一度入力"
                />
              </div>
            </div>

            {/* 送信ボタン */}
            <div className="mt-8">
              <Button type="submit" variant="primary" fullWidth>
                パスワードを変更
              </Button>
            </div>
          </form>

          {/* ログインリンク */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              パスワードを思い出しましたか？
              <Button variant="link" to="/login" className="ml-1">
                ログイン
              </Button>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ResetPassword;
