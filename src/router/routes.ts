import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: () => {
      // return {path:'auth'}
      return true;
    },
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
    children: [{ path: '', component: () => import('pages/Auth.vue') }],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
