'use client';

import Link from 'next/link';
import toast from 'react-hot-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/common/Breadcrumb';
import ProductGrid from '@/components/product/ProductGrid';
import useFavoritesStore from '@/store/useFavoritesStore';

export default function FavoritesPage() {
  const { favorites, clearFavorites } = useFavoritesStore();

  const handleClearAll = () => {
    if (window.confirm('すべてのお気に入りを削除しますか？')) {
      clearFavorites();
      toast.success('お気に入りをすべて削除しました');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={[{ label: 'お気に入り' }]} />

          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                お気に入り
              </h1>
              <p className="text-gray-600 mt-2">
                {favorites.length}件の商品をお気に入りに登録しています
              </p>
            </div>
            {favorites.length > 0 && (
              <button
                onClick={handleClearAll}
                className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                すべて削除
              </button>
            )}
          </div>

          {favorites.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <svg
                className="mx-auto h-24 w-24 text-gray-400 mb-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                お気に入りはまだありません
              </h2>
              <p className="text-gray-600 mb-8">
                気になる商品をお気に入りに追加して、<br />
                いつでも簡単にチェックできます
              </p>
              <Link
                href="/products"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                商品を探す
              </Link>
            </div>
          ) : (
            <>
              <ProductGrid products={favorites} />

              {/* お気に入りのヒント */}
              <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-start">
                  <svg
                    className="w-6 h-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">
                      お気に入り機能について
                    </h3>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• お気に入りに追加した商品は、こちらのページでいつでも確認できます</li>
                      <li>• 商品ページのハートアイコンをクリックして追加・削除できます</li>
                      <li>• お気に入りはブラウザに保存されます</li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
