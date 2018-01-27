<template>
  <div >
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>更换手机号</span>
    </div>
    <div class="content content-p">
      <div class="gh-sjh">
        <div class="list">
          <div class="left"><span>旧手机号码：</span></div>
          <div class="right"><input v-model="old_phone" type="text" placeholder="请输入旧手机号码"/></div>
        </div>
        <div class="list">
          <div class="left"><span>登录密码：</span></div>
          <div class="right"><input v-model="password" type="text" placeholder="请输入登录密码"/></div>
        </div>
        <div class="list">
          <div class="left"><span>新手机号码：</span></div>
          <div class="right"><input v-model="new_phone" type="text" placeholder="请输入新手机号码"/></div>
        </div>
        <div class="list">
          <div class="left"><span>验证码：</span></div>
          <div class="right"><input type="text" placeholder="请输入验证码" ref="code"/></div>
          <div class="yzm" ref="verify_btn" v-tap="{methods:verifyParams}">获取验证码</div>
        </div>
      </div>
    </div>
    <div class="gunzhe" @click="submit">确认修改</div>
    <toast v-model="showMark" type="text" :text="showMsg"width="5rem"></toast>
  </div>
</template>

<script>
  import { Toast} from 'vux'
  import interfaces from  '../../../static/js/interface'
  import md5 from 'js-md5';
  export default {
    components: {
      Toast,
    },
    data () {
      return {
        old_phone:'',
        password:'',
        new_phone:'',
        is_submit:false,
        verify_code:'',  // 加密验证码
        verify_phone:'', // 验证手机号
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

      // 验证旧手机号码
      verifyOldPhone (flag) {
        console.log("verifyOldPhone:"+flag)
        var _self = this;
        let reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if( common.isNull(_self.old_phone) ){
          _self.showToast('请输入旧手机号码!');
          return;
        }else if( !reg.test(_self.old_phone) ){
          _self.showToast('旧手机号码输入错误!');
          return;
        }else if( common.isNull(_self.password) ){
          _self.showToast('请输入登录密码!');
          return;
        }
        // 避免多次请求接口
        if( _self.is_submit == true ) return;
        _self.is_submit = true;
        // 验证密码
        var params = {
          interfaceId:common.interfaceIds.login,
          where:{
            phone:_self.old_phone,
            password: _self.password
          }
        }
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          _self.is_submit = false;
          var data = response.data;
          if( data ){
            if( data.code == 200 ){
              _self.verifyNewPhone(flag);
            }else{
              _self.showToast('手机号码或密码错误!');
            }
          }else{
            _self.showToast("验证旧号码失败！")
          }
        })
      },

      // 验证新号码
      verifyNewPhone(flag){
        console.log("verifyNewPhone:"+flag)
        var _self = this;
        let reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if( common.isNull(_self.new_phone) ){
          _self.showToast('请输入新手机号码!');
          return;
        }else if( !reg.test(_self.new_phone) ){
          _self.showToast('新手机号码输入错误!');
          return;
        }else if( _self.old_phone == _self.new_phone ){
          _self.showToast('新号码不能与旧号码相同!');
          return;
        }
        var params = {
          interfaceId:common.interfaceIds.login,
          where:{
            "phone":_self.new_phone
          }
        }
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          var data = response.data;
          if( data ){
            if( data.code == 201 ){
              // 判断提交还是获取验证码
              if( flag == 0 ){
                if( _self.verifyCode() ){ // 提交
                  _self.updateUser();
                }
              }else if( flag == 1 ){ // 获取验证码
                _self.getVerificationCode();
              }
            }else{
              _self.showToast('您输入的新号码已被注册!');
            }
          }else{
            _self.showToast("验证新号码失败！")
          }
        })
      },

      // 获取验证码
      verifyParams () {
        var _self = this;
        _self.verifyOldPhone(1);
      },
      // 验证码验证
      verifyCode(){
        var _self = this;
        var code = _self.$refs.code.value;
        if ( common.isNull(_self.verify_code) ) {
          _self.showToast('请获取验证码!');
          return false;
        } else if( common.isNull(code) ){
          _self.showToast('请输入验证码!');
          return false;
        }else if( _self.new_phone != _self.verify_phone ){
          console.log(_self.new_phone +"<>"+ _self.verify_phone)
          _self.showToast('手机号码不匹配!');
          return false;
        } else if( md5(code) !== _self.verify_code ){
          _self.showToast('验证码错误!');
          return false;
        }
        return true;
      },

      // 倒计时
      count_down(time){
        var _self = this;
        var interval = setInterval(function () {
          if( !_self.$refs.verify_btn ) return;
          // 开始
          time--;
          _self.$refs.verify_btn.innerText = time + "秒后重新获取";
          if( time == 0 ) {
            clearInterval(t);
            _self.$refs.verify_btn.innerText = "重新获取";
            // 重置获取验证码状态及验证码
            _self.is_verify = false;
            _self.verify_code = '';
            _self.verify_phone = '';
          }
        }, 1000)
      },

      // 获取验证码
      getVerificationCode () {
        console.log("getVerificationCode:")
        var _self = this;
        // 设置获取验证码状态
        if( _self.is_verify == true ) return;
        _self.is_verify = true;
        // 获取验证码
        var params = {
          'mobile': _self.new_phone,
          'template': '3064129'
        }
        interfaces.getVerifyCode(params,function (data) {
          if( data.code == 200 ){
            _self.verify_code = data.obj;
            _self.verify_phone = params.mobile;
            _self.count_down(120);
          }
        })
      },

      // 提交
      submit () {
        var _self = this;
        _self.verifyOldPhone(0);
      },
      // 修改用户手机号码
      updateUser(){
        console.log("updateUser:")
        var _self = this;
        if( _self.is_submit == true ) return;
        _self.is_submit = true;
        var params = {
          interfaceId:common.interfaceIds.updateUserById,
          user_id: _self.userInfo._id,
          data:{
            phone: _self.new_phone,
            password: md5(_self.new_phone+_self.password)
          }
        };
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          _self.is_submit = false;
          var data = response.data;
          if( data && data.code == 200 ){
            _self.showToast('修改成功!');
            _self.userInfo.phone = _self.new_phone;
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
  @import '../../../static/css/my/set-num.css';
</style>
