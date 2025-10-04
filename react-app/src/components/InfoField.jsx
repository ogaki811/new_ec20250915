/**
 * InfoField - 情報表示フィールドコンポーネント
 * ラベルと値をペアで表示（マイページ等で使用）
 */
function InfoField({ label, value, icon, className = '', valueClassName = '' }) {
  return (
    <div className={`ec-info-field flex items-start gap-3 py-3 ${className}`}>
      {/* アイコン（オプション） */}
      {icon && (
        <div className="ec-info-field__icon flex-shrink-0 text-gray-400 mt-0.5">
          {icon}
        </div>
      )}

      <div className="ec-info-field__content flex-1 min-w-0">
        {/* ラベル */}
        <dt className="ec-info-field__label text-sm font-medium text-gray-500 mb-1">{label}</dt>

        {/* 値 */}
        <dd className={`ec-info-field__value text-base text-gray-900 break-words ${valueClassName}`}>
          {value || <span className="ec-info-field__empty text-gray-400">未設定</span>}
        </dd>
      </div>
    </div>
  );
}

export default InfoField;
