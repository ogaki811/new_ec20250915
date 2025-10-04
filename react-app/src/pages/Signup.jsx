import { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';

function Signup() {
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    lastNameKana: '',
    firstNameKana: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 簡単なバリデーション
    const newErrors = {};

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'パスワードが一致しません';
    }

    if (formData.password.length < 8) {
      newErrors.password = 'パスワードは8文字以上で入力してください';
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = '利用規約に同意してください';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log('Signup attempt:', formData);
  };

  return (
    <main className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 bg-gradient-to-br from-gray-50 to-blue-100">
      <div className="w-full max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-blue-800 rounded-t-2xl"></div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">新規会員登録</h1>
            <p className="text-gray-600 text-sm leading-6">お客様情報を入力して会員登録を行ってください</p>
          </div>

          <form className="mb-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                label="姓"
                placeholder="山田"
                autoComplete="family-name"
                required
                error={errors.lastName}
              />

              <Input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                label="名"
                placeholder="太郎"
                autoComplete="given-name"
                required
                error={errors.firstName}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <Input
                type="text"
                id="lastNameKana"
                name="lastNameKana"
                value={formData.lastNameKana}
                onChange={handleChange}
                label="姓（カナ）"
                placeholder="ヤマダ"
                required
                error={errors.lastNameKana}
              />

              <Input
                type="text"
                id="firstNameKana"
                name="firstNameKana"
                value={formData.firstNameKana}
                onChange={handleChange}
                label="名（カナ）"
                placeholder="タロウ"
                required
                error={errors.firstNameKana}
              />
            </div>

            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              label="メールアドレス"
              placeholder="example@email.com"
              autoComplete="email"
              required
              error={errors.email}
            />

            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              label="パスワード"
              placeholder="8文字以上の半角英数字"
              autoComplete="new-password"
              required
              showPasswordToggle
              error={errors.password}
            />

            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              label="パスワード（確認）"
              placeholder="パスワードを再入力"
              autoComplete="new-password"
              required
              showPasswordToggle
              error={errors.confirmPassword}
            />

            <div className="mb-6">
              <Checkbox
                id="agreeTerms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                label={
                  <span>
                    <Link to="/terms" className="text-blue-600 hover:underline">利用規約</Link>
                    と
                    <Link to="/privacy" className="text-blue-600 hover:underline">プライバシーポリシー</Link>
                    に同意する
                  </span>
                }
              />
              {errors.agreeTerms && (
                <div className="text-red-500 text-sm mt-2">{errors.agreeTerms}</div>
              )}
            </div>

            <Button type="submit" variant="primary" fullWidth>
              会員登録
            </Button>
          </form>

          <div className="text-center pt-8 border-t border-gray-200">
            <p className="text-gray-600 mb-2 text-sm">すでにアカウントをお持ちの方は</p>
            <Link to="/login" className="text-blue-600 no-underline font-medium text-base transition-colors hover:text-blue-800 hover:underline">
              ログイン
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Signup;
