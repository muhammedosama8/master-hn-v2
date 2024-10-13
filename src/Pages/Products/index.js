import React, { useEffect, useState } from 'react';
import './style.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Path from '../../common/Path';
import ProductsService from '../../services/ProductsService';
import { useSelector } from 'react-redux';
import Loader from '../../common/Loader';

const Products = () => {
  const [search, setSearch] = useState('')
  const [customPaths, setCustomPaths] = useState([])
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const location = useLocation()
  const {t} = useTranslation()
  const lang = useSelector(state => state?.lang?.lang)
  const productsService = new ProductsService()
  const [loader, setLoader] = useState(false)

  useEffect(()=>{
    let params = {}
    if(location.state?.category) params['category_id'] = location.state?.category?.id
    if(location.state?.bestSeller) params['bestSeller'] = location.state?.bestSeller
    if(!!search) params['search'] = search
    setLoader(true)
    productsService?.getList(params).then(res=>{
      if(res?.status === 200){
        let info = res?.data?.data?.data
        setData(info)
      }
      setLoader(false)
    }).catch(()=> setLoader(false))
  },[location, search])

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
  }, [location,lang])

  return (<div className='products'>
    <Path 
      title='products' 
      paths={customPaths} 
      setSearch={setSearch}
    />

    <div className='row'>
      {loader ? <div className='d-flex justify-content-center py-5'>
        <Loader />
      </div> : data?.length > 0 ? data?.map((product, index) => {
        return <div className='col-md-3 mb-4 col-6' key={index}>
          <div className='cate h-100 position-relative pro-details' onClick={()=> navigate(`/products/product/${product?.id}`, { state:{ product }})}>
            <img src={product?.product_images[0]?.url} alt={product?.name_en} className='img w-100 h-100' />
            <div className='desc'>
              <h4>{lang === 'en' ? product.name_en : product?.name_ar}</h4>
              <p>{lang === 'en' ? product.category?.name_en : product.category?.name_ar}</p>
              <p className='old-price'>{product?.offer ? product.price : ''} {product?.offer && t("KWD")}</p>
              <p>{product?.offer ? product?.offerPrice : product.price} {t("KWD")}</p>
            </div>
          </div>
        </div>
      }) : <h3 className='text-center'>{t("There are No Products")}</h3>}
    </div>
    </div>
  );
};

export default Products;
