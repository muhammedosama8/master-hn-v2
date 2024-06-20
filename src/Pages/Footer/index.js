import { Link } from "react-router-dom";
import Qr from '../../assets/qr_code.jpeg'
import facebook from '../../assets/facebook.svg'
import instagram from '../../assets/instagram.svg'
import twitter from '../../assets/x.svg'
import youtube from '../../assets/youtube.svg'
import snap from '../../assets/snapchat.svg'
import tiktok from '../../assets/tiktok.svg'    
import logo from '../../assets/MasterHN-white.svg'
import phone from '../../assets/phone.svg'
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
        <div className="custom-div pb-4" style={{
            borderRadius: '16px 16px 0 0'
        }}>
            <div className="row">
                <div className="col-md-3">
                    <h2>{t("quick_links")}</h2>
                    <div className="links">
                        <Link to='/'>{t("home")}</Link>
                        <Link to='/products'>{t("products")}</Link>
                        <Link to='/categories'>{t("categories")}</Link>
                        <Link to='about-us'>{t("about-us")}</Link>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="social h-100 d-flex flex-column  justify-content-between">
                            <div className="text-center">
                                <img src={logo} alt='logo' width={150} />
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
                                <p className="text-center mb-0 power">All Rights reserved &copy; Hasan Al Naser
                                <span className="mx-1">{new Date().getFullYear()}</span></p>
                                <p className="text-center mb-0 power mt-1">Powered By 
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
                        <span className="mx-2">Hasan Al Naser</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
export default Footer;