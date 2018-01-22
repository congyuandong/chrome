<template>
  <el-header>
    <el-row>
      <el-menu theme="dark" default-active="1" mode="horizontal">
        <h1 class="slogen">❤&nbsp理财助手</h1>
        <el-button type="primary" class="stock" @click="showAddStock">新增自选</el-button>
      </el-menu>
      <div class="line"></div>
    </el-row>
    <add-stock-component></add-stock-component>
    <add-alert-component></add-alert-component>
  </el-header>
</template>

<style lang="stylus">
  .header
    .el-menu
      border-radius 0
    .slogen
      margin-left 28px
      color white
    .stock
      position absolute
      right 28px
      top 12px
</style>

<script>
  import {mapActions} from 'vuex';
  import AddStock from './add-stock.vue';
  import AddAlert from './alert.vue';
  import {ADD_STOCK} from '../../store/modules/stocks';

  export default {
    components: {
      'add-stock-component': AddStock,
      'add-alert-component': AddAlert,
    },
    methods: {
      ...mapActions([
        'show',
      ]),
      showAddStock() {
        this.show(ADD_STOCK);
      }
    }
  }
</script>
