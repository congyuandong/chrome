import Vue from 'vue';
import ElementUI from 'element-ui';
import 'normalize.css/normalize.css';
import 'element-ui/lib/theme-default/index.css';
import App from '../component/popup.vue';
import store from '../store';

Vue.use(ElementUI);

const app = new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
