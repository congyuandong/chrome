<template>
  <el-container>
    <el-aside width="200px">
      <el-menu default-active="1" router>
        <el-menu-item index="/stock"><i class="el-icon-font-stock"></i>股票</el-menu-item>
        <el-menu-item index="/setting"><i class="el-icon-setting"></i>设置</el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <h1 class="slogen">❤&nbsp理财助手</h1>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="stylus">
  .el-header
    background-color #C12127
    .slogen
      margin-left 28px
      color white
    .stock
      position absolute
      right 28px
      top 12px
</style>

<script>
  export default {
    name: 'options',
  }
</script>
