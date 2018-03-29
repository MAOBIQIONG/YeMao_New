<template>
  <div class="">
    <div class="header">
    </div>
    <div class="zc-piaoti">
      <span>欢迎注册成为夜猫会员</span>
    </div>
    <div class="login-shuru content">
      <p class="tishi"></p>
      <div class="ls-shouji">
        <input type="text" class="shouji sjh" placeholder="手机号" v-model="param.mobile_phone"/>
        <span class="del">×</span>
      </div>
      <div class="ls-yanzheng">
        <input type="text" class="yanzheng" maxlength="8" placeholder="验证码" v-model="param.verifying_code" ref="code"/>
        <div class="dj-shuru" ref="verify_btn" v-tap="{methods:verifyParams}"><span class="msgs">点击获取验证码</span></div>
      </div>
      <div class="ls-shouji">
        <div class="xmlx-right">
          <select class="xmlx-kuang" v-model="param.user_type">
            <option value="null" selected="selected">类型</option>
            <option v-for="(item,index) in typeList" :key="index" :value="item._id">{{item.type_name}}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="log-btn" v-tap="{methods:showClearCachePop}"><span>注册</span></div>
    <p class="tongyi">点击注册按钮你将视为同意加入夜猫</p>
    <!-- 分享弹窗-->
    <div class="pop" v-if="showPop==true">
      <div class="cg">
        <p>注册成功</p>
        <div class="xiazai">
          下载APP
        </div>
      </div>
      <div class="quxiao"v-tap="{methods:hideClearCachePop}">×</div>
    </div>
    <toast v-model="show" type="text" width="4em" :text="showText"></toast>
  </div>
</template>

