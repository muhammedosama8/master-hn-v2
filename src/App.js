import './App.css';
import Navbar from './Pages/Navbar';
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from './Pages/Home'
import Footer from './Pages/Footer'
import Categories from './Pages/Categories';
import AboutUs from './Pages/AboutUs';
import Products from './Pages/Products';
import ScrollToTop from './common/ScrollToTop';
import Product from './Pages/Product';
import { useEffect } from 'react';
import { checkAutoLogin } from './services/AuthService';
import { useDispatch } from 'react-redux';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    checkAutoLogin(dispatch, navigate);
  }, []);

  return (
    <div className="App">
        <ScrollToTop />
        <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/categories' element={<Categories />} />
            <Route path='/products' element={<Products />} />
            <Route path='/products/product/:id' element={<Product />} />
            <Route path='/about-us' element={<AboutUs />} />
          </Routes>
        <Footer />
    </div>
  );
}

export default App;
