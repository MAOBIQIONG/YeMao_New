<template>
  <div >
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>认证中心</span>
    </div>
    <!--发布订单内容-->
    <div class="content">
      <div class="liebiao">
        <div class="list"@click="toUrl('shimingrenzheng')">
          <div class="tupiao sm"><img src="../../../static/images/designer/sm.png" /></div>
          <div class="xingxi">实名认证</div>
          <div class="list-right"><img src="../../../static/images/jiangou.png"></div>
        </div>
        <div class="list tz"@click="toUrl('pingtairenzheng')">
          <div class="tupiao"><img src="../../../static/images/designer/pingtai.png" /></div>
          <div class="xingxi">平台认证</div>
          <div class="list-right"><img src="../../../static/images/jiangou.png"></div>
        </div>
        <div class="list"@click="toUrl('qianyuesjs')">
          <div class="tupiao"><img src="../../../static/images/designer/qianyue.png" /></div>
          <div class="xingxi">签约设计师</div>
          <div class="list-right"><img src="../../../static/images/jiangou.png"></div>
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
  @import '../../assets/css/designer/renzheng.css';
</style>
