import { useEffect, useState } from 'react'
import './style.css'
import trash from '../../assets/trash.svg'
import cartImg from '../../assets/cartIllustartion.svg'
import { useDispatch, useSelector } from 'react-redux'
import { Badge, Card, CardBody } from 'react-bootstrap'
import { ShowLogin, decreaseProduct, increaseProduct, removeProduct } from '../../store/actions/AuthActions'
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
    const [coupon, setCoupon] = useState("")
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false)
    const dispatch = useDispatch()
    const {t} = useTranslation()
    const user = useSelector(state => state?.user)
    const lang = useSelector(state => state?.lang?.lang)
    const cart = useSelector(state => state?.user?.cart)
    const cartService = new CartService()

    useEffect(()=>{
        setLoading(true)
        if(!!user?.user){
            cartService.getList().then(res=>{
                if(res?.status === 200){
                    let data = res?.data.data
                    setSubCart(data)
                    setCartProducts(data?.sub_carts)
                    setTotalPrice(data?.total.toFixed(3))
                    if(!!data?.coupon_name) setCoupon(data?.coupon_name)
                }
                setLoading(false)
            }).catch(() => setLoading(false))
        } else {
            let data = cart?.map(item=> {
                return {
                    amount: item?.amount,
                    product: item
                }
            })
            setLoading(false)
            let totalP = data?.map(res=> res?.product?.amount*res?.product?.price).reduce((accumulator, currentValue) => {
                return accumulator + currentValue;
            }, 0)
            setTotalPrice(totalP.toFixed(3))
            setCartProducts(data)
        }
    },[shouldUpdate, user])

    const promoCode = () =>{
        let data = {
            promoCode: coupon,
            cart_id: subCart?.id
        }
        cartService.createPromoCode(data).then(res=>{
            if(res?.status === 200){
                toast.success(t("Successfully Applied"))
                if(!!user?.user){
                    setShouldUpdate(prev=> !prev)
                } else {
                    if(res?.data?.data?.coupon_type === "percentage"){
                        let dis = totalPrice
                    }
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

    const removePromoCode = () => {
        let data = {
            cart_id: subCart?.id
        }
        if(!!user?.user){
            cartService.deletePromoCode(data).then(res=> {
                if(res?.status === 200){
                    toast.success(t("Remove"))
                    setShouldUpdate(prev=> !prev)
                    setCoupon('')
                }
            })
        } else {
            toast.success(t("Remove"))
            setShouldUpdate(prev=> !prev)
            setCoupon('')
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
                    <Card style={{border: 'none'}}>
                        <CardBody>
                            {cartProducts?.map(product => {
                            return <div key={product?.product?.id} className='product-cart'>
                                    <div className='row align-items-center'>
                                        <div className='col-md-8 col-12 d-flex' style={{gap: '16px'}}>
                                            <img src={product?.product.product_images[0]?.url} alt='img' width={90} height={90} />
                                            <div>
                                                <h4>{lang === 'en' ? product?.product?.name_en : product?.product?.name_ar}</h4>
                                                <Badge className='mb-2' variant="primary">{lang === 'en' ? product?.product?.category?.name_en : product?.product?.category?.name_ar}</Badge>
                                                <h5 className='mb-0'>{product?.amount} * {product?.product?.price}</h5>
                                            </div>
                                        </div>
                                        <div className='col-md-3 col-9'>
                                            <div>
                                                <button className='prod-btn' onClick={()=> {
                                                    if(!!user?.user){
                                                        changeAmount(product?.product, product?.amount+1)
                                                    }
                                                    dispatch(increaseProduct(product?.product))
                                                } }>
                                                    +
                                                </button>
                                                <span style={{fontSize: '20px'}} className='mx-4'>{product?.amount}</span>
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
                                        </div>
                                        <div className='col-md-1 col-3'>
                                            <div>
                                                <button className='trash' onClick={()=> removeProductFromCart(product?.product)}>
                                                <img src={trash} alt='trash' />
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
                                            disabled={!!subCart?.coupon_name}
                                            onChange={e=> setCoupon(e.target.value)}
                                            className="form-control" 
                                            name="code_name" id="code_name"
                                            placeholder={t("Please Enter")} />
                                        {!subCart?.coupon_name && <button className="btn-site" disabled={!coupon} onClick={promoCode}><span>{t("Apply")}</span></button>}
                                        {!!subCart?.coupon_name && <button className="btn-danger" onClick={removePromoCode}><span>{t("Remove")}</span></button>}
                                    </div>
                                </div>

                            </div>
                            <div className='d-flex justify-content-between'>
                                <h5 style={{fontSize: '18px'}}>{t("Total Price")}:</h5>
                                <h5 style={{fontSize: '18px', fontWeight: "600"}}>{totalPrice} {t("KWD")}</h5>
                            </div>
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