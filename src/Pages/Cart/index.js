import { useEffect, useState } from 'react'
import './style.css'
import trash from '../../assets/trash.svg'
import cartImg from '../../assets/cartIllustartion.svg'
import { useDispatch, useSelector } from 'react-redux'
import { Badge, Card, CardBody } from 'react-bootstrap'
import { ShowLogin, decreaseProduct, increaseProduct, removeProduct } from '../../store/actions/AuthActions'
import { useTranslation } from 'react-i18next'
import CheckLogin from './CheckLogin'

const Cart = () =>{
    const [cartProducts, setCartProducts] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [coupon, setCoupon] = useState("")
    const [modal, setModal] = useState(false)
    const dispatch = useDispatch()
    const {t} = useTranslation()
    const user = useSelector(state => state?.user)
    const lang = useSelector(state => state?.lang?.lang)
    const cart = useSelector(state => state?.user?.cart)

    useEffect(()=>{
        setCartProducts(cart)
    }, [cart])

    useEffect(()=>{
        let total = cart?.map(item=> item?.amount*item?.price)?.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        setTotalPrice(total)
    },[cart,coupon])

    return <div className="cart">
        <div className='container'>
            {cartProducts?.length > 0 ? <div className='row'>
                <div className='col-md-8'>
                    <Card style={{border: 'none'}}>
                        <CardBody>
                            {cartProducts?.map(product => {
                            return <div key={product?.id} className='product-cart'>
                                    <div className='row align-items-center'>
                                        <div className='col-md-8 col-12 d-flex' style={{gap: '16px'}}>
                                            <img src={product.product_images[0]?.url} alt='img' width={90} height={90} />
                                            <div>
                                                <h4>{lang === 'en' ? product?.name_en : product?.name_ar}</h4>
                                                <Badge className='mb-2' variant="primary">{lang === 'en' ? product?.category?.name_en : product?.category?.name_ar}</Badge>
                                                <h5 className='mb-0'>{product?.amount} * {product?.price}</h5>
                                            </div>
                                        </div>
                                        <div className='col-md-3 col-9'>
                                            <div>
                                                <button className='prod-btn' onClick={()=> dispatch(increaseProduct(product))}>
                                                    +
                                                </button>
                                                <span style={{fontSize: '20px'}} className='mx-4'>{product?.amount}</span>
                                                <button 
                                                    className='prod-btn minus' 
                                                    disabled={product?.amount === 1} 
                                                    style={{cursor: product?.amount > 1 ? 'pointer' : 'not-allowed'}}
                                                    onClick={()=> dispatch(decreaseProduct(product))}
                                                >
                                                    -
                                                </button>
                                            </div>
                                        </div>
                                        <div className='col-md-1 col-3'>
                                            <div>
                                                <button className='trash' onClick={()=> dispatch(removeProduct(product))}>
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
                    <Card style={{border: 'none'}}>
                        <CardBody>
                            <h5 className='mb-4'>{t("Payment Details")}</h5>
                            {/* <div>
                                <p>Coupon:</p>
                                <input 
                                    type='text' 
                                    onChange={(e)=> setCoupon(e?.target?.value)} 
                                />
                            </div> */}
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