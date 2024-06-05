import './App.css';
import Navbar from './Pages/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home'
import Footer from './Pages/Footer'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
