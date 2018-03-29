<template>
  <div >
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>认证中心</span>
    </div>
    <!--发布订单内容-->
    <div class="content content-p">
      <div class="liebiao">
        <div class="list" v-tap="{methods:toSmrz}">
          <div class="tupiao sm"><img src="../../../static/images/designer/sm.png" /></div>
          <div class="xingxi">实名认证</div>
          <div class="list-right"><span>{{realName}}</span></div>
        </div>
        <div class="list tz" v-tap="{methods:toPtrz}">
          <div class="tupiao"><img src="../../../static/images/designer/pingtai.png" /></div>
          <div class="xingxi">平台认证</div>
          <div class="list-right"><span>{{platformName}}</span></div>
        </div>
        <div class="list" v-tap="{methods:toQyrz}">
          <div class="tupiao"><img src="../../../static/images/designer/qianyue.png" /></div>
          <div class="xingxi">签约设计师</div>
          <div class="list-right"><span>{{signName}}</span></div>
        </div>
      </div>
    </div>
    <toast v-model="showMark" :time="1000" type="text" width="5rem">{{showMsg}}</toast>
  </div>
</template>

<script>
  import { Toast } from 'vux'
  export default {
    components: {
      Toast
    },
    data () {
      return {
        state:0,
        realName:'未认证',
        platformName:'未认证',
        signName:'未认证',
        showMark:false,
        showMsg:"",
      }
    },
    created: function () {
      console.log("created:")
      var _self = this;
      _self.userInfo = common.getObjStorage("userInfo") || {};
      if( common.isNull(_self.userInfo._id) != true ){
        _self.state = _self.userInfo.authenticating_state;
        _self.realName = _self.state==1 ? '认证中' : _self.state>=2 ? '已认证' : '未认证';
        _self.platformName = _self.state==3 ? '认证中' : _self.state>=4 ? '已认证' : '未认证';
        _self.signName = _self.state==5 ? '认证中' : _self.state==6 ? '已认证' : '未认证';
      }
    },
    methods: {
      /**************************************/
      showToast(msg){
        this.showMark = true;
        this.showMsg = msg;
      },
      goback(){
        this.$router.goBack();
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },

      toSmrz: function () {
        var _self = this;
        if( _self.state == 0 ){
          _self.$router.push({name: 'shimingrenzheng'})
        }else if( _self.state == 1 ){
          _self.showToast('实名认证中!');
        }else if( _self.state >= 2 ){
          _self.$router.push({name: 'renzhengchenggong'})
        }
      },
      toPtrz: function () {
        var _self = this;
       if( _self.state == 0 ){
         _self.showToast('请先进行实名认证!');
       }else if( _self.state == 1 ){
         _self.showToast('实名认证中!');
       }else if( _self.state == 2 ){
          _self.$router.push({name: 'pingtairenzheng'})
       }else if( _self.state == 3 ){
         _self.showToast('平台认证中!');
       }else if( _self.state >= 4 ){
         _self.$router.push({name: 'renzhengchenggong'})
       }
      },
      toQyrz: function () {
        var _self = this;
       if( _self.state == 0 ){
         _self.showToast('请先进行实名认证!');
       }else if( _self.state == 1 ){
         _self.showToast('实名认证中!');
       }else if( _self.state == 2 ){
         _self.showToast('请先进行平台认证!');
       }else if( _self.state == 3 ){
         _self.showToast('平台认证中!');
       }else if( _self.state == 4 ){
          _self.$router.push({name: 'qianyuesjs'})
       }else if( _self.state == 5 ){
         _self.showToast('签约认证中!');
       }else if( _self.state == 6 ){
         _self.$router.push({name: 'renzhengchenggong'})
       }
      },

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../static/css/designer/renzheng.css';
</style>
