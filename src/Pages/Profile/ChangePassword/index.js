import { AvField, AvForm } from "availity-reactstrap-validation";
import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import UserService from "../../../services/UserService";
import { toast } from "react-toastify";

const ChangePassword = () => {
    const {t} = useTranslation()
    const [formData, setFormData] = useState({
        old_password: '',
        new_password: '',
    })
    const [loading, setLoading] = useState(false)
    const userService = new UserService()
    const submit = () => {
        setLoading(true)
        userService?.updatePassword(formData).then(res=>{
            if(res?.status === 200){
                toast.success("Password Updated Successfully.")
            }
            setLoading(false)
        }).catch(()=> setLoading(false))
    }

    return <AvForm
    className='form-horizontal'
    onValidSubmit={submit}>
        <Row>
            <Col md={6}>
                <AvField
                    label={t("Old Password")}
                    type='text'
                    placeholder={t("Old Password")}
                    bsSize="lg"
                    name='old_password'
                    validate={{
                        required: {
                            value: true,
                            errorMessage: `${t("This Field is required")}`
                        }
                    }}
                    value={formData.old_password}
                    onChange={(e) => setFormData({...formData, old_password: e.target.value})}
                />
            </Col>
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
        </Row>
        <Button variant="primary" className="mt-3" type='submit' disabled={loading}>
            {t("Update")}
        </Button>
           
    </AvForm>
}
export default ChangePassword;