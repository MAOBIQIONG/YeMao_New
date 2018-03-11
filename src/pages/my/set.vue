<template>
  <div>
    <!--头部导航-->
    <div class="header">
      <div class="header-left" v-tap="{methods:goback}"><img src="../../../static/images/back.png" /></div>
      <span>设置</span>
    </div>
    <div class="content content-p">
      <div class="xgnc"v-tap="{ methods:toUrl , pagename:'setnicheng'}">
        <div class="left"><span>修改昵称</span></div>
        <div class="right"><span>{{userInfo.user_name}}</span></div>
      </div>
      <div class="xggh">
        <div class="xgdl" v-tap="{ methods:toUrl , pagename:'setpassword'}">
          <div class="left"><span>修改登陆密码</span></div>
          <div class="right"><img src="../../../static/images/jiangou.png"></div>
        </div>
        <div class="xgdl"v-tap="{ methods:toUrl , pagename:'setnum'}">
          <div class="left"><span>更换手机号</span></div>
          <div class="right"><img src="../../../static/images/jiangou.png"></div>
        </div>
      </div>
    </div>
    <!--退出登陆-->
    <div class="tcdl" v-tap="{methods:logout}">
      <span>退出登录</span>
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
//      toUrl: function (pagename) {
//        this.$router.push({name: pagename})
//      },
      toUrl: function (params) {
        this.$router.push({name: params.pagename})
      },
      logout(){
        // this.$store.state.isAuthenicatedTip = 0;
        common.setStorage('isAuthenicatedTip',0);
        common.setStorage("userInfo",'{}');
        this.goback();
        // im登出
        wyim.logout();
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../static/css/my/set.css';
</style>
