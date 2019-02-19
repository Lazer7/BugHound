import Vue from 'vue';
import Router from 'vue-router';
import Homepage from '@/components/pages/Homepage';
import Userpage from '@/components/pages/UserHome';
import ProgramPage from '@/components/pages/ProgramPage';
import EmployeePage from '@/components/pages/EmployeePage';
import Dashboard from '@/components/pages/Dashboard';
import UserBugList from '@/components/pages/UserBugList';
import JoinProgramPage from '@/components/pages/JoinProgramPage';
import CompanyBugList from '@/components/pages/CompanyBugList';
import BugSubmission from '@/components/pages/BugSubmissionPage';
import Area from '@/components/pages/AreaPages';
import SingleBugPage from '@/components/pages/SingleBugPage';
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
        },
        {
          path:'/Main/DashBoard',
          name:'Dashboard',
          component:Dashboard
        },
        {
          path:'/Main/UserBugList',
          name:'UserList',
          component:UserBugList
        },
        {
          path:'/Main/JoinProgram',
          name:'JoinProgram',
          component:JoinProgramPage
        },
        {
          path:'/Main/CompanyBugList',
          name:'CompanyList',
          component:CompanyBugList
        },
        {
          path:'/Main/BugSubmission',
          name:'BugSubmission',
          component:BugSubmission
        },
        {
          path:'/Main/Area',
          name:'Area',
          component:Area
        },
        {
          path:'/Main/Bug',
          name:'SingleBug',
          component:SingleBugPage,
          props:true
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
    },
    {
      path:'*',
      name:'Error',
      meta:{
        title:"Error"
      },
      component:Homepage
    }
  ]
});
