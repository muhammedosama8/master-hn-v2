import React, { useState } from 'react';
import categoryImg from '../../assets/category.jpeg'
import categoryImg2 from '../../assets/2.webp'
import './style.css'
import { Link, useNavigate } from 'react-router-dom';

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

  return (<div className='categories'>
    <div className='position-relative'>
      <h1>Categories</h1>
    </div>
    <div className='row'>
      {data?.map((cat) => {
        return <div className='col-md-3 mb-4' key={cat.id} onClick={()=> navigate('/products', { state:{ cat }})}>
          <div className='cate h-100 position-relative'>
            <img src={cat.img} alt={cat?.name} className='img w-100 h-100' />
            <div className='desc'>
              <p>{cat.name}</p>
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
