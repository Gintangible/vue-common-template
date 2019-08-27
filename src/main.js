import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store';
import './styles/index.scss';

require('./mock'); // 引入mockjs

// 引入icon
import './icons';

import 'normalize.css/normalize.css';

console.log(process.env.VUE_APP_URL)

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')