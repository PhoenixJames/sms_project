import Vue from 'vue';
import VueRouter from 'vue-router';
import SendSms from '../views/SendSms.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'SendSms',
    component: SendSms,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
