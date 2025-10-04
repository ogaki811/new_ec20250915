function Pagination({ currentPage = 1, totalPages = 1, onPageChange, maxVisiblePages = 5 }) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // 最初のページ
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push('...');
      }
    }

    // 中間のページ
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // 最後のページ
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  const handlePageChange = (page) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
      // ページ変更時にトップまでスクロール
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="ec-pagination flex items-center justify-center space-x-2 py-8" aria-label="ページネーション">
      {/* 前へボタン */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`ec-pagination__prev ${currentPage === 1 ? 'ec-pagination__prev--disabled' : ''} px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
        aria-label="前のページ"
      >
        <svg className="ec-pagination__icon w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* ページ番号 */}
      <div className="ec-pagination__list flex items-center space-x-2">
        {pages.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="ec-pagination__ellipsis px-3 py-2 text-gray-500">
                ...
              </span>
            );
          }

          const isActive = page === currentPage;

          return (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`
                ec-pagination__page-btn px-4 py-2 rounded-lg font-medium transition-colors
                ${
                  isActive
                    ? 'ec-pagination__page-btn--active bg-blue-600 text-white'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }
              `}
              aria-label={`ページ ${page}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* 次へボタン */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`ec-pagination__next ${currentPage === totalPages ? 'ec-pagination__next--disabled' : ''} px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
        aria-label="次のページ"
      >
        <svg className="ec-pagination__icon w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </nav>
  );
}

export default Pagination;
