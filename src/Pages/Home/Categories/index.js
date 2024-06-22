import React, { useState } from 'react';
import categoryImg from '../../../assets/category.jpeg'
import categoryImg2 from '../../../assets/2.webp'
import './style.css'
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';

const Categories = () => {
  const [data, setData] = useState([
    {id: 1, img: categoryImg2, name: 'Category 1'},
    {id: 2, img: categoryImg, name: 'Category 2'},
    {id: 3, img: categoryImg2, name: 'Category 3'},
    {id: 4, img: categoryImg2, name: 'Category 4'},
    {id: 5, img: categoryImg, name: 'Category 5'},
    {id: 6, img: categoryImg2, name: 'Category 6'},
    {id: 7, img: categoryImg2, name: 'Category 7'},
    {id: 8, img: categoryImg, name: 'Category 8'},
    {id: 9, img: categoryImg2, name: 'Category 9'},
    {id: 5, img: categoryImg, name: 'Category 10'},
    {id: 6, img: categoryImg2, name: 'Category 11'},
    {id: 7, img: categoryImg2, name: 'Category 12'},
    {id: 8, img: categoryImg, name: 'Category 13'},
    {id: 9, img: categoryImg2, name: 'Category 14'},
  ])
  const navigate = useNavigate()
  const {t} = useTranslation()

  return (<div className='categories-home'>
    <Swiper
        slidesPerView={3}
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
              {category.name}
            </Link>
            </SwiperSlide>
        })}
      </Swiper>
    </div>
  );
};

export default Categories;
