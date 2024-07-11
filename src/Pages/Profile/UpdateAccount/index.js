import { AvField, AvForm } from "availity-reactstrap-validation";
import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import userImg from '../../../assets/user1.svg'
import BaseService from "../../../services/BaseService";
import Loader from "../../../common/Loader";
import UserService from "../../../services/UserService";
import { toast } from "react-toastify";
import { updateAvatarAction, updateDataAction } from "../../../store/actions/AuthActions";

const UpdateAccount = () => {
    const {t} = useTranslation()
    const [formData, setFormData] = useState({
        avatar: '',
        username: '',
        email: '',
        phone: ''
    })
    const userService = new UserService()
    const [pageLoading, setPageLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [submitLoading, setSubmitLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(()=> {
        setPageLoading(true)
        userService.profile().then(res=>{
            if(res?.status === 200){
                let data = {
                    avatar: res?.data?.data?.avatar,
                    username: res?.data?.data?.username,
                    email: res?.data?.data?.email,
                    phone: res?.data?.data?.phone,
                }
                setFormData(data)
            }
            setPageLoading(false)
        }).catch(()=> setPageLoading(false))
    }, [])

    const changeProfile = (e, ) => {
        let filesAll = e.target.files
        const filesData = Object.values(filesAll)
        if(filesData?.length === 0){
            return
        }
        setLoading(true)
        new BaseService().postUpload(filesData[0]).then(res=>{
            if(res?.status === 200){
                let data = {
                    avatar: res.data.url
                }
                userService.updateImageProfile(data).then(res2=>{
                    if(res2.status === 200){
                        setFormData({...formData, avatar: res.data.url})
                        toast.success("Profile Image Updated Successfully.")
                        dispatch(updateAvatarAction(data))
                    }
                    setLoading(false)
                }).catch(()=> setLoading(false))
            }
            setLoading(false)
        }).catch(()=> setLoading(false))
    }

    const submit = () => {
        let data ={
            email: formData.email,
            username: formData.username,
            phone: formData.phone
        }
        setSubmitLoading(true)
        userService.update(data).then(res=>{
            if(res?.status === 200){
                toast.success('Profile Data Updated Successfully.')
                dispatch(updateDataAction(data))
            }
            setSubmitLoading(false)
        }).catch(()=> setSubmitLoading(false))
    }

    if(pageLoading){
        return <div style={{width: 'max-content', margin: 'auto', marginTop: '7rem'}}>
            <Loader />
        </div>
    }
    return <>
        <div className="profile-pic mb-5">
            <div className="image-placeholder">	
                <div className="avatar-edit">
                    <input type="file" onChange={(e) => changeProfile(e)} id={`imageUpload`} /> 					
                </div>
                <div className="avatar-preview">
                    {!!formData.avatar ? <div>
                        <img src={formData?.avatar} alt='icon' style={{ width: '110px', height: '110px' }} />
                    </div> : <>
                        {loading && <div className="w-50 m-auto h-50">
                            <Loader />
                        </div>}
                        {!loading && <img src={userImg} alt='icon'
                            style={{ width: '110px', height: '110px' }} />}
                    </>}
                </div>
            </div>
        </div>
        <AvForm
        className='form-horizontal'
        onValidSubmit={submit}>
            <Row>
                <Col md={6}>
                    <AvField
                        label={t("Name")}
                        type='text'
                        placeholder={t("Name")}
                        bsSize="lg"
                        name='username'
                        validate={{
                            required: {
                                value: true,
                                errorMessage: `${t("This Field is required")}`
                            }
                        }}
                        value={formData.username}
                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                    />
                </Col>
                <Col md={6}>
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
                </Col>
                <Col md={6}>
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
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                </Col>
            </Row>
            <Button variant="primary" className="mt-3" type='submit' disabled={submitLoading}>
                {t("Update")}
            </Button>
            
        </AvForm>
    </>
}
export default UpdateAccount;