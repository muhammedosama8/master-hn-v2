import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import { useTranslation } from "react-i18next";

const OrderFailed = () =>{
  const {t} = useTranslation()
    return<Card style={{marginTop: '150px', border: 'none'}}>
        <CardBody>
        <div className=''>
      <div className='container' style={{}}>
        <div className='row justify-content-center align-items-center'>
          <div className='col-md-8'>
            <div className='form-input-content text-center error-page'>
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M40.0003 6.66602C21.6337 6.66602 6.66699 21.6327 6.66699 39.9993C6.66699 58.366 21.6337 73.3327 40.0003 73.3327C58.367 73.3327 73.3337 58.366 73.3337 39.9993C73.3337 21.6327 58.367 6.66602 40.0003 6.66602ZM51.2003 47.666C52.167 48.6327 52.167 50.2327 51.2003 51.1993C50.7003 51.6993 50.067 51.9327 49.4337 51.9327C48.8003 51.9327 48.167 51.6993 47.667 51.1993L40.0003 43.5327L32.3337 51.1993C31.8337 51.6993 31.2003 51.9327 30.567 51.9327C29.9337 51.9327 29.3003 51.6993 28.8003 51.1993C27.8337 50.2327 27.8337 48.6327 28.8003 47.666L36.467 39.9993L28.8003 32.3327C27.8337 31.366 27.8337 29.766 28.8003 28.7993C29.767 27.8327 31.367 27.8327 32.3337 28.7993L40.0003 36.466L47.667 28.7993C48.6337 27.8327 50.2337 27.8327 51.2003 28.7993C52.167 29.766 52.167 31.366 51.2003 32.3327L43.5337 39.9993L51.2003 47.666Z" fill="#F10D0D"/>
            </svg>

              <h4>
                <i className='fa fa-exclamation' /> 
                {t("ordered failed")}
              </h4>
              <p>
              {t("ordered failed description")}
              </p>
              <div className="mt-4">
                <Link className='btn btn-primary' to='/'>
                {t("home")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
        </CardBody>
    </Card>
}
export default OrderFailed;