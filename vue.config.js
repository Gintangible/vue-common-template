const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    outputDir: process.env.NODE_ENV === "development" ? 'devdist' : 'dist', // 不同的环境打不同包名
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
    lintOnSave: false
};
