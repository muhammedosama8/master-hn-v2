import React, { useEffect, useState } from 'react';
import categoryImg from '../../assets/category.jpeg'
import categoryImg2 from '../../assets/2.webp'
import './style.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Path from '../../common/Path';

const Categories = () => {
  const [data, setData] = useState([
    {id: 1, img: categoryImg2, name: 'Category 1'},
    {id: 2, img: categoryImg, name: 'Category 2'},
    {id: 3, img: categoryImg2, name: 'Category 3'},
    {id: 4, img: categoryImg2, name: 'Category 4'},
    {id: 5, img: categoryImg2, name: 'Category 5'},
    {id: 6, img: categoryImg2, name: 'Category 6'},
  ])
  const navigate = useNavigate()
  const {t} = useTranslation()

  return (<div className='categories'>
    <Path 
      title='categories' 
      paths={[
        {href: 'categories' , state: '', name: t('categories')},
      ]} 
    />
    {/* <div className='position-relative'>
      <h1>{t("categories")}</h1>
    </div> */}
    <div className='row'>
      {data?.map((category) => {
        return <div className='col-md-3 mb-4 col-6' key={category.id} onClick={()=> navigate('/products', { state:{ category }})}>
          <div className='cate h-100 position-relative'>
            <img src={category.img} alt={category?.name} className='img w-100 h-100' />
            <div className='desc'>
              <p>{category.name}</p>
              <Link to='/'>Explore All</Link>
            </div>
          </div>
        </div>
      })}
    </div>
    </div>
  );
};

export default Categories;
