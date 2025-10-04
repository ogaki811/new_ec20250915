import { useEffect } from 'react';
import useDebounce from './useDebounce';

/**
 * useFormPersist - フォームデータをLocalStorageに永続化するカスタムフック
 * @param {string} storageKey - LocalStorageのキー名
 * @param {Object} formData - フォームデータ
 * @param {number} delay - デバウンス遅延時間（ミリ秒）
 */
function useFormPersist(storageKey, formData, delay = 1000) {
  // フォームデータの変更をデバウンス
  const debouncedFormData = useDebounce(formData, delay);

  /**
   * LocalStorageからフォームデータを取得
   * @returns {Object|null} 保存されたフォームデータまたはnull
   */
  const getStoredData = () => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Failed to load form data from localStorage:', error);
      return null;
    }
  };

  /**
   * LocalStorageにフォームデータを保存
   */
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(debouncedFormData));
    } catch (error) {
      console.error('Failed to save form data to localStorage:', error);
    }
  }, [debouncedFormData, storageKey]);

  /**
   * LocalStorageからフォームデータを削除
   */
  const clearStoredData = () => {
    try {
      localStorage.removeItem(storageKey);
    } catch (error) {
      console.error('Failed to clear form data from localStorage:', error);
    }
  };

  /**
   * ページ離脱時の警告
   */
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      // フォームデータが空でない場合のみ警告
      const hasData = Object.values(formData).some((value) => {
        if (typeof value === 'boolean') return value;
        if (typeof value === 'string') return value.trim() !== '';
        return value != null;
      });

      if (hasData) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [formData]);

  return {
    getStoredData,
    clearStoredData,
  };
}

export default useFormPersist;
