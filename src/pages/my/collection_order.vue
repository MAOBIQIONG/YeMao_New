<template>
  <div class="">
    <div class="header">
      <div class="header-left" @click="goback"><img src="../../../static/images/back.png"/></div>
      <span>收藏订单</span>
    </div>
    <!--收藏设计师-->
    <div class="content content-p">
      <scroller
        v-model="pullUpDownStatus"
        :height="height"
        :lock-x="lockX"
        :lock-y="lockY"
        :use-pulldown="true"
        :use-pullup="true"
        :pulldown-config="pulldownConfig"
        :pullup-config="pullupConfig"
        @on-scroll="scroll"
        @on-scroll-bottom="onScrollBottom"
        @on-pulldown-loading="pullDownLoading"
        @on-pullup-loading="pullUpLoading"
        ref="scroller"
        :class="{scroller:true}"
      >
        <div>
          <div class="sc-content">
            <div class="gz-list" v-for="(order,index) in collects" @click="toDetails(order._id)" :key="index">
              <div class="gz-top">
                <div class="gz-touxiang">
                  <img :src="checkAvatar(order.user.img)"/>
                </div>
                <div class="gz-nicheng">{{order.user.user_name}}</div>
                <div class="gz-leixin"><span>{{getNameById(order.project_type)}}</span></div>
                <div class="gz-time"><span>{{timeStamp2String(order.project_deadLine)}}过期</span></div>
              </div>
              <div class="gz-content">
                <div class="wenzhi">{{order.project_describe}}</div>
              </div>
              <div class="gz-bottom">
                <div class="gb-left">
                  <div class="gz-jiage"><span>￥</span><span>{{order.project_budget}}</span></div>
                </div>
                <!-- <div class="gb-right">
                  <div class="gb-ljqd" @click.stop="grabOrder(order._id)">立即抢单</div>
                </div> -->
              </div>
            </div>
          </div>
          <load-more v-show="loadMoreStatus.show" :show-loading="loadMoreStatus.showLoading" :tip="loadMoreStatus.tip"
                     class="loadMore"></load-more>
        </div>
      </scroller>
    </div>
    <toast v-model="toast.show" :time="1000" type="text" width="5rem">{{toast.msg}}</toast>
  </div>
</template>

