<template>
  <div class="">
    <!-- 上拉加载 -->
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
        <div class="">
          <div :style="{ height: blank }"></div>
          <div class="sjs-list" v-for="item in designers">
            <div class="sjs-top" v-tap="{methods:toDetails, id:item._id}">
              <div class="st-touxiang" :style="{backgroundImage:`url(${checkAvatar(item.img)}`}"></div>
              <div class="st-neirong">
                <div class="sn-top">
                  <div class="st-nicheng">{{item.user_name}}</div>
                  <div class="sb-qian" v-if="item.authenticating_state>5">签</div>
                  <div class="sb-ysm" v-if="item.authenticating_state>1">已实名</div>
                  <div class="sb-yrz" v-if="item.authenticating_state>3">已认证</div>
                  <!--<div class="st-pingxin" style="width: 2.5rem">-->
                    <!--<rater v-model="item.composite_score" star="<i class='icon iconfont icon-star-red'></i>" active-color="#FF9900" :disabled="true" :max="5" :margin="5" :font-size="14"></rater>-->
                  <!--</div>-->
                </div>
                <div class="sn-bottom">
                  <div class="sb-nianling">{{item.working_years}}年</div>
                  <div class="st-pingxin" style="width: 2.5rem">
                    <rater v-model="item.composite_score" star="<i class='icon iconfont icon-star-red'></i>" active-color="#FF9900" :disabled="true" :max="5" :margin="5" :font-size="14"></rater>
                  </div>
                  <!--<div class="sb-qian" v-if="item.authenticating_state>5">签</div>-->
                  <!--<div class="sb-ysm" v-if="item.authenticating_state>1">已实名</div>-->
                  <!--<div class="sb-yrz" v-if="item.authenticating_state>3">已认证</div>-->
                </div>
              </div>
              <div class="st-jiageleixin">
                <div class="st-jiage"><span>￥</span><span>{{item.hourly_wage}}</span>/时</div>
                <div class="st-leixin"><span>{{getNameById(item.user_type)}}</span></div>
              </div>
            </div>
            <div class="sjs-content" v-tap="{methods:toDetails, id:item._id}">
              <div class="sc-jiesao">{{item.description}}</div>
            </div>
            <div class="sjs-bottom">
              <div class="sjs-yysj" v-tap="{methods:beInvited,designerid:item._id}" v-if="canInvited(item._id)">应邀设计</div>
              <div class="sjs-mmlt" v-tap="{methods:toUrlWUI,pagename:'liaotian',query:{id:item._id,name:item.user_name,img:item.img}}">喵喵聊天</div>
            </div>
          </div>
        </div>
        <load-more v-show="loadMoreStatus.show" :show-loading="loadMoreStatus.showLoading" :tip="loadMoreStatus.tip" class="loadMore"></load-more>
      </div>
    </scroller>
  </div>
</template>

