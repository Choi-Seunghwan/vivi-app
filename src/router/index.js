import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/Home.vue';
import Login from '@/pages/Login.vue';
import LiveRoom from '@/pages/LiveRoom.vue';
import CreateLiveRoom from '@/pages/CreateLiveRoom.vue';
import NotFound from '@/pages/NotFound.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'main',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/live-room/:roomId',
      name: 'liveRoom',
      component: LiveRoom
    },
    {
      path: '/create-live-room',
      name: 'createLiveRoom',
      component: CreateLiveRoom
    },
    {
      path: '*',
      name: 'notfound',
      component: NotFound
    }
  ]
});
