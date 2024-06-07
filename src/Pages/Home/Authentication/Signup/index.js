
import { AvField, AvForm } from "availity-reactstrap-validation"
import { useState } from "react"
import { Button, Col, Row } from "react-bootstrap"

const Signup = ({setType}) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
        phone: ""
    })
    const [loading, setLoading] = useState(false)

    const submit = () => {}

    return <AvForm
    className='form-horizontal signup-form'
    onValidSubmit={submit}>
        <Row>
            <Col md={12}>
                <AvField
                    label="Name"
                    type='text'
                    placeholder="Name"
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
                    label="Phone"
                    type='number'
                    placeholder="Phone"
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
            Sign Up
        </Button>
        <Button variant="secondary" className="login" type='button' onClick={() => setType("login")}>
            Have Account? <span style={{color: 'var(--primary-color)', textDecoration: 'underline'}}>Login</span>
        </Button>
    </AvForm>
}
export default Signup;