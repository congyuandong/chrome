<template>
  <div class="header">
    <el-row>
      <el-menu theme="dark" default-active="1" mode="horizontal">
        <h1 class="slogen">❤&nbsp股票助手</h1>
        <el-button type="primary" class="stock" @click="showAddStock">新增自选</el-button>
      </el-menu>
      <div class="line"></div>
    </el-row>
    <add-stock-component></add-stock-component>
  </div>
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
  import AddStock from './add-stock.vue';

  export default {
    components: {
      'add-stock-component': AddStock,
    },
    methods: {
      showAddStock() {
        this.$store.dispatch('show');
      }
    }
  }
</script>
