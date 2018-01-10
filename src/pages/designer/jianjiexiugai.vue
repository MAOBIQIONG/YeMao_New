<template>
  <div >
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>个人简介</span>
      <div class="header-right" v-tap="{ methods:submit }">确定</div>
    </div>
    <div class="content">
      <!--留言-->
      <div class="pc-shuru">
        <textarea v-model="user.description" class="area" maxlength="100" placeholder="一句话描述一下自己吧"></textarea>
        <p class="xianzhi"><span class="zs">100</span>/<span>100</span></p>
      </div>
    </div>
    <toast v-model="showMark" :time="1000" type="text" width="5rem">{{showMsg}}</toast>
  </div>
</template>

<script>
  import { Toast } from 'vux'
  export default {
    components: {
      Toast
    },
    data () {
      return {
        user_id: null,
        user: {
          description: '',
        },
        showMark:false,
        showMsg:"",
      }
    },
    mounted: function () {
      this. wzxz()
    },
    created: function () {
      var _slef = this;
      var user = common.getObjStorage("userInfo") || {};
      if( !common.isNull(user._id) ){
        _slef.userInfo = user;
        _slef.user_id = user._id;
        _slef.user.description = user.description;
      }
    },
    methods: {
      goback(){
        this.$router.goBack();
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
      showToast(msg){
        this.showMark = true;
        this.showMsg = msg;
      },
      //留言字数限制
      wzxz(){
        var _self = this;
        $(".area").bind("input propertychange",function(){
          var curlength=$(".area").val().length;
          if(curlength>100){
            var num=$(".area").val().substr(0,100);
            $('.area').val(num);
            console.log("您输入的字数已超限")
            _self.showToast("您输入的字数已超限!");
          }
          else{
            $(".zs").text(100-$(".area").val().length)
          }
        })
      },

      /********************************/
      // 修改用户信息
      submit(){
        console.log("submit")
        var _self = this;
        if( common.isNull(_self.user_id) ){
          _self.showToast("未成功获取用户信息!");
          return
        }
        if( common.isNull(_self.user.description) ){
          _self.showToast("请描述一下自己吧!");
          return
        }
        var params = {
          interfaceId:common.interfaceIds.updateData,
          coll:common.collections.users,
          wheredata:{_id:_self.user_id},
          data:{$set: _self.user}
        }
        console.log("params:"+JSON.stringify(params))
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          console.log(response)
          var data = response.data;
          if( data && response.code == '200' ){
            _self.showToast("修改成功！");
            _self.userInfo.description = _self.user.description;
            common.setStorage("userInfo",_self.userInfo);
            setTimeout(function () {
              _self.goback();
            },1000)
          }else{
            _self.showToast("修改失败！");
          }
        })
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../static/css/designer/jianjiexiugai.css';
</style>
