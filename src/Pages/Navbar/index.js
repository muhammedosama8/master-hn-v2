import { Link } from 'react-router-dom'
import shoppingBag from '../../assets/shopping-bag.png'
import user from '../../assets/user.png'
import logo from '../../assets/MasterHN-white.svg'
import './style.css'

const Navbar = () =>{
    return <div>
    <nav className="navbar navbar-expand-lg">
      <div className='row w-100 m-auto'>
        <div className='col-md-4'>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" style={{width: 'fit-content'}} id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link to='/' className="nav-link pt-0 active" aria-current="page" >Home</Link>
              <Link to='/' className="nav-link pt-0" >Products</Link>
              <Link to='/' className="nav-link pt-0" >Categories</Link>
              <Link to='/' className="nav-link pt-0" >About Us</Link>
            </div>
          </div>
        </div>
        <div className='col-md-4' style={{textAlign: 'center'}}>
          <Link to='/' className="navbar-brand logo m-0" >
          <img src={logo} alt='logo' width={150} />
        </Link>
        </div>
        <div className='col-md-4 d-flex' style={{justifyContent: 'end'}}>
          <Link to='/' className="nav-link p-0" style={{marginLeft: '16px'}}>
            <img src={shoppingBag} alt='shoppingBag' width={30} style={{marginTop: '-8px'}}/>
          </Link>
          <Link to='/' className="nav-link p-0" style={{marginLeft: '16px'}}>
            <img src={user} alt='shoppingBag' width={30} style={{marginTop: '-8px'}}/>
          </Link>
        </div>
      </div>
  </nav>
  </div>
}
export default Navbar