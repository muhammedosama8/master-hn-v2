import BaseService from "./BaseService";
import http from './HttpService'
import { API_BASE_URL_ENV } from "../common/common";

const apiEndpoint = API_BASE_URL_ENV() + "/product";
const apiChangeEndpoint = API_BASE_URL_ENV() + "/product/changeProduct";
const apiDynamicVariantsEndpoint = API_BASE_URL_ENV() + "/product/dynamicVariantsOfProduct";

export default class ProductsService extends BaseService {
    constructor() {
        super(apiEndpoint);
    }

    getDynamicVariants(id){
        return http.get(`${apiDynamicVariantsEndpoint}/${id}`)
    }

    getProdust(id){
        return http.get(`${apiEndpoint}/${id}`)
    }

    changeProduct(code, data){
        return http.get(`${apiChangeEndpoint}/${Number(code)}?${data}`)
    }
}
