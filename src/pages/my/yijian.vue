<template>
  <div class="">
    <div class="header">
      <div class="header-left" v-tap="{methods:goback}"><img src="../../../static/images/back.png" /></div>
      <span>意见反馈</span>
    </div>
    <div class="content content-p">
      <div class="xgnc">
        <div class="left"><span>问题和意见</span></div>
      </div>
      <!--留言-->
      <div class="pc-shuru">
        <textarea v-model="description" class="area" maxlength="200" placeholder="请详细描述您遇见的问题和意见"></textarea>
        <p class="xianzhi"><span class="zs">200</span>/<span>200</span></p>
      </div>
    </div>
    <!--退出登陆-->
    <div class="tcdl" v-tap="{methods:submit}">
      <span>提交</span>
    </div>
    <toast v-model="showMark" type="text" :text="showMsg"width="5.5rem"></toast>
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
        userInfo: {},
        description: '',
        is_submit: false,
        showMark: false,
        showMsg: '',
      }
    },
    created: function () {
      console.log("created:")
      var _self = this;
      _self.userInfo = common.getObjStorage("userInfo") || {};
    },
    mounted: function () {
      this. wzxz()
    },
    methods: {
      goback() {
        this.$router.goBack();
      },
      toUrl(name) {
        this.$router.push({name: name});
      },
      //留言字数限制
      wzxz(){
        $(".area").bind("input propertychange",function(){
          var curlength=$(".area").val().length;
          if(curlength>200){
            var num=$(".area").val().substr(0,200);
            $('.area').val(num);
            alert("您输入的字数已超出");
          }
          else{
            $(".zs").text(200-$(".area").val().length)
          }
        })
      },
      //弹窗
      showToast(msg){
        this.showMark = true;
        this.showMsg = msg;
      },
      // 提交
      submit(){
        var _self = this;
        if( common.isNull(_self.userInfo._id) ){
          _self.showToast('未成功获取到用户信息,请重新登录!');
          return;
        }
        if( common.isNull(_self.description) ){
          _self.showToast('请详细描述您遇见的问题和意见!');
          return;
        }
        if( _self.is_submit == true ) return;
        _self.is_submit = true;
        var params = {
          interfaceId:common.interfaceIds.feedback,
          data:{
            user_id: _self.userInfo._id,
            description: _self.description
          }
        };
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          _self.is_submit = false;
          var data = response.data;
          if( data && data.code == 200 ){
            _self.showToast('提交成功，十分感谢您的反馈!');
            setTimeout(function () {
              _self.goback();
            },1000)
          }else{
            _self.showToast('提交失败!');
          }
        });
      },

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../../../static/css/my/yijian.css";
</style>
