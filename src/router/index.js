import Vue from 'vue';
import Router from 'vue-router';
import Homepage from '@/components/pages/Homepage';
import Userpage from '@/components/pages/UserHome';
import ProgramPage from '@/components/pages/ProgramPage';
import EmployeePage from '@/components/pages/EmployeePage';
import store from '../store/index';
Vue.use(Router);
Vue.use(store);

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Homepage
    },
    {
      path:'/Main',
      name:'Userpage',
      component:Userpage,
      children:[
        {
          path: '/Main/Programs',
          name: 'Programs',
          component: ProgramPage
        },
        {
          path: '/Main/Employee',
          name:'Employee',
          component: EmployeePage
        }
      ],
      beforeEnter:(to,from,next)=>{
        if(store.getters['userInfo/LoggedIn']){
          next();
        }
        else{
          next('/');
        }
      }
    }
  ]
});
