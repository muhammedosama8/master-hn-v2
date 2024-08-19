import BaseService from "./BaseService";
import http from './HttpService'
import { API_BASE_URL_ENV } from "../common/common";
import { getJwt } from "./AuthService";

const apiEndpoint = API_BASE_URL_ENV() + "/orderGuest";

export default class OrderGuestService extends BaseService {
    constructor() {
        // http.setJwt(getJwt());
        super(apiEndpoint);
    }
}
