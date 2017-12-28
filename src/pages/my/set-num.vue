<template>
  <div >
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>更换手机号</span>
    </div>
    <div class="setn-content">
      <div class="gh-sjh">
        <div class="list">
          <div class="left"><span>旧手机号码：</span></div>
          <div class="right"><input type="text" placeholder="请输入旧手机号码"/></div>
        </div>
        <div class="list">
          <div class="left"><span>登录密码：</span></div>
          <div class="right"><input type="text" placeholder="请输入登录密码"/></div>
        </div>
        <div class="list">
          <div class="left"><span>新手机号码：</span></div>
          <div class="right"><input type="text" placeholder="请输入新手机号码"/></div>
        </div>
        <div class="list">
          <div class="left"><span>验证码：</span></div>
          <div class="right"><input type="text" placeholder="请输入验证码"/></div>
          <div class="yzm">获取验证码</div>
        </div>
      </div>
    </div>
    <div class="gunzhe">确认修改</div>
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
  @import '../../assets/css/my/set-num.css';
</style>
