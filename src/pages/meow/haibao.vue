<template>
  <div>
    <!--头部导航-->
    <div class="header header1">
      <div class="header-left" v-tap="{methods:goback}"><img src="../../../static/images/back.png" /></div>
      <div class="header-right fx" v-tap="{methods:shareApp}"><img src="../../../static/images/fx.png" /></div>
    </div>
    <div class="content" :style="'background-image:url('+checkImg(activity.poster_img)+')'">
      <div class="bottom">
        <div class="anniu" :class="activity.state<2 ? 'hover' : ''" v-tap="{methods:canyu,state:activity.state}">{{getActivityStateName(activity.state)}}</div>
        <p class="ckxq" v-tap="{methods:toUrl,pagename:'haibaoxq',id:activity._id}"><a>查看详情></a></p>
        <p><span>{{activity.participants.length}}</span>人已报名</p>
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
          console.log(response)
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
          }else{
            _self.showToast("报名失败！");
          }
        })
      },

      // 分享
      shareApp() {
        var _self = this;
        if( common.isNull(_self.activity.title) || common.isNull(_self.activity.description) ||
            common.isNull(_self.activity._id) ){
          _self.showToast("分享失败，缺少分享参数！");
          return;
        }
        var title = _self.activity.title.length>20 ? _self.activity.title.substring(0,20)+'...' : _self.activity.title;
        var description = _self.activity.description.length>30 ? _self.activity.description.substring(0,30)+'...' : _self.activity.description;
        var shareUrl = 'http://101.132.96.90:8080/yemaoServer/appShare/haibao?id='+_self.activity._id;
            // shareUrl = 'http://192.168.10.99:8080/yemaoServer/appShare/haibao?id='+_self.activity._id;
        myshare.init({
          href: shareUrl,
          title: title,
          content: description,
          thumbs: ['./static/images/logo.png'],
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
.fx{
    width:0.6rem;
    height: 0.6rem;
    margin-top: 0.11rem;
    background-color: rgba(0,0,0,.3);
    border-radius:50%;
}
.fx img{
  margin-left: 0;
  margin-bottom: 0.05rem;
  margin-top: 0;
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
.bottom{
  position: fixed;
  width: 100%;
  height: 2.4rem;
  bottom: 0;
  left: 0;
  background-color: rgba(0,0,0,.7);
  font-size: 0.22rem;
  text-align: center;
  color: white;
}
.anniu{
  width: 2rem;
  height: 0.6rem;
  border-radius: 0.1rem;
  line-height: 0.6rem;
  background-color: #ddd;
  margin: 0.3rem auto;
  opacity: 0.8;
}
.anniu.hover{
  background-color: #f65aa6;
  opacity: 1;
}
.ckxq a{
  text-decoration:underline ;
}
.bottom p{
  line-height: 0.5rem;
}
</style>
