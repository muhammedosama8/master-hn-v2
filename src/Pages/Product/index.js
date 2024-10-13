import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import "./style.css"
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "../../store/actions/AuthActions"
import { useTranslation } from "react-i18next"
import Path from "../../common/Path"
import Select from 'react-select';
import Loader from "../../common/Loader"
import { toast } from "react-toastify"
import ProductsService from "../../services/ProductsService"
import CartService from "../../services/CartService";

const Product = () => {
    const [product, setProduct] = useState({})
    const [amount, setAmount] = useState(1)
    const [selectedImage, setSelectedImage] = useState('')
    const [dynamicVariants, setDynamicVariants] = useState([])
    const [variants, setVariants] = useState([])
    const [variantsIds, setVariantsIds] = useState([])
    const [fixedIds, setFixedIds] = useState([])
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {t} = useTranslation()
    const [loader, setLoader] = useState(false)
    const [custom, setCustom] = useState(false)
    const [shouldUpdate, setShouldUpdate] = useState(false)
    const lang = useSelector(state => state?.lang?.lang)
    const user = useSelector(state => state?.user)
    const productsService = new ProductsService()
    const cartService = new CartService()

    useEffect(()=>{
        if(!!location?.state){
            let id = location?.state?.product?.id
            productsService.getDynamicVariants(id).then(res => {
                if(res?.status === 200){
                    let data = res?.data?.data?.map(item=>{
                        return{
                            ...item,
                            amount: 0
                        }
                    })
                    setDynamicVariants(data)
                }
            }).catch((e)=> console.error(e))
            productsService.getProdust(id)?.then(res=>{
                if(res?.status === 200){
                    setProduct(res?.data?.data?.product)
                    setSelectedImage(res?.data?.data?.product.product_images[0]?.url)
                    if(res?.data?.data?.variant?.length > 0) {
                        setVariants(res?.data?.data?.variant)
                        let ids = res?.data?.data?.variant?.map( variant => variant?.variant_values?.find(val => val?.isSelected).id )
                        setVariantsIds(ids)
                        setFixedIds(ids)
                    }
                }
            }).catch((e)=> console.error(e))
        } else {
            navigate('/')
        }
    },[location])

    useEffect(()=>{
        if(custom){
                productsService.changeProduct(product?.code, variantsIds.map(id => `variant_value_ids=${id}`).join('&'))?.then(res=>{
                    if(res?.status === 200){
                        setProduct(res?.data?.data?.product)
                        setSelectedImage(res?.data?.data?.product.product_images[0]?.url)
                        if(res?.data?.data?.variant?.length > 0) {
                            setVariants(res?.data?.data?.variant)
                            let ids = res?.data?.data?.variant?.map( variant => variant?.variant_values?.find(val => val?.isSelected).id )
                            setVariantsIds(ids)
                            setFixedIds(ids)
                        }
                    }
                }).catch(e=> {
                    setVariantsIds(fixedIds)
                    toast.error(e.response?.data?.message?.replaceAll('_', ' '))
                })
        }
    },[shouldUpdate])

    const addCart = () => {
        let data = {
            products: [{
                dynamic_variant: dynamicVariants?.filter(res=> res?.amount > 0)?.map(dy =>{
                    return {
                        dynamic_variant_id: dy?.amount,
                        amount: dy?.id
                    }
                }),
                amount: amount,
                product_id: product?.id
            }]
        }
        setLoader(true)
        if(!!user?.user){
            cartService.create(data).then(res=>{
                if(res?.status === 201){
                    toast.success(t("Product Added To Cart"));
                    dispatch(addToCart({
                        ...product,
                        dynamicVariants: dynamicVariants,
                        amount: amount,
                        in_stock: product?.amount
                    }))
                }
                setLoader(false);
            }).catch(e=> {
                setLoader(false);
                if(e.response?.data?.message === "product_is_already_Exist_in_your_cart"){
                    let data ={
                        product_id: product.id,
                        amount: amount
                    }
                    cartService.update(data).then(res=>{
                        if(res?.status === 200){
                            toast.success(t("Product Added To Cart"));
                        }
                    })
                    return
                }
                toast.error(e.response?.data?.message?.replaceAll('_', ' '))
            })
        } else {
            toast.success(t("Product Added To Cart"));
            dispatch(addToCart({
                ...product,
                dynamicVariants: dynamicVariants,
                amount: amount,
                in_stock: product?.amount
            }))
            setTimeout(()=> setLoader(false), [500])
        }
    }

    return <div className="product">
        <div style={{padding: '0 2rem'}}>
            <Path
                title={lang==='en' ? product?.name_en : product?.name_ar}
                paths={[
                    {href: 'categories' , state: product?.category, name: lang === 'en' ? product.category?.name_en : product.category?.name_ar},
                    {href: 'products' , state: '', name: lang === 'en' ? product?.name_en : product?.name_ar},
                ]} 
            />
        </div>
        <div className="container">
            <div className="row">
                <div className="col-md-6 text-center">
                    <img src={selectedImage} alt='product' className="w-75 main-img" />
                    <div className="px-5">
                    <Swiper
                        slidesPerView={4}
                        spaceBetween={5}
                        pagination={{
                        clickable: true,
                        }}
                        className="mySwiper mt-4 d-flex flex-column"
                        style={{direction: 'ltr'}}
                        modules={[Pagination]}
                    >
                        {product?.product_images?.map((img,index)=>{
                            return <SwiperSlide style={{height: 'auto'}} key={index}>
                                <img
                                    className="w-75 h-100"  
                                    src={img?.url} 
                                    alt={index} 
                                    onClick={()=> setSelectedImage(img?.url)}
                                />
                            </SwiperSlide>
                        })}
                    </Swiper>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4 className="category">{lang==='en' ? product?.category?.name_en : product?.category?.name_ar}</h4>
                    <h1>{lang==='en' ? product?.name_en : product?.name_ar}</h1>
                    <p className="old-price">{product?.offer ? product?.price : ''} {product?.offer && t("KWD")}</p>
                    <p className="price">{product?.offer ? product?.offerPrice : product.price} {t("KWD")}</p>
                    {variants?.map((variant, index)=> {
                        return <div className="variant mb-3" key={index}>
                            <p className="mb-1">{lang==='en' ? variant?.name_en : variant?.name_ar}</p>
                            <div className="variant-values"
                            style={{gridTemplateColumns: variant?.name_ar === 'اللون' ? "auto auto auto auto auto" : "auto auto auto"}}>
                                {(variant?.name_ar === 'اللون' || variant?.name_en === 'color') ? variant?.variant_values?.map((val, ind)=> {
                                    return <div className="value position-relative mb-4" key={ind}>
                                    <span 
                                        onClick={()=> {
                                            setCustom(true)
                                            setShouldUpdate(prev => !prev)
                                            let update = variantsIds?.map((id, i) => {
                                                if(i === index){
                                                    return val?.id
                                                } else {
                                                    return id
                                                }
                                            })
                                            setVariantsIds(update)
                                        }}
                                        style={{
                                        position: 'absolute', cursor: 'pointer',
                                        width: '30px', height: '30px',
                                        border: '1px solid #dedede',
                                        backgroundColor: val?.value_en
                                        }}>
                                        {val?.isSelected && <span style={{
                                        position: 'absolute', borderRadius: '50%',
                                        width: '15px', height: '15px',
                                        border: '2px solid #dedede',
                                        backgroundColor: '#fff',
                                        top: '50%',  left: '50%',
                                        transform: 'translate(-50%, -50%)'
                                    }}></span>}
                                    </span>
                                    </div>
                                }) :
                                <>
                                <Select
                                    value={{
                                        ...variant?.variant_values?.find(v=> v.isSelected),
                                        label: lang==='en' ? variant?.variant_values?.find(v=> v.isSelected).value_en : variant?.variant_values?.find(v=> v.isSelected).value_ar,
                                        value: variant?.variant_values?.find(v=> v.isSelected).value_en,
                                    }}
                                    placeholder={t("Select")}
                                    options={variant?.variant_values?.map(val=> {
                                        return {
                                            ...val,
                                            label: lang==='en' ? val?.value_en : val?.value_ar,
                                            value: val?.value_en
                                        }
                                    })}
                                    onChange={(e)=> {
                                        let update = variantsIds?.map((id, i) => {
                                                if(i === index){
                                                    return e?.id
                                                } else {
                                                    return id
                                                }
                                            })
                                        setCustom(true)
                                        setVariantsIds(update)
                                        setShouldUpdate(prev => !prev)
                                    }}
                                />
                                </>}
                            </div>
                        </div>
                    })}
                    {dynamicVariants?.length > 0 && dynamicVariants?.map((dyVar, index)=>{
                        return <div key={index} className="d-flex justify-content-between align-items-center mb-3">
                            <p className="m-0">{lang === 'en' ? dyVar?.name_en : dyVar?.name_ar} 
                                <span className="mx-2" style={{color: 'var(--primary-color)'}}>({dyVar?.price} {t('KWD')})</span>
                            </p>
                            <div className="amounts d-flex" style={{alignItems: 'center'}}>
                            <button 
                                disabled={dyVar?.amount === dyVar?.available_amount}
                                style={{
                                    cursor: dyVar?.amount === dyVar?.available_amount ? 'not-allowed' : 'pointer',
                                    padding: '5px 8px', lineHeight: '1'
                                }}
                                onClick={()=> {
                                    let update = dynamicVariants?.map((dyV, ind)=>{
                                        if(index === ind){
                                            return{
                                                ...dyV,
                                                amount: dyV?.amount+1
                                            }
                                        } else{
                                            return dyV
                                        }
                                    })
                                    setDynamicVariants(update)
                                }}
                                className="btn btn-outline-secondary" 
                            >+</button>
                            <span style={{margin: '0 12px',fontSize: '19px'}}>{dyVar?.amount}</span>
                            <button
                                style={{
                                    padding: '5px 8px', lineHeight: '1'
                                }}
                                onClick={()=> {
                                    let update = dynamicVariants?.map((dyV, ind)=>{
                                        if(index === ind){
                                            return{
                                                ...dyV,
                                                amount: dyV?.amount-1
                                            }
                                        } else{
                                            return dyV
                                        }
                                    })
                                    setDynamicVariants(update)
                                }}
                                className="btn btn-outline-secondary" 
                                disabled={dyVar?.amount === 0}
                            >-</button>
                        </div>
                        </div>
                    })}
                    <p className="description mt-4">{lang==='en' ? product?.description_en : product?.description_ar}</p>
                    {product?.amount > 0 ? <div className="d-flex" style={{gap: '22px'}}>
                        {loader ? 
                        <div className='d-flex justify-content-center' style={{width: '167px'}}><Loader /></div> : 
                        <button onClick={()=> addCart()} className="buy">{t("Add To Cart") }</button>}

                        <div className="amounts d-flex" style={{alignItems: 'center'}}>
                            <button 
                                disabled={product?.amount === amount}
                                style={{cursor: (product?.amount === amount) ? 'not-allowed' : 'pointer'}}
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
                    </div> : <h5 className="text-danger">{t("out of stock")}</h5>}
                </div>
            </div>
        </div>
    </div>
}
export default Product