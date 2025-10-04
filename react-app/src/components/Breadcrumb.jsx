import { Link } from 'react-router-dom';

function Breadcrumb({ items }) {
  return (
    <section className="ec-breadcrumb bg-gray-50 border-b border-gray-200">
      <div className="ec-breadcrumb__container w-full px-4 sm:px-6 lg:px-8 py-4">
        <nav className="ec-breadcrumb__nav flex items-center space-x-2 text-sm text-gray-600">
          {items.map((item, index) => (
            <div key={index} className="ec-breadcrumb__item flex items-center space-x-2">
              {index > 0 && <span className="ec-breadcrumb__separator text-gray-400">{'>'}</span>}
              {item.href ? (
                <Link to={item.href} className="ec-breadcrumb__link text-blue-600 hover:text-blue-800 transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="ec-breadcrumb__current text-gray-900 font-medium">{item.label}</span>
              )}
            </div>
          ))}
        </nav>
      </div>
    </section>
  );
}

export default Breadcrumb;
