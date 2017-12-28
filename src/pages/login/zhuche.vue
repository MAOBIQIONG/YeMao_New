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
        <input type="text"class="shouji nicheng" placeholder="昵称"/>
        <span class="del">×</span>
      </div>
      <div class="ls-shouji">
        <!--<div class="xmlx-left">-->
          <!--<span>类型</span>-->
        <!--</div>-->
        <div class="xmlx-right">
          <select class="xmlx-kuang">
            <option value="volvo">类型</option>
            <option value="saab">策划设计</option>
            <option value="opel">规划设计</option>
            <option value="audi">建筑设计</option>
            <option value="audi">结构设计</option>

            <option value="saab">给排水设计</option>
            <option value="opel">电气设计</option>
            <option value="audi">暖通设计</option>
            <option value="audi">景观设计</option>

            <option value="saab">室内设计</option>
            <option value="opel">软装设计</option>
            <option value="audi">项目经理</option>
            <option value="audi">概预算</option>
            <option value="audi">审图</option>
          </select>
        </div>
      </div>
      <div class="ls-shouji">
        <input type="text"class="shouji sjh" placeholder="手机号"/>
        <span class="del">×</span>
      </div>
      <div class="ls-yanzheng">
        <input type="text"class="yanzheng"maxlength="8" placeholder="验证码"/>
        <div class="dj-shuru"><span class="msgs">点击获取验证码</span></div>
      </div>
    </div>
    <div class="log-btn"><span>下一步</span></div>
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
      this.checkNumber(".nicheng");
      this.checkNumber(".sjh");
      //获取焦点时触发判断事件
      this.panduan(".sjh");
      //获取短信验证码
      this.huoquyanzhengma(".msgs",".sjh");
      //判断输入框不能为空
      this.loge(".log-btn");
      //判断昵称格式是否正确
      this.nichen(".nicheng");
    },
    methods: {
      goback() {
        this.$router.goBack();
      },
      toUrl(name){
        this.$router.push({name:name});
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
      loge(anniu) {
        var obj=this;
        $(anniu).click(function() {
          $("input").each(function() {
            if($("input").val() == "" || $("input").val() == null || $("input").val() == undefined) {
              $('.tishi').text("输入框不能为空");
            } else {
              $('.tishi').text("");
              obj.toUrl('zhuche2');
            }
          })
        })
      },
      //判断昵称格式是否正确
      nichen(valp) {
        $(valp).blur(function() {
          var myreg = /^[a-zA-Z0-9_-]{4,10}$/;
          if(!myreg.test($(valp).val())) {
            $('.tishi').text('昵称为4到10位（字母，数字，下划线，减号）！');
          } else {
            $('.tishi').text("");
          }
        })
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../assets/css/login/zhuche.css';
</style>
