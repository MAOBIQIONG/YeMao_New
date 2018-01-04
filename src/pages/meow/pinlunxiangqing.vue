<template>
  <div>
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>评论详情</span>
    </div>
    <!--评论详情-->
    <div class="pinglun">
      <div class="pinlunlist">
        <div class="top-pinlun">
          <div class="tp-left">
            <span><img src="../../../static/images/bj.jpg"/></span><span>用户昵称</span>
          </div>
          <div class="tp-right">
            <span>100</span><span><img src="../../../static/images/zan.png"/></span>
          </div>
        </div>
        <div class="neirong">
          评论内容评论内容评论内容评论内容评论内容评
          评论内容评论内容评论内容评论内容评论内容评
        </div>
      </div>
      <div class="pinlunlist">
        <div class="top-pinlun">
          <div class="tp-left">
            <span><img src="../../../static/images/bj.jpg"/></span><span>用户昵称</span>
          </div>
          <div class="tp-right">
            <span>100</span><span><img src="../../../static/images/zan.png"/></span>
          </div>
        </div>
        <div class="neirong">
          评论内容评论内容评论内容评论内容评论内容评
          评论内容评论内容评论内容评论内容评论内容评
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
  @import '../../assets/css/meow/pinlunxiangqin.css';
</style>
