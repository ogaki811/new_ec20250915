import { useEffect } from 'react';

/**
 * キーボードナビゲーションのカスタムフック
 * @param {Object} options - オプション設定
 * @param {boolean} options.enabled - フックを有効化するかどうか
 * @param {Function} options.onEscape - Escapeキー押下時のコールバック
 * @param {Function} options.onEnter - Enterキー押下時のコールバック
 * @param {Function} options.onArrowUp - 上矢印キー押下時のコールバック
 * @param {Function} options.onArrowDown - 下矢印キー押下時のコールバック
 * @param {Function} options.onArrowLeft - 左矢印キー押下時のコールバック
 * @param {Function} options.onArrowRight - 右矢印キー押下時のコールバック
 */
function useKeyboardNavigation({
  enabled = true,
  onEscape,
  onEnter,
  onArrowUp,
  onArrowDown,
  onArrowLeft,
  onArrowRight,
} = {}) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'Escape':
          if (onEscape) {
            event.preventDefault();
            onEscape(event);
          }
          break;
        case 'Enter':
          if (onEnter) {
            event.preventDefault();
            onEnter(event);
          }
          break;
        case 'ArrowUp':
          if (onArrowUp) {
            event.preventDefault();
            onArrowUp(event);
          }
          break;
        case 'ArrowDown':
          if (onArrowDown) {
            event.preventDefault();
            onArrowDown(event);
          }
          break;
        case 'ArrowLeft':
          if (onArrowLeft) {
            event.preventDefault();
            onArrowLeft(event);
          }
          break;
        case 'ArrowRight':
          if (onArrowRight) {
            event.preventDefault();
            onArrowRight(event);
          }
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [enabled, onEscape, onEnter, onArrowUp, onArrowDown, onArrowLeft, onArrowRight]);
}

export default useKeyboardNavigation;
