'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';

export default function Header() {
  const router = useRouter();
  const { admin, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    toast.success('ログアウトしました');
    router.push('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 fixed top-0 right-0 left-64 z-10">
      {/* ページタイトル */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          管理画面
        </h2>
      </div>

      {/* ユーザー情報・ログアウト */}
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">{admin?.name}</p>
          <p className="text-xs text-gray-500">{admin?.role}</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
        >
          ログアウト
        </Button>
      </div>
    </header>
  );
}
