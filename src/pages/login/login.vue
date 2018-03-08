<template>
  <div class="">
    <!--头部导航-->
    <div class="header">
      <div class="header-left" v-tap="{methods:goback}"><img src="../../../static/images/back.png"/></div>
      <div class="header-right zc"v-tap="{ methods:toUrl , pagename:'zhuche'}">注册</div>
    </div>
    <!--log-->
    <div class="log clear">
      <div class="log-img">
        <img src="../../../static/images/log.png"/>
      </div>
    </div>
    <!--登陆-->
    <div class="login-shuru">
      <p class="tishi" ref="tips"></p>
      <div class="ls-shouji">
        <input v-model="phone" type="tel" class="shouji" id="phone" placeholder="手机号">
        <span class="del">×</span>
      </div>
      <div class="ls-yanzheng">
        <input type="number" class="yanzheng" maxlength="6" placeholder="验证码" ref="code">
        <div class="dj-shuru">
          <span class="msgs" ref="verify_btn" v-tap="{methods:verifyParams}">点击获取验证码</span>
        </div>
      </div>
      <div class="log-btn">登录</div>
    </div>
    <div class="log-botton">
      <div class="lb-left" v-tap="{methods:goback}">账号密码登录</div>
      <div class="lb-right" v-tap="{ methods:toUrl , pagename:'wjmm'}">忘记密码？</div>
    </div>
    <!--弹窗-->
    <div class="tanchuang">
      <div class="tisi">
        <div class="ts-top">
          标题行
        </div>
        <div class="nr">
          说明当前情况，提示解决方案，不要超过两行
        </div>
        <div class="ts-bottom">
          <div class="bt-left quxiao">
            取消
          </div>
          <div class="bt-right">
            确定
          </div>

        </div>
      </div>
    </div>

    <toast v-model="showMark" :time="1000" type="text" width="5rem">{{showMsg}}</toast>
  </div>
</template>

<script>
  import { Toast, } from 'vux'
  import store from '@/vuex/store'
  import interfaces from '../../../static/js/es6/interface'
  import md5 from 'js-md5';
  export default {
    components: {
      Toast,
    },
    data () {
      return {
        phone:'',
        is_verify:false,
        verify_code:'',  // 加密验证码
        verify_phone:'', // 验证手机号
        showMark:false,
        showMsg:"",
      }
    },
    store,
    created: function () {
      var _self = this;
      var phone = common.getObjStorage('login_account');
      _self.phone = common.checkNull(phone);
    },
    mounted:function(){
      //输入框内有内容时显示清空按钮
      this.checkNumber(".shouji");
      //获取焦点时触发判断事件
      this.panduan("#phone");
      //获取短信验证码
      // this.huoquyanzhengma(".msgs", ".shouji");
      //判断输入框不能为空
      this.login(".log-btn",".shouji");
    },
    methods: {
      goback() {
        this.$router.goBack();
      },
      toUrl: function (params) {
        this.$router.push({name: params.pagename})
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
      //获取短信验证码
      huoquyanzhengma(obj, shouji) {
        var _self = this;

        var validCode = true;
        $(obj).click(function () {
          var username = $.trim($(shouji).val());
          var myreg = /^1[0-9]{10}$/;
          var time = 30;
          var code = $(this);
          if (username == "" || username == null || username == undefined) {
            $('.tishi').text("手机号不能为空");
          } else if (!myreg.test($(shouji).val())) {
            $('.tishi').text('请输入有效的手机号码！');
            return false;
          } else {
            $('.tishi').text('')
            if (validCode) {
              validCode = false;
              code.addClass("msgs1"); //可以改变当前颜色的类名
              var t = setInterval(function () {
                time--;
                code.html(time + "秒后重新获取");
                if (time <= 0) {
                  clearInterval(t);
                  code.html("重新获取");
                  validCode = true;
                  code.removeClass("msgs1");
                  // 重置获取验证码状态
                  _self.is_verify = false;
                  _self.verify_code = '';
                  _self.verify_phone = '';
                }
              }, 1000)
            }
          }
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
      //判断输入框不能为空
      login(anniu, shouji, valp) {
        var obj=this;
        $(anniu).click(function () {
          var username = $.trim($(shouji).val()); //获取到手机号
          var myreg = /^1[0-9]{10}$/;
          var mima = /^[0-9a-zA-Z_#]{6,16}$/;
          $("input").each(function () {
            let v = $(this).val();
            if (v == "") {
              $('.tishi').text("输入框不能为空");
            } else if (!myreg.test($(shouji).val())) {
              $('.tishi').text('请输入有效的手机号码！');
              return false;
            } else if (!obj.verifyCode()) {
              return false;
            } else {
              $('.tishi').text("");
              obj.submit();
            }
          })
        })
      },

      /*************************************/
      showToast(msg){
        this.showMark = true;
        this.showMsg = msg;
      },
      submit () {
        var _self = this;
        var params = {
          interfaceId:common.interfaceIds.login,
          where:{
            "phone":_self.phone
          }
        }
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          var data = response.data;
          if( data ){
            _self.verify_code = '';  // 清除验证码
            _self.verify_phone = ''; // 清除获取验证码手机号
            if( data.code == 200 ){
              common.setStorage("userInfo",data.result);
              common.setStorage("login_account",_self.phone);
              this.$store.state.pageIndex = 0;
              _self.toUrl({'pagename':'index'});
            }else{
              _self.showToast(data.msg);
            }
          }else{
            _self.showToast("登录失败！")
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
        } else if( _self.phone != _self.verify_phone ){
          _self.$refs.tips.innerText = '手机号码不匹配!';
          return false;
        } else if( md5(code) !== _self.verify_code ){
          _self.$refs.tips.innerText = '验证码错误!';
          return false;
        }
        return true;
      },

      // 倒计时
      count_down(time){
        var _self = this;
        _self.$refs.verify_btn.innerText = time + "秒后重新获取";
        var interval = setInterval(function () {
          if( !_self.$refs.verify_btn ) return;
          // 开始
          time--;
          _self.$refs.verify_btn.innerText = time + "秒后重新获取";
          if( time <= 0 ) {
            clearInterval(interval);
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
          // _self.is_verify = false;
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

    },
  }
</script>

<style>
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../static/css/login/login.css';
</style>
