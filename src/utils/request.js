import axios from "axios";
import config from '@/config';

// 创建axios实例
const request = axios.create({
  baseURL: config.api_base_url,
  timeout: config.request_timeout,
});

// request拦截器
request.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    return config;
  },
  (error) => {
    // Do something with request error
    console.log("request: " + error); // for debug
    return Promise.reject(error);
  }
);

// respone拦截器
request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.log("response: " + error); // for debug
    return Promise.reject(error);
  }
);

export default request;
