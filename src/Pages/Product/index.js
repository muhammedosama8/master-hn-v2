import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import "./style.css"
import { useDispatch } from "react-redux"
import { addToCart } from "../../store/actions/AuthActions"

const Product = () => {
    const [product, setProduct] = useState({})
    const [amount, setAmount] = useState(1)
    const location = useLocation()
    const dispatch = useDispatch()

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
        <div className="container">
            <div className="row">
                <div className="col-md-6 text-center">
                    <img src={product?.img} alt='product' />
                </div>
                <div className="col-md-6">
                    <h1>{product?.name}</h1>
                    <h4 className="category">{product?.category}</h4>
                    <p className="price">{product?.price} KWD</p>
                    <p className="description">{product?.description}</p>
                    <div className="d-flex" style={{gap: '22px'}}>
                        <button onClick={()=> addCart()} className="buy">Buy</button>
                        <div className="amounts d-flex" style={{alignItems: 'center'}}>
                            <button 
                                onClick={()=> setAmount(prev => ++prev)}
                                className="btn btn-outline-secondary" 
                                style={{marginRight: '12px'}}
                            >+</button>
                            <span>{amount}</span>
                            <button
                                onClick={()=> {
                                    setAmount(prev=> --prev)
                                }}
                                className="btn btn-outline-secondary" 
                                disabled={amount === 1}
                                style={{marginLeft: '12px'}}
                            >-</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
export default Product