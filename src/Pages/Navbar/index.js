import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import shoppingBag from '../../assets/shopping-bag.png'
import user from '../../assets/user.png'
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

const Navbar = () =>{
  const [cart, setCart] = useState(0)
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth = useSelector(state => state)
  const lang = useSelector(state => state.lang?.lang)
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    dispatch(changeLang(lng))
  };

  useEffect(()=>{ 
    setCart(auth.user.cart?.length)
  },[location, auth])

  return <div>
    <nav className="navbar navbar-expand-lg">
      <div className='row w-100 m-auto' style={{alignItems: 'center'}}>
        <div className='col-5'>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" style={{width: 'fit-content'}} id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <NavLink to='/' className={({ isActive }) => isActive ? "active nav-link py-0" : "nav-link py-0"} aria-current="page" >{t('home')}</NavLink>
              <NavLink to='/categories' className={({ isActive }) => isActive ? "active nav-link py-0" : "nav-link py-0"} aria-current="page">{t('categories')}</NavLink>
              <NavLink to='/products' className={({ isActive }) => isActive ? "active nav-link py-0" : "nav-link py-0"} aria-current="page">{t('products')}</NavLink>
              <NavLink to='/about-us' className={({ isActive }) => isActive ? "active nav-link py-0" : "nav-link py-0"} aria-current="page">{t('about-us')}</NavLink>
              <NavLink to='/contact' className={({ isActive }) => isActive ? "active nav-link py-0" : "nav-link py-0"} aria-current="page">{t('contact')}</NavLink>
            </div>
            {/* <h2>{t('welcome')}</h2> */}
          </div>
        </div>
        <div className='col-3' style={{textAlign: 'center'}}>
          <Link to='/' className="navbar-brand logo m-0 p-0" >
          <img src={logo} alt='logo' width={150} />
        </Link>
        </div>
        <div className='col-4 d-flex align-items-center' style={{justifyContent: 'end'}}>
          <button style={{
              background: '#fff', 
              border: '0', 
              padding: '4px 8px', 
              borderRadius: '22px',
              color: '#000'
            }}
            onClick={()=> {
              if(lang === 'en'){
                changeLanguage('ar')
              } else {
                changeLanguage('en')
              }
            }}
          >
            <img src={translate} alt='translate' width={28} />
            <span className='mx-2'>{lang === 'en' ? "English" : "اللغه العربيه"}</span>
          </button>
        {/* <Dropdown>
          <Dropdown.Toggle id="dropdown-basic" className='py-0' style={{background: 'none', border: 'none', paddingRight: '0'}}>
          <img src={translate} alt='translate' width={28} className='mx-1' style={{marginTop: '3px'}} />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item style={{color: '#000'}} onClick={()=> changeLanguage('en')}>
              English
            </Dropdown.Item>
            <Dropdown.Item style={{color: '#000'}} onClick={()=> changeLanguage('ar')}>
              اللغه العربيه
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> */}
          <Link to='/cart' className="nav-link p-0 d-flex position-relative" style={{margin: '0 16px', alignItems: 'center'}}>
            <img src={shoppingBag} alt='shoppingBag' width={28}/>
            {cart > 0 && <p className='cart-num'>{cart}</p>}
          </Link>
          {!!auth.user?.user ?  <Dropdown>
          <Dropdown.Toggle id="dropdown-basic" className='p-0' style={{background: 'none', border: 'none', paddingRight: '0'}}>
            <img src={user} alt='user' width={28}/>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item style={{color: '#000'}} onClick={()=> dispatch(Logout(navigate))}>
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> : <button type='button' onClick={()=> dispatch(ShowLogin(true))} className="nav-link p-0">
            <img src={user} alt='user' width={28}/>
          </button>}
          {auth?.user?.showLogin && 
            <Authentication 
              modal={auth?.user?.showLogin} 
              setModal={()=> dispatch(ShowLogin(false))} 
              path={location?.pathname}
            />
          }
        </div>
      </div>
    </nav>
  </div>
}
export default Navbar