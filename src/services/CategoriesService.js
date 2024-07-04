import BaseService from "./BaseService";
import { API_BASE_URL_ENV } from "../common/common";

const apiEndpoint = API_BASE_URL_ENV() + "/categories";

export default class CategoriesService extends BaseService {
    constructor() {
        super(apiEndpoint);
    }
}
