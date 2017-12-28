<template>
  <div class="">
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png"/></div>
    </div>
    <div class="zc-piaoti">
      <span>欢迎注册成为夜猫会员</span>
    </div>
    <div class="login-shuru">
      <p class="tishi"></p>
      <div class="ls-shouji">
        <input type="password"class="shouji mima" placeholder="密码"/>
        <span class="del">×</span>
      </div>
      <div class="ls-shouji">
        <input type="password"class="shouji qrmm" placeholder="确认密码"/>
        <span class="del">×</span>
      </div>
    </div>
    <div class="log-btn"><span>完成</span></div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    mounted: function () {
      //输入框内有内容时显示清空按钮
      this.checkNumber(".mima");
      this.checkNumber(".qrmm");
      //判断输入框不能为空
      this.login(".log-btn",".sjh");
      //判断两方是否相同
      this.panduanxiangtong(".log-btn",'.mima',".qrmm")
      //判断密码格式是否正确
      this.mima('.mima')
    },
    methods: {
      goback () {
        this.$router.goBack()
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
      },
      //判断两方是否相同
      panduanxiangtong(anniu, v1, v2) {
        $(anniu).click(function() {
          var vl1 = $.trim($(v1).val());
          var vl2 = $.trim($(v2).val());
          if(vl1 !== vl2) {
            $('.tishi').text("两次密码不同");
            return false;
          }
        });
      },
      //判断密码格式是否正确
      mima(valp) {
        $(valp).blur(function() {
          var myreg = /^[0-9a-zA-Z_#]{6,16}$/;
          if(!myreg.test($(valp).val())) {
            $('.tishi').text('密码为6-16位的数字或字母！');
          } else {
            $('.tishi').text("");

          }
        })
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../assets/css/login/zhuche.css';
</style>
