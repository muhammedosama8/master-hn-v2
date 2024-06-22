import { AvField, AvForm } from "availity-reactstrap-validation"
import { useState } from "react"
import { Button, Col, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { loadingToggleAction, loginAction } from "../../../../store/actions/AuthActions"
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from "react-i18next"

const Login = ({setType, path, setModal}) => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const lang = useSelector(state=> state?.lang?.lang)
    const {t} = useTranslation()

    const submit = () =>{
        dispatch(loadingToggleAction(true));
        dispatch(loginAction(formData.email, formData.password, navigate, path));
        setModal()
    }

    return <AvForm
    className='form-horizontal login-form'
    style={{direction: lang === 'ar' ? 'rtl' : 'ltr'}}
    onValidSubmit={submit}>
        <Row>
            <Col md={12}>
                <h4>{t("Login Into Your Account")}</h4>
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
                            errorMessage: "This Field is required"
                        }
                    }}
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
            </Col>
            <Col md={12}>
                <AvField
                    label={t("Password")}
                    type='password'
                    placeholder={t("Password")}
                    bsSize="lg"
                    name='departure_day'
                    validate={{
                        required: {
                            value: true,
                            errorMessage: "This Field is required"
                        }
                    }}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
            </Col>
        </Row>
        <Button variant="primary" className="login-btn" type='submit' disabled={loading}>
            {t("Login")}
        </Button>
        <Button variant="secondary" className="signup" type='button' onClick={()=>setType("Sign Up")}>
            {t("Don't Have Account")} ? <span style={{color: 'var(--primary-color)', textDecoration: 'underline'}}>{t("Sign Up")}</span>
        </Button>
           
    </AvForm>
}
export default Login