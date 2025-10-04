import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import MyPage from './pages/MyPage';
import OrderHistory from './pages/OrderHistory';
import Favorites from './pages/Favorites';
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
            <Route path="/coming-soon" element={<ComingSoon />} />
            {/* その他のルートは今後追加予定 */}
            <Route path="/cart" element={<ComingSoon />} />
            <Route path="/products" element={<ComingSoon />} />
            <Route path="/product-detail" element={<ComingSoon />} />
            <Route path="/category/:categoryId" element={<ComingSoon />} />
            <Route path="/login" element={<ComingSoon />} />
            <Route path="/signup" element={<ComingSoon />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
