const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  outputDir: process.env.NODE_ENV === "development" ? 'devdist' : 'dist', // 不同的环境打不同包名
  assetsDir: 'static',
  publicPath: './',
  // 生产环境构建生成 source map
  productionSourceMap: false,
  // 文件名哈希
  filenameHashing: true,
  chainWebpack: (config) => {
    // 对@/icons 文件夹下的 svg 图标进行自动注册，文件全部打包成 svg-sprite。
    // config.module
    //   .rule('svg')
    //   .exclude.add(resolve('src/icons/svg'))
    //   .end();
    // config.module
    //   .rule('icons')
    //   .test(/\.svg$/)
    //   .include.add(resolve('src/icons/svg'))
    //   .end()
    //   .use('svg-sprite-loader')
    //   .loader('svg-sprite-loader');
    // 设置路径别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('views', resolve('src/views'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'));

    config.plugin('define').tap((definitions) => {
      const args = definitions[0]['process.env'];
      args.VUE_APP_APP_NAME = JSON.stringify(require('./package.json').name);
      args.VUE_APP_APP_VERSION = JSON.stringify(require('./package.json').version);
      return definitions;
    });
  },
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
};
