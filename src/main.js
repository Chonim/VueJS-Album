// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'expose-loader?$!expose-loader?jQuery!jquery'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import Vue from 'vue'
import App from './App'
import Cards from './Cards';
import router from './router'
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(VueResource);

Vue.url.options.root = '/';
Vue.http.options.root = 'https://jsonplaceholder.typicode.com/albums';



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<Cards/>',
  components: { Cards }
})
