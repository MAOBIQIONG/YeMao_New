<template>
  <div>
    <!--头部导航-->
    <div class="header header1">
      <div class="header-left" v-tap="{methods:goback}"><img src="../../../static/images/back.png" /></div>
    </div>
    <div class="content" :style="'background-image:url('+checkImg(activity.details_img)+')'">
      <div class="bottom" :class="activity.state<2 ? 'hover' : ''" v-tap="{methods:canyu,state:activity.state}">{{getActivityStateName(activity.state)}}</div>
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
    data: function () {
      return {
        userInfo:{},
        activity:{
          participants:[]
        },
        showMark:false,
        showMsg:"",
      }
    },
    created(){
      var _self = this;
      _self.act_id = this.$route.query.id;
      _self.userInfo = common.getObjStorage("userInfo") || {};
      _self.initData();
    },
    methods: {
      goback () {
        this.$router.goBack()
      },
      toUrl: function (param) {
        this.$router.push({name: param.pagename,query:{id:param.id}})
      },
      showToast(msg){
        this.showMark = true;
        this.showMsg = msg;
      },
      // 检测图片路径,设置默认图
      checkImg (path) {
        return common.getAvatar(path)
      },
      // 获取活动状态
      getActivityStateName(state){
        var str = state==0 ? '立即报名' : state==1 ? '取消报名' : state==2 ? '已截止' : state==3 ? '已结束' : ''
        return str;
      },

      // 参与
      canyu(params){
        if( common.checkInt(params.state) >= 2 ) return;
        var _self = this;
        if( common.isNull(_self.userInfo._id) ){
          _self.$router.push({name: 'login'});
        }else{
          _self.partIn();
        }
      },

      //获取数据
      initData(){
        let _self = this;
        if( common.isNull(_self.act_id) ){
          return;
        }
        let params = {
          interfaceId:common.interfaceIds.getActDetails,
          where:{
            _id:_self.act_id
          }
        };
        if( !common.isNull(_self.userInfo._id) ){
          params.user_id = _self.userInfo._id;
        }
        this.$axios.post('/mongoApi',{
          params
        },(response)=>{
          let data = response.data;
          _self.activity = data.activity || {};
        })
      },

      //获取数据
      partIn(){
        let _self = this;
        let params = {
          interfaceId:common.interfaceIds.partInActivity,
          where:{
            _id:_self.act_id
          }
        };
        if( !common.isNull(_self.userInfo._id) ){
          params.user_id = _self.userInfo._id;
        }
        this.$axios.post('/mongoApi',{
          params
        },(response)=>{
          var data = response.data;
          if( data && data.code == 200 ){
            var index = _self.activity.participants.indexOf(_self.userInfo._id);
            if( index < 0 ){
              _self.showToast("报名成功！");
              _self.activity.participants.push(_self.userInfo._id);
              _self.activity.state = 1;
            }else{
              _self.showToast("取消成功！");
              _self.activity.participants.splice(index,1);
              _self.activity.state = 0;
            }
            _self.$store.state.activityObj = {act_id:_self.act_id,state:_self.activity.state};
          }else{
              _self.showToast("报名失败！");
          }
        })
      },

    }
  }
</script>
<style scoped>
.header1{
    background-color:transparent;
    border: none;
}
.bottom{
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  font-size: 0.28rem;
  text-align: center;
  color: white;
  background-color: #ddd;
  position: fixed;
  bottom: 0;
  left: 0;
  opacity: 0.9;
}
.bottom.hover{
  background-color: #f65aa6;
}
.content{
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-size:cover;
  background-repeat:no-repeat;
  background-position:center;
}
</style>
