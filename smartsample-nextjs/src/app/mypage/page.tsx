'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/common/Breadcrumb';
import useAuthStore from '@/store/useAuthStore';
import useCartStore from '@/store/useCartStore';
import useFavoritesStore from '@/store/useFavoritesStore';

export default function MyPage() {
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuthStore();
  const cartItemCount = useCartStore((state) => state.getItemCount());
  const favoriteCount = useFavoritesStore((state) => state.getFavoriteCount());

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    logout();
    toast.success('ログアウトしました');
    router.push('/');
  };

  if (!isAuthenticated || !user) {
    return null; // リダイレクト中
  }

  // デモ用の注文履歴
  const recentOrders = [
    {
      id: 'ORD-001',
      date: '2025-01-15',
      total: 12800,
      status: '配送中' as const,
      itemCount: 3,
    },
    {
      id: 'ORD-002',
      date: '2025-01-10',
      total: 5600,
      status: '配送完了' as const,
      itemCount: 2,
    },
    {
      id: 'ORD-003',
      date: '2024-12-28',
      total: 8900,
      status: '配送完了' as const,
      itemCount: 4,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case '配送中':
        return 'bg-blue-100 text-blue-800';
      case '配送完了':
        return 'bg-green-100 text-green-800';
      case 'キャンセル':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={[{ label: 'マイページ' }]} />

          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            マイページ
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* サイドバー */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                {/* ユーザー情報 */}
                <div className="text-center pb-6 border-b">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-12 h-12 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                  <p className="text-sm text-gray-600 mt-1">{user.email}</p>
                </div>

                {/* メニュー */}
                <nav className="mt-6 space-y-2">
                  <Link
                    href="/mypage"
                    className="flex items-center px-4 py-3 text-gray-900 bg-blue-50 rounded-lg font-medium"
                  >
                    <svg
                      className="w-5 h-5 mr-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    ダッシュボード
                  </Link>
                  <Link
                    href="/favorites"
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
                  >
                    <svg
                      className="w-5 h-5 mr-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    お気に入り
                    {favoriteCount > 0 && (
                      <span className="ml-auto bg-pink-100 text-pink-600 px-2 py-1 rounded-full text-xs font-semibold">
                        {favoriteCount}
                      </span>
                    )}
                  </Link>
                  <Link
                    href="/cart"
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
                  >
                    <svg
                      className="w-5 h-5 mr-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    カート
                    {cartItemCount > 0 && (
                      <span className="ml-auto bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-semibold">
                        {cartItemCount}
                      </span>
                    )}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <svg
                      className="w-5 h-5 mr-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    ログアウト
                  </button>
                </nav>
              </div>
            </div>

            {/* メインコンテンツ */}
            <div className="lg:col-span-2 space-y-6">
              {/* サマリーカード */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">カート</p>
                    <svg
                      className="w-8 h-8 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{cartItemCount}</p>
                  <p className="text-xs text-gray-500 mt-1">商品</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">お気に入り</p>
                    <svg
                      className="w-8 h-8 text-pink-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{favoriteCount}</p>
                  <p className="text-xs text-gray-500 mt-1">商品</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">注文</p>
                    <svg
                      className="w-8 h-8 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{recentOrders.length}</p>
                  <p className="text-xs text-gray-500 mt-1">件の注文</p>
                </div>
              </div>

              {/* 注文履歴 */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">最近の注文</h2>
                  <Link
                    href="/mypage/orders"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    すべて見る
                  </Link>
                </div>

                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-semibold text-gray-900">
                            注文番号: {order.id}
                          </p>
                          <p className="text-sm text-gray-600">{order.date}</p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">
                            {order.itemCount}点の商品
                          </p>
                          <p className="text-lg font-bold text-gray-900">
                            ¥{order.total.toLocaleString()}
                          </p>
                        </div>
                        <Link
                          href={`/mypage/orders/${order.id}`}
                          className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:border-gray-400 transition-colors"
                        >
                          詳細を見る
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                {recentOrders.length === 0 && (
                  <div className="text-center py-12">
                    <svg
                      className="mx-auto h-16 w-16 text-gray-400 mb-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <p className="text-gray-600">注文履歴がありません</p>
                  </div>
                )}
              </div>

              {/* クイックアクション */}
              <div className="grid sm:grid-cols-2 gap-4">
                <Link
                  href="/products"
                  className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <svg
                        className="w-6 h-6 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">商品を探す</p>
                      <p className="text-sm text-gray-600">新しい商品を見つける</p>
                    </div>
                  </div>
                </Link>

                <Link
                  href="/favorites"
                  className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mr-4">
                      <svg
                        className="w-6 h-6 text-pink-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">お気に入り</p>
                      <p className="text-sm text-gray-600">保存した商品を確認</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
