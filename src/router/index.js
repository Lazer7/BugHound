import Vue from 'vue';
import Router from 'vue-router';
import Homepage from '@/components/pages/Homepage';
import Userpage from '@/components/pages/UserHome';
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Homepage
    },
    {
      path:'/Main',
      name:'Userpage',
      component:Userpage
    }
  ]
});
