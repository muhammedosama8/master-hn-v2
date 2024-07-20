import BaseService from "./BaseService";
import http from './HttpService'
import { API_BASE_URL_ENV } from "../common/common";
import { getJwt } from "./AuthService";

const apiEndpoint = API_BASE_URL_ENV() + "/userAddress";

export default class UserAddressService extends BaseService {
    constructor() {
        http.setJwt(getJwt());
        super(apiEndpoint);
    }

    updateDefaultAddress(id, data){
        return http.put(`${apiEndpoint}/defaultAddress/${id}`, data)
    }

    updateAddress(id, data){
        return http.put(`${apiEndpoint}/address/${id}`, data)
    }

    defaultAddress(){
        return http.get(`${apiEndpoint}/defaultAddress`)
    }

    deleteAddress(id){
        return http.delete(`${apiEndpoint}/address/${id}`)
    }
}
