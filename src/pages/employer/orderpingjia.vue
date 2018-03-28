<template>
  <div class="">
    <div class="header">
      <div class="header-left" @click="goback"><img src="../../../static/images/back.png"/></div>
      <span>订单评价</span>
      <div class="header-right" v-tap="{methods:submit}">完成</div>
    </div>
    <!--评价内容-->
    <div class="content content-p">
      <div class="pj-content">
        <div class="pc-top">
          <div class="pt-tu"><img :src="getAvatar(user_img)"></div>
          <div class="pt-nichen"><span>{{user_name}}</span></div>
        </div>
        <!--星星评分-->
        <div class="pc-xing">
          <ul>
            <li>
              <div class="px-left">图纸满意度</div>
              <div class="px-right">
                <rater v-model="orderData.blueprint_satisfaction" star="<i class='icon iconfont icon-star-red'></i>" active-color="#FF9900" :max="5" :margin="5" :font-size="16"></rater>
              </div>
            </li>
            <li>
              <div class="px-left">设计师态度</div>
              <div class="px-right">
                <rater v-model="orderData.attitude_satisfaction" star="<i class='icon iconfont icon-star-red'></i>" active-color="#FF9900" :max="5" :margin="5" :font-size="16"></rater>
              </div>
            </li>
            <li>
              <div class="px-left">时间进度</div>
              <div class="px-right">
                <rater v-model="orderData.time_schedule_satisfaction" star="<i class='icon iconfont icon-star-red'></i>" active-color="#FF9900" :max="5" :margin="5" :font-size="16"></rater>
              </div>
            </li>
          </ul>
        </div>
        <!--留言-->
        <div class="radiocheck">
          <div class="frame">
            <input v-model="checkValue" id="anonymous" name="check" type="checkbox">
            <label class="check" for="anonymous">
              <i class="fa fa-check"></i>
            </label>
            <span>匿名</span>
            <span class="tips" v-if="checkValue">你写的评价将会以匿名的形式展现</span>
          </div>
        </div>
        <div class="pc-shuru">
          <textarea v-model="commentdata.content" class="area" maxlength="100" placeholder="对作品还满意吗？"></textarea>
          <p class="xianzhi"><span class="zs">100</span>/<span>100</span></p>
        </div>
        <toast v-model="showMark" :time="1000" type="text" width="5rem">{{showMsg}}</toast>
      </div>
    </div>
  </div>
</template>

<script>
  import { Rater,Cell, Toast} from 'vux'
  export default {
    components: {
      Rater,
      Cell,
      Toast
    },
    data () {
      return {
        userInfo:{},
        case_id:'',
        user_name:'',
        user_img:'',
        orderData:{
          blueprint_satisfaction:0,
          attitude_satisfaction:0,
          time_schedule_satisfaction:0
        },
        // 多选框
        checkValue: false,
        commentdata:{
          user_id: '',            // 评论人
          comment_id: '',         // 评论对象ID
          content: '',            // 评论内容
          comment_type: 1,        // 评论类型：0、喵喵圈，1、案例展示、个人荣誉、我的作品、喵学堂、问答。
          type: 1,                // 评论类型：0、用户，1、雇主。
          answer_id: '',          // 回复ID：一级评论、喵喵圈动态发布人ID，二级评论、一级评论发布人ID，回复、回复发布人
          // anonymous: 0,       // 匿名:0、不匿名，1、匿名。
        },
        showMark:false,
        showMsg:"",
      }
    },
    mounted: function () {
      this. wzxz()
    },
    created(){
      var _self = this;
      var query = _self.$route.query;
      _self.case_id = query.id;
      _self.commentdata.comment_id = _self.case_id;
      _self.userInfo = common.getObjStorage("userInfo") || {};
      _self.commentdata.user_id = _self.userInfo._id;
      _self.initData();
    },
    destroyed(){
        common.delStorage('fromMyOrderDetail');
    },
    methods: {
      goback(){
        this.$router.goBack();
      },
      toUrl: function (params) {
        var _self = this;
        _self.$router.push({name: params.pagename,query:params.qeury});
      },
      getAvatar(path){
        return common.getAvatar(path);
      },
      showToast(msg){
        this.showMark = true;
        this.showMsg = msg;
      },
      //留言字数限制
      wzxz(){
        $(".area").bind("input propertychange",function(){
          var curlength=$(".area").val().length;
          if(curlength>100){
            var num=$(".area").val().substr(0,100);
            $('.area').val(num);
            alert("您输入的字数已超出");
          }
          else{
            $(".zs").text(100-$(".area").val().length)
          }
        })
      },

      //获取数据
      initData(){
        let _self = this;
        let params = {
          interfaceId:common.interfaceIds.getPChwInfo,
          where:{
            _id: _self.case_id
          }
        };
        this.$axios.post('/mongoApi',{
          params
        },(response)=>{
          let data = response.data;
          if( data ){
            var user = data.chw.user || {};
            _self.user_name = user.user_name;
            _self.user_img = user.img;
            _self.commentdata.answer_id = user._id;
          }
        })
      },

      //点赞效果
      submit(){
        var _self = this;
        if( common.isNull(_self.userInfo._id) ){
          _self.$router.push({name: 'login'});
        }else if( _self.orderData.blueprint_satisfaction == 0 ||
          _self.orderData.attitude_satisfaction == 0 ||
          _self.orderData.time_schedule_satisfaction == 0 ){
          _self.showToast("满意度不能为零!");
        }else if( common.isNull(_self.commentdata.comment_id) ||
          common.isNull(_self.commentdata.answer_id)){
          _self.showToast("订单信息错误!");
        }else if( common.isNull(_self.commentdata.content) ){
          _self.showToast("请对作品进行评!");
        }else{
          _self.addComment();
        }
      },

      //评论
      addComment(){
        let _self = this;
        // 避免多次提交
        if( _self.is_submit == true ) return;
        _self.is_submit = false;
        // 匿名标识
        _self.commentdata.anonymous = _self.checkValue ? 1 : 0;
        let params = {
          interfaceId: common.interfaceIds.orderComments,
          case_id: _self.case_id,
          orderData: _self.orderData,
          commentdata: _self.commentdata
        };
        _self.$axios.post('/mongoApi',{
          params
        },(response)=>{
          console.log(response)
          let data = response.data;
          if( data.code == 200 ){
            _self.showToast("评价成功!")
            if(!common.isNull(common.getStorage('fromMyOrderDetail'))){
                setTimeout(function () {
                    _self.$router.go(-2);
                },1000)
            } else {
                setTimeout(function () {
                    _self.$router.go(-1);
                },1000)
            }

          }else{
            _self.showToast("评价失败!")
          }
        })
      },

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../../../static/css/employer/order-pingjia.css";
  .radiocheck{
    width: 6.6rem;
    margin: 0 auto;
  }
  .tips{
    color: #ccc;
    padding-left: 0.5rem;
  }
</style>
