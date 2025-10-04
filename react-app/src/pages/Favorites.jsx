import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import useFavoritesStore from '../store/useFavoritesStore';

function Favorites() {
  const favorites = useFavoritesStore((state) => state.favorites);

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* サイドバー */}
          <Sidebar />

          {/* メインコンテンツ */}
          <div className="lg:col-span-3 mt-8 lg:mt-0">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h1 className="text-3xl font-medium text-gray-900 mb-8 pb-2 border-b-2 border-blue-600">
                お気に入り
              </h1>

              {/* お気に入り商品グリッド */}
              {favorites.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favorites.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">お気に入りがありません</h3>
                  <p className="mt-2 text-gray-500">商品ページからお気に入りに追加してください</p>
                  <div className="mt-6">
                    <Button to="/products" variant="primary">
                      商品を探す
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Favorites;
