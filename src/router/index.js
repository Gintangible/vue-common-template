import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import Layout from 'views/layout/Layout';

export const componentRouters = [
    {
        path: '/',
        // name: 'Layout',
        component: Layout,
        hidden: true,
        redirect: 'progress',
        children: [
            {
                path: 'progress',
                name: 'ProgressDemo',
                component: () => import('views/progress/index'),
            }
        ]
    },
];

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: componentRouters
});
