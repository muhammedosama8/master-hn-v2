import axios from "axios";

// axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

function setJwt(jwt) {
  axios.defaults.headers.common["Authorization"] = `${jwt}`;
}

const obj = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  setJwt
}
export default obj;