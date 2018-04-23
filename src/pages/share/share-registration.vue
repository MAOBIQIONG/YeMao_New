<template>
  <div>
    <div class="box">
      <!--头部导航-->
      <div class="header">
        <div class="header-left" v-tap="{methods:goback}"><img src="../../../static/images/back.png"/></div>
      </div>
      <div class="bj">
        <div class="log-btn anniu " :class="isValid==true?'anniu-q':''">

        </div>
        <div class="login-shuru">
          <div class="ls-shouji">
            <input v-model="phone" type="tel" class="shouji" id="phone" placeholder="手机号">
            <span class="del">×</span>
          </div>
          <div class="ls-yanzheng">
            <input type="number" class="yanzheng" maxlength="6" placeholder="验证码" ref="code">
            <div class="dj-shuru">
              <span class="msgs" ref="verify_btn" v-tap="{methods:verifyParams}">获取验证码</span>
            </div>
          </div>
          <p class="tishi" ref="tips"></p>
        </div>
        <!--弹窗-->
        <toast v-model="showMark" :time="1000" type="text" width="5rem">{{showMsg}}</toast>
      </div>
    </div>
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
    data() {
      return {
        isValid:false,
        phone: '',
        is_verify: false,
        verify_code: '',  // 加密验证码
        verify_phone: '', // 验证手机号
        showMark: false,
        showMsg: "",
      }
    },
    store,
    created: function () {
      var _self = this;
      var phone = common.getObjStorage('login_account');
      _self.phone = common.checkNull(phone);
    },
    mounted: function () {
      //输入框内有内容时显示清空按钮
      this.checkNumber(".shouji");
      //获取焦点时触发判断事件
      this.panduan("#phone");
      //获取短信验证码
      // this.huoquyanzhengma(".msgs", ".shouji");
      //判断输入框不能为空
      this.login(".log-btn", ".shouji");
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
        var obj = this;
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
      showToast(msg) {
        this.showMark = true;
        this.showMsg = msg;
      },
      submit() {
        console.log("submit:")
        var _self = this;
        // 避免多次点击
        if (_self.isSubmit == true) return;
        _self.isSubmit = true;
        var params = {
          interfaceId: common.interfaceIds.login,
          where: {
            "phone": _self.phone
          }
        }
        if (process.env.NODE_ENV === 'production') { // production:生产环境,development:开发环境
          var info = plus.push.getClientInfo();
          params.clientid = info.clientid;
        }
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          var data = response.data;
          if (data) {
            _self.verify_code = '';  // 清除验证码
            _self.verify_phone = ''; // 清除获取验证码手机号
            if (data.code == 200) {
              common.setStorage("userInfo", data.result);
              common.setStorage("login_account", _self.phone);
              this.$store.state.pageIndex = 0;
              _self.toUrl({'pagename': 'index'});
            } else {
              _self.showToast(data.msg);
            }
          } else {
            _self.showToast("登录失败！")
          }
          setTimeout(function () {
            _self.isSubmit = false;
          }, 1000);
        })
      },

      // 手机验证
      verifyPhone() {
        var _self = this;
        var reg = /^1[0-9]{10}$/;
        if (common.isNull(_self.phone)) {
          _self.$refs.tips.innerText = '手机号不能为空';
          return false;
        } else if (!reg.test(_self.phone)) {
          _self.$refs.tips.innerText = '请输入有效的手机号码';
          return false;
        }
        return true;
      },

      // 验证码验证
      verifyCode() {
        var _self = this;
        var code = _self.$refs.code.value;
        if (common.isNull(_self.verify_code)) {
          _self.$refs.tips.innerText = '请获取验证码!';
          return false;
        } else if (common.isNull(code)) {
          _self.$refs.tips.innerText = '请输入验证码!';
          return false;
        } else if (_self.phone != _self.verify_phone) {
          _self.$refs.tips.innerText = '手机号码不匹配!';
          return false;
        } else if (md5(code) !== _self.verify_code) {
          _self.$refs.tips.innerText = '验证码错误!';
          return false;
        }
        return true;
      },

      // 倒计时
      count_down(time) {
        var _self = this;
        _self.$refs.verify_btn.innerText = time + "秒后重新获取";
        var interval = setInterval(function () {
          if (!_self.$refs.verify_btn) return;
          // 开始
          time--;
          _self.$refs.verify_btn.innerText = time + "秒后重新获取";
          if (time <= 0) {
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
      getVerificationCode() {
        var _self = this;
        // 获取验证码
        var params = {
          'mobile': _self.phone,
          'template': '3064129'
        }
        interfaces.getVerifyCode(params, function (data) {
          if (data.code == 200) {
            _self.verify_code = data.obj;
            _self.verify_phone = params.mobile;
            _self.count_down(120);
          }
        })
      },

      // 获取验证码
      verifyParams() {
        var _self = this;
        // 验证手机号码
        if (!_self.verifyPhone()) {
          return;
        }
        // 设置获取验证码状态
        if (_self.is_verify == true) return;
        _self.is_verify = true;
        _self.isValid=true;
        _self.checkUser();
      },
      // 检测用户是否存在
      checkUser() {
        var _self = this;
        let params = {
          interfaceId: common.interfaceIds.checkUser,
          phone: _self.phone
        };
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          // _self.is_verify = false;
          var data = response.data;
          if (data) {
            if (data.code == 201) {
              _self.getVerificationCode();
            } else {
              if (!common.isNull(data.msg)) {
                _self.showToast(data.msg);
              } else {
                _self.showToast('网络异常，请重试!');
              }
            }
          } else {
            _self.showToast('网络异常，请重试!');
          }
        })
      },

    },
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header {
    background: transparent;
    border-bottom: none;
  }

  .box {
    position: relative;
    width: 7.5rem;
    height: 14rem;
    background: url("../../../static/images/share/share2.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .bj {
    position: absolute;
    width: 5.5rem;
    height: 3rem;
    background: url("../../../static/images/share/zcbj.png");
    background-size: 100% auto;
    background-repeat: no-repeat;
    bottom: .3rem;
    left: 1rem;
  }
  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    .box {
      height: 16rem;
    }
    .bj {
      bottom: .6rem;
    }
  }
  .anniu{
    width: 2.8rem;
    height: 0.6rem;
    background-image: url("../../../static/images/share/djq.png");
    background-size: 100% auto;
    background-repeat: no-repeat;
    margin:auto;
    margin-top: 0.4rem;
  }
  .anniu-q{
    background-image: url("../../../static/images/share/lml.png");

  }
  .login-shuru {
    width: 100%;
    height: 1.55rem;
    position: relative;
  }

  .login-shuru .tishi {
    position: absolute;
    width: 5rem;
    font-size: 0.28rem;
    bottom:0rem;
    left: 0.7rem;
    color: #f6f336;
  }
  .login-shuru .ls-shouji,
  .login-shuru .ls-yanzheng{
    width: 4.1rem;
    height: 0.5rem;
    margin: auto;
    margin-top: 0.15rem;
    position: relative;
  }
  .login-shuru .ls-yanzheng{
    background: none;
  }
  .login-shuru .ls-shouji .shouji,
  .login-shuru .ls-shouji .yanzheng,
  .login-shuru .ls-yanzheng .shouji,
  .login-shuru .ls-yanzheng .yanzheng {
    width: 4.1rem;
    height: 0.5rem;
    display: block;
    border: none;
    background: transparent;
    font-size: 0.28rem;
    color: #757575;
    padding-left: 0.1rem;
    outline: medium;
  }
  .login-shuru .ls-shouji .shouji{
    background: url("../../../static/images/share/kuan.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .login-shuru .ls-yanzheng .yanzheng{
    width: 2rem;
    height: 0.5rem;
    margin-left:0;
    background: url("../../../static/images/share/kuan.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .login-shuru .ls-shouji .del,
  .login-shuru .ls-yanzheng .del {
    width: 0.5rem;
    height: 0.5rem;
    text-align: center;
    line-height: 0.5rem;
    position: absolute;
    top: 0rem;
    right: 0.2rem;
    font-size: 0.4rem;
    display: inline-block;
    display: none;
  }

  .login-shuru .ls-shouji .dj-shuru,
  .login-shuru .ls-yanzheng .dj-shuru {
    width: 2rem;
    text-align: center;
    position: absolute;
    top: 0;
    right: 0rem;
    height: 0.5rem;
    line-height: 0.55rem;
    font-size: 0.24rem;
    color: #FFFFFF;
  }
</style>
