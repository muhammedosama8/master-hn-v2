import { toast } from 'react-toastify';
import {
    login,
    saveTokenInLocalStorage,
    signUp,
} from '../../services/AuthService';


export const SIGNUP_CONFIRMED_ACTION = '[signup action] confirmed signup';
export const SIGNUP_FAILED_ACTION = '[signup action] failed signup';
export const LOGIN_CONFIRMED_ACTION = '[login action] confirmed login';
export const LOGIN = 'login';
export const UPDATE_DATA_ACTION = 'update data';
export const CHANGE_AVATAR_ACTION = 'change avatar';
export const SHOWLOGIN = 'show login';
export const CART = 'cart';
export const REMOVE = 'remove';
export const INCREASE = 'increase';
export const DECREASE = 'decrease';
export const LOGIN_FAILED_ACTION = '[login action] failed login';
export const LOADING_TOGGLE_ACTION = '[Loading action] toggle loading';
export const LOGOUT_ACTION = '[Logout action] logout action';

export function signupAction(data, navigate, pathname, setModal, setLoading) {
    return (dispatch) => {
        setLoading(true)
        signUp(data).then((response) => {
            if(response?.status === 200){
                saveTokenInLocalStorage(response.data);
                dispatch(confirmedSignupAction(response.data));
                navigate(pathname);
                toast.success('Register Successfully.')
                setModal()
            }
            setLoading(false)
        }).catch((error) => {
            const errorMessage = error?.response?.data?.message?.replaceAll('_',' ') || error?.response?.data?.message;
            dispatch(signupFailedAction(errorMessage));
            toast.error(errorMessage)
            setLoading(false)
        });
    };
}

export function LogoutFn() {
	localStorage.removeItem('masterHN');
    toast.success('Logout Successfully.')
    
	return {
        type: LOGOUT_ACTION,
    };
}

export function loginAction(data, navigate, path, setModal, setLoading) {
    return (dispatch) => {
        setLoading(true)
        login(data).then((response) => {  
                if(response?.status === 200){
                    dispatch(loginFn({...data, password:''}))  
                    saveTokenInLocalStorage(response.data);
                    dispatch(loginConfirmedAction(response.data));
                    navigate(path); 
                    toast.success('Login Successfully.')
                    dispatch(loadingToggleAction(false))  
                    setModal(false)
                }  
                setLoading(false)
            }).catch(error => {
                const errorMessage = error?.response?.data?.message?.replaceAll('_',' ') || error?.response?.data?.message;
                dispatch(loginFailedAction(errorMessage));
                toast.error(errorMessage)
                setLoading(false)
            });
    };
}

export function updateDataAction(data) {
    return {
        type: UPDATE_DATA_ACTION,
        payload: data,
    };
}

export function updateAvatarAction(data) {
    return {
        type: CHANGE_AVATAR_ACTION,
        payload: data,
    };
}

export function loginFailedAction(data) {
    return {
        type: LOGIN_FAILED_ACTION,
        payload: data,
    };
}

export function addToCart(data) {
    return {
        type: CART,
        payload: data,
    };
}
export function increaseProduct(data) {
    return {
        type: INCREASE,
        payload: data
    };
}
export function decreaseProduct(data) {
    return {
        type: DECREASE,
        payload: data
    };
}
export function removeProduct(data) {
    return {
        type: REMOVE,
        payload: data
    };
}
export function loginFn(data) {
    return {
        type: LOGIN,
        payload: data,
    };
}
export function ShowLogin(data) {
    return {
        type: SHOWLOGIN,
        payload: data,
    };
}
export function loginConfirmedAction(data) {
    return {
        type: LOGIN_CONFIRMED_ACTION,
        payload: data,
    };
}

export function confirmedSignupAction(payload) {
    return {
        type: SIGNUP_CONFIRMED_ACTION,
        payload,
    };
}

export function signupFailedAction(message) {
    return {
        type: SIGNUP_FAILED_ACTION,
        payload: message,
    };
}

export function loadingToggleAction(status) {
    return {
        type: LOADING_TOGGLE_ACTION,
        payload: status,
    };
}