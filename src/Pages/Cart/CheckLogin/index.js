import { Button, Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { ShowLogin } from "../../../store/actions/AuthActions"
import { useNavigate } from "react-router-dom"

const CheckLogin = ({modal, setModal}) => {
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const lang = useSelector(state=> state?.lang?.lang)

    return <Modal 
        className="fade " 
        style={{direction: lang === 'ar' ? 'rtl' : 'ltr'}}
        show={modal} onHide={setModal}>
        <Modal.Body>
            <p className="mb-5">{t("Proceed")} ?</p>
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
                    navigate('/checkout')
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