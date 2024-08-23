import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import shoppingBag from '../../assets/shopping-bag.png'
import userIcon from '../../assets/user.png'
import logo from '../../assets/MasterHN-white.svg'
import translate from '../../assets/translate.svg'
import './style.css'
import { useEffect, useState } from 'react'
import Authentication from '../Home/Authentication'
import { useDispatch, useSelector } from 'react-redux'
import Dropdown from 'react-bootstrap/Dropdown';
import { Logout } from '../../services/AuthService'
import { useTranslation } from 'react-i18next'
import { changeLang } from '../../store/actions/LangActions'
import { ShowLogin } from '../../store/actions/AuthActions'
import CartService from '../../services/CartService'

const Navbar = () =>{
  const [cart, setCartLength] = useState(0)
  const [shouldUpdate, setShouldUpdate] = useState(false)
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    dispatch(changeLang(lng))
  };

  useEffect(()=>{
    if(!!user?.user){
      new CartService().getList().then(res=>{
          if(res?.status === 200){
            setCartLength(res.data?.data?.sub_carts?.length)
          }
      }).catch(() => setCartLength(0))
    } else {
      setCartLength(user?.cart?.length || 0)
    }
  },[shouldUpdate, user, user.cart])

  useEffect(()=>{
    setTimeout(()=> setShouldUpdate(prev=> !prev),200)
  },[user.isLogin])

  return <div>
    <nav className="navbar navbar-expand-lg">
      <div className='row w-100 m-auto' style={{alignItems: 'center'}}>
        <div className='col-12 nav-mobile-logo mb-3' style={{textAlign: 'center'}}>
          <Link to='/' className="navbar-brand logo m-0 p-0" >
            <img src={logo} alt='logo' width={150} />
          </Link>
        </div>
        <div className='col-md-5 col-6'>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" style={{width: 'fit-content'}} id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <NavLink to='/' className={({ isActive }) => isActive ? "active nav-link py-0" : "nav-link py-0"} aria-current="page" >{t('home')}</NavLink>
              <NavLink to='/categories' className={({ isActive }) => isActive ? "active nav-link py-0" : "nav-link py-0"} aria-current="page">{t('categories')}</NavLink>
              <NavLink to='/products' state={''} className={({ isActive }) => isActive ? "active nav-link py-0" : "nav-link py-0"} aria-current="page">{t('products')}</NavLink>
              <NavLink to='/about-us' className={({ isActive }) => isActive ? "active nav-link py-0" : "nav-link py-0"} aria-current="page">{t('about-us')}</NavLink>
              <NavLink to='/contact' className={({ isActive }) => isActive ? "active nav-link py-0" : "nav-link py-0"} aria-current="page">{t('contact')}</NavLink>
            </div>
          </div>
        </div>
        <div className='col-md-3 col-5 nav-logo' style={{textAlign: 'center'}}>
          <Link to='/' className="navbar-brand logo m-0 p-0" >
          <img src={logo} alt='logo' width={150} />
        </Link>
        </div>
        <div className='col-md-4 col-6 d-flex align-items-center' style={{justifyContent: 'end'}}>
        <Dropdown>
          <Dropdown.Toggle id="dropdown-basic" className='p-0' style={{background: 'none', border: 'none'}}>
          <img src={translate} alt='translate' width={27} className='mx-1' />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item style={{color: '#000'}} onClick={()=> changeLanguage('en')}>
              English
            </Dropdown.Item>
            <Dropdown.Item style={{color: '#000'}} onClick={()=> changeLanguage('ar')}>
              اللغه العربيه
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
          <Link to='/cart' className="nav-link p-0 d-flex position-relative" style={{margin: '0 16px', alignItems: 'center'}}>
            <img src={shoppingBag} alt='shoppingBag' width={28}/>
            {cart > 0 && <p className='cart-num'>{cart}</p>}
          </Link>
          {!!user?.user ?  <Dropdown>
          <Dropdown.Toggle id="dropdown-basic" className='p-0' style={{background: 'none', border: 'none', paddingRight: '0'}}>
            <img src={user?.user?.avatar || userIcon} alt='user' height={28} width={28} style={{borderRadius: '50%'}}/>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item style={{color: '#000'}} onClick={()=> navigate('/profile')}>
              {t("Profile")}
            </Dropdown.Item>
            <Dropdown.Item style={{color: '#000'}} onClick={()=> Logout(user?.accessToken, dispatch, navigate, location?.pathname)}>
              {t("Logout")}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> : <button type='button' onClick={()=> dispatch(ShowLogin(true))} className="nav-link p-0">
            <img src={userIcon} alt='user' width={28}/>
          </button>}
          {user?.showLogin && 
            <Authentication 
              modal={user?.showLogin} 
              setModal={()=> dispatch(ShowLogin(false))}
            />
          }
        </div>
      </div>
    </nav>
  </div>
}
export default Navbar