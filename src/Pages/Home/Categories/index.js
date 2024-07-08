import React, { useEffect, useState } from 'react';
import categoryImg from '../../../assets/category.jpeg'
import categoryImg2 from '../../../assets/2.webp'
import './style.css'
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import CategoriesService from '../../../services/CategoriesService';
import { useSelector } from 'react-redux';
import Loader from '../../../common/Loader';

const Categories = () => {
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const {t} = useTranslation()
  const [loader, setLoader] = useState(false)
  const lang = useSelector(state => state?.lang?.lang)
  const categoriesService = new CategoriesService()

  useEffect(()=>{
    setLoader(true)
    categoriesService?.getList().then(res=>{
      if(res?.status === 200){
        let info = res?.data?.data?.data?.map(cat=>{
          return{
            ...cat
          }
        })
        setData(info)
      }
      setLoader(false)
    }).catch(()=> setLoader(false))
  },[])

  return (<div className='categories-home'>
    {loader ? <div className='d-flex justify-content-center py-1'>
        <Loader />
      </div> : <Swiper
        slidesPerView={8}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            // spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            // spaceBetween: 40,
          },
          1024: {
            slidesPerView: 8,
            // spaceBetween: 50,
          },
        }}
        className="mySwiper"
      >
        {data?.map((category,index)=>{
          return <SwiperSlide>
            <Link to='/products' state={category}>
              {lang==='en' ? category.name_en : category?.name_ar}
            </Link>
            </SwiperSlide>
        })}
      </Swiper>}
    </div>
  );
};

export default Categories;
