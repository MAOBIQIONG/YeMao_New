<template>
  <div >
    <!--头部导航-->
    <div class="header">
      <span>认证中心</span>
      <div class="header-right"@click="goback">完成</div>
    </div>
    <!--发布订单内容-->
    <div class="content">
      <div class="cgzt">
        <div class="tupiao">
          <img src="../../../static/images/designer/txcg.png" />
        </div>
        <div class="wzsm">
          已通过审核
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
  @import '../../assets/css/designer/tixianchenggong.css';
</style>
