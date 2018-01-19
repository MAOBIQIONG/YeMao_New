<template>
  <div >
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>参与的活动</span>
    </div>
    <!--活动列表-->
    <div class="content">
      <div class="hd-list"@click="toUrl('haibao')">
        <div class="hd-top">
          <img src="../../../static/images/bj.jpg">
          <div class="hd-top-title">
            <p>已结束</p>
          </div>
        </div>
        <div class="hd-bottom">
          <div class="hb-title">室内设计</div>
        </div>
      </div>
      <div class="hd-list"@click="toUrl('haibao')">
        <div class="hd-top">
          <img src="../../../static/images/bj.jpg">
          <div class="hd-top-title">
            <p>已结束</p>
          </div>
        </div>
        <div class="hd-bottom">
          <div class="hb-title">室内设计</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {

      }
    },
    methods: {
      goback(){
        this.$router.goBack();
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../static/css/my/mine-huodong.css';
  .content{
    padding-top: 1.2rem;
  }
</style>
