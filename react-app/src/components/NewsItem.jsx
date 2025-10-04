import { Link } from 'react-router-dom';
import Badge from './Badge';

/**
 * NewsItem - 新着情報アイテムコンポーネント
 */
function NewsItem({ title, date, category, excerpt, link = '#', isNew = false, className = '' }) {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('ja-JP', options);
  };

  return (
    <Link
      to={link}
      className={`block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 hover:border-blue-300 ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          {/* 日付とカテゴリー */}
          <div className="flex items-center gap-3 mb-2">
            <time className="text-sm text-gray-500">{formatDate(date)}</time>
            {category && (
              <>
                <span className="text-gray-300">|</span>
                <Badge variant="secondary" size="sm">
                  {category}
                </Badge>
              </>
            )}
            {isNew && (
              <Badge variant="new" size="sm">
                NEW
              </Badge>
            )}
          </div>

          {/* タイトル */}
          <h3 className="text-base font-semibold text-gray-900 mb-1 hover:text-blue-600 transition-colors">
            {title}
          </h3>

          {/* 要約 */}
          {excerpt && (
            <p className="text-sm text-gray-600 line-clamp-2">{excerpt}</p>
          )}
        </div>

        {/* 矢印アイコン */}
        <div className="flex-shrink-0">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}

export default NewsItem;
