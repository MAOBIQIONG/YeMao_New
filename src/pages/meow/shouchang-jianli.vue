<template>
  <div>
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>喵喵人才</span>
      <div class="header-right"@click="toUrl('tianxiejianli')">发布</div>
    </div>
    <!--简历列表-->
    <div class="content content-p">
      <div class="jianli"@click="toUrl('minejianli')">
        <div class="touxiang">
          <img src="../../../static/images/bj.jpg"/>
        </div>
        <div class="jieshao">
          <p class="name"><span>王思靓</span>/<span>助理设计师</span></p>
          <p class="qiwan"><span>朝阳区</span>&nbsp;<span>3</span>年工作经验&nbsp;<span>本科</span>&nbsp;<span>8K-10K</span></p>
          <p class="xinge">温和、顽强、高品位的法归设计师温和、顽强、高品位的法归设计师</p>
        </div>
      </div>
      <div class="jianli"@click="toUrl('minejianli')">
        <div class="touxiang">
          <img src="../../../static/images/bj.jpg"/>
        </div>
        <div class="jieshao">
          <p class="name"><span>王思靓</span>/<span>助理设计师</span></p>
          <p class="qiwan"><span>朝阳区</span>&nbsp;<span>3</span>年工作经验&nbsp;<span>本科</span>&nbsp;<span>8K-10K</span></p>
          <p class="xinge">温和、顽强、高品位的法归设计师</p>
        </div>
      </div>
      <div class="jianli">
        <div class="touxiang">
          <img src="../../../static/images/bj.jpg"/>
        </div>
        <div class="jieshao">
          <p class="name"><span>王思靓</span>/<span>助理设计师</span></p>
          <p class="qiwan"><span>朝阳区</span>&nbsp;<span>3</span>年工作经验&nbsp;<span>本科</span>&nbsp;<span>8K-10K</span></p>
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
  @import '../../../static/css/meow/shouchang-jianli.css';
</style>
