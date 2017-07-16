<template>
  <div class="main">
    <header-component></header-component>
    <el-row class="tac">
      <el-col :span="4" class="menu">
        <el-menu default-active="1" router class="menu">
          <el-menu-item index="/stock"><i class="el-icon-search"></i>自选股</el-menu-item>
          <el-menu-item index="/setting"><i class="el-icon-setting"></i>设置</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20" class="content">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
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
