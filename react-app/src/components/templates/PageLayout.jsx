/**
 * PageLayout - 基本ページレイアウトテンプレート
 * ヘッダー・フッターを含む標準的なページ構造を提供
 */
function PageLayout({ children, title, breadcrumb, maxWidth = '7xl', className = '' }) {
  return (
    <div className={`ec-page-layout min-h-screen flex flex-col ${className}`}>
      {children}
    </div>
  );
}

export default PageLayout;
