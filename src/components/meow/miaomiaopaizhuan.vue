<template>
  <div class="miaomiaopaizhuan">
    <!--拍砖列表-->
    <scroller
      v-model="pullUpDownStatus"
      :height="height"
      :lock-x="lockX"
      :lock-y="lockY"
      :use-pulldown="true"
      :use-pullup="true"
      :pulldown-config="pulldownConfig"
      :pullup-config = "pullupConfig"
      @on-scroll="scroll"
      @on-scroll-bottom="onScrollBottom"
      @on-pulldown-loading="pullDownLoading"
      @on-pullup-loading="pullUpLoading"
      ref="scroller"
    >
      <div>
        <div class="content">
          <div class="list-paizuan" v-for="(item,index) in chws" v-tap="{methods:toUrl,pagename:'anliexq',id:item._id}">
            <div class="tu">
              <!--<img :src="item.cover"/>-->
              <div class="bg-cover" :style="'background-image:url('+checkImg(item.cover)+')'"></div>
            </div>
            <div class="zan">
              <div class="left-zan" :class="item.likeFlag==1?'hover':''" v-tap="{methods:dianzan,id:item._id,index:index}">
                <span>{{item.like}}</span>
              </div>
              <div class="right-time">{{timeStamp2String(item.create_date)}}</div>
            </div>
          </div>
        </div>
        <load-more v-show="loadMoreStatus.show" :show-loading="loadMoreStatus.showLoading" :tip="loadMoreStatus.tip" class="loadMore"></load-more>
      </div>
    </scroller>
  </div>
</template>

