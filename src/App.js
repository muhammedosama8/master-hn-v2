import { useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { checkAutoLogin } from './services/AuthService';
import Navbar from './Pages/Navbar';
import Home from './Pages/Home'
import Footer from './Pages/Footer'
import Categories from './Pages/Categories';
import AboutUs from './Pages/AboutUs';
import Products from './Pages/Products';
import ScrollToTop from './common/ScrollToTop';
import Product from './Pages/Product';
import Error404 from './common/Error404';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import Contact from './Pages/Contact';
import './i18n';
import 'swiper/css';
import 'swiper/css/pagination';
import './App.css';
import Profile from './Pages/Profile';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lang = useSelector(state=> state?.lang?.lang)

  useEffect(() => {
    checkAutoLogin(dispatch, navigate);
  }, []);

  return (
    <div className={`App ${lang}`}>
        <ToastContainer />
        <ScrollToTop />
        <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/categories' element={<Categories />} />
            <Route path='/products' element={<Products />} />
            <Route path='/products/product/:id' element={<Product />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/about-us' element={<AboutUs />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='*' element={<Error404 />} />
          </Routes>
        <Footer />
    </div>
  );
}

export default App;
