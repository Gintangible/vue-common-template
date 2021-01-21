import axios from "axios";
import { Toast } from 'vant';
import config from '@/config';

// 创建axios实例
const request = axios.create({
  baseURL: config.base_url_api,
  timeout: config.request_timeout,
});

// request拦截器
request.interceptors.request.use(
  (config) => {
    // 默认不开启Toast loading;
    if (config.loading) {
      Toast.loading({
        forbidClick: true
      });
    }
    // Do something before request sending
    return config;
  },
  (error) => {
    // Do something with request error
    console.log("request.error: " + error); // for debug
    return Promise.reject(error);
  }
);

// respone拦截器
request.interceptors.response.use(
  (response) => {
    Toast.clear();
    // Do something for response
    return response.data;
  },
  (error) => {
    Toast.clear();
    console.log("response.error: " + error); // for debug
    return Promise.reject(error);
  }
);

export default request;
