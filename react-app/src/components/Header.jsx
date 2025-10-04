import { Link } from 'react-router-dom';
import useCartStore from '../store/useCartStore';
import useFavoritesStore from '../store/useFavoritesStore';

function Header() {
  const itemCount = useCartStore((state) => state.getItemCount());
  const favoriteCount = useFavoritesStore((state) => state.getFavoriteCount());
  return (
    <header className="w-full">
      {/* デスクトップヘッダー */}
      <div className="hidden lg:block">
        {/* メインヘッダー */}
        <div className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              {/* ロゴエリア */}
              <div className="flex-shrink-0">
                <Link to="/" className="flex items-center space-x-3">
                  <img src="/img/header_logo.png" alt="ECサイト" className="h-8 w-auto hidden" />
                  <span className="text-2xl font-bold text-black">smartsample</span>
                </Link>
              </div>

              {/* 検索エリア */}
              <div className="flex-1 max-w-2xl mx-8 relative">
                <form className="relative">
                  <div className="relative">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.35-4.35"></path>
                    </svg>
                    <input type="text" placeholder="商品名やメーカー、品番から探す" className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <button type="submit" className="absolute right-0 top-0 h-full px-4 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors">
                    <span>検索</span>
                  </button>
                </form>
              </div>

              {/* 機能エリア */}
              <div className="flex items-center space-x-4">
                <Link to="/cart" className="flex flex-col items-center p-2 text-gray-600 hover:text-blue-500 transition-colors">
                  <div className="relative">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <circle cx="9" cy="21" r="1"></circle>
                      <circle cx="20" cy="21" r="1"></circle>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    {itemCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{itemCount}</span>
                    )}
                  </div>
                  <span className="text-xs mt-1">カート</span>
                </Link>

                <Link to="/favorites" className="flex flex-col items-center p-2 text-gray-600 hover:text-red-500 transition-colors">
                  <div className="relative">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
                  </div>
                  <span className="text-xs mt-1">お気に入り</span>
                </Link>

                <Link to="/mypage" className="flex flex-col items-center p-2 text-gray-600 hover:text-green-500 transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span className="text-xs mt-1">マイページ</span>
                </Link>

                <Link to="/signup" className="flex flex-col items-center p-2 text-gray-600 hover:text-blue-500 transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="8.5" cy="7" r="4"></circle>
                    <line x1="20" y1="8" x2="20" y2="14"></line>
                    <line x1="23" y1="11" x2="17" y2="11"></line>
                  </svg>
                  <span className="text-xs mt-1">新規登録</span>
                </Link>

                <Link to="/login" className="flex flex-col items-center p-2 text-gray-600 hover:text-blue-500 transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                    <polyline points="10 17 15 12 10 7"></polyline>
                    <line x1="15" y1="12" x2="3" y2="12"></line>
                  </svg>
                  <span className="text-xs mt-1">ログイン</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ナビゲーションメニュー */}
        <nav className="bg-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-12">
              <div className="flex items-center space-x-8">
                <Link to="/" className="hover:text-blue-400 transition-colors">ホーム</Link>
                <Link to="/products" className="hover:text-blue-400 transition-colors">商品一覧</Link>
                <Link to="/category/office" className="hover:text-blue-400 transition-colors">オフィス用品</Link>
                <Link to="/category/stationery" className="hover:text-blue-400 transition-colors">文具</Link>
                <Link to="/category/electronics" className="hover:text-blue-400 transition-colors">電化製品</Link>
                <Link to="/category/furniture" className="hover:text-blue-400 transition-colors">家具</Link>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* モバイルヘッダー */}
      <div className="lg:hidden bg-white shadow-md">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <button className="p-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <Link to="/" className="text-xl font-bold text-black">smartsample</Link>
            <Link to="/cart" className="p-2 relative">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{itemCount}</span>
              )}
            </Link>
          </div>
          <div className="relative">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input type="text" placeholder="商品を検索" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
