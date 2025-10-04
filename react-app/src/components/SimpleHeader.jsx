import { Link } from 'react-router-dom';

function SimpleHeader() {
  return (
    <header className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center py-6">
          <Link to="/" className="flex items-center">
            <img src="/img/header_logo.png" alt="smartsample" className="h-6 w-auto" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default SimpleHeader;
