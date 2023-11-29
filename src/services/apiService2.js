// ApiServiceTwo.js
import axios from "axios";
import APPCONSTANTS from "configs/constants";
const API_BASE_URL = APPCONSTANTS.API_BASE_URL; // Replace with your API's base URL
const V0_API_BASE_URL = APPCONSTANTS.V0_API_BASE_URL
const customHeaders = {
  "Content-Type": "application/json", // You can add other headers as needed
  "X-Auth-Token": APPCONSTANTS.X_AUTH_TOKEN,
};
const axiosInstance = axios.create({
  baseURL: V0_API_BASE_URL,
  headers: customHeaders,
});

const ApiServiceTwo = {
  get: (url, params = {}) => {
    return axiosInstance.get(url, { params });
  },
  post: (url, data = {}) => {
    return axiosInstance.post(url, data);
  },
  // Add other HTTP methods (put, delete, etc.) as needed
};
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('RESPONSE....')
    if(response.data && response.data.data){
        return response.data.data
    }
    return response;
  },
  (error) => {
    // Handle API errors here
    console.error("API error:", error);
    return Promise.reject(error);
  }
);

export default ApiServiceTwo;
