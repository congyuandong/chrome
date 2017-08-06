<template>
  <div class="popup">
    <el-row class="header">
      <el-col :span="12" class="slogen">❤&nbsp股票助手</el-col>
      <el-col :span="12" class="link">
        <span>
          <a href="">反馈</a> | <a href="/pages/options.html" target="_blank">设置</a>
        </span>
      </el-col>
    </el-row>
    <el-row>
      <el-carousel :autoplay=false arrow="never" indicator-position="none">
        <el-carousel-item v-for="s of stocks" :key="s.code">
          <el-row>
            <el-col :span="10">
              {{ s.name }}
            </el-col>
            <el-col :span="14">
              {{ s.code }}
            </el-col>
          </el-row>
          <el-row>
            <img :src='"http://image.sinajs.cn/newchart/min/n/" + s.code + ".gif"' :alt="s.name">
          </el-row>
        </el-carousel-item>
      </el-carousel>
    </el-row>
    <el-row>
      <el-col class="indicator" :span="4" v-for="s of stocks" :key="s.code">
        <div :class="topClass(s.changeRate)">{{ s.name }}</div>
        <div :class="bottomClass(s.changeRate)">
          <div class="inner">{{ s.currentPrice | formatPrice }} {{ s.changeRate | formatRate }}</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="stylus">
  top(color)
    border 1px solid color;
    background-color color;
    color white;
    border-radius 5px 5px 0 0;
  bottom(color)
    border 1px solid color;
    color color;
    border-radius 0 0 5px 5px;
    font-size 8px;

  body
    padding 2px;
  img
    width 100%;
  .indicator
    padding 2px;
    text-align center;
    white-space nowrap;
    cursor pointer;
    .top
      top(black)
    .top.red
      top(red)
    .top.green
      top(green)
    .bottom
      bottom(black)
    .bottom.red
      bottom(red)
    .bottom.green
      bottom(green)
    .inner
      display flex;
      justify-content center;
      transform scale(0.7)
  .popup
    width 380px;
    min-height 300px;

    .slogen
      font-size 16px;
      font-weight bold;
    .link span
      float right;
      a
        outline none;

  .header
    margin 5px;
    border-bottom dashed 1px gray;
</style>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    data: function () {
      return {}
    },
    mounted() {
      this.updateData();
      setInterval(this.updateData, 10000);
      console.log(this.stocks);
    },
    methods: {
      ...mapActions([
        'updateData',
      ]),
      topClass(rate) {
        return {
          top: true,
          red: rate >= 0,
          green: rate < 0,
        }
      },
      bottomClass(rate) {
        return {
          bottom: true,
          red: rate >=0,
          green: rate < 0,
        }
      }
    },
    computed: {
      stocks() {
        return this.$store.getters.stockData.slice(0, 6);
      },
    }
  }
</script>
