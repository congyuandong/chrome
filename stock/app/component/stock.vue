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
      <el-table-column
        label="操作"
        width="100">
        <template scope="scope">
          <i class="el-icon-delete black" @click="delStock(scope.row.code)"></i>
          <i class="el-icon-arrow-up black" @click="upStock(scope.row.code)"></i>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style>
  .red {
    color: red;
  }

  .black {
    color: #48576a;
    cursor: pointer;
    margin-right: 10px;
  }

  .green {
    color: green;
  }
</style>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    data() {
      return {};
    },
    mounted() {
      this.updateData();
      setInterval(this.updateData, 5000);
    },
    methods: {
      ...mapActions([
        'updateData',
        'updateStock',
      ]),
      showColor(row) {
        if (row.changeAmt >= 0) {
          return 'red';
        }
        return 'green';
      },
      delStock(code) {
        this.updateStock(this.$store.state.stocks.stocks.filter(s => s.code !== code));
      },
      upStock(code) {
        const stocks = this.$store.state.stocks.stocks;
        const index = stocks.findIndex(s => s.code === code);
        if (index > 0) {
          stocks[index] = stocks.splice(index - 1, 1, stocks[index])[0];
          this.$store.dispatch('update', stocks);
          this.loadStocks();
        }
      }
    },
    computed: {
      ...mapGetters({
        'stocks': 'stockData',
      })
    }
  };
</script>
