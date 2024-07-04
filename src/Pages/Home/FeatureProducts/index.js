import React, { useEffect, useState } from 'react';
import './style.css'
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import ProductsService from '../../../services/ProductsService';

const FeatureProducts = () => {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()
  const {t} = useTranslation()

  const lang = useSelector(state => state?.lang?.lang)
  const productsService = new ProductsService()

  useEffect(()=>{
    productsService?.getList().then(res=>{
      if(res?.status === 200){
        let info = res?.data?.data?.data?.slice(0,6)
        setProducts(info)
      }
    })
  },[])

  return (<div className='feature-products'>
    <h1>{t("Feature Products")}</h1>
    <div className='row mt-3'>
      {products?.map((product) => {
        return <div className='col-md-4 mb-4 col-6' key={product?.id} onClick={()=> navigate(`/products/product/${product.id}`, { state:{ product }})}>
          <div className='cate h-100 position-relative'>
            <img src={product?.product_images[0]?.url} alt={product?.name_en} className='img w-100 h-100' />
            <div className='desc'>
              <p>{lang === 'en' ? product.name_en : product?.name_ar}</p>
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

export default FeatureProducts;
