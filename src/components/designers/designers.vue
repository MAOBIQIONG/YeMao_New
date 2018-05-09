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
                  <div class="st-pingxin" style="width: 2.2rem">
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
        <toast v-model="showMark" :time="1000" type="text" width="5rem">{{showMsg}}</toast>
        <div v-transfer-dom>
            <confirm v-model="confirmShow"
                @on-confirm = "compOnConfirm()"
            >
            <p style="text-align:center;">{{confirmMsg}}</p>
            </confirm>
        </div>
      </div>
    </scroller>
  </div>
</template>

<script>
  import {LoadMore, Scroller, Rater,Toast,Confirm,TransferDomDirective as TransferDom} from 'vux'
  export default {
    directives: {
        TransferDom
    },
    components: {
      Scroller,
      LoadMore,
      Rater,
      Toast,
      Confirm,
    },
    props:{
      value: String,                   // 模糊查询字符串
      blank: String,                   // 数据离屏幕高度的间隔
      pulldownTop: String,             // 下拉提示框距离顶部的高度
    },
    data() {
      return {
        designerid:null,
        sortMark:0,
        designers: [],
        // 加载
        onFetching: true,
        lockX:true,
        lockY:false,
        height: common.getDeviceHeight(0.7), // -50

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
          height: 80,
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
        showMark:false,
        showMsg:"",
        confirmShow:false,
        confirmMsg:"确定选择该设计师吗？",
        confirmType:"reselect",
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
      common.delStorage('reselect')
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
        var reselect = common.getStorage('reselect');
        if(!common.isNull(reselect)){
          common.setStorage('reselect2',1);
        };
        this.$router.push({name: 'sjszxxq', query: {id: param.id}})
      },
      showToast(msg){
          this.showMark = true;
          this.showMsg = msg;
      },
      showConfirm(params){
            this.confirmShow = true;
            this.designerid = params.designerid;
            this.confirmType = params.type
            if(params.type == "reselect"){
                this.confirmMsg = "确定选择该设计师吗？"
            }
            // console.log(this.order_id);
      },
      compOnConfirm(){
          if(this.confirmType=="reselect"){
              this.reselect();
          }
      },
      reselect(){
        let oid = this.$route.query.oid;
        if(common.isNull(oid)){console.error('没有获取订单id');return;}
        console.log(this.designerid,oid);
        let _self = this;
        let params = {
          interfaceId:common.interfaceIds.modifyOrders,
          coll:common.collections.orderList,
          data:{invited_state:1,project_winBidder:_self.designerid},
          wheredata:{
              _id:oid,
          },
        };
        _self.$axios.post('/mongoApi', {
            params: params
        }, response => {
            console.log(response)
            var data = response.data;
            if( data.code == 200 ){
              _self.showToast("重新选择成功");
              setTimeout(function(){
                _self.goback();
              },1000);
            }else{
              _self.showToast("选择失败!");
            }
        });
      },
      resizeScroller(){
        //获取页面字体大小
        let fontSize = getComputedStyle(document.getElementsByTagName('body')[0]).fontSize;
        console.log(fontSize);
        // this.height ='-' + parseInt(fontSize.replace('px','')*1.2)
        this.height = '';
        console.log('height',this.height);
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

      // 加载更多
      loadData () {
        var _self = this;
        _self.loadMoreStatus.tip= _self.loadMoreStatus.tipLoading;
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
        _self.$refs.scroller.enablePullup();
        // 设计师
        var designers = data.designers || [];
        //判断页码是否为0
        if( _self.pagination.pageNo == 0 ){
          _self.designers = designers;
          this.$nextTick(
            ()=>{
              this.$refs.scroller.reset({top:0});
            }
          );
        }else{
          _self.designers = [..._self.designers, ...designers];
        }
        //判断数据是否有一页
        _self.loadMoreStatus.show=false;
        _self.loadMoreStatus.showLoading=false;
        _self.$refs.scroller.donePulldown();
        _self.$refs.scroller.donePullup();
        //判断数据是否有一页
        if ( designers.length < _self.pagination.pageSize ) {
          _self.hasMore = false;
          _self.loadMoreStatus.show=true;
          _self.loadMoreStatus.showLoading=false;
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
        var reselect = common.getObjStorage('reselect');
        var reselect2 = common.getObjStorage('reselect2');
        if(common.isNull(user._id)){
          this.$router.push({name:'login'});
        } else {
          if(!common.isNull(reselect)||!common.isNull(reselect2)){
            p.type="reselect";
            this.showConfirm(p);
          }else {
            this.$router.push({name:'fabudingdan',query:{designerid:p.designerid}});
          }
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
  /*iPhoneX的适配沉浸式样式*/
  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3){
    .sjs-list{
      margin-top: 0.2rem !important;
    }
  }
</style>
