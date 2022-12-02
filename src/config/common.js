const { name, version } = require('../../package.json');

// 通用配置
module.exports = {
  title: '通用模板',
  project: name,
  // 运行环境
  node_env: process.env.NODE_ENV,
  app_version: version,
  // 调试生产环境
  prodServer: false,
  // 默认渠道
  default_source: 'nj',
};
