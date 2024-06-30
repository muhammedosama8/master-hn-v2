import React, { useState } from 'react';
import './style.css'
import { useTranslation } from 'react-i18next';
import Path from '../../common/Path';
import { AvField, AvForm } from 'availity-reactstrap-validation';
import { Col, Row } from 'react-bootstrap';
import whats from '../../assets/whatsapp.svg'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const {t} = useTranslation()
  const submit = (e) => {
    e.preventDefault();
  }
  return (<div className='contact'>
    <Path 
      title='contact' 
      paths={[
        {href: 'contact' , state: '', name: t('contact')},
      ]} 
    />
    <div className='container'>
      <AvForm 
        className='form-horizontal login-form'
        onValidSubmit={submit}
      >
        <Row>
          <Col md={2}></Col>
          <Col md={4}>
            <h4 className='getInTouch'>{t("GET IN TOUCH")}</h4>
            <div>
              <AvField
                label={t("Name")}
                type='text'
                placeholder={t("Name")}
                bsSize="lg"
                name='name'
                validate={{
                    required: {
                        value: true,
                        errorMessage: `${t("This Field is required")}`
                    }
                }}
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <AvField
                label={t("Email")}
                type='email'
                placeholder={t("Email")}
                bsSize="lg"
                name='email'
                validate={{
                    required: {
                        value: true,
                        errorMessage: `${t("This Field is required")}`
                    }
                }}
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <AvField
                label={t("Phone")}
                type='number'
                placeholder={t("Phone")}
                bsSize="lg"
                name='phone'
                validate={{
                    required: {
                        value: true,
                        errorMessage: `${t("This Field is required")}`
                    }
                }}
                value={formData.email}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div>
              <label>{t("Message")}</label>
              <textarea
                rows={8}
                className='w-100'
                placeholder={t("Message")}
                style={{
                  border: '1px solid #dedede',
                  borderRadius: '8px',
                  padding: '8px'
                }}
                onChange={e=> setFormData({...formData, message: e.target.value})}
              />
            </div>
            <button 
              type='submit'
              className='mt-3 send'
            >{t("Send")}</button>
          </Col>
          <Col md={4}>
            <div style={{
                  padding: '45px 50px',
                  borderRadius: '10px',
                  textAlign: 'center',
                  background: '#0e3a5d'
            }}>
              <img src={whats} alt='whats' />
              <p className='mt-3' style={{color: '#fff'}}>{t("CONTACT US ON WHATSAPP")}</p>
              <button className='contact-whats'>{t("contact")}</button>
            </div>
          </Col>
          <Col md={2}></Col>
        </Row>
      </AvForm>
    </div>
    </div>
  );
};

export default Contact;
