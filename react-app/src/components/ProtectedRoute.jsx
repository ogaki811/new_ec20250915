import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

function ProtectedRoute({ children }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    // 未ログインの場合はログインページへリダイレクト
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
