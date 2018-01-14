<template>
  <div>
    <!--导航栏-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
    </div>
    <!--  喵喵列表-->
    <scroller
      v-model="pullUpDownStatus"
      :height="height"
      :lock-x="lockX"
      :lock-y="lockY"
      :use-pullup="true"
      :pullup-config = "pullupConfig"
      @on-scroll="scroll"
      @on-scroll-bottom="onScrollBottom"
      @on-pullup-loading="pullUpLoading"
      ref="scroller"
    >
      <div>
        <div class="blank"></div>
        <div class="mm-list content">
          <div class="sjse-list">
            <div class="sjs-top">
              <div class="st-touxiang">
                <!-- checkAvatar(item.user.img) -->
                <img :src="meow.user.img"/>
              </div>
              <div class="st-neirong">
                <div class="sn-top">
                  <div class="st-nicheng">{{meow.user.user_name}}</div>
                  <div class="st-pingxin"></div>
                </div>
                <div class="sn-bottom">
                  <div class="sb-qian" v-if="meow.user.authenticating_state>5">签</div>
                  <div class="sb-ysm" v-if="meow.user.authenticating_state>1">已实名</div>
                  <div class="sb-yrz" v-if="meow.user.authenticating_state>3">已认证</div>
                </div>
              </div>
              <div class="st-jiageleixin">
                <div class="st-jiage">{{timeStamp2String(meow.create_date)}}</div>
              </div>
            </div>
            <div class="sjs-content">
              <div class="sc-jiesao sc-jieshao1">{{meow.title}}</div>
            </div>
            <div class="sjs-bottom sjs-bottom1">
              <ul>
                <li v-for="(item, index) in list"@click.stop="show(index)">
                  <!-- <img class="previewer-demo-img":src="item.src"width="100%"> -->
                  <div class="previewer-img" :style="`background-image:url(${item.src}`"></div>
                </li>
                <div v-transfer-dom>
                  <previewer :list="list" ref="previewer" :options="options"></previewer>
                </div>
              </ul>
            </div>
            <div class="pinjia">
              <p class="dz" :class="meow.likeFlag==1?'hover':''" v-tap="{methods:dianzan}"><span>{{meow.like}}</span></p>
              <p class="comments"><span></span><span>{{meow.comments}}</span></p>
            </div>
          </div>
        </div>
        <!--评价列表-->
        <div class="liuyan">
          <div class="lylist" v-for="com in comments">
            <div class="lit-top">
              <div class="left-tou">
                <span><img :src="com.user.img"/></span><span class="nicheng">{{com.user.user_name}}</span>
              </div>
              <div class="right-time">{{getDateDiff(com.create_date)}}</div>
            </div>
            <div class="list-bottom">
              <div class="pj-neirong">{{com.content}}</div>
            </div>
          </div>
        </div>
        <load-more v-show="loadMoreStatus.show" :show-loading="loadMoreStatus.showLoading" :tip="loadMoreStatus.tip" class="loadMore"></load-more>
        <div class="blank_bottom"></div>
      </div>
    </scroller>
    <toast v-model="showMark" :time="1000" type="text" width="5rem">{{showMsg}}</toast>
    <div v-transfer-dom>
      <previewer :list="list" ref="previewer" :options="options"></previewer>
    </div>
    <!-- 评论输入框 -->
    <div class="input-box">
      <div class="input">
        <input v-model="comment_text" type="text" :placeholder="comment_placeholder">
      </div>
      <div class="send-btn" :class="is_submit?'hover':''">
        <div class="btn" v-tap="{methods:commentMeow}">发送</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Previewer, TransferDom, Scroller, LoadMore, Toast } from 'vux'
  import store from '@/vuex/store'
  export default {
    directives: {
      TransferDom
    },
    components: {
      Previewer,
      Scroller,
      LoadMore,
      Toast
    },
    store,
    data: function () {
      return {
        userInfo:{},
        meow:{
          user:{}
        },
        comments:[],
        // 评论
        is_submit:false,
        comment_placeholder:'填写评论',
        comment_text:'',
        // 图片预览
        list:[],
        options: {
          getThumbBoundsFn(index) {
            console.log("getThumbBoundsFn:"+index)
            // find thumbnail element
            let thumbnail = document.querySelectorAll('.previewer-img')[index]
            // get window scroll Y
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            // optionally get horizontal scroll
            // get position of element relative to viewport
            let rect = thumbnail.getBoundingClientRect()
            // w = width
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
            // Good guide on how to get element coordinates:
            // http://javascript.info/tutorial/coordinates
          }
        },
        // 上拉加载
        lockX:true,
        lockY:false,
        height:"",
        pagination: {
          pageNo: 0,
          pageSize: 10
        },
        pullUpDownStatus: {
          pullupStatus: 'default'
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
        showMark:false,
        showMsg:"",
      }
    },
    created(){
      var _self = this;
      _self.miao_id = _self.$route.query.id;
      _self.userInfo = common.getObjStorage("userInfo") || {};
      _self.initData();
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
      },
      comment_text:{
        handler:function(val,oldval){
          var _self = this;
          if( _self.is_submit==false && val.length > 0 ){
            _self.is_submit = true;
          }else if( val.length == 0 ){
            _self.is_submit = false;
          }
        }
      }
    },
    methods: {
      goback () {
        this.$router.goBack()
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
      showToast(msg){
        this.showMark = true;
        this.showMsg = msg;
      },
      // 头像
      checkAvatar (path) {
        return common.getAvatar(path)
      },
      // 时间戳转日期
      timeStamp2String(time,id){
        return common.timeStamp2String(time,'ymd');
      },
      // 时间戳转发布时长
      getDateDiff(time){
        return common.getDateDiff(time);
      },
      show (index) {
        this.$refs.previewer.show(index)
      },
　　　 //点赞
      dianzan(){
        var _self = this;
        if( common.isNull(_self.userInfo._id) ){
          _self.$router.push({name: 'login'});
        }else{
          _self.like();
        }
      },

      //点赞效果
      commentMeow(){
        var _self = this;
        if( !_self.is_submit ){
        }else if( common.isNull(_self.userInfo._id) ){
          _self.$router.push({name: 'login'});
        }else {
          _self.addComment();
        }
      },

      //下拉刷新
      refreshPageDate(){
        let _self = this
        _self.pagination.pageNo = 0;
        _self.hasMore = true;
        _self.loadMoreStatus.show=false;
        _self.$refs.scroller.donePullup();
        _self.loadData();
      },
      //上拉加载
      loadMore(){
        let _self = this;
        _self.loadData();
      },
      scroll(position){
        // console.log("on-scroll",position);
      },
      pullUpLoading(){
        console.log('on-pull-up-loading');
        this.loadMore();
      },
      onScrollBottom(){
        // console.log('on-scroll-bottom');
      },
      //获取数据
      initData(){
        let _self = this;
        let params = {
          interfaceId:common.interfaceIds.getMeowDetails,
          where:{
            _id: _self.miao_id
          }
        };
        if( !common.isNull(_self.userInfo._id) ){
          params.user_id = _self.userInfo._id;
        }
        this.$axios.post('/mongoApi',{
          params
        },(response)=>{
          // console.log(response)
          let data = response.data;
          _self.setInitData(data);
        })
      },

      setInitData(data){
        let _self = this;
        _self.$refs.scroller.enablePullup();
        _self.loadMoreStatus.show=false;
        _self.loadMoreStatus.showLoading=false;
        _self.$refs.scroller.donePullup();
        // 喵喵圈动态
        _self.meow = data.meow || {};
        // 图片
        var imgs = _self.meow.imgs || [];
        imgs.forEach(function (item,index) {
          _self.list.push({src:item,w:1200,h:700})
        })
        // 评论
        _self.comments = data.comments || [];
        if(_self.comments.length < _self.pagination.pageSize){
          _self.hasMore = false;
          _self.loadMoreStatus.show=true;
          _self.loadMoreStatus.showLoading=false;
          _self.loadMoreStatus.tip=_self.loadMoreStatus.tipNoData;
          _self.$refs.scroller.disablePullup();
        } else {
          _self.pagination.pageNo++
        }
      },

      //获取数据
      loadData(){
        let _self = this;
        _self.loadMoreStatus.tip= _self.loadMoreStatus.tipLoading;
        let params = {
          interfaceId:common.interfaceIds.getComments,
          pageNo: _self.pagination.pageNo,
          pageSize: _self.pagination.pageSize,
          where:{
            comment_id: _self.miao_id
          }
        };
        this.$axios.post('/mongoApi',{
          params
        },(response)=>{
          // console.log(response);
          let data = response.data;
          _self.setData(data);
        })
      },

      setData(data){
        let _self = this;
        _self.$refs.scroller.enablePullup();
        // 订单
        let comments = data.comments || [];
        //判断页码是否为0
        if(_self.pagination.pageNo == 0) {
          _self.comments = comments;
        } else {
          _self.comments.push(...data.comments);
        }
        _self.loadMoreStatus.show=false;
        _self.loadMoreStatus.showLoading=false;
        _self.$refs.scroller.donePullup();
        //判断数据是否有一页
        if(comments.length < _self.pagination.pageSize){
          _self.hasMore = false;
          _self.loadMoreStatus.show=true;
          _self.loadMoreStatus.showLoading=false;
          _self.loadMoreStatus.tip=_self.loadMoreStatus.tipNoData;
          _self.$refs.scroller.disablePullup();
        } else {
          _self.pagination.pageNo++
        }
      },

      //点赞
      like(){
        let _self = this;
        let params = {
          interfaceId:common.interfaceIds.like,
          data: {
            like_id: _self.miao_id,
            user_id: _self.userInfo._id,
            like_type: 0
          }
        };
        this.$axios.post('/mongoApi',{
          params
        },(response)=>{
          // console.log(response)
          let data = response.data;
          if( data.code == 200 ){
            // 刷新喵喵圈首页
            _self.$store.state.meowRefreshMark = 1;
            _self.meow.likeFlag = _self.meow.likeFlag==1? 0 : 1;
            _self.meow.like += _self.meow.likeFlag==1? 1 : -1;
          }else{
            _self.showToast("点赞失败!")
          }
        })
      },

      //评论
      addComment(){
        let _self = this;
        let params = {
          interfaceId:common.interfaceIds.addComments,
          data: {
            user_id: _self.userInfo._id,          // 评论人
            comment_id: _self.miao_id,           // 评论对象ID
            content: _self.comment_text,         // 评论内容
            comment_type: 0,                     // 评论类型：0、喵喵圈，1、案例展示、个人荣誉、我的作品、喵学堂、问答。
          }
        };
        this.$axios.post('/mongoApi',{
          params
        },(response)=>{
          // console.log(response)
          let data = response.data;
          if( data.code == 200 ){
            _self.showToast("评论成功!")
            _self.addCommentHmtl(params.data);
          }else{
            _self.showToast("评论失败!")
          }
        })
      },

      // 添加评论html
      addCommentHmtl(data){
        var _self = this;
        // 刷新喵喵圈首页
        _self.$store.state.meowRefreshMark = 1;
        // 修改评论数量
        _self.meow.comments += 1;
        // 添加评论记录
        data.user = {
          authenticating_state: _self.userInfo.authenticating_state,
          img: _self.userInfo.img,
          user_name: _self.userInfo.user_name,
          _id: _self.userInfo._id
        };
        data.create_date = new Date().getTime();
        _self.comments.unshift(data);
        // 重置评论框内容
        _self.comment_text = '';
      }
    }
  }
</script>
<style scoped>
  @import '../../../static/css/meow/miaomiao.css';
  .sjs-bottom ul li {
    float: left;
    width: 2.4rem;
    height: 2.4rem;
    background: #CCCCCC;
    margin: 0.05rem;
    overflow: hidden;
    /*background: url("../../../static/images/bj.jpg");*/
    /*background-position: center center;*/
    /*background-repeat: no-repeat;*/
  }
  .sjs-bottom ul li img{
    height: 100%;
  }
  .sc-jieshao1{
    width: 7rem;
    display: inline-block !important;
    -webkit-box-orient: vertical;
    color: rgb(102, 102, 102);
    overflow:auto!important;
  }
  .sjs-bottom1{
    display: inline-block;
  }
  .dz{
    height: 0.9rem;
    line-height: 0.9rem;
    display: inline-block;
    background-image: url("../../../static/images/collect.png");
    background-size: 0.4rem 0.4rem;
    background-position-y:0.25rem;
    background-repeat: no-repeat;
    padding-left: 0.5rem;
  }
  .dz.hover{
    background-image: url("../../../static/images/collect-hover.png");
  }
  .comments{
    height: 0.9rem;
    line-height: 0.9rem;
    display: inline-block;
    background: url("../../../static/images/liulan.png") no-repeat;
    background-size: 0.4rem 0.4rem;
    background-position-y:0.25rem;
    padding-left: 0.5rem;
  }

  .previewer-img{
      width:100%;
      height:100%;
      background-repeat: no-repeat;
      background-position:center center;
      background-size: cover
  }
</style>