<script>
  import {Scroller, LoadMore, Toast} from 'vux'

  export default {
    components: {
      Scroller,
      LoadMore,
      Toast
    },
    props: {
      lockX: {
        type: Boolean,
        default: true
      },
      lockY: {
        type: Boolean,
        default: false
      },
      height: {
        type: String,
        default: "-50"
      }
    },
    data() {
      return {
        collects: [],
        user_id: null,
        collects_id: null,
        user: null,
        toast: {
          show: false,
          msg: ''
        },
        pagination: {
          pageNo: 0,
          pageSize: 10,
        },
        pullUpDownStatus: {
          pulldownStatus: 'default',
          pullupStatus: 'default'
        },
        pulldownConfig: {
          content: '下拉刷新',
          height: 60,
          autoRefresh: false,
          downContent: '下拉刷新',
          upContent: '放开刷新',
          loadingContent: '刷新中...',
          clsPrefix: 'xs-plugin-pulldown-'
        },
        pullupConfig: {
          content: '上拉加载',
          pullUpHeight: 60,
          height: 40,
          autoRefresh: false,
          downContent: '放开加载',
          upContent: '上拉加载',
          loadingContent: '',
          clsPrefix: 'xs-plugin-pullup-'
        },
        loadMoreStatus: {
          tip: "正在加载",
          tipNoData: "没有更多数据了",
          tipLoading: "正在加载",
          showLoading: true,
          show: true,
        },
      }
    },
    watch: {
      pullUpDownStatus: {
        handler: function (val, oldval) {
          if (val.pullupStatus == "loading") {
            this.loadMoreStatus.show = true;
            this.loadMoreStatus.showLoading = false;
            this.loadMoreStatus.showLoading = true;

          }
        }
      }
    },
    methods: {
      goback() {
        this.$router.goBack()
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
      toDetails(id) {
        this.$router.push({name: 'emporder', query: {id: id}})
      },
      // 头像
      checkAvatar(path) {
        return common.getAvatar(path);
      },
      timeStamp2String(time){
        return common.timeStamp2String(time,'ymd');
      },
      getNameByTypeId: function (id) {
        var name = "";
        var types = common.getProjectTypes();
        var i = 0, len = types.length;
        for (; i < len; i++) {
          if (id == types[i]._id) {
            name = types[i].type_name;
          }
        }
        return name;
      },
      // 项目类型名称
      getNameById(id) {
        return common.getNameByTypeId(id);
      },
      loadData() {
        console.log('this is loadData');
        let _self = this;
        if (common.isNull(_self.user_id)) {
          throw new Error('请先登录');
          return;
        }
        _self.loadMoreStatus.tip = _self.loadMoreStatus.tipLoading;
        let params = {
          interfaceId: common.interfaceIds.getCollects,
          pageNo: _self.pagination.pageNo,
          pageSize: _self.pagination.pageSize,
          where: {
            user_id: _self.user_id,
            collect_type: 0
          }
        }
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          console.log(response);
          let data = response.data
          if (data) {
            _self.setData(data);
            console.log('数据设置完成');
          } else {
            console.log('noData');
          }
        });
      },
      setData(data) {
        let _self = this;
        _self.$refs.scroller.enablePullup();
        let collects = data.collects || [];
        console.log("赋值collects完成");
        //判断页码是否为0
        if (_self.pagination.pageNo == 0) {
          _self.collects = collects;
          console.log("setData页码为0，collects", collects);
        } else {
          console.log("setData页码为不为0，_self.collects", _self.collects);
          //返回数据可能为空
          if (!data.collects) {
            _self.loadMoreStatus.show = true;
            _self.loadMoreStatus.showLoading = false;
            _self.loadMoreStatus.tip = _self.loadMoreStatus.tipNoData;
            _self.$refs.scroller.disablePullup();
            return
          }
          _self.collects.push(...data.collects);
        }
        _self.loadMoreStatus.show = false;
        _self.loadMoreStatus.showLoading = false;
        _self.$refs.scroller.donePulldown();
        _self.$refs.scroller.donePullup();
        //判断数据是否有一页
        if (collects.length < _self.pagination.pageSize) {
          _self.loadMoreStatus.show = true;
          _self.loadMoreStatus.showLoading = false;
          _self.loadMoreStatus.tip = _self.loadMoreStatus.tipNoData;
          _self.$refs.scroller.disablePullup();
        } else {
          _self.pagination.pageNo++
        }
        // console.log(_self.collects);
      },
      //下拉刷新
      refreshPageDate() {
        let _self = this
        _self.pagination.pageNo = 0;
        _self.loadMoreStatus.show = false;
        _self.$refs.scroller.donePullup();
        setTimeout(() => {
          _self.loadData()
        }, 1000);

      },
      //上拉加载
      loadMore() {
        let _self = this;
        // _self.loadData();
        setTimeout(() => {
          _self.loadData()
        }, 1000);
      },
      scroll(position) {
        // console.log("on-scroll",position);
      },
      pullDownLoading() {
        console.log('on-pull-down-loading');
        this.refreshPageDate();
      },
      pullUpLoading() {
        console.log('on-pull-up-loading');
        this.loadMore();
      },
      onScrollBottom() {
        // console.log('on-scroll-bottom');
      }

    },
    created() {
      var _slef = this;
      var user = common.getObjStorage("userInfo") || {};
      if (!common.isNull(user._id)) {
        _slef.user_id = user._id;
      }
      this.loadData();
    },
    mounted() {
      console.log('mounted');
      this.$nextTick(
        () => {
          this.$refs.scroller.disablePullup();
          this.$refs.scroller.reset({top: 0});
        }
      );
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../../../static/css/employer/shoucangsjs.css";

  .gz-jiage {
    float: left;
    height: 0.75rem;
    line-height: 0.75rem;
    font-size: 0.36rem;
    color: #04c0ad;
    margin-left: 0rem;
  }

  .gz-leixin {
    float: left;
    margin-left: 0.1rem;
    font-size: 13px;
    color: #9e9e9e;
    line-height: 0.9rem;
    height: 0.8rem;
  }

  .gz-time {
    font-size: 14px;
    float: right;
    height: 0.8rem;
    line-height: 0.9rem;
    color: #9e9e9e;
    margin-right: 0.3rem;
  }
</style>
