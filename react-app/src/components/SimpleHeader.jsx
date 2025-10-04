import { Link } from 'react-router-dom';

function SimpleHeader() {
  return (
    <header className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center py-6">
          <Link to="/" className="flex items-center space-x-3">
            <img src="/img/header_logo.png" alt="ECサイト" className="h-8 w-auto hidden" />
            <span className="text-2xl font-bold text-black">smartsample</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default SimpleHeader;
