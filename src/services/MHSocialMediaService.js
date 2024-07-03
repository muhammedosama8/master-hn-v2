import { API_BASE_URL_ENV } from "../common/common";
import BaseService from "./BaseService";

const apiEndpoint = API_BASE_URL_ENV() + "/setting/social_hn";

export default class MHSocialMediaService extends BaseService {
    constructor() {
        super(apiEndpoint);
    }

}
