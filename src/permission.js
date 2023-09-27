import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import setDocumentTitle from '@/utils/set-document-title';
import { getAuthToken } from '@/services/auth';
import router from './router';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ['/login']; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();

  // set page title
  if (to.meta.title) {
    setDocumentTitle(to.meta.title);
  }

  // determine whether the user has logged in
  const hasToken = getAuthToken();

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' });
    } else {
      next();
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
