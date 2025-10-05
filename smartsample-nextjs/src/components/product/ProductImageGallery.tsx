'use client';

import { useState } from 'react';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [imageError, setImageError] = useState(false);

  const currentImage = imageError ? '/img/placeholder.png' : images[selectedImage];

  return (
    <div className="space-y-4">
      {/* メイン画像 */}
      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={currentImage}
          alt={`${productName} - 画像${selectedImage + 1}`}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      </div>

      {/* サムネイル */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedImage(index);
                setImageError(false);
              }}
              className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-all ${
                selectedImage === index
                  ? 'border-blue-600'
                  : 'border-transparent hover:border-gray-300'
              }`}
            >
              <img
                src={image}
                alt={`${productName} サムネイル${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/img/placeholder.png';
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
