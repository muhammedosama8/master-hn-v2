import React ,{useState} from 'react'
import { Modal } from "react-bootstrap"
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";

function CancelModal({modal, setModal, orderService, setShouldUpdate, item}) {
    const [loading, setLoading] = useState(false)
    const {t} = useTranslation()
    const lang = useSelector(state => state?.lang.lang)

    const handleCancelItem = async () => {
        setLoading(true)
        const { data: response } = await orderService.cancelOrderEndpoint(item.id);
        toast.success(response.success)
        setShouldUpdate(prev => !prev)
        return setModal(false)
    }
    return (
        <Modal show={modal} onHide={setModal} className={lang === 'en' ? 'ltr en' : 'rtl ar'} >
            <div className="modal-header d-block border-1">
                <h5 className="modal-title mt-0" id="myModalLabel">
                {t("Cancel Order")}
                </h5>
            </div>
            <div className="modal-body border-0">
                <p>
                    {t(`Cancel Message`)}
                </p>
            </div>
            <div className="modal-footer border-0">
                <button
                    type="button"
                    onClick={() => setModal(false)}
                    className="btn me-auto btn-secondary"
                    data-dismiss="modal"
                >
                    {t('Close')}
            </button>
                <button
                    onClick={handleCancelItem}
                    type="button"
                    className="btn btn-primary "
                    disabled={loading ? true : false}

                >
                    {t('Done')}
            </button>
            </div>
        </Modal>
    )
}

export default CancelModal
