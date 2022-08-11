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
      hidden: false,
      icon: 'inbox',
    },
    children: [
      {
        path: 'list',
        name: 'ProductList',
        component: import('@/views/page/productList.vue'),
        meta: {
          title: '商品列表',
          hidden: false,
          icon: 'unordered-list',
        },
      },
      {
        path: 'add',
        name: 'ProductAdd',
        component: import('@/views/page/productAdd.vue'),
        meta: {
          title: '添加商品',
          hidden: false,
          icon: 'file-add',
        },
      },
      {
        path: 'edit/:id',
        name: 'ProductEdit',
        component: import('@/views/page/productAdd.vue'),
        meta: {
          title: '编辑商品',
          hidden: true,
          icon: 'file-add',
        },
      },
      {
        path: 'category',
        name: 'Category',
        component: import('@/views/page/category.vue'),
        meta: {
          title: '类目管理',
          hidden: false,
          icon: 'project',
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
    redirect: '/index',
    meta: {
      title: '首页',
      hidden: false,
      icon: 'home',
    },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/page/index.vue'),
        meta: {
          title: '统计',
          hidden: false,
          icon: 'number',
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
      hidden: true,
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
        store.dispatch('changeMenuRoutes', routes.concat(menuRoutes)).then(() => {
          router.addRoutes(menuRoutes);
          next();
        });
        isAddRoutes = true;
      }
      return next();
    }
    return next('/login');
  }
  return next();
});

export default router;
