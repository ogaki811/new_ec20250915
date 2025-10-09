'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Icon from '@/components/ui/Icon';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const { login, setLoading, isLoading } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = 'メールアドレスを入力してください';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = '有効なメールアドレスを入力してください';
    }

    if (!password) {
      newErrors.password = 'パスワードを入力してください';
    } else if (password.length < 6) {
      newErrors.password = 'パスワードは6文字以上で入力してください';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success && data.admin && data.token) {
        login(data.admin, data.token);
        toast.success('ログインしました');
        router.push('/dashboard');
      } else {
        toast.error(data.message || 'ログインに失敗しました');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('ログインエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setErrors({});
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: demoEmail, password: demoPassword }),
      });

      const data = await response.json();

      if (data.success && data.admin && data.token) {
        login(data.admin, data.token);
        toast.success('デモアカウントでログインしました');
        router.push('/dashboard');
      } else {
        toast.error(data.message || 'ログインに失敗しました');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('ログインエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* ヘッダー */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              管理画面
            </h1>
            <p className="text-gray-600">
              Maestro Commerce Admin
            </p>
          </div>

          {/* ログインフォーム */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="email"
              label="メールアドレス"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              placeholder="admin@example.com"
              fullWidth
              autoComplete="email"
            />

            <Input
              type="password"
              label="パスワード"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              placeholder="••••••••"
              fullWidth
              autoComplete="current-password"
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={isLoading}
              disabled={isLoading}
            >
              ログイン
            </Button>
          </form>

          {/* デモログイン */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">または</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Button
                type="button"
                variant="secondary"
                size="md"
                fullWidth
                onClick={() => handleDemoLogin('admin@example.com', 'password123')}
                disabled={isLoading}
              >
                <span className="flex items-center justify-center gap-2">
                  <Icon name="user" size={18} />
                  管理者でデモログイン
                </span>
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="md"
                fullWidth
                onClick={() => handleDemoLogin('operator@example.com', 'password123')}
                disabled={isLoading}
              >
                <span className="flex items-center justify-center gap-2">
                  <Icon name="user" size={18} />
                  オペレーターでデモログイン
                </span>
              </Button>
            </div>

            <div className="mt-4 p-3 bg-gray-50 rounded-md">
              <p className="text-xs text-gray-600 text-center">
                デモアカウントで簡単にログインできます
              </p>
            </div>
          </div>
        </div>

        {/* フッター */}
        <p className="text-center text-sm text-gray-600 mt-4">
          © 2025 Maestro Commerce
        </p>
      </div>
    </div>
  );
}
