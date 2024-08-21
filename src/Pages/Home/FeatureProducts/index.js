import React, { useEffect, useState } from 'react';
import './style.css'
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import ProductsService from '../../../services/ProductsService';
import Loader from '../../../common/Loader';

const FeatureProducts = () => {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()
  const [loader, setLoader] = useState(false)
  const {t} = useTranslation()

  const lang = useSelector(state => state?.lang?.lang)
  const productsService = new ProductsService()

  useEffect(()=>{
    setLoader(true)
    productsService?.getList().then(res=>{
      if(res?.status === 200){
        let info = res?.data?.data?.data?.slice(0,8)
        setProducts(info)
      }
      setLoader(false)
    }).catch(()=> setLoader(false))
  },[])

  return (<div className='feature-products' data-aos="fade-down-left">
    <h1>{t("Feature Products")}</h1>
    {loader ? <div className='d-flex justify-content-center py-5'>
        <Loader />
      </div> : <div className='row mt-3'>
      {products?.map((product) => {
        return <div className='col-md-3 mb-4 col-6' key={product?.id}>
          <div className='scroll-animation cate h-100 position-relative' onClick={()=> navigate(`/products/product/${product.id}`, { state:{ product }})}>
            <img src={product?.product_images[0]?.url} alt={product?.name_en} className='img w-100 h-100' />
            <div className='desc'>
              <p>{lang === 'en' ? product.name_en : product?.name_ar}</p>
              <Link to='/'>{t("Explore")}</Link>
            </div>
          </div>
        </div>
      })}
    </div>}
    <div className='text-center mt-5'>
        <Link to='/products' className='viewAll'>{t("View All")}</Link>
      </div>
    </div>
  );
};

export default FeatureProducts;
