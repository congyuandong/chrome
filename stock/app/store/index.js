import Vue from 'vue';
import Vuex from 'vuex';
import addStock from './modules/addStock';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  modules: {
    addStock,
  }
})
