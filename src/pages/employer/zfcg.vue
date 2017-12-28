<template>
  <div class="">
    <div class="header">
      <span>支付成功</span>
      <div class="header-right"@click="goback">完成</div>
    </div>
    <div class="zfcg-content">
      <div class="zfcg-top">
        <div class="zt-left"><img src="../../../static/images/employer/zfcg.png"/></div>
        <div class="zt-right">
          <div class="zr-box">
            <p class="first-p"@click="goback">支付成功</p>
            <p>等待设计师提交作品</p>
          </div>
          <div class="zr-box">
            <p>支付中</p>
            <p>请关注订单内容</p>
          </div>
          <div class="zr-box">
            <p>确认设计师</p>
          </div>
        </div>
      </div>
      <div class="zfcg-bottom">
        <span>查看订单详情</span>
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
      goback() {
        this.$router.goBack();
      },
      toUrl(name) {
        this.$router.push({name: name});
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../../assets/css/employer/zfcg.css";
</style>
