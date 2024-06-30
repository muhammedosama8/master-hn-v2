import { useState } from "react";
import categoryImg from '../../../assets/category.jpeg'
import categoryImg2 from '../../../assets/2.webp'
import { Badge, Button, Col, Row } from "react-bootstrap";
import { t } from "i18next";

const MyOrders = () => {
    const [orders, setOrders] = useState([
        {id: 1, img: categoryImg, name: 'Products 1', category: "Category", price: 50, amount: 3, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"},
        {id: 2, img: categoryImg2, name: 'Products 2', category: "Category", price: 50, amount: 3, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"},
        {id: 3, img: categoryImg, name: 'Products 1', category: "Category", price: 50, amount: 3, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"},
        {id: 4, img: categoryImg2, name: 'Products 2', category: "Category", price: 50, amount: 3, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"},
    ])
    return <div className="orders">
        {orders?.map((order, index) => {
            return <Row 
                className="mb-3" 
                key={index}
                style={{
                    borderBottom: '1px solid #dedede',
                    paddingBottom: '.75rem'
                }}
            >
                <Col md={2}>
                    <img 
                        src={order?.img} 
                        alt='order' 
                        style={{width: '120px', height: '120px'}}
                    />
                </Col>
                <Col md={7}>
                    <h4 className="mb-1">{order?.name}</h4>
                    <Badge className="mb-2" variant='primary'>{order?.category}</Badge>
                    <div className="d-flex" style={{gap: '30px'}}>
                        <p className="m-0">{t("Price")}: <span>{order?.price} {t("KWD")}</span></p>
                        <p className="m-0">{t("Amount")}: <span>{order?.amount}</span></p>
                    </div>
                    <p className="m-0">{t("Total Price")}: <span>150 {t("KWD")}</span></p>
                </Col>
                <Col md={3}>
                    <div className="d-flex justify-content-end">
                        <Button variant='primary'>
                            {t("Buy it again")}
                        </Button>
                    </div>
                    
                </Col>
            </Row>
        })}
    </div>
}
export default MyOrders;