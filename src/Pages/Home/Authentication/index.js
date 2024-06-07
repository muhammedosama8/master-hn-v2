import { useState } from "react"
import { Modal } from "react-bootstrap"
import Login from "./Login";
import './style.css'
import Signup from "./Signup";

const Authentication = ({modal, setModal, path}) => {
    const [type, setType] = useState("login")

    return <Modal className="fade " show={modal} onHide={()=> setModal(false)}>
            <Modal.Body>
                {type === 'login' ? <Login setType={setType} path={path} setModal={setModal} /> : <Signup setType={setType} path={path} />}
            </Modal.Body>
    </Modal>
}
export default Authentication