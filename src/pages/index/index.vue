<template>

  <div id="page">
    <div class="index-banner">
      <!--搜索栏-->
      <div class="id-header" :class="srollFlag==0?'bg-clo1':'bg-clo'">
        <!--地区选择-->
        <div class="crity">
          <group>
            <x-address @on-hide="logHide" @on-show="logShow" raw-value title="" :list="addressData" hide-district value-text-align="right" v-model="value3"></x-address>
          </group>
        </div>
        <div class="id-xiaoxi" @click="toUrl('message')">
          <img src="../../../static/images/index/ling.png" />
          <div class="hongdian"></div>
        </div>
        <div class="id-sousuo" :class="srollFlag==0?'sousuo1':'sousuo'" @click="toUrl('search')">
          <img src="../../../static/images/index/search.png" />
        </div>
      </div>
    </div>
    <!-- 上拉加载 -->
    <scroller lock-x height="" @on-scroll-bottom="onScrollBottom" @on-scroll="onScroll" ref="scrollerBottom" :scroll-bottom-offst="100" style="padding-bottom: rem;">
      <div>
        <!--banner-->
        <swiper loop auto height="4rem" :list="imgList" :index="imgIndex" @on-index-change="onIndexChange"></swiper>
        <!--功能列表-->
        <div class="id-list">
          <div class="list-box"@click="toUrl('leibie')">
            <div class="lb-img">
              <img src="../../../static/images/index/chehua.png" />
            </div>
            <p>策划</p>
          </div>
          <div class="list-box"@click="toUrl('leibie')">
            <div class="lb-img">
              <img src="../../../static/images/index/guihua.png" />
            </div>
            <p>规划</p>
          </div>
          <div class="list-box"@click="toUrl('leibie')">
            <div class="lb-img">
              <img src="../../../static/images/index/jianzhusheji.png" />
            </div>
            <p>建筑设计</p>
          </div>
          <div class="list-box"@click="toUrl('leibie')">
            <div class="lb-img">
              <img src="../../../static/images/index/jiegou.png" />
            </div>
            <p>结构</p>
          </div>
          <div class="list-box">
            <div class="lb-img">
              <img src="../../../static/images/index/jipaishui.png" />
            </div>
            <p>给排水</p>
          </div>
          <div class="list-box">
            <div class="lb-img">
              <img src="../../../static/images/index/dianqi.png" />
            </div>
            <p>电气</p>
          </div>
          <div class="list-box">
            <div class="lb-img">
              <img src="../../../static/images/index/nuantong.png" />
            </div>
            <p>暖通</p>
          </div>
          <div class="list-box">
            <div class="lb-img">
              <img src="../../../static/images/index/jingguan.png" />
            </div>
            <p>景观</p>
          </div>
          <div class="list-box">
            <div class="lb-img">
              <img src="../../../static/images/index/shinei.png" />
            </div>
            <p>室内设计</p>
          </div>
          <div class="list-box"@click="toUrl('fenlei')">
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
            <swiper-item v-for="item in noticeList">
              <div class="notice-img"><img :src="item.user_img" /></div>
              <div class="notice-text">{{item.title}}</div>
            </swiper-item>
          </swiper>
        </div>
        <div class="gap-line"></div>
        <!--智能排序-->
        <div class="id-znpx">
          <div class="xian" @click="znbx()">
            <p :class="znpxMark==true ? 'up' : ''">智能排序</p>
          </div>
          <div class="area" v-if="znpxMark">
            <ul>
              <li @click="sort(0)">智能排序</li>
              <li @click="sort(1)">人气最高</li>
              <li @click="sort(0)">最新发布</li>
            </ul>
          </div>
        </div>
        <!--雇主列表-->
        <div class="content">
          <div class="gz-list" v-for="order in orderList" @click="toDetails(order._id)">
            <div class="gz-top">
              <div class="gz-touxiang">
                <img :src="checkAvatar(order.user.img)" />
              </div>
              <div class="gz-nicheng">{{order.user.user_name}}</div>
              <div class="gz-jiage"><span>￥</span><span>{{order.project_budget}}</span></div>
            </div>
            <div class="gz-timeleixin">
              <div class="gz-time"><span><img src="../../../static/images/index/time.png"/></span><span>{{order.project_deadLine}}过期</span></div>
              <div class="gz-leixin"><span>{{getNameById(order.project_type)}}</span></div>
            </div>
            <div class="gz-content">
              <div class="tupian">
                <div class="tu" v-for="img in order.imgs.slice(0, 3)">
                  <img :src="img" />
                </div>
              </div>
              <div class="wenzhi">{{order.project_describe}}</div>
            </div>
            <div class="gz-bottom">
              <div class="gb-left">
                <div class="gb-tu" v-for="bidder in order.bidders">
                  <img :src="checkAvatar(bidder.img)" />
                </div>
                <div class="gb-wz"><span>{{order.bidders.length}}</span>人抢单</div>
              </div>
              <div class="gb-right">
                <div class="gb-ljqd" @click.stop="grabOrder(order._id)">立即抢单</div>
              </div>
            </div>
          </div>
        </div>
        <load-more :show-loading="showLoading" :tip="loadtext" background-color="#fbf9fe" style="margin-top: 30px"></load-more>
      </div>
    </scroller>
  </div>
