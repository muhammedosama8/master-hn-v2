import { AvField, AvForm } from "availity-reactstrap-validation";
import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const ChangePassword = () => {
    const {t} = useTranslation()
    const [formData, setFormData] = useState({
        new_password: '',
        confirm_new_password: ''
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
            <Col md={6}>
                <AvField
                    label={t("Confirm New Password")}
                    type='text'
                    placeholder={t("Confirm New Password")}
                    bsSize="lg"
                    name='confirm_new_password'
                    validate={{
                        required: {
                            value: true,
                            errorMessage: `${t("This Field is required")}`
                        }
                    }}
                    value={formData.confirm_new_password}
                    onChange={(e) => setFormData({...formData, confirm_new_password: e.target.value})}
                />
            </Col>
        </Row>
        <Button variant="primary" className="mt-3" type='submit' disabled={loading}>
            {t("Update")}
        </Button>
           
    </AvForm>
}
export default ChangePassword;