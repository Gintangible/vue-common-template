import axios from 'axios';
import { Dialog } from 'vant';
import JSONbig from 'json-bigint';
import config from '@/config';
import cache from './cache';
import { showLoading, hideLoading } from './loading';

const jsonParser = JSONbig({
  storeAsString: true,  // 把64位整数存储为字符串
});

// 创建axios实例
const request = axios.create({
  baseURL: config.base_url_api,
  // HTTP请求超时时间，单位为毫秒，默认值为5分钟
  timeout: 5 * 60 * 1000,
});

// request拦截器
request.interceptors.request.use(
  (cfg) => {
    // 默认不开启Toast loading;
    if (cfg.loading) {
      showLoading();
    }
    if (['get', 'delete', 'post', 'put'].includes(cfg.method) && !cfg.data) {
      //  给data赋值以绕过if判断
      cfg.data = true;
    }
    cfg.headers['Content-Type'] = 'application/json;charset=UTF-8';
    // Do something before request sending
    const isRepeatSubmit = (cfg.headers || {}).repeatSubmit;
    if (!isRepeatSubmit && ['post', 'put'].includes(cfg.method)) {
      const requestObj = {
        url: cfg.url,
        data: typeof cfg.data === 'object' ? JSON.stringify(cfg.data) : cfg.data,
        time: new Date().getTime(),
      };
      const sessionObj = cache.session.getJSON('sessionObj');
      if (!sessionObj) {
        cache.session.setJSON('sessionObj', requestObj);
      } else {
        const { url, data, time } = sessionObj;
        const interval = 500;
        if (data === requestObj.data
          && url === requestObj.url
          && requestObj.time - time < interval
        ) {
          const message = '数据正在处理，请勿重复操作';
          console.warn(`[${url}]: ${message}`);
          return Promise.reject(new Error(message));
        } else {
          cache.session.setJSON('sessionObj', requestObj);
        }
      }
    }
    return cfg;
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
    if (response.config.loading) {
      hideLoading();
    }
    // Do something for response
    // return response.data;
    const { data } = response;
    if (data?.code === 200) {
      return jsonParser.parse(response.request.responseText)?.data;
    }
    Dialog.alert({
      title: '错误',
      message: data.msg,
    });
    return Promise.reject(new Error(data.msg));
  },
  (error) => {
    if (error.config.loading) {
      hideLoading();
    }
    console.log(`response.error: ${error}`); // for debug
    if (error.response?.data?.message) {
      Dialog.alert({
        title: '错误',
        message: error.response.data.message,
      });
    }
    return Promise.reject(error);
  }
);

export default request;
