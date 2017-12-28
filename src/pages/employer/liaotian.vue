<template>
  <div class="">
    <div class="header">
      <div class="header-left" @click="goback"><img src="../../../static/images/back.png"/></div>
      <span>昵称</span>
    </div>
    <!--  信息表-->
    <div class="content">

    </div>
    <div class="lt-bottom">
        <!--<div class="lb-left">-->
           <!--<input type="text" placeholder="请输入价格" />-->
        <!--</div>-->
        <!--<div class="lb-right">-->
            <!--发送-->
        <!--</div>-->
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
  @import "../../assets/css/employer/liaotian.css";
</style>
