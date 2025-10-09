import React, { useState } from 'react';
import Icon from './Icon';
import type { BannerVariant } from '@/types/banner';

export type { BannerVariant };

interface BannerProps {
  variant?: BannerVariant;
  message: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  action?: {
    label: string;
    onClick: () => void;
  };
  imageUrl?: string;
}

const Banner: React.FC<BannerProps> = ({
  variant = 'info',
  message,
  dismissible = false,
  onDismiss,
  action,
  imageUrl,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  if (!isVisible) return null;

  const variantStyles = {
    info: 'bg-blue-50 border-blue-200 text-blue-900',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-900',
    error: 'bg-red-50 border-red-200 text-red-900',
    success: 'bg-green-50 border-green-200 text-green-900',
  };

  const iconNames = {
    info: 'info',
    warning: 'alert',
    error: 'close',
    success: 'check',
  };

  return (
    <div
      className={`border-b ${variantStyles[variant]}`}
      role="alert"
    >
      {imageUrl && (
        <div className="w-full">
          <img
            src={imageUrl}
            alt="Banner"
            className="w-full h-auto object-cover"
            style={{ maxHeight: '200px' }}
          />
        </div>
      )}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center flex-1">
          <Icon name={iconNames[variant]} size={20} className="mr-3 flex-shrink-0" />
          <p className="text-sm font-medium">{message}</p>
        </div>

        <div className="flex items-center gap-3 ml-4">
          {action && (
            <button
              onClick={action.onClick}
              className="text-sm font-semibold underline hover:no-underline"
            >
              {action.label}
            </button>
          )}
          {dismissible && (
            <button
              onClick={handleDismiss}
              className="p-1 hover:bg-black/5 rounded transition-colors"
              aria-label="閉じる"
            >
              <Icon name="close" size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
