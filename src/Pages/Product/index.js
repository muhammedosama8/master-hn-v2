import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import "./style.css"
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "../../store/actions/AuthActions"
import { useTranslation } from "react-i18next"
import Path from "../../common/Path"

const Product = () => {
    const [product, setProduct] = useState({})
    const [amount, setAmount] = useState(1)
    const [customPaths, setCustomPaths] = useState([])
    const location = useLocation()
    const dispatch = useDispatch()
    const {t} = useTranslation()
    const lang = useSelector(state => state?.lang?.lang)
    
    useEffect(()=> {
      if(location.state){
        setCustomPaths([
        //   {href: 'categories' , state: location.state?.category, name: location.state.category?.name},
          {href: 'products' , state: '', name: location?.state?.product?.name},
        ])
      } else {
        setCustomPaths([
          {href: 'products' , state: '', name: lang === 'en' ? location?.state?.product?.name_en : location?.state?.product?.name_ar},
        ])
      }
    }, [])

    useEffect(()=>{
        if(location?.state){
            setProduct({...location?.state?.product})
        }
    },[location])

    const addCart = () => {
        dispatch(addToCart({
            ...product,
            amount: amount
        }))
    }

    return <div className="product">
        <div style={{padding: '0 2rem'}}>
            <Path
                title={lang==='en' ? product?.name_en : product?.name_ar}
                paths={customPaths} 
            />
        </div>
        <div className="container">
            <div className="row">
                <div className="col-md-6 text-center">
                    <img src={product?.product_images?.length > 0 ? product?.product_images[0]?.url : ''} alt='product' />
                </div>
                <div className="col-md-6">
                    <h1>{lang==='en' ? product?.name_en : product?.name_ar}</h1>
                    <h4 className="category">{lang==='en' ? product?.category?.name_en : product?.category?.name_ar}</h4>
                    <p className="price">{product?.price} KWD</p>
                    <p className="description">{lang==='en' ? product?.description_en : product?.description_ar}</p>
                    <div className="d-flex" style={{gap: '22px'}}>
                        <button onClick={()=> addCart()} className="buy">{t("Add To Cart")}</button>
                        <div className="amounts d-flex" style={{alignItems: 'center'}}>
                            <button 
                                onClick={()=> setAmount(prev => ++prev)}
                                className="btn btn-outline-secondary" 
                            >+</button>
                            <span style={{
                                marginRight: '12px',
                                marginLeft: '12px'
                            }}>{amount}</span>
                            <button
                                onClick={()=> {
                                    setAmount(prev=> --prev)
                                }}
                                className="btn btn-outline-secondary" 
                                disabled={amount === 1}
                            >-</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
export default Product