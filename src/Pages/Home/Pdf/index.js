import pdfImg from '../../../assets/pdf.png'
import './style.css'

const Pdf = () => {
    return <div className='pdf'>
            <div className='custom-div'>
                <div className='row' style={{alignItems: 'center'}}>
                    <div className='col-md-6' >
                        <h1>DOWNLOAD MASTER HN</h1>
                    </div>
                    <div className='col-md-6' style={{textAlign: "end"}}>
                        <img src={pdfImg} alt='pdf' />
                    </div>
                    
                </div>
        </div>
    </div>
}
export default Pdf;