import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import Home from '@/views/layout/Home.vue';
import Login from '@/views/layout/Login.vue';
import getMenuRoutes from '@/utils/permission';

Vue.use(VueRouter);

const asyncRouterMap = [
  {
    path: '/product',
    name: 'Product',
    component: Home,
    meta: {
      title: '商品',
    },
    children: [
      {
        path: 'list',
        name: 'ProductList',
        component: import('@/views/page/productList.vue'),
        meta: {
          title: '商品列表',
        },
      },
      {
        path: 'add',
        name: 'ProductAdd',
        component: import('@/views/page/productAdd.vue'),
        meta: {
          title: '添加商品',
        },
      },
      {
        path: 'category',
        name: 'Category',
        component: import('@/views/page/category.vue'),
        meta: {
          title: '类目管理',
        },
      },
    ],
  },
];

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页',
    },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/page/index.vue'),
        meta: {
          title: '统计',
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录',
    },
  },
];

const router = new VueRouter({
  routes,
});

let isAddRoutes = false;
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (store.state.user.username && store.state.user.appkey && store.state.user.role) {
      if (!isAddRoutes) {
        const menuRoutes = getMenuRoutes(store.state.user.role, asyncRouterMap);
        router.addRoutes(menuRoutes);
        store.dispatch('changeMenuRoutes', routes.concat(menuRoutes));
        isAddRoutes = true;
      }
      return next();
    }
    return next('/login');
  }
  return next();
});

export default router;
