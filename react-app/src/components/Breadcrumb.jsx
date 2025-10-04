import { Link } from 'react-router-dom';

function Breadcrumb({ items }) {
  return (
    <section className="bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          {items.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              {index > 0 && <span className="text-gray-400">{'>'}</span>}
              {item.href ? (
                <Link to={item.href} className="text-blue-600 hover:text-blue-800 transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-900 font-medium">{item.label}</span>
              )}
            </div>
          ))}
        </nav>
      </div>
    </section>
  );
}

export default Breadcrumb;
