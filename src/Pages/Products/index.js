import React, { useState } from 'react';
import categoryImg from '../../assets/category.jpeg'
import categoryImg2 from '../../assets/2.webp'
import './style.css'
import { Link } from 'react-router-dom';

const Products = () => {
  const [data, setData] = useState([
    {id: 1, img: categoryImg2, name: 'Products 1', category: "Category", price: 50},
    {id: 2, img: categoryImg, name: 'Products 2', category: "Category", price: 50},
    {id: 3, img: categoryImg2, name: 'Products 3', category: "Category", price: 50},
    {id: 4, img: categoryImg2, name: 'Products 4', category: "Category", price: 50},
    {id: 5, img: categoryImg2, name: 'Products 5', category: "Category", price: 50},
    {id: 6, img: categoryImg2, name: 'Products 6', category: "Category", price: 50},
  ])
  return (<div className='products'>
    <div className='position-relative'>
      <h1>Products</h1>
    </div>
    <div className='row'>
      {data?.map((product) => {
        return <div className='col-md-3 mb-4'  key={product.id}>
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
