import axios from 'axios';
import swal from "sweetalert";
import { API_BASE_URL_ENV } from '../common/common';
import { LOGOUT_ACTION, loginConfirmedAction } from '../store/actions/AuthActions';

const tokenKey = "token";

export function login(email, password) {
    const postData = { email, password };
    return axios.post(`${API_BASE_URL_ENV()}/admin/login`, postData);
}

export function signUp(email, password) {
    const postData = {
        email,
        password,
    };
    return axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD3RPAp3nuETDn9OQimqn_YF6zdzqWITII`,
        postData,
    );
}

export function formatError(errorResponse) {
    switch (errorResponse?.message) {
        case 'EMAIL_EXISTS':
            //return 'Email already exists';
            swal("Oops", "Email already exists", "error");
            break;
        case 'User not Exist.':
           swal("Oops", "Email not found", "error",{ button: "Try Again!",});
           break;
        case 'Incorrect Password.':
            //return 'Invalid Password';
            swal("Oops", "Incorrect Password", "error",{ button: "Try Again!",});
            break;
        case 'كلمة سر خاطئة':
            //return 'Invalid Password';
            swal("Oops", "Invalid Password", "error",{ button: "Try Again!",});
            break;
        case 'USER_DISABLED':
            return 'User Disabled';
        default:
            return '';
    }
}

export function getJwt() {
    return localStorage.getItem(tokenKey);
}

export function saveTokenInLocalStorage(tokenDetails) {
    localStorage.setItem('masterHN', JSON.stringify(tokenDetails));
}

export function Logout() {
	localStorage.removeItem('masterHN');
    return {
        type: LOGOUT_ACTION,
    };
}

export function checkAutoLogin(dispatch, navigate) {
    const tokenDetailsString = localStorage.getItem('masterHN');
    if (!tokenDetailsString) {
        dispatch(Logout(navigate));
		return;
    }
    dispatch(loginConfirmedAction(JSON.parse(tokenDetailsString)));
}