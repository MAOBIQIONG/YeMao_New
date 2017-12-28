<template>
  <div class="">
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png"/></div>
      <span>忘记密码</span>
    </div>
    <div class="zc-piaoti">
      <span>输入你的手机号获取验证码<br />进行密码重置</span>
    </div>
    <div class="login-shuru">
      <p class="tishi"></p>
      <div class="ls-shouji">
        <input type="text"class="shouji"id="phone" placeholder="手机号">
        <span class="del">×</span>
      </div>
      <div class="ls-yanzheng">
        <input type="text"class="yanzheng"id="yanzhengma"maxlength="8"placeholder="验证码"/>
        <div class="dj-shuru"><span class="msgs">点击获取验证码</span></div>
      </div>
      <div class="ls-xma">
        <input type="password"class="xma"id="xma" placeholder="新密码"/>
        <span class="del">×</span>
      </div>
    </div>
    <div class="wj-queding">确 定</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    created: function () {

    },
    mounted: function () {
      //输入框内有内容时显示清空按钮
      this.checkNumber("#phone");
      this.checkNumber(".xma");
      //获取焦点时触发判断事件
      this.panduan("#phone");
      //获取短信验证码
      this.huoquyanzhengma(".msgs", ".shouji");
      //判断输入框不能为空
      this.login(".wj-queding", ".shouji", ".xma");
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
      //获取短信验证码
      huoquyanzhengma(obj, shouji) {
        var validCode = true;
        $(obj).click(function () {
          var username = $.trim($(shouji).val());
          var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
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
                if (time == 0) {
                  clearInterval(t);
                  code.html("重新获取");
                  validCode = true;
                  code.removeClass("msgs1");
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
          var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
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
        $(anniu).click(function () {
          var username = $.trim($(shouji).val()); //获取到手机号
          var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
          var mima = /^[0-9a-zA-Z_#]{6,16}$/;
          $("input").each(function () {
            let v = $(this).val();
            if (v == "") {
              $('.tishi').text("输入框不能为空");

            } else if (!myreg.test($(shouji).val())) {
              $('.tishi').text('请输入有效的手机号码！');
              return false;
            } else if (!mima.test($(valp).val())) {
              $('.tishi').text('密码为6-16位的数字或字母！');
              return false;
            } else {
              $('.tishi').text("");
            }
          })
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../assets/css/login/wjmm.css';
</style>
