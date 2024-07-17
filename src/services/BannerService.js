import { API_BASE_URL_ENV } from "../common/common";
import BaseService from "./BaseService";


const apiEndpoint = API_BASE_URL_ENV() + "/banner";

export default class BannerService extends BaseService {
    constructor() {
        super(apiEndpoint);
    }
}
