<template>
  <div>
    <!--导航栏-->
    <div class="header p-static">
      <div class="header-left" v-tap="{methods:goback}"><img src="../../../static/images/back.png"/></div>
      <span>系统通知</span>
    </div>
    <div class="xiaoxi-content">
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
          <div class="xiaoxi-list" v-for="item in dataList" v-tap="{methods:toDetail,nid:item._id,state:item.state,type:item.object_type,query:{id:item.object_id}}">
            <div class="xl-time">{{getDataStr(item.create_date)}}</div>
            <div class="xl-content">
              <div class="pop-box">
                <div class="pop-title hover" v-if="item.state==0"><p>未读</p></div>
                <div class="pop-title" v-if="item.state==1"><p>已读</p></div>
              </div>
              <div class="jianjia"></div>
              <div class="zf-jg">{{item.title}}</div>
              <div class="zf-sm">{{item.content}}</div>
              <div class="ckxq" v-if="item.object_id!=''&&item.object_type==1">
                <span>查看详情</span>
                <div class="ck-right">
                  <img src="../../../static/images/index/jiangou.png">
                </div>
              </div>
            </div>
          </div>
          <load-more v-show="loadMoreStatus.show" :show-loading="loadMoreStatus.showLoading" :tip="loadMoreStatus.tip" class="loadMore"></load-more>
        </div>
      </scroller>
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
        height: '-50',
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
          height: 100,
          autoRefresh: false,
          downContent: '下拉刷新',
          upContent: '放开刷新',
          loadingContent: '刷新中...',
          clsPrefix: 'xs-plugin-pulldown-'
        },
        pullupConfig:{
          content: '', // 上拉加载
          pullUpHeight: 60,
          height: 40,
          autoRefresh: false,
          downContent: '', // 放开加载
          upContent: '', // 上拉加载
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
      _self.loadData();
    },
    created: function () {
      var _self = this;
      _self.user = common.getObjStorage("userInfo") || {};
      _self.loadData();
    },
    methods: {
      goback() {
        this.$router.goBack();
      },
      toUrl: function (params) {
        this.$router.push({name: params.pagename, query: params.query})
      },
      toDetail: function (params) {
        var _self = this;
        if( common.checkInt(params.state) == 0 ){
          _self.getNoticeDetails(params);
          return;
        }
        if( params.type == 1 ){
          params.pagename = 'emporder';
        }else{
          return;
        }
        _self.$router.push({name: params.pagename, query: params.query})
      },
      getDataStr(date){
        return common.timeStamp2String(date,'ymdhm');
      },
      // 头像
      checkAvatar (path) {
        return common.getAvatar(path)
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
          interfaceId:common.interfaceIds.getNoticeList,
          pageNo: _self.pagination.pageNo,
          pageSize: _self.pagination.pageSize,
          user_id: _self.user._id,
          where: {object_type: {$ne:0}}
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
        let notices = data.notices || [];
        //判断页码是否为0
        if(_self.pagination.pageNo == 0) {
          _self.dataList = notices;
        } else {
          _self.dataList.push(...notices);
        }
        _self.loadMoreStatus.show=false;
        _self.loadMoreStatus.showLoading=false;
        _self.$refs.scroller.donePulldown();
        _self.$refs.scroller.donePullup();
        //判断数据是否有一页
        if(notices.length < _self.pagination.pageSize){
          _self.hasMore = false;
          _self.loadMoreStatus.show=true;
          _self.loadMoreStatus.showLoading=false;
          _self.loadMoreStatus.tip=_self.loadMoreStatus.tipNoData;
          _self.$refs.scroller.disablePullup();
        } else {
          _self.pagination.pageNo++
        }
      },

      // 察看详情
      getNoticeDetails(param){
        let _self = this;
        let params = {
          interfaceId:common.interfaceIds.getNoticeDetails,
          user_id: _self.user._id,
          notice_id: param.nid
        };
        this.$axios.post('/mongoApi',{
          params
        },(response)=>{
          let data = response.data;
          if( data && data.code==200 ){
            if( param.type == 1 ){
              _self.$router.push({name: 'emporder', query: param.query})
            }else{
              _self.dataList.forEach(function (item,index) {
                if( item._id == param.nid ){
                  item.state = 1;
                }
              })
            }
            // 刷新用户未读数量
            var user = common.getObjStorage("userInfo")||{};
            var num = common.checkInt(user.unread_number);
            user.unread_number = num>0 ? num-1 : 0;
            common.setStorage("userInfo",user);
          }else{
            console.log("查询出错！")
          }
        })
      },

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../../../static/css/index/inform-xitong.css";
</style>
