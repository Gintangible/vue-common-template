const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  // 署应用包时的基本 URL。 hash 模式使用
  publicPath: './',
  // 署应用包时的基本 URL。history模式使用
  // publicPath: '/app/',
  // 构建文件的目录
  outputDir: process.env.NODE_ENV === "stage" ? 'stage' : 'dist',
  assetsDir: 'static',
  // 生产环境构建生成 source map
  productionSourceMap: false,
  // 文件名哈希
  filenameHashing: true,
  // 高级设置, 控制其内部配置
  chainWebpack: (config) => {
    // 设置路径别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('views', resolve('src/views'))
      .set('api', resolve('src/api'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'));

    config.plugin('define').tap((definitions) => {
      const args = definitions[0]['process.env'];
      args.VUE_APP_APP_VERSION = JSON.stringify(require('./package.json').version);
      return definitions;
    });
  },
  // 简单配置
  configureWebpack: (config) => {
    if (process.env.use_analyzer) {
      config.plugins.push(new BundleAnalyzerPlugin());
    }
  },
  css: {
    sourceMap: false,
    loaderOptions: {
      scss: {
        additionalData: `
          @import '@/styles/variable.scss';
          @import '@/styles/mixins.scss';
          `,
      },
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
  //     //
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
