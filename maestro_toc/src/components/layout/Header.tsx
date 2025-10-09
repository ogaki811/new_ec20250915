'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import toast from 'react-hot-toast';
import useCartStore from '@/store/useCartStore';
import useAuthStore from '@/store/useAuthStore';
import { CartAddedNotification } from '@/components/cart';
import MobileMenu from './MobileMenu';
import { useScrollDirection } from '@/hooks/useScrollDirection';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [notificationTimeout, setNotificationTimeout] = useState<NodeJS.Timeout | null>(null);
  const [badgeAnimation, setBadgeAnimation] = useState(false);
  const prevItemCountRef = useRef<number>(0);

  // スクロール方向検知カスタムフック
  const { isScrolled, showHeader } = useScrollDirection(100);

  const itemCount = useCartStore((state) => state.getItemCount());
  const lastAddedItem = useCartStore((state) => state.lastAddedItem);
  const { isAuthenticated, logout } = useAuthStore();

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (notificationTimeout) {
        clearTimeout(notificationTimeout);
      }
    };
  }, [notificationTimeout]);

  // カート追加時に通知表示
  useEffect(() => {
    if (itemCount > prevItemCountRef.current && prevItemCountRef.current > 0) {
      // カートにアイテムが追加された
      if (notificationTimeout) {
        clearTimeout(notificationTimeout);
      }

      // 通知トーストを即座に表示
      setIsNotificationVisible(true);

      // バッジのアニメーション
      setBadgeAnimation(true);
      setTimeout(() => setBadgeAnimation(false), 400);

      // 3.5秒後に通知を自動で閉じる
      const timeout = setTimeout(() => {
        setIsNotificationVisible(false);
      }, 3500);
      setNotificationTimeout(timeout);
    }

    // 現在のitemCountを保存
    prevItemCountRef.current = itemCount;
  }, [itemCount, notificationTimeout]);

  // URLのクエリパラメータから検索キーワードを取得して検索窓に反映
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const query = params.get('q');
      if (query) {
        setSearchQuery(query);
      } else {
        setSearchQuery('');
      }
    }
  }, [pathname]);


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
    <>
      {/* ヘッダー固定時のスペーサー */}
      {isScrolled && <div className="hidden lg:block" style={{ height: '88px' }} />}

      <header className="ec-header w-full">
        {/* デスクトップヘッダー */}
        <div className={`ec-header--desktop hidden lg:block transition-transform duration-300 ${isScrolled ? 'fixed top-0 left-0 right-0 z-50 shadow-md' : ''} ${isScrolled && !showHeader ? '-translate-y-full' : 'translate-y-0'}`}>
        {/* メインヘッダー */}
        <div className="bg-white">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4 gap-4">
              {/* ロゴエリア */}
              <div className="ec-header__logo flex-shrink-0">
                <Link href="/" className="flex items-center space-x-3">
                  <img src="/img/header_logo.png" alt="smartsample" className="h-6 w-auto" />
                </Link>
              </div>

              {/* 検索エリア */}
              <div className="ec-header__search flex-1 relative">
                <form onSubmit={handleSearch} className="ec-header__search-form relative">
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
                      className="ec-header__search-input w-full pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      style={{ paddingLeft: '40px' }}
                    />
                  </div>
                  <button type="submit" className="ec-header__search-button absolute right-0 top-0 h-full px-4 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors">
                    <span>検索</span>
                  </button>
                </form>
              </div>

              {/* 機能エリア */}
              <div className="ec-header__actions flex items-center space-x-4">
                <Link href="/cart" className="ec-header__cart-icon flex flex-col items-center p-2 text-gray-600 hover:text-blue-500 transition-colors">
                  <div className="relative">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <circle cx="9" cy="21" r="1"></circle>
                      <circle cx="20" cy="21" r="1"></circle>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    {itemCount > 0 && (
                      <span className={`ec-header__badge absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ${badgeAnimation ? 'animate-badge-pop' : ''}`}>{itemCount}</span>
                    )}
                  </div>
                  <span className="text-xs mt-1">カート</span>
                </Link>

                {isAuthenticated ? (
                  <>
                    <Link href="/mypage" className="flex flex-col items-center p-2 text-gray-600 hover:text-green-500 transition-colors">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      <span className="text-xs mt-1">マイページ</span>
                    </Link>

                    <button onClick={handleLogout} className="flex flex-col items-center p-2 text-gray-600 hover:text-red-500 transition-colors">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                      </svg>
                      <span className="text-xs mt-1">ログアウト</span>
                    </button>
                  </>
                ) : (
                  <Link href="/login" className="ec-header__login-button flex flex-col items-center p-2 text-gray-600 hover:text-blue-500 transition-colors">
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
        </div>

        {/* ナビゲーションメニュー */}
        {!isScrolled && (
          <nav className="ec-header__nav bg-gray-100 text-gray-700">
            <div className="w-full px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-12">
                <div className="flex items-center space-x-8">
                  <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="flex items-center gap-2 hover:text-blue-600 transition-colors font-medium"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="3" y1="12" x2="21" y2="12"></line>
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                    メニュー
                  </button>
                  <Link href="/" className="hover:text-blue-600 transition-colors">ホーム</Link>
                  <Link href="/products" className="hover:text-blue-600 transition-colors">商品一覧</Link>
                  <Link href="/category/office" className="hover:text-blue-600 transition-colors">オフィス用品</Link>
                  <Link href="/category/stationery" className="hover:text-blue-600 transition-colors">文具</Link>
                  <Link href="/category/electronics" className="hover:text-blue-600 transition-colors">電化製品</Link>
                  <Link href="/category/furniture" className="hover:text-blue-600 transition-colors">家具</Link>
                </div>
              </div>
            </div>
          </nav>
        )}
      </div>

      {/* モバイルメニュー */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* モバイルヘッダー */}
      <div className="ec-header--mobile lg:hidden bg-white">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <button onClick={() => setIsMobileMenuOpen(true)} className="ec-header__mobile-toggle p-2 text-gray-700 hover:text-blue-600 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <Link href="/" className="ec-header__logo flex items-center">
              <img src="/img/header_logo.png" alt="smartsample" className="h-5 w-auto" />
            </Link>
            <Link href="/cart" className="ec-header__cart-icon p-2 relative">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              {itemCount > 0 && (
                <span className="ec-header__badge absolute top-0 right-0 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{itemCount}</span>
              )}
            </Link>
          </div>
          <form onSubmit={handleSearch} className="ec-header__search-form relative">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="商品を検索"
              className="ec-header__search-input w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            />
          </form>
        </div>
      </div>
      </header>

      {/* カート追加通知トースト */}
      <CartAddedNotification
        item={lastAddedItem}
        isVisible={isNotificationVisible}
      />
    </>
  );
}
