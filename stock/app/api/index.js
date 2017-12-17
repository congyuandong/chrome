'use strict';

import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

const TYPES = {
  STOCK: '11,12,13,14,15',
  FUND: '21,22,23,24,25,26',
  ALL: '',
};

export default {
  getStocks: (stocks) => {
    const codes = stocks.map(s => s.code).join(',');
    return Vue.resource(`http://hq.sinajs.cn/list=${codes}`).get();
  },
  getSuggest: (type = 'STOCK', key) => {
    return Vue.resource(`http://suggest3.sinajs.cn/suggest/type=${TYPES[type]}&key=${key}`).get();
  },
}
