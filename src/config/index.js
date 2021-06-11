let env = process.env.NODE_ENV || 'development';
const defaultConfig = require('./common');

if (defaultConfig.prodServer) {
  env = 'production';
}
/* eslint-disable */
const envConfig = require(`/env.${env}`);
/* eslint-enable */
const config = { ...defaultConfig, ...envConfig };

export default config;
