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
        <input type="text"class="shouji nicheng" placeholder="昵称" v-model="param.nickname"/>
        <span class="del">×</span>
      </div>
      <div class="ls-shouji">
        <!--<div class="xmlx-left">-->
          <!--<span>类型</span>-->
        <!--</div>-->
        <div class="xmlx-right">
          <select class="xmlx-kuang" v-model="param.user_type">
            <option value="null" selected="selected">类型</option>
            <option v-for="(item,index) in typeList" :key="index" :value="item._id">{{item.type_name}}</option>
            <!-- <option value="opel">规划设计</option>
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
            <option value="audi">审图</option> -->
          </select>
        </div>
      </div>
      <div class="ls-shouji">
        <input type="text" class="shouji sjh" placeholder="手机号" v-model="param.mobile_phone"/>
        <span class="del">×</span>
      </div>
      <div class="ls-yanzheng">
        <input type="text" class="yanzheng" maxlength="8" placeholder="验证码"  v-model="param.verifying_code"/>
        <div class="dj-shuru"><span class="msgs">点击获取验证码</span></div>
      </div>
    </div>
    <div class="log-btn" @click="nextStep()"><span>下一步</span></div>
    <toast v-model="show" type="text" width="4em" :text="showText"></toast>
  </div>
</template>

<script>
    import  { Toast } from 'vux'
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
          user_type:null
        },
        show:false,
        showText:"请正确填写信息",
        showTextNoType:"请选择设计类型",
        showTextNoPhone:"请输入手机号",
        showTextWrongName:"昵称为4到10位（字母，数字，下划线，减号）",
        showTextWrongPhone:"请输入有效的手机号码",
        typeList:common.getProjectTypes()
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
            //   obj.toUrl('zhuche2');
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
      },

        nextStep(){
            let _self = this;
            let regNickname = /^[a-zA-Z0-9_-]{4,10}$/;
            let regMobilePhone = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
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

            let param1 = [
                {key:"nickname",value:_self.param.nickname},
                {key:"mobile_phone",value:_self.param.mobile_phone},
                {key:"verifying_code",value:_self.param.verifying_code},
                {key:"user_type",value:_self.param.user_type}
            ]
            let storage = common.op_localStorage().getStorage();
            common.op_localStorage().setArray(param1);
            console.log(storage);

            _self.toUrl('zhuche2');

        }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../static/css/login/zhuche.css';
</style>
