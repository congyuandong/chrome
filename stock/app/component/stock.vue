<template>
  <div>
    <el-table
    :data="stocks"
    :gutter="20"
    :row-class-name="showColor"
    style="width: 100%">
    <el-table-column
      prop="name"
      label="股票名称">
    </el-table-column>
    <el-table-column
      prop="code"
      label="股票代码">
    </el-table-column>
    <el-table-column
      prop="changeRate"
      label="涨跌幅">
    </el-table-column>
    <el-table-column
      prop="currentPrice"
      label="当前价">
    </el-table-column>
    <el-table-column
      prop="startPrice"
      label="今开价">
    </el-table-column>
    <el-table-column
      prop="closePrice"
      label="昨收价">
    </el-table-column>
    <el-table-column
      prop="maxPrice"
      label="最高价">
    </el-table-column>
    <el-table-column
      prop="minPrice"
      label="最低价">
    </el-table-column>
  </el-table>
  </div>
</template>

<style>
  .red {
    color: red;
  }
  .green {
    color: green;
  }
</style>

<script>
  export default {
    data() {
      return {
        stocks: [],
      };
    },
    mounted() {
      this.loadStocks();
      setInterval(this.loadStocks, 5000);
    },
    methods: {
      showColor(row) {
        if (row.changeAmt >= 0) {
          return 'red';
        }
        return 'green';
      },
      loadStocks() {
        const _this = this;
        Settings.setObject('STOCKS', [{code: 'sh000001'}, {code: 'sh600131'}]);

        const stocks = Settings.getObject('STOCKS');
        const stockCodes = stocks.map(s => s.code);

        _this.getStocksFromSina(stockCodes.join(','), (stockObjs) => {
          const stockList = [];
          stockCodes.forEach(c => {
            if (stockObjs[c]) {
              stockList.push(stockObjs[c]);
            }
          });
          _this.stocks = stockList;
        });
      },
      updateStocks() {

      },
      getStocksFromSina(stockCodes, f) {
        const xhr = new window.XMLHttpRequest();

        xhr.open("GET", "http://hq.sinajs.cn/list=" + stockCodes, true);
        xhr.onreadystatechange = () => {
          const stockInfo = {};

          if (xhr.readyState == 4) {
            const stockStrList = xhr.responseText.split('\n');
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
                  stockInfo[stockCode].changeRate = `${(parseFloat(stockInfo[stockCode].changeAmt / stockInfo[stockCode].closePrice) * 100).toFixed(2)}%`;
                }
              }
            }
            if (typeof f == "function") {
              f(stockInfo);
            }
          }
        };
        xhr.send();
      }
    }
  };
</script>
