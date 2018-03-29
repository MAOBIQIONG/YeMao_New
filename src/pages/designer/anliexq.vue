<template>
  <div class="templete-body my-body">
    <!--头部导航-->
    <div class="header-static"></div>
    <div class="header p-absolute">
      <div class="header-left" v-tap="{methods:goback}"><img src="../../../static/images/back.png"/></div>
      <span>案列详情</span>
      <div class="header-right" v-tap="{methods:delConfirm}" v-if="userInfo._id!=null&&userInfo._id!=undefined&&userInfo._id==chw.user_id">删除</div>
    </div>

    <!--详情内容-->
    <div class="content">
      <scroller
        v-model="pullUpDownStatus"
        :height="height"
        :lock-x="lockX"
        :lock-y="lockY"
        :use-pullup="true"
        :pullup-config="pullupConfig"
        @on-scroll="scroll"
        @on-scroll-bottom="onScrollBottom"
        @on-pullup-loading="pullUpLoading"
        ref="scroller"
      >
        <div>
          <div class="xc-top">
            <div class="touxiang">
              <img :src="checkAvatar(chw.user.img)"/>
            </div>
            <p>{{chw.user.user_name}}</p>
            <div class="shijian">{{timeStamp2String(chw.create_date)}}</div>
          </div>
          <div class="xc-banner">
            <!--轮播-->
            <swiper height="4.8rem" :list="imgs" @on-index-change="onIndexChange"></swiper>
          </div>
          <div class="gkrs" style="height: 0.9rem;">
            <div class="zhan dz" :class="chw.likeFlag==1?'hover':''" v-tap="{methods:dianzan}">{{chw.like}}</div>
            <div class="guankan comments">{{chw.comments}}</div>
          </div>
          <div class="xqjs" style="padding-bottom: .25rem">
            <div class="smjs">{{chw.description}}</div>
          </div>
          <!--评价内容-->
          <div class="pingjia-list">
            <div class="gzpj-list" v-for="(item,index) in comments" :key="index">
              <div class="pl-top">
                <div class="left">
                  <img v-if="item.anonymous==0" :src="checkAvatar(item.user.img)"/>
                  <img v-else :src="checkAvatar('')"/>
                </div>
                <div v-if="item.anonymous==0" class="center">
                  <span class="comment__username">{{item.user.user_name}}</span>
                  <div class="sb-qian" v-if="item.user.authenticating_state>5">签</div>
                  <div class="sb-ysm" v-if="item.user.authenticating_state>1">已实名</div>
                  <div class="sb-yrz" v-if="item.user.authenticating_state>3">已认证</div>
                </div>
                <div v-else class="center">匿名用户</div>
                <div class="right" v-if="item.type==0">{{getDateDiff(item.create_date)}}</div>
                <div class="right comment__employee" v-if="item.type==1">雇主评价</div>
              </div>
              <div class="pl-content">{{item.content}}</div>
              <div class="pl-bottom" v-if="item.type==1">
                <div class="shijian">{{getDateDiff(item.create_date)}}</div>
                <div class="pingfen">
                  <rater v-model="chw.score" star="<i class='icon iconfont icon-star-red'></i>" active-color="#FF9900" :disabled="true" :max="5" :margin="5" :font-size="14"></rater>
                </div>
              </div>
            </div>
          </div>
          <div style="height: 1.2rem;"></div>
        </div>
        <load-more v-show="loadMoreStatus.show" :show-loading="loadMoreStatus.showLoading" :tip="loadMoreStatus.tip"
                   class="loadMore"></load-more>
      </scroller>
    </div>
    <toast v-model="showMark" :time="1000" type="text" width="5rem">{{showMsg}}</toast>
    <div v-transfer-dom>
      <confirm v-model="confirmShow"
               @on-confirm = "compOnConfirm"
               @on-cancel="onCancel"
      >
        <p style="text-align:center;">{{confirmMsg}}</p>
      </confirm>
    </div>
    <div class="chat-box">
      <!-- 评论输入框 -->
      <div class="input-box">
        <div class="input">
          <input v-model="comment_text" type="text" :placeholder="comment_placeholder">
        </div>
        <!--<div class="anonymous-box" v-tap="{methods:anonymousFun}">-->
          <!--<div class="anonymous" :class="anonymous==1?'hover':''">匿</div>-->
        <!--</div>-->
        <div class="send-btn" :class="is_submit?'hover':''">
          <div class="btn" v-tap="{methods:commentchw}">发送</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Swiper, SwiperItem, Previewer, Scroller, LoadMore, Toast, Value2nameFilter as value2name, Confirm,TransferDomDirective as TransferDom,Rater} from 'vux'
  import store from '@/vuex/store'
  export default {
    directives: {
      TransferDom
    },
    components: {
      Swiper,
      SwiperItem,
      Previewer,
      Scroller,
      LoadMore,
      Toast,
      Confirm,
      Rater
    },
    store,
    data() {
      return {
        index: 0,
        userInfo: {},
        chw: {
          user: {}
        },
        imgs: [],
        comments: [],
        // 评论
        is_submit: false,
        comment_placeholder: '填写评论',
        comment_text: '',
        answer_id:'',
        anonymous:0, // 匿名:0、不匿名，1、匿名。
        // confirm
        confirmShow:false,
        confirmMsg:'确认删除？',

        // 上拉加载
        lockX: true,
        lockY: false,
        height: "-60",
        pagination: {
          pageNo: 0,
          pageSize: 10
        },
        pullUpDownStatus: {
          pullupStatus: 'default'
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
        hasMore: true,
        showMark: false,
        showMsg: "",
      }
    },
    created() {
      var _self = this;
      _self.chw_id = _self.$route.query.id;
      _self.userInfo = common.getObjStorage("userInfo") || {};
      _self.initData();
    },
    mounted() {
      this.$nextTick(
        () => {
          this.$refs.scroller.disablePullup();
          this.$refs.scroller.reset({top: 0});
        }
      );
    },
    watch: {
      pullUpDownStatus: {
        handler: function (val, oldval) {
          if (val.pullupStatus == "loading") {
            this.loadMoreStatus.show = true;
            if (this.hasMore == false) {
              this.loadMoreStatus.showLoading = false;
            } else {
              this.loadMoreStatus.showLoading = true;
            }
          }
        }
      },
      comment_text: {
        handler: function (val, oldval) {
          var _self = this;
          if (_self.is_submit == false && val.length > 0) {
            _self.is_submit = true;
          } else if (val.length == 0) {
            _self.is_submit = false;
          }
        }
      }
    },
    methods: {
      goback() {
        this.$router.goBack();
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
      onIndexChange(index) {
        this.index = index
      },
      showToast(msg) {
        this.showMark = true;
        this.showMsg = msg;
      },
      // 头像
      checkAvatar(path) {
        return common.getAvatar(path)
      },
      getDefultImg(path){
        return common.getDefultImg(path)
      },
      // 时间戳转日期
      timeStamp2String(time, id) {
        if (common.isNull(id)) {
          id = 'ymd';
        }
        return common.timeStamp2String(time, id);
      },
      // 时间戳转发布时长
      getDateDiff(time) {
        return common.getDateDiff(time);
      },
      show(index) {
        this.$refs.previewer.show(index)
      },
      //点赞
      dianzan() {
        var _self = this;
        if (common.isNull(_self.userInfo._id)) {
          _self.$router.push({name: 'login'});
        } else {
          _self.like();
        }
      },
      //点赞效果
      commentchw() {
        var _self = this;
        if (!_self.is_submit) {
        } else if (common.isNull(_self.userInfo._id)) {
          _self.$router.push({name: 'login'});
        } else {
          _self.addComment();
        }
      },
      // confirm
      compOnConfirm(){
        console.log("compOnConfirm:")
        this.deletePChw();
      },
      onCancel(){
        console.log("onCancel:")
      },

      /**匿名**/
      anonymousFun(){
        var _self = this;
        _self.anonymous = _self.anonymous==0 ? 1 : 0;
      },

      //下拉刷新
      refreshPageDate() {
        let _self = this
        _self.pagination.pageNo = 0;
        _self.hasMore = true;
        _self.loadMoreStatus.show = false;
        _self.$refs.scroller.donePullup();
        _self.loadData();
      },
      //上拉加载
      loadMore() {
        let _self = this;
        _self.loadData();
      },
      scroll(position) {
        // console.log("on-scroll",position);
      },
      pullUpLoading() {
        console.log('on-pull-up-loading');
        this.loadMore();
      },
      onScrollBottom() {
        // console.log('on-scroll-bottom');
      },
      //获取数据
      initData() {
        let _self = this;
        let params = {
          interfaceId: common.interfaceIds.getPChwDetails,
          where: {
            _id: _self.chw_id
          }
        };
        if (!common.isNull(_self.userInfo._id)) {
          params.user_id = _self.userInfo._id;
        }
        this.$axios.post('/mongoApi', {
          params
        }, (response) => {
          console.log(response)
          let data = response.data;
          _self.setInitData(data);
          _self.loadData();
        })
      },

      setInitData(data) {
        let _self = this;
        _self.$refs.scroller.enablePullup();
        _self.loadMoreStatus.show = false;
        _self.loadMoreStatus.showLoading = false;
        _self.$refs.scroller.donePullup();
        // 数据处理
        _self.chw = data.chw || {};
        _self.answer_id = _self.chw.user._id;
        var imgs = _self.chw.imgs || [];// 图片
        imgs.forEach(function (item, index) {
          _self.imgs.push({img: _self.getDefultImg(item)});
        })
        // 评论
        _self.comments = data.comments || [];
        if (_self.comments.length < _self.pagination.pageSize) {
          _self.hasMore = false;
          _self.loadMoreStatus.show = true;
          _self.loadMoreStatus.showLoading = false;
          _self.loadMoreStatus.tip = _self.loadMoreStatus.tipNoData;
          _self.$refs.scroller.disablePullup();
        } else {
          _self.pagination.pageNo++
        }
      },

      //获取数据
      loadData() {
        let _self = this;
        _self.loadMoreStatus.tip = _self.loadMoreStatus.tipLoading;
        let params = {
          interfaceId: common.interfaceIds.getComments,
          pageNo: _self.pagination.pageNo,
          pageSize: _self.pagination.pageSize,
          where: {
            comment_id: _self.chw_id
          }
        };
        this.$axios.post('/mongoApi', {
          params
        }, (response) => {
          // console.log(response);
          let data = response.data;
          _self.setData(data);
        })
      },

      setData(data) {
        let _self = this;
        _self.$refs.scroller.enablePullup();
        // 订单
        let comments = data.comments || [];
        //判断页码是否为0
        if (_self.pagination.pageNo == 0) {
          _self.comments = comments;
        } else {
          _self.comments.push(...data.comments);
        }
        _self.loadMoreStatus.show = false;
        _self.loadMoreStatus.showLoading = false;
        _self.$refs.scroller.donePullup();
        //判断数据是否有一页
        if (comments.length < _self.pagination.pageSize) {
          _self.hasMore = false;
          _self.loadMoreStatus.show = true;
          _self.loadMoreStatus.showLoading = false;
          _self.loadMoreStatus.tip = _self.loadMoreStatus.tipNoData;
          _self.$refs.scroller.disablePullup();
        } else {
          _self.pagination.pageNo++
        }
      },

      //点赞
      like() {
        let _self = this;
        let params = {
          interfaceId: common.interfaceIds.like,
          data: {
            like_id: _self.chw_id,
            user_id: _self.userInfo._id,
            like_type: 1
          }
        };
        this.$axios.post('/mongoApi', {
          params
        }, (response) => {
          // console.log(response)
          let data = response.data;
          if (data.code == 200) {
            _self.$store.state.caseRefreshMark = 1;
            _self.chw.likeFlag = _self.chw.likeFlag == 1 ? 0 : 1;
            _self.chw.like += _self.chw.likeFlag == 1 ? 1 : -1;
          } else {
            _self.showToast("点赞失败!")
          }
        })
      },

      //评论
      addComment() {
        let _self = this;
        let params = {
          interfaceId: common.interfaceIds.addComments,
          data: {
            user_id: _self.userInfo._id,          // 评论人
            comment_id: _self.chw_id,             // 评论对象ID
            content: _self.comment_text,          // 评论内容
            comment_type: 1,                      // 评论类型：0、喵喵圈，1、案例展示，2、个人荣誉，3、我的作品，4、喵学堂，5、问答。
            answer_id: _self.answer_id,           // 回复ID：一级评论、喵喵圈动态发布人ID，二级评论、一级评论发布人ID，回复、回复发布人
            anonymous: _self.anonymous,           // 匿名:0、不匿名，1、匿名。
          }
        };
        this.$axios.post('/mongoApi', {
          params
        }, (response) => {
          console.log(response)
          let data = response.data;
          if (data.code == 200) {
            _self.$store.state.caseRefreshMark = 1;
            _self.showToast("评论成功!")
            _self.addCommentHmtl(params.data);
          } else {
            _self.showToast("评论失败!")
          }
        })
      },
      // 添加评论html
      addCommentHmtl(data) {
        var _self = this;
        // 修改评论数量
        _self.chw.comments += 1;
        // 添加评论记录
        data.user = {
          authenticating_state: _self.userInfo.authenticating_state,
          img: _self.userInfo.img,
          user_name: _self.userInfo.user_name,
          _id: _self.userInfo._id
        };
        data.create_date = new Date().getTime();
        if( _self.comments.length>0 && _self.comments[0].type==1 ){
          _self.comments.splice(1, 0, data);
        }else{
          _self.comments.unshift(data);
        }
        // 重置评论框内容
        _self.comment_text = '';
      },

      // 确认删除
      delConfirm(){
        this.confirmShow = true;
      },
      // 删除
      deletePChw() {
        let _self = this;
        let params = {
          interfaceId: common.interfaceIds.removePChw,
          _id: _self.chw_id
        };
        _self.$axios.post('/mongoApi', {
          params
        }, (response) => {
          let data = response.data;
          if (data.code == 200) {
            _self.$store.state.caseRefreshMark = 1;
            _self.goback();
          } else {
            _self.showToast("删除失败!")
          }
        })
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../static/css/designer/anliexq.css';
  .dz {
    height: 0.9rem;
    line-height: 0.9rem;
    display: inline-block;
    background-image: url("../../../static/images/collect.png");
    background-size: 0.4rem 0.4rem;
    background-position-y: 0.25rem;
    background-repeat: no-repeat;
    padding-left: 0.5rem;
    padding-right: 0.25rem;
  }

  .dz.hover {
    background-image: url("../../../static/images/collect-hover.png");
  }

  .comments {
    height: 0.9rem;
    line-height: 0.9rem;
    display: inline-block;
    background: url("../../../static/images/liulan.png") no-repeat;
    background-size: 0.4rem 0.4rem;
    background-position-y: 0.25rem;
    padding-left: 0.5rem;
    padding-right: 0.25rem;
  }
  .pl-top,.pl-top .center{
    align-items:center;
    display:-webkit-flex;
  }
  .comment__username{
    display:inline-block;
      max-width:3rem;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap
  }
  .sb-qian,.sb-ysm,.sb-yrz{
      font-size:0.24rem;
      height:0.4rem;
      width:1rem;
      line-height:0.4rem;
      display:inline-block;
      margin-left:0.1rem;
  }
  .sb-qian{
    width:0.6rem;
    border: 1px solid #ffe354;
    background-color: #fff9d9;
    border-radius: 0.08rem;

    text-align: center;
    color: #cda566;
  }
  .sb-ysm {
    border: 1px solid #6ddacf;
    color: #6ddacf;
    text-align: center;
    border-radius: 0.08rem;
  }
  .sb-yrz {
    border: 1px solid #142aa4;
    color: #142aa4;
    text-align: center;
    border-radius: 0.08rem;
  }
  .comment__employee{
    color: #f661a9!important;
    font-size: 0.3rem!important;
  }
</style>
