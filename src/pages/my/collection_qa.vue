<template>
  <div>
    <!--头部导航-->
    <div class="header">
      <div class="header-left" @click="goback"><img src="../../../static/images/back.png"/></div>
      <span>收藏问答</span>
      <div class="header-right" @click="toUrl('fbwd')">提问</div>
    </div>
    <!--问答专辑-->
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
        <div class="weida-list" v-for="(item,index) in QAList" :key="index">
          <div class="weida" @click="toDetails(item._id)">
            <div class="piapti">
              {{item.title}}
            </div>

            <div class="neirong">
              <div class="tupian" v-if="item.imgs" :style="{backgroundImage:`url(${checkImg(item.imgs[0])})`}">
                <!-- <img :src="checkImg(item.imgs[0])"/> -->
              </div>
              <div class="jieshao">
                {{item.description}}
              </div>
            </div>
            <div class="pingjia">
              <div class="wd-top">
                <div class="touxiang">
                  <img v-if="item.user.img" :src="checkAvatar(item.user.img)"/>
                </div>
                <p class="nicheng">{{item.user.user_name}}</p>
              </div>
              <div class="pingjia-right">
                <span v-if="item.like">{{item.like}}</span><span v-else>0</span> 赞同 <span v-if="item.comments">{{item.comments}}</span><span
                v-else>0</span> 回复
              </div>
            </div>
          </div>
        </div>
        <load-more v-show="loadMoreStatus.show" :show-loading="loadMoreStatus.showLoading" :tip="loadMoreStatus.tip"
                   class="loadMore"></load-more>
      </div>
    </scroller>
    </div>
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
        default: "-44"
      }
    },
    data: function () {
      return {
        user_id: null,
        QAList: [],
        user: null,
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
      // 头像
      checkAvatar(path) {
        return common.getAvatar(path)
      },
      checkImg(path) {
        return common.getDefultImg(path);
      },
      toDetails(id) {
        this.$router.push({name: 'wdxq', query: {id: id}})
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
          interfaceId: 'getCollects',
          pageNo: _self.pagination.pageNo,
          pageSize: _self.pagination.pageSize,
          where: {
            user_id: _self.user_id,
            collect_type: 3// 收藏类型3问答
          }
        }
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          console.log(response);
          let data = response.data
          if (data) {
            _self.setData(data);
            console.log(data);
            console.log('数据设置完成');
          } else {
            console.log('noData');
          }
        });
      },
      setData(data) {
        let _self = this;
        _self.$refs.scroller.enablePullup();
        let QAList = data.collects || [];
        //判断页码是否为0
        if (_self.pagination.pageNo == 0) {
          _self.QAList = QAList;
          console.log("setData页码为0，QAList", QAList);
        } else {
          console.log("setData页码为不为0，_self.QAList", _self.QAList);
          //返回数据可能为空
          if (!data.chws) {
            _self.loadMoreStatus.show = true;
            _self.loadMoreStatus.showLoading = false;
            _self.loadMoreStatus.tip = _self.loadMoreStatus.tipNoData;
            _self.$refs.scroller.disablePullup();
            return
          }
          _self.QAList.push(...data.collects);
        }
        _self.loadMoreStatus.show = false;
        _self.loadMoreStatus.showLoading = false;
        _self.$refs.scroller.donePulldown();
        _self.$refs.scroller.donePullup();
        //判断数据是否有一页
        if (QAList.length < _self.pagination.pageSize) {
          _self.loadMoreStatus.show = true;
          _self.loadMoreStatus.showLoading = false;
          _self.loadMoreStatus.tip = _self.loadMoreStatus.tipNoData;
          _self.$refs.scroller.disablePullup();
        } else {
          _self.pagination.pageNo++
        }
        // console.log(_self.QAList);
      },
      //下拉刷新
      refreshPageDate() {
        let _self = this
        _self.pagination.pageNo = 0;
        _self.loadMoreStatus.show = false;
        _self.$refs.scroller.donePullup();
        _self.loadData()

      },
      //上拉加载
      loadMore() {
        let _self = this;
        _self.loadData();
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
      // console.log('mounted');
      this.$nextTick(
        () => {
          this.$refs.scroller.disablePullup();
          this.$refs.scroller.reset({top: 0});
        }
      );
    },
  }
</script>
<style scoped>
  @import '../../../static/css/meow/shouchang-wenda.css';
</style>
<style>
  .xs-plugin-pullup-container {
    line-height: 60px !important;
    font-size: 14px;
  }

  .xs-plugin-pulldown-container {
    font-size: 14px;
    margin-top: -0.21rem;
  }

  .tupian {
    background-size: cover !important;
    background-position: center center !important;
  }
</style>
