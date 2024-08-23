import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";

const OrderSuccessful = () =>{
  const user = useSelector(state=> state?.user?.user)
  const {t} = useTranslation()
  return<Card style={{marginTop: '150px', border: 'none'}}>
    <CardBody>
      <div className=''>
      <div className='container'>
        <div className='row justify-content-center h-100 align-items-center'>
          <div className='col-md-8'>
            <div className='form-input-content text-center error-page'>
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M40.0013 6.66797C21.6346 6.66797 6.66797 21.6346 6.66797 40.0013C6.66797 58.368 21.6346 73.3346 40.0013 73.3346C58.368 73.3346 73.3346 58.368 73.3346 40.0013C73.3346 21.6346 58.368 6.66797 40.0013 6.66797ZM55.9346 32.3346L37.0346 51.2346C36.568 51.7013 35.9346 51.968 35.268 51.968C34.6013 51.968 33.968 51.7013 33.5013 51.2346L24.068 41.8013C23.1013 40.8346 23.1013 39.2346 24.068 38.268C25.0346 37.3013 26.6346 37.3013 27.6013 38.268L35.268 45.9346L52.4013 28.8013C53.368 27.8346 54.968 27.8346 55.9346 28.8013C56.9013 29.768 56.9013 31.3346 55.9346 32.3346Z" fill="#055902"/>
            </svg>

              <h4>
                <i className='fa fa-check' /> 
                {t("ordered successfully")}
              </h4>              
              <p>
                <i className='fa fa-check' /> 
                {t("ordered successfully description")}
              </p>
              <div className="mt-4">
                {!!user ? <Link className='btn btn-primary' to='/profile'>
                {t("My Orders")}
                </Link> : <Link className='btn btn-primary' to='/'>
                {t("home")}
                </Link>}
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
        </CardBody>
    </Card>
}
export default OrderSuccessful;