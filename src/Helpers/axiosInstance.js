import axios from "axios";


const BASE_URI = "http://localhost:4002/api/v1"
const axiosInstance = axios.create()

axiosInstance.defaults.baseURL = BASE_URI;
axiosInstance.defaults.withCredentials =true;
export default axiosInstance;