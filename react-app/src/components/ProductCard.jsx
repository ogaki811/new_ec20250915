import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
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
    toast.success(`${product.name}をカートに追加しました`);
  };

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    const wasFavorite = isFav;
    toggleFavorite(product);

    if (wasFavorite) {
      toast(`${product.name}をお気に入りから削除しました`, {
        icon: '💔',
      });
    } else {
      toast.success(`${product.name}をお気に入りに追加しました`, {
        icon: '❤️',
      });
    }
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
    <div className={`ec-product-card ec-product-card--${size} bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow ${classes.card}`}>
      <Link to={`/product/${product.id}`} className="ec-product-card__link block">
        <div className={`ec-product-card__image-container relative bg-gray-100 ${classes.image} group`}>
          <img
            src={product.image}
            alt={product.name}
            className="ec-product-card__image w-full h-full object-cover"
            loading="lazy"
          />
          <div className="ec-product-card__badges">
            {product.badge && (
              <span className="ec-product-card__badge absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                {product.badge}
              </span>
            )}
            {product.discount && (
              <span className="ec-product-card__discount absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                {product.discount}%OFF
              </span>
            )}
          </div>
          <button
            onClick={handleToggleFavorite}
            className={`ec-product-card__favorite-btn ${isFav ? 'ec-product-card__favorite-btn--active' : ''} absolute bottom-2 right-2 p-2 rounded-full transition-all ${
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
      <div className="ec-product-card__content p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className={`ec-product-card__title font-medium text-gray-900 mb-2 hover:text-blue-600 line-clamp-2 ${classes.title}`}>
            {product.name}
          </h3>
        </Link>
        {product.code && (
          <p className="text-sm text-gray-500 mb-2">商品コード: {product.code}</p>
        )}
        <div className="ec-product-card__price-container mb-3">
          {product.originalPrice && (
            <p className="ec-product-card__original-price text-sm text-gray-500 line-through">¥{product.originalPrice.toLocaleString()}</p>
          )}
          <p className={`ec-product-card__price font-bold text-gray-900 ${classes.price}`}>
            ¥{product.price.toLocaleString()}
          </p>
        </div>
        <Button
          variant="primary"
          fullWidth
          size={size === 'compact' ? 'sm' : 'md'}
          onClick={handleAddToCart}
          className="ec-product-card__cart-btn"
        >
          カートに追加
        </Button>
      </div>
    </div>
  );
}

export default ProductCard;
