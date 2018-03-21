<template>

  <div id="page">
    <div class="index-banner">
      <!--搜索栏-->
      <div class="id-header qujin" :class="srollFlag==0?'bg-clo1':'bg-clo'">
        <!--地区选择-->
        <div class="crity">
          <group>
            <x-address @on-hide="logHide" @on-show="logShow" raw-value title="" :list="addressData" hide-district value-text-align="right" v-model="value"></x-address>
          </group>
        </div>
        <div class="id-xiaoxi" v-tap="{ methods:toUrl , pagename:'message' }">
          <img src="../../../static/images/index/ling.png" />
          <div class="hongdian" v-if="user.unread_number>0"></div>
        </div>
        <div class="id-sousuo" :class="srollFlag==0?'sousuo1':'sousuo'" v-tap="{ methods:toUrl , pagename:'search' }">
          <img src="../../../static/images/index/search.png" />
        </div>
      </div>
    </div>
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
        <!--banner-->
        <swiper loop auto height="4rem" :list="imgList" :index="imgIndex" @on-index-change="onIndexChange"></swiper>
        <!--功能列表-->
        <div class="id-list">
          <div class="list-box" v-tap="{ methods:getOrderByTypeId , id:'5a4248b1160048792cd9d35a' }">
            <div class="lb-img">
              <img src="../../../static/images/index/chehua.png" />
            </div>
            <p>策划</p>
          </div>
          <div class="list-box" v-tap="{ methods:getOrderByTypeId , id:'5a4248b1160048792cd9d35b' }">
            <div class="lb-img">
              <img src="../../../static/images/index/guihua.png" />
            </div>
            <p>规划</p>
          </div>
          <div class="list-box" v-tap="{ methods:getOrderByTypeId , id:'5a4248b1160048792cd9d35c' }">
            <div class="lb-img">
              <img src="../../../static/images/index/jianzhusheji.png" />
            </div>
            <p>建筑</p>
          </div>
          <div class="list-box" v-tap="{ methods:getOrderByTypeId , id:'5a4248b1160048792cd9d35d' }">
            <div class="lb-img">
              <img src="../../../static/images/index/jiegou.png" />
            </div>
            <p>结构</p>
          </div>
          <div class="list-box" v-tap="{ methods:getOrderByTypeId , id:'5a4248b1160048792cd9d35e' }">
            <div class="lb-img">
              <img src="../../../static/images/index/jipaishui.png" />
            </div>
            <p>给排水</p>
          </div>
          <div class="list-box" v-tap="{ methods:getOrderByTypeId , id:'5a4248b1160048792cd9d35f' }">
            <div class="lb-img">
              <img src="../../../static/images/index/dianqi.png" />
            </div>
            <p>电气</p>
          </div>
          <div class="list-box" v-tap="{ methods:getOrderByTypeId , id:'5a4248b1160048792cd9d360' }">
            <div class="lb-img">
              <img src="../../../static/images/index/nuantong.png" />
            </div>
            <p>暖通</p>
          </div>
          <div class="list-box" v-tap="{ methods:getOrderByTypeId , id:'5a4248b1160048792cd9d361' }">
            <div class="lb-img">
              <img src="../../../static/images/index/jingguan.png" />
            </div>
            <p>景观</p>
          </div>
          <div class="list-box" v-tap="{ methods:getOrderByTypeId , id:'5a4248b1160048792cd9d362' }">
            <div class="lb-img">
              <img src="../../../static/images/index/shinei.png" />
            </div>
            <p>室内</p>
          </div>
          <div class="list-box"  v-tap="{ methods:toUrl , pagename:'fenlei' }">
            <div class="lb-img">
              <img src="../../../static/images/index/qunab.png" />
            </div>
            <p>全部</p>
          </div>
        </div>
        <div class="gap-line"></div>
        <!--文字滚动广告-->
        <div class="wzgd-box">
          <swiper loop auto height="45px" direction="vertical" :interval=1000 class="text-scroll" :show-dots="false">
            <swiper-item v-for="(item,index) in noticeList" :key="index">
              <div class="notice-img"><img :src="checkAvatar(item.user.img)" /></div>
              <div class="notice-text">{{item.title}}</div>
            </swiper-item>
          </swiper>
        </div>
        <div class="gap-line"></div>
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
        <!--雇主列表-->
        <div class="content"style="padding-bottom:0.2rem">
          <div class="gz-list" v-for="order in orderList" v-tap="{methods:toDetails,id:order._id}">
            <div class="gz-top">
              <div class="gz-touxiang" :style="{backgroundImage:`url(${checkAvatar(order.user.img)})`}"></div>
              <div class="gz-nicheng">{{order.user.user_name}}</div>
              <div class="gz-jiage"><span>￥</span><span>{{order.project_budget}}</span></div>
            </div>
            <div class="gz-timeleixin">
              <div class="gz-time">
                <span class="imge">
                  <!--<img src="../../../static/images/index/time.png"/>-->
                </span>
                <span>{{getDateDiff(order.refresh_date)}}</span>
              </div>
              <div class="gz-leixin"><span>{{getNameById(order.project_type)}}</span></div>
            </div>
            <div class="gz-content">
              <div class="tupian">
                <div class="tu" v-for="img in order.imgs.slice(0, 3)">
                  <!--<img :src="checkImg(img)" />-->
                  <div class="bg-cover" :style="'background-image:url('+checkImg(img)+')'"></div>
                </div>
              </div>
              <div class="wenzhi">{{order.project_describe}}</div>
            </div>
            <div class="gz-bottom">
              <div class="gb-left">
                <div class="gb-tu" v-for="bidder in order.bidders" :style="{backgroundImage:`url(${checkAvatar(bidder.user.img)})`}">
                  <!-- <img :src="checkAvatar(bidder.user.img)" /> -->
                </div>
                <div class="gb-wz"><span>{{order.bidders.length}}</span>人抢单</div>
              </div>
              <div class="gb-right">
                <div class="gb-ljqd" v-tap="{methods:grabOrder,id:order._id}">立即抢单</div>
              </div>
            </div>
          </div>
        </div>
        <load-more v-show="loadMoreStatus.show" :show-loading="loadMoreStatus.showLoading" :tip="loadMoreStatus.tip" class="loadMore"></load-more>
      </div>
    </scroller>
    <div v-transfer-dom>
        <confirm v-model="confirmShow"
            @on-confirm = "compOnConfirm"
            @on-cancel="onCancel"
        >
        <p style="text-align:center;">{{confirmMsg}}</p>
        </confirm>
    </div>
  </div>
