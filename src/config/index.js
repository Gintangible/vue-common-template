// 根据环境引入不同配置 process.env.VUE_APP_ENV
const env = process.env.VUE_APP_ENV || 'development';
const defaultConfig = require('./common');
const envConfig = require('./env.' + env);
console('config env = {0}', env);
const config = Object.assign({}, defaultConfig, envConfig);

export default config;