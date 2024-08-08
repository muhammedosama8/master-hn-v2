import BaseService from "./BaseService";
import http from './HttpService'
import { API_BASE_URL_ENV } from "../common/common";
import { getJwt } from "./AuthService";

const apiEndpoint = API_BASE_URL_ENV() + "/order";
const apiMyOrderEndpoint = API_BASE_URL_ENV() + "/order/myOrders";

export default class OrderService extends BaseService {
    constructor() {
        http.setJwt(getJwt());
        super(apiEndpoint);
    }

    myOrders(){
        return http.get(apiMyOrderEndpoint)
    }
}
