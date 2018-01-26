<template>
  <div>
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>设置</span>
    </div>
    <div class="content content-p">
      <div class="xgnc"@click="toUrl('setnicheng')">
        <div class="left"><span>修改昵称</span></div>
        <div class="right"><span>{{userInfo.user_name}}</span></div>
      </div>
      <div class="xggh">
        <div class="xgdl"@click="toUrl('setpassword')">
          <div class="left"><span>修改登陆密码</span></div>
          <div class="right"><img src="../../../static/images/jiangou.png"></div>
        </div>
        <div class="xgdl"@click="toUrl('setnum')">
          <div class="left"><span>更换手机号</span></div>
          <div class="right"><img src="../../../static/images/jiangou.png"></div>
        </div>
      </div>
    </div>
    <!--退出登陆-->
    <div class="tcdl"@click="logout()">
      <span>退出登陆</span>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        userInfo:{},
      }
    },
    created: function () {
      console.log("created:")
      var _self = this;
      _self.userInfo = common.getObjStorage("userInfo") || {};
    },
    methods: {
      goback(){
        this.$router.goBack();
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
      logout(){
        localStorage.setItem("userInfo",'{}');
        this.goback();
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../static/css/my/set.css';
</style>
