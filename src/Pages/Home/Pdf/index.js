import { useTranslation } from 'react-i18next'
import pdfImg from '../../../assets/pdf.png'
import './style.css'

const Pdf = () => {
    const {t} = useTranslation()
    return <div className='pdf'>
            <div className='custom-div pt-5 pb-5'>
                <div className='row' style={{alignItems: 'center'}}>
                    <div className='col-md-8' >
                        <h1>{t("DOWNLOAD MASTER HN")}</h1>
                    </div>
                    <div className='col-md-4 pdf-img'>
                        <img src={pdfImg} alt='pdf' />
                        <button className='mt-3'>{t("Download Pdf")}</button>
                    </div>
                </div>
        </div>
    </div>
}
export default Pdf;