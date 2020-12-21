import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';

Vue.use(Router);

import Home from 'views/Home/home';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '*',
        name: 'Error404',
        component: () => import('views/error404.vue'),
    }
];

const router = new Router({
    routes,
});

router.beforeEach((to, from, next) => {
    NProgress.start();
    if (next) {
        next();
    }
});

router.afterEach((to, from, next) => {
    NProgress.done();
    if (next) {
        next();
    }
});

export default router;
