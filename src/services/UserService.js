import BaseService from "./BaseService";
import http from './HttpService'
import { API_BASE_URL_ENV } from "../common/common";
import { getJwt } from "./AuthService";

const apiEndpoint = API_BASE_URL_ENV() + "/users";

export default class UserService extends BaseService {
    constructor() {
        http.setJwt(getJwt());
        super(apiEndpoint);
    }

    update(data){
        return http.put(apiEndpoint, data)
    }
    updateImageProfile(data){
        return http.put(`${apiEndpoint}/imageProfile`, data)
    }

    forgetPassword(data){
        return http.put(`${apiEndpoint}/forgetPassword`, data)
    }

    verifiedForgetPasswordCode(data){
        return http.put(`${apiEndpoint}/verifiedForgetPasswordCode`, data)
    }

    changePasswordForForgetPassword(data, token){
        http.setJwt(token)
        return http.put(`${apiEndpoint}/changePasswordForForgetPassword`, data)
    }

    updatePassword(data){
        return http.put(`${apiEndpoint}/changePassword`, data)
    }

    profile(){
        return http.get(`${apiEndpoint}/profile`)
    }

    removeUser(){
        return http.delete(`${apiEndpoint}/delete`)
    }
}
