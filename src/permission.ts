import router from './router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
// import { Message } from 'element-ui';
import { Route } from 'vue-router';
import Cookies from 'js-cookie';

// NProgress.configure({ showSpinner: false });
const whiteList = ['/login', '/auth-redirect']

router.beforeEach(async(to: Route, _: Route, next: any) => {
  NProgress.start();
  if(Cookies.get('token')) {
    if(to.path == 'login') {
      next({ path: '/' });
      NProgress.done();
    } else {
      next();
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
});

router.afterEach((to: Route) => {
  // Finish progress bar
  NProgress.done()
})



