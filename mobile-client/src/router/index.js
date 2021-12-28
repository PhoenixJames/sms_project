import Vue from 'vue';
import VueRouter from 'vue-router';
import GetSms from '../views/GetSms.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'GetSms',
    component: GetSms,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
