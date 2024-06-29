
import { AvField, AvForm } from "availity-reactstrap-validation"
import { useState } from "react"
import { Button, Col, Row } from "react-bootstrap"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"

const Signup = ({setType}) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
        phone: ""
    })
    const [loading, setLoading] = useState(false)
    const lang = useSelector(state=> state?.lang?.lang)
    const {t} = useTranslation()

    const submit = () => {}

    return <AvForm
    className='form-horizontal signup-form'
    style={{direction: lang === 'ar' ? 'rtl' : 'ltr'}}
    onValidSubmit={submit}>
        <Row>
            <Col md={12}>
                <h4 className="title">{t("Create New Account")}</h4>
            </Col>
            <Col md={12}>
                <AvField
                    label={t("Name")}
                    type='text'
                    placeholder={t("Name")}
                    bsSize="lg"
                    name='name'
                    validate={{
                        required: {
                            value: true,
                            errorMessage: "This Field is required"
                        }
                    }}
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
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
                    name='password'
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
            <Col md={12}>
                <AvField
                    label={t("Phone")}
                    type='number'
                    placeholder={t("Phone")}
                    bsSize="lg"
                    name='phone'
                    validate={{
                        required: {
                            value: true,
                            errorMessage: "This Field is required"
                        }
                    }}
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
            </Col>
        </Row>

        <Button variant="primary" className="signup-btn" type='submit' disabled={loading}>
            {t("Sign Up")}
        </Button>
        <Button variant="secondary" className="login" type='button' onClick={() => setType("login")}>
            {t("Have Account")} ? <span style={{color: 'var(--primary-color)', textDecoration: 'underline'}}>{t("Login")}</span>
        </Button>
    </AvForm>
}
export default Signup;