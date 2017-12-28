<template>
  <div >
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>平台认证</span>
      <div class="header-right"@click="toUrl('tijiaoshenhe')">下一步</div>
    </div>
    <div class="content">
      <!--流程-->
      <div class="banner">
         <img src="../../../static/images/designer/renzheng_02.png"/>
      </div>
      <div class="ys-time">
        <div class="qdtime">
          <div class="qdtime-left">
            <span>职称证书</span>
          </div>
          <div class="qdtime-right">
            <input type="text"placeholder="请输入证件名称" />
          </div>
        </div>
      </div>
      <div class="shangchuan">
        <div class="sc"><img src="../../../static/images/employer/j.png" /></div>
        <p>请上传职称证书</p>
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
  @import '../../assets/css/designer/pingtairenzheng.css';
</style>
