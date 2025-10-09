import React from 'react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'spinner' | 'dots' | 'pulse';
  fullScreen?: boolean;
  text?: string;
}

const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  variant = 'spinner',
  fullScreen = false,
  text,
}) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  const spinnerSizes = {
    sm: 'border-2',
    md: 'border-4',
    lg: 'border-4',
    xl: 'border-[6px]',
  };

  const LoadingSpinner = () => (
    <div
      className={`${sizes[size]} ${spinnerSizes[size]} border-blue-600 border-t-transparent rounded-full animate-spin`}
    />
  );

  const LoadingDots = () => (
    <div className="flex space-x-2">
      <div className={`${sizes[size]} bg-blue-600 rounded-full animate-bounce`} style={{ animationDelay: '0ms' }} />
      <div className={`${sizes[size]} bg-blue-600 rounded-full animate-bounce`} style={{ animationDelay: '150ms' }} />
      <div className={`${sizes[size]} bg-blue-600 rounded-full animate-bounce`} style={{ animationDelay: '300ms' }} />
    </div>
  );

  const LoadingPulse = () => (
    <div className={`${sizes[size]} bg-blue-600 rounded-full animate-pulse`} />
  );

  const renderLoading = () => {
    switch (variant) {
      case 'spinner':
        return <LoadingSpinner />;
      case 'dots':
        return <LoadingDots />;
      case 'pulse':
        return <LoadingPulse />;
      default:
        return <LoadingSpinner />;
    }
  };

  const content = (
    <div className="flex flex-col items-center justify-center gap-3">
      {renderLoading()}
      {text && <p className="text-gray-600 text-sm">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        {content}
      </div>
    );
  }

  return content;
};

export default Loading;
