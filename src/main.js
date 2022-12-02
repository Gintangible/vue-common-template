import Vue from 'vue';
import { Dialog } from 'vant';
import 'amfe-flexible';
// import * as Sentry from '@sentry/vue';
// import { BrowserTracing } from '@sentry/tracing';
import 'normalize.css/normalize.css';
import '@/styles/scrollbar.css';
import config from '@/config';
import App from './App.vue';
import router from './router/index';
import store from './store';
import '@/permission';

if (process.env.NODE_ENV !== 'production') {
  Dialog.alert({
    title: '注意',
    message: `您正在使用${config.title} ${config.app_version}测试版`,
  });
  const eruda = require('eruda');
  eruda.init();
  // 引入mockjs
  if (config.mocking) {
    require('./mock');
  }
} else {
  console.log(`${config.title} ${config.app_version}`);
}

// if (process.env.NODE_ENV === 'production') {
//   Sentry.init({
//     Vue,
//     environment: process.env.NODE_ENV,
//     dsn: 'https://560d581fcd4446e5ae7ded98ae7575fd@sentry.njzhyl.cn/5',
//     integrations: [
//       new BrowserTracing({
//         routingInstrumentation: Sentry.vueRouterInstrumentation(router),
//         tracingOrigins: ['localhost', 'njzhyl.cn', /^\//],
//       }),
//     ],
//     release: config.app_version,
//     tracesSampleRate: 1.0,
//   });
// }

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
