import React, { useState } from 'react';
import categoryImg from '../../../assets/category.jpeg'
import categoryImg2 from '../../../assets/2.webp'
import './style.css'
import { Link, useNavigate } from 'react-router-dom';

const ShopByCategory = () => {
  const [data, setData] = useState([
    {id: 1, img: categoryImg2, name: 'Category 1'},
    {id: 2, img: categoryImg, name: 'Category 2'},
    {id: 3, img: categoryImg2, name: 'Category 3'},
  ])
  const navigate = useNavigate()

  return (<div className='shop-by-category'>
    <div className='position-relative'>
      <h4>Shop By Category</h4>
    </div>
    <div className='row'>
      {data?.map((cat) => {
        return <div className='col-md-4 mb-4 col-6' key={cat.id} onClick={()=> navigate('/products', { state:{ cat }})}>
          <div className='cate h-100 position-relative'>
            <img src={cat.img} alt={cat?.name} className='img w-100 h-100' />
            <div className='desc'>
              <p>{cat.name}</p>
              <Link to='/categories'>Explore All</Link>
            </div>
          </div>
        </div>
      })}
    </div>
    <div className='text-center mt-5'>
        <Link to='/categories'>View All</Link>
      </div>
    </div>
  );
};

export default ShopByCategory;
