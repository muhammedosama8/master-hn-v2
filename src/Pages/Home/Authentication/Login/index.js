import { AvField, AvForm } from "availity-reactstrap-validation"
import { useState } from "react"
import { Button, Col, Row } from "react-bootstrap"
import { useLocation, useNavigate } from "react-router-dom"
import { loadingToggleAction, loginAction } from "../../../../store/actions/AuthActions"
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import ForgetPassword from "../ForgetPassword"
import CartService from "../../../../services/CartService"

const Login = ({setType, setModal}) => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [showPassword, setShowPassword] = useState(false)
    const [forgetPassword, setForgetPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const lang = useSelector(state=> state?.lang?.lang)
    const {t} = useTranslation()
    const cartService = new CartService()
    const user = useSelector(state => state?.user)

    const submit = () =>{
        let cartProducts = {
            products: user?.cart?.map(product => {
                return {
                    dynamic_variant: product?.dynamicVariants?.filter(res=> res?.amount > 0)?.map(res=>{
                        return {
                            dynamic_variant_id: res?.id,
                            amount: res?.amount
                        }
                    }),
                    amount: product?.amount,
                    product_id: product?.id
                }
            })
        }
        if(user?.promoCode) cartProducts['promoCode'] = user?.promoCode?.coupon
        dispatch(loadingToggleAction(true));
        dispatch(loginAction(formData, navigate, location?.pathname, setModal, setLoading, cartService, cartProducts));
    }

    if(!forgetPassword){
    return <AvForm
    className={`form-horizontal login-form ${lang}`}
    style={{direction: lang === 'ar' ? 'rtl' : 'ltr'}}
    onValidSubmit={submit}>
        <Row>
            <Col md={12}>
                <h4 className="title">{t("Login Into Your Account")}</h4>
            </Col>
            <Col md={12}>
                <AvField
                    label={t("Email")}
                    type='email'
                    placeholder={t("Email")}
                    bsSize="lg"
                    name='email'
                    validate={{
                        required: {
                            value: true,
                            errorMessage: `${t("This Field is required")}`
                        }
                    }}
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
            </Col>
            <Col md={12} className="position-relative">
                <AvField
                    label={t("Password")}
                    type={showPassword ? 'text' :'password'}
                    placeholder={t("Password")}
                    bsSize="lg"
                    name='password'
                    validate={{
                        required: {
                            value: true,
                            errorMessage: `${t("This Field is required")}`
                        }
                    }}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                {!showPassword ? <span className="showPassword" onClick={()=> setShowPassword(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                    </svg>
                </span> : <span className="showPassword" onClick={()=> setShowPassword(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                        <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/>
                        <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>
                    </svg>
                </span>}
            </Col>
            <Col md={12}>
                <button className="forget" type='button' onClick={()=> setForgetPassword(true)}>{t("Forget Password?")}</button>
            </Col>
        </Row>
        <Button variant="primary" className="login-btn" type='submit' disabled={loading}>
            {t("Login")}
        </Button>
        <Button variant="secondary" className="signup" type='button' onClick={()=>setType("Sign Up")}>
            {t("Don't Have Account")} ? <span style={{color: 'var(--primary-color)', textDecoration: 'underline'}}>{t("Sign Up")}</span>
        </Button>
           
    </AvForm>
    } else {
        return <ForgetPassword setForgetPassword={setForgetPassword} />
    }
}
export default Login