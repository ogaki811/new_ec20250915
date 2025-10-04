import { useState } from 'react';
import Sidebar from '../Sidebar';

/**
 * SidebarLayout - サイドバー付きページレイアウトテンプレート
 * マイページなどのサイドナビゲーションが必要なページで使用
 */
function SidebarLayout({ children, title, className = '' }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="ec-sidebar-layout min-h-screen bg-gray-50 py-8">
      <div className="ec-sidebar-layout__container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ページタイトル（モバイル） */}
        {title && (
          <div className="ec-sidebar-layout__mobile-title mb-6 lg:hidden">
            <h1 className="ec-sidebar-layout__title text-2xl font-bold text-gray-900">{title}</h1>
          </div>
        )}

        {/* モバイルメニュートグル */}
        <div className="ec-sidebar-layout__mobile-toggle lg:hidden mb-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="ec-sidebar-layout__toggle-button w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg"
          >
            <span className="ec-sidebar-layout__toggle-label font-medium text-gray-900">メニュー</span>
            <svg
              className={`ec-sidebar-layout__toggle-icon w-5 h-5 text-gray-500 transition-transform ${
                isSidebarOpen ? 'ec-sidebar-layout__toggle-icon--open rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        <div className="ec-sidebar-layout__wrapper flex flex-col lg:flex-row gap-8">
          {/* サイドバー */}
          <aside
            className={`ec-sidebar-layout__sidebar lg:w-64 flex-shrink-0 ${
              isSidebarOpen ? 'ec-sidebar-layout__sidebar--open block' : 'hidden lg:block'
            }`}
          >
            <Sidebar />
          </aside>

          {/* メインコンテンツ */}
          <div className={`ec-sidebar-layout__content flex-1 ${className}`}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default SidebarLayout;
