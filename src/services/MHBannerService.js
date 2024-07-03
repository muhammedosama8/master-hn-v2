import BaseService from "./BaseService";
import { API_BASE_URL_ENV } from "../common/common";

const apiEndpoint = API_BASE_URL_ENV() + "/banner_hn";

export default class MHBannerService extends BaseService {
    constructor() {
        super(apiEndpoint);
    }
}
