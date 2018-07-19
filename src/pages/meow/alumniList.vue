<template>
  <div>
    <!--头部导航-->
    <div class="header">
      <div class="header-left" @click="goback"><img src="../../../static/images/back.png" /></div>
      <span>成员</span>
    </div>
    <div class="content content-p">
      <div class="dzlist" v-for="(item,index) in alumnisList" :key="index">
        <div class="left" :style="{backgroundImage:`url(${checkAvatar(item.user.img)})`}"></div>
        <div class="right">
          <p>{{item.user.user_name}}</p>
          <p>{{getTypeName(item.user.user_type)}}</p>
        </div>
       <div class="renzheng" v-tap="{methods:toDetails,id:item.user_id}">
         设计师名片
        </div>
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
        // 用户类型
        getTypeName (id) {
          return common.getNameByTypeId(id);
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
  @import '../../../static/css/meow/chengyuan.css';
  .left{
      background-size:cover!important;
      background-position:center center!important;
  }
</style>
