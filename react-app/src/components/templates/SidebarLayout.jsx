import { useState } from 'react';
import Sidebar from '../Sidebar';

/**
 * SidebarLayout - サイドバー付きページレイアウトテンプレート
 * マイページなどのサイドナビゲーションが必要なページで使用
 */
function SidebarLayout({ children, title, className = '' }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ページタイトル（モバイル） */}
        {title && (
          <div className="mb-6 lg:hidden">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          </div>
        )}

        {/* モバイルメニュートグル */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg"
          >
            <span className="font-medium text-gray-900">メニュー</span>
            <svg
              className={`w-5 h-5 text-gray-500 transition-transform ${
                isSidebarOpen ? 'rotate-180' : ''
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

        <div className="flex flex-col lg:flex-row gap-8">
          {/* サイドバー */}
          <aside
            className={`lg:w-64 flex-shrink-0 ${
              isSidebarOpen ? 'block' : 'hidden lg:block'
            }`}
          >
            <Sidebar />
          </aside>

          {/* メインコンテンツ */}
          <div className={`flex-1 ${className}`}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default SidebarLayout;