<script>
  import {Toast} from 'vux'
  import interfaces from '../../../static/js/es6/interface'
  import md5 from 'js-md5';

  export default {
    components: {
      Toast
    },
    data() {
      return {
        param: {
          nickname: '',
          mobile_phone: '',
          verifying_code: '',
          user_type: null
        },
        show: false,
        showText: "请正确填写信息",
        showTextNoType: "请选择设计类型",
        showTextNoPhone: "请输入手机号",
        showTextWrongPhone: "请输入有效的手机号码",
        typeList: common.getProjectTypes(),
        showPop: false,
        is_verify: false,
        verify_code: '', // 加密验证码
        verify_phone: '' // 验证手机号
      }
    },
    mounted: function () {
      //输入框内有内容时显示清空按钮
      this.checkNumber(".nicheng");
      this.checkNumber(".sjh");
      //获取焦点时触发判断事件
      this.panduan(".sjh");
      //获取短信验证码
      this.huoquyanzhengma(".msgs", ".sjh");
      //判断输入框不能为空
      this.loge(".log-btn");
    },
    methods: {
      goback() {
        this.$router.goBack();
      },
      toUrl(name) {
        this.$router.push({name: name});
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
        var obj = this;
        $(anniu).click(function () {
          $("input").each(function () {
            if ($("input").val() == "" || $("input").val() == null || $("input").val() == undefined) {
              $('.tishi').text("输入框不能为空");
            } else {
              $('.tishi').text("");
              //   obj.toUrl('zhuche2');
            }
          })
        })
      },
      /*************************************/
      // 验证码验证
      verifyCode() {
        var _self = this;
        var code = _self.$refs.code.value;
        if (common.isNull(_self.verify_code)) {
          _self.showText = '请获取验证码!';
          _self.show = true;
          return false;
        } else if (common.isNull(code)) {
          _self.showText = '请输入验证码!';
          _self.show = true;
          return false;
        } else if (_self.param.mobile_phone != _self.verify_phone) {
          _self.showText = '手机号码不匹配!';
          _self.show = true;
          return false;
        } else if (md5(code) !== _self.verify_code) {
          _self.showText = '验证码错误!';
          _self.show = true;
          return false;
        }
        return true;
      },

      // 倒计时
      count_down(time) {
        var _self = this;
        var interval = setInterval(function () {
          if (!_self.$refs.verify_btn) return;
          // 开始
          time--;
          _self.$refs.verify_btn.innerText = time + "秒后重新获取";
          if (time == 0) {
            clearInterval(t);
            _self.$refs.verify_btn.innerText = "重新获取";
            // 重置获取验证码状态及验证码
            _self.is_verify = false;
            _self.verify_code = '';
            _self.verify_phone = '';
          }
        }, 1000)
      },

      // 获取验证码
      verifyParams() {
        var _self = this;
        // 验证手机号码
        if (common.isNull(_self.param.mobile_phone)) {
          _self.showText = _self.showTextNoPhone;
          _self.show = true;
          return;
        }
        let regMobilePhone = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if (!regMobilePhone.test(_self.param.mobile_phone)) {
          _self.showText = _self.showTextWrongPhone;
          _self.show = true;
          return;
        }
        // 设置获取验证码状态
        if (_self.is_verify == true) return;
        _self.is_verify = true;
        _self.checkUser();
      },

      // 检测用户是否存在
      checkUser() {
        var _self = this;
        let params = {
          interfaceId: common.interfaceIds.checkUser,
          phone: _self.param.mobile_phone
        };
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          var data = response.data;
          if (data) {
            if (data.code == 200) {
              _self.getVerificationCode();
            } else {
              _self.showText = '网络异常，请重试!';
              if (!common.isNull(data.msg)) {
                _self.showText = data.msg;
              }
              _self.show = true;
            }
          } else {
            _self.showText = '网络异常，请重试!';
            _self.show = true;
          }
        })
      },

      // 获取验证码
      getVerificationCode() {
        var _self = this;
        // 获取验证码
        var params = {
          'mobile': _self.param.mobile_phone,
          'template': '3064129'
        }
        interfaces.getVerifyCode(params, function (data) {
          console.log("data.code:" + data.code)
          _self.is_verify = false;
          if (data.code == 200) {
            _self.verify_code = data.obj;
            _self.verify_phone = params.mobile;
            _self.count_down(120);
          }
        })
      },
      /*************************************/
      nextStep() {
        let _self = this;
        let regNickname = /^[a-zA-Z0-9_-]{4,10}$/;
        let regMobilePhone = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if (!regNickname.test(_self.param.nickname)) {
          _self.showText = _self.showTextWrongName
          _self.show = true;
          return;
        }
        if (common.isNull(_self.param.user_type)) {
          _self.showText = _self.showTextNoType
          _self.show = true;
          return;
        }
        if (common.isNull(_self.param.mobile_phone)) {
          _self.showText = _self.showTextNoPhone;
          _self.show = true;
          return;
        }
        if (!regMobilePhone.test(_self.param.mobile_phone)) {
          _self.showText = _self.showTextWrongPhone;
          _self.show = true;
          return;
        }

        if (!_self.verifyCode()) {
          return;
        }

        let param1 = [
          {key: "nickname", value: _self.param.nickname},
          {key: "mobile_phone", value: _self.param.mobile_phone},
          {key: "verifying_code", value: _self.param.verifying_code},
          {key: "user_type", value: _self.param.user_type}
        ]
        let storage = common.op_localStorage().getStorage();
        common.op_localStorage().setArray(param1);
        console.log(storage);

        _self.toUrl('zhuche2');

      },
      //		弹窗
      showClearCachePop() {
        this.showPop = true;
      },
      hideClearCachePop() {
        this.showPop = false;
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../static/css/login/zhuche.css';

  .content {
    margin-top: 3rem;
  }

  .log-btn {
    margin-top: 1rem;
  }

  .tongyi {
    text-align: center;
    font-size: 0.28rem;
    color: #999;;
    padding-top: 0.2rem;
  }

  .pop {
    position: relative;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    top: 0;
    left: 0;
    z-index: 9999;
  }
  .pop .cg {
    position: absolute;
    left: 1rem;
    top: 4rem;
    width: 5.5rem;
    height: 4rem;
    border-radius: 0.1rem;
    background: white;
    font-size: 0.4rem;
  }
  .pop .cg p{
    text-align: center;
    color: #f75ea7;
    padding-top: 1rem;
  }
  .xiazai{
    width: 2.5rem;
    height: 0.7rem;
    line-height: 0.7rem;
    margin: 1rem 1.5rem;
    text-align: center;
    border-radius: 0.7rem;
    color: white;
    font-size: 0.28rem;
    background: -webkit-linear-gradient(left, #f74f9c, #fd7376);
    background: -o-linear-gradient(right, #f74f9c, #fd7376);
    background: -moz-linear-gradient(right, #f74f9c, #fd7376);
    background: linear-gradient(to right, #f74f9c, #fd7376);
    box-shadow: #f74f9c 0px 1px 10px;
  }
  .quxiao{
    position: absolute;
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 50%;
    background: #CCCCCC;
    bottom: 3.15rem;
    left:3.4rem;
    font-size: 0.5rem;
    text-align: center;
    line-height: 0.7rem;
    color: white;

  }
</style>
