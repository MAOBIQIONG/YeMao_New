<template>
  <div>
    <!--头部导航-->
    <div class="header">
      <div class="header-left" @click="goback"><img src="../../../static/images/back.png" /></div>
      <span>问答</span>
      <div class="header-right" @click="toUrl('fbwd')">提问</div>
    </div>
    <!--问答专辑-->
    <div class="weida-list" v-for="(item,index) in QAList" :key="index">
      <div class="weida" @click="toUrl('wdxq')">
        <div class="wd-top">
          <div class="touxiang">
            <img v-if="item.user.img" src="../../../static/images/bj.jpg"/>
            <img v-else src="../../../static/images/bj.jpg"/>
          </div>
          <p class="nicheng">{{item.user.user_name}}</p>
        </div>
        <div class="tupian" v-if="item.imgs">        
          <img :src="item.imgs[0]"/>
        </div>
        <div class="neirong">
          <div class="piapti">
            {{item.title}}
          </div>
          <div class="jieshao">
            {{item.description}}
          </div>
        </div>
        <div class="pingjia">
          <span v-if="item.like">{{item.like}}</span><span v-else>0</span>赞同 · <span v-if="item.comments">{{item.comments}}</span><span v-else>0</span>评论
        </div>
      </div>
    </div>
    <!-- <div class="weida-list" >
      <div class="weida" @click="toUrl('wdxq')">
        <div class="wd-top">
          <div class="touxiang">
            <img src="../../../static/images/bj.jpg"/>
          </div>
          <p class="nicheng">昵称</p>
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
    </div> -->
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
          user_id:null,
          QAList:[],
          user:null,
          pagination:{
              pageNo:0,
              pageSize:2,
          }
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
            console.log('this is loadData');
            let _self = this;
            if( common.isNull(_self.user_id) ){
                throw new Error('请先登录');
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
        },
        setData(data){
            let _self = this;
            //判断页码是否为0
            if(_self.pagination.pageNo == 0) {
                _self.QAList = QAList;
            } else {
                _self.QAList.push(...data.chws);
            }
            _self.loadMoreStatus.show=false;
            _self.loadMoreStatus.showLoading=false;                  
            _self.$refs.scroller.donePulldown();
            _self.$refs.scroller.donePullup();   
            //判断数据是否有一页
            if(orderList.length < _self.pagination.pageSize){
                _self.loadMoreStatus.show=true;
                _self.loadMoreStatus.showLoading=false;
                _self.loadMoreStatus.tip=_self.loadMoreStatus.tipNoData;
                _self.$refs.scroller.disablePullup();
            } else {
                _self.pagination.pageNo++
            }
            // console.log(_self.orderList);
        }

    },
    created(){
        var _slef = this;
        var user = common.getObjStorage("userInfo") || {};
        if( !common.isNull(user._id) ){
            _slef.user_id = user._id;
        }
        this.loadData();
    }
  }
</script>
<style scoped>
  @import '../../../static/css/meow/shouchang-wenda.css';
</style>
