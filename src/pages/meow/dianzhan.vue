<template>
  <div>
    <!--头部导航-->
    <div class="header">
      <div class="header-left" @click="goback"><img src="../../../static/images/back.png" /></div>
      <span>点赞列表</span>
    </div>
    <div class="content content-p">
      <div class="dzlist" v-for="(item,index) in list" :key="index">
        <div class="left" :style="`backgroundImage:url(${checkAvatar(item.user.img)})`"></div>
        <div class="right">{{item.user.user_name}}</div>
        <div class="renzheng">
            <div class="sb-qian" v-if="item.user.authenticating_state>5">签</div>
            <div class="sb-ysm" v-if="item.user.authenticating_state>1">已实名</div>
            <div class="sb-yrz" v-if="item.user.authenticating_state>3">已认证</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
          chw_id:null,
          list:[]
      }
    },
    methods: {
        goback () {
            this.$router.goBack()
        },
        toUrl: function (pagename) {
            this.$router.push({name: pagename})
        },
        // 头像
        checkAvatar (path) {
            return common.getAvatar(path)
        },
        //数据初始化
        initData(){
            let _self = this;
            let params = {
                interfaceId:common.interfaceIds.getPChwDetails,
                user_id:_self.user_id,
                where:{
                    _id: _self.chw_id
                }
            };
            this.$axios.post('/mongoApi',{
                params
            },(response)=>{
                console.log(response)
                let data = response.data;
                _self.setInitData(data);
            })
        },
        setInitData(data){
            let _self = this;
            if(data.likes){
                _self.list = data.likes;
            }
            console.log('初始化数据完成');
        },
    },
    created(){
        let _self = this;
        let userInfo = common.getObjStorage("userInfo") || {};
        _self.userInfo = userInfo;
        if( !common.isNull(userInfo._id) ){
            _self.user_id = userInfo._id;
        }
        _self.chw_id = _self.$route.query.chw_id;
        _self.initData();
        // let likers = JSON.parse(common.getStorage('likes_chwdetail'));
        // if(!common.isNull(likers)){
        //     _self.likers = likers;
        // }
        // console.log('kk',likers);
        // common.delStorage('likes_chwdetail');
    }
  }
</script>
<style scoped>
  @import '../../../static/css/meow/dianzhan.css';
  .left{
      background-size:cover!important;
      background-position:center center!important;
  }
</style>
