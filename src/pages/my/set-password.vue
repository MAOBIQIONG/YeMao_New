<template>
  <div >
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>修改密码</span>
      <div class="header-right">确定</div>
    </div>
    <div class="setp-content">
      <div class="ymm">
        <div class="left"><span>原密码</span></div>
        <div class="right"><input type="text" placeholder="输入旧密码"/></div>
      </div>
      <div class="xmm-qr">
        <div class="xmm">
          <div class="left"><span>新密码</span></div>
          <div class="right"><input type="text" placeholder="输入新密码"/></div>
        </div>
        <div class="qrmm">
          <div class="left"><span>确认密码</span></div>
          <div class="right"><input type="text" placeholder="确认新密码"/></div>
        </div>
      </div>
      <div class="gunzhe">密码由6-20位字符组成区分大小写</div>
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
  @import '../../assets/css/my/set-password.css';
</style>
