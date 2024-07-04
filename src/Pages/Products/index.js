import React, { useEffect, useState } from 'react';
import categoryImg from '../../assets/category.jpeg'
import categoryImg2 from '../../assets/2.webp'
import './style.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Path from '../../common/Path';
import ProductsService from '../../services/ProductsService';
import { useSelector } from 'react-redux';

const Products = () => {
  const [customPaths, setCustomPaths] = useState([])
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const location = useLocation()
  const {t} = useTranslation()
  const lang = useSelector(state => state?.lang?.lang)
  const productsService = new ProductsService()

  useEffect(()=>{
    let params = {}
    if(location.state?.category) params['category_id'] = location.state?.category?.id
    productsService?.getList(params).then(res=>{
      if(res?.status === 200){
        let info = res?.data?.data?.data
        setData(info)
      }
    })
  },[])

  useEffect(()=> {
    if(location.state?.category){
      setCustomPaths([
        {href: 'categories' , state: location.state.category, name: lang === 'en' ? location.state.category?.name_en : location.state.category?.name_ar},
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

    <div className='row'>
      {data?.length > 0 ? data?.map((product) => {
        return <div className='col-md-3 mb-4 col-6'  key={product?.id} onClick={()=> navigate(`/products/product/${product?.id}`, { state:{ product }})}>
          <div className='cate h-100 position-relative'>
            <img src={product?.product_images[0]?.url} alt={product?.name_en} className='img w-100 h-100' />
            <div className='desc'>
              <h4>{lang === 'en' ? product.name_en : product?.name_ar}</h4>
              <p>{lang === 'en' ? product.category?.name_en : product.category?.name_ar}</p>
              <p>{product.price} KWD</p>
            </div>
          </div>
        </div>
      }) : <h3 className='text-center'>{t("There are No Products")}</h3>}
    </div>
    </div>
  );
};

export default Products;
