<template>
  <div class="xzzf">
    <div class="header">
      <div class="header-left" @click="goback"><img src="../../../static/images/back.png"/></div>
      <span>支付</span>
      <div class="header-right"@click="goback">完成</div>
    </div>
    <div class="content content-p">
      <div class="ddxq xzffs">
        <div class="ddxq-top">
          <div class="ddxq-img">
            <img src='../../../static/images/bj.jpg'>
          </div>
          <div class="ddxq-jianjie">
            <div class="jianjie-top">
              已有多年建筑设计工作经验，从事建筑方案到效果图，再到建筑施工图都可以完成
            </div>
            <div class="jianjie-bottom">
              <div class="db-yushuan"><span class="yushuan">￥</span><span class="yushuan">5000</span></div>
            </div>
          </div>
        </div>
        <p>选择支付方式</p>
        <div class="ddxq-list">
          <div class="ddxq-box">
            <div class="box-left">
              <span><img src="../../../static/images/employer/weixin.png"/></span><span>微信</span>
            </div>
            <div class="box-right">
              <input type="radio" name="zhifu" class="r" value="ALI_APP" />
            </div>
          </div>
          <div class="ddxq-box">
            <div class="box-left">
              <span><img src="../../../static/images/employer/zhifubao.png"/></span><span>支付宝支付</span>
            </div>
            <div class="box-right">
              <input type="radio" name="zhifu" class="r" value="ALI_APP" />
            </div>
          </div>
        </div>
      </div>
    </div>
     <div class="ljzf">
       立即支付
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
  @import "../../../static/css/employer/payment.css";
  .xzzf{
    position: fixed;
    width: 100%;
    height: 100%;
    background: #f2f2f2;
  }
</style>
