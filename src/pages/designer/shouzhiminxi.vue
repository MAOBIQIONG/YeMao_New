<template>
  <div >
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>明细</span>
    </div>
    <div class="content">
      <div class="list">
        <div class="list-left">
          <p class="one fist">2017年6月</p>
          <p class="two">提现 ￥<span>2050.34</span> 收入￥<span></span></p>
        </div>
      </div>
      <div class="list">
        <div class="list-left">
          <p class="one">+<span>300</span></p>
          <p class="two">提现 金额 </p>
        </div>
        <div class="list-right">
          <p class="one"><span>今天</span></p>
          <p class="two">04:55</p>
        </div>
      </div>
      <div class="list">
        <div class="list-left">
          <p class="one">+<span>300</span></p>
          <p class="two">提现 金额</p>
        </div>
        <div class="list-right">
          <p class="one"><span>今天</span></p>
          <p class="two">04:55</p>
        </div>
      </div>
      <div class="list">
        <div class="list-left">
          <p class="one">+<span>300</span></p>
          <p class="two">提现 金额</p>
        </div>
        <div class="list-right">
          <p class="one"><span>今天</span></p>
          <p class="two">04:55</p>
        </div>
      </div>
      <div class="list">
        <div class="list-left">
          <p class="one">-<span>300</span></p>
          <p class="two">账单支出</p>
        </div>
        <div class="list-right">
          <p class="one"><span>2017-10-10</span></p>
          <p class="two">04:55</p>
        </div>
      </div>
      <div class="list">
        <div class="list-left">
          <p class="one">+<span>300</span></p>
          <p class="two">提现 金额</p>
        </div>
        <div class="list-right">
          <p class="one"><span>今天</span></p>
          <p class="two">04:55</p>
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
  @import '../../assets/css/designer/shouzhiminxi.css';
</style>
