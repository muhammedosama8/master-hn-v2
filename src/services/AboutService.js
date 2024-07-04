import BaseService from "./BaseService";
import { API_BASE_URL_ENV } from "../common/common";

const apiEndpoint = API_BASE_URL_ENV() + "/staticPage/hn";

export default class AboutService extends BaseService {
    constructor() {
        super(apiEndpoint);
    }
}
