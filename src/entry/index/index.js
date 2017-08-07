import Vue from 'vue';
import Vuex from 'vuex';

import Router from 'src/components/router/index.vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Index from 'src/components/pages/index/index.vue';

import store from './store';

const routes = [
    { path: '/', component: Index },
];

const router = new VueRouter({
    routes
});

Vue.config.productionTip = false;
store.state.router = router;

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(Router)
});
