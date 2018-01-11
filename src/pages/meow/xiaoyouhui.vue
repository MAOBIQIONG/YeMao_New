<template>
  <div>
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>校友会</span>
      <div class="header-right"@click="toUrl('chuangjianxiaoyouhui')">创建</div>
    </div>
    <!--简历列表-->
    <div class="jl-list">
      <div class="jianli"@click="toUrl('xuexiaoxiangqing')">
        <div class="touxiang">
          <img src="../../../static/images/bj.jpg"/>
        </div>
        <div class="jieshao">
          <p class="name">上海交通大学</p>
          <p class="xinge">温和、顽强、高品位的法归设计师</p>
          <div class="biaoqian">
            <img src="../../../static/images/bj.jpg"/>
          </div>
        </div>
      </div>
      <div class="jianli">
        <div class="touxiang">
          <img src="../../../static/images/bj.jpg"/>
        </div>
        <div class="jieshao">
          <p class="name">上海交通大学</p>
          <p class="xinge">温和、顽强、高品位的法归设计师</p>
        </div>
      </div>
      <div class="jianli">
        <div class="touxiang">
          <img src="../../../static/images/bj.jpg"/>
        </div>
        <div class="jieshao">
          <p class="name">上海交通大学</p>
          <p class="xinge">温和、顽强、高品位的法归设计师</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {

      }
    },
    methods: {
      goback () {
        this.$router.goBack()
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
    }
  }
</script>
<style scoped>
  @import '../../../static/css/meow/xiaoyouhui.css';
</style>
