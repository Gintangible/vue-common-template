const path = require('path');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, dir);
}

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
  chainWebpack: (config) => {
    config.plugin('define').tap((definitions) => {
      const args = definitions[0]['process.env'];
      args.VUE_APP_APP_VERSION = `"${process.env.npm_package_version}"`;
      return definitions;
    });
    if (process.env.speedPlugin) {
      config.plugins.push(new SpeedMeasurePlugin({
        outputFormat: 'human'
      }));
    }
  },
  // 简单配置
  configureWebpack: {
    name: process.env.npm_package_name,
    resolve: {
      // 设置路径别名
      alias: {
        '@': resolve('src'),
        views: resolve('src/views'),
        api: resolve('src/api'),
        assets: resolve('src/assets'),
        components: resolve('src/components'),
      }
    },
    output: {
      sourceMapFilename: 'sourceMap/[name].[chunkhash].js.map',
    },
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
