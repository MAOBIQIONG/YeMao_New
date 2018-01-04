<template>
  <div>
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
    <!--拍砖列表-->
    <div class="content">
      <div class="list-paizuan">
        <div class="tu">

        </div>
        <div class="zan">
          <div class="left-zan">
            <span><img src="../../../static/images/bj.jpg"/></span><span>0</span>
          </div>
          <div class="right-time">
            2017-10-10
          </div>
        </div>
      </div>
      <div class="list-paizuan">
        <div class="tu">

        </div>
        <div class="zan">
          <div class="left-zan">
            <span><img src="../../../static/images/bj.jpg"/></span><span>0</span>
          </div>
          <div class="right-time">
            2017-10-10
          </div>
        </div>
      </div>
      <div class="list-paizuan">
        <div class="tu">

        </div>
        <div class="zan">
          <div class="left-zan">
            <span><img src="../../../static/images/bj.jpg"/></span><span>0</span>
          </div>
          <div class="right-time">
            2017-10-10
          </div>
        </div>
      </div>
      <div class="list-paizuan">
        <div class="tu">

        </div>
        <div class="zan">
          <div class="left-zan">
            <span><img src="../../../static/images/bj.jpg"/></span><span>0</span>
          </div>
          <div class="right-time">
            2017-10-10
          </div>
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
  @import '../../assets/css/meow/miaomiaopaizuan.css';
</style>
