export const ADD_STOCK = 'ADD_STOCK';
export const UPDATE_STOCK = 'UPDATE_STOCK';

export default {
  state: {
    visible: false,
    stocks: JSON.parse(localStorage.getItem('STOCKS')) || [{ code: 'sh000001' }]
  },
  mutations: {
    [ADD_STOCK](state, isShow) {
      state.visible = isShow;
    },
    [UPDATE_STOCK](state, stocks) {
      state.stocks = stocks;
      localStorage.setItem('STOCKS', JSON.stringify(stocks));
    }
  },
  actions: {
    show({ commit }) {
      commit(ADD_STOCK, true);
    },
    hide({ commit }) {
      commit(ADD_STOCK, false);
    },
    update({ commit }, stocks) {
      commit(UPDATE_STOCK, stocks);
    }
  },
};
