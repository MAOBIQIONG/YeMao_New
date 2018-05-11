<template>
  <div >
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>修改密码</span>
      <div class="header-right"@click="submit">确定</div>
    </div>
    <div class="content content-p">
      <div class="ymm">
        <div class="left"><span>原密码</span></div>
        <div class="right"><input v-model="old_password" type="password" placeholder="输入旧密码"/></div>
      </div>
      <div class="xmm-qr">
        <div class="xmm">
          <div class="left"><span>新密码</span></div>
          <div class="right"><input v-model="new_password" type="password" placeholder="输入新密码"/></div>
        </div>
        <div class="qrmm">
          <div class="left"><span>确认密码</span></div>
          <div class="right"><input v-model="com_password" type="password" placeholder="确认新密码"/></div>
        </div>
      </div>
      <div class="gunzhe">密码由6-20位字符组成区分大小写</div>
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
        old_password:'',
        new_password:'',
        com_password:'',
        is_submit:false,
        showMark: false,
        showMsg:'',
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
      // 提交
      submit () {
        var _self = this;
        // 未获取到用户信息
        var reg = /^[0-9a-zA-Z_#]{6,16}$/;
        if( common.isNull(_self.userInfo.phone) ){
          _self.showToast('未获取到用户手机号码!');
          return;
        }else if( common.isNull(_self.old_password) ){
          _self.showToast('请输入旧密码!');
          return;
        }else if( !reg.test(_self.old_password) ){
          _self.showToast('旧密码输入错误！');
          return;
        }
        // 避免多次请求接口
        if( _self.is_submit == true ) return;
        _self.is_submit = true;
        // 验证密码
        var params = {
          interfaceId:common.interfaceIds.login,
          where:{
            phone:_self.userInfo.phone,
            password: _self.old_password
          }
        }
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          _self.is_submit = false;
          var data = response.data;
          if( data ){
            if( data.code == 200 ){
              _self.updatePassword();
            }else{
              _self.showToast('旧密码输入错误!');
            }
          }else{
            _self.showToast("验证密码失败！")
          }
        })
      },

      updatePassword(){
        var _self = this;
        var reg = /^[0-9a-zA-Z_#]{6,16}$/;
        if( common.isNull(_self.new_password) ){
          _self.showToast('请输入新密码!');
          return;
        }else if( !reg.test(_self.new_password) ){
          _self.showToast('密码为6-16位的数字或字母！');
          return;
        }else if( _self.new_password==_self.old_password ){
          _self.showToast('新密码不能与旧密码一致!');
          return;
        }else if( common.isNull(_self.com_password) ){
          _self.showToast('请输入确认密码!');
          return;
        }else if( _self.new_password !== _self.com_password ){
          _self.showToast('密码不一致！');
          return;
        }
        _self.updateUser();
      },

      updateUser(){
        var _self = this;
        if( _self.is_submit == true ) return;
        _self.is_submit = true;
        var params = {
          interfaceId:common.interfaceIds.updateUserPwd,
          phone: _self.userInfo.phone,
          password: _self.new_password
        };
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          _self.is_submit = false;
          var data = response.data;
          if( data && data.code == 200 ){
            _self.showToast('修改成功!');
            _self.userInfo.password = _self.password;
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
  @import '../../../static/css/my/set-password.css';
</style>
