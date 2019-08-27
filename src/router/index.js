import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import Layout from 'views/layout/Layout';

export const routers = [
    {
        path: '/',
        name: 'Layout',
        component: Layout,
        redirect: 'Progress',
    },
    {
        path: '',
        component: Layout,
        children: [
            {
                path: '/progress',
                name: 'Progress',
                component: () => import('components/Progress'),
            }
        ]
    }
];

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: routers
});
