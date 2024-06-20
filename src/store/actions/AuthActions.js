import {
    formatError,
    saveTokenInLocalStorage,
    signUp,
} from '../../services/AuthService';


export const SIGNUP_CONFIRMED_ACTION = '[signup action] confirmed signup';
export const SIGNUP_FAILED_ACTION = '[signup action] failed signup';
export const LOGIN_CONFIRMED_ACTION = '[login action] confirmed login';
export const LOGIN = 'login';
export const CART = 'cart';
export const REMOVE = 'remove';
export const INCREASE = 'increase';
export const DECREASE = 'decrease';
export const LOGIN_FAILED_ACTION = '[login action] failed login';
export const LOADING_TOGGLE_ACTION = '[Loading action] toggle loading';
export const LOGOUT_ACTION = '[Logout action] logout action';

export function signupAction(email, password, navigate) {
    return (dispatch) => {
        signUp(email, password)
        .then((response) => {
            saveTokenInLocalStorage(response.data);
            dispatch(confirmedSignupAction(response.data));
            navigate('/dashboard');
        })
        .catch((error) => {
            const errorMessage = formatError(error.response.data);
            dispatch(signupFailedAction(errorMessage));
        });
    };
}

export function Logout() {
	localStorage.removeItem('userDetails');
	localStorage.removeItem('LeapAdminRules');
	localStorage.removeItem('adminLang');
    
    if(!window.location.pathname.includes('login')) {
        window.location.href= '/login';
    }
    
	return {
        type: LOGOUT_ACTION,
    };
}

export function loginAction(email, password, navigate, path) {
    return (dispatch) => {
        let data = {
            email: email,
            password: password,
        }
        dispatch(loginFn({email, password:''}))  
        saveTokenInLocalStorage(data);
        dispatch(loadingToggleAction(false))  
        navigate(path); 
    }
    // return (dispatch) => {
    //      login(email, password).then((response) => {  
    //             if(response?.status === 200){
    //                 dispatch(loginFn({email, password:''}))  
    //                 saveTokenInLocalStorage(response.data);
    //                 dispatch(loginConfirmedAction(response.data));
    //                 navigate(path); 
    //             }  
    //             dispatch(loadingToggleAction(false))  
    //         }).catch(error => {
    //             const errorMessage = formatError(error?.response?.data);
    //             dispatch(loginFailedAction(errorMessage));
    //         });
    // };
}
// export function loginVerifiedAction(email, password,code, navigate) {
//     return (dispatch) => {
//         loginVerified(email, password, code)
//             .then((response) => {
//                 saveTokenInLocalStorage(response.data);
//                 dispatch(loginConfirmedAction(response.data));  
//                 dispatch(loginFn({email, password: ''}))  
//                 dispatch(loadingToggleAction(false))               
// 				navigate('/dashboard');                
//             })
//             .catch((error) => {
//                 const errorMessage = formatError(error.response.data?.message);
//                 dispatch(loginFailedAction(errorMessage));
//             });
//     };
// }

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