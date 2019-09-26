import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
//<Layout/>
export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */'./views/Login.vue'),
    },
    {
      path: '/',
      component: () => import('./components/Layout.vue'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('./views/Home.vue')
        },
        {
          path: '/log',
          name: 'login',
          component: () => import(/* webpackChunkName: "login" */'./views/Login.vue'),
        },
      ]
    }
  ],
});
