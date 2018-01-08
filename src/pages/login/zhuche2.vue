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
    <div class="log-btn" @click="register()"><span>完成</span></div>
    <toast v-model="showPositionValue" type="text" :time="800" is-show-mask text="注册成功" :position="position" :style="{width:'2rem'}">注册成功</toast>
  </div>
</template>

<script>
import { Toast, Group, XSwitch, XButton } from 'vux'
  export default {
    data () {
      return {
        param:{
            password:null
        },
        position: 'default',
        showPositionValue: false
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
      },
      register(){
          let _self = this;
          let user_name = common.op_localStorage().get('nickname');
          let phone = common.op_localStorage().get('mobile_phone');
          // let verifying_code = common.op_localStorage().get('verifying_code');
          let data = {
            // id:"",
            // create_date:"创建时间",
            user_name:user_name,
            real_name:"",
            password:"123456",
            phone:phone,
            gender:"",
            birthday:"",
            img:"",
            user_type:"",
            working_years:0,
            composite_score:0,
            authenticating_state:0,
            hourly_wage:0,
            description:"",
            real_name:"",
            id_number:"",
            school_name:"",
            certificate_name:"",
            city:"",
            email:"",
            orders_number:0,
            working_hours:0,
          }
          console.log("data:"+JSON.stringify(data))
          let params= {};
          params.data = data;
          // params.data.password = _self.param.password;

          params.interfaceId = common.interfaceIds.insertData;
          params.coll= "users";
          console.log(params);

        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          if (response.data) {
            console.log(response)
            console.log(response.data)
            // 显示
            _self.showPosition('default')
            setTimeout(_self.toUrl('login'), 200)
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
