module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    // 引入 vant 样式
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true,
      // style: (name) => `${name}/style/less`
    }, 'vant']
  ]
};
