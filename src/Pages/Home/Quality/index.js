import { useTranslation } from 'react-i18next'
import img from '../../../assets/MasterHN-white.svg'
import './style.css'

const Quality = () => {
    const {t} = useTranslation()

    return <div className='quality'>
        <div className='custom-div'>
            <div className='row' style={{alignItems: 'center'}}>
                <div className='col-md-6'>
                    <img src={img} alt='logo' />
                </div>
                <div className='col-md-6' style={{textAlign: "end"}}>
                    <h1>{t("QUALITY")}</h1>
                </div>
            </div>
        </div>
    </div>
}
export default Quality;