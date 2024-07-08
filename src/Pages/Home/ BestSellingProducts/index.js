import React, { useEffect, useState } from 'react';
import './style.css'
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import ProductsService from '../../../services/ProductsService';
import Loader from '../../../common/Loader';

const  BestSellingProducts = () => {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()
  const {t} = useTranslation()
  const lang = useSelector(state => state?.lang?.lang)
  const productsService = new ProductsService()
  const [loader, setLoader] = useState(false)

  useEffect(()=>{
    setLoader(true)
    productsService?.getList({bestSeller: true}).then(res=>{
      if(res?.status === 200){
        let info = res?.data?.data?.data?.slice(0,6)
        setProducts(info)
      }
      setLoader(false)
    }).catch(()=> setLoader(false))
  },[])

  if(products?.length === 0){
    return
  }
  return (<div className='feature-products'>
    <h1> {t("Best Selling Products")}</h1>
    <div className='row mt-3'>
      {loader ? <div className='d-flex justify-content-center py-5'>
        <Loader />
      </div> : products?.map((product) => {
        return <div className='col-md-4 mb-4 col-6' key={product.id} onClick={()=> navigate(`/products/product/${product?.id}`, { state:{ product }})}>
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
        <Link to='/products' state={{bestSeller: true}} className='viewAll'>{t("View All")}</Link>
      </div>
    </div>
  );
};

export default  BestSellingProducts;
