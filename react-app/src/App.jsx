import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
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
import ComingSoon from './pages/ComingSoon';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-complete" element={<OrderComplete />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/coming-soon" element={<ComingSoon />} />
            {/* その他のルートは今後追加予定 */}
            <Route path="/product-detail" element={<ProductDetail />} />
            <Route path="/category/:categoryId" element={<ComingSoon />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/terms" element={<ComingSoon />} />
            <Route path="/privacy" element={<ComingSoon />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
