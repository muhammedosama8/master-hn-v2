import React from 'react';
import banner from '../../../assets/banner.png'
import './style.css'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Banner = () => {
  const {t} = useTranslation()
  return (
      <div className="banner">
        <h1>{t("Style Up Your Looks")}</h1>
        <Link to='/'>
          <img src={banner} alt="Banner" />
        </Link>
        <div className='text-center'>
          <Link to='/' className='viewAll'>{t("Style Up")}</Link>
        </div>
    </div>
  );
};

export default Banner;