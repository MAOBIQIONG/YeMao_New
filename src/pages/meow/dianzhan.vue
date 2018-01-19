<template>
  <div>
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>点赞列表</span>
    </div>
    <div class="content content-p">
      <div class="dzlist">
        <div class="left"></div>
        <div class="right">设计师昵称</div>
        <div class="renzheng">
          <div class="sb-qian">签</div>
          <div class="sb-ysm">已实名</div>
          <div class="sb-yrz">已认证</div>
        </div>
      </div>
      <div class="dzlist">
        <div class="left"></div>
        <div class="right">设计师昵称</div>
        <!--<div class="renzheng">
                      <div class="sb-qian">签</div>
                      <div class="sb-ysm">已实名</div>
                      <div class="sb-yrz">已认证</div>
                  </div>-->
      </div>
      <div class="dzlist">
        <div class="left"></div>
        <div class="right">设计师昵称</div>
        <div class="renzheng">
          <div class="sb-qian">签</div>
          <div class="sb-ysm">已实名</div>
          <div class="sb-yrz">已认证</div>
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
  @import '../../../static/css/meow/dianzhan.css';
</style>
