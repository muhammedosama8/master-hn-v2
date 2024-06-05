import { Link } from 'react-router-dom'
import shoppingBag from '../../assets/shopping-bag.png'
import logo from '../../assets/logo1.png'
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
              <Link to='/' className="nav-link active" aria-current="page" >Home</Link>
              <Link to='/' className="nav-link" >Products</Link>
              <Link to='/' className="nav-link" >Categories</Link>
              <Link to='/' className="nav-link" >About Us</Link>
            </div>
          </div>
        </div>
        <div className='col-md-4' style={{textAlign: 'center'}}>
          <Link to='/' className="navbar-brand logo" >
          <img src={logo} alt='logo' width={150} />
        </Link>
        </div>
        <div className='col-md-4' style={{textAlign: 'end'}}>
          <Link to='/' className="nav-link" style={{marginLeft: '16px'}}>
            <img src={shoppingBag} alt='shoppingBag' width={20} style={{marginTop: '-8px'}}/>
          </Link>
        </div>
      </div>
  </nav>
  </div>
}
export default Navbar