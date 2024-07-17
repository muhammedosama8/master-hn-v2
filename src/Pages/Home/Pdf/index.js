import { useTranslation } from 'react-i18next'
import pdfImg from '../../../assets/pdf.png'
import './style.css'
import { useEffect, useState } from 'react'
import BannerService from '../../../services/BannerService'

const Pdf = () => {
    const [pdf, setPdf] = useState('')
    const {t} = useTranslation()

    useEffect(()=>{
        new BannerService()?.getList().then(res=>{
          if(res?.status === 200 && res?.data?.data?.length > 0){
            let info = res?.data?.data[0]?.catalog
            setPdf(info)
          }
        })
      },[])

    return <div className='pdf'>
            <div className='custom-div pt-5 pb-5'>
                <div className='row' style={{alignItems: 'center'}}>
                    <div className='col-8' >
                        <h1>{t("DOWNLOAD MASTER HN")}</h1>
                    </div>
                    <div className='col-4 pdf-img'>
                        <img src={pdfImg} alt='pdf' />
                        <a href={pdf} target='_blank' download className='mt-3' rel="noreferrer">{t("Download Pdf")}</a>
                    </div>
                </div>
        </div>
    </div>
}
export default Pdf;