const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    outputDir: process.env.NODE_ENV === "development" ? 'devdist' : 'dist', // 不同的环境打不同包名
    publicPath: './',
    productionSourceMap: false,
    chainWebpack: (config) => {
        config.plugin('define').tap((definitions) => {
            const args = definitions[0]['process.env'];
            args.VUE_APP_APP_NAME = JSON.stringify(require('./package.json').name);
            args.VUE_APP_APP_VERSION = JSON.stringify(require('./package.json').version);
            return definitions;
        });
    },
    configureWebpack: {
        resolve: {
            // 添加别名
            alias: {
                'assets': resolve('src/assets'),
                'components': resolve('src/components'),
                'views': resolve('src/views')
            }
        }
    },
    // 关闭eslint
    // lintOnSave: false
    /* 必须对下面这些包也通过babel编译，因为其发布代码语法为es6，不兼容旧版浏览器 */
    // transpileDependencies: [],
};
