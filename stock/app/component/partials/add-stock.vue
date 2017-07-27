<template>
  <el-dialog title="新增自选" :visible.sync="isVisible">
    <el-form>
      <el-form-item label="股票名称" :label-width="formLabelWidth">
        <el-autocomplete
          class="input"
          :fetch-suggestions="querySearch"
          placeholder="股票名称或代码"
          :trigger-on-focus="false"
          v-model="value"
          @select="handleSelect"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="成本价" :label-width="formLabelWidth">
        <el-input v-model="price"></el-input>
      </el-form-item>
      <el-form-item label="买入数量" :label-width="formLabelWidth">
        <el-input v-model="amount" placeholder="单位:股"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="hide">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        price: '',
        amount: '',
        value: '',
        formLabelWidth: '100px',
        code: '',
        name: ''
      };
    },
    methods: {
      hide() {
        this.$store.dispatch('hide');
      },
      querySearch(queryString, cb) {
        const regexp = /var suggestvalue="(.*)";/gi;
        const stockArr = [];
        this.$http.get(`http://suggest3.sinajs.cn/suggest/key=${queryString}`).then(data => {
          const match = regexp.exec(data.bodyText);
          if (match) {
            const stockStr = match[1];
            const stockList = stockStr.split(';');
            stockList.forEach(s => {
              s = s.split(',');
              if (s.length === 6) {
                stockArr.push({
                  value: `${s[4]}(${s[3]})`,
                  code: s[3],
                  name: s[4]
                })
              }
            });
          }
          cb(stockArr.slice(0, 5));
        });
      },
      handleSelect(item) {
        Object.assign(this, item);
      },
      confirm() {
        const stock = { code: this.code };
        if (this.price) {
          stock.amount = this.amount;
          stock.price = this.price;
        }
        this.$store.dispatch('update', this.$store.state.addStock.stocks.concat([stock]));
        this.hide();
      }
    },
    computed: {
      isVisible() {
        return this.$store.state.addStock.visible;
      }
    }
  };
</script>
