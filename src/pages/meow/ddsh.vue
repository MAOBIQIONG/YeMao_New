<template>
  <div>
    <!--头部导航-->
    <div class="header">
      <div class="header-left" @click="goback"><img src="../../../static/images/back.png" /></div>
      <div class="header-right" @click="toResume()" >完成</div>
    </div>
    <div class="content content-p">
      <div class="zfcg-top">
        <div class="zt-left"><img src="../../../static/images/zfcg.png"/></div>
        <div class="zt-right">
          <div class="zr-box">
            <p>等待审核中</p>
          </div>
          <div class="zr-box">
            <p>已提交申请</p>
          </div>
          <div class="zr-box zr-zh">
            <p>审核提交人信息</p>
          </div>
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
        toResume(){
            common.delStorage("resumeId");
            common.delStorage("fromWorkExp");
            common.delStorage("resumeParams1");
            common.delStorage("resumeParams2");
            common.delStorage("resumeParams3");
            this.toUrl('shouchangjianli')
        }
    }
  }
</script>
<style scoped>
  @import '../../../static/css/meow/ddsh.css';
</style>
