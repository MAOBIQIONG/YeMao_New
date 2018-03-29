<template>
  <div class="">
    <div class="login-shuru">
      <p class="my-toast" v-if="show" v-text="showText"></p>
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
        <input type="text" class="shouji sjh" placeholder="手机号" v-model="param.mobile_phone"/>
        <span class="del" v-if="param.mobile_phone.length>0" v-tap="{methods:clearInput,index:1}">×</span>
      </div>
      <div class="ls-yanzheng">
        <input type="text" class="yanzheng" maxlength="8" placeholder="验证码"  v-model="param.verifying_code" ref="code"/>
        <div class="dj-shuru" ref="verify_btn" v-tap="{methods:verifyParams}"><span class="msgs">点击获取验证码</span></div>
      </div>
    </div>
    <div class="log-btn" v-tap="{methods:nextStep}"><span>下一步</span></div>
  </div>
</template>

<script>
  import interfaces from '../../../static/js/es6/interface'
  import md5 from 'js-md5';
  export default {
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
        showTextWrongName:"昵称须为2到10个字符,中英文、数字、'_'、'-'组成",
        showTextWrongPhone:"请输入有效的手机号码",
        typeList:common.getProjectTypes(),

        is_verify:false,
        verify_code:'', // 加密验证码
        verify_phone:'' // 验证手机号
      }
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
            _self.is_verify = false;
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
        if( !_self.verifyCode() ){
            return;
        }
        common.setStorage("nickname",_self.param.nickname)
        common.setStorage("mobile_phone",_self.param.mobile_phone)
        common.setStorage("verifying_code",_self.param.verifying_code)
        common.setStorage("user_type",_self.param.user_type)
        setTimeout(function () {
          _self.$emit('upup', 0)// 主动触发upup方法，'hehe'为向父组件传递的数据
        },50)

      },

    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../static/css/login/zhuche.css';
</style>
