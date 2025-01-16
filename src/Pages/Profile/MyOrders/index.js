import { useEffect, useState } from "react";
import { Badge, Button, Col, Row } from "react-bootstrap";
import { t } from "i18next";
import OrderService from "../../../services/OrderService";
import { useSelector } from "react-redux";
import CancelModal from "./CancelModal";
import InvoiceModal from "./InvoiceModal";
import Loader from "../../../common/Loader";

const MyOrders = () => {
    const [loading, setLoading] = useState(false)
    const [shouldUpdate, setShouldUpdate] = useState(false)
    const [item, setItem] = useState({})
    const [modal, setModal] = useState(false)
    const [invoiceModal, setInvoiceModal] = useState(false)
    const [orderSelect, setOrderSelect] = useState({})
    const [orders, setOrders] = useState([])
    const orderService = new OrderService()
    const lang = useSelector(state => state?.lang?.lang)

    useEffect(()=>{
        setLoading(true)
        orderService.myOrders().then(res=>{
            if(res?.status === 200){
                setOrders(res?.data?.data?.data)
            }
            setLoading(false)
        }).catch(()=> setLoading(false))
    }, [shouldUpdate])

    // if(loading){
    //     return <div className="d-flex justify-content-center mt-5">
    //         <Loader />
    //     </div>
    // }
    return <div className="orders">
        {!!orders?.length ? orders?.map((order, index) => {
            return <div className="mb-3 order" 
            key={index}
            style={{
                borderBottom: '1px solid #dedede',
                padding: '1rem',
            }}>
                {order?.sub_carts?.map((ord, ind) => {
                    return <Row key={ind}>
                    <Col md={2}>
                        <img 
                            src={ord?.product?.product_images[0]?.url} 
                            alt='order' 
                            style={{width: '120px', height: '120px'}}
                        />
                    </Col>
                    <Col md={7}>
                        <h4 className="mb-1">{lang === 'en' ? ord?.product?.name_en : ord?.product?.name_ar}</h4>
                        <p className="mb-1">{}</p>
                        <div className="d-flex" style={{gap: '30px'}}>
                            <p className="m-0">{t("Price")}: <span>{ord?.product?.price.toFixed(3)} {t("KWD")}</span></p>
                            <p className="m-0">{t("Amount")}: <span>{ord?.amount}</span></p>
                        </div>
                        <p className="m-0">{t("Total Price")}: <span>{(Number(ord.product?.price)*Number(ord?.amount))?.toFixed(3)} {t("KWD")}</span></p>
                    </Col>
                    <Col md={3}>
                        {ind === 0 && <div className="d-flex flex-column">
                            <Button variant='primary' className="mb-2" onClick={()=>{
                                setOrderSelect(order)
                                setInvoiceModal(true)
                            }}>
                                {t("view")}
                            </Button>
                            {order?.status === 'ordered' && <Button variant='secondary' onClick={()=>{
                                setItem(order)
                                setModal(true)

                            }}>
                                {t("Cancel")}
                            </Button>}
                            <Badge 
                            bg={order?.status === 'canceled' ? "danger" : order?.status === 'ordered' ? "primary" : order?.status === 'delivered' ? 'success' : order?.status === 'shipped' ? "warning": "secondary"} 
                            style={{
                                padding: '10px', fontSize: '16px', marginTop: '8px'
                            }}>
                                {t(order?.status)}
                            </Badge>
                        </div>}
                        
                    </Col>
                    {ind !== order?.sub_carts?.length-1 && <Col md={12}>
                        <hr />
                    </Col>}
                    </Row>
                })}
                
            </div>
        }) : <div style={{
            background: '#F8F8F8',
            textAlign: 'center',
            padding: '55.5px 0'
        }}>
            <svg width="85" height="85" viewBox="0 0 85 85" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_68_15064)">
            <path d="M42.5 84.5C65.696 84.5 84.5 65.696 84.5 42.5C84.5 19.304 65.696 0.5 42.5 0.5C19.304 0.5 0.5 19.304 0.5 42.5C0.5 65.696 19.304 84.5 42.5 84.5Z" fill="#D0D0D0"/>
            <g opacity="0.2">
            <path d="M64.8125 34.625H20.1875C18.0127 34.625 16.25 36.3877 16.25 38.5625L21.5 62.1875C21.5 64.3623 23.2627 66.125 25.4375 66.125H59.5625C61.7373 66.125 63.5 64.3623 63.5 62.1875L68.75 38.5625C68.75 36.3877 66.9873 34.625 64.8125 34.625ZM32 59.5625C32 61.0128 30.8253 62.1875 29.375 62.1875C27.9247 62.1875 26.75 61.0128 26.75 59.5625V51.6875C26.75 50.2372 27.9247 49.0625 29.375 49.0625C30.8253 49.0625 32 50.2372 32 51.6875V59.5625ZM45.125 59.5625C45.125 61.0128 43.9503 62.1875 42.5 62.1875C41.0497 62.1875 39.875 61.0128 39.875 59.5625V51.6875C39.875 50.2372 41.0497 49.0625 42.5 49.0625C43.9503 49.0625 45.125 50.2372 45.125 51.6875V59.5625ZM58.25 59.5625C58.25 61.0128 57.0753 62.1875 55.625 62.1875C54.1747 62.1875 53 61.0128 53 59.5625V51.6875C53 50.2372 54.1747 49.0625 55.625 49.0625C57.0753 49.0625 58.25 50.2372 58.25 51.6875V59.5625Z" fill="#231F20"/>
            </g>
            <path d="M64.8125 32H20.1875C18.0127 32 16.25 33.7627 16.25 35.9375L21.5 59.5625C21.5 61.7373 23.2627 63.5 25.4375 63.5H59.5625C61.7373 63.5 63.5 61.7373 63.5 59.5625L68.75 35.9375C68.75 33.7627 66.9873 32 64.8125 32ZM32 56.9375C32 58.3878 30.8253 59.5625 29.375 59.5625C27.9247 59.5625 26.75 58.3878 26.75 56.9375V49.0625C26.75 47.6122 27.9247 46.4375 29.375 46.4375C30.8253 46.4375 32 47.6122 32 49.0625V56.9375ZM45.125 56.9375C45.125 58.3878 43.9503 59.5625 42.5 59.5625C41.0497 59.5625 39.875 58.3878 39.875 56.9375V49.0625C39.875 47.6122 41.0497 46.4375 42.5 46.4375C43.9503 46.4375 45.125 47.6122 45.125 49.0625V56.9375ZM58.25 56.9375C58.25 58.3878 57.0753 59.5625 55.625 59.5625C54.1747 59.5625 53 58.3878 53 56.9375V49.0625C53 47.6122 54.1747 46.4375 55.625 46.4375C57.0753 46.4375 58.25 47.6122 58.25 49.0625V56.9375Z" fill="#F27405"/>
            <g opacity="0.2">
            <path d="M74 37.25C74 38.7003 72.8253 39.875 71.375 39.875H13.625C12.1747 39.875 11 38.7003 11 37.25C11 35.7997 12.1747 34.625 13.625 34.625H71.375C72.8253 34.625 74 35.7997 74 37.25Z" fill="#231F20"/>
            </g>
            <path d="M74 34.625C74 36.0753 72.8253 37.25 71.375 37.25H13.625C12.1747 37.25 11 36.0753 11 34.625C11 33.1747 12.1747 32 13.625 32H71.375C72.8253 32 74 33.1747 74 34.625Z" fill="#F27405"/>
            <g opacity="0.2">
            <path d="M56.7114 20.4133C57.7365 21.4384 57.7365 23.1 56.7114 24.1251L41.7305 44.356C40.7055 45.381 39.0439 45.381 38.0188 44.356C36.9937 43.3309 36.9937 41.6693 38.0188 40.6442L52.9997 20.4133C54.0247 19.3883 55.6864 19.3883 56.7114 20.4133Z" fill="#231F20"/>
            </g>
            <path d="M56.7114 17.7883C57.7365 18.8134 57.7365 20.475 56.7114 21.5001L41.7305 41.7309C40.7055 42.756 39.0439 42.756 38.0188 41.7309C36.9937 40.7059 36.9937 39.0443 38.0188 38.0192L52.9997 17.7883C54.0247 16.7633 55.6864 16.7633 56.7114 17.7883Z" fill="#4F5D73"/>
            </g>
            <defs>
            <clipPath id="clip0_68_15064">
            <rect width="84" height="84" fill="white" transform="translate(0.5 0.5)"/>
            </clipPath>
            </defs>
            </svg>
            <p>{t("No Orders")}</p>
        </div>}
        {modal && <CancelModal modal={modal} setModal={setModal} setShouldUpdate={setShouldUpdate} orderService={orderService} item={item} />}
        {invoiceModal && <InvoiceModal modal={invoiceModal} setModal={setInvoiceModal} order={orderSelect} />}
    </div>
}
export default MyOrders;