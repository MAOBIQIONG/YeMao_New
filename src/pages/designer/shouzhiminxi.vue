<template>
  <div class="szmx">
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>明细</span>
    </div>
    <div class="content content-p">
      <!-- 上拉加载 -->
      <scroller lock-x height="" @on-scroll-bottom="onScrollBottom" @on-scroll="onScroll" ref="scrollerBottom" :scroll-bottom-offst="100">
        <div>
          <div v-for="ym in yms" >
            <div class="list">
              <div class="list-left">
                <p class="one fist">{{ym}}</p>
                <!--<p class="two">提现 ￥<span>2050.34</span> 收入￥<span></span></p>-->
              </div>
            </div>
            <div class="list" v-for="item in payments" v-if="ym == item.ym">
              <div class="list-left">
                <p class="one">{{item.type==0?'+':'-'}}<span>{{item.money}}</span></p>
                <p class="two">{{item.remark}}</p>
              </div>
              <div class="list-right">
                <p class="two">{{getDateDiff(item.create_date)}}</p>
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
        user_id: '',
        yms: [],
        payments: [],
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
    mounted: function () {
      this.$nextTick(() => {
        this.$refs.scrollerBottom.reset({top: 0})
      })
    },
    created: function () {
      console.log("created:")
      var _self = this;
      var userInfo = common.getObjStorage("userInfo") || {};
      if( common.isNull(userInfo._id) != true ){
        _self.user_id = userInfo._id;
      }
      _self.initData();
    },
    methods: {
      goback(){
        this.$router.goBack();
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
      // 默认图片
      getDefultImg (path) {
        return common.getAvatar(path,'./static/images/bj.jpg')
      },
      // 时间戳转字符串
      getStringDate(date,id){
        return common.timeStamp2String(date,id)
      },
      // 根据时间戳获取发布时间
      getDateDiff(date){
        return common.getDateDiff(date)
      },
      checkYearAnMonth: function (date,date2){
        var dt1 = new Date(date.replace(/-/g,"/")),
            dt2 = new Date(date2.replace(/-/g,"/"));
        if( dt1.getYear()==dt2.getYear() && dt1.getMonth()==dt2.getMonth() ){
          return true;
        } return false
      },
      /*************************************************/
      // 滑动
      onScroll: function (sroll) {
      },
      // 下拉加载下拉加载
      onScrollBottom: function () {
        var _self = this
        if (_self.onFetching) {
          // do nothing
        } else {
          _self.onFetching = true
          setTimeout(() => {
            _self.initData()
          }, 100)
        }
      },
      /*************************************************/
      // 初始化首页
      initData () {
        var _self = this;
        if( common.isNull(_self.user_id) ){
          return;
        }
        var params = {
          interfaceId: common.interfaceIds.getPayments,
          user_id: _self.user_id,
          pageNo:_self.pageNo,
          pageSize: _self.pageSize
        };
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          // console.log(response);
          var data = response.data
          if ( data ) {
            var payments = data.payments || [];
            payments.forEach(function(item,index){
              var ym = common.timeStamp2String(item.create_date,'ym2');
              item.ym = ym;
              if( _self.yms.indexOf(ym) < 0 ){
                _self.yms.push(ym);
              }
            });
            //判断页码是否为0
            if( _self.pageNo == 0 ){
              _self.payments = payments;
            }else{
              _self.payments = [..._self.payments, ...payments];
            }
            //重置页面滚动距离
            _self.$nextTick(() => {
              _self.$refs.scrollerBottom.reset()
            })
            //底部加载动画
            _self.showLoading = false;
            //判断数据是否有一页
            if ( data.payments.length < _self.pageSize ) {
              _self.loadtext = _self.loadnomore;
            } else {
              _self.loadtext = _self.loadmore;
              _self.onFetching = false
              _self.pageNo++;
            }
          }
        })
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../static/css/designer/shouzhiminxi.css';
  .szmx{
    position: fixed;
  }
</style>
