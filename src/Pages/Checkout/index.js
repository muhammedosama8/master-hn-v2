import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Area from '../../Enums/Area';
import knet from '../../assets/knet.svg'
import visa from '../../assets/visa.svg'
import Select from "react-select"
import { useDispatch, useSelector } from 'react-redux';
import UserAddressService from '../../services/UserAddressService';
import { useNavigate } from 'react-router-dom';
import { Accordion, Badge, Button, Card, CardBody, Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import CartService from '../../services/CartService';
import './style.css'
import OrderService from '../../services/OrderService';
import { setPromoCode } from '../../store/actions/AuthActions';
import { AvField, AvForm } from 'availity-reactstrap-validation';
import CountryService from '../../services/CountryService';

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
        latitude: 0
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
    const [paymentMethod, setPaymentMethod] = useState('visa')
    const [addNewAddress, setAddNewAddress] = useState(false)
    const [loadingAddress, setLoadingAddress] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const promocodeText = useSelector(state => state?.user?.promoCode)
    const lang = useSelector(state => state?.lang?.lang)
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalPriceAfterDis, setTotalPriceAfterDis] = useState(0)
    const [deliveryChargess, setDeliveryChargess] = useState(0)
    const [discountAmount, setDiscountAmount] = useState(0)
    const [coupon, setCoupon] = useState("")
    const [couponDetails, setCouponDetails] = useState("")
    const [shouldUpdate, setShouldUpdate] = useState(false)
    const [shouldUpdateAddress, setShouldUpdateAddress] = useState(false)
    const [loadin, setLoading] = useState(false)
    const [cartId, setCartId] = useState('')
    const [cartProducts, setCartProducts] = useState([])
    const cart = useSelector(state=> state?.user) || []
    const user = useSelector(state=> state?.user?.user)
    const userAddressService = new UserAddressService()
    const cartService = new CartService()
    const orderService = new OrderService()

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
            }).catch(() => setLoading(false))
        } else {
            // let data = cart?.map(item=> {
            //     return {
            //         amount: item?.amount,
            //         dynamicVariants: item?.dynamicVariants?.filter(res=> res?.amount > 0),
            //         product: item
            //     }
            // })
            // setLoading(false)
            // let totalP = data?.map(res=> {
            //     let tot = (res?.product?.amount*res?.product?.price) + res?.dynamicVariants?.map(dy=> dy?.amount*dy?.price).reduce((accumulator, currentValue) => {
            //         return accumulator + currentValue;
            //     }, 0)
            //     return tot
            // }).reduce((accumulator, currentValue) => {
            //     return accumulator + currentValue;
            // }, 0)
            // setTotalPrice(totalP.toFixed(3))
            // setCartProducts(data)
            // setCoupon(promocodeText.coupon)
            // setCouponDetails(promocodeText)
            // let dis
            // if(promocodeText?.coupon_type === "percentage"){
            //     dis = Number(totalP) - ((Number(totalP)* (Number(promocodeText?.coupon_value)/100)))
            // }
            // if(promocodeText?.coupon_type === "fixed"){
            //     dis = Number(totalP) - Number(promocodeText?.coupon_value)
            // }
            // setTotalPriceAfterDis(dis)
        }
    },[user, shouldUpdate])

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
        if(!!address?.length){
            toast.error(t("Add Address First"))
            return
        }
        let data = {
            payment_method: paymentMethod,
            user_address_id: address.find(res=> res.is_default)?.id,
            cart_id: cartId,
            paymentType: "knet"
        }
        orderService.create(data).then(res=>{
            if(res?.status){
            }
        })
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
            promoCode: coupon,
            cart_id: cartId
        }
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
                                        <div className='col-md-3 col-9'>
                                            <div className='text-center'>
                                               {product?.dynamicVariants?.length ? <h4 className='text-primary'>{((Number(product?.amount)*Number(product?.product?.price)) + product?.dynamicVariants?.map(res=> res?.amount*res?.price).reduce((accumulator, currentValue) => {
                                                    return accumulator + currentValue;
                                                }, 0)).toFixed(3)} {t("KWD")}</h4> :
                                                <h4 className='text-primary'>{(Number(product?.amount)*Number(product?.product?.price)).toFixed(3)} {t("KWD")}</h4>}
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            })}
                        </CardBody>
                </Card>
                <div className='mt-4 address'>
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
                                    {!addressData?.is_default && <Button variant="warning" onClick={()=> setDefault(addressData?.id)} type='button'>{t("Set Default")}</Button>}
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        })}
                    </Accordion>

                    <Button variant="primary" onClick={()=> setAddNewAddress(true)} className="mt-5">{t("Add New Address")}</Button>
                </div>
                {(addNewAddress && isLogin === 0) && <div className="cont-checkout wow fadeInUp">
                    <form className="form-checkout form-st guestForm">                               
                        <div className="cont-user wow fadeInUp">
                            <h5 className='text-primary mt-5 mb-2'>{t("User Details")}</h5>

                            <div className="row">
                                <div className="col-md-4 form-group">
                                    <label>{t("Full Name")}*</label>
                                    <input type="text" className="form-control" name="name" placeholder={t("Please Enter")} required />
                                </div>
                                <div className="col-md-4 form-group">
                                    <label>{t("Email")}*</label>
                                    <input type="email" className="form-control" name="email" placeholder={t("Please Enter")} required />
                                </div>
                                <div className="col-md-4 form-group">
                                    <label>{t("Phone")}*</label>
                                    <input type="number" className="form-control" id="mobile" name="mobile" placeholder={t("Please Enter")} required />
                                </div>
                            </div>
                        </div>
                        <div className="cont-address wow fadeInUp mt-4">
                                <h5 className='text-primary mb-2'>{t("Address Details")}</h5>
                                <div className="row">
                                    <div className="col-md-4 mb-3 form-group selectBt">
                                        <label>{t("Area")}*</label>
                                        <Area />
                                    </div>
                                    <div className="col-md-4 mb-3 form-group selectBt">
                                        <label>{t("Block")}*</label>
                                        <input type="text" className="form-control" name="block" placeholder={t("Please Enter")} required />
                                    </div>
                                    <div className="col-md-4 mb-3 form-group">
                                        <label>{t("Street")}*</label>
                                        <input type="text" className="form-control" name="street" placeholder={t("Please Enter")} required />
                                    </div>
                                    <div className="col-md-4 mb-3 form-group">
                                        <label>{t("Avenue")} ({t("Optional")})</label>
                                        <input type="text" className="form-control" name="avenue" placeholder={t("Please Enter")} />
                                    </div>
                                    <div className="col-md-4 mb-3 form-group">
                                        <label>{t("Address Type")}*</label>
                                        <select 
                                            className="form-control form-select address_type" 
                                            name="type"
                                        >
                                            <option value="">{t("Please Select")}</option>
                                            <option value="1">{t("Flat")}</option>
                                            <option value="2">{t("House")}</option>
                                            <option value="3">{t("Office")}</option>
                                        </select>
                                    </div>
                                    <div className="col-md-4 mb-3  form-group apartment_office_type">
                                        <label>{t("Building Number")}*</label>
                                        <input type="text" className="form-control" name="building_number"
                                            placeholder={t("Please Enter")} required />
                                    </div>
                                    <div className="col-md-4 mb-3 form-group apartment_office_type">
                                        <label>{t("Floor")}*</label>
                                        <input type="text" className="form-control" name="floor_number"
                                            placeholder={t("Please Enter")} required />
                                    </div>
                                    <div className="col-md-4 mb-3 form-group apartment_type">
                                        <label>{t("Apartment Number")} ({t("Optional")})</label>
                                        <input type="text" className="form-control" name="apartment_number" placeholder={t("Please Enter")} required />
                                    </div>
                                    <div className="col-md-4 mb-3 form-group house_type">
                                        <label>{t("House Number")}*</label>
                                        <input type="text" className="form-control" name="house_number"
                                            placeholder={t("Please Enter")} required />
                                    </div>

                                    <div className="col-md-4 mb-3 form-group office_type">
                                        <label>{t("Office Number")}*</label>
                                        <input type="text" className="form-control" name="office_number"
                                            placeholder={t("Please Enter")} required />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4 form-group">
                                        <label>{t("Extra Directions")}</label>
                                        <textarea 
                                            className="form-control" 
                                            rows={3}
                                            name="notes" 
                                            placeholder={t("Please Enter")} 
                                        ></textarea>
                                    </div>
                                </div>
                                <div>
                                    <Button variant='secondary' onClick={()=> setAddNewAddress(false)}>
                                        {t("Cancel")}
                                    </Button>
                                    <Button variant='primary' onClick={()=> setAddNewAddress(false)}>
                                        {t("Add")}
                                    </Button>
                                </div>
                            </div>
                        </form>
                </div>}
                {(addNewAddress && isLogin === 1) && <AvForm
                    className="form-checkout mt-4 form-st guestForm form-horizontal"
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
                        <Button variant="secondary" type="button" onClick={()=> setAddNewAddress(false)}>{t("Cancel")}</Button>
                        <Button variant="primary" disabled={loadingAddress} type='submit'>{t("Submit")}</Button>
                    </div>
                </AvForm>}
            </div>
            

            <div className="col-lg-4">
                <div className="coupon-code mb-4 wow fadeInUp">
                    <h5>{t("Coupon Code")}</h5>
                    {/* <form className="form-coupon" id="checkoutForm" method="POST">
                        <div className="form-group">
                            <input type="text" className="form-control" name="code_name" id="code_name"
                                placeholder={t("Please Enter")} />
                            <button className="btn-site" id="check_code"><span>{t("Apply")}</span></button>
                        </div>
                        <span className="success-promo validCode" style={{display: "none"}}>تم التطبيق بنجاح!</span>
                        <span className="wrong-promo invalidCode" style={{display: "none"}}>رمز الخصم غير صالح!</span>
                    </form> */}
                    <div className="form-coupon">
                        <div className="form-group">
                            <input type="text" 
                                required
                                value={coupon}
                                onChange={e=> setCoupon(e.target.value)}
                                // disabled={!!couponDetails?.coupon}
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
                    </div>
                </div>
                <div className="cont-pay-dts wow fadeInUp">
                    <h5>{t("Payment Detail")}</h5>
                    <div>
                        <p>{t("Sub Total")}</p>
                        <span className="sub_total">{totalPrice.toFixed(3)} {t("KWD")}</span>
                    </div>
                    {!!discountAmount && <div>
                        <p>{t("Discount")}</p>
                        <span className="discount_amount">{discountAmount.toFixed(3)} {t("KWD")}</span>
                    </div>}
                    <div>
                        <p>{t("Delivery Charges")}</p>
                        <span className="delivery_charges">{deliveryChargess ? deliveryChargess.toFixed(3) : 0} {t("KWD")}</span>
                    </div>
                    <div>
                        <p>{t("Total")}</p>
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