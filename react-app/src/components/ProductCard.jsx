import { Link } from 'react-router-dom';
import Button from './Button';
import useCartStore from '../store/useCartStore';
import useFavoritesStore from '../store/useFavoritesStore';

function ProductCard({ product, size = 'default' }) {
  const addItem = useCartStore((state) => state.addItem);
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const isFav = isFavorite(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem(product);
  };

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    toggleFavorite(product);
  };
  const sizeClasses = {
    compact: {
      card: 'text-sm',
      image: 'aspect-square',
      title: 'text-sm',
      price: 'text-base',
    },
    default: {
      card: '',
      image: 'aspect-square',
      title: 'text-base',
      price: 'text-lg',
    },
    large: {
      card: '',
      image: 'aspect-[4/3]',
      title: 'text-lg',
      price: 'text-xl',
    },
  };

  const classes = sizeClasses[size] || sizeClasses.default;

  return (
    <div className={`bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow ${classes.card}`}>
      <Link to={`/product/${product.id}`} className="block">
        <div className={`relative bg-gray-100 ${classes.image} group`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {product.badge && (
            <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
              {product.badge}
            </span>
          )}
          {product.discount && (
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
              {product.discount}%OFF
            </span>
          )}
          <button
            onClick={handleToggleFavorite}
            className={`absolute bottom-2 right-2 p-2 rounded-full transition-all ${
              isFav ? 'bg-red-500 text-white' : 'bg-white text-gray-400 hover:text-red-500'
            }`}
            aria-label="お気に入り"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill={isFav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className={`font-medium text-gray-900 mb-2 hover:text-blue-600 line-clamp-2 ${classes.title}`}>
            {product.name}
          </h3>
        </Link>
        {product.code && (
          <p className="text-sm text-gray-500 mb-2">商品コード: {product.code}</p>
        )}
        <div className="mb-3">
          {product.originalPrice && (
            <p className="text-sm text-gray-500 line-through">¥{product.originalPrice.toLocaleString()}</p>
          )}
          <p className={`font-bold text-gray-900 ${classes.price}`}>
            ¥{product.price.toLocaleString()}
          </p>
        </div>
        <Button
          variant="primary"
          fullWidth
          size={size === 'compact' ? 'sm' : 'md'}
          onClick={handleAddToCart}
        >
          カートに追加
        </Button>
      </div>
    </div>
  );
}

export default ProductCard;
