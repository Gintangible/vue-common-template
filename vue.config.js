const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
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
