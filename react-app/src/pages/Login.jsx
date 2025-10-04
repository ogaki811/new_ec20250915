import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import Input from '../components/Input';
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';
import SimpleHeader from '../components/SimpleHeader';
import SimpleFooter from '../components/SimpleFooter';
import useAuthStore from '../store/useAuthStore';

function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
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

    // 簡易バリデーション
    const newErrors = {};
    if (!formData.email) newErrors.email = 'メールアドレスを入力してください';
    if (!formData.password) newErrors.password = 'パスワードを入力してください';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // デモログイン処理
    login({
      email: formData.email,
      name: '山田 太郎',
    });

    toast.success('ログインしました');

    // マイページへリダイレクト
    setTimeout(() => {
      navigate('/mypage');
    }, 500);
  };

  return (
    <>
      <Helmet>
        <title>ログイン | smartsample</title>
        <meta name="description" content="smartsampleにログインして、お買い物をお楽しみください。新規会員登録も受付中。" />
        <link rel="canonical" href="https://smartsample.example.com/login" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <SimpleHeader />
      <main className="ec-login min-h-[calc(100vh-80px)] flex items-center justify-center py-12 bg-gradient-to-br from-gray-50 to-blue-100">
      <div className="ec-login__container w-full max-w-md mx-auto px-4">
        <div className="ec-login__card bg-white rounded-2xl shadow-xl p-8 w-full relative">
          <div className="ec-login__decoration absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-blue-800 rounded-t-2xl"></div>

          <div className="ec-login__header text-center mb-8">
            <h1 className="ec-login__title text-3xl font-semibold text-gray-900 mb-2">ログイン</h1>
            <p className="ec-login__subtitle text-gray-600 text-sm leading-6">アカウントにログインしてお買い物をお楽しみください</p>
          </div>

          <form className="ec-login__form mb-8" onSubmit={handleSubmit}>
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
              placeholder="パスワードを入力"
              autoComplete="current-password"
              required
              showPasswordToggle
              error={errors.password}
            />

            <div className="ec-login__options mb-6">
              <div className="ec-login__remember-container flex justify-between items-center flex-wrap gap-4">
                <Checkbox
                  id="remember"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  label="次回から自動でログイン"
                />

                <Link to="/forgot-password" className="ec-login__forgot-link text-blue-600 no-underline text-sm transition-colors hover:text-blue-800 hover:underline">
                  パスワードを忘れた方
                </Link>
              </div>
            </div>

            <Button type="submit" variant="primary" fullWidth className="ec-login__submit-btn">
              ログイン
            </Button>

            <div className="ec-login__divider text-center my-8 relative">
              <div className="ec-login__divider-line absolute top-1/2 left-0 right-0 h-px bg-gray-200"></div>
              <span className="ec-login__divider-text bg-white text-gray-500 px-4 text-sm relative">または</span>
            </div>

            <div className="ec-login__social-buttons flex flex-col gap-3">
              <Button
                type="button"
                variant="social"
                fullWidth
                className="ec-login__social-btn ec-login__social-btn--google"
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-blue-500">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                }
              >
                Googleでログイン
              </Button>

              <Button
                type="button"
                variant="social"
                fullWidth
                className="ec-login__social-btn ec-login__social-btn--facebook"
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-blue-600">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                }
              >
                Facebookでログイン
              </Button>

              <Button
                type="button"
                variant="social"
                fullWidth
                className="ec-login__social-btn ec-login__social-btn--line"
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-green-500">
                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                  </svg>
                }
              >
                LINEでログイン
              </Button>
            </div>
          </form>

          <div className="ec-login__footer text-center pt-8 border-t border-gray-200">
            <p className="ec-login__footer-text text-gray-600 mb-2 text-sm">アカウントをお持ちでない方は</p>
            <Link to="/signup" className="ec-login__signup-link text-blue-600 no-underline font-medium text-base transition-colors hover:text-blue-800 hover:underline">
              新規会員登録
            </Link>
          </div>
        </div>
      </div>
    </main>
    <SimpleFooter />
    </>
  );
}

export default Login;
