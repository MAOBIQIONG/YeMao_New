<template>
  <div class="employer">
    <!--头部导航-->
    <div class="header p-static">
      <span>雇主</span>
      <div class="header-right "v-tap="{ methods:toUrl, pagename:'message', flag:true }">
        <img src="../../../static/images/employer/ling.png" />
        <div class="hongdian" v-if="user.unread_number>0"></div>
      </div>
    </div>

    <!--定位-->
    <div class="top">
      <div class="top-menu p-static">
        <!--状态模块-->
        <div class="gu-mokuai">
          <div class="dingdan" v-tap="{ methods:toUrl, pagename:'fabudingdan', flag:true }">
            发 布 项 目
          </div>
          <div class="shouchang" v-tap="{ methods:toMyorder, pagename:'myorderchuli', flag:true }">
            我 的 订 单
          </div>
        </div>
        <!--智能排序-->
        <div class="id-znpx">
          <div class="xian" v-tap="{ methods:znbx }">
            <p :class="znpxMark==true ? 'up' : ''" v-text="sortName"></p>
          </div>
          <div class="area" v-if="znpxMark">
            <ul>
              <li v-tap="{ methods:sort, value:0 }">智能排序</li>
              <li v-tap="{ methods:sort, value:1 }">人气最高</li>
              <li v-tap="{ methods:sort, value:2 }">最新发布</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <!-- 上拉加载 -->
      <!--<scroller lock-x height="-10px" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="100" style="padding-bottom: 3.8rem;">-->
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
          <div class="gz-list" v-for="(order,index) in orderList" :key="index" v-tap="{methods:toDetails,id:order._id,uid:order.user._id}">
            <div class="gz-top">
              <div class="gz-touxiang" :style="{backgroundImage:`url(${checkAvatar(order.user.img)})`}"></div>
              <div class="gz-nicheng">{{order.user.user_name}}</div>
              <div class="gz-jiage"><span>￥</span><span>{{order.project_budget}}</span></div>
            </div>
            <div class="gz-timeleixin">
              <div class="gz-time">
                <!--<span><img src="../../../static/images/index/time.png"/></span>-->
                <!-- <span>{{getDateDiff(order.refresh_date)}}</span> -->
                <span>{{footPrintTime(order.footprint_date)}}&nbsp;·&nbsp;{{order.project_region}}</span>
              </div>
              <div class="gz-leixin"><span>{{getNameById(order.project_type)}}</span></div>
            </div>
            <div class="gz-content">
              <div class="tupian">
                <div class="tu" v-for="img in order.imgs.slice(0, 3)">
                  <div class="bg-cover" :style="'background-image:url('+checkImg(img)+')'"></div>
                </div>
              </div>
              <div class="wenzhi">{{order.project_describe}}</div>
            </div>
            <div class="gz-bottom">
              <div class="gb-left">
                <div class="gb-tu" v-for="bidder in order.bidders" :style="{backgroundImage:`url(${checkAvatar(bidder.user.img)})`}"></div>
                <div class="gb-wz"><span>{{order.bidders.length}}</span>人抢单</div>
              </div>
              <div class="gb-right">
                <div class="gb-ljqd" @click.stop="grabOrder(order._id)">立即抢单</div>
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
  import { LoadMore, Scroller } from 'vux'
  export default {
    components: {
      Scroller,
      LoadMore
    },
    data () {
      return {
        user:{},
        orderList: [],
        sortName: '智能排序',
        sortMark: 0,
        znpxMark: false,

        onFetching: true,
        lockX:true,
        lockY:false,
        height: common.getDeviceHeight(3.1), // -200
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
      var _self = this;
      _self.user = common.getObjStorage("userInfo") || {};
      var erm = _self.$store.state.employerRefreshMark;
      if ( erm > 0 ) {
        _self.$store.state.employerRefreshMark = 0;
        _self.pagination.pageNo = 0;
        _self.pagination.pageSize = 10;
        _self.onFetching = true;
        _self.loadMore()
      }
      // 首页未读刷新
      var urm = _self.$store.state.unreadNumRefreshMark;
      if ( urm > 0 ) {
        _self.$store.state.unreadNumRefreshMark = 0;
        _self.getUnreadNum();
      }
      // 重置监听接收消息回调
      wyim.callback = _self.receiveMsg;

      let footprint2 = common.getObjStorage('footprint2');
      if(!common.isNull(footprint2)){
        _self.orderList.reduce(function(a,c,i,arr){
          if(c._id==footprint2.id){
            c.footprint_date= Date.parse(new Date());
          }
        },undefined)
      }
      common.delStorage('footprint2');
    },
    created: function () {
      var _self = this;
      _self.user = common.getObjStorage("userInfo") || {};
      _self.loadMore()
      // 重置监听接收消息回调
      wyim.callback = _self.receiveMsg;
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
      toUrl: function (params) {
        var user = common.getObjStorage('userInfo') || {};
        if ( params.flag == true && common.isNull(user._id) == true ) {
          this.$router.push({name: 'login'})
        } else {
          this.$router.push({name: params.pagename})
        }
      },
      toMyorder(params){
        //myorder页面tabindex设为0；
        this.$store.commit("changeIndexOrder",{index:0});
        this.toUrl(params);
      },
      // 详情页
      toDetails (params) {
        var _self = this;
        if(_self.user && _self.user._id == params.uid){
          common.setStorage('footprint2',{id:params.id});
        }
        this.$router.push({name: 'emporder', query: {id: params.id}})
      },
      /*******************************************************/
      // 项目类型名称
      getNameById(id){
        return common.getNameByTypeId(id);
      },
      // 头像
      checkAvatar(path){
        return common.getAvatar(path);
      },
      checkImg(path){
        return common.getDefultImg(path);
      },
      getDateDiff(date){
        return common.getDateDiff(date)
      },
      // 智能排序
      znbx () {
        var _self = this
        _self.znpxMark = _self.znpxMark == true ? false : true
      },
      // 排序
      sort (param) {
        var _self = this
        _self.znpxMark = _self.znpxMark == true ? false : true
        _self.sortName = event.target.innerText;
        if( _self.sortMark != param.value  ){
          _self.sortMark = param.value;
          _self.pagination.pageNo = 0;
          _self.loadMore();
          _self.$nextTick(() => {
            _self.$refs.scroller.reset({top: 0})
          })
        }
      },
      // 抢单
      grabOrder(id){
        var userInfo = common.getObjStorage("userInfo");
        if( common.isNull(userInfo._id) == true ){//未登录
          this.toUrl("login");
        }else{
          var status = this.getBidStatus(id,userInfo._id);
          // console.log("status:"+status)
          if( status == 0 ){//未参与
            this.$router.push({name:'orderqiangdan',query:{id:id}});
          }else{//已参与
            this.$router.push({name:'emporder',query:{id:id}});
          }
        }
      },
      // 获取用户抢单状态
      getBidStatus(oid,uid){
        var _self = this;
        var status = 0;//0、未参与，1、已参与
        _self.orderList.forEach(function (item,index) {
          if( item._id == oid ){
            status = item.user_id == uid ? 1 : 0;
            item.bidders.forEach(function (item,index) {
              if( item.user_id == uid ){
                status = 1;
              }
            })
          }
        })
        return status;
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
        var _self = this;
        _self.srollFlag = position.top > 100 ? 1 : 0;
        if( position.top<-150 && position.top>=-400 ){
          var size = (150-position.top-110)/100;
          $("#page").css('background-size',size+'rem '+size+'rem')
        }
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
        var _self = this
        if (_self.onFetching) {
          // do nothing
        } else {
          _self.onFetching = true
          setTimeout(() => {
            _self.loadMore()
          }, 100)
        }
      },
      /**
       * interface
       * */
      loadData () {
        var _self = this;
        var params = {
          interfaceId:common.interfaceIds.getOrderList,
          pageNo: _self.pagination.pageNo,
          pageSize: _self.pagination.pageSize,
          user_id: _self.user._id
        }
        // 排序
        params.sort = _self.sortMark==1?{project_participants:-1}:{refresh_date:-1};
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          // console.log(response)
          var data = response.data
          if( data ){
            _self.setOrderData(data);
          }
        })
      },

      footPrintTime(date){
          let now = Date.parse(new Date());
          let differ = (now-date)/ 1000 / 60;
          if(differ<5){
            return "刚刚来过";
          }
          if(differ>=5 && differ < 60){
            return parseInt(differ) + "分钟前来过";
          }
          if(differ>=60 && differ < 1440){
            return parseInt(differ/ 60) + "小时前来过";
          }
          if(differ>=1440){
            return parseInt(differ/ 1440) + "天前来过";
          }
      },
      setOrderData(data){
        var _self = this;
        // 订单
        var orderBidders = data.orderBidders || [];
        var orderList = data.orderList || [];
        orderList.forEach(function (item, index) {
          if( !item.user ){
            item.user = {};
          }
          // 参与人
          item.bidders = [];
          orderBidders.forEach(function (b, j) {
            if ( item._id == b.order_id ) {
              item.bidders.push(b);
            }
          })
        });
        //判断页码是否为0
        if( _self.pagination.pageNo == 0 ){
          _self.orderList = orderList;
        }else{
          _self.orderList = [..._self.orderList, ...orderList];
        }
        //判断数据是否有一页
        _self.loadMoreStatus.showLoading=false;
        _self.$refs.scroller.donePulldown();
        _self.$refs.scroller.donePullup();
        if( orderList.length < _self.pagination.pageSize ){
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
      // 初始化首页
      getUnreadNum () {
        var _self = this
        if(common.isNull(_self.user._id)) return;
        var params = {
          interfaceId: common.interfaceIds.getUnreadNum,
          user_id: _self.user._id
        };
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          var data = response.data
          if ( data ) {
            _self.user.unread_number = data.num || 0;
            common.setStorage("userInfo",_self.user);
          }
        })
      },

      // 接收消息后，检查未读消息数量
      receiveMsg(){
        // 刷新用户未读数量
        var _self = this;
        var num = common.checkInt(_self.user.unread_number);
        if( !common.isNull(_self.user._id) && num==0 ){
          _self.user.unread_number = 1;
          common.setStorage("userInfo",_self.user);
        }
      },

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../static/css/employer/guzhu.css';
  .employer{
    width: 100%;
    background-color: #F2F2F2;
    position: fixed;
  }
  .gu-mokuai .dingdan {
    background: url('../../../static/images/fabubj.png');
    background-size: 100% 100%;
  }
  .gu-mokuai .shouchang {
    background: url('../../../static/images/dingdanbj.png');
    background-size: 100% 100%;
  }
  .header .header-right .hongdian{
    width: 0.1rem;
    height: 0.1rem;
    background: red;
    border-radius: 50%;
    position: absolute;
    right: 0rem;
    top: 0.1rem;
  }
  .bg{
    background:#fefefe;
  }
  .bg_click {
    background:#f3f3f3;
  }

  /**定位**/
  .top-menu{
    width: 100%;
    background-color: #F2F2F2;
    position: fixed;
    top: 0.88rem;
    z-index: 2;
  }
  .gu-mokuai{
    margin-top: 0rem;
  }

</style>
