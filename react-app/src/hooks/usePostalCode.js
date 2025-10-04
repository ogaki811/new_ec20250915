import { useState } from 'react';

/**
 * usePostalCode - 郵便番号から住所を検索するカスタムフック
 * zipcloud API (https://zipcloud.ibsnet.co.jp/doc/api) を使用
 */
function usePostalCode() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * 郵便番号から住所を検索
   * @param {string} postalCode - 郵便番号（ハイフンあり/なし両対応）
   * @returns {Promise<Object|null>} 住所データまたはnull
   */
  const searchAddress = async (postalCode) => {
    // 郵便番号のバリデーション
    const cleanCode = postalCode.replace(/[^0-9]/g, '');
    if (cleanCode.length !== 7) {
      setError('郵便番号は7桁で入力してください');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${cleanCode}`
      );

      if (!response.ok) {
        throw new Error('住所の取得に失敗しました');
      }

      const data = await response.json();

      if (data.status !== 200) {
        throw new Error(data.message || '住所の取得に失敗しました');
      }

      if (!data.results || data.results.length === 0) {
        setError('該当する住所が見つかりませんでした');
        return null;
      }

      // 最初の結果を返す
      const result = data.results[0];
      return {
        prefecture: result.address1,       // 都道府県
        city: result.address2,             // 市区町村
        address: result.address3,          // 町域
        prefectureKana: result.kana1,      // 都道府県カナ
        cityKana: result.kana2,            // 市区町村カナ
        addressKana: result.kana3,         // 町域カナ
      };
    } catch (err) {
      setError(err.message || '住所の取得に失敗しました');
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * エラーをクリア
   */
  const clearError = () => {
    setError(null);
  };

  return {
    searchAddress,
    loading,
    error,
    clearError,
  };
}

export default usePostalCode;
