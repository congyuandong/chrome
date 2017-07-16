<template>
  <el-table
    :data="stocks"
    :gutter="20"
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
</template>

<script>
    export default {
      data() {
        return {
          stocks: [],
        };
      },
      mounted() {
        this.pull();
        setInterval(this.pull, 5000);
      },
      methods: {
        pull() {
          const _this = this;
          _this.getStockInfo('sh000001', (x1) => {
            _this.stocks = [x1];
          });
        },
        getStockInfo(stockCode, f){
		      const xhr = new window.XMLHttpRequest();

		      xhr.open("GET", "http://hq.sinajs.cn/list=" + stockCode, true);
		      xhr.onreadystatechange = () => {
			      let stockInfo = {};
			      let stockName = '';

			      if (xhr.readyState == 4) {
				      let elements = xhr.responseText.split(/_|="|,|"/);

				      if (elements.length > 5) {
						    stockInfo = {
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

						    if (stockInfo.startPrice != 0) {
							    stockInfo.changeAmt = parseFloat(stockInfo.currentPrice - stockInfo.closePrice).toFixed(2);
							    stockInfo.changeRate = (parseFloat(stockInfo.changeAmt / stockInfo.closePrice)*100).toFixed(2);
					  	  }
              }

				      if (typeof f == "function") {
					      f(stockInfo);
				      }
			      }
		      }
		      xhr.send();
        }
      }
    };
</script>
