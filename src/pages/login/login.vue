<template>
  <div class="">
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png"/></div>
      <div class="header-right zc"@click="toUrl('zhuche')">注册</div>
    </div>
    <!--log-->
    <div class="log clear">
      <div class="log-img">
        <img src="../../../static/images/log.png"/>
      </div>
    </div>
    <!--登陆-->
    <div class="login-shuru">
      <p class="tishi"></p>
      <div class="ls-shouji">
        <input v-model="phone" type="text" class="shouji" id="phone" placeholder="手机号">
        <span class="del">×</span>
      </div>
      <div class="ls-yanzheng">
        <input type="text"class="yanzheng"id="yanzhengma"maxlength="8"placeholder="验证码">
        <div class="dj-shuru"><span class="msgs">点击获取验证码</span></div>
      </div>
      <div class="log-btn">登录</div>
    </div>
    <div class="log-botton">
      <div class="lb-left"@click="toUrl('zhlogin')">账号密码登录</div>
      <div class="lb-right"@click="toUrl('wjmm')">忘记密码？</div>
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
  import common from '../../../static/common';
  export default {
    components: {
      Toast,
    },
    data () {
      return {
        phone:"",
        showMark:false,
        showMsg:"",
      }
    },
    store,
    created: function () {
      this.submit();
    },
    mounted:function(){
      //输入框内有内容时显示清空按钮
      this.checkNumber(".shouji");
      //获取焦点时触发判断事件
      this.panduan("#phone");
      //获取短信验证码
      this.huoquyanzhengma(".msgs", ".shouji");
      //判断输入框不能为空
      this.login(".log-btn",".shouji");
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
      login(anniu, shouji, valp) {
        var obj=this;
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
          interfaceId:'queryData',
          coll:'users',
          where:{
            "phone":_self.phone
          }
        }

        _self.$axios.post('/api/mongoApi',{
          params:params
        }).then((response)=>{
          var data = response.data.data;
          if( data ){
            console.log("data:"+JSON.stringify(data))
            if( data.length == 1 ){
              common.setStorage("userInfo",data[0]);
              this.$store.state.pageIndex = 0;
              _self.toUrl('index');
            }else if( data.length == 0 ){
              _self.showToast("用户不存在！")
            }else if( data.length > 1 ){
              _self.showToast("帐户重复，请联系管理员！")
            }
          }else{
            _self.showToast("用户不存在！")
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
  @import '../../assets/css/login/login.css';
</style>
