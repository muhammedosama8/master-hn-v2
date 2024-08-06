import { useTranslation } from "react-i18next";
import Path from "../../common/Path";
import './style.css'
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import UpdateAccount from "./UpdateAccount";
import ChangePassword from "./ChangePassword";
import MyOrders from "./MyOrders";
import Address from "./Address";

const Profile = () => {
    const {t} = useTranslation()
    const auth = useSelector(state => state?.user)
    const lang = useSelector(state => state?.lang?.lang)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const tabs = ["My Orders", "Update Account", "Change Password", "Address"]
    const [selectedTab, setSelectedTab] = useState("My Orders")

    return <div className='profile'>
        <Path
        title='My Account' 
        paths={[{href: 'my-account' , state: '', name: t('My Account')},]} 
        />
        <Row>
            <Col md={4}>
                <div className="profile-details">
                    <div className="mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                        </svg>
                        <span className={lang === 'en' ? "ms-4" :"me-4"}>{auth?.user?.username}</span>
                    </div>
                    <div className="mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
                        </svg>
                        <span className={lang === 'en' ? "ms-4" :"me-4"}>{auth?.user?.email}</span>
                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone" viewBox="0 0 16 16">
                            <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                        </svg>
                        <span className={lang === 'en' ? "ms-4" :"me-4"}>{auth?.user?.country_code} {auth?.user?.phone}</span>
                    </div>
                    <div className="text-center">
                        <button className="logout" onClick={()=> {
                            Logout(auth?.accessToken, dispatch)
                            navigate('/')
                        }}>
                            {t("Logout")}
                        </button>
                    </div>
                </div>
            </Col>
            <Col md={8} className="details">
                <div className="tabs">
                    {tabs?.map((tab, index)=>{
                        return <p 
                            className={`${tab===selectedTab ? 'active' : ''} tab`} 
                            key={index}
                            onClick={()=> setSelectedTab(tab)}
                        >{t(tab)}</p>
                    })}
                </div>
                {selectedTab === "My Orders" && <MyOrders />}
                {selectedTab === "Update Account" && <UpdateAccount />}
                {selectedTab === "Change Password" && <ChangePassword />}
                {selectedTab === "Address" && <Address />}
            </Col>
        </Row>
    </div>
}
export default Profile;