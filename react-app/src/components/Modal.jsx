import { useEffect } from 'react';

function Modal({ isOpen, onClose, title, children, onConfirm, confirmText = '確認', confirmVariant = 'primary', cancelText = 'キャンセル' }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  };

  return (
    <div className="ec-modal fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="ec-modal__overlay fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="ec-modal__container relative bg-white rounded-lg shadow-xl max-w-md w-full p-6 transform transition-all">
          {/* Close button */}
          <button
            onClick={onClose}
            className="ec-modal__close-btn absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Title */}
          {title && (
            <h2 className="ec-modal__title text-xl font-semibold text-gray-900 mb-4 pr-8">
              {title}
            </h2>
          )}

          {/* Content */}
          <div className="ec-modal__content mb-6">
            {children}
          </div>

          {/* Actions */}
          <div className="ec-modal__actions flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="ec-modal__cancel-btn px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
            >
              {cancelText}
            </button>
            {onConfirm && (
              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className={`ec-modal__confirm-btn px-4 py-2 rounded-lg transition-colors font-medium ${variantClasses[confirmVariant]}`}
              >
                {confirmText}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
