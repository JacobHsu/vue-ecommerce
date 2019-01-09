// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap'
import router from './router'

Vue.config.productionTip = false
Vue.use(VueAxios, axios);

axios.defaults.withCredentials = true;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  console.log(to, from, next);
  if(to.meta.requiresAuth) {
    //console.log('requiresAuth!');
    const api = `${process.env.APIPATH}/api/user/check`; 
    const vm = this;
    axios.post(api, vm.user).then((response) => {
      console.log(response.data)
      if(response.data.success) {
        next();
      } else {
        next({
          path: '/login',
        });
      }
    })
  } else {
    next();
  }
 
})