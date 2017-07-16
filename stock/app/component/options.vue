<template>
  <div class="main">
    <header-component></header-component>
    <el-row class="tac" :gutter="10">
      <el-col :span="4" class="menu">
        <el-menu default-active="1" router class="menu">
          <el-menu-item index="/"><i class="el-icon-star-on"></i>自选股</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Header from './partials/header.vue';

  export default {
    name: 'options',
    components: {
      'header-component': Header,
    },
  }
</script>
