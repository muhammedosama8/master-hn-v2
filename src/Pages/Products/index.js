import React, { useEffect, useState } from 'react';
import categoryImg from '../../assets/category.jpeg'
import categoryImg2 from '../../assets/2.webp'
import './style.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Path from '../../common/Path';

const Products = () => {
  const [customPaths, setCustomPaths] = useState([])
  const [data, setData] = useState([
    {id: 1, img: categoryImg2, name: 'Products 1', category: "Category", price: 50, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"},
    {id: 2, img: categoryImg, name: 'Products 2', category: "Category", price: 50, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"},
    {id: 3, img: categoryImg2, name: 'Products 3', category: "Category", price: 50, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"},
    {id: 4, img: categoryImg2, name: 'Products 4', category: "Category", price: 50, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"},
    {id: 5, img: categoryImg2, name: 'Products 5', category: "Category", price: 50, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"},
    {id: 6, img: categoryImg2, name: 'Products 6', category: "Category", price: 50, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"},
  ])
  const navigate = useNavigate()
  const location = useLocation()
  const {t} = useTranslation()
  
  useEffect(()=> {
    if(location.state?.category){
      setCustomPaths([
        {href: 'categories' , state: location.state.category, name: location.state.category?.name},
        {href: 'products' , state: '', name: t('products')},
      ])
    } else {
      setCustomPaths([
        {href: 'products' , state: '', name: t('products')},
      ])
    }
  }, [])

  return (<div className='products'>
    <Path 
      title='products' 
      paths={customPaths} 
    />
    {/* <div className='position-relative'>
      <h1>{t("products")}</h1>
    </div> */}
    <div className='row'>
      {data?.map((product) => {
        return <div className='col-md-3 mb-4 col-6'  key={product.id} onClick={()=> navigate(`/products/product/${product?.id}`, { state:{ product }})}>
          <div className='cate h-100 position-relative'>
            <img src={product.img} alt={product?.name} className='img w-100 h-100' />
            <div className='desc'>
              <h4>{product.name}</h4>
              <p>{product.category}</p>
              <p>{product.price} KWD</p>
            </div>
          </div>
        </div>
      })}
    </div>
    </div>
  );
};

export default Products;
