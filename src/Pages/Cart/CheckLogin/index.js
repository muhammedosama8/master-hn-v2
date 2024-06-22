import { Button, Modal } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import { ShowLogin } from "../../../store/actions/AuthActions"

const CheckLogin = ({modal, setModal}) => {
    const {t} = useTranslation()
    const dispatch = useDispatch()


    return <Modal className="fade " show={modal} onHide={setModal}>
        <Modal.Body>
            <p className="mb-5">{t("Proceed")}</p>
            <Button 
                onClick={()=>{
                    dispatch(ShowLogin(true))
                    setModal()
                }}
                variant="primary" 
                className="login-btn" 
                type='button'>
                {t("Login")}
            </Button>
            <Button 
                onClick={()=>{
                }}
                className="mx-3"
                variant="primary" 
                type='button'>
                {t("Continue as a Guest")}
            </Button>
        </Modal.Body>
    </Modal>
}
export default CheckLogin