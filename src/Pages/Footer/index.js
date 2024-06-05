import { Link } from "react-router-dom";
import Qr from '../../assets/qr_code.jpeg'
import facebook from '../../assets/facebook.svg'
import instagram from '../../assets/instagram.svg'
import twitter from '../../assets/x.svg'
import youtube from '../../assets/youtube.svg'
import snap from '../../assets/snapchat.svg'
import tiktok from '../../assets/tiktok.svg'    
import './style.css'

const Footer = () => {
    const data = {
        facebook: '',
        instagram: '',
        twitter: '',
        youtube: '',
        snap: '',

    }
    return <div className="mt-5 footer">
    <div className="custom-div pb-4" style={{
        borderRadius: '16px 16px 0 0'
    }}>
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <h2>Quick Links</h2>
                    <div className="links">
                        <Link>Home</Link>
                        <Link>Products</Link>
                        <Link>Categories</Link>
                        <Link>About Us</Link>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="social d-block">
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
                <div className="col-md-4" style={{textAlign: 'right'}}>
                    <img src={Qr} alt='Qr' width={150}/>
                </div>
            </div>
        </div>
    </div>
    </div>
}
export default Footer;