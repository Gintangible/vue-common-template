import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import Layout from 'views/layout/home';

export const routes = [
    {
        path: '/',
        name: 'Layout',
        component: Layout,
    },
];

export default new Router({
    mode: 'history',
    routes,
});
