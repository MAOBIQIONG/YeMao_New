<template>
  <div class="employer">
    <!--头部导航-->
    <div class="header">
      <span>雇主</span>
      <div class="header-right "@click="toUrl('message')">
        <img src="../../../static/images/employer/ling.png" />
        <div class="hongdian"></div>
      </div>
    </div>

    <!--定位-->
    <div class="top">
      <div class="top-menu">
        <!--状态模块-->
        <div class="gu-mokuai">
          <div class="dingdan" v-tap="{ methods:toUrl, pagename:'fabudingdan', flag:true }">
            发 布 项 目
          </div>
          <div class="shouchang" v-tap="{ methods:toUrl, pagename:'myorderchuli', flag:true }">
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
      <scroller lock-x height="" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="100" style="padding-bottom: 3.2rem;">
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
                  <img :src="checkAvatar(bidder.img)" />
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
  import { LoadMore, Scroller } from 'vux'
  export default {
    components: {
      Scroller,
      LoadMore
    },
    data () {
      return {
        orderList: [],
        sortName: '智能排序',
        sortMark: 0,
        znpxMark: false,

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
      console.log("employer activated:")
      var erm = this.$store.state.employerRefreshMark;
      if ( erm > 0 ) {
        this.$store.state.employerRefreshMark = 0;
        this.pageNo = 0;
        this.pageSize = 10;
        this.onFetching = true;
        this.loadMore()
      }
    },
    created: function () {
      this.loadMore()
    },
    mounted: function () {
      // console.log("employer mounted:")
      //this.$nextTick(() => {
      //    this.$refs.scrollerBottom.reset({top: 0})
      //})
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
      // 详情页
      toDetails (id) {
        this.$router.push({name: 'emporder', query: {id: id}})
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
          _self.pageNo = 0;
          _self.loadMore();
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
      /**
       * vux
       * */
      // 下拉加载下拉加载
      onScrollBottom () {
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
      /**
       * interface
       * */
      loadMore () {
        var _self = this;
        var params = {
          interfaceId:common.interfaceIds.getOrderList,
          pageNo: _self.pageNo,
          pageSize: _self.pageSize,
        }
        // 排序
        params.sort = _self.sortMark==1?{project_participants:-1}:{create_date:-1};
　　　　　// 上拉加载
        _self.loadtext = _self.loadrefresh;
        _self.showLoading = true;
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          var data = response.data
          if( data ){
            _self.setOrderData(data);
          }
        })
      },

      setOrderData(data){
        var _self = this;
        // 订单
        var orderBidders = data.orderBidders || [];
        var bidders = data.bidders || [];
        var orderList = data.orderList || [];
        var orderUsers = data.orderUsers || [];
        orderBidders.forEach(function (b, j) {
          bidders.forEach(function (u, j) {
            if ( b.user_id == u._id ) {
              b.user_name = u.user_name;
              b.img = u.img;
            }
          })
        })
        orderList.forEach(function (item, index) {
          // 雇主
          item.user = {};
          orderUsers.forEach(function (u, j) {
            if ( item.user_id == u._id ) {
              item.user = u;
            }
          })
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../static/css/employer/guzhu.css';
  .employer{
    background-color: #F2F2F2;
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
    right: 0;
    top: 0.1rem;
  }
  .bg{
    background:#fefefe;
  }
  .bg_click {
    background:#f3f3f3;
  }

  /**定位**/
  .top{
    height: 3.2rem;
  }
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
