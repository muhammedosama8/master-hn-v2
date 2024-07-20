import axios from 'axios';
import { API_BASE_URL_ENV } from '../common/common';
import { LogoutFn, loginConfirmedAction } from '../store/actions/AuthActions';
import { changeLang } from '../store/actions/LangActions';
import { toast } from 'react-toastify';
import UserService from './UserService';

export function login(data) {
    return axios.post(`${API_BASE_URL_ENV()}/users/login`, data);
}

export function signUp(data) {
    return axios.post(`${API_BASE_URL_ENV()}/users/register`, data);
}


export function getJwt() {
    return JSON.parse(localStorage.getItem("masterHN"))?.accessToken;
}

export function saveTokenInLocalStorage(tokenDetails) {
    return localStorage.setItem('masterHN', JSON.stringify(tokenDetails));
}

export function Logout(token, dispatch, navigate, pathname) {
    axios.defaults.headers.common["Authorization"] = `${token}`;
    axios.post(`${API_BASE_URL_ENV()}/users/logout`).then(res=>{
        if(res.status === 200){
            dispatch(LogoutFn())
            toast.success('Logout Successfully.')
            if(pathname === '/profile'){
                navigate('/')
            }
        }
    }).catch(()=> dispatch(LogoutFn()))
}

export function checkAutoLogin(dispatch, navigate, pathname) {
    const tokenDetailsString = localStorage.getItem('masterHN');

    if (!tokenDetailsString) {
        dispatch(LogoutFn())
        if(pathname === '/profile'){
            navigate('/')
        }
		return;
    }
    new UserService().profile().then(res=>{
        if(res?.status){
            const tokenDetailsString = localStorage.getItem('masterHN');
            dispatch(loginConfirmedAction(JSON.parse(tokenDetailsString)));
            const lang = localStorage.getItem('masterHN_Lang')
            if(!!lang && lang !== 'null'){
                dispatch(changeLang(lang));
            } else {
                dispatch(changeLang('en'));
            }
        }
    }).catch(e=> {
        if(e?.response?.data?.message === "not_authorized_old_Token"){
            dispatch(LogoutFn())
            if(pathname === '/profile'){
                navigate('/')
            }
		    return;
        }
    })
}