</template>

<script>
  import {LoadMore, Scroller, Swiper, SwiperItem, Divider, XAddress, ChinaAddressV4Data, Value2nameFilter as value2name, Confirm,TransferDomDirective as TransferDom} from 'vux'
  import store from '@/vuex/store'

  export default {
    directives: {
        TransferDom
    },
    components: {
      Swiper,
      SwiperItem,
      Divider,
      XAddress,
      Scroller,
      LoadMore,
      Confirm
    },
    store,
    data () {
      return {
        authMark:false,
        confirmShow:false,
        confirmMsg:'您还未实名认证，是否前往认证？',
        srollFlag: 0,
        user:{unread_number:0},
        imgList: [],
        noticeList: [],
        orderList: [],
        imgIndex: 0,
        sortName: '智能排序',
        sortMark: 0,
        znpxMark: false,
        addressData: ChinaAddressV4Data,
        value: ['上海市'],
        city: '',

        onFetching: true,
        lockX:true,
        lockY:false,
        height:"-60",
        pagination: {
          pageNo: 0,
          pageSize: 10
        },
        pullUpDownStatus: {
          pulldownStatus: 'default',
          pullupStatus: 'default'
        },
        pulldownConfig:{
          content: '', // '下拉刷新',
          height: 120,
          autoRefresh: false,
          downContent: '', // '下拉刷新',
          upContent: '', // '放开刷新',
          loadingContent: '', // '刷新中...',
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
      // console.log("index activated:")
      var _self = this;
      var irm = _self.$store.state.indexRefreshMark
      if ( irm > 0 ) {
        _self.$store.state.indexRefreshMark = 0
        _self.pagination.pageNo = 0;
        _self.pagination.pageSize = 10;
        _self.onFetching = true;
        _self.initData()
      }
      // 初始化im
      var user = common.getObjStorage("userInfo") || {};
      _self.user = user;
      if( !common.isNull(user.wy_token) && wyim.nim == null ){
        wyim.init({
          account: user._id,
          token: user.wy_token,
        });
      }
      let isAuthenicatedTip = common.getStorage('isAuthenicatedTip');
      if(user.authenticating_state===0 && parseInt(isAuthenicatedTip) === 0){
          _self.confirmShow = true;
      }
    },
    created: function () {
      var _self = this;
      _self.user = common.getObjStorage("userInfo") || {};
      this.initData()
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
        this.$router.push({name: params.pagename})
      },
      // 详情页
      toDetails (params) {
        this.$router.push({name: 'emporder', query: {id: params.id}})
      },
      // 根据类别id查询订单
      getOrderByTypeId (params) {
        this.$router.push({name: 'leibie', query: {id: params.id}})
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
        // if( _self.sortMark != param.value  ){
          _self.sortMark = param.value;
          _self.pagination.pageNo = 0;
          _self.loadMore();
        // }
      },
      // 抢单
      grabOrder (params) {
        var userInfo = common.getObjStorage('userInfo') || {};
        if ( common.isNull(userInfo._id) == true ) { // 未登录
          this.$router.push({name: 'login'})
        } else {
          var status = this.getBidStatus(params.id, userInfo._id);
          // console.log("status:"+status)
          if ( status == 0 ) { // 未参与
            this.$router.push({name: 'orderqiangdan', query: {id: params.id}});
          } else { // 已参与
            this.$router.push({name: 'emporder', query: {id: params.id}});
          }
        }
        params.event.cancelBubble = true;//阻止冒泡（原声方法）
        params.event.stop;//阻止冒泡（原声方法）
        return false
      },
      // 获取用户抢单状态
      getBidStatus (oid, uid) {
        var _self = this;
        var status = 0; // 0、未参与，1、已参与
        _self.orderList.forEach(function (item, index) {
          if ( item._id == oid ) {
            status = item.user_id == uid ? 1 : 0;
            item.bidders.forEach(function (item, index) {
              if ( item.user_id == uid ) {
                status = 1;
              }
            })
          }
        })
        return status;
      },
      /**
       * vux
       * */
      // 图片轮播
      onIndexChange (index) {
        this.imgIndex = index
      },
      // 地区
      getName (value) {
        return value2name(value, ChinaAddressV4Data)
      },
      logHide (str) {
        var _self = this
        console.log('on-hide', str)
        if ( str == true ) {
          console.log('value', _self.value)
          if (_self.value[0] == '110000' || _self.value[0] == '120000' ||
            _self.value[0] == '310000' || _self.value[0] == '500000') {
            _self.value[1] = '--'
          } else {
            _self.value[0] = '--'
          }
          var city = _self.getName(_self.value);
          _self.city = city.trim();
          // console.log('city', _self.city)
          // 按城市查询订单
          _self.pagination.pageNo = 0;
          _self.loadMore();
        }
      },
      logShow (str) {
        console.log('on-show', str)
      },

      /**
       * interface
       * */
      // 初始化首页
      initData () {
        var _self = this
        var params = {
          interfaceId: common.interfaceIds.getIndexInfo,
          user_id: _self.user._id
        };
        params.sort = {refresh_date:-1};
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          // console.log(response);
          var data = response.data
          if ( data ) {
            _self.setIndexData(data);
            _self.setOrderData(data);
          }
        })
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

      // 加载更多
      loadData () {
        var _self = this;
        var params = {
          interfaceId: common.interfaceIds.getOrderList,
          pageNo: _self.pagination.pageNo,
          pageSize: _self.pagination.pageSize,
          where:{},
          user_id: _self.user._id
        }
        // 排序
        params.sort = _self.sortMark==1?{project_participants:-1}:{refresh_date:-1};
        // 条件
        if( !common.isNull(_self.city) ){
          params.where.project_region = _self.city;
        }
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          var data = response.data
          if ( data ) {
            _self.setOrderData(data);
          }
        })
      },

      setIndexData(data){
        var _self = this;
        // 轮播图
        _self.imgList = data.imgList || [];
        // 通知
        _self.noticeList = data.noticeList || [];
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
         compOnConfirm(){
            // this.$store.state.isAuthenicatedTip = 1;
            common.setStorage('isAuthenicatedTip',1);
            this.toUrl({'pagename':'shimingrenzheng'});
        },
        onCancel(){
            // this.$store.state.isAuthenicatedTip = 1;
            common.setStorage('isAuthenicatedTip',1);
        }

    }
  }
