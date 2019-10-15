import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
//<Layout/>
export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
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
          path: '/archive',
          name: 'archive',
          component: () => import(/* webpackChunkName: "login" */'./views/Archive.vue'),
        },
        {
          path: '/category',
          name: 'category',
          component: () => import(/* webpackChunkName: "login" */'./views/Category.vue'),
        },
        {
          path: '/tag',
          name: 'tag',
          component: () => import(/* webpackChunkName: "login" */'./views/Tag.vue'),
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */'./views/Login.vue'),
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import(/* webpackChunkName: "login" */'./views/blog/index.vue'),
    },
    {
      path: '/redirect/:path*',
      name: 'blog',
      component: () => import(/* webpackChunkName: "login" */'./views/redirect/index.vue'),
    }
  ]
});
