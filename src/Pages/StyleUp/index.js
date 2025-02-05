import { useTranslation } from "react-i18next";
import Path from "../../common/Path";
import './style.css'
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import StyleUpService from "../../services/StyleUpService";
import Loader from "../../common/Loader";

const initial = {
    main_image: {src: '', loading: false},
    sheets: [{
        title: "",
        items: [{
            src: '', srcLoading: false, 
            color: '', colorLoading: false
        }]
    }]
}
const StyleUp = () => {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    const {t} = useTranslation()
    const [selected, setSelected] = useState({})
    const tabs = [
        {label: 'Classic kitchen', value: 'one'},
        {label: 'modern kitchen', value: 'two'},
    ]
    const [selectTab, setSelectTab] = useState({label: 'kitchen_one', value: 'one'})

    useEffect(()=>{
        let type= selectTab?.value
        setLoading(true)
        new StyleUpService()?.getList(type)?.then(res=>{
            if(res?.status === 200){
                if(!res.data?.data){
                    setSelected({img: ''})
                    setData(initial)
                    return
                }
                let response = res.data?.data
                let data = {
                    main_image: {src: response.main_image, loading: false},
                    sheets: response?.sheets?.map(sheet=>{
                        return {
                            title: sheet.title,
                            items: sheet?.item_sheet?.map(item=>{
                                return {
                                    src: item?.image, srcLoading: false, 
                                    color: item?.color, colorLoading: false
                                }
                            })
                        }
                    })
                }
                setSelected({img: response.main_image})
                setData(data)
            }
            setLoading(false)
        }).catch(()=> setLoading(false))
    },[selectTab])

    return <div className="style-up">
    <Path
      title='Style Up' 
      paths={[{href: 'style-up' , state: '', name: t('Style Up')}]} 
    />

    <div className="tabs-div">
        {tabs?.map((tab,index) => {
            return <p
                key={index}
                className='mb-0'
                style={{
                    color: tab.value === selectTab.value ? "var(--primary)" : "#7E7E7E",
                    borderBottom: tab.value === selectTab.value ? "2px solid" : "none",
                }}
                onClick={() => setSelectTab(tab)}
            >
              {t(tab.label)}
              </p>
            })}
    </div>
    {loading ? <div className="d-flex justify-content-center" style={{marginTop: '8rem'}}>
    </div> : <>
    <div className="text-center mt-5">
        <img src={selected?.img} alt='main' height={400} className="m-auto main-image" style={{width: '85%'}} />
    </div>
    <div className="mt-3">
        {data?.sheets?.map((sheet,index) => {
            return <div key={index} className="sheet mt-5">
                <h2 className="sheet-title">{sheet?.title}</h2>
                <Row className="mt-4">
                {sheet?.items?.map((info, ind) => {
                    return <Col md={2} key={ind} className="text-center mb-3 col-4">
                        <img src={info?.color} alt='color_img' className="w-75 h-100" style={{cursor: 'pointer'}} onClick={()=> setSelected({img: info?.src})}/>
                    </Col>
                })}
                </Row>
            </div>
        })}
    </div>
    </>}
    </div>
}
export default StyleUp;