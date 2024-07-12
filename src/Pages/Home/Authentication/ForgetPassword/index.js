import { AvField, AvForm } from "availity-reactstrap-validation";
import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import UserService from "../../../../services/UserService";
import { toast } from "react-toastify";

const ForgetPassword = ({setForgetPassword}) => {
    const [type, setType] = useState('email')
    const [formData, setFormData] = useState({
        email: '',
        code: '',
        new_password: ""
    })
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const lang = useSelector(state=> state?.lang?.lang)
    const {t} = useTranslation()
    const userService = new UserService()

    const submitEmail = () => {
        let data = {
            email: formData.email
        }
        setLoading(true)
        userService.forgetPassword(data).then(res=>{
            if(res?.status === 200){
                setType('code')
            }
            setLoading(false)
        }).catch(e => {
            setLoading(false)
            toast.error(e?.response?.data?.message)
        })
    }

    const submitCode = () => {
        let data = {
            email: formData.email,
            code: formData.code
        }
        setLoading(true)
        userService.verifiedForgetPasswordCode(data).then(res=>{
            if(res?.status === 200){
                setType('password')
            }
        }).catch(e => {
            setLoading(false)
            toast.error(e?.response?.data?.message)
        })
    }

    const submitPassword = () => {
        let data = {
            new_password: formData.new_password
        }
        setLoading(true)
        userService.changePasswordForForgetPassword(data).then(res=>{
            if(res?.status === 200){
                toast.success('Password Updated Successfully.')
                setForgetPassword(false)
            }
        }).catch(e => {
            setLoading(false)
            toast.error(e?.response?.data?.message)
        })
    }

    if(type === 'email'){
        return <AvForm
        className='form-horizontal login-form'
        style={{direction: lang === 'ar' ? 'rtl' : 'ltr'}}
        onValidSubmit={submitEmail}>
            <Row>
                <Col md={12}>
                    <h4 className="title">{t("Forget Password")}</h4>
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
            </Row>
            <div className="d-flex justify-content-between mt-3">
            <Button variant="secondary" type='button' onClick={()=>setForgetPassword(false)}>
                {t("Back")}
            </Button>
            <Button variant="primary" type='submit' disabled={loading}>
                {t("Continue")}
            </Button>
            </div>
            
        </AvForm>
    } else if(type === 'code') {
        return <AvForm
        className='form-horizontal login-form'
        style={{direction: lang === 'ar' ? 'rtl' : 'ltr'}}
        onValidSubmit={submitCode}>
            <Row>
                <Col md={12}>
                    <h4 className="title">{t("Forget Password")}</h4>
                </Col>
                <Col md={12}>
                    <AvField
                        label={t("Code")}
                        type='text'
                        placeholder={t("Code")}
                        bsSize="lg"
                        name='code'
                        validate={{
                            required: {
                                value: true,
                                errorMessage: `${t("This Field is required")}`
                            }
                        }}
                        value={formData.code}
                        onChange={(e) => setFormData({...formData, code: e.target.value})}
                    />
                </Col>
            </Row>
            <div className="d-flex justify-content-between mt-3">
            <Button variant="secondary" type='button' onClick={()=> setType('email')}>
                {t("Back")}
            </Button>
            <Button variant="primary" type='submit' disabled={loading}>
                {t("Continue")}
            </Button>
            </div>
            
        </AvForm>
    } else {
        return <AvForm
        className={`form-horizontal login-form ${lang}`}
        style={{direction: lang === 'ar' ? 'rtl' : 'ltr'}}
        onValidSubmit={submitPassword}>
            <Row>
                <Col md={12}>
                    <h4 className="title">{t("Forget Password")}</h4>
                </Col>
                <Col md={12} className="position-relative">
                    <AvField
                        label={t("New Password")}
                        type={showPassword ? 'text' :'password'}
                        placeholder={t("New Password")}
                        bsSize="lg"
                        name='new_password'
                        validate={{
                            required: {
                                value: true,
                                errorMessage: `${t("This Field is required")}`
                            }
                        }}
                        value={formData.new_password}
                        onChange={(e) => setFormData({...formData, new_password: e.target.value})}
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
            </Row>
            <div className="d-flex justify-content-between mt-3">
            <Button variant="secondary" type='button' onClick={()=> setType('code')}>
                {t("Back")}
            </Button>
            <Button variant="primary" type='submit' disabled={loading}>
                {t("Continue")}
            </Button>
            </div>
            
        </AvForm>
    }
}
export default ForgetPassword;