<template>
  <div>
    <!-- 上拉加载 -->
    <scroller lock-x height="-60px" @on-scroll-bottom="onScrollBottom" @on-scroll="onScroll" ref="scrollerBottom" :scroll-bottom-offst="100">
      <div>
        <!--雇主列表-->
        <div class="content" style="margin-top: 0rem;padding-top: 0rem;">
          <div class="gz-list" v-for="order in orderList" @click="toDetails(order._id)">
            <div class="gz-top">
              <div class="gz-touxiang">
                <img :src="checkAvatar(order.user.img)" />
              </div>
              <div class="gz-nicheng">{{order.user.user_name}}</div>
              <div class="gz-jiage"><span>￥</span><span>{{order.project_budget}}</span></div>
            </div>
            <div class="gz-timeleixin">
              <!--<div class="gz-time"><span><img src="../../../static/images/index/time.png"/></span><span>{{getDateDiff(order.refresh_date)}}</span></div>-->
              <div class="gz-time">
                <span>{{getDateDiff(order.footprint_date)}}&nbsp;·&nbsp;{{order.project_region}}</span>
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
                <div class="gb-tu" v-for="bidder in order.bidders">
                  <img :src="checkAvatar(bidder.user.img)" />
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
  import {LoadMore, Scroller } from 'vux'
  export default {
    components: {
      Scroller,
      LoadMore
    },
    props:{
      value: String
    },
    data () {
      return {
        orderList: [],
        pageNo: 0,
        pageSize: 10,
        onFetching: true,
        showLoading: false,
        loadtext: '上拉加载',
        loadmore: '上拉加载',
        loadrefresh: '正在加载...',
        loadnomore: '没有更多数据了'
      }
    },
    activated: function () {
      console.log("orders activated:")
    },
    created: function () {
      console.log("orders created:")
      this.loadMore()
    },
    mounted: function () {
      console.log("orders mounted:")
      this.$nextTick(() => {
        this.$refs.scrollerBottom.reset({top: 0})
      })
    },
    methods: {
      toUrl: function (params) {
        this.$router.push({name: params.pagename})
      },
      // 详情页
      toDetails (id) {
        this.$router.push({name: 'emporder', query: {id: id}})
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
      // 抢单
      grabOrder (id) {
        var userInfo = common.getObjStorage('userInfo') || {};
        if ( common.isNull(userInfo._id) == true ) { // 未登录
          this.$router.push({name: 'login'})
        } else {
          var status = this.getBidStatus(id, userInfo._id);
          // console.log("status:"+status)
          if ( status == 0 ) { // 未参与
            this.$router.push({name: 'orderqiangdan', query: {id: id}});
          } else { // 已参与
            this.$router.push({name: 'emporder', query: {id: id}});
          }
        }
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
      // 滑动
      onScroll (sroll) {
        // console.log("onScroll:"+JSON.stringify(sroll))
      },

      // 下拉加载下拉加载
      onScrollBottom () {
        // console.log("onScrollBottom:")
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
      loadMore () {
        var _self = this;
        var params = {
          interfaceId: common.interfaceIds.getOrderList,
          pageNo: _self.pageNo,
          pageSize: _self.pageSize
        }
        // 排序
        params.sort = {refresh_date:-1};
        if( !common.isNull(_self.value) ){
          params.where ={project_title : {$regex : _self.value}};
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
            _self.setOrderData(data);
          }
        })
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
        if( _self.pageNo == 0 ){
          _self.orderList = orderList;
        }else{
          _self.orderList = [..._self.orderList, ...orderList];
        }
        //重置页面滚动距离
        _self.$nextTick(() => {
          _self.$refs.scrollerBottom.reset()
        })
        //底部加载动画
        _self.showLoading = false;
        //判断数据是否有一页
        if ( orderList.length < _self.pageSize ) {
          _self.loadtext = _self.loadnomore;
        } else {
          _self.loadtext = _self.loadmore;
          _self.onFetching = false
          _self.pageNo++;
        }
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
</style>
