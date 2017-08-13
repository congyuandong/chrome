import API from '../../api';

export const ADD_STOCK = 'ADD_STOCK';
export const ADD_ALERT = 'ADD_ALERT';
export const UPDATE_STOCK = 'UPDATE_STOCK';
export const UPDATE_DATA = 'UPDATE_DATA';

export default {
  state: {
    showAdd: false,
    showAlert: false,
    stocks: JSON.parse(localStorage.getItem('STOCKS')) || [{ code: 'sh000001' }],
    stockData: {},
  },
  getters: {
    showAdd(state) {
      return state.showAdd;
    },
    showAlert(state)  {
      return state.showAlert;
    },
    stockData(state) {
      const stockList = [];
      const codes = state.stocks.map(s => s.code);
      codes.forEach(c => {
        if (state.stockData[c]) {
          stockList.push(state.stockData[c]);
        }
      });
      return stockList;
    }
  },
  mutations: {
    [ADD_STOCK](state, isShow) {
      state.showAdd = isShow;
    },
    [UPDATE_STOCK](state, stocks) {
      state.stocks = stocks;
      localStorage.setItem('STOCKS', JSON.stringify(stocks));
    },
    [UPDATE_DATA](state, stockData) {
      state.stockData = stockData;
    }
  },
  actions: {
    updateStock({ commit }, stocks) {
      commit(UPDATE_STOCK, stocks);
    },
    updateData({ commit, state }) {
      API.getStocks(state.stocks).then(response => {
        const stockInfo = {};
        if (response.ok) {
          const stockStrList = response.bodyText.split('\n');
          for (let stockStr of stockStrList) {
            let elements = stockStr.split(/_|="|,|"/);
            if (elements.length > 5) {
              const stockCode = elements[2];
              stockInfo[stockCode] = {
                code: elements[2],
                name: elements[3],
                startPrice: parseFloat(elements[4]).toFixed(2),
                closePrice: parseFloat(elements[5]).toFixed(2),
                currentPrice: parseFloat(elements[6]).toFixed(2),
                maxPrice: parseFloat(elements[7]).toFixed(2),
                minPrice: parseFloat(elements[8]).toFixed(2),
                stockVolume: (parseInt(elements[11]) / 100).toFixed(),
                stockTurnover: (parseInt(elements[12]) / 10000).toFixed(),
                stockLastDate: elements[33],
                stockLastTime: elements[34],
                stockChangeAmt: "0.00",
                stockChangeRate: "0.00"
              };

              if (stockInfo[stockCode].startPrice != 0) {
                stockInfo[stockCode].changeAmt = parseFloat(stockInfo[stockCode].currentPrice - stockInfo[stockCode].closePrice).toFixed(2);
                stockInfo[stockCode].changeRate = (parseFloat(stockInfo[stockCode].changeAmt / stockInfo[stockCode].closePrice) * 100).toFixed(2);
              }
            }
          }
        }
        commit(UPDATE_DATA, stockInfo);
      });
    },
    // show add stock dialog
    show({ commit }, obj) {
      commit(obj, true);
    },
    hide({ commit }, obj) {
      commit(obj, false);
    },
  },
};
