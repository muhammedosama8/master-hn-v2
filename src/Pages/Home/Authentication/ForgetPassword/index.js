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
        className='form-horizontal login-form'
        style={{direction: lang === 'ar' ? 'rtl' : 'ltr'}}
        onValidSubmit={submitPassword}>
            <Row>
                <Col md={12}>
                    <h4 className="title">{t("Forget Password")}</h4>
                </Col>
                <Col md={12}>
                    <AvField
                        label={t("New Password")}
                        type='text'
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