<template>
  <div class="">
    <div class="login-shuru">
      <p class="my-toast" v-if="show" v-text="toastText"></p>
      <div class="ls-shouji">
        <input v-model="param.password" type="password" class="shouji mima" placeholder="密码"/>
        <span class="del" v-if="param.password.length>0" v-tap="{methods:clearInput,index:0}">×</span>
      </div>
      <div class="ls-shouji">
        <input v-model="param.passwordConfirm" type="password" class="shouji qrmm" placeholder="确认密码"/>
        <span class="del" v-if="param.passwordConfirm.length>0" v-tap="{methods:clearInput,index:1}">×</span>
      </div>
    </div>
    <div class="log-btn" v-tap="{methods:register}"><span>完成</span></div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        param:{
            password:'',
            passwordConfirm:'',
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
    methods: {
      goback () {
        this.$router.goBack()
      },
      toUrl(name){
        this.$router.push({name:name});
      },
      clearInput(params){
        if( params.index == 0 ){
          this.param.password = '';
        }else if( params.index == 1 ){
          this.param.passwordConfirm = '';
        }
      },

      register(){
        var _self = this;
        var regpwd =/^[0-9a-zA-Z_#]{6,16}$/;
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

        var user_name = common.getStorage('nickname');
        var phone = common.getStorage('mobile_phone');
        var user_type =common.getStorage('user_type');
        var password = _self.param.password;
        var params= {
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
              _self.$emit('upup', 1)// 主动触发upup方法，'hehe'为向父组件传递的数据
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
