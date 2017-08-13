<template>
  <el-dialog title="监控设置" :visible="showAlert" :before-close="close">
    <el-form>
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
      showAlert: function (val, oldVal) {
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
        const stocks = this.$store.state.stocks.stocks;
        if (!stocks.find(s => s.code === stock.code)) {
          this.updateStock(this.$store.state.stocks.stocks.concat([stock]));
          this.updateData();
        }
      }
    },
    computed: {
      ...mapGetters([
        'showAlert',
      ])
    }
  };
</script>
