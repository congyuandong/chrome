export const ADD_STOCK = 'ADD_STOCK';

export default {
  state: {
    visible: false,
  },
  mutations: {
    [ADD_STOCK](state, isShow) {
      state.visible = isShow;
    }
  },
  actions: {
    show({ commit }) {
      commit(ADD_STOCK, true);
    },
    hide({ commit }) {
      commit(ADD_STOCK, false);
    },
  },
};
