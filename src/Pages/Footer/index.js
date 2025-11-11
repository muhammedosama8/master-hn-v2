import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MHSocialMediaService from "../../services/MHSocialMediaService";
import facebook from "../../assets/facebook.svg";
import instagram from "../../assets/instagram.svg";
import twitter from "../../assets/x.svg";
import youtube from "../../assets/youtube.svg";
import snap from "../../assets/snapchat.svg";
import tiktok from "../../assets/tiktok.svg";
import logo from "../../assets/MasterHN-white.svg";
import phone from "../../assets/phone.svg";
import knet from "../../assets/knet.svg";
import mastercard from "../../assets/mastercard.svg";
import visa from "../../assets/visa.svg";
import linkIcon from "../../assets/link-icon.png";
import "./style.css";

const Footer = () => {
	const [data, setData] = useState({
		facebook: "",
		instagram: "",
		twitter: "",
		youtube: "",
		snapchat: "",
		qr_code: "",
	});
	const { t } = useTranslation();
	const mHSocialMediaService = new MHSocialMediaService();

	useEffect(() => {
		mHSocialMediaService.getList().then((res) => {
			if (res?.status === 200 && !!res?.data?.data) {
				setData(res?.data?.data);
			}
		});
	}, []);

	return (
		<div className="mt-5 footer">
			<div
				className="custom-div pb-4 pt-5"
				style={{
					borderRadius: "16px 16px 0 0",
				}}>
				<div className="row">
					<div className="col-md-3 col-12">
						<img src={logo} alt="logo" width={150} />
						<h4 className="mt-4">{t("quick_links")}</h4>
						<div className="links">
							<NavLink
								to="/"
								className={({ isActive }) => (isActive ? "active" : "")}
								aria-current="page">
								{t("home")}
							</NavLink>
							<NavLink
								to="/categories"
								className={({ isActive }) => (isActive ? "active" : "")}
								aria-current="page">
								{t("categories")}
							</NavLink>
							<NavLink
								to="/products"
								className={({ isActive }) => (isActive ? "active" : "")}
								aria-current="page">
								{t("products")}
							</NavLink>
							<NavLink
								to="/about-us"
								className={({ isActive }) => (isActive ? "active" : "")}
								aria-current="page">
								{t("about-us")}
							</NavLink>
							<NavLink
								to="/contact"
								className={({ isActive }) => (isActive ? "active" : "")}
								aria-current="page">
								{t("contact")}
							</NavLink>
						</div>
					</div>
					<div className="col-md-6 col-12">
						<div className="social h-100 d-flex flex-column  justify-content-end">
							<div className="text-center">
								<div className="icons mb-4">
									{!!data?.facebook && (
										<a rel="noreferrer" href={data.facebook} target="_blank">
											<img src={facebook} alt="facebook" />
										</a>
									)}
									{!!data?.instagram && (
										<a rel="noreferrer" href={data?.instagram} target="_blank">
											<img src={instagram} alt="instagram" />
										</a>
									)}
									{!!data.twitter && (
										<a rel="noreferrer" href={data.twitter} target="_blank">
											<img src={twitter} alt="x" />
										</a>
									)}
									{!!data?.you_tube && (
										<a rel="noreferrer" href={data?.you_tube} target="_blank">
											<img src={youtube} alt="youtube" />
										</a>
									)}
									{!!data?.snapchat && (
										<a rel="noreferrer" href={data?.snapchat} target="_blank">
											<img src={snap} alt="snap" />
										</a>
									)}
									{!!data?.tiktok && (
										<a rel="noreferrer" href={data?.tiktok} target="_blank">
											<img src={tiktok} alt="tiktok" />
										</a>
									)}
								</div>
								<div className="visa mb-4">
									<img src={visa} alt="visa" />
									<img src={mastercard} alt="mastercard" className="mx-2" />
									<img src={knet} alt="knet" />
								</div>
							</div>
							<div>
								<a
									href="https://www.hasanalnaser.com"
									style={{
										color: "#fff",
										textDecoration: "none",
										margin: "5px 2px 0",
									}}
									target="_blank"
									className="text-center mb-4 nav-mobile-logo"
									rel="noreferrer">
									<img
										src={linkIcon}
										alt="linkIcon"
										width={20}
										className="mx-2"
									/>
									Hasan Al Naser
								</a>
								<p className="text-center mb-4 power">
									{t("All Rights")} &copy; {t("Hasan Al Naser")}
									<span className="mx-1">{new Date().getFullYear()}</span>
								</p>
								<p className="text-center mb-2 power mt-1">
									{t("Powered By")}
									<a
										rel="noreferrer"
										href="https://www.cloudliftsolution.com/"
										target="_blank"
										style={{
											color: "#fff",
											textDecoration: "none",
											margin: "0 2px",
										}}>
										Cloud Lift Solutions
									</a>
								</p>
							</div>
						</div>
					</div>
					<div className="col-md-3 col-12 qr">
						<div className="mt-3 d-flex">
							<a
								href="https://www.hasanalnaser.com"
								target="_blank"
								className="d-flex text-white text-decoration-none"
								rel="noreferrer">
								<img src={phone} alt="phone" />
								<span className="mx-2">{t("Hasan Al Naser")}</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Footer;
