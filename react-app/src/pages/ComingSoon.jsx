import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function ComingSoon() {
  return (
    <main className="ec-coming-soon min-h-screen bg-gray-50 py-8">
      <div className="ec-coming-soon__container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="ec-coming-soon__layout lg:grid lg:grid-cols-4 lg:gap-8">
          {/* サイドバー */}
          <Sidebar />

          {/* メインコンテンツ */}
          <div className="ec-coming-soon__content lg:col-span-3 mt-8 lg:mt-0">
            <div className="ec-coming-soon__card bg-white rounded-lg shadow-sm p-12 text-center">
              <div className="ec-coming-soon__icon-wrapper mx-auto w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center mb-8">
                <svg className="ec-coming-soon__icon w-16 h-16 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>

              <h1 className="ec-coming-soon__title text-3xl font-bold text-gray-900 mb-4">このページは準備中です</h1>
              <p className="ec-coming-soon__description text-lg text-gray-600 mb-8">
                現在、このページを開発中です。<br />
                近日中に公開予定ですので、しばらくお待ちください。
              </p>

              <div className="ec-coming-soon__actions flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/mypage"
                  className="ec-coming-soon__mypage-link inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <svg className="ec-coming-soon__mypage-icon w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  マイページに戻る
                </Link>
                <Link
                  to="/"
                  className="ec-coming-soon__home-link inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <svg className="ec-coming-soon__home-icon w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  ホームに戻る
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ComingSoon;
