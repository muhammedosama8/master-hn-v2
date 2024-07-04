import React, { useEffect, useState } from 'react';
import './style.css'
import { useTranslation } from 'react-i18next';
import Path from '../../common/Path';
import AboutService from '../../services/AboutService';
import { useSelector } from 'react-redux';

const AboutUs = () => {
  const {t} = useTranslation()
  const [about, setAbout] = useState([])
  const lang = useSelector(state => state?.lang?.lang)
  const aboutService = new AboutService()

  useEffect(()=>{
    aboutService?.getList({type: 'about'}).then(res=>{
      if(res?.status === 200){
        setAbout(res?.data?.data)
      }
    })
  }, [])

  return (<div className='aboutUs'>
    <Path 
      title='about-us' 
      paths={[
        {href: 'about-us' , state: '', name: t('about-us')},
      ]} 
    />
      <div>
        {about?.map(info=>{
            return <div className="mt-5">
                <h2 className='mb-4'>{lang === 'en' ? info?.title_en : info?.title_ar}</h2>
                <p dangerouslySetInnerHTML={{ __html: lang === 'en' ? info?.description_en : info?.description_ar }}></p>
            </div>
        })}
      </div>
    </div>
  );
};

export default AboutUs;
