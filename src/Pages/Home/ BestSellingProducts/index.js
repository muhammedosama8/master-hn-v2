import React, { useState } from 'react';
import categoryImg from '../../../assets/category.jpeg'
import categoryImg2 from '../../../assets/2.webp'
import './style.css'
import { Link } from 'react-router-dom';

const  BestSellingProducts = () => {
  const [products, setProducts] = useState([
    {id: 1, img: categoryImg, title: 'product'},
    {id: 2, img: categoryImg2, title: 'product'},
    {id: 3, img: categoryImg, title: 'product'},
    {id: 4, img: categoryImg2, title: 'product'},
    {id: 5, img: categoryImg, title: 'product'},
    {id: 6, img: categoryImg2, title: 'product'},
  ])
  return (<div className='feature-products'>
    <h1> Best Selling Products</h1>
    <div className='row mt-3'>
      {products?.map((cat) => {
        return <div className='col-md-4 mb-5'>
          <div className='cate h-100 position-relative'>
            <img src={cat.img} alt={cat?.name} className='img w-100 h-100' />
            <div className='desc'>
              <p>{cat.title}</p>
              <Link to='/'>Explore</Link>
            </div>
          </div>
        </div>
      })}
    </div>
    <div className='text-center mt-5'>
        <Link to='/' className='viewAll'>View All</Link>
      </div>
    </div>
  );
};

export default  BestSellingProducts;
