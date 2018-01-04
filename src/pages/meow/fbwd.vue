<template>
  <div>
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>发布问题</span>
      <div class="header-right">完成</div>
    </div>
    <div class="set-content">
      <div class="xgnc">
        <div class="left"><input type="text" maxlength="20"placeholder="标题（最多20字）" class="btname"></div>
      </div>
      <!--留言-->
      <div class="pc-shuru">
        <textarea class="area" maxlength="200" placeholder="请输入问题描述"></textarea>
        <!--<p class="xianzhi"><span class="zs">200</span>/<span>200</span></p>-->
      </div>
      <!--图片上传-->
      <div class="sctp">
        <div class="st-bottom">
          <img src="../../../static/images/employer/j.png" />
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
