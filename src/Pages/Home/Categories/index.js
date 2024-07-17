import React, { useEffect, useState } from 'react';
import './style.css'
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import CategoriesService from '../../../services/CategoriesService';
import { useSelector } from 'react-redux';
import Loader from '../../../common/Loader';
import 'swiper/css'

const Categories = () => {
  const [data, setData] = useState([])
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

  function toTitleCase(str) {
    return str.toLowerCase().split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
  }

  return (<div className='categories-home'>
    {loader ? <div className='d-flex justify-content-center py-1'>
        <Loader />
      </div> : <Swiper
        modules={[Autoplay]}
        slidesPerView={8}
        autoplay={{
          delay: 1500,
          // disableOnInteraction: true,
        }}
        spaceBetween={10}
        pagination={{
          clickable: true
        }}
        breakpoints={{
          640: {
            slidesPerView: 4,
            // spaceBetween: 20,
          },
          768: {
            slidesPerView: 6,
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
          return <SwiperSlide key={index}>
            <Link to='/products' state={{category}}>
              {lang==='en' ? toTitleCase(category.name_en) : category?.name_ar}
            </Link>
            </SwiperSlide>
        })}
      </Swiper>}
    </div>
  );
};

export default Categories;
