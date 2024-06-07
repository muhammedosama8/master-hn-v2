import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import shoppingBag from '../../assets/shopping-bag.png'
import user from '../../assets/user.png'
import logo from '../../assets/MasterHN-white.svg'
import './style.css'
import { useEffect, useState } from 'react'
import Authentication from '../Home/Authentication'
import { useDispatch, useSelector } from 'react-redux'
import Dropdown from 'react-bootstrap/Dropdown';
import { Logout } from '../../services/AuthService'

const Navbar = () =>{
  const [modal, setModal] = useState(false)
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth = useSelector(state => state)

  useEffect(()=>{ console.log(auth.user)},[location, auth])

  return <div>
    <nav className="navbar navbar-expand-lg">
      <div className='row w-100 m-auto' style={{alignItems: 'center'}}>
        <div className='col-4'>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" style={{width: 'fit-content'}} id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <NavLink to='/' className={({ isActive }) => isActive ? "active nav-link py-0" : "nav-link py-0"} aria-current="page" >Home</NavLink>
              <NavLink to='/products' className={({ isActive }) => isActive ? "active nav-link py-0" : "nav-link py-0"} aria-current="page">Products</NavLink>
              <NavLink to='/categories' className={({ isActive }) => isActive ? "active nav-link py-0" : "nav-link py-0"} aria-current="page">Categories</NavLink>
              <NavLink to='/about-us' className={({ isActive }) => isActive ? "active nav-link py-0" : "nav-link py-0"} aria-current="page">About Us</NavLink>
            </div>
          </div>
        </div>
        <div className='col-4' style={{textAlign: 'center'}}>
          <Link to='/' className="navbar-brand logo m-0 p-0" >
          <img src={logo} alt='logo' width={150} />
        </Link>
        </div>
        <div className='col-4 d-flex' style={{justifyContent: 'end'}}>
          <Link to='/' className="nav-link p-0 d-flex" style={{marginLeft: '16px', alignItems: 'center'}}>
            <img src={shoppingBag} alt='shoppingBag' width={30} style={{marginTop: '-8px'}}/>
          </Link>
          {!!auth.user?.user ?  <Dropdown>
          <Dropdown.Toggle id="dropdown-basic" className='py-0' style={{background: 'none', border: 'none', paddingRight: '0'}}>
            <img src={user} alt='user' width={30} style={{marginTop: '-8px'}}/>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item style={{color: '#000'}} onClick={()=> dispatch(Logout(navigate))}>
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> : <button type='button' onClick={()=> setModal(true)} className="nav-link p-0" style={{marginLeft: '16px'}}>
            <img src={user} alt='user' width={30} style={{marginTop: '-8px'}}/>
          </button>}
          {modal && 
            <Authentication 
              modal={modal} 
              setModal={setModal} 
              path={location?.pathname}
            />
          }
        </div>
      </div>
    </nav>
  </div>
}
export default Navbar