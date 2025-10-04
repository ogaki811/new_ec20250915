import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from './components/ErrorBoundary';
import SkipToContent from './components/SkipToContent';
import LiveRegion from './components/LiveRegion';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import MyPage from './pages/MyPage';
import OrderHistory from './pages/OrderHistory';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import ProductList from './pages/ProductList';
import Checkout from './pages/Checkout';
import OrderComplete from './pages/OrderComplete';
import ForgotPassword from './pages/ForgotPassword';
import Search from './pages/Search';
import ComingSoon from './pages/ComingSoon';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <SkipToContent />
        <LiveRegion />
        <div className="flex flex-col min-h-screen">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
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
          }}
        />
        <Header />
        <main id="main-content" tabIndex="-1" className="flex-grow outline-none">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
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

            {/* 保護されたルート（ログイン必須） */}
            <Route path="/mypage" element={<ProtectedRoute><MyPage /></ProtectedRoute>} />
            <Route path="/order-history" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
            <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
            <Route path="/order-complete" element={<ProtectedRoute><OrderComplete /></ProtectedRoute>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
    </ErrorBoundary>
  );
}

export default App;