</template>

<script>
  import {LoadMore, Scroller, Swiper, SwiperItem, Divider,XAddress,ChinaAddressV4Data,} from 'vux'
  import common from '../../../static/common';
  import store from '@/vuex/store'

  export default {
    components: {
      Swiper,
      SwiperItem,
      Divider,
      XAddress,
      Scroller,
      LoadMore,
    },
    store,
    data () {
      return {
        srollFlag:0,
        imgList: [],
        noticeList : [],
        orderList : [],
        imgIndex: 0,
        znpxMark:false,
        addressData: ChinaAddressV4Data,
        value3: ['上海市'],

        pageNo: 0,
        pageSize: 10,
        onFetching:true,
        showLoading:false,
        loadtext:"上拉加载",
        loadmore:"上拉加载",
        loadrefresh: '正在加载...',
        loadnomore: '没有更多数据了',
      }
    },
    activated: function () {
      // console.log("activated:")
      this.$refs.scrollerBottom.reset()
      var irm = this.$store.state.indexRefreshMark;
      if( irm>0 ){
        this.$store.state.indexRefreshMark = 0;
        this.initData();
      }
    },
    created: function () {
      // console.log("inde created:")
      this.initData();
    },
    mounted: function () {
      this.$nextTick(() => {
        this.$refs.scrollerBottom.reset({top: 0})
      })
    },
    methods: {
      cgLink: function (param) {
        this.$router.push({name: param.pagename})
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
      onIndexChange (index) {
        this.imgIndex = index
      },
      //智能排序
      znbx(){
        var _self = this;
        _self.znpxMark = _self.znpxMark == true ? false : true;
      },
      //排序
      sort(flag){
        var _self = this;
        _self.znpxMark = false;
      },
      // 地区
      logHide (str) {
        var obj = this;
        console.log('on-hide', str)
        if( str == true ){
          console.log('value', obj.value3)
          if( obj.value3[0] == '110000' || obj.value3[0] == '120000' ||
            obj.value3[0] == '310000' || obj.value3[0] == '500000' ){
            obj.value3[1] = '--';
          }else{
            obj.value3[0] = '--';
          }
        }
      },
      logShow (str) {
        console.log('on-show',str)
      },
      //项目类型名称
      getNameById(id){
        return common.getNameByTypeId(id);
      },
      //头像
      checkAvatar(path){
        var img = common.getAvatar(path,"../../../static/images/bj.jpg");
        return img;
      },

      //滑动
      onScroll(sroll){
        // console.log("onScroll:"+JSON.stringify(sroll))
        this.srollFlag = sroll.top > 100 ? 1 : 0;
      },

      //下拉加载下拉加载
      onScrollBottom () {
        // console.log("onScrollBottom:")
        var _self = this;
        if (_self.onFetching) {
          // do nothing
        } else {
          _self.onFetching = true
          setTimeout(() => {
            _self.loadMore()
          }, 100)
        }
      },

      initData () {
        var _self = this;
        var params = {
          interfaceId:'getIndexInfo'
        }
        _self.$axios.post('/api/mongoApi',{
          params:params
        }).then((response)=>{
          // console.log(response);
          if( response.data ){
            var data = response.data.data;
            if( data ){
              //轮播图
              _self.imgList = data.imgList || [];

              //通知
              _self.noticeList = data.noticeList || [];
              var noticeUsers = data.noticeUsers || [];
              _self.noticeList.forEach(function (item,index) {
                noticeUsers.forEach(function (obj,j) {
                  if( item.user_id == obj._id ){
                    item.user_img = obj.img;
                  }
                })
              });

              //订单
              var orderUsers = data.orderUsers || [];
              var orderBidders = data.orderBidders || [];
              var bidders = data.bidders || [];
              var orderList = data.orderList || [];
              orderList.forEach(function (item,index) {
                //雇主
                orderUsers.forEach(function (u,j) {
                  if( item.user_id == u._id ){
                    item.user = u;
                  }else{
                    item.user = {};
                  }
                })
                //参与人
                item.bidders = [];
                orderBidders.forEach(function (b,j) {
                  if( item._id == b.order_id ){
                    bidders.forEach(function (u,j) {
                      if( b.user_id == u._id ){
                        b.user_name = u.user_name;
                        b.img = u.img;
                      }
                    })
                    item.bidders.push(b);
                  }
                })
              });
              _self.orderList = orderList;
              _self.$nextTick(() => {
                _self.$refs.scrollerBottom.reset()
              })

              if( orderList.length < _self.pageSize ){
                _self.loadtext = _self.loadnomore;
              }else{
                _self.onFetching = false
                _self.pageNo++;
              }
            }
          }
        })
      },

      loadMore () {
        var _self = this;
        var params = {
          interfaceId:'getOrderList',
          pageNo: _self.pageNo,
          pageSize: _self.pageSize,
        }

        _self.loadtext = _self.loadrefresh;
        _self.showLoading = true;
        _self.$axios.post('/api/mongoApi',{
          params:params
        }).then((response)=>{
          if( response.data ){
            var data = response.data.data;
            if( data ){
              // console.log("loadMore:"+data);
              //订单
              var orderUsers = data.orderUsers || [];
              var orderBidders = data.orderBidders || [];
              var bidders = data.bidders || [];
              var orderList = data.orderList || [];
              orderList.forEach(function (item,index) {
                //雇主
                orderUsers.forEach(function (u,j) {
                  if( item.user_id == u._id ){
                    item.user = u;
                  }else{
                    item.user = {};
                  }
                })
                //参与人
                item.bidders = [];
                orderBidders.forEach(function (b,j) {
                  if( item._id == b.order_id ){
                    bidders.forEach(function (u,j) {
                      if( b.user_id == u._id ){
                        b.user_name = u.user_name;
                        b.img = u.img;
                      }
                    })
                    item.bidders.push(b);
                  }
                })
              });
              _self.orderList = [..._self.orderList, ...orderList];
              _self.$nextTick(() => {
                _self.$refs.scrollerBottom.reset()
              })

              _self.showLoading = false;
              if( orderList.length < _self.pageSize ){
                _self.loadtext = _self.loadnomore;
              }else{
                _self.loadtext = _self.loadmore;
                _self.onFetching = false
                _self.pageNo++;
              }
            }
          }
        })
      },

      //详情页
      toDetails(id){
        this.$router.push({name:'emporder',query:{id:id}});
      },

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

      getBidStatus(oid,uid){
        var _self = this;
        var status = 0;//0、未参与，1、已参与
        _self.orderList.forEach(function (item,index) {
          if( item._id == oid ){
            item.bidders.forEach(function (item,index) {
              if( item.user_id == uid ){
                status = 1;
              }
            })
          }
        })
        return status;
      },

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
    width: 1rem;
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
  @import '../../assets/css/index/index.css';
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
</style>
