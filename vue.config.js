const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const config = require('./src/config/common');

// let SentryWebpackPlugin;
// if (process.env.NODE_ENV === 'production') {
//   SentryWebpackPlugin = require('@sentry/webpack-plugin');
// }

module.exports = {
  // 署应用包时的基本 URL。 hash 模式使用
  publicPath: './',
  // 署应用包时的基本 URL。history模式使用
  // publicPath: '/app/',
  // 构建文件的目录
  outputDir: 'dist',
  assetsDir: 'static',
  // 生产环境构建生成 source map
  productionSourceMap: false,
  // 文件名哈希
  filenameHashing: true,
  // 高级设置, 控制其内部配置
  chainWebpack: () => {
  },
  // 简单配置
  configureWebpack: (cfg) => {
    cfg.name = config.title;
    if (process.env.speedPlugin) {
      cfg.plugins.push(new SpeedMeasurePlugin({
        outputFormat: 'human'
      }));
    }
    // if (process.env.NODE_ENV === 'production') {
    //   cfg.devtool = 'source-map';
    //   cfg.output.sourceMapFilename = 'sourceMap/[name].[chunkhash].js.map';
    //   cfg.plugins.push(new SentryWebpackPlugin({
    //     org: 'xxx',
    //     project: config.project,
    //     release: config.app_version,
    //     url: 'https://sentry.njzhyl.cn',
    //     authToken: '9af52016143d4bf4aff996150a0f7d9262650c840536475cb85c0e57334da58a',
    //     include: './dist',
    //     urlPrefix: '~/',
    //   }));
    // }
  },
  css: {
    sourceMap: false,
    loaderOptions: {
      // scss: {
      //   additionalData: `
      //     @import '@/styles/variable.scss';
      //     @import '@/styles/mixins.scss';
      //     `,
      // },
      less: {
        additionalData: '@import \'~@/styles/variable.less\';'
      }
    }
  },
  // eslint 检测
  lintOnSave: 'error',
  // 对下面这些包也通过babel编译
  // transpileDependencies: [],

  // 配置跨域
  // 还需将 development.js 中base_url_api 设置成'/'
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://test.xxx.com', // 接口的域名
  //       // ws: true, // 是否启用websockets
  //       changOrigin: true, // 开启代理，在本地创建一个虚拟服务端
  //       pathRewrite: {
  //         '^/api': '/'
  //       }
  //     }
  //   }
  // },
};
