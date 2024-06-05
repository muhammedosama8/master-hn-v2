import React from 'react';
import banner from '../../../assets/banner.png'
import './style.css'
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <div className='container'>
      <div className="banner">
        <img src={banner} alt="Banner" />
        <div className='text-center'>
          <Link to='/'>Shop Now</Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;