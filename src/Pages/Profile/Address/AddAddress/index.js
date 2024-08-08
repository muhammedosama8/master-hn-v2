import { useEffect, useState } from "react"
import { Button, Col, Modal, Row } from "react-bootstrap"
import UserAddressService from "../../../../services/UserAddressService"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import '../style.css'
import { AvField, AvForm } from "availity-reactstrap-validation"
import CountryService from "../../../../services/CountryService"
import Select from "react-select"
import { toast } from "react-toastify"

const AddAddress = ({setAddAddress, setShouldUpdate, item, setItem}) => {
    const [formData, setFormData] = useState({
        addressName: "",
        block: "",
        street: "",
        area_id: 0,
        governorate_id: 0,
        type: "",
        avenue: "",
        buildingNumber: "",
        floorNumber: "",
        officeNumber: "",
        houseNumber: "",
        aptNumber: "",
        otherInstructions: "",
        longitude: 0,
        latitude: 0
    })
    const {t} = useTranslation()
    const [loading, setLoading] = useState(false)
    const [isAdd, setIsAdd] = useState(true)
    const [governorateOptions, setGovernorateOptions] = useState([])
    const [areaOptions, setAreaOptions] = useState([])
    const typesOptions = [
        {label: t("House"), value: "house"},
        {label: t("Building Number"), value: "building"},
        {label: t("Office"), value: "office"}
    ]
    const lang = useSelector(state => state.lang?.lang)
    const userAddressService = new UserAddressService()
    const countryService = new CountryService()

    useEffect(()=>{
        if(!!item){
            setIsAdd(false)
            let info = {
                ...item,
                area_id: {
                    ...item?.area,
                    label: lang=== 'en' ? item?.area?.name_en : item?.area?.name_ar,
                    value: item?.area?.id
                },
                governorate_id: {
                    ...item?.governorate,
                    label: lang=== 'en' ? item?.governorate?.name_en : item?.governorate?.name_ar,
                    value: item?.governorate?.id
                },
                type: typesOptions?.find(res=> res?.value === item?.type)
            }
            delete info['area'] 
            delete info['createdAt'] 
            delete info['governorate']
            delete info['is_default'] 
            delete info['updatedAt'] 
            delete info['user_id'] 
            setFormData(info)
        }
    },[item])

    useEffect(()=>{
        countryService?.getList().then(res=>{
            if(res?.status === 200){
                let data = res?.data?.data?.map(country => {
                    return {
                        ...country,
                        label: lang === 'en' ? country?.name_en : country?.name_ar,
                        value: country?.id
                    }
                })
                setGovernorateOptions(data)
            }
        })
    },[lang])

    useEffect(()=>{
        if(!!formData?.governorate_id?.id){
            countryService?.getArea(formData?.governorate_id?.id).then(res=>{
                if(res?.status === 200){
                    let data = res?.data?.data?.map(area => {
                        return {
                            ...area,
                            label: lang === 'en' ? area?.name_en : area?.name_ar,
                            value: area?.id
                        }
                    })
                    setAreaOptions(data)
                }
            })
        }
    },[lang, formData?.governorate_id])

    const submit = () =>{
        let data = {
            ...formData,
            governorate_id: formData?.governorate_id?.id,
            area_id: formData?.area_id?.id,
            type: formData?.type?.value,
        }
        if(!formData?.otherInstructions) delete data['otherInstructions']
        setLoading(true)
        if(isAdd){
            userAddressService.create(data).then(res=> {
                if(res?.status){
                    toast.success(t("Address Added Successfully."))
                    setAddAddress(false)
                    setShouldUpdate(prev=> !prev)
                }
                setLoading(false)
            }).catch(e=> {
                setLoading(false)
                toast.error(e.response?.data?.message?.replaceAll('_', ' '))
            })
        } else {
            delete data['id'] 
            userAddressService.updateAddress(formData?.id,data).then(res=> {
                if(res?.status){
                    toast.success(t("Address Updated Successfully."))
                    setAddAddress(false)
                    setShouldUpdate(prev=> !prev)
                }
                setLoading(false)
            }).catch(e=> {
                setLoading(false)
                toast.error(e.response?.data?.message?.replaceAll('_', ' '))
            })
        }
    }

    return <div className="addAddress">
                <AvForm 
                    className="form-checkout form-st guestForm form-horizontal"
                    onValidSubmit={submit}> 
                    <Row>
                        <Col md={6}>
                            <AvField
                                label={t("Address Name")}
                                type='text'
                                placeholder={t("Address Name")}
                                bsSize="lg"
                                name='addressName'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: t("This Field is required")
                                    }
                                }}
                                value={formData.addressName}
                                onChange={(e) => setFormData({...formData, addressName: e.target.value})}
                            />
                        </Col>
                        <Col md={6}>
                            <AvField
                                label={t("Block")}
                                type='text'
                                placeholder={t("Block")}
                                bsSize="lg"
                                name='block'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: t("This Field is required")
                                    }
                                }}
                                value={formData.block}
                                onChange={(e) => setFormData({...formData, block: e.target.value})}
                            />
                        </Col>
                        <Col md={6}>
                            <AvField
                                label={t("Street")}
                                type='text'
                                placeholder={t("Street")}
                                bsSize="lg"
                                name='street'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: t("This Field is required")
                                    }
                                }}
                                value={formData.street}
                                onChange={(e) => setFormData({...formData, street: e.target.value})}
                            />
                        </Col>
                        <Col md={6}>
                            <label className="mb-2">{t("Governorate")}</label>
                            <Select
                                options={governorateOptions}
                                name='governorate'
                                value={formData?.governorate_id}
                                onChange={e=> setFormData({...formData, governorate_id: e})}
                            />
                        </Col>
                        <Col md={6} className="mb-3">
                            <label className="mb-2">{t("Area")}</label>
                            <Select
                                options={areaOptions}
                                name='area_id'
                                value={formData?.area_id}
                                onChange={e=> setFormData({...formData, area_id: e})}
                            />
                        </Col>
                        <Col md={6} className="mb-3">
                            <label className="mb-2">{t("Address Type")}</label>
                            <Select
                                options={typesOptions}
                                name='area_id'
                                value={formData?.type}
                                onChange={e=> setFormData({...formData, type: e})}
                            />
                        </Col>
                        <Col md={6}>
                            <AvField
                                label={t("Avenue")}
                                type='text'
                                placeholder={t("Avenue")}
                                bsSize="lg"
                                name='avenue'
                                value={formData.avenue}
                                onChange={(e) => setFormData({...formData, avenue: e.target.value})}
                            />
                        </Col>
                        <Col md={6}>
                            <AvField
                                label={t("Building Number")}
                                type='text'
                                placeholder={t("Building Number")}
                                bsSize="lg"
                                name='buildingNumber'
                                value={formData.buildingNumber}
                                onChange={(e) => setFormData({...formData, buildingNumber: e.target.value})}
                            />
                        </Col>
                        <Col md={6}>
                            <AvField
                                label={t("Floor Number")}
                                type='text'
                                placeholder={t("Floor Number")}
                                bsSize="lg"
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: t("This Field is required")
                                    }
                                }}
                                name='floorNumber'
                                value={formData.floorNumber}
                                onChange={(e) => setFormData({...formData, floorNumber: e.target.value})}
                            />
                        </Col>
                        <Col md={6}>
                            <AvField
                                label={t("Office Number")}
                                type='text'
                                placeholder={t("Office Number")}
                                bsSize="lg"
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: t("This Field is required")
                                    }
                                }}
                                name='officeNumber'
                                value={formData.officeNumber}
                                onChange={(e) => setFormData({...formData, officeNumber: e.target.value})}
                            />
                        </Col>
                        <Col md={6}>
                            <AvField
                                label={t("House Number")}
                                type='text'
                                placeholder={t("House Number")}
                                bsSize="lg"
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: t("This Field is required")
                                    }
                                }}
                                name='houseNumber'
                                value={formData.houseNumber}
                                onChange={(e) => setFormData({...formData, houseNumber: e.target.value})}
                            />
                        </Col>
                        <Col md={6}>
                            <AvField
                                label={t("Apartment Number")}
                                type='text'
                                placeholder={t("Apartment Number")}
                                bsSize="lg"
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: t("This Field is required")
                                    }
                                }}
                                name='aptNumber'
                                value={formData.aptNumber}
                                onChange={(e) => setFormData({...formData, aptNumber: e.target.value})}
                            />
                        </Col>
                        <Col md={12}>
                            <AvField
                                label={t("Other Instructions")}
                                type='text'
                                placeholder={t("Other Instructions")}
                                bsSize="lg"
                                name='otherInstructions'
                                value={formData.otherInstructions}
                                onChange={(e) => setFormData({...formData, otherInstructions: e.target.value})}
                            />
                        </Col>
                    </Row>
                    <div className="mt-3 d-flex justify-content-between">
                        <Button variant="secondary" type="button" onClick={()=>setAddAddress(false)}>{t("Back")}</Button>
                        <Button variant="primary" disabled={loading} type='submit'>{t("Submit")}</Button>
                    </div>
                </AvForm>
    </div>
}
export default AddAddress