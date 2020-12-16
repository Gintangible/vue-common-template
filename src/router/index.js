import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';

Vue.use(Router);

import Layout from 'views/layout/home';

export const routes = [
    {
        path: '/',
        name: 'Layout',
        component: Layout,
    },
];

router.beforeEach(() => {
    NProgress.start();
});

router.afterEach(() => {
    NProgress.done();
});


export default new Router({
    mode: 'history',
    routes,
});
