import BaseService from "./BaseService";
import { API_BASE_URL_ENV } from "../common/common";

const apiEndpoint = API_BASE_URL_ENV() + "/setting/contactUs";

export default class ContactUsService extends BaseService {
    constructor() {
        super(apiEndpoint);
    }
}
