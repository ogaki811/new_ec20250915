/**
 * スキップリンクコンポーネント
 * キーボードナビゲーションでTabキーを押すと表示される
 * メインコンテンツへスキップするためのアクセシビリティ機能
 */
function SkipToContent() {
  const handleSkip = (e) => {
    e.preventDefault();
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <a
      href="#main-content"
      onClick={handleSkip}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      メインコンテンツへスキップ
    </a>
  );
}

export default SkipToContent;