<script>
  import {LoadMore, Scroller, Rater  } from 'vux'
  export default {
    components: {
      Scroller,
      LoadMore,
      Rater
    },
    props:{
      value: String,                   // 模糊查询字符串
      blank: String,                   // 数据离屏幕高度的间隔
      pulldownTop: String,             // 下拉提示框距离顶部的高度
    },
    data() {
      return {
        sortMark:0,
        designers: [],
        // 加载
        onFetching: true,
        lockX:true,
        lockY:false,
        height:"-50",
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
    activated: function () {
      console.log("designers activated:")
      var drm = this.$store.state.designerRefreshMark;
      if ( drm > 0 ) {
        this.$store.state.designerRefreshMark = 0;
        this.pagination.pageNo = 0;
        this.pagination.pageSize = 10;
        this.onFetching = true;
        this.loadMore()
      }
    },
    created: function () {
      console.log("designers created:")
      var _self = this;
      _self.loadMore()
      /*****************重置下拉刷新提示框距离屏幕顶部距离******************/
      setTimeout(function () {
        if( !common.isNull(_self.pulldownTop) && _self.$route.path=='/home/designer' ){
          var pulldowns = document.getElementsByClassName("xs-plugin-pulldown-container");
          for (var i=0; i<pulldowns.length; i++) {
            pulldowns[i].style.top = _self.pulldownTop;
          }
        }
      },1000)
    },
    mounted: function () {
      console.log("designers mounted:")
      var _self = this;
      _self.$nextTick(() => {
        _self.$refs.scroller.reset({top: 0})
      })
    },
    destroyed: function() {
      console.log("designers destroyed:");
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
      toUrl: function (params) {
        this.$router.push({name: params.pagename,query:params.query || {}})
      },
      toUrlWUI: function (params) { // toUrlWidthUserInfo
        var user = common.getObjStorage("userInfo") || {};
        if( !common.isNull(user._id) ){
          this.$router.push({name: params.pagename,query:params.query || {}})
        }else{
          this.$router.push({name: 'login'})
        }
      },
      // 详情页
      toDetails (param) {
        // console.log("param.id:"+param.id)
        this.$router.push({name: 'sjszxxq', query: {id: param.id}})
      },
      /*******************************************************/
      // 项目类型名称
      getNameById (id) {
        return common.getNameByTypeId(id)
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

      // 加载更多
      loadData () {
        var _self = this;
        var params = {
          interfaceId: common.interfaceIds.getDesigners,
          pageNo: _self.pagination.pageNo,
          pageSize: _self.pagination.pageSize
        }
        //条件查询
        params.where = {};
        // 模糊查询
        if( !common.isNull(_self.value) ){
          params.where.user_name = {$regex : _self.value};
        }
        // 排序标识
        params.sort = {create_date:-1};
        var sortMark = common.checkInt(_self.sortMark);
        if( sortMark == 1 ){
          params.sort = {composite_score:-1} ;
        }else if( sortMark == 4 ){
          params.where.working_years = {$lte:1};
        }else if( sortMark == 5 ){
          params.where.working_years = {$lte:3, $gt:1};
        }else if( sortMark == 6 ){
          params.where.working_years = {$lte:5, $gt:3};
        }else if( sortMark == 7 ){
          params.where.working_years = {$gt:5};
        }else if( sortMark == 9 ){
          params.where.authenticating_state = {$gte:2};
        }else if( sortMark == 10 ){
          params.where.authenticating_state = {$gte:4};
        }else if( sortMark == 11 ){
          params.where.authenticating_state = 6;
        }
        //上拉加载
        _self.loadtext = _self.loadrefresh;
        _self.showLoading = true;
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          // console.log(response)
          var data = response.data
          if ( data ) {
            _self.setUserData(data);
          }
        })
      },

      setUserData(data){
        var _self = this;
        // 设计师
        var designers = data.designers || [];
        //判断页码是否为0
        if( _self.pagination.pageNo == 0 ){
          _self.designers = designers;
        }else{
          _self.designers = [..._self.designers, ...designers];
        }
        //判断数据是否有一页
        _self.loadMoreStatus.showLoading=false;
        _self.$refs.scroller.donePulldown();
        _self.$refs.scroller.donePullup();
        //判断数据是否有一页
        if ( designers.length < _self.pagination.pageSize ) {
          _self.hasMore = false;
          _self.loadMoreStatus.show=true;
          _self.loadMoreStatus.tip=_self.loadMoreStatus.tipNoData;
          _self.$refs.scroller.disablePullup();
        } else {
          _self.onFetching = false
          _self.pagination.pageNo++;
          _self.loadMoreStatus.show=false;
        }
      },

      // 重新加载数据
      refreshData(mark){
        var _self = this;
        _self.pagination.pageNo = 0;
        _self.sortMark = mark;
        _self.loadMore();
      },
      beInvited(p){
        var user = common.getObjStorage("userInfo") || {};
        if(common.isNull(user._id)){
          this.$router.push({name:'login'});
        } else {
          this.$router.push({name:'fabudingdan',query:{designerid:p.designerid}});
        }

      },
      canInvited(p){
        var user = common.getObjStorage("userInfo") || {};
        if(common.isNull(user._id)){return true}
        if(user._id==p){
          return false
        }
        return true;
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../../static/css/index/search-jieguo.css";
  .sjs-list{
    margin-top: 0rem !important;
    margin-bottom: 0.2rem;
  }
</style>
