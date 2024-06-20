import { AvField, AvForm } from "availity-reactstrap-validation"
import { useState } from "react"
import { Button, Col, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { loadingToggleAction, loginAction } from "../../../../store/actions/AuthActions"
import { useDispatch } from "react-redux"

const Login = ({setType, path, setModal}) => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const submit = () =>{
        dispatch(loadingToggleAction(true));
        dispatch(loginAction(formData.email, formData.password, navigate, path));
        setModal()
    }

    return <AvForm
    className='form-horizontal login-form'
    onValidSubmit={submit}>
        <Row>
            <Col md={12}>
                <AvField
                    label="Email"
                    type='email'
                    placeholder="Email"
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
                    label="Password"
                    type='password'
                    placeholder="Password"
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
            Login
        </Button>
        <Button variant="secondary" className="signup" type='button' onClick={()=>setType("Sign Up")}>
            Don't Have Account? <span style={{color: 'var(--primary-color)', textDecoration: 'underline'}}>Sign Up</span>
        </Button>
           
    </AvForm>
}
export default Login