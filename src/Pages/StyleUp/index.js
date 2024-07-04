import { useTranslation } from "react-i18next";
import Path from "../../common/Path";
import './style.css'

import color1 from '../../assets/styleup/color1.jpeg'
import color2 from '../../assets/styleup/color2.jpeg'
import color3 from '../../assets/styleup/color3.jpeg'
import color4 from '../../assets/styleup/color4.jpeg'
import kitch from '../../assets/styleup/kitch.jpeg'
import kitch1 from '../../assets/styleup/kitch1.jpeg'
import kitch2 from '../../assets/styleup/kitch2.jpeg'
import kitch3 from '../../assets/styleup/kitch3.jpeg'
import kitch4 from '../../assets/styleup/kitch4.jpeg'
import { useState } from "react";
import { Col, Row } from "react-bootstrap";

const StyleUp = () => {
    const data = [{
        sheet_title: 'high-pressure laminate sheets -color',
        info: [
            {color_img: color1, img: kitch3},
            {color_img: color2, img: kitch1},
            {color_img: color3, img: kitch2},
            {color_img: color4, img: kitch4},
        ]
    }]
    const {t} = useTranslation()
    const [selected, setSelected] = useState({
        color_img: '', img: kitch
    })

    return <div className="style-up">
    <Path
      title='Style Up' 
      paths={[{href: 'style-up' , state: '', name: t('Style Up')}]} 
    />

    <div className="text-center mt-5">
        <img src={selected?.img} alt='main' height={400} className="w-75" />
    </div>
    <div className="mt-3">
        {data?.map((sheet,index) => {
            return <div key={index} className="sheet mt-5">
                <h2>{sheet?.sheet_title}</h2>
                <Row className="mt-4">
                {sheet?.info?.map((info, ind) => {
                    return <Col md={3} key={ind} className="text-center mb-3">
                        <img src={info?.color_img} alt='color_img' style={{cursor: 'pointer'}} onClick={()=> setSelected(info)}/>
                    </Col>
                })}
                </Row>
            </div>
        })}
    </div>
    </div>
}
export default StyleUp;