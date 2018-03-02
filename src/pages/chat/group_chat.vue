<template>
  <div class="liaotian">
    <div class="header-static"></div>
    <div class="header p-absolute">
      <div class="header-left" v-tap="{methods:goback}"><img src="../../../static/images/back.png"/></div>
      <span v-text="target_name"></span>
    </div>
    <!--  信息表-->
    <div id="content" class="content">
      <scroller
        id="scroller"
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
          <div class="message" ref="message">
            <ul>
              <li v-for="(message, index) in dataArray" :key="index" :class="message.from==user._id?'an-move-right':'an-move-left'">
                <p class="time"> <span v-text="getDataStr(message.create_date)"></span></p>
                <div class="main" :class="message.sender==user._id?'self':''">
                  <img class="avatar" :src="message.sender==user._id?ownerAvatarUrl:checkAvatar(message.user.img)">
                  <div class="text" v-tap="{methods:show,text:message.content}" v-html="filterImgs(message.content)"></div>
                </div>
              </li>
              <li class="bot-li"></li>
            </ul>
          </div>
        </div>
      </scroller>
    </div>
    <chat :to="target_id" :scene="scene" @upup="sended"></chat>
    <div v-transfer-dom>
      <previewer :list="list" ref="previewer" :options="options"></previewer>
    </div>
  </div>
</template>

