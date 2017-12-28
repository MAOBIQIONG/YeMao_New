<template>
  <div >
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>平台认证</span>
      <div class="header-right"@click="toUrl('zhichengrenzheng')">下一步</div>
    </div>
    <!--发布订单内容-->
    <div class="content wrz">
      <!--流程-->
      <div class="banner">
         <img src="../../../static/images/designer/renzheng_01.png"/>
      </div>
      <div class="tixin">
        <div class="tx-left">
          <img src="../../../static/images/designer/gantan.png"/>
        </div>
        <span>我们将保护你的隐私，请务必确保真实有效的信息</span>
        <div class="tx-right">
          <img src="../../../static/images/designer/x.png"/>
        </div>
      </div>
      <div class="ys-time">
        <div class="qdtime">
          <div class="qdtime-left">
            <span>手机号码</span>
          </div>
          <div class="qdtime-right">
            <input type="text"placeholder="请输入手机号" />
          </div>
        </div>
        <div class="qdtime">
          <div class="qdtime-left">
            <span>真实姓名</span>
          </div>
          <div class="qdtime-right">
            <input type="text"placeholder="名字" />
          </div>
        </div>
        <div class="qdtime">
          <div class="qdtime-left">
            <span>身份证号</span>
          </div>
          <div class="qdtime-right">
            <input type="text"placeholder="请输入身份证号" />
          </div>
        </div>
        <div class="qdtime">
          <div class="qdtime-left">
            <span>学校名称</span>
          </div>
          <div class="qdtime-right">
            <input type="text"placeholder="请输入学校名称" />
          </div>
        </div>
      </div>
      <div class="shangchuan">
        <div class="sc"><img src="../../../static/images/employer/j.png" /></div>
        <p>请上传学历证书</p>
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
      this.yc();
    },
    methods: {
      goback(){
        this.$router.goBack();
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
//      点击x隐藏
      yc(){
        $(".tx-right").click(function(){
          $(".tixin").hide();
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../assets/css/designer/pingtairenzheng.css';
</style>
