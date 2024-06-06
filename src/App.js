import './App.css';
import Navbar from './Pages/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home'
import Footer from './Pages/Footer'
import Categories from './Pages/Categories';
import AboutUs from './Pages/AboutUs';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/categories' element={<Categories />} />
            <Route path='/about-us' element={<AboutUs />} />
          </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
