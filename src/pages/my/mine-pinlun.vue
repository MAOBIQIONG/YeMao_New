<template>
  <div >
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>我的评论</span>
    </div>
    <!--评论列表-->
    <div class="content">
      <div class="pinglun-list">
        <div class="pl-left">
          <img src="../../../static/images/bj.jpg" />
        </div>
        <div class="pl-content">
          <p>昵称</p>
          <p>这个设计非常不错，我感觉非常好</p>
          <p class="time">2017-09-08 08：23</p>
        </div>
        <div class="pl-right">
          <img src="../../../static/images/bj.jpg" />
        </div>
      </div>
      <div class="pinglun-list">
        <div class="pl-left">
          <img src="../../../static/images/bj.jpg" />
        </div>
        <div class="pl-content">
          <p>昵称</p>
          <p>这个设计非常不错，我感觉非常好</p>
          <p class="time">2017-09-08 08：23</p>
        </div>
        <div class="pl-right">
          <img src="../../../static/images/bj.jpg" />
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
  @import '../../assets/css/my/mine-pinlun.css';
</style>
