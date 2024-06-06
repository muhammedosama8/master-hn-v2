import './App.css';
import Navbar from './Pages/Navbar';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from './Pages/Home'
import Footer from './Pages/Footer'
import Categories from './Pages/Categories';
import AboutUs from './Pages/AboutUs';
import Products from './Pages/Products';
import ScrollToTop from './common/ScrollToTop';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/categories' element={<Categories />} />
            <Route path='/products' element={<Products />} />
            <Route path='/about-us' element={<AboutUs />} />
          </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
