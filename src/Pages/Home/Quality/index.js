import img from '../../../assets/MasterHN-white.svg'
import './style.css'

const Quality = () => {
    return <div className='quality'>
        <div className='custom-div'>
            <div className='row' style={{alignItems: 'center'}}>
                <div className='col-md-6'>
                    <img src={img} alt='logo' />
                </div>
                <div className='col-md-6' style={{textAlign: "end"}}>
                    <h1>QUALITY BROUGHT TO YOU BY MASTER HN</h1>
                </div>
            </div>
        </div>
    </div>
}
export default Quality;