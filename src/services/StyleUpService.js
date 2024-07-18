import { API_BASE_URL_ENV } from "../common/common";
import http from './HttpService'
import BaseService from "./BaseService";

const apiEndpoint = API_BASE_URL_ENV() + "/styleUp";

export default class StyleUpService extends BaseService {
  constructor() {
    super(apiEndpoint);
  }

  getList(type) {
    return http.get(`${apiEndpoint}/${type}`);
  }
}
