<template>
  <div>
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>作品上传</span>
      <div class="header-right"@click="toUrl('ddsh')">完成</div>
    </div>
    <!--编辑工作经历-->
    <div class="content">
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
  @import '../../assets/css/meow/zuopinshangchuan.css';
</style>
