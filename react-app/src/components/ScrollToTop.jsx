import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop - ページ遷移時に自動的に最上部にスクロールするコンポーネント
 * React Routerのルート変更を監視し、ページが変わるたびにスクロール位置をリセット
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
