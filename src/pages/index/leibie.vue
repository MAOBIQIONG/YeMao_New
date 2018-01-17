<template>
  <div class="">
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>{{title}}</span>
    </div>
    <!--雇主列表-->
    <div class="content">
      <!-- 上拉加载 -->
      <scroller lock-x height="" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="100">
        <div>
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
                  <img :src="checkAvatar(bidder.user.img)" />
                </div>
                <div class="gb-wz"><span>{{order.bidders.length}}</span>人抢单</div>
              </div>
              <div class="gb-right">
                <div class="gb-ljqd" @click.stop="grabOrder(order._id)">立即抢单</div>
              </div>
            </div>
          </div>
          <load-more :show-loading="showLoading" :tip="loadtext" background-color="#fbf9fe" style="margin-top: 30px"></load-more>
        </div>
      </scroller>
    </div>
  </div>
</template>

<script>
  import {LoadMore, Scroller} from 'vux'
  export default {
    components: {
      Scroller,
      LoadMore
    },
    data () {
      return {
        title: '',
        orderList: [],
        project_type: '',
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
    created: function () {
      this.project_type = this.$route.query.id
      this.title = this.getNameById(this.project_type)
      this.loadMore()
    },
    methods: {
      goback () {
        this.$router.goBack()
      },
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
        var img = common.getAvatar(path, './static/images/bj.jpg')
        return img
      },
      // 抢单
      grabOrder (id) {
        var userInfo = common.getObjStorage('userInfo');
        if ( common.isNull(userInfo._id) == true ) { // 未登录
          this.toUrl('login')
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
      /**
       * interface
       * */
      // 加载更多
      loadMore () {
        var _self = this;
        var params = {
          interfaceId: common.interfaceIds.getOrderList,
          pageNo: _self.pageNo,
          pageSize: _self.pageSize,
          where: {
            project_type: this.project_type
          }
        }
        _self.loadtext = _self.loadrefresh;
        _self.showLoading = true;
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          console.log(response)
          var data = response.data;
          if ( data ) {
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
                if ( item._id == b.order_id && b) {
                  item.bidders.push(b);
                }
              })
            });
            _self.orderList = [..._self.orderList, ...orderList];
            _self.$nextTick(() => {
              _self.$refs.scrollerBottom.reset()
            })

            _self.showLoading = false;
            if ( orderList.length < _self.pageSize ) {
              _self.loadtext = _self.loadnomore;
            } else {
              _self.loadtext = _self.loadmore;
              _self.onFetching = false
              _self.pageNo++;
            }
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .content{
    margin-top: 0.8rem;
    background: #f2f2f2;
  }
</style>
