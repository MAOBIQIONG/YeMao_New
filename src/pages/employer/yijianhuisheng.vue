<template>
  <div class="">
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>一键会审</span>
      <div class="header-right" v-tap="{methods:submit}">提交</div>
    </div>
    <div class="content content-p">
       <div class="set-content">
        <!--留言-->
        <div class="pc-shuru">
          <textarea v-model="description" class="area" maxlength="500" placeholder="请输入会审信息，我们将尽快为你处理"></textarea>
          <p class="xianzhi"><span class="zs">500</span>/<span>500</span></p>
        </div>
      </div>
    </div>
    <toast v-model="showMark" :time="1000" type="text" width="5rem">{{showMsg}}</toast>
  </div>
</template>

<script>
  import {Toast} from 'vux'
  export default {
    components:{
      Toast,
    },
    data () {
      return {
        order_id: '',
        description: '',
        showMark:false,
        showMsg:""
      }
    },
    mounted: function () {
      this. wzxz()
    },
    created(){
      console.log('created');
      var _self = this;
      _self.order_id = _self.$route.query.id;
    },
    methods: {
      goback() {
        this.$router.goBack();
      },
      toUrl(name) {
        this.$router.push({name: name});
      },
      showToast(msg){
        this.showMark = true;
        this.showMsg = msg;
      },
      //留言字数限制
      wzxz(){
        $(".area").bind("input propertychange",function(){
          var curlength=$(".area").val().length;
          if(curlength>500){
            var num=$(".area").val().substr(0,500);
            $('.area').val(num);
            alert("您输入的字数已超出");
          }
          else{
            $(".zs").text(500-$(".area").val().length)
          }
        })
      },

      submit(){
        var _self = this;
        if( common.isNull(_self.order_id) ){
          _self.showToast("订单信息错误!");
          return;
        }else if( common.isNull(_self.description) ){
          _self.showToast("请输入会审信息!");
          return;
        }else{
          _self.reviewOrder();
        }
      },

      /**一键会审**/
      reviewOrder(){
        var _self = this;
        var params = {
          interfaceId: common.interfaceIds.orderReview,
          order_id: _self.order_id,
          description: _self.description
        }
        _self.$axios.post('/mongoApi',{
          params: params
        },(response)=>{
          let data = response.data;
          if( data && data.code == 200 ){
            _self.showToast("提交成功,请等待会审结果!");
            setTimeout(function () {
              _self.goback();
            },1000)
          }else{
            _self.showToast("提交失败!");
          }
        })
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../../../static/css/employer/yijianhuisheng.css";
</style>
