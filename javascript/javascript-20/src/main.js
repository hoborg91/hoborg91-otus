import Vue from 'vue';
import VueRouter from 'vue-router';

import store from './store.js';
import router from './routes.js';
import App from './App.vue';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

Vue.use(VueRouter);

new Vue({
    render: h => h(App),
    router,
    vuetify,
    store
}).$mount('#app');
