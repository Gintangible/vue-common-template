import Vue from 'vue';
import 'amfe-flexible';
import 'normalize.css/normalize.css';
import '@/styles/scrollbar.css';
import App from './App.vue';
import router from './router/index';
import store from './store';

if (process.env.NODE_ENV !== 'production') {
  require('./mock'); // 引入mockjs
  const eruda = require('eruda');
  eruda.init();
}

// 引入icon
import './icons';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');