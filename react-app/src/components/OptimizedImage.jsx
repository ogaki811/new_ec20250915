import { useState } from 'react';

/**
 * 最適化された画像コンポーネント
 * Lazy loading、エラーハンドリング、プレースホルダー表示
 */
function OptimizedImage({
  src,
  alt,
  className = '',
  width,
  height,
  placeholder = '/img/placeholder.jpg',
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className={`ec-optimized-image relative ${className}`}>
      {isLoading && (
        <div className="ec-optimized-image__placeholder absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
      <img
        src={hasError ? placeholder : src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        className={`ec-optimized-image__img ${className} ${isLoading ? 'ec-optimized-image__img--loading opacity-0' : 'opacity-100'} transition-opacity duration-300`}
      />
    </div>
  );
}

export default OptimizedImage;
