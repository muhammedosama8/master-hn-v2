import React, { useEffect, useState } from 'react';
import categoryImg from '../../assets/category.jpeg'
import categoryImg2 from '../../assets/2.webp'
import './style.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Path from '../../common/Path';
import CategoriesService from '../../services/CategoriesService';
import { useSelector } from 'react-redux';
import Loader from '../../common/Loader';

const Categories = () => {
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const [loader, setLoader] = useState(false)
  const {t} = useTranslation()
  const lang = useSelector(state => state?.lang?.lang)
  const categoriesService = new CategoriesService()

  useEffect(()=>{
    setLoader(true)
    categoriesService?.getList().then(res=>{
      if(res?.status === 200){
        let info = res?.data?.data?.data
        setData(info)
      }
      setLoader(false)
    }).catch(()=> setLoader(false))
  },[])

  return (<div className='categories'>
    <Path 
      title='categories' 
      paths={[
        {href: 'categories' , state: '', name: t('categories')},
      ]} 
    />

    <div className='row'>
      {loader ? <div className='d-flex justify-content-center py-5'>
        <Loader />
      </div> : data?.map((category) => {
        return <div className='col-md-3 mb-4 col-6' key={category?.id} onClick={()=> navigate('/products', { state:{ category }})}>
          <div className='cate h-100 position-relative'>
            <img src={category?.image} alt={category?.name_en} className='img w-100 h-100' />
            <div className='desc'>
              <p>{lang === 'en' ? category.name_en : category?.name_ar}</p>
              <Link to='/'>{t("Explore All")}</Link>
            </div>
          </div>
        </div>
      })}
    </div>
    </div>
  );
};

export default Categories;
