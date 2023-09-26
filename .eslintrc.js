module.exports = {
  // 当前配置文件不能往父级查找
  root: true,
  // 指定环境的全局变量
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    // 校验vue组件，需要安装 eslint-plugin-vue
    'plugin:vue/recommended',
  ],
  rules: {
    // 强制每行的最大属性数
    'vue/max-attributes-per-line': [2, {
      // 单行时可以接收最大数量
      singleline: 3,
      // 多行时可以接收最大数量
      multiline: {
        max: 1,
      },
    }],
    // 强制类方法使用 this
    'class-methods-use-this': 'off',
    // 要求或禁止末尾逗号
    'comma-dangle': ['error', 'only-multiline'],
    // 要求 require() 出现在顶层模块作用域中
    'global-require': 'off',
    // https://github.com/benmosher/eslint-plugin-import
    'import/default': 'error',
    'import/export': 'error',
    'import/extensions': 'off',
    'import/first': 'off',
    'import/named': 'error',
    'import/namespace': 'error',
    'import/no-extraneous-dependencies': 'off',
    'import/no-named-as-default': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    // 强制行的最大长度
    'max-len': ['warn', {
      code: 120,
      tabWidth: 2,
      ignoreComments: true,
      ignoreTrailingComments: true,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true,
    }],
    // 禁用 console
    'no-console': 'off',
    // 禁用 debugger
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 禁止 if 语句中 return 语句之后有 else 块
    'no-else-return': 'off',
    // 禁止不规则的空白
    'no-irregular-whitespace': 'off',
    'no-lonely-if': 'off',
    // 禁止使用 new 以避免产生副作用
    'no-new': 'off',
    // 不允许空格和 tab 混合缩进
    'no-mixed-spaces-and-tabs': 2,
    // 禁止使用多个空格
    'no-multi-spaces': ['error', { ignoreEOLComments: true }],
    // 禁止对 function 的参数进行重新赋值
    'no-param-reassign': 'off',
    // 禁用一元操作符 ++ 和 --
    'no-plusplus': 'off',
    // 禁用特定的语法
    'no-restricted-syntax': 'off',
    // 禁止变量声明与外层作用域的变量同名
    'no-shadow': 'off',
    // 禁止标识符中有悬空下划线
    'no-underscore-dangle': 'off',
    // 优先使用数组和对象解构
    'prefer-destructuring': 'error',
    // 要求或禁止使用分号代替 ASI
    semi: [2, 'always'],
    // 强制在注释中 // 或 /* 使用一致的空格
    'spaced-comment': ['error', 'always', { exceptions: ['*'] }],
  },
  // 指定javaScript语言类型和风格
  parserOptions: {
    // eslint解析器
    parser: 'babel-eslint',
  }
};
