import img from '../../../assets/logo1.png'
import './style.css'

const Quality = () => {
    return <div className='quality'>
        <div className='custom-div'>
            <div className='row' style={{alignItems: 'center'}}>
                <div className='col-md-6'>
                    <h1>QUALITY BROUGHT TO YOU BY MASTER HN</h1>
                </div>
                <div className='col-md-6' style={{textAlign: "end"}}>
                    <img src={img} alt='logo' />
                </div>
            </div>
        </div>
    </div>
}
export default Quality;