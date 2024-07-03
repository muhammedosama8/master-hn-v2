import { API_BASE_URL_ENV } from "../common/common";
import http from './HttpService'

const apiUploadEndpoint = API_BASE_URL_ENV() + "/files/uploadFile";

export default class BaseService {
  apiEndpoint;

  constructor(apiEndPoint) {
    this.apiEndpoint = apiEndPoint;
  }

  entityUrl(params = []) {
    return `${this.apiEndpoint}/${params.join("/")}`;
  }

  getList(params) {
    if(params){
      return http.get(this.apiEndpoint, {params});
    } else {
      return http.get(this.apiEndpoint);
    }
    
  }

  find(id, params) {
    return http.get(this.entityUrl([id]), { params });
  }

  create(data) {
    return http.post(this.apiEndpoint, data);
  }

  update(id, data) {
    const body = { ...data };
    return http.put(this.entityUrl([id]), body);
  }

  toggleStatus(model, id, params = []) {
    return http.get(this.entityUrl(["toggle-activation", model, id]), { params });
  }

  getDropDown(model, params = []) {
    return http.get(this.dropDownUrl(model), { params });
  }

  remove(id, data) {
    if(data || data?.isDeleted){
      return http.delete(this.entityUrl([id]), {data});
    }
    
    return http.delete(this.entityUrl([id]));
  }

  postUpload(file) {
    const formData = new FormData();
    formData.append("img", file);
    return http.post(apiUploadEndpoint, formData);
  }
}
