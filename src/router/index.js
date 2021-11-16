import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import('@/components/layout/Layout.vue'),
    children: [
      {
        path: '/',
        component: () => import('@/views/Dashboard.vue'),
        name: 'Dashboard',
      },
      {
        path: '/providers/:id',
        component: () => import('@/views/Providers.vue'),
        name: 'Providers',
      },
      {
        path: '/payment/:category/:id',
        component: () => import('@/views/PaymentForm.vue'),
        name: 'Payments',
      },
      {
        path: '/result',
        component: () => import('../views/Result.vue'),
        name: 'ResultPage',
      },
      {
        path: '/dummyPage',
        component: () => import('../views/DummyPage.vue'),
        name: 'dummyPage',
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});



export default router;
