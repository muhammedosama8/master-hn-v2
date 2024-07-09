import React, { useEffect, useState } from 'react';
import categoryImg from '../../../assets/category.jpeg'
import categoryImg2 from '../../../assets/2.webp'
import './style.css'
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CategoriesService from '../../../services/CategoriesService';
import { useSelector } from 'react-redux';
import Loader from '../../../common/Loader';

const ShopByCategory = () => {
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const {t} = useTranslation()
  const lang = useSelector(state => state?.lang?.lang)
  const categoriesService = new CategoriesService()
  const [loader, setLoader] = useState(false)

  useEffect(()=>{
    setLoader(true)
    categoriesService?.getList().then(res=>{
      if(res?.status === 200){
        let info = res?.data?.data?.data?.slice(0,6)
        setData(info)
      }
      setLoader(false)
    }).catch(()=> setLoader(false))
  },[])

  return (<div className='shop-by-category'>
    <div className='position-relative'>
      <h4>{t("Shop By Category")}</h4>
    </div>
    <div className='row'>
      {loader ? <div className='d-flex justify-content-center py-5'>
        <Loader />
      </div> : data?.map((category) => {
        return <div className='col-md-4 mb-4 col-6' key={category?.id}>
          <div className='cate h-100 position-relative' onClick={()=> navigate('/products', { state:{ category }})}>
            <img src={category?.image} alt={category?.name} className='img w-100 h-100' />
            <div className='desc'>
              <p>{lang === 'en' ? category?.name_en : category?.name_ar}</p>
              <Link to='/categories'>{t("Explore All")}</Link>
            </div>
          </div>
        </div>
      })}
    </div>
    <div className='text-center mt-5'>
        <Link to='/categories'>{t("View All")}</Link>
      </div>
    </div>
  );
};

export default ShopByCategory;
