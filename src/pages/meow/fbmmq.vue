<template>
  <div>
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>发表文字</span>
      <div class="header-right">发布</div>
    </div>
    <div class="set-content">
      <!--留言-->
      <div class="pc-shuru">
        <textarea class="area" maxlength="200" placeholder="请输入问题描述"></textarea>
        <!--<p class="xianzhi"><span class="zs">200</span>/<span>200</span></p>-->
      </div>
      <!--图片上传-->
      <div class="sctp">
        <div class="st-bottom">

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
  @import '../../assets/css/meow/fbwd.css';
</style>
