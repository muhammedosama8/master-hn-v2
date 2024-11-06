import { API_BASE_URL_ENV } from "../common/common";
import BaseService from "./BaseService";

const apiEndpoint = API_BASE_URL_ENV() + "/setting/servicesFee";

export default class ServiceFeeService extends BaseService {
    constructor() {
        super(apiEndpoint);
    }

}