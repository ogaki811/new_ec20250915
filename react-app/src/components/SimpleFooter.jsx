import { Link } from 'react-router-dom';

function SimpleFooter() {
  return (
    <footer className="w-full bg-gray-800 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center space-x-6 text-sm">
            <Link to="/terms" className="hover:text-blue-400 transition-colors">
              利用規約
            </Link>
            <Link to="/privacy" className="hover:text-blue-400 transition-colors">
              プライバシーポリシー
            </Link>
            <Link to="/" className="hover:text-blue-400 transition-colors">
              ホームへ戻る
            </Link>
          </div>
          <div className="text-sm text-gray-400">
            <p>&copy; 2025 smartsample. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default SimpleFooter;
