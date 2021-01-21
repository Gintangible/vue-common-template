const env = process.env.VUE_APP_ENV || 'development';
const defaultConfig = require('./common');
/* eslint-disable */
const envConfig = require(`/env.${env}`);
/* eslint-enable */
const config = { ...defaultConfig, ...envConfig };

export default config;
