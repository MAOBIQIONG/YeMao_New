<template>
  <div class="miaomiaopaizhuan">
    <!--拍砖列表-->
    <div class="content">
      <div class="list-paizuan">
        <div class="tu">
          <img src="../../../static/images/bj.jpg"/>
        </div>
        <div class="zan">
          <div class="left-zan">
            <span><img src="../../../static/images/zan.png"/></span><span>0</span>
          </div>
          <div class="right-time">
            2017-10-10
          </div>
        </div>
      </div>
      <div class="list-paizuan">
        <div class="tu">
          <img src="../../../static/images/bj.jpg"/>
        </div>
        <div class="zan">
          <div class="left-zan">
            <span><img src="../../../static/images/zan.png"/></span><span>0</span>
          </div>
          <div class="right-time">
            2017-10-10
          </div>
        </div>
      </div>
      <div class="list-paizuan">
        <div class="tu">
          <img src="../../../static/images/bj.jpg"/>
        </div>
        <div class="zan">
          <div class="left-zan">
            <span><img src="../../../static/images/zan.png"/></span><span>0</span>
          </div>
          <div class="right-time">
            2017-10-10
          </div>
        </div>
      </div>
      <div class="list-paizuan">
        <div class="tu">
          <img src="../../../static/images/bj.jpg"/>
        </div>
        <div class="zan">
          <div class="left-zan">
            <span><img src="../../../static/images/zan.png"/></span><span>0</span>
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
  @import '../../../static/css/meow/miaomiaopaizuan.css';
</style>
