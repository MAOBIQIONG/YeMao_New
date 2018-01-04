<template>
  <div>
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>期望工作</span>
      <div class="header-right"@click="toUrl('zuopinshangchuan')">下一步</div>
    </div>
    <!--发布订单内容-->
    <div class="content">
      <div class="ys-time">
        <div class="qdtime">
          <div class="qdtime-left">
            <span>职位</span>
          </div>
          <div class="qdtime-right">
            <input type="text"placeholder="请输入职位" />
          </div>
        </div>
        <div class="qdtime">
          <div class="qdtime-left">
            <span>期望月薪</span>
          </div>
          <div class="qdtime-right">
            <input type="text"placeholder="请输入期望月薪" />
          </div>
        </div>
        <div class="qdtime">
          <div class="qdtime-left">
            <span>期望城市</span>
          </div>
          <div class="qdtime-right">
            <input type="text"placeholder="期望城市" />
          </div>
        </div>
      </div>
      <!--留言-->
      <div class="pc-shuru">
        <textarea class="area" placeholder="补充说明"></textarea>
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
  @import '../../assets/css/meow/bianjigongzuojinli.css';
</style>
