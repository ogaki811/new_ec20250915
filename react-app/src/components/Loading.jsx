function Loading({ fullScreen = false, size = 'md' }) {
  const sizes = {
    sm: 'ec-loading__spinner--sm w-4 h-4 border-2',
    md: 'ec-loading__spinner--md w-8 h-8 border-4',
    lg: 'ec-loading__spinner--lg w-12 h-12 border-4',
    xl: 'ec-loading__spinner--xl w-16 h-16 border-4',
  };

  const spinner = (
    <div
      className={`ec-loading__spinner ${sizes[size]} border-blue-600 border-t-transparent rounded-full animate-spin`}
    ></div>
  );

  if (fullScreen) {
    return (
      <div className="ec-loading ec-loading--fullscreen ec-loading__overlay fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
        <div className="ec-loading__content text-center">
          {spinner}
          <p className="ec-loading__text mt-4 text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ec-loading flex items-center justify-center p-8">
      {spinner}
    </div>
  );
}

export default Loading;
