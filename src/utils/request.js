import axios from 'axios';
import { Toast } from 'vant';
import JSONbig from 'json-bigint';
import config from '@/config';

const jsonParser = JSONbig({
  storeAsString: true,  // 把64位整数存储为字符串
});

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
    if ((config.method === 'get')
        || (config.method === 'delete')
        || (config.method === 'post' && !config.data)) {
      //  给data赋值以绕过if判断
      config.data = true;
    }
    config.headers['Content-Type'] = 'application/json;charset=UTF-8';
    // Do something before request sending
    return config;
  },
  (error) => {
    // Do something with request error
    console.log(`request.error: ${error}`); // for debug
    return Promise.reject(error);
  }
);

// respone拦截器
request.interceptors.response.use(
  (response) => {
    Toast.clear();
    if (response && response.data) {
      return jsonParser.parse(response.request.responseText);
    } else {
      return null;
    }
    // Do something for response
    // return response.data;
  },
  (error) => {
    Toast.clear();
    console.log(`response.error: ${error}`); // for debug
    return Promise.reject(error);
  }
);

export default request;
