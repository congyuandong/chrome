import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import {
  Container,
  Header,
  Aside,
  Main,
  Menu,
  MenuItem,
  Table,
  TableColumn,
} from 'element-ui';
import 'normalize.css/normalize.css';
import 'element-ui/lib/theme-chalk/index.css';
import '../styles/iconfont.css';
import App from '../component/app.vue';

import Options from '../component/options.vue';
import Stock from '../component/stock.vue';
import store from '../store';

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Menu);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(MenuItem);
Vue.use(Table);
Vue.use(TableColumn);

Vue.config.devtools = true;
Vue.config.debug = true;

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
