import BaseService from "./BaseService";
import http from './HttpService'
import { API_BASE_URL_ENV } from "../common/common";
import { getJwt } from "./AuthService";

const apiEndpoint = API_BASE_URL_ENV() + "/cart";

export default class CartService extends BaseService {
    constructor() {
        http.setJwt(getJwt());
        super(apiEndpoint);
    }

    createPromoCode(data){
        return http.post(`${apiEndpoint}/promoCode`, data)
    }

    deletePromoCode(data){
        return http.post(`${apiEndpoint}/promoCode`, data)
    }
}
