// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/index.js';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import 'bulma/css/bulma.css';
import 'bulma-extensions';
import Icon from 'vue-awesome/components/Icon';
import VueDragDrop from 'vue-drag-drop';
 
Vue.use(VueDragDrop);
Vue.component('v-icon', Icon);
Vue.use(Buefy,{
  defaultIconPack: 'fa'
});
Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  store:store,
  template: '<App/>'
})
