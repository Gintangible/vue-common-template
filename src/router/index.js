import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import store from '@/store';

Vue.use(Router);

import Home from 'views/Home/home';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
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

const WHITE_LIST = ['Login'];

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  if (WHITE_LIST.includes(to.name) || store.state.user.name) {
    next();
  } else {
    next({
      name: 'Login',
    });
  }
});

router.afterEach((to, from, next) => {
  NProgress.done();
  if (next) {
    next();
  }
});

export default router;
