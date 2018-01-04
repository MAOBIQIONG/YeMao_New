<template>
  <div >
    <!--导航栏-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <div class="hd-cont">
        <ul>
          <li @click="toUrl('meow')">喵喵圈</li>
          <li @click="toUrl('miaomiaopaizhuan')">喵喵拍砖</li>
          <li @click="toUrl('huodong')">活动</li>
        </ul>
      </div>
    </div>
    <!--活动列表-->
    <div class="content">
      <div class="hd-list">
        <img src="../../../static/images/bj.jpg">
      </div>
      <div class="hd-list">
        <img src="../../../static/images/bj.jpg">
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
  @import '../../assets/css/my/mine-huodong.css';
</style>
