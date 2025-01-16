import { useEffect, useState } from "react";
import UserAddressService from "../../../services/UserAddressService";
import { useTranslation } from "react-i18next";
import { Accordion, Badge, Button, Col, Row } from "react-bootstrap";
import './style.css'
import { useNavigate } from "react-router-dom";
import AddAddress from "./AddAddress";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../../common/Loader";

const Address = () => {
    const [data, setData] = useState([])
    const [item, setItem] = useState(null)
    const [shouldUpdate, setShouldUpdate] = useState([])
    const [addAddress, setAddAddress] = useState(false)
    const [deleteLoading, setdeleteLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const {t} = useTranslation()
    const userAddressServices = new UserAddressService()
    const lang = useSelector(state => state?.lang?.lang)

    useEffect(()=> {
        setLoading(true)
        userAddressServices.getList().then(res=> {
            if(res?.status === 200){
                setData(res?.data?.data)
                setItem(null)
            }
            setLoading(false)
        }).catch(()=> setLoading(false))
    },[shouldUpdate])

    const setDefault = (id)=> {
        userAddressServices.updateDefaultAddress(id).then(res=>{
            if(res?.status === 200){
                toast.success(t("Address Updated Successfully."))
                setShouldUpdate(prev=> !prev)
            }
        })
    }

    const deleteAddres = (id)=> {
        setdeleteLoading(true)
        userAddressServices.deleteAddress(id).then(res=>{
            if(res?.status){
                toast.success(t("Address Deleted Successfully."))
                setShouldUpdate(prev=> !prev)
            }
            setdeleteLoading(false)
        }).catch(()=> setdeleteLoading(false))
    }

    // if(loading){
    //     return <div className="d-flex justify-content-center mt-5">
    //         <Loader />
    //     </div>
    // }

    if(addAddress){
        return <AddAddress 
            setAddAddress={setAddAddress} 
            setShouldUpdate={setShouldUpdate} 
            item={item}
            setItem={setItem}
        />
    }

    return <div className="address">
        {data?.length === 0 ? <div>
            <h4>{t("No Address")} ...</h4>
        </div> : <div>
            <Accordion defaultActiveKey="0">
                {data?.map((addressData, index)=> {
                    return <Accordion.Item eventKey={index}>
                    <Accordion.Header>
                        {addressData?.addressName}
                        {addressData?.is_default && <Badge className="mx-4">{t("Default")}</Badge>}
                    </Accordion.Header>
                    <Accordion.Body>
                        <Row>
                            <Col md={6}>
                                <label>{t("Address Name")}</label>
                                <p>{addressData.addressName}</p>
                            </Col>
                            <Col md={6}>
                                <label>{t("Block")}</label>
                                <p>{addressData.block}</p>
                            </Col>
                            <Col md={6}>
                                <label>{t("Street")}</label>
                                <p>{addressData.street}</p>
                            </Col>
                            <Col md={6}>
                                <label>{t("Governorate")}</label>
                                <p>{lang === 'en' ? addressData?.governorate?.name_en : addressData?.governorate?.name_ar}</p>
                            </Col>
                            <Col md={6} className="mb-3">
                                <label>{t("Area")}</label>
                                <p>{lang === 'en' ? addressData?.area?.name_en : addressData?.area?.name_ar}</p>
                            </Col>
                            <Col md={6} className="mb-3">
                                <label>{t("Address Type")}</label>
                                <p>{t(addressData.type)}</p>
                            </Col>
                            <Col md={6}>
                                <label>{t("Avenue")}</label>
                                <p>{addressData.avenue}</p>
                            </Col>
                            <Col md={6}>
                                <label>{t("Building Number")}</label>
                                <p>{addressData.buildingNumber}</p>
                            </Col>
                            <Col md={6}>
                                <label>{t("Floor Number")}</label>
                                <p>{addressData.floorNumber}</p>
                            </Col>
                            <Col md={6}>
                                <label>{t("Office Number")}</label>
                                <p>{addressData.officeNumber}</p>
                            </Col>
                            <Col md={6}>
                                <label>{t("House Number")}</label>
                                <p>{addressData.houseNumber}</p>
                            </Col>
                            <Col md={6}>
                                <label>{t("Apartment Number")}</label>
                                <p>{addressData.aptNumber}</p>
                            </Col>
                            <Col md={12}>
                                <label>{t("Other Instructions")}</label>
                                <p>{addressData.otherInstructions}</p>
                            </Col>
                        </Row>
                        <div className="mt-3 d-flex justify-content-between">
                            <div>
                                <Button variant="secondary" type="button" onClick={()=> {
                                    setAddAddress(true)
                                    setItem(addressData)
                                }}>{t("Edit")}</Button>
                                <Button variant="danger" disabled={deleteLoading} className="mx-3" type="button" onClick={()=> {
                                    deleteAddres(addressData?.id)
                                }}>{t("Delete")}</Button>
                            </div>
                            {!addressData?.is_default && <Button variant="warning" onClick={()=> setDefault(addressData?.id)} type='button'>{t("Set Default")}</Button>}
                        </div>
                    </Accordion.Body>
                  </Accordion.Item>
                })}
            </Accordion>
        </div>}

        <Button variant="primary" onClick={()=> setAddAddress(true)} className="mt-5">{t("Add New Address")}</Button>
    </div>
}
export default Address;