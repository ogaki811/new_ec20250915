import { Link } from 'react-router-dom';

function SimpleHeader() {
  return (
    <header className="ec-simple-header w-full bg-white">
      <div className="ec-simple-header__container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="ec-simple-header__content flex items-center justify-center py-6">
          <Link to="/" className="ec-simple-header__logo-link flex items-center">
            <img src="/img/header_logo.png" alt="smartsample" className="ec-simple-header__logo h-6 w-auto" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default SimpleHeader;
