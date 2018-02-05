<template>
  <div class="miaomiao">
    <!--  喵喵列表  -->
    <div class="mm-list miao">
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
          <!--评论列表-->
          <div class="content">
            <swipeout class="vux-1px-tb">
              <swipeout-item transition-mode="follow" v-for="(item,index) in comments" :key="index">
                <div slot="right-menu">
                  <swipeout-button type="warn" v-tap="{methods:deleteSth,id:item._id,type:item.comment_type,floor:item.floor,did:item.comment_id}">删除</swipeout-button>
                </div>
                <div slot="content" :class="{'vux-1px-b': index !== comments.length, 'vux-1px-t': index === 1}">
                  <div class="pinglun-list">
                    <div class="pl-left">
                      <img :src="checkAvatar(item.user.img)" />
                    </div>
                    <div class="pl-content">
                      <p class="sezhi">{{item.user.user_name}}</p>
                      <p>{{item.content}}</p>
                      <p class="time">{{timeStamp2String(item.create_date)}}</p>
                    </div>
                    <div class="pl-right"
                         v-tap="{methods:toDetails,type:item.comment_type,id:item.data._id}"
                         v-if="item.data.imgs.length>0"
                         :style="'background-image:url('+checkImg(item.data.imgs[0])+')'"></div>
                    <div class="pl-right"
                         v-tap="{methods:toDetails,type:item.comment_type,id:item.data._id}"
                         v-else>{{item.data.title}}</div>
                  </div>
                </div>
              </swipeout-item>
            </swipeout>
          </div>
          <load-more v-show="loadMoreStatus.show" :show-loading="loadMoreStatus.showLoading" :tip="loadMoreStatus.tip" class="loadMore"></load-more>
        </div>
      </scroller>
    </div>
    <!--弹窗-->
    <toast v-model="showMark" :time="1000" type="text" width="5rem">{{showMsg}}</toast>
    <actionsheet v-model="showSheet" :menus="menus" show-cancel @on-click-menu-delete="onDelete"></actionsheet>
  </div>
</template>

<script>
  import { Swipeout, SwipeoutItem, SwipeoutButton, Actionsheet, Scroller, LoadMore, Toast } from 'vux'
  export default {
    components: {
      Swipeout,
      SwipeoutItem,
      SwipeoutButton,
      Actionsheet,
      Scroller,
      LoadMore,
      Toast
    },
    data() {
      return {
        userInfo:{},
        comments:[],
        // 删除遮罩层
        showSheet: false,
        menus: {
          delete: '<span style="color:red">删除</span>',
        },
        data_id: '', // 修改数据评论数
        deleteId: '',
        deleteFloor: 0,
        deleteType: 0,
        // 下拉更新，上拉加载参数
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
          content: '下拉刷新',
          height: 60,
          autoRefresh: false,
          downContent: '下拉刷新',
          upContent: '放开刷新',
          loadingContent: '刷新中...',
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
        showMark:false,
        showMsg:"",
      }
    },
    created(){
      var _self = this;
      _self.userInfo = common.getObjStorage("userInfo") || {};
      _self.loadData();
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
      goback () {
        this.$router.goBack()
      },
      toUrl: function (param) {
        this.$router.push({name: param.pagename,query:{id:param.id}})
        param.event.cancelBubble = true;
        param.event.stop;//阻止冒泡（原声方法）
        return false
      },
      toDetails: function (params) {
        if( params.type == 0 ){
          params.pagename = 'pengyouquanxq';
        }else if( params.type==1 || params.type==2 || params.type==3 ){
          params.pagename = 'anliexq';
        }else if( params.type == 4 ){
          params.pagename = 'wzxq';
        }else if( params.type == 5 ){
          params.pagename = 'wdxq';
        }
        this.$router.push({name: params.pagename,query:{id:params.id}})
      },
      showToast(msg){
        this.showMark = true;
        this.showMsg = msg;
      },
      // 头像
      checkAvatar (path) {
        return common.getAvatar(path)
      },
      // 默认图片
      checkImg(path){
        return common.getDefultImg(path);
      },
      // 时间戳转日期格式
      timeStamp2String(time){
        return common.timeStamp2String(time,'ymd');
      },
      // 滑动删除
      onButtonClick (type) {
        alert('on button click ' + type)
      },
      handleEvents (type) {
        console.log('event: ', type)
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
      },
      //获取数据
      loadData(){
        let _self = this;
        if( common.isNull(_self.userInfo._id) ){
          _self.hasMore = false;
          _self.loadMoreStatus.show=true;
          _self.loadMoreStatus.showLoading=false;
          _self.loadMoreStatus.tip=_self.loadMoreStatus.tipNoData;
          return;
        }
        _self.loadMoreStatus.tip= _self.loadMoreStatus.tipLoading;
        let params = {
          interfaceId:common.interfaceIds.getMyComments,
          pageNo: _self.pagination.pageNo,
          pageSize: _self.pagination.pageSize,
          where:{
            answer_id: _self.userInfo._id
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
        _self.$refs.scroller.donePulldown();
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

      // 删除
      deleteSth(params){
        var _self = this;
        _self.showSheet = true;
        _self.deleteId = params.id;
        _self.deleteFloor = params.floor;
        _self.deleteType = params.type;
        _self.data_id = params.did;
      },
      onDelete(){
        var _self = this;
        _self.removeComment();
      },
      //删除评论
      removeComment(){
        let _self = this;
        let params = {
          interfaceId:common.interfaceIds.removeComments,
          _id: _self.deleteId,                 // 评论对象ID
          floor: _self.deleteFloor,            // 评论层级
          comment_type: _self.deleteType       // 评论类型
        };
        // 一级评论修改评论数量
        if( params.floor == 0 ){
          params.meow_id = _self.data_id;
        }
        this.$axios.post('/mongoApi',{
          params
        },(response)=>{
          let data = response.data;
          if( data.code == 200 ){
            // 刷新喵喵圈首页
            _self.$store.state.meowRefreshMark = 1;
            _self.showToast("删除成功!")
            _self.removeCommentHmtl(params);
          }else if( data.code == 400 && data.result.ok == 1 ){
            // 刷新喵喵圈首页
            _self.$store.state.meowRefreshMark = 1;
            _self.showToast("删除成功!")
            self.removeCommentHmtl(params);
          }else{
            _self.showToast("删除失败!")
          }
        })
      },
      // 清除页面html
      removeCommentHmtl(params){
        let _self = this;
        // 一级评论删除
        if( params.floor == 0 ){
          _self.comments.forEach(function (item,index) {
            if( params._id == item._id.toString() ){
              _self.comments.splice(index,1);
            }
          })
        }else{
        }
      },

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../static/css/my/mine-pinlun.css';
  .pinglun-list .pl-right{
    /*background: url("/static/images/bj.jpg");*/
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    /*padding: 0.05rem;;*/
    color: #999;
    line-height: 0.38rem;
  }
</style>