<script>
  import { Scroller, LoadMore, Toast } from 'vux'
  import store from '@/vuex/store'
  export default {
    components: {
      Scroller,
      LoadMore,
      Toast
    },
    store,
    data: function () {
      return {
        userInfo:{},
        chws:[],

        lockX:true,
        lockY:false,
        height: common.getDeviceHeight(), // 1
        pagination: {
          pageNo: 0,
          pageSize: 10
        },
        pullUpDownStatus: {
          pulldownStatus: 'default',
          pullupStatus: 'default'
        },
        pulldownConfig:{
          content: '下拉刷新',
          height: 50,
          autoRefresh: false,
          downContent: '下拉刷新',
          upContent: '放开刷新',
          loadingContent: '刷新中...',
          clsPrefix: 'xs-plugin-pulldown-'
        },
        pullupConfig:{
          content: '上拉加载',
          pullUpHeight: 60,
          height: 40,
          autoRefresh: false,
          downContent: '放开加载',
          upContent: '上拉加载',
          loadingContent: '',
          clsPrefix: 'xs-plugin-pullup-'
        },
        loadMoreStatus:{
          tip:"正在加载",
          tipNoData:"没有更多数据了",
          tipLoading:"正在加载",
          showLoading:true,
          show:true,
        },
        hasMore:true,
      }
    },
    activated: function () {
      console.log("mmpz activated:")
      var _self = this;
      _self.userInfo = common.getObjStorage("userInfo") || {};
      var crm = _self.$store.state.caseRefreshMark;
      if ( crm > 0 ) {
        console.log("mmpz activated crm:"+crm)
        _self.$store.state.caseRefreshMark = 0;
        _self.pagination.pageNo = 0;
        _self.pagination.pageSize = 10;
        _self.loadData()
      }
    },
    created(){
      var _self = this;
      _self.userInfo = common.getObjStorage("userInfo") || {};
      _self.loadData();
    },
    mounted(){
      this.$nextTick(
        ()=>{
          this.$refs.scroller.disablePullup();
          this.$refs.scroller.reset({top:0});
        }
      );
    },
    watch:{
      pullUpDownStatus:{
        handler:function(val,oldval){
          if(val.pullupStatus=="loading"){
            this.loadMoreStatus.show=true;
            if(this.hasMore == false){
              this.loadMoreStatus.showLoading=false;
            } else {
              this.loadMoreStatus.showLoading=true;
            }
          }
        }
      }
    },
    methods: {
      goback () {
        this.$router.goBack()
      },
      toUrl: function (param) {
        this.$router.push({name: param.pagename,query:{id:param.id}})
      },
      // 检测图片路径,设置默认图
      checkImg (path) {
        return common.getAvatar(path)
      },
      //
      timeStamp2String(time){
        return common.timeStamp2String(time,'ymd');
      },
      // 点赞效果
      dianzan(param){
        var _self = this;
        if( common.isNull(_self.userInfo._id) ){
          _self.$router.push({name: 'login'});
        }else{
          _self.like(param.id,param.index);
        }
        param.event.cancelBubble = true;//阻止冒泡（原声方法）
        param.event.stop;//阻止冒泡（原声方法）
        return false
      },

      //下拉刷新
      refreshPageDate(){
        let _self = this
        _self.pagination.pageNo = 0;
        _self.hasMore = true;
        _self.loadMoreStatus.show=false;
        _self.$refs.scroller.donePullup();
        _self.loadData();
      },
      //上拉加载
      loadMore(){
        let _self = this;
        _self.loadData();
      },
      scroll(position){
        // console.log("on-scroll",position);
      },
      pullDownLoading(){
        console.log('on-pull-down-loading');
        this.refreshPageDate();
      },
      pullUpLoading(){
        console.log('on-pull-up-loading');
        this.loadMore();
      },
      onScrollBottom(){
        // console.log('on-scroll-bottom');
      },
      //获取数据
      loadData(){
        let _self = this;
        _self.loadMoreStatus.tip= _self.loadMoreStatus.tipLoading;
        let params = {
          interfaceId:common.interfaceIds.getPersonalChw,
          pageNo: _self.pagination.pageNo,
          pageSize: _self.pagination.pageSize,
          where:{
            type:0
          }
        };
        if( !common.isNull(_self.userInfo._id) ){
          params.user_id = _self.userInfo._id;
        }
        this.$axios.post('/mongoApi',{
          params
        },(response)=>{
          // console.log(response);
          let data = response.data;
          _self.setData(data);
        })
      },

      setData(data){
        let _self = this;
        _self.$refs.scroller.enablePullup();
        // 订单
        let chws = data.chws || [];
        //判断页码是否为0
        if(_self.pagination.pageNo == 0) {
          _self.chws = chws;
        } else {
          _self.chws.push(...data.chws);
        }
        _self.loadMoreStatus.show=false;
        _self.loadMoreStatus.showLoading=false;
        _self.$refs.scroller.donePulldown();
        _self.$refs.scroller.donePullup();
        //判断数据是否有一页
        if(chws.length < _self.pagination.pageSize){
          _self.hasMore = false;
          _self.loadMoreStatus.show=true;
          _self.loadMoreStatus.showLoading=false;
          _self.loadMoreStatus.tip=_self.loadMoreStatus.tipNoData;
          _self.$refs.scroller.disablePullup();
        } else {
          _self.pagination.pageNo++
        }
      },

      //点赞
      like(id,index){
        let _self = this;
        let params = {
          interfaceId:common.interfaceIds.like,
          data: {
            like_id: id,
            user_id: _self.userInfo._id,
            like_type: 1
          }
        };
        this.$axios.post('/mongoApi',{
          params
        },(response)=>{
          // console.log(response)
          let data = response.data;
          if( data.code == 200 ){
            _self.chws[index].likeFlag = _self.chws[index].likeFlag==1? 0 : 1;
            _self.chws[index].like += _self.chws[index].likeFlag==0? -1 : 1;
          }else{
            _self.showToast("操作失败!")
          }
        })
      },
    }
  }
</script>
<style scoped>
  @import '../../../static/css/meow/miaomiaopaizuan.css';
  .content{
    padding-bottom: 0.2rem;
  }
</style>
