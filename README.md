# vue-h5-template

参考 [vue-h5-template](https://github.com/sunniejs/vue-h5-template) 的模板，实现个人的开发模板。

### 启动项目

```
git clone https://github.com/sunniejs/vue-h5-template.git

cd vue-h5-template

yarn

yarn serve
```

<span id="top">目录</span>

- [x] [配置多环境变量](#env)
- [] [rem 适配](#rem)
- [] [eruda 移动端 log](#eruda)
- [] [vantUI 按需加载](#vant)
- [] [Vuex 状态管理](#vuex)
- [] [Vue-router](#router)
- [] [Axios 封装及接口管理](#axios)
- [] [Eslint + Pettier 统一开发规范](#pettier)


### <span id="env">配置多环境变量</span>

`package.json` 里的 `scripts` 配置 serve build，通过 `--mode xxx` 来执行不同环境。

- `yarn serve` 启动本地
- `yarn stage` 打包测试
- `yarn build` 打包正式

```json
"serve": "vue-cli-service serve",
"serve:prod": "vue-cli-service serve --mode production",
"stage": "vue-cli-service build --mode stage",
"build": "vue-cli-service build --mode production",
```

##### 配置介绍

`.env.xx` 中变量要以 `VUE_APP_` 开头，在代码中可以通过 `process.env.VUE_APP_` 访问。

在项目根目录中新建`.env.*`

> .env.development  本地开发环境配置

```
NODE_ENV=development
```

`.env.stage` 、`.env.production` 类似 `.env.development`。在这里只定义了基础的 `VUE_APP_ENV`, 其他变量统一放在 `src/config/env.*.js` 中进行管理。（**修改起来方便，不需要重启项目，符合开发习惯**。）

[▲ 回顶部](#top)
