<template>
  <div class="">
    <div class="header">
      <div class="header-left"v-tap="{methods:goback}"><img src="../../../static/images/back.png"/></div>
    </div>
    <div class="zc-piaoti">
      <span>欢迎注册成为夜猫会员</span>
    </div>
    <div class="login-shuru">
      <p class="tishi"></p>
      <div class="ls-shouji">
        <input type="password"class="shouji mima" placeholder="密码" v-model="param.password"/>
        <span class="del">×</span>
      </div>
      <div class="ls-shouji">
        <input type="password"class="shouji qrmm" placeholder="确认密码" v-model="param.passwordConfirm"/>
        <span class="del">×</span>
      </div>
    </div>
    <div class="log-btn" v-tap="{methods:register}"><span>完成</span></div>
    <!-- <toast v-model="showPositionValue" type="text" :time="800" is-show-mask text="注册成功" :position="position" width="3em">注册成功</toast> -->
    <toast v-model="show" type="text" width="4em" :text="toastText"></toast>
  </div>
</template>

<script>
  import { Toast, Group, XSwitch, XButton } from 'vux'
  import md5 from 'js-md5';
  export default {
    data () {
      return {
        param:{
            password:null,
            passwordConfirm:null
        },
        position: 'default',
        show:false,
        toastText:"请正确填写密码",
        toastNotSame:"两次密码不一样",
        toastNotReg:"密码为6-16位的数字或字母",
        toastSuccess:"注册成功",
        toastFail:"注册失败"
      }
    },
    components: {
        Toast,
        Group,
        XSwitch,
        XButton
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
      showPosition (position) {
        this.position = position
        this.showPositionValue = true
      },
      onHide () {
        console.log('on hide')
      },
      onChange (val) {
        const _this = this
        if (val) {
          this.$vux.toast.show({
            text: 'Hello World',
            onShow () {
              console.log('Plugin: I\'m showing')
            },
            onHide () {
              console.log('Plugin: I\'m hiding')
              _this.show9 = false
            }
          })
        } else {
          this.$vux.toast.hide()
        }
      },

      goback () {
        this.$router.goBack()
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
      //判断输入框不能为空
      login(anniu, shouji, valp) {
        $(anniu).click(function () {
          var username = $.trim($(shouji).val()); //获取到手机号
          var myreg = /^1[0-9]{10}$/;
          var mima = /^[0-9a-zA-Z_#]{6,16}$/;
          $("input").each(function () {
            let v = $(this).val();
            if (v == "") {
              $('.tishi').text("输入框不能为空");

            }  else if (!mima.test($(valp).val())) {
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
      },
      register(){
        let _self = this;
        let regpwd =/^[0-9a-zA-Z_#]{6,16}$/;

        if(!regpwd.test(_self.param.password)){
          _self.toastText = _self.toastNotReg;
          _self.show=true;
          return;
        }
        if(_self.param.password != _self.param.passwordConfirm) {
          _self.toastText = _self.toastNotSame;
          _self.show=true;
          return;
        }

        let user_name = common.op_localStorage().get('nickname');
        let phone = common.op_localStorage().get('mobile_phone');
        let user_type =common.op_localStorage().get('user_type');
        console.log(user_type)
        let password = _self.param.password;
        let params= {
          interfaceId:common.interfaceIds.registerUser,
          data:{
            user_name: user_name,
            password: password,
            phone: phone,
            user_type: user_type,
            img: common.getRandomAvatar(),
          },
        };
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          var data = response.data;
          if( data && data.code == 200 ) {
            _self.toastText=_self.toastSuccess;
            _self.show=true;
            setTimeout(function () {
              _self.$router.go(-2)
            },1000)
          }else{
            _self.toastText=_self.toastFail;
            _self.show=true;
          }
        })
      }

    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../static/css/login/zhuche.css';
</style>
