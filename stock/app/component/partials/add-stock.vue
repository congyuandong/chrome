<template>
  <el-dialog title="新增自选" :visible="isVisible" :before-close="close">
    <el-form>
      <el-form-item label="股票名称" :label-width="labelWidth">
        <el-autocomplete
          class="input"
          :fetch-suggestions="querySearch"
          placeholder="股票名称或代码"
          :trigger-on-focus="false"
          v-model="stock.value"
          @select="handleSelect"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="成本价" :label-width="labelWidth">
        <el-input v-model="stock.price"></el-input>
      </el-form-item>
      <el-form-item label="买入数量" :label-width="labelWidth">
        <el-input v-model="stock.amount" placeholder="单位:股"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="hide">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    data() {
      return {
        labelWidth: '100px',
        stock: {
          price: '',
          amount: '',
          value: '',
          code: '',
          name: ''
        }
      };
    },
    watch: {
      isVisible: function (val, oldVal) {
        if (!val) {
          this.stock.price = '';
          this.stock.amount = '';
          this.stock.value = '';
          this.stock.code = '';
          this.stock.name = '';
        }
      }
    },
    methods: {
      ...mapActions([
        'hide',
        'updateStock',
        'updateData',
      ]),
      close() {
        this.hide();
      },
      querySearch(queryString, cb) {
        const regexp = /var suggestvalue="(.*)";/gi;
        const stockArr = [];
        this.$http.get(`http://suggest3.sinajs.cn/suggest/type=11,12,13,14,15&key=${queryString}`).then(data => {
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
        Object.assign(this.stock, item);
      },
      confirm() {
        const stock = { code: this.stock.code };
        if (this.price) {
          stock.amount = this.stock.amount;
          stock.price = this.stock.price;
        }
        this.hide();
        this.updateStock(this.$store.state.stocks.stocks.concat([stock]));
        this.updateData();
      }
    },
    computed: {
      ...mapGetters([
        'isVisible',
      ])
    }
  };
</script>
