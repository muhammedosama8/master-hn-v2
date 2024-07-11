import axios from 'axios';
import { API_BASE_URL_ENV } from '../common/common';
import { LogoutFn, loginConfirmedAction } from '../store/actions/AuthActions';
import { changeLang } from '../store/actions/LangActions';

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
            if(pathname === '/profile'){
                navigate('/')
            }
        }
    })
}

export function checkAutoLogin(dispatch, navigate) {
    const tokenDetailsString = localStorage.getItem('masterHN');
    const lang = localStorage.getItem('masterHN_Lang')
    dispatch(changeLang(lang));

    if (!tokenDetailsString) {
		return;
    }
    dispatch(loginConfirmedAction(JSON.parse(tokenDetailsString)));
}