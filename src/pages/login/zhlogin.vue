<template>
  <div class="">
    <div class="header">
      <div class="header-left" v-tap="{methods:goback}"><img src="../../../static/images/back.png"/></div>
      <div class="header-right" v-tap="{ methods:toUrl , pagename:'register'}">注册</div>
    </div>
    <div class="log">
      <div class="log-img">
        <img src="../../../static/images/log.png"/>
      </div>
    </div>
    <div class="login-shuru">
      <p class="tishi"></p>
      <div class="ls-shouji">
        <input v-model="phone" type="tel"class="shouji" placeholder="手机号"/>
        <span class="del">×</span>
      </div>
      <div class="ls-yanzheng">
        <input v-model="password" type="password" class="yanzheng mima" placeholder="密码"/>
        <span class="del">×</span>
      </div>
      <div class="log-btn">登录</div>
    </div>
    <div class="log-botton">
      <div class="lb-left" v-tap="{ methods:toUrl , pagename:'zhlogin'}"><a style="color: #f65aa6;">快速登录</a></div>
      <div class="lb-right"v-tap="{ methods:toUrl , pagename:'wjmm'}"><a>忘记密码？</a></div>
    </div>
    <toast v-model="showMark" :time="1000" type="text" width="5rem">{{showMsg}}</toast>

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
        phone:'',
        password:'',
        showMark:false,
        showMsg:"",
      }
    },
    created: function () {
      var _self = this;
      var phone = common.getStorage('login_account');
      _self.phone = common.checkNull(phone);
    },
    mounted:function(){
      //输入框内有内容时显示清空按钮
      this.checkNumber(".shouji");
      this.checkNumber(".mima");
      //获取焦点时触发判断事件
      this.panduan(".shouji");
      //获取短信验证码
      this.huoquyanzhengma(".msgs", ".shouji");
      //判断输入框不能为空
      this.login(".log-btn",".shouji",".mima");
    },
    methods: {
      goback() {
        this.$router.goBack();
      },
      toUrl: function (params) {
        this.$router.push({name: params.pagename})
      },
      showToast(msg){
        this.showMark = true;
        this.showMsg = msg;
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

      submit () {
        console.log("submit:")
        var _self = this;
        // 避免多次点击
        if( _self.isSubmit == true ) return;
        _self.isSubmit = true;
        var params = {
          interfaceId:common.interfaceIds.login,
          where:{
            "phone":_self.phone,
            "password": _self.password
          }
        }
        if(process.env.NODE_ENV === 'production'){ // production:生产环境,development:开发环境
          var info =plus.push.getClientInfo();
          params.clientid = info.clientid;
        }
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          var data = response.data;
          if( data ){
            if( data.code == 200 ){
              common.setStorage("userInfo",data.result);
              common.setStorage("login_account",_self.phone);
              _self.$store.state.pageIndex = 0;
              _self.toUrl({'pagename':'index'});
              _self.$store.state.designerRefreshMark = 1;
              _self.$store.state.unreadNumRefreshMark = 1;
            }else{
              _self.showToast(data.msg);
            }
          }else{
            _self.showToast("登录失败！")
          }
          setTimeout(function () {
            _self.isSubmit = false;
          },1000);
        })
      },

    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../static/css/login/login.css';
</style>
