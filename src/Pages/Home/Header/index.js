import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import MHBannerService from '../../../services/MHBannerService';
import Loader from '../../../common/Loader';
import './style.css'

function Header() {
    const [data, setData] = useState([])
    const [loader, setLoader] = useState(false)
    const bannerService = new MHBannerService()

    useEffect(()=>{
      setLoader(true)
      bannerService?.getList().then(res=>{
        if(res?.status === 200){
          let data = res?.data?.data?.map(img=> {
            return {
              image: img?.image
            }
          })
          setData(data)
        }
        setLoader(false)
      }).catch(()=> setLoader(false))
    },[])

  return (
    <div className='header-home' style={{marginTop: '6.3rem'}}>
      {loader ? <></>: <Carousel data-bs-theme="dark" controls='false' touch={'true'}>
          {data?.map((item, index)=>{
              return <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={item?.image}
                alt="slide"
              />
            </Carousel.Item>
          })}
      </Carousel>}
    </div>
  );
}

export default Header;