import React, { useState } from 'react';
import categoryImg from '../../../assets/category.jpeg'
import categoryImg2 from '../../../assets/2.webp'
import './style.css'
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const  BestSellingProducts = () => {
  const [products, setProducts] = useState([
    {id: 1, img: categoryImg2, name: 'Products 1', category: "Category", price: 50, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"},
    {id: 2, img: categoryImg, name: 'Products 2', category: "Category", price: 50, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"},
    {id: 3, img: categoryImg2, name: 'Products 3', category: "Category", price: 50, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"},
    {id: 4, img: categoryImg2, name: 'Products 4', category: "Category", price: 50, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"},
    {id: 5, img: categoryImg2, name: 'Products 5', category: "Category", price: 50, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"},
    {id: 6, img: categoryImg2, name: 'Products 6', category: "Category", price: 50, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"},
  ])
  const navigate = useNavigate()
  const {t} = useTranslation()

  return (<div className='feature-products'>
    <h1> {t("Best Selling Products")}</h1>
    <div className='row mt-3'>
      {products?.map((product) => {
        return <div className='col-md-4 mb-4 col-6' key={product.id} onClick={()=> navigate(`/products/product/${product?.id}`, { state:{ product }})}>
          <div className='cate h-100 position-relative'>
            <img src={product.img} alt={product?.name} className='img w-100 h-100' />
            <div className='desc'>
              <p>{product.name}</p>
              <Link to='/'>{t("Explore")}</Link>
            </div>
          </div>
        </div>
      })}
    </div>
    <div className='text-center mt-5'>
        <Link to='/products' className='viewAll'>{t("View All")}</Link>
      </div>
    </div>
  );
};

export default  BestSellingProducts;
