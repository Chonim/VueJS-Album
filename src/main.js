require('./assets/uniclust.less');

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

Vue.use(VueRouter);
Vue.use(VueResource);

Vue.url.options.root = '/';
Vue.http.options.root = 'https://jsonplaceholder.typicode.com/albums';

import App from './App.vue';
import Cards from './Cards.vue';

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: Cards },
    ],
    linkActiveClass: 'active'
});

const app = new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
