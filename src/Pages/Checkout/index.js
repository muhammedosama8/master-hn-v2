import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Area from '../../Enums/Area';
import Select from "react-select"
import { useDispatch, useSelector } from 'react-redux';
import UserAddressService from '../../services/UserAddressService';
import { useNavigate } from 'react-router-dom';
import { Accordion, Badge, Button, Card, CardBody, Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import CartService from '../../services/CartService';
import './style.css'
import OrderService from '../../services/OrderService';
import { setCart, setPromoCode } from '../../store/actions/AuthActions';
import { AvField, AvForm } from 'availity-reactstrap-validation';
import CountryService from '../../services/CountryService';
import OrderGuestService from '../../services/OrderGuestService';

const Checkout = () =>{
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
        latitude: 0,
        guest_name: "",
        guest_email: "",
        guest_phone: ""
    })
    const {t} = useTranslation()
    const [governorateOptions, setGovernorateOptions] = useState([])
    const [areaOptions, setAreaOptions] = useState([])
    const typesOptions = [
        {label: t("House"), value: "house"},
        {label: t("Building Number"), value: "building"},
        {label: t("Office"), value: "office"}
    ]
    const [isLogin, setIsLogin] = useState(null)
    const [address, setAddress] = useState([])
    const [paymentMethod, setPaymentMethod] = useState('cash')
    const [addNewAddress, setAddNewAddress] = useState(false)
    const [loadingAddress, setLoadingAddress] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const lang = useSelector(state => state?.lang?.lang)
    const [cashInDelivery, setCashInDelivery] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalPriceAfterDis, setTotalPriceAfterDis] = useState(0)
    const [deliveryChargess, setDeliveryChargess] = useState(0)
    const [discountAmount, setDiscountAmount] = useState(0)
    const [coupon, setCoupon] = useState("")
    const [paymentType, setPaymentType] = useState('knet')
    const [couponDetails, setCouponDetails] = useState("")
    const [shouldUpdate, setShouldUpdate] = useState(false)
    const [shouldUpdateAddress, setShouldUpdateAddress] = useState(false)
    const [loadin, setLoading] = useState(false)
    const [cartId, setCartId] = useState('')
    const [cartProducts, setCartProducts] = useState([])
    const user = useSelector(state=> state?.user?.user)
    const userAddressService = new UserAddressService()
    const cartService = new CartService()
    const orderService = new OrderService()
    const orderGuestService = new OrderGuestService()
    const cart = useSelector(state => state?.user?.cart)

    useEffect(()=> {
        if(!!user){
            setIsLogin(1)
            userAddressService.getList().then(res=>{
                if(res?.status){
                    let response = res?.data?.data
                    setAddress(response)
                }
            }).catch(()=> {})
        } else {
            setIsLogin(0)
        }
    }, [user, shouldUpdateAddress])

    useEffect(()=> {
        if(!!user){
            cartService.getList().then(res=>{
                if(res?.status === 200){
                    let data = res?.data.data
                    setCartId(data?.id)
                    setCartProducts(data?.sub_carts)
                    setTotalPrice(data?.sub_total)
                    setTotalPriceAfterDis(data?.total)
                    setDiscountAmount(data?.discount_amount)
                    if(!!data?.coupon_name){
                        setCoupon(data?.coupon_name)
                        setCouponDetails({
                            coupon: data?.coupon_name,
                            coupon_type: data?.coupon_type,
                            coupon_value: data?.coupon_value,
                        })
                        dispatch(setPromoCode({
                            coupon: data?.coupon_name,
                            coupon_type: data?.coupon_type,
                            coupon_value: data?.coupon_value,
                        }))
                    }
                }
                setLoading(false)
            }).catch((e) => {
                if(e.response.data?.message === "cart_not_Exist"){
                    navigate('/')
                }
                setLoading(false)
            })
        } else {
            let data = cart?.map(item=> {
                return {
                    amount: item?.amount,
                    dynamicVariants: item?.dynamicVariants?.filter(res=> res?.amount > 0),
                    product: item
                }
            })
            setLoading(false)
            let totalP = data?.map(res=> {
                let tot = (res?.product?.amount*res?.product?.price) + res?.dynamicVariants?.map(dy=> dy?.amount*dy?.price).reduce((accumulator, currentValue) => {
                    return accumulator + currentValue;
                }, 0)
                return tot
            }).reduce((accumulator, currentValue) => {
                return accumulator + currentValue;
            }, 0)
            setTotalPrice(totalP)
            setCartProducts(data)
                               
            let dis
            if(couponDetails?.coupon_type === "percentage"){
                dis = Number(totalP) - ((Number(totalP)* (Number(couponDetails?.coupon_value)/100)))
            } else if(couponDetails?.coupon_type === "fixed"){
                dis = Number(totalP) - Number(couponDetails?.coupon_value)
            } else {
                dis = Number(totalP)
            }
            setTotalPriceAfterDis(dis)
        }
    },[user, shouldUpdate,cart, couponDetails])

    useEffect(()=>{
        if(!!address?.length && !!cartId){
            let data ={
                cart_id: cartId,
                user_address_id: address.find(res=> res.is_default)?.id,
                payment_method: paymentMethod,
            }
            
            cartService.summary(data).then(res=> {
                if(res?.status){
                    let data = res?.data?.data
                    setDeliveryChargess(data?.shipping_fee)
                    setTotalPrice(data?.sub_total)
                    setTotalPriceAfterDis(data?.total)
                    setDiscountAmount(data?.discount_amount)
                    setCashInDelivery(data?.cash_in_delivery)
                }
            })
        }
    },[cartId, address, paymentMethod, shouldUpdate])

    useEffect(()=>{
        new CountryService()?.getList().then(res=>{
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
            new CountryService()?.getArea(formData?.governorate_id?.id).then(res=>{
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

    const setDefault = (id)=> {
        userAddressService.updateDefaultAddress(id).then(res=>{
            if(res?.status === 200){
                toast.success(t("Address Updated Successfully."))
                setShouldUpdateAddress(prev=> !prev)
            }
        })
    }

    const submitOrder = () => {
        if(isLogin === 1){
            if(address?.length === 0){
                toast.error(t("Add Address First"))
                return
            }
            let data = {
                payment_method: paymentMethod,
                user_address_id: address.find(res=> res.is_default)?.id,
                cart_id: cartId,
            }
            if(paymentMethod === 'visa') data['paymentType'] = paymentType
            orderService.create(data).then(res=>{
                if(res?.status === 201){
                    if(paymentMethod === 'visa'){
                        window.location.href = res.data?.data
                        return
                    }
                    navigate('/order-successful')
                }
            }).catch((e)=> {
                toast.error(e?.response?.data?.message.replaceAll('_', ' '))
                navigate('/order-failed')
            })
        } else {
            if(
                !formData?.area_id?.id || 
                !formData?.governorate_id?.id || !formData?.type?.value ||
                !formData?.guest_name || !formData?.guest_email ||
                !formData?.guest_phone || !formData?.addressName ||
                !formData?.block || !formData?.street
            ){
                toast.error('Add Address.')
                return
            }
            let data = {
                products: cartProducts?.map(res=> {
                    return {
                        amount: res?.amount,
                        product_id: res?.product?.id,
                        dynamic_variant: res?.dynamic_variant?.map(variant => {
                            let response = {
                                dynamic_variant_id: variant?.id
                            }
                            if(!!variant?.amount) response["amount"] = variant?.amount
                            return response
                        })
                    }
                }),
                guest_name: formData?.guest_name,
                guest_email: formData?.guest_email,
                guest_phone: formData?.guest_phone,
                total: totalPriceAfterDis,
                payment_method: paymentMethod,
                addressName: formData?.addressName,
                block: formData?.block,
                street: formData?.street,
                area_id: formData?.area_id?.id,
                governorate_id: formData?.governorate_id?.id,
                type: formData?.type?.value
            }
            if(paymentMethod === 'visa') data['paymentType'] = paymentType
            if(!!formData?.avenue) data['avenue'] = formData?.avenue
            if(!!formData?.buildingNumber) data['buildingNumber'] = formData?.buildingNumber
            if(!!formData?.floorNumber) data['floorNumber'] = formData?.floorNumber
            if(!!formData?.officeNumber) data['officeNumber'] = formData?.officeNumber
            if(!!formData?.houseNumber) data['houseNumber'] = formData?.houseNumber
            if(!!formData?.aptNumber) data['aptNumber'] = formData?.aptNumber
            if(!!formData?.otherInstructions) data['otherInstructions'] = formData?.otherInstructions

            orderGuestService.create(data).then(res=>{
                if(res?.status === 201){
                    if(paymentMethod === 'visa'){
                        window.location.href = res.data?.data
                        return
                    }
                    navigate('/order-successful')
                }
            }).catch((e)=> {
                toast.error(e?.response?.data?.message.replaceAll('_', ' '))
                navigate('/order-failed')
            })
        }
    }

    const commonLines = () => {
        toast.success(t("Remove"))
        dispatch(setPromoCode(""))
        localStorage.removeItem('PromoCodeMasterHN')
        setCoupon('')
        setCouponDetails("")
        setShouldUpdate(prev=> !prev)
    }

    const promoCode = () =>{
        let data = {
            promoCode: coupon
        }
        if(!!cartId) data['cart_id'] = cartId
        cartService.createPromoCode(data).then(res=>{
            if(res?.status === 200){
                toast.success(t("Successfully Applied"))
                setCouponDetails({coupon,...res?.data?.data})
                localStorage.setItem('PromoCodeMasterHN', JSON.stringify({coupon: coupon,...res?.data?.data}))
                dispatch(setPromoCode({coupon: coupon,...res?.data?.data}))
                setShouldUpdate(prev=> !prev)
            }
        }).catch((e)=> {
            if(e?.response.data?.message === "promo_code_not_Exist"){
                toast.error(t("promo code is invalid!"))
            }
        })
    }

    const removePromoCode = () => {
        let data = {
            cart_id: cartId
        }
        if(!!user){
            cartService.deletePromoCode(data).then(res=> {
                if(res?.status === 200) commonLines() 
            })
        } else {
            commonLines()
        }
    }

    const submit = () =>{
        let data = {
            ...formData,
            governorate_id: formData?.governorate_id?.id,
            area_id: formData?.area_id?.id,
            type: formData?.type?.value,
        }
        if(!formData?.otherInstructions) delete data['otherInstructions']
        setLoadingAddress(true)
        
        userAddressService.create(data).then(res=> {
            if(res?.status){
                toast.success(t("Address Added Successfully."))
                setShouldUpdateAddress(prev=> !prev)
            }
            setLoadingAddress(false)
            setAddNewAddress(false)
        }).catch(e=> {
            setLoadingAddress(false)
            toast.error(e.response?.data?.message?.replaceAll('_', ' '))
        })
    }

    return  <section className="checkout_page stage_padding">
    <div className="container">
        <div className="sec_head wow fadeInUp">
            <h4>{t("Checkout")}</h4>
        </div>
        <div className="row">
            <div className="col-lg-8">
                <Card className='mt-4' style={{border: 'none', boxShadow: '0 0 4px rgba(222, 222, 222, 0.47)'}}>
                        <CardBody>
                            {cartProducts?.map(product => {
                            return <div key={product?.product?.id} className='product-cart'>
                                    <div className='row'>
                                        <div className='col-md-9 col-12 d-flex' style={{gap: '16px'}}>
                                            <img src={product?.product?.product_images[0]?.url} alt='img' width={90} height={90} />
                                            <div>
                                                <h5 className='m-0'>{lang === 'en' ? product?.product?.name_en : product?.product?.name_ar}</h5>
                                                <Badge className='mb-2' variant="primary">{lang === 'en' ? product?.product?.category?.name_en : product?.product?.category?.name_ar}</Badge>
                                                <h5 className='mb-2'>{product?.amount} * {product?.product?.price.toFixed(3)}</h5>
                                                {product?.dynamicVariants?.map(dy => {
                                                    return <h6 key={dy.id}>
                                                        {lang === 'en' ? dy?.name_en : dy?.name_ar} ({dy?.amount} * {dy?.price?.toFixed(3)})
                                                    </h6>
                                                })}
                                            </div>
                                        </div>
                                        <div className='col-md-3 col-12'>
                                            <div className='text-center'>
                                               {product?.dynamicVariants?.length ? <h4 className='text-primary'>{((Number(product?.amount)*Number(product?.product?.price)) + product?.dynamicVariants?.map(res=> res?.amount*res?.price).reduce((accumulator, currentValue) => {
                                                    return accumulator + currentValue;
                                                }, 0)).toFixed(3)} {t("KWD")}</h4> :
                                                <h4 className='text-primary tot-pri'>{(Number(product?.amount)*Number(product?.product?.price)).toFixed(3)} {t("KWD")}</h4>}
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            })}
                        </CardBody>
                </Card>
                {isLogin === 1 && <div className='mt-4 address'>
                    <h5>{t("Address")}</h5>
                    <Accordion defaultActiveKey="0">
                        {address?.map((addressData, index)=> {
                            return <Accordion.Item eventKey={index}>
                            <Accordion.Header>
                                {addressData?.addressName}
                                {addressData?.is_default && <Badge className="mx-4">{t("Default")}</Badge>}
                            </Accordion.Header>
                            <Accordion.Body>
                                <Row>
                                    <div className="col-6">
                                        <label>{t("Address Name")}</label>
                                        <p>{addressData.addressName}</p>
                                    </div>
                                    <div className="col-6">
                                        <label>{t("Block")}</label>
                                        <p>{addressData.block}</p>
                                    </div>
                                    <div className="col-6">
                                        <label>{t("Street")}</label>
                                        <p>{addressData.street}</p>
                                    </div>
                                    <div className="col-6">
                                        <label>{t("Governorate")}</label>
                                        <p>{lang === 'en' ? addressData?.governorate?.name_en : addressData?.governorate?.name_ar}</p>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label>{t("Area")}</label>
                                        <p>{lang === 'en' ? addressData?.area?.name_en : addressData?.area?.name_ar}</p>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label>{t("Address Type")}</label>
                                        <p>{t(addressData.type)}</p>
                                    </div>
                                    <div className="col-6">
                                        <label>{t("Avenue")}</label>
                                        <p>{addressData.avenue}</p>
                                    </div>
                                    <div className="col-6">
                                        <label>{t("Building Number")}</label>
                                        <p>{addressData.buildingNumber}</p>
                                    </div>
                                    <div className="col-6">
                                        <label>{t("Floor Number")}</label>
                                        <p>{addressData.floorNumber}</p>
                                    </div>
                                    <div className="col-6">
                                        <label>{t("Office Number")}</label>
                                        <p>{addressData.officeNumber}</p>
                                    </div>
                                    <div className="col-6">
                                        <label>{t("House Number")}</label>
                                        <p>{addressData.houseNumber}</p>
                                    </div>
                                    <div className="col-6">
                                        <label>{t("Apartment Number")}</label>
                                        <p>{addressData.aptNumber}</p>
                                    </div>
                                    <div className="col-12">
                                        <label>{t("Other Instructions")}</label>
                                        <p>{addressData.otherInstructions}</p>
                                    </div>
                                </Row>
                                <div className="mt-3 d-flex justify-content-between">
                                    {!addressData?.is_default && <Button variant="warning" onClick={()=> setDefault(addressData?.id)} type='button'>{t("Set Default")}</Button>}
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        })}
                    </Accordion>

                    <Button variant="primary" onClick={()=> setAddNewAddress(true)} className="mt-5">{t("Add New Address")}</Button>
                </div>}

                {isLogin === 0 && <div className="cont-checkout wow fadeInUp">
                <AvForm
                    className="form-checkout mt-4 form-st guestForm form-horizontal"
                    onValidSubmit={()=>{}}> 
                    <div className="row">
                        <div className="col-6">
                            <AvField
                                label={t("Name")}
                                type='text'
                                placeholder={t("Name")}
                                bsSize="lg"
                                name='name'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: t("This Field is required")
                                    }
                                }}
                                value={formData.guest_name}
                                onChange={(e) => setFormData({...formData, guest_name: e.target.value})}
                            />
                        </div>
                        <div className="col-6">
                            <AvField
                                label={t("Email")}
                                type='email'
                                placeholder={t("Email")}
                                bsSize="lg"
                                name='email'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: t("This Field is required")
                                    }
                                }}
                                value={formData.guest_email}
                                onChange={(e) => setFormData({...formData, guest_email: e.target.value})}
                            />
                        </div>
                        <div className="col-6">
                            <AvField
                                label={t("Phone")}
                                type='number'
                                placeholder={t("Phone")}
                                bsSize="lg"
                                name='phone'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: t("This Field is required")
                                    }
                                }}
                                value={formData.guest_phone}
                                onChange={(e) => setFormData({...formData, guest_phone: e.target.value})}
                            />
                        </div>
                        <div className="col-6">
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
                        </div>
                        <div className="col-6">
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
                        </div>
                        <div className="col-6">
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
                        </div>
                        <div className="col-6">
                            <label className="mb-2">{t("Governorate")}</label>
                            <Select
                                options={governorateOptions}
                                name='governorate'
                                value={formData?.governorate_id}
                                onChange={e=> setFormData({...formData, governorate_id: e})}
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <label className="mb-2">{t("Area")}</label>
                            <Select
                                options={areaOptions}
                                name='area_id'
                                value={formData?.area_id}
                                onChange={e=> {
                                    setFormData({...formData, area_id: e})
                                }}
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <label className="mb-2">{t("Address Type")}</label>
                            <Select
                                options={typesOptions}
                                name='area_id'
                                value={formData?.type}
                                onChange={e=> setFormData({...formData, type: e})}
                            />
                        </div>
                        <div className="col-6">
                            <AvField
                                label={t("Avenue")}
                                type='text'
                                placeholder={t("Avenue")}
                                bsSize="lg"
                                name='avenue'
                                value={formData.avenue}
                                onChange={(e) => setFormData({...formData, avenue: e.target.value})}
                            />
                        </div>
                        <div className="col-6">
                            <AvField
                                label={t("Building Number")}
                                type='text'
                                placeholder={t("Building Number")}
                                bsSize="lg"
                                name='buildingNumber'
                                value={formData.buildingNumber}
                                onChange={(e) => setFormData({...formData, buildingNumber: e.target.value})}
                            />
                        </div>
                        <div className="col-6">
                            <AvField
                                label={t("Floor Number")}
                                type='text'
                                placeholder={t("Floor Number")}
                                bsSize="lg"
                                name='floorNumber'
                                value={formData.floorNumber}
                                onChange={(e) => setFormData({...formData, floorNumber: e.target.value})}
                            />
                        </div>
                        <div className="col-6">
                            <AvField
                                label={t("Office Number")}
                                type='text'
                                placeholder={t("Office Number")}
                                bsSize="lg"
                                name='officeNumber'
                                value={formData.officeNumber}
                                onChange={(e) => setFormData({...formData, officeNumber: e.target.value})}
                            />
                        </div>
                        <div className="col-6">
                            <AvField
                                label={t("House Number")}
                                type='text'
                                placeholder={t("House Number")}
                                bsSize="lg"
                                name='houseNumber'
                                value={formData.houseNumber}
                                onChange={(e) => setFormData({...formData, houseNumber: e.target.value})}
                            />
                        </div>
                        <div className="col-6">
                            <AvField
                                label={t("Apartment Number")}
                                type='text'
                                placeholder={t("Apartment Number")}
                                bsSize="lg"
                                name='aptNumber'
                                value={formData.aptNumber}
                                onChange={(e) => setFormData({...formData, aptNumber: e.target.value})}
                            />
                        </div>
                        <div className="col-12">
                            <AvField
                                label={t("Other Instructions")}
                                type='text'
                                placeholder={t("Other Instructions")}
                                bsSize="lg"
                                name='otherInstructions'
                                value={formData.otherInstructions}
                                onChange={(e) => setFormData({...formData, otherInstructions: e.target.value})}
                            />
                        </div>
                    </div>
                </AvForm>
                </div>}

                {(addNewAddress && isLogin === 1) && <AvForm
                    className="form-checkout mt-4 mb-4 form-st guestForm form-horizontal"
                    onValidSubmit={submit}> 
                    <Row>
                        <div className="col-6">
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
                        </div>
                        <div className="col-6">
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
                        </div>
                        <div className="col-6">
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
                        </div>
                        <div className="col-6">
                            <label className="mb-2">{t("Governorate")}</label>
                            <Select
                                options={governorateOptions}
                                name='governorate'
                                value={formData?.governorate_id}
                                onChange={e=> setFormData({...formData, governorate_id: e})}
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <label className="mb-2">{t("Area")}</label>
                            <Select
                                options={areaOptions}
                                name='area_id'
                                value={formData?.area_id}
                                onChange={e=> setFormData({...formData, area_id: e})}
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <label className="mb-2">{t("Address Type")}</label>
                            <Select
                                options={typesOptions}
                                name='area_id'
                                value={formData?.type}
                                onChange={e=> setFormData({...formData, type: e})}
                            />
                        </div>
                        <div className="col-6">
                            <AvField
                                label={t("Avenue")}
                                type='text'
                                placeholder={t("Avenue")}
                                bsSize="lg"
                                name='avenue'
                                value={formData.avenue}
                                onChange={(e) => setFormData({...formData, avenue: e.target.value})}
                            />
                        </div>
                        <div className="col-6">
                            <AvField
                                label={t("Building Number")}
                                type='text'
                                placeholder={t("Building Number")}
                                bsSize="lg"
                                name='buildingNumber'
                                value={formData.buildingNumber}
                                onChange={(e) => setFormData({...formData, buildingNumber: e.target.value})}
                            />
                        </div>
                        <div className="col-6">
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
                        </div>
                        <div className="col-6">
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
                        </div>
                        <div className="col-6">
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
                        </div>
                        <div className="col-6">
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
                        </div>
                        <div className="col-12">
                            <AvField
                                label={t("Other Instructions")}
                                type='text'
                                placeholder={t("Other Instructions")}
                                bsSize="lg"
                                name='otherInstructions'
                                value={formData.otherInstructions}
                                onChange={(e) => setFormData({...formData, otherInstructions: e.target.value})}
                            />
                        </div>
                    </Row>
                    <div className="mt-3 d-flex justify-content-between">
                        <Button variant="secondary" type="button" onClick={()=> setAddNewAddress(false)}>{t("Cancel")}</Button>
                        <Button variant="primary" disabled={loadingAddress} type='submit'>{t("Submit")}</Button>
                    </div>
                </AvForm>}
            </div>
            

            <div className="col-lg-4">
                <div className="coupon-code mb-4 wow fadeInUp">
                    <h5>{t("Coupon Code")}</h5>
                    <div className="form-coupon">
                        <div className="form-group">
                            <input type="text" 
                                required
                                value={coupon}
                                onChange={e=> setCoupon(e.target.value)}
                                className="form-control" 
                                name="code_name" id="code_name"
                                placeholder={t("Please Enter")} />
                            {!couponDetails?.coupon && <button className="btn-site" onClick={promoCode}><span>{t("Apply")}</span></button>}
                            {!!couponDetails?.coupon && <button className="btn-danger" onClick={removePromoCode}><span>{t("Remove")}</span></button>}
                        </div>
                    </div>
                </div>
                <div className="payment-method wow fadeInUp">
                    <h5>{t("Payment Method")}</h5>
                    <div className="list-pay">
                        <div>
                            <input 
                                className="form-check-input"  
                                type="radio" 
                                name="payment_type" 
                                id="ch-cash"
                                value="cash" 
                                onClick={()=> setPaymentMethod("cash")} 
                                checked={paymentMethod === 'cash'} 
                            />
                            <label className="form-check-label" for="ch-cash">
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="32" fill="currentColor" class="bi bi-cash" viewBox="0 0 16 16">
                                    <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
                                    <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2z"/>
                                </svg>
                                {t("Cash")}                                
                            </label>
                        </div>
                        <div>
                            <input 
                                className="form-check-input" 
                                onClick={()=> setPaymentMethod("visa")} 
                                type="radio" 
                                name="payment_type" 
                                id="ch-visa"
                                value="visa" 
                                checked={paymentMethod === 'visa'} 
                            />
                            <label className="form-check-label" for="ch-visa">
                                <img src={"https://ocs-omniya.com/shopWebsite/images/visa-mstrcard.svg"} alt="visa" />
                                {t("Visa/MasterCard")}                                
                            </label>
                        </div>
                        {paymentMethod === 'visa' && <Row>
                            <div className='col-12 d-block mt-3'>
                                <label>{t("Payment")}</label>
                                <select 
                                    style={{ width: '100%', height: '40px', borderRadius: '8px', padding: '0 10px' }} 
                                    onChange={e=> setPaymentType(e?.target?.value)}
                                >
                                    <option value='knet'>Knet</option>
                                    <option value='cc'>CC</option>
                                    <option value='samsung-pay'>Samsung Pay</option>
                                    <option value='apple-pay'>Apple Pay</option>
                                    <option value='google-pay'>Google Pay</option>
                                </select>
                            </div>
                        </Row>}
                    </div>
                </div>
                <div className="cont-pay-dts wow fadeInUp">
                    <h5>{t("Payment Detail")}</h5>
                    <div className='mb-2'>
                        <p className='m-0'>{t("Sub Total")}</p>
                        <span className="sub_total">{totalPrice.toFixed(3)} {t("KWD")}</span>
                    </div>
                    {!!discountAmount && <div className='mb-2'>
                        <p className='m-0'>{t("Discount")}</p>
                        <span className="discount_amount">{discountAmount.toFixed(3)} {t("KWD")}</span>
                    </div>}
                    
                    {(!discountAmount && !!couponDetails) && <div className='mb-2'>
                        <p className='m-0'>{t("Discount")}</p>
                        <span className="discount_amount">
                            {couponDetails?.coupon_type === "percentage" ? couponDetails?.coupon_value : couponDetails?.coupon_value.toFixed(3)} {couponDetails?.coupon_type === "percentage" ? '%' : t("KWD")}
                        </span>
                    </div>}
                    {paymentMethod === 'cash' && <div className='mb-2'>
                        <p className='m-0'>{t("Cash in Delivery")}</p>
                        <span className="discount_amount">{cashInDelivery > 0 ? cashInDelivery?.toFixed(3) : 0} {t("KWD")}</span>
                    </div>}
                    {paymentMethod === 'visa' && <div className='mb-2'>
                        <p className='m-0'>{t("Delivery Charges")}</p>
                        <span className="delivery_charges">{deliveryChargess ? deliveryChargess.toFixed(3) : 0} {t("KWD")}</span>
                    </div>}
                    <div className='mb-2'>
                        <p className='m-0'>{t("Total")}</p>
                        <span className="total_price">{totalPriceAfterDis.toFixed(3)} {t("KWD")}</span>
                    </div>
                    <Button className='submit-order' variant='primary' onClick={()=> submitOrder()}>
                        <span>{t("Submit Order")}</span>
                    </Button>
                </div>
            </div>
        </div>
    </div>
</section>
}
export default Checkout;