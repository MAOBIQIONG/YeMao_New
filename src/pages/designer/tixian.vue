<template>
  <div >
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>提现</span>
    </div>
    <!--内容-->
    <div class="content">
      <div class="tixian">
        <div class="list">
          <div class="list-left">
            <span class="shengyu">剩余可提现金额</span>
            <span>1300000.00</span>元
          </div>
          <div class="list-right">
            全额提现
          </div>
        </div>
        <div class="ys-time">
          <div class="qdtime">
            <div class="qdtime-left">
              <span>真实姓名</span>
            </div>
            <div class="qdtime-right">
              <input type="text"placeholder="请输入姓名" />
            </div>
          </div>
          <div class="qdtime">
            <div class="qdtime-left">
              <span>账号</span>
            </div>
            <div class="qdtime-right">
              <input type="text"placeholder="请输入账号" />
            </div>
          </div>
        </div>
        <div class="tixianje">
          <p>提现金额</p>
          <div class="qdtime">
            <div class="qdtime-left">
              <span>￥</span>
            </div>
            <div class="qdtime-right">
              <input type="text"placeholder="请输入金额" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 确认提现-->
    <div class="qrtx">
      <div class="txqr">
        <p>温馨提示：本次提现需<span>3.00</span>元手续费</p>
        <div class="qrtx"@click="toUrl('tixianchenggong')">
          确认提现
        </div>
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
    mounted: function () {
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
  @import '../../assets/css/designer/tixian.css';
</style>
