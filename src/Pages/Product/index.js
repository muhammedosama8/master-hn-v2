import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import "./style.css"

const Product = () => {
    const [product, setProduct] = useState({})
    const location = useLocation()

    useEffect(()=>{
        if(location?.state){
            setProduct({...location?.state?.product})
        }
    },[location])

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
                    <Link to='/' className="buy">Buy</Link>
                </div>
            </div>
        </div>
    </div>
}
export default Product