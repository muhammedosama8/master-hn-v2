import { Link, NavLink } from "react-router-dom";
import Qr from '../../assets/qr_code.jpeg'
import facebook from '../../assets/facebook.svg'
import instagram from '../../assets/instagram.svg'
import twitter from '../../assets/x.svg'
import youtube from '../../assets/youtube.svg'
import snap from '../../assets/snapchat.svg'
import tiktok from '../../assets/tiktok.svg'    
import logo from '../../assets/MasterHN-white.svg'
import phone from '../../assets/phone.svg'
import knet from '../../assets/knet.svg'
import mastercard from '../../assets/mastercard.svg'
import visa from '../../assets/visa.svg'
import './style.css'
import { useTranslation } from "react-i18next";

const Footer = () => {
    const data = {
        facebook: '',
        instagram: '',
        twitter: '',
        youtube: '',
        snap: '',

    }
    const {t} = useTranslation()

    return <div className="mt-5 footer">
        <div className="custom-div pb-4 pt-5" style={{
            borderRadius: '16px 16px 0 0'
        }}>
            <div className="row">
                <div className="col-md-3">
                    <img src={logo} alt='logo' width={150} />
                    <h4 className="mt-4">{t("quick_links")}</h4>
                    <div className="links">
                        <NavLink to='/' className={({ isActive }) => isActive ? "active" : ""} aria-current="page" >{t("home")}</NavLink>
                        <NavLink to='/categories' className={({ isActive }) => isActive ? "active" : ""} aria-current="page">{t("categories")}</NavLink>
                        <NavLink to='/products' className={({ isActive }) => isActive ? "active" : ""} aria-current="page">{t("products")}</NavLink>
                        <NavLink to='/about-us' className={({ isActive }) => isActive ? "active" : ""} aria-current="page">{t("about-us")}</NavLink>
                        <NavLink to='/contact' className={({ isActive }) => isActive ? "active" : ""} aria-current="page">{t("contact")}</NavLink>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="social h-100 d-flex flex-column  justify-content-between">
                            <div className="text-center">
                                <div className="visa">
                                    <img src={visa} alt='visa' />
                                    <img src={mastercard} alt='mastercard' className="mx-2" />
                                    <img src={knet} alt='knet' />
                                </div>
                                <div className="icons">
                                    <a rel="noreferrer" href={data.facebook} target='_blank'>
                                        <img src={facebook} alt='facebook' />
                                    </a>
                                    <a rel="noreferrer" href={data?.instagram} target='_blank'>
                                        <img src={instagram} alt='instagram' />
                                    </a>
                                    <a rel="noreferrer" href={data.twitter} target='_blank'>
                                        <img src={twitter} alt='x' />
                                    </a>
                                    <a rel="noreferrer" href={data?.you_tube} target='_blank'>
                                        <img src={youtube} alt='youtube' />
                                    </a>
                                    <a rel="noreferrer" href={data?.snap} target='_blank'>
                                        <img src={snap} alt='snap' />
                                    </a>
                                    <a rel="noreferrer" href={data?.tiktok} target='_blank'>
                                        <img src={tiktok} alt='tiktok' />
                                    </a>
                                </div>
                            </div>
                            <div>
                                <p className="text-center mb-4 power">{t("All Rights")} &copy; {t("Hasan Al Naser")}
                                <span className="mx-1">{new Date().getFullYear()}</span></p>
                                <p className="text-center mb-2 power mt-1">{t("Powered By")}
                                <a rel="noreferrer" 
                                    href='https://www.cloudliftsolution.com/' 
                                    target='_blank'
                                    style={{
                                        color: '#fff',
                                        textDecoration: 'none',
                                        margin: '0 2px'
                                    }}
                                >Cloud Lift Solutions</a>
                                </p>
                            </div>
                    </div>
                </div>
                <div className="col-md-3 qr">
                    <img src={Qr} alt='Qr' width={150}/>
                    <div className="mt-3 d-flex justify-content-end">
                        <img src={phone} alt='phone' />
                        <span className="mx-2">{t("Hasan Al Naser")}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
export default Footer;