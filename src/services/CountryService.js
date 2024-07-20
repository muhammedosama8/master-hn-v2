import BaseService from "./BaseService";
import http from './HttpService'
import { API_BASE_URL_ENV } from "../common/common";

const apiEndpoint = API_BASE_URL_ENV() + "/country/governorate";
const apiAreaEndpoint = API_BASE_URL_ENV() + "/country/area";

export default class CountryService extends BaseService {
    constructor() {
        super(apiEndpoint);
    }

    getArea(id) {
        return http.get(`${apiAreaEndpoint}/${id}`);
    }
}