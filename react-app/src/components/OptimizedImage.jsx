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
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
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
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
      />
    </div>
  );
}

export default OptimizedImage;
