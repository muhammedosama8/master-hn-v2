import { useEffect, useState } from 'react'
import './style.css'
import trash from '../../assets/trash.svg'
import cartImg from '../../assets/cartIllustartion.svg'
import { useDispatch, useSelector } from 'react-redux'
import { Badge, Card, CardBody } from 'react-bootstrap'
import { setPromoCode, ShowLogin, decreaseProduct, increaseProduct, removeProduct } from '../../store/actions/AuthActions'
import { useTranslation } from 'react-i18next'
import CheckLogin from './CheckLogin'
import CartService from '../../services/CartService'
import Loader from '../../common/Loader'
import { toast } from 'react-toastify'

const Cart = () =>{
    const [subCart, setSubCart] = useState([])
    const [cartProducts, setCartProducts] = useState([])
    const [shouldUpdate, setShouldUpdate] = useState(false)
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalPriceAfterDis, setTotalPriceAfterDis] = useState(0)
    const [couponDetails, setCouponDetails] = useState("")
    const [coupon, setCoupon] = useState("")
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false)
    const dispatch = useDispatch()
    const {t} = useTranslation()
    const user = useSelector(state => state?.user)
    const lang = useSelector(state => state?.lang?.lang)
    const cart = useSelector(state => state?.user?.cart)
    const promocodeText = useSelector(state => state?.user?.promoCode)
    const cartService = new CartService()

    useEffect(()=>{
        setLoading(true)
        if(!!user?.user){
            cartService.getList().then(res=>{
                if(res?.status === 200){
                    let data = res?.data.data
                    setSubCart(data)
                    setCartProducts(data?.sub_carts)
                    setTotalPrice(data?.sub_total.toFixed(3))
                    if(!!data?.coupon_name){
                        setCoupon(data?.coupon_name)
                        setTotalPriceAfterDis(data?.total)
                        setCouponDetails({
                            coupon: data?.coupon_name,
                            coupon_type: data?.coupon_type,
                            coupon_value: data?.coupon_value,
                        })
                    }
                }
                setLoading(false)
            }).catch(() => setLoading(false))
        } else {
            let data = cart?.map(item=> {
                return {
                    amount: item?.amount,
                    dynamicVariants: item?.dynamicVariants?.filter(res=> res?.amount > 0),
                    product: item
                }
            })
            setLoading(false)
            let totalP = data?.map(res=> {
                let tot = (res?.product?.amount*res?.product?.price) + res?.dynamicVariants?.map(dy=> dy?.amount*dy?.price).reduce((accumulator, currentValue) => {
                    return accumulator + currentValue;
                }, 0)
                return tot
            }).reduce((accumulator, currentValue) => {
                return accumulator + currentValue;
            }, 0)
            setTotalPrice(totalP.toFixed(3))
            setCartProducts(data)
            setCoupon(promocodeText.coupon)
            setCouponDetails(promocodeText)
            let dis
            if(promocodeText?.coupon_type === "percentage"){
                dis = Number(totalP) - ((Number(totalP)* (Number(promocodeText?.coupon_value)/100)))
            }
            if(promocodeText?.coupon_type === "fixed"){
                dis = Number(totalP) - Number(promocodeText?.coupon_value)
            }
            setTotalPriceAfterDis(dis)
        }
    },[shouldUpdate, user, cart])

    const promoCode = () =>{
        let data = {
            promoCode: coupon,
            cart_id: subCart?.id
        }
        cartService.createPromoCode(data).then(res=>{
            if(res?.status === 200){
                toast.success(t("Successfully Applied"))
                setCouponDetails({coupon,...res?.data?.data})
                localStorage.setItem('PromoCodeMasterHN', JSON.stringify({coupon: coupon,...res?.data?.data}))
                dispatch(setPromoCode({coupon: coupon,...res?.data?.data}))
                if(!!user?.user){
                    setShouldUpdate(prev=> !prev)
                } else {
                    let dis
                    if(res?.data?.data?.coupon_type === "percentage"){
                        dis = Number(totalPrice) - ((Number(totalPrice)* (Number(res?.data?.data?.coupon_value)/100)))
                    }
                    if(res?.data?.data?.coupon_type === "fixed"){
                        dis = Number(totalPrice) - Number(res?.data?.data?.coupon_value)
                    }
                    setTotalPriceAfterDis(dis)
                }
            }
        }).catch((e)=> {
            if(e?.response.data?.message === "promo_code_not_Exist"){
                toast.error(t("promo code is invalid!"))
            }
        })
    }

    const removeProductFromCart = (product) => {
        let data ={
            product_id: product.id
        }
        if(!!user?.user){
            cartService.remove(data).then(res=>{
                if(res?.status === 200){
                    toast.success(t("Remove from Cart"))
                    setShouldUpdate(prev=> !prev)
                }
            })
        }
        dispatch(removeProduct(product))
    }

    const changeAmount = (product, amount) => {
        let data ={
            product_id: product.id,
            amount: amount
        }
        cartService.update(data).then(res=>{
            if(res?.status === 200){
                setShouldUpdate(prev=> !prev)
            }
        })
    }

    const commonLines = () => {
        toast.success(t("Remove"))
        dispatch(setPromoCode(""))
        localStorage.removeItem('PromoCodeMasterHN')
        setCoupon('')
        setCouponDetails("")
        setShouldUpdate(prev=> !prev)
        setTotalPriceAfterDis(0)
    }

    const removePromoCode = () => {
        let data = {
            cart_id: subCart?.id
        }
        if(!!user?.user){
            cartService.deletePromoCode(data).then(res=> {
                if(res?.status === 200) commonLines() 
            })
        } else {
            commonLines()
        }
    }

    if(loading){
        return <div className='d-flex align-items-center justify-content-around' style={{minHeight: '80vh'}}>
            <Loader />
            </div>
    }

    return <div className="cart">
        <div className='container'>
            {cartProducts?.length > 0 ? <div className='row'>
                <div className='col-md-8'>
                    <Card style={{border: 'none', boxShadow: '0 0 4px rgba(222, 222, 222, 0.47)'}}>
                        <CardBody>
                            {cartProducts?.map(product => {
                            return <div key={product?.product?.id} className='product-cart'>
                                    <div className='row'>
                                        <div className='col-md-9 col-12 d-flex' style={{gap: '16px'}}>
                                            <img src={product?.product.product_images[0]?.url} alt='img' width={90} height={90} />
                                            <div>
                                                <h4 className='m-0'>{lang === 'en' ? product?.product?.name_en : product?.product?.name_ar}</h4>
                                                <Badge className='mb-2' variant="primary">{lang === 'en' ? product?.product?.category?.name_en : product?.product?.category?.name_ar}</Badge>
                                                <h5 className='mb-2'>{product?.amount} * {product?.product?.price.toFixed(3)}</h5>
                                                {product?.dynamicVariants?.map(dy => {
                                                    return <h6 key={dy.id}>
                                                        {lang === 'en' ? dy?.name_en : dy?.name_ar} ({dy?.amount} * {dy?.price?.toFixed(3)})
                                                    </h6>
                                                })}
                                            </div>
                                        </div>
                                        <div className='col-md-3 col-9'>
                                            <div className='text-center'>
                                               {product?.dynamicVariants?.length ? <h4 className='text-primary'>{((Number(product?.amount)*Number(product?.product?.price)) + product?.dynamicVariants?.map(res=> res?.amount*res?.price).reduce((accumulator, currentValue) => {
                                                    return accumulator + currentValue;
                                                }, 0)).toFixed(3)} {t("KWD")}</h4> :
                                                <h4 className='text-primary'>{(Number(product?.amount)*Number(product?.product?.price)).toFixed(3)} {t("KWD")}</h4>}
                                            </div>
                                            <div className='text-center'>
                                                <button className='prod-btn' onClick={()=> {
                                                    if(!!user?.user){
                                                        changeAmount(product?.product, product?.amount+1)
                                                    }
                                                    dispatch(increaseProduct(product?.product))
                                                } }>
                                                    +
                                                </button>
                                                <span style={{fontSize: '20px'}} className='mx-3'>{product?.amount}</span>
                                                <button 
                                                    className='prod-btn minus' 
                                                    disabled={product?.amount === 1} 
                                                    style={{cursor: product?.amount > 1 ? 'pointer' : 'not-allowed'}}
                                                    onClick={()=> {
                                                        if(!!user?.user){
                                                            changeAmount(product?.product, product?.amount-1)
                                                        }
                                                        dispatch(decreaseProduct(product?.product))
                                                    }}
                                                >
                                                    -
                                                </button>
                                            </div>
                                            <div className='text-center mt-3'>
                                                <button className='trash' onClick={()=> removeProductFromCart(product?.product)}>
                                                    <img src={trash} alt='trash' /> {t("Delete")}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            })}
                        </CardBody>
                    </Card>
                </div>
                <div className='col-md-4'>
                    <Card style={{border: 'none',boxShadow: '0 0 12px #dedede78'}}>
                        <CardBody>
                            <h5 className='mb-4'>{t("Payment Details")}</h5>
                            <div className="coupon-code wow fadeInUp">
                                <h5>{t("Coupon Code")}</h5>
                                <div className="form-coupon">
                                    <div className="form-group">
                                        <input type="text" 
                                            required
                                            value={coupon}
                                            onChange={e=> setCoupon(e.target.value)}
                                            disabled={!!couponDetails?.coupon}
                                            className="form-control" 
                                            name="code_name" id="code_name"
                                            placeholder={t("Please Enter")} />
                                        {!couponDetails?.coupon && <button className="btn-site" onClick={promoCode}><span>{t("Apply")}</span></button>}
                                        {!!couponDetails?.coupon && <button className="btn-danger" onClick={removePromoCode}><span>{t("Remove")}</span></button>}
                                    </div>
                                </div>

                            </div>
                            <div className='d-flex justify-content-between'>
                                <h5 style={{fontSize: '18px'}}>{!!totalPriceAfterDis ? t("Price") : t("Total Price")}:</h5>
                                <h5 style={{fontSize: '18px', fontWeight: "600"}}>{totalPrice} {t("KWD")}</h5>
                            </div>
                            {!!couponDetails && <div className='d-flex justify-content-between'>
                                <h5 style={{fontSize: '18px'}}>{t("Discound")}:</h5>
                                <h5 style={{fontSize: '18px', fontWeight: "600"}}>{couponDetails?.coupon_value} {couponDetails?.coupon_type === 'percentage' ? '%' : t("KWD")}</h5>
                            </div>}
                            {!!totalPriceAfterDis && <div className='d-flex justify-content-between'>
                                <h5 style={{fontSize: '18px'}}>{t("Total Price")}:</h5>
                                <h5 style={{fontSize: '18px', fontWeight: "600"}}>{totalPriceAfterDis.toFixed(3)} {t("KWD")}</h5>
                            </div>}
                            <div>
                                <button 
                                    className='continue w-100'
                                    onClick={()=> {
                                        if(!user?.user){
                                            setModal(true)
                                        }
                                    }}
                                >{t("Continue")}</button>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div> : <div className='text-center' style={{marginTop: '13rem', marginBottom: '7rem'}}>
                <div className='m-auto' style={{background: '#0e3a5d', width: '120px', height:'120px', padding: '8px', borderRadius: '50%'}}>
                    <img src={cartImg} alt='cart' width={90} />
                </div>
                <h3 className='mt-4'>{t("show some love to your bag")}</h3>
                <h4 className='mt-2'>{t("Fill your bag with things that make you happy")}</h4>
            </div>}
        </div>
        {modal && <CheckLogin modal={modal} setModal={()=> setModal(false)} />}
    </div>
}
export default Cart