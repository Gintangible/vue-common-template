import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store';
import 'normalize.css/normalize.css';

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