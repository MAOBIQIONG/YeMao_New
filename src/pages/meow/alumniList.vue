<template>
  <div>
    <!--头部导航-->
    <div class="header">
      <div class="header-left" @click="goback"><img src="../../../static/images/back.png" /></div>
      <span>成员列表</span>
    </div>
    <div class="content content-p">
      <div class="dzlist" v-for="(item,index) in alumnisList" :key="index" v-tap="{methods:toDetails,id:item.user_id}">
        <div class="left" :style="{backgroundImage:`url(${checkAvatar(item.user.img)})`}"></div>
        <div class="right">{{item.user.user_name}}</div>
        <!-- <div class="renzheng">
          <div class="sb-qian">签</div>
          <div class="sb-ysm">已实名</div>
          <div class="sb-yrz">已认证</div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        user:{},
        alumnisList:[]
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
        // 详情页
        toDetails (param) {
          var _self = this;
          if( !common.isNull(_self.user._id) && _self.user._id==param.id ){
            _self.$router.push({name: 'shejishigerenzhongxin'});
          } else {
            _self.$router.push({name: 'sjszxxq', query: {id: param.id}});
          }
        },
    },
    created(){
        let _self = this;
        let alumnisList = common.getObjStorage('alumnisList');
        console.log(alumnisList);
        if(!common.isNull(alumnisList)){
            _self.alumnisList = alumnisList;
        }
        console.log('alumnisList',alumnisList);
        this.user = common.getObjStorage("userInfo") || {};
    },
//    destroyed(){
//        common.delStorage('alumnisList');
//    }
  }
</script>
<style scoped>
  @import '../../../static/css/meow/dianzhan.css';
  .left{
      background-size:cover!important;
      background-position:center center!important;
  }
</style>
