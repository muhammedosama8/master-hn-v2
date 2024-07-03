import axios from "axios";
import { toast } from "react-toastify";
import swal from "sweetalert";
import { Logout } from "../store/actions/AuthActions";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";
function setInterceptors(navigate){
  axios.interceptors.response.use(null, async (error) => {
    if(error?.response?.data?.message === "not_authorized" || error?.response?.data?.message === "not_authorized_old_Token" || error?.response?.data?.message === "غير مصرح به (رمز قديم)"){
      Logout(navigate);
    } else if(error?.response?.data?.message ===  "المستخدم غير موجود" || error?.response?.data?.message === 'User_not_Exist'){
      swal("Oops", "Email not found", "error",{ button: "Try Again!",});
    } else if(error?.response?.data?.message === 'كلمة سر خاطئة' || error?.response?.data?.message === "Incorrect_Password"){
      swal("Oops", "Incorrect Password", "error",{ button: "Try Again!",});
    } else if(error?.response){
      toast.error(`${error?.response?.data?.message}`)
    } else {
      toast.error(error.message)
    }
  });
}

const obj = {
  get: axios.get,
  post: axios.post,
  setInterceptors
}
export default obj;