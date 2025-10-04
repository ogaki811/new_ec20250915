import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from './components/ErrorBoundary';
import SkipToContent from './components/SkipToContent';
import LiveRegion from './components/LiveRegion';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Footer from './components/Footer';
import Loading from './components/Loading';
import ProtectedRoute from './components/ProtectedRoute';

// ページコンポーネントのLazy Loading
const Home = lazy(() => import('./pages/Home'));
const MyPage = lazy(() => import('./pages/MyPage'));
const OrderHistory = lazy(() => import('./pages/OrderHistory'));
const Favorites = lazy(() => import('./pages/Favorites'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Cart = lazy(() => import('./pages/Cart'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const ProductList = lazy(() => import('./pages/ProductList'));
const Checkout = lazy(() => import('./pages/Checkout'));
const OrderComplete = lazy(() => import('./pages/OrderComplete'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const PasswordResetSent = lazy(() => import('./pages/PasswordResetSent'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const Search = lazy(() => import('./pages/Search'));
const ComingSoon = lazy(() => import('./pages/ComingSoon'));

function AppContent() {
  const location = useLocation();

  // 認証関連のページでは通常のヘッダー・フッターを非表示
  const authPages = ['/login', '/signup', '/forgot-password', '/password-reset-sent', '/reset-password'];
  const isAuthPage = authPages.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
            animation: 'slideIn 0.3s ease-out',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
          className: '',
        }}
        containerStyle={{
          bottom: 20,
          right: 20,
        }}
        toastClassName="toast-slide-in"
      />
      {!isAuthPage && <Header />}
      <main id="main-content" tabIndex="-1" className="flex-grow outline-none">
          <Suspense fallback={<Loading fullScreen />}>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/password-reset-sent" element={<PasswordResetSent />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/search" element={<Search />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/product-detail" element={<ProductDetail />} />
            <Route path="/category/:categoryId" element={<ComingSoon />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/terms" element={<ComingSoon />} />
            <Route path="/privacy" element={<ComingSoon />} />
            <Route path="/coming-soon" element={<ComingSoon />} />

            {/* チェックアウトフロー（ログイン不要） */}
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-complete" element={<OrderComplete />} />

            {/* 保護されたルート（ログイン必須） */}
            <Route path="/mypage" element={<ProtectedRoute><MyPage /></ProtectedRoute>} />
            <Route path="/order-history" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
            </Routes>
          </Suspense>
        </main>
        {!isAuthPage && <Footer />}
      </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <Router>
          <ScrollToTop />
          <SkipToContent />
          <LiveRegion />
          <AppContent />
        </Router>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
