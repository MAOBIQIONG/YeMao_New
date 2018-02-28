<template>
  <div>
    <div class="header-static"></div>
    <div class="msg-content">
      <div class="tab_box">
        <!--通知列表-->
        <div class="xiaoxi">
          <scroller
            id="scroller"
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
              <!--消息列表-->
              <div class="xiaoxi-list" v-for="item in dataList" v-tap="{methods:toUrl,scene:item.scene,query:{id:item.user.id,name:item.user.name,img:item.user.img}}">
                <div class="xl-touxiang">
                  <img :src="checkAvatar(item.user.img)" />
                </div>
                <div class="xiao-right">
                  <div class="xr-top">
                    <span class="name">{{item.user.name}}</span>
                    <span class="time">{{getDataStr(item.refresh_date)}}</span>
                  </div>
                  <div class="xr-bottom">
                    <div class="content" v-html="filterImgs(item.content)"></div>
                    <div class="badge" v-if="item.sender==user._id && item.sender_unread_count>0">{{item.sender_unread_count}}</div>
                    <div class="badge" v-else-if="item.recipient==user._id && item.recipient_unread_count>0">{{item.recipient_unread_count}}</div>
                  </div>
                </div>
              </div>
            </div>
          </scroller>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {LoadMore, Scroller,} from 'vux'
  export default {
    components: {
      Scroller,
      LoadMore
    },
    data () {
      return {
        dataList: [],
        // 加载
        lockX:true,
        lockY:false,
        height: '-55',
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
          height: 60,
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
    activated: function () {
      // console.log("news activated:")
      var _self = this;
      _self.user = common.getObjStorage("userInfo") || {};
      _self.refreshPageDate();
      // 重置监听接收消息回调
      wyim.callback = _self.receiveMsg;
    },
    created: function () {
      // console.log("news created:")
      var _self = this;
      _self.user = common.getObjStorage("userInfo") || {};
      _self.loadData();
      // 重置监听接收消息回调
      wyim.callback = _self.receiveMsg;
    },
    methods: {
      goback() {
        this.$router.goBack();
      },
      toUrl: function (params) {
        console.log("params.scene:"+params.scene)
        var pagename = common.checkInt(params.scene)==1 ? 'groupchat' : 'liaotian';
        this.$router.push({name: pagename,query:params.query || {}})
      },
      getDataStr(date){
        return common.timeStamp2String(date,'ymdhm');
      },
      // 头像
      checkAvatar (path) {
        return common.getAvatar(path)
      },
      filterImgs(text){
        return wyim.filterEmoji2(text);
      },
      // 接收消息后，保存消息
      receiveMsg(msg){
        var _self = this;
        _self.dataList.forEach(function (item,index) {
          if( msg.scene == 'team' ){
            if( msg.to == item.recipient ){
              item.content = msg.text;
              item.refresh_date = common.getCurrentTimeStamp();
              item.sender_unread_count += 1;
            }
          }else{
            if( msg.from == item.sender ){
              item.content = msg.text;
              item.refresh_date = common.getCurrentTimeStamp();
              item.recipient_unread_count += 1;
            }else if( msg.from == item.recipient ){
              item.content = msg.text;
              item.refresh_date = common.getCurrentTimeStamp();
              item.sender_unread_count += 1;
            }
          }
        })
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
        if( common.isNull(_self.user._id) ){
          _self.hasMore = false;
          _self.loadMoreStatus.show=true;
          _self.loadMoreStatus.showLoading=false;
          _self.loadMoreStatus.tip=_self.loadMoreStatus.tipNoData;
          return;
        }
        _self.loadMoreStatus.tip= _self.loadMoreStatus.tipLoading;
        let params = {
          interfaceId:common.interfaceIds.getMyConvers,
          pageNo: _self.pagination.pageNo,
          pageSize: _self.pagination.pageSize,
          user_id: _self.user._id
        };
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
        let convers = data.convers || [];
        //判断页码是否为0
        if(_self.pagination.pageNo == 0) {
          _self.dataList = convers;
        } else {
          _self.dataList.push(...convers);
        }
        _self.loadMoreStatus.show=false;
        _self.loadMoreStatus.showLoading=false;
        _self.$refs.scroller.donePulldown();
        _self.$refs.scroller.donePullup();
        //判断数据是否有一页
        if(convers.length < _self.pagination.pageSize){
          _self.hasMore = false;
          _self.loadMoreStatus.show=true;
          _self.loadMoreStatus.showLoading=false;
          _self.loadMoreStatus.tip=_self.loadMoreStatus.tipNoData;
          _self.$refs.scroller.disablePullup();
        } else {
          _self.pagination.pageNo++
        }
      },

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../static/css/index/message.css';
</style>
