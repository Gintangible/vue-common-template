const API_BASE_URL = process.env.VUE_APP_BASE_URL;        // 请求地址
const REQUEST_TIMEOUT = 5000;                             // HTTP请求超时时间，单位为毫秒，默认值为5分钟

export default {
  api_base_url: API_BASE_URL,
  request_timeout: REQUEST_TIMEOUT,
};