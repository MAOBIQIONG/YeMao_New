<template>
  <div >
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>修改昵称</span>
      <div class="header-right"@click="submit">确定</div>
    </div>
    <div class="content content-p">
      <div class="ymm">
        <div class="left"><span>昵称</span></div>
        <div class="right"><input v-model="user_name" type="text" placeholder="输入新昵称"/></div>
      </div>
    </div>
    <toast v-model="showMark" type="text" :text="showMsg" width="5rem"></toast>
  </div>
</template>

<script>
  import { Toast} from 'vux'
  export default {
    components: {
      Toast,
    },
    data () {
      return {
        userInfo: {},
        user_name: '',
        is_submit: false,
        showMark: false,
        showMsg: '',
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
      //弹窗
      showToast(msg){
        this.showMark = true;
        this.showMsg = msg;
      },
      submit(){
        var _self = this;
        var reg = /^[a-zA-Z0-9\u4E00-\u9FA5]{2,8}$/;
        if( common.isNull(_self.user_name) ){
          _self.showToast('请输入新昵称!');
          return;
        }else if( !reg.test(_self.user_name) ){
          _self.showToast('昵称为2到8位（中文、字母、数字）!');
          return;
        }
        _self.checkUserName();
      },

      checkUserName(){
        var _self = this;
        if( _self.is_submit == true ) return;
        _self.is_submit = true;

        var params = {
          interfaceId:common.interfaceIds.checkUserName,
          user_name: _self.user_name
        };
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          _self.is_submit = false;
          var data = response.data;
          if( data && data.code == 200 ){
            _self.updateUser();
          }else{
            _self.showToast('该昵称已被注册!');
          }
        });
      },

      updateUser(){
        var _self = this;
        if( _self.is_submit == true ) return;
        _self.is_submit = true;
        var params = {
          interfaceId:common.interfaceIds.updateUserById,
          user_id: _self.userInfo._id,
          data:{
            user_name: _self.user_name
          }
        };
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          _self.is_submit = false;
          var data = response.data;
          if( data && data.code == 200 ){
            _self.showToast('修改成功!');
            _self.userInfo.user_name = _self.user_name;
            common.setStorage("userInfo",_self.userInfo);
            setTimeout(function () {
              _self.$router.goBack(-2);
            },1000)
          }else{
            _self.showToast('修改失败!');
          }
        });
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../static/css/my/set-nichen.css';
</style>
