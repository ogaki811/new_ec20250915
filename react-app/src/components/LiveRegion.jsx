import { useEffect, useState } from 'react';

/**
 * スクリーンリーダー用のライブリージョンコンポーネント
 * 動的なコンテンツの変更をスクリーンリーダーユーザーに通知
 */
function LiveRegion() {
  const [message, setMessage] = useState('');
  const [politeness, setPoliteness] = useState('polite');

  useEffect(() => {
    // グローバルイベントリスナーを設定
    const handleAnnounce = (event) => {
      const { message: msg, politeness: pol = 'polite' } = event.detail;
      setMessage(msg);
      setPoliteness(pol);

      // メッセージをクリア（次の通知のため）
      setTimeout(() => setMessage(''), 100);
    };

    window.addEventListener('announce', handleAnnounce);

    return () => {
      window.removeEventListener('announce', handleAnnounce);
    };
  }, []);

  return (
    <div
      role="status"
      aria-live={politeness}
      aria-atomic="true"
      className="sr-only"
    >
      {message}
    </div>
  );
}

// ヘルパー関数：スクリーンリーダーへのアナウンス
export const announce = (message, politeness = 'polite') => {
  const event = new CustomEvent('announce', {
    detail: { message, politeness },
  });
  window.dispatchEvent(event);
};

export default LiveRegion;
