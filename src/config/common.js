// 通用配置
module.exports = {
  // 运行环境
  node_env: process.env.NODE_ENV,
  app_name: process.env.VUE_APP_APP_NAME,
  app_version: process.env.VUE_APP_APP_VERSION,
  // 调试生产环境
  prodServer: false,
  // HTTP请求超时时间，单位为毫秒，默认值为5分钟
  request_timeout: 5 * 60 * 1000,
  // 默认渠道
  default_source: 'nj',
};
