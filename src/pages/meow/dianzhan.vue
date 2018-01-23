<template>
  <div>
    <!--头部导航-->
    <div class="header">
      <div class="header-left" @click="goback"><img src="../../../static/images/back.png" /></div>
      <span>点赞列表</span>
    </div>
    <div class="content content-p">
      <div class="dzlist" v-for="(item,index) in likers">
        <div class="left"></div>
        <div class="right">设计师昵称</div>
        <div class="renzheng">
          <div class="sb-qian">签</div>
          <div class="sb-ysm">已实名</div>
          <div class="sb-yrz">已认证</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
          likers:[]
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
    },
    created(){
        let _self = this;
        let likers = JSON.parse(common.getStorage('likes_chwdetail'));
        if(!common.isNull(likers)){
            _self.likers = likers;
        }
        console.log('kk',likers);
        common.delStorage('likes_chwdetail');
    }
  }
</script>
<style scoped>
  @import '../../../static/css/meow/dianzhan.css';
</style>
