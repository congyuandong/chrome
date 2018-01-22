import Vue from 'vue';
import ElementUI from 'element-ui';
import 'normalize.css/normalize.css';
import 'element-ui/lib/theme-chalk/index.css';
import App from '../component/popup.vue';
import store from '../store';

Vue.use(ElementUI);

Vue.filter('formatPrice', (price) => {
  return price > 1000 ? parseInt(price, 10) : price;
});

Vue.filter('formatRate', (rate) => {
  if (!isNaN(rate)) {
    return `| ${rate}`;
  }
  return '';
});

Vue.filter('formatRateBracket', (rate) => {
  if (!isNaN(rate)) {
    return ` (${rate}%)`;
  }
  return '';
});

const app = new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
