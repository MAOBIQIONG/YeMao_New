<template>
  <div>
    <!--头部导航-->
    <div class="header">
      <div class="header-left" @click="goback"><img src="../../../static/images/back.png" /></div>
      <span>问答</span>
      <div class="header-right" @click="toUrl('fbwd')">提问</div>
    </div>
    <!--问答专辑-->
    <div class="weida-list" v-for="item in QAList" :key="common.uuid()">
      <div class="weida" @click="toUrl('wdxq')">
        <div class="wd-top">
          <div class="touxiang">
            <img src="../../../static/images/bj.jpg"/>
          </div>
          <p class="nicheng">item.</p>
        </div>
        <div class="tupian">
          <img src="../../../static/images/bj.jpg"/>
        </div>
        <div class="neirong">
          <div class="piapti">
            如果你无法简洁的表达你的想法，那只说明你还不够了解它。- 阿尔伯特·爱因斯坦?
          </div>
          <div class="jieshao">
            如果你无法简洁的表达你的想法，那只说明你还不够了解它阿尔伯特·爱因斯坦如果你无法简洁的表达你的想法，那只说明你还不够了解它。- 阿尔伯特·爱因斯坦阿尔伯特
          </div>
        </div>
        <div class="pingjia">
          <span>100</span>赞同 · <span>100</span>评论
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
          user_id:null,
          QAList:[]
      }
    },
    methods: {
        goback () {
            this.$router.goBack()
        },
        toUrl: function (pagename) {
            this.$router.push({name: pagename})
        },
        loadData(){
            console.log('this is  loadData');
            let _self = this;
            if( common.isNull(_self.user_id) ){
                alert(1);
                return;
            }
            let params = {
                interfaceId: common.interfaceIds.getPersonalChw,
                pageNo:0,
                pageSize:3,
                where:{
                    user_id: _self.user_id,
                    type: 5//问答
                }
            }
            _self.$axios.post('/mongoApi', {
                params: params
                }, response => {
                    console.log(response);
                    var data = response.data
                    if (data) {
                        _self.QAList = data.chws;
                        console.log(data);
                    }
                });
        }
    },
    created(){
        var _slef = this;
        var user = common.getObjStorage("userInfo") || {};
        if( !common.isNull(user._id) ){
            _slef.userInfo = user;
            _slef.user_id = user._id;
        }
        // this.loadData();
        const obj = Object.create({},{p:{value:42}});
        console.log(Object.values(obj));
    }
  }
</script>
<style scoped>
  @import '../../../static/css/meow/shouchang-wenda.css';
</style>
