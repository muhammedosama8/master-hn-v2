import { AvField, AvForm } from "availity-reactstrap-validation";
import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const UpdateAccount = () => {
    const {t} = useTranslation()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    })
    const [loading, setLoading] = useState(false)
    const submit = () => {

    }

    return <AvForm
    className='form-horizontal'
    onValidSubmit={submit}>
        <Row>
            <Col md={6}>
                <AvField
                    label={t("Name")}
                    type='text'
                    placeholder={t("Name")}
                    bsSize="lg"
                    name='name'
                    validate={{
                        required: {
                            value: true,
                            errorMessage: `${t("This Field is required")}`
                        }
                    }}
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
            </Col>
            <Col md={6}>
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
            <Col md={6}>
                <AvField
                    label={t("Phone")}
                    type='number'
                    placeholder={t("Phone")}
                    bsSize="lg"
                    name='phone'
                    validate={{
                        required: {
                            value: true,
                            errorMessage: `${t("This Field is required")}`
                        }
                    }}
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
            </Col>
        </Row>
        <Button variant="primary" className="mt-3" type='submit' disabled={loading}>
            {t("Update")}
        </Button>
           
    </AvForm>
}
export default UpdateAccount;