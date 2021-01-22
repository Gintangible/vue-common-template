// https://github.com/michael-ciniawsky/postcss-load-config
module.exports = {
  plugins: {
    // 兼容浏览器，添加前缀
    autoprefixer: {
      overrideBrowserslist: [
        'Android 4.1',
        'iOS 7.1',
        'Chrome > 31',
        'ff > 31',
        'ie >= 8',
        'last 10 versions', // 所有主流浏览器最近10版本用
      ]
    },
    'postcss-pxtorem': {
      rootValue: 37.5, // 结果为：设计稿元素尺寸/37.5，比如元素宽375px,最终页面会换算成 10rem
      propList: ['*'], // 是一个存储哪些将被转换的属性列表，这里设置为['*']全部，假设需要仅对边框进行设置，可以写['*', '!border*']
      // unitPrecision: 5, //保留rem小数点多少位
      // mediaQuery: false, //媒体查询( @media screen 之类的)中不生效
      // minPixelValue: 12, //px小于12的不会被转换
    }
  }
};
