<template>
  <el-container>
    <header-component></header-component>
    <el-container>
      <el-aside width="200px">
        <el-col :span="4" class="menu">
          <el-menu default-active="1" router class="menu">
            <el-menu-item index="/stock"><i class="el-icon-font-stock"></i>股票</el-menu-item>
            <el-menu-item index="/setting"><i class="el-icon-setting"></i>设置</el-menu-item>
          </el-menu>
        </el-col>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
  .content {
    padding: 0 10px;
    margin-top: 5px;
  }
</style>

<script>
  import Header from './partials/header.vue';

  export default {
    name: 'options',
    components: {
      'header-component': Header,
    },
  }
</script>
