<template>
  <el-row class="header">
    <el-menu theme="dark" default-active="1" class="el-menu-demo" mode="horizontal" @select="select">
      <el-menu-item index="1" class="title">❤&nbsp股票助手</el-menu-item>
      <!--<router-link class="el-menu-item" to="/home">首页</router-link>-->
      <!--<el-submenu index="2">-->
        <!--<template slot="title">设置</template>-->
        <!--<el-menu-item index="2-1"><a :href="admin" target="_blank">控制台</a></el-menu-item>-->
        <!--<el-menu-item index="2-2">登出</el-menu-item>-->
      <!--</el-submenu>-->
    </el-menu>
    <div class="line"></div>
  </el-row>
</template>

<style>
  .el-menu {
    border-radius: 0;
  }
</style>
