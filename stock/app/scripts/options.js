import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import ElementUI from 'element-ui';
import 'normalize.css/normalize.css';
import 'element-ui/lib/theme-default/index.css';
import App from '../component/app.vue';

import Options from '../component/options.vue';
import Stock from '../component/stock.vue';
import store from '../store';

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(ElementUI);

const routes = [{
  path: '/',
  component: Options,
  children: [{
    path: 'stock',
    component: Stock
  }, {
    path: '*',
    component: Stock
  }]
}];

const router = new VueRouter({
  routes,
});

const app = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
