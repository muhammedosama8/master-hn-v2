import React ,{useState} from 'react'
import { Button, Col, Modal, Row } from "react-bootstrap"
import { toast } from "react-toastify";
import logo from '../../../../assets/logo1.png'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

function InvoiceModal({modal, setModal, order}) {
    const [loading, setLoading] = useState(false)
    const {t} = useTranslation()
    const lang = useSelector(state => state?.lang.lang)

    return (
        <Modal show={modal} onHide={setModal} className={lang === 'en' ? 'ltr en' : 'rtl ar'} >
            <div className="pt-3 text-center">
                <img src={logo} alt='logo' width={124}/>
            </div>
            <div className='py-3 px-4'>
                <div className='d-flex justify-content-between mt-3'>
                    <div>
                        <p>{order?.user?.username}</p>
                        <p>{lang === 'en' ? order?.user_address?.area?.name_en : order?.user_address?.area?.name_ar}</p>
                        <p>{t("status")}: {order?.status}</p>
                    </div>
                    <div>
                        <p>{t("Order Date")} : {order?.createdAt?.split('T')[0]}</p>
                        <p>{t("Order ID")} : #{order?.id}</p>
                        <p>{t("Payment Method")} : {order?.payment_method}</p>
                    </div>
                </div>
                <div className='orders my-3'>
                    <Row style={{border: '1px solid #dedede', padding: '8px'}}>
                        <Col md={4}>{t("Details")}</Col>
                        <Col md={4}>{t("Quantity")}</Col>
                        <Col md={4}>{t("Price")}</Col>
                    </Row>
                    {order?.sub_carts?.map(item => {
                        return <Row style={{border: '1px solid #dedede', padding: '8px', alignItems: 'center'}}>
                            <Col md={4}>
                                <img src={item.product?.product_images[0].url} alt='product' className='w-50 m-auto' />
                            </Col>
                            <Col md={4}>{item?.amount}</Col>
                            <Col md={4}>{(Number(item.product?.price)*Number(item?.amount))?.toFixed(3)} {t("KWD")}</Col>
                        </Row>
                    })}
                </div>
                <Row>
                    <Col md={9}>
                        <div style={{background: '#F8F8F8'}}  className='p-3'>
                            <div className='d-flex justify-content-between'>
                                <p>{t("Sub Total")}</p>
                                <p>{order?.sub_total?.toFixed(3)} {t("KWD")}</p>
                            </div>
                            {!!order?.coupon_name && <div className='d-flex justify-content-between'>
                                <p>{t("Discount")}</p>
                                {order?.coupon_type === "percentage" && <p>{order?.coupon_value} %</p>}
                                {order?.coupon_type !== "percentage" && <p>{order?.coupon_value?.toFixed(3)} {t("KWD")}</p>}
                            </div>}
                            <div className='d-flex justify-content-between'>
                                <p>{t("Delivery Charges")}</p>
                                <p>{order?.shipping_fee?.toFixed(3)} {t("KWD")}</p>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <p>{t("Total")}</p>
                                <p>{order?.total?.toFixed(3)} {t("KWD")}</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="modal-footer border-0">
                <button
                    type="button"
                    onClick={() => setModal(false)}
                    className="btn me-auto btn-secondary"
                    data-dismiss="modal"
                >
                    {t("Close")}
            </button>
            </div>
        </Modal>
    )
}

export default InvoiceModal
