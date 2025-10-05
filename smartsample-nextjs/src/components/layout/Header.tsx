'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import useCartStore from '@/store/useCartStore';
import useFavoritesStore from '@/store/useFavoritesStore';
import useAuthStore from '@/store/useAuthStore';

export default function Header() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const itemCount = useCartStore((state) => state.getItemCount());
  const favoriteCount = useFavoritesStore((state) => state.getFavoriteCount());
  const { isAuthenticated, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    toast.success('ログアウトしました');
    router.push('/');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="ec-header w-full bg-white shadow-sm">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4 gap-4">
          {/* ロゴエリア */}
          <div className="ec-header__logo flex-shrink-0">
            <Link href="/" className="flex items-center space-x-3">
              <img src="/img/header_logo.png" alt="smartsample" className="h-6 w-auto" />
            </Link>
          </div>

          {/* 検索エリア */}
          <div className="ec-header__search flex-1 relative max-w-2xl">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="商品名やメーカー、品番から探す"
                  className="w-full pl-10 pr-24 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                className="absolute right-0 top-0 h-full px-6 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors"
              >
                検索
              </button>
            </form>
          </div>

          {/* 機能エリア */}
          <div className="ec-header__actions flex items-center space-x-6">
            {/* お気に入り */}
            <Link href="/favorites" className="flex flex-col items-center text-gray-600 hover:text-blue-500 transition-colors">
              <div className="relative">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                {favoriteCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {favoriteCount}
                  </span>
                )}
              </div>
              <span className="text-xs mt-1">お気に入り</span>
            </Link>

            {/* カート */}
            <Link href="/cart" className="flex flex-col items-center text-gray-600 hover:text-blue-500 transition-colors">
              <div className="relative">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </div>
              <span className="text-xs mt-1">カート</span>
            </Link>

            {/* ユーザーメニュー */}
            {isAuthenticated ? (
              <>
                <Link href="/mypage" className="flex flex-col items-center text-gray-600 hover:text-green-500 transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span className="text-xs mt-1">マイページ</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex flex-col items-center text-gray-600 hover:text-red-500 transition-colors"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  <span className="text-xs mt-1">ログアウト</span>
                </button>
              </>
            ) : (
              <Link href="/login" className="flex flex-col items-center text-gray-600 hover:text-blue-500 transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                  <polyline points="10 17 15 12 10 7"></polyline>
                  <line x1="15" y1="12" x2="3" y2="12"></line>
                </svg>
                <span className="text-xs mt-1">ログイン</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
