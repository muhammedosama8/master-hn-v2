import BaseService from "./BaseService";
import http from './HttpService'
import { API_BASE_URL_ENV } from "../common/common";
import { getJwt } from "./AuthService";

const apiEndpoint = API_BASE_URL_ENV() + "/cart";
const apiSummaryEndpoint = API_BASE_URL_ENV() + "/order/orderSummary";

export default class CartService extends BaseService {
    constructor() {
        http.setJwt(getJwt());
        super(apiEndpoint);
    }

    createPromoCode(data){
        return http.post(`${apiEndpoint}/promoCode`, data)
    }

    deletePromoCode(data){
        return http.delete(`${apiEndpoint}/promoCode`, {data})
    }

    remove(data){
        return http.delete(apiEndpoint, {data})
    }

    update(data) {
        const body = { ...data };
        return http.put(apiEndpoint, body);
    }

    summary(data) {
        return http.get(`${apiSummaryEndpoint}?payment_method=${data?.payment_method}&user_address_id=${data?.user_address_id}&cart_id=${data?.cart_id}`);
    }
}
