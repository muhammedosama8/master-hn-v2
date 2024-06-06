import React from 'react';
import banner from '../../../assets/banner.png'
import './style.css'
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
      <div className="banner">
        <h1>Style Up Your Looks</h1>
        <Link to='/'>
          <img src={banner} alt="Banner" />
        </Link>
        <div className='text-center'>
          <Link to='/' className='viewAll'>View All</Link>
        </div>
    </div>
  );
};

export default Banner;