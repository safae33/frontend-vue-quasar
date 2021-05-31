import { RouteRecordRaw } from 'vue-router';
import { LocalStorage } from 'quasar';

// import StoreClass from 'src/services/mockService';

// const Store = new StoreClass();

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: () => {
      if (LocalStorage.getItem('token') == null) return { path: '/auth' };
    },
    // beforeEnter: (to, from, next) => {
    //   if (Store.isAuth.value) {
    //     next({ path: to.path });
    //   } else {
    //     next({ path: '/auth' });
    //   }
    // },
    children: [
      {
        path: '',
        name: 'Giriş',
        component: () => import('pages/Dashboard.vue'),
      },
      {
        path: '1',
        name: 'İşlem Geçmişi',
        component: () => import('pages/Dashboard.vue'),
      },
      {
        path: 'accounts',
        name: 'Tüm Hesaplar',
        component: () => import('pages/AllAccounts.vue'),
      },
    ],
  },
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Auth.vue') },
      {
        path: 'AddAccountExternal/:taskId',
        component: () => import('pages/AddAccountExternal.vue'),
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
