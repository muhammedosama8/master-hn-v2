import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import banner1 from '../../../assets/banner1.jpeg';
import banner2 from '../../../assets/banner2.jpeg';
// import BannerService from '../../services/BannerService';

function Header() {
    const [data, setData] = useState([
        {image: banner1},
        {image: banner2},
    ])
    // const bannerService = new BannerService()

    // useEffect(()=>{
    //   bannerService?.getList().then(res=>{
    //     if(res?.status === 200){
    //       setData(res?.data?.data)
    //     }
    //   })
    // },[])

  return (
    <div className='header-home' style={{marginTop: '6.3rem'}}>
      <Carousel data-bs-theme="dark" controls='false' touch={'true'}>
          {data?.map((item, index)=>{
              return <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={item?.image}
                alt="First slide"
              />
            </Carousel.Item>
          })}
      </Carousel>
    </div>
  );
}

export default Header;