import { useEffect, useState } from 'react'
import './style.css'
import { useSelector } from 'react-redux'

const Cart = () =>{
    const [cartProducts, setCartProducts] = useState([])
    const cart = useSelector(state => state?.user?.cart)

    useEffect(()=>{
        setCartProducts(cart)
    }, [cart])

    return <div className="cart">
        <div className='container'>
            <div className='row'>
                <div className='col-md-8'>
                    {cartProducts?.map(product => {
                        return <div key={product.id} className='product-cart'>
                        </div>
                    })}
                </div>
                <div className='col-md-4'></div>
            </div>
        </div>
    </div>
}
export default Cart