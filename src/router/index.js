import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import Home from 'views/home/home';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('views/login'),
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('views/test.vue'),
  },
  {
    path: '*',
    name: 'Error404',
    component: () => import('views/error404.vue'),
  },
];

const router = new Router({
  routes,
});

export default router;
