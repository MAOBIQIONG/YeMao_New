<template>
  <div class="">
    <div class="header">
      <div class="header-left" v-tap="{methods:goback}"><img src="../../../static/images/back.png"/></div>
    </div>
    <div class="zc-piaoti">
      <span>欢迎注册成为夜猫会员</span>
    </div>
    <div class="login-shuru">
      <p class="tishi"></p>
      <div class="ls-shouji">
        <input type="text"class="shouji nicheng" placeholder="昵称" v-model="param.nickname"/>
        <span class="del" v-if="param.nickname.length>0" v-tap="{methods:clearInput,index:0}">×</span>
      </div>
      <div class="ls-shouji">
        <div class="xmlx-right">
          <select class="xmlx-kuang" v-model="param.user_type">
            <option value="null" selected="selected">类型</option>
            <option v-for="(item,index) in typeList" :key="index" :value="item._id">{{item.type_name}}</option>
          </select>
        </div>
      </div>
      <div class="ls-shouji">
        <input type="tel" class="shouji sjh" placeholder="手机号" v-model="param.mobile_phone"/>
        <span class="del" v-if="param.mobile_phone.length>0" v-tap="{methods:clearInput,index:1}">×</span>
      </div>
      <div class="ls-yanzheng">
        <input type="text" class="yanzheng" maxlength="8" placeholder="验证码"  v-model="param.verifying_code" ref="code"/>
        <div class="dj-shuru" ref="verify_btn" v-tap="{methods:verifyParams}"><span class="msgs">点击获取验证码</span></div>
      </div>
    </div>
    <div class="log-btn" v-tap="{methods:nextStep}"><span>下一步</span></div>
    <toast v-model="show" type="text" width="4em" :text="showText"></toast>
  </div>
</template>

<script>
    import  { Toast } from 'vux'
    import interfaces from '../../../static/js/es6/interface'
    import md5 from 'js-md5';
    export default {
      components:{
          Toast
      },
    data () {
      return {
        param:{
          nickname:'',
          mobile_phone:'',
          verifying_code:'',
          user_type: null
        },
        show:false,
        showText:"请正确填写信息",
        showTextNoType:"请选择设计类型",
        showTextNoPhone:"请输入手机号",
        showTextWrongName:"昵称须为2到10个字符,可由中英文、数字、'_'、'-'组成",
        showTextWrongPhone:"请输入有效的手机号码",
        typeList:common.getProjectTypes(),

        is_verify:false,
        verify_code:'', // 加密验证码
        verify_phone:'' // 验证手机号
      }
    },
    mounted: function () {
      //输入框内有内容时显示清空按钮
//      this.checkNumber(".nicheng");
//      this.checkNumber(".sjh");
//      //获取焦点时触发判断事件
//      this.panduan(".sjh");
//      //获取短信验证码
//      this.huoquyanzhengma(".msgs",".sjh");
//      //判断输入框不能为空
//      this.loge(".log-btn");
//      //判断昵称格式是否正确
//      this.nichen(".nicheng");
    },
    methods: {
      goback() {
        this.$router.goBack();
      },
      toUrl(name){
        this.$router.push({name:name});
      },
      clearInput(params){
        if( params.index == 0 ){
          this.param.nickname = '';
        }else if( params.index == 1 ){
          this.param.mobile_phone = '';
        }
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
      loge(anniu) {
        var obj=this;
        $(anniu).click(function() {
          $("input").each(function() {
            if($("input").val() == "" || $("input").val() == null || $("input").val() == undefined) {
              $('.tishi').text("输入框不能为空");
            } else {
              $('.tishi').text("");
            //   obj.toUrl('zhuche2');
            }
          })
        })
      },
      //判断昵称格式是否正确
      nichen(valp) {
        $(valp).blur(function() {
          var myreg = /^[a-zA-Z0-9\u4e00-\u9fa5_-]{2,10}$/;
          if(!myreg.test($(valp).val())) {
            $('.tishi').text("昵称须为2到10个字符,可由中英文、数字、'_'、'-'组成");
          } else {
            $('.tishi').text("");
          }
        })
      },

      /*************************************/
      // 验证码验证
      verifyCode(){
        var _self = this;
        var code = _self.$refs.code.value;
        if ( common.isNull(_self.verify_code) ) {
          _self.showText = '请获取验证码!';
          _self.show = true;
          return false;
        } else if( common.isNull(code) ){
          _self.showText = '请输入验证码!';
          _self.show = true;
          return false;
        } else if( _self.param.mobile_phone != _self.verify_phone ){
          _self.showText = '手机号码不匹配!';
          _self.show = true;
          return false;
        }else if( md5(code) !== _self.verify_code ){
          _self.showText = '验证码错误!';
          _self.show = true;
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
      verifyParams () {
        var _self = this;
        // 验证手机号码
        if(common.isNull(_self.param.mobile_phone)){
          _self.showText = _self.showTextNoPhone;
          _self.show = true;
          return;
        }
        var regMobilePhone = /^1[0-9]{10}$/;
        if(!regMobilePhone.test(_self.param.mobile_phone)){
          _self.showText = _self.showTextWrongPhone;
          _self.show = true;
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
        var params= {
          interfaceId:common.interfaceIds.checkUser,
          phone:_self.param.mobile_phone
        };
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          var data = response.data;
          if( data ) {
            if( data && data.code == 200 ){
              _self.getVerificationCode();
            }else{
              _self.is_verify = false;
              _self.showText = '网络异常，请重试!';
              if( !common.isNull(data.msg) ){
                _self.showText = data.msg;
              }
              _self.show = true;
            }
          }else{

            _self.showText = '网络异常，请重试!';
            _self.show = true;
          }
        })
      },

      // 获取验证码
      getVerificationCode () {
        var _self = this;
        // 获取验证码
        var params = {
          'mobile': _self.param.mobile_phone,
          'template': '3064129'
        }
        interfaces.getVerifyCode(params,function (data) {
          console.log("data.code:"+data.code)
          if( data.code == 200 ){
            _self.verify_code = data.obj;
            _self.verify_phone = params.mobile;
            _self.count_down(120);
          }else{
            _self.is_verify = false;
          }
        })
      },
      /*************************************/
      nextStep(){
        var _self = this;
        var regNickname = /^[a-zA-Z0-9\u4e00-\u9fa5_-]{2,10}$/;
        var regMobilePhone = /^1[0-9]{10}$/;
        if(!regNickname.test(_self.param.nickname)){
            _self.showText = _self.showTextWrongName
            _self.show = true;
            return;
        }
        if(common.isNull(_self.param.user_type)){
            _self.showText = _self.showTextNoType
            _self.show = true;
            return;
        }
        if(common.isNull(_self.param.mobile_phone)){
            _self.showText = _self.showTextNoPhone;
            _self.show = true;
            return;
        }
        if(!regMobilePhone.test(_self.param.mobile_phone)){
            _self.showText = _self.showTextWrongPhone;
            _self.show = true;
            return;
        }
//        if( !_self.verifyCode() ){
//            return;
//        }
        common.setStorage("nickname",_self.param.nickname)
        common.setStorage("mobile_phone",_self.param.mobile_phone)
        common.setStorage("verifying_code",_self.param.verifying_code)
        common.setStorage("user_type",_self.param.user_type)
        setTimeout(function () {
          _self.toUrl('zhuche2');
        },50)

      },

    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../static/css/login/zhuche.css';
</style>
