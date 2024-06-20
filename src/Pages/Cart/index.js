import { useEffect, useState } from 'react'
import './style.css'
import trash from '../../assets/trash.svg'
import cartImg from '../../assets/cart.svg'
import { useDispatch, useSelector } from 'react-redux'
import { Badge, Card, CardBody } from 'react-bootstrap'
import { ShowLogin, decreaseProduct, increaseProduct, removeProduct } from '../../store/actions/AuthActions'

const Cart = () =>{
    const [cartProducts, setCartProducts] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [coupon, setCoupon] = useState("")
    const dispatch = useDispatch()
    const user = useSelector(state => state?.user)
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
                            return <div key={product.id} className='product-cart'>
                                    <div className='row align-items-center'>
                                        <div className='col-md-8 d-flex' style={{gap: '16px'}}>
                                            <img src={product.img} alt='img' width={90} height={90} />
                                            <div>
                                                <h4>{product?.name}</h4>
                                                <Badge className='mb-2' variant="primary">{product?.category}</Badge>
                                                <h5 className='mb-0'>{product?.amount} * {product?.price}</h5>
                                            </div>
                                        </div>
                                        <div className='col-md-3'>
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
                                        <div className='col-md-1'>
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
                            {/* <div>
                                <p>Coupon:</p>
                                <input 
                                    type='text' 
                                    onChange={(e)=> setCoupon(e?.target?.value)} 
                                />
                            </div> */}
                            <div className='d-flex justify-content-between'>
                                <h5>Total Price:</h5>
                                <h5 style={{fontWeight: "600"}}>{totalPrice} KWD</h5>
                            </div>
                            <div>
                                <button 
                                    className='continue w-100'
                                    onClick={()=> {
                                        if(!user?.user){
                                            dispatch(ShowLogin(true))
                                        }
                                    }}
                                >Continue</button>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div> : <div className='text-center' style={{marginTop: '13rem', marginBottom: '7rem'}}>
                <img src={cartImg} alt='cart' width={250} />
                <h2 className='mt-4'>Your Cart is Empty</h2>
            </div>}
        </div>
    </div>
}
export default Cart