</script>

<style>
  .vux-no-group-title {
    margin-top:0 !important;
    font-size: 0.28rem !important;
  }
  .weui-cells{
    background: transparent !important;
  }
  .weui-cell_access {
    padding:0 !important;
    height: 0.8rem;
    /* width: 1rem; */
    display:inline-block!important;
  }
  .weui-cells:before{
    border: none !important;
  }
  .vux-cell-box:before{
    border: none !important;
  }
  .weui-cells:after{
    border: none !important;
  }
  .weui-cell_access .weui-cell__ft:after{
    border: none !important;
    border-style: none !important;
  }
  .vux-cell-value{
    color:#333333;
  }
  .vux-popup-picker-value{
    display:block;
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
    overflow:hidden;
    word-break:keep-all;           /* 不换行 */
    white-space:nowrap;          /* 不换行 */
    text-overflow:ellipsis;
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../static/css/index/index.css';
  .bg{
    background:#fefefe;
  }
  .bg_click {
    background:#f3f3f3;
  }
  /**************************************/
  .bg-clo{background-color:rgba(255,255,255,1);}
  .bg-clo1{background-color:rgba(0,0,0,.1)}
  .sousuo{
    width:5.5rem !important;
    background-color:rgba(0,0,0,.1) !important;
  }
  .sousuo1{
    width:1.2rem;
    background-color:rgba(255,255,255,1);
  }
  .page{
    display: flex;
  }
  /**首页背景**/
  #page{
    background: url('../../../static/images/logo.png') center top 1rem no-repeat;
    background-size: 1.5rem 1.5rem;
  }
</style>