<script>
  import {LoadMore, Scroller, Previewer, TransferDom,} from 'vux'
  import chat from '../../components/chat/chat.vue'
  export default {
    directives: {
      TransferDom
    },
    components: {
      Previewer,
      Scroller,
      LoadMore,
      chat
    },
    data () {
      return {
        scene: 'team',
        target_id:'',
        target_name: '',
        ownerAvatarUrl: '',
        contactAvatarUrl: '',
        dataArray: [],
        userArray: [],
        isReset:false,
        // 预览图片
        list:[],
        imgList:[],
        options: {
          getThumbBoundsFn (index) {
            // find thumbnail element
            let thumbnail = document.querySelectorAll('.emoji-thumbnail')[index]
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
        // 加载
        lockX:true,
        lockY:false,
        height: '-90',
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
      }
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
    activated: function () {
      console.log("group_chat activated:")
    },
    created(){

      var _self = this;
      _self.target_id = _self.$route.query.id;
      _self.target_name = _self.$route.query.name;
      _self.contactAvatarUrl = _self.checkAvatar(_self.$route.query.img);
      _self.user = common.getObjStorage("userInfo") || {};
      _self.ownerAvatarUrl = _self.checkAvatar(_self.user.img);
      _self.loadData();
      // 重置监听接收消息回调
      wyim.callback = _self.receiveMsg;
    },
    methods: {
      goback(){
        this.$router.goBack();
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
      getDataStr(date){
        return common.timeStamp2String(date,'ymdhm');
      },
      // 头像
      checkAvatar (path) {
        return common.getAvatar(path)
      },
      checkImg(path){
        return common.getDefultImg(path);
      },
      filterImgs(text){
        return wyim.filterEmoji(text);
      },
      filterPaths (text){
        return wyim.filterImgPath(text);
      },
      show (param) {
        var _self = this;
        var arr = _self.filterPaths(param.text);
        if( arr.length > 0 ){
          var i = _self.imgList.indexOf(arr[0]);
          _self.list = [];//清除缓存
          _self.imgList.forEach(function (img, j) {
            _self.list.push({src: _self.checkImg(img)});
          })
          _self.$refs.previewer.show(i)
        }
        param.event.cancelBubble = true;
        param.event.stop;//阻止冒泡（原声方法）
        return false
      },
      // 重新计算滚动高度
      resetHeight(num){
        var _self = this;
        var sh = _self.$refs.message.scrollHeight;
        var ch = document.documentElement.clientHeight;
        var bh = document.getElementById("inputBox").offsetHeight;
        var height = sh-ch+bh*2.5; // div高度-屏幕高度+头部+底部高度
        var h = height > 0 ? height : 0;
        _self.$nextTick(
          ()=>{
            _self.$refs.scroller.reset({top: h});
          }
        );
      },
      // 成功发送消息后，保存消息
      sended(msg){
        var _self = this;
        var record = {
          sender: msg.from,            // 发送者ID
          recipient: msg.to,           // 接收者ID
          content: msg.text,           // 最新聊天内容
          create_date: msg.time,       // 会话创建时间
          user: msg.user || {}
        }
        _self.dataArray.push(record);
        setTimeout(function () {
          _self.resetHeight();
        },100)
      },
      // 接收消息后，保存消息
      receiveMsg(msg){
        if( msg.scene == 'p2p') return;
        var _self = this;
        _self.dataArray.forEach(function (item,index) {
          if( msg.from == item.user.id ){
            msg.user = item.user;
          }
        })
        if( msg.user ){
          _self.sended(msg);
        }else{
          _self.getUserById(msg);
        }
      },
      //下拉刷新
      refreshPageDate(){
        console.log()
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
        this.loadMore();
      },
      pullUpLoading(){
        console.log('on-pull-up-loading');
        // this.refreshPageDate();
      },
      onScrollBottom(){
        // console.log('on-scroll-bottom');
      },
      //获取数据
      loadData(){
        let _self = this;
        console.log("hasMore:"+_self.hasMore)
        console.log("pageNo:"+_self.pagination.pageNo)
        if( common.isNull(_self.user._id) || common.isNull(_self.target_id) ||
            _self.hasMore==false ){
          _self.hasMore = false;
          _self.loadMoreStatus.show=true;
          _self.loadMoreStatus.showLoading=false;
          _self.loadMoreStatus.tip=_self.loadMoreStatus.tipNoData;
          return;
        }
        _self.loadMoreStatus.tip= _self.loadMoreStatus.tipLoading;
        let params = {
          interfaceId: common.interfaceIds.getChatRecord,
          pageNo: _self.pagination.pageNo,
          pageSize: _self.pagination.pageSize,
          scene: 1,
          where: {
            sender: _self.user._id,
            recipient: _self.target_id,
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
        let records = data.records || [];
        //判断页码是否为0
        records.reverse();
        if(_self.pagination.pageNo == 0) {
          _self.dataArray = records;
        } else {
          _self.dataArray.unshift(...records);
        }
        _self.loadMoreStatus.show=false;
        _self.loadMoreStatus.showLoading=false;
        _self.$refs.scroller.donePulldown();
        _self.$refs.scroller.donePullup();
        //判断数据是否有一页
        if(records.length < _self.pagination.pageSize){
          _self.hasMore = false;
          _self.loadMoreStatus.show=true;
          _self.loadMoreStatus.showLoading=false;
          _self.loadMoreStatus.tip=_self.loadMoreStatus.tipNoData;
          _self.$refs.scroller.disablePullup();
        } else {
          _self.pagination.pageNo++
        }
        // 过滤预览图片地址
        records.forEach(function (item,index) {
          var arr = _self.filterPaths(item.content);
          if( arr.length > 0 ){
            arr.forEach(function (img,i) {
              if( _self.imgList.indexOf(img) < 0 ){
                _self.imgList.push(img);
              }
            })
          }
        })
        /**置底**/
        if( _self.isReset == false ){
          _self.isReset = true;
          setTimeout(function () {
            _self.resetHeight();
          },100)
        }
      },
      //获取用户信息
      getUserById(msg){
        let _self = this;
        let params = {
          interfaceId: common.interfaceIds.queryUserById,
          user_id: msg.from,
        };
        _self.$axios.post('/mongoApi',{
          params
        },(response)=>{
          let data = response.data;
          if( data ){
            var id = data._id.toString();
            msg.user = {id: id,name: data.user_name,img: data.img};
            _self.sended(msg);
          }
        })
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../../../static/css/employer/liaotian.css";
  .liaotian {
    background-color: #f2f2f2;
    overflow: hidden;
  }
  .content{
    overflow: hidden;
  }
  .message{
    width: 7.1rem;
    margin-left: 0.2rem;
    background-color: #f2f2f2;
    font-size: 0.3rem;
  }
  .message .self{
    position: relative;
  }
  .message>li {
    margin-bottom:0.3rem;
    width: 6.9rem;
    left:0;
    position: relative;
    display:inline-block;
  }
  .bot-li{
    height: 0.5rem;
  }
  .message .time {
    margin: 0.2rem 0;
    display:block;
    font-size: 0.28rem;
    text-align: center;
  }
  .message .text {
    display: inline-block;
    position: relative;
    max-width: calc(100% - 1.5rem);
    min-height: 0.7rem;
    /*font-size: 0.3rem;*/
    padding: 0.12rem 0.2rem;
    text-align: left;
    word-break: break-all;
    background-color: #fff;
    color: #000;
    border-radius: 0.08rem;
    box-shadow: 0px 1px 7px -5px #000;
  }
  .message .text span{
    display: inline-flex
  }
  .message .avatar {
    float: left;
    height: 0.8rem;
    width: 0.8rem;
    margin: 0 10px 0 0;
    border-radius: 3px;
    background: #fff;
  }
  .message .time>span {
    display: inline-block;
    padding: 0 5px;
    font-size: 0.24rem;
    color: #fff;
    border-radius: 2px;
    background-color: #DADADA;
  }
  .message .text:before {
    content: " ";
    position: absolute;
    top: 9px;
    right: 100%;
    border: 6px solid transparent;
    border-right-color: #fff;
  }
  .message .self {
     text-align: right;
  }
  .message .self {
    text-align: right;
  }
  .message .self .avatar {
    float: right;
    display:inline-block;
    margin: 0 0 0 10px;
  }
  .message .self .text {
    background-color: #9EEA6A;
  }
  .message .self .text:before {
    right: inherit;
    left: 100%;
    border-right-color: transparent;
    border-left-color: #9EEA6A;
  }
  .message .image{
    max-width: 3rem;
  }
  img.static-emotion-gif, img.static-emotion {
    vertical-align: middle !important;
  }
  .an-move-left{
    left: 0;
    animation: moveLeft .7s ease;
     -webkit-animation:moveLeft .7s ease;
  }
  .an-move-right{
    /*left: 0;*/
    animation: moveRight .7s ease;
     -webkit-animation:moveRight .7s ease;
  }
  .bgnone{
    background: none;
  }
  @keyframes moveRight{
    0%{left:-20px; opacity: 0}
    100%{left:0; opacity: 1}
  }
  @-webkit-keyframes moveRight
  {
    0%{left:-20px; opacity: 0}
  100%{left:0px; opacity: 1}
  }
  @keyframes moveLeft{
    0%{left:20px; opacity: 0}
  100%{left:0px; opacity: 1}
  }

  @-webkit-keyframes moveLeft
  {
    0%{left:20px; opacity: 0}
  100%{left:0px; opacity: 1}
  }

  @media (max-width: 367px){
    .fzDInfo{width:82%;}
  }

</style>

