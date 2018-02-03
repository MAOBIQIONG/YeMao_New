<template>
  <div class="">
    <div class="header">
      <div class="header-left"v-tap="{methods:goback}"><img src="../../../static/images/back.png"/></div>
      <span>忘记密码</span>
    </div>
    <div class="zc-piaoti">
      <span>输入你的手机号获取验证码<br />进行密码重置</span>
    </div>
    <div class="login-shuru">
      <p class="tishi" ref="tips"></p>
      <div class="ls-shouji">
        <input v-model="phone" type="text" class="shouji" id="phone" placeholder="手机号">
        <span class="del">×</span>
      </div>
      <div class="ls-yanzheng">
        <input type="text" class="yanzheng" id="yanzhengma" maxlength="6" placeholder="验证码" ref="code"/>
        <div class="dj-shuru"><span class="msgs" ref="verify_btn" v-tap="{methods:verifyParams}">点击获取验证码</span></div>
      </div>
      <div class="ls-xma">
        <input v-model="password" type="password"class="xma"id="xma" placeholder="新密码"/>
        <span class="del">×</span>
      </div>
    </div>
    <div class="wj-queding" v-tap="{methods:submit}">确 定</div>
    <toast v-model="showMark" :time="1000" type="text" width="5rem">{{showMsg}}</toast>
  </div>
</template>

<script>
  import { Toast, } from 'vux'
  import interfaces from  '../../../static/js/interface'
  import md5 from 'js-md5';
  export default {
    components: {
      Toast,
    },
    data() {
      return {
        phone:'',
        password:'',
        is_submit:false,
        verify_code:'',  // 加密验证码
        verify_phone:'', // 验证手机号
        showMark:false,
        showMsg:"",
      }
    },
    created: function () {

    },
    mounted: function () {
      //输入框内有内容时显示清空按钮
      this.checkNumber("#phone");
      this.checkNumber(".xma");
      //获取焦点时触发判断事件
      this.panduan("#phone");
      // 获取短信验证码
      // this.huoquyanzhengma(".msgs", ".shouji");
      // 判断输入框不能为空
      // this.login(".wj-queding", ".shouji", ".xma");
    },
    methods: {
      goback() {
        this.$router.goBack();
      },
      //输入框内有内容时显示清空按钮
      checkNumber(obj) {
        $(obj).bind('input propertychange', function () {
          var sj = $(this).val()
          if (sj == '') {
            $(obj).next('.del').css('display', 'none')
          } else {
            $(obj).next('.del').css('display', 'block')
          }
        });
        //点击消除按钮清空
        $(obj).next('.del').on('click', function () {
          $('.tishi').text('')
          $(obj).val('')
          $(obj).next('.del').css('display', 'none')
        })
      },
      //获取焦点时触发判断事件
      panduan(obj) {
        $(obj).blur(function () {
          var username = $.trim($(obj).val());
          var myreg = /^1[0-9]{10}$/;
          if (!myreg.test($(obj).val())) {
            $('.tishi').text('请输入有效的手机号码！');
            return false;
          } else {
            $('.tishi').text('')
          }
        });
      },

      /*************************************/
      showToast(msg){
        this.showMark = true;
        this.showMsg = msg;
      },
      submit () {
        var _self = this;
        // 验证手机号码
        if( !_self.verifyPhone() ){
          return;
        }
        // 验证码验证
        if( !_self.verifyCode() ){
          return;
        }
        // 密码验证
        if( !_self.verifyPassword() ){
          return;
        }
        // 避免多次提交
        if( _self.is_submit == true ) return;
        _self.is_submit = true
        // 提交
        var params = {
          interfaceId:common.interfaceIds.updateData,
          coll:'users',
          wheredata:{"phone":_self.phone},
          data:{
            $set:{
              password: _self.password
            }
          }
        }
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          _self.is_submit = false;
          var data = response.data;
          if( data ){
            if( data.n == 0 ){
              _self.showToast("该用户不存在！")
            }else if( data.n==1 && data.nModified==1 && data.ok==1 ){
              _self.showToast("修改成功！");
              setTimeout(function () {
                _self.goback();
              },1000)
            }
          }else{
            _self.showToast("修改失败！")
          }
        })
      },

      // 手机验证
      verifyPhone(){
        var _self = this;
        var reg = /^1[0-9]{10}$/;
        if ( common.isNull(_self.phone) ) {
          _self.$refs.tips.innerText = '手机号不能为空';
          return false;
        } else if (!reg.test(_self.phone)) {
          _self.$refs.tips.innerText = '请输入有效的手机号码';
          return false;
        } return true;
      },

      // 验证码验证
      verifyCode(){
        var _self = this;
        var code = _self.$refs.code.value;
        if ( common.isNull(_self.verify_code) ) {
          _self.$refs.tips.innerText = '请获取验证码!';
          return false;
        } else if( common.isNull(code) ){
          _self.$refs.tips.innerText = '请输入验证码!';
          return false;
        }else if( _self.phone != _self.verify_phone ){
          _self.$refs.tips.innerText = '手机号码不匹配!';
          return false;
        } else if( md5(code) !== _self.verify_code ){
          _self.$refs.tips.innerText = '验证码错误!';
          return false;
        }
        return true;
      },

      // 密码验证
      verifyPassword(){
        var _self = this;
        var reg = /^[A-Za-z0-9]{6,16}$/;
        if( common.isNull(_self.password) ){
          _self.$refs.tips.innerText = '请输入密码!';
          return false;
        } else if( !reg.test(_self.password) ){
          _self.$refs.tips.innerText = '密码为6-16位的数字或字母！';
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
        var _self = this;
        // 获取验证码
        var params = {
          'mobile': _self.phone,
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

      // 获取验证码
      verifyParams () {
        var _self = this;
        // 验证手机号码
        if( !_self.verifyPhone() ){
          return;
        }
        // 设置获取验证码状态
        if( _self.is_verify == true ) return;
        _self.is_verify = true;
        _self.checkUser();
      },

      // 检测用户是否存在
      checkUser(){
        var _self = this;
        let params= {
          interfaceId:common.interfaceIds.checkUser,
          phone:_self.phone
        };
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          _self.is_verify = false;
          var data = response.data;
          if( data ) {
            if( data.code == 201 ){
              _self.getVerificationCode();
            }else{
              if( !common.isNull(data.msg) ){
                _self.showToast(data.msg);
              }else{
                _self.showToast('网络异常，请重试!');
              }
            }
          }else{
            _self.showToast('网络异常，请重试!');
          }
        })
      },

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../static/css/login/wjmm.css';
</style>
