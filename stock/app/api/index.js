'use strict';

import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

export default {
  getStocks: (stocks) => {
    const codes = stocks.map(s => s.code).join(',');
    return Vue.resource(`http://hq.sinajs.cn/list=${codes}`).get();
  }
}
