import { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";
import { useDispatch, useSelector } from "react-redux";
import { checkAutoLogin } from "./services/AuthService";
import Navbar from "./Pages/Navbar";
import Home from "./Pages/Home";
import Footer from "./Pages/Footer";
import Categories from "./Pages/Categories";
import AboutUs from "./Pages/AboutUs";
import Products from "./Pages/Products";
import ScrollToTop from "./common/ScrollToTop";
import Product from "./Pages/Product";
import Error404 from "./common/Error404";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import Contact from "./Pages/Contact";
import StyleUp from "./Pages/StyleUp";
import Profile from "./Pages/Profile";
import "./i18n";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import OrderFailed from "./common/OrderFailed";
import OrderSuccessful from "./common/OrderSuccessful";

function App() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();
	const lang = useSelector((state) => state?.lang?.lang);

	useEffect(() => {
		AOS.init();

		checkAutoLogin(dispatch, navigate, location?.pathname);
	}, []);

	return (
		<div className={`App ${lang}`}>
			<noscript>
				<iframe
					src="https://www.googletagmanager.com/ns.html?id=GTM-TN45J3FJ"
					height="0"
					width="0"
					style={{ display: "none", visibility: "hidden" }}></iframe>
			</noscript>

			<ToastContainer />
			<ScrollToTop />
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/categories" element={<Categories />} />
				<Route path="/products" element={<Products />} />
				<Route path="/products/product/:id" element={<Product />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="/about-us" element={<AboutUs />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/checkout" element={<Checkout />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/style-up" element={<StyleUp />} />

				<Route path="/order-successful" element={<OrderSuccessful />} />
				<Route path="/order-failed" element={<OrderFailed />} />
				<Route path="*" element={<Error404 />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
