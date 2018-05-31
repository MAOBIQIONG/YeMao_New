<template>
  <div class="templete-body penyouxiangqing">
    <!--导航栏-->
    <div class="header-static"></div>
    <div class="header p-absolute">
      <div class="header-left" v-tap="{methods:goback}"><img src="../../../static/images/back.png" /></div>
    </div>

    <!--  喵喵列表-->
    <div class="content">
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
          <div class="mm-list">
            <div class="sjse-list">
              <div class="sjs-top">
                <div class="st-touxiang" v-tap="{methods:toUrl,pagename:'sjszxxq',query:{id:meow.user_id}}">
                  <!--<img :src="checkAvatar(meow.user.img)"/>-->
                  <div class="img" :style="{backgroundImage: 'url(' + checkAvatar(meow.user.img) + ')'}"></div>
                </div>
                <div class="st-neirong" v-tap="{methods:toUrl,pagename:'sjszxxq',query:{id:meow.user_id}}">
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
                <div class="sc-jiesao sc-jieshao1">
                  <pre v-html="meow.title"></pre>
                </div>
              </div>
              <div class="sjs-bottom sjs-bottom1">
                <ul>
                  <li v-for="(item,index) in list" @click.stop="show(index)" :key="index">
                    <!-- <img class="previewer-demo-img":src="item.src"width="100%"> -->
                    <div class="previewer-img" :style="'background-image:url('+checkImg(item.src)+')'"></div>
                  </li>
                  <!-- <div v-transfer-dom>
                    <previewer2 :list="list" ref="previewer" :options="options"></previewer2>
                  </div> -->
                </ul>
              </div>
              <div class="pinjia">
                <p class="dz" :class="meow.likeFlag==1?'hover':''" v-tap="{methods:dianzan}"><span>{{meow.like}}</span></p>
                <p class="comments" v-tap="{methods:meowComment}"><span></span><span>{{meow.comments}}</span></p>
                <div v-if="userInfo._id!=null&&userInfo._id==meow.user_id" class="more more-icon" v-tap="{methods:deleteSth,id:meow._id,flag:0}"></div>
              </div>
            </div>
          </div>
          <!--评价列表-->
          <div class="liuyan">
            <div class="comment-box" v-for="(com,index) in comments" :key="index">
              <div class="left" v-tap="{methods:toUrl,pagename:'sjszxxq',query:{id:com.user._id}}">
                <!--<div class="img"><img :src="checkAvatar(com.user.img)"/></div>-->
                <div class="image" :style="{backgroundImage: 'url(' + checkAvatar(com.user.img) + ')'}"></div>
              </div>
              <div class="right">
                <div class="comment-title">
                  <span>{{com.user.user_name}}</span>
                  <div class="f-right">
                    <span class="pd-0">{{getDateDiff(com.create_date)}}</span>
                    <span>·</span>
                    <span v-if="userInfo._id!=null&&userInfo._id==com.user._id" :id="com._id" class="pd-0" v-tap="{methods:deleteSth,id:com._id,floor:0,flag:1}">删除</span>
                    <span v-else :id="com._id" class="pd-0" v-tap="{methods:replyFun,id:com._id,uid:com.user._id,floor:1}">评论</span>
                  </div>
                </div>
                <div class="comment-content">{{com.content}}</div>
                <div class="arr-up" v-if="com.replys && com.replys.length>0"></div>
                <div class="comment-reply" v-if="com.replys && com.replys.length>0">
                  <div class="reply" v-tap="{methods:replyFun,id:com._id,aid:rep._id,name:rep.user.user_name,uid:rep.user._id,floor:2}" :id="rep._id" v-for="(rep,index) in com.replys" :key="index">
                    <p v-if="rep.floor==1"><span class="replier">{{rep.user.user_name}}</span>&nbsp;:&nbsp;<span>{{rep.content}}</span></p>
                    <p v-if="rep.floor==2">
                      <span class="replier">{{rep.user.user_name}}</span>
                      <span>回复</span>
                      <span class="replier" v-if="rep.answer">{{rep.answer.user_name}}</span>&nbsp;:&nbsp;<span>{{rep.content}}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <load-more v-show="loadMoreStatus.show" :show-loading="loadMoreStatus.showLoading" :tip="loadMoreStatus.tip" class="loadMore"></load-more>
        </div>
      </scroller>
    </div>
    <div class="chat-box" v-if="comment_show">
      <!-- 评论输入框 -->
      <div class="input-box">
        <div class="input">
          <input v-model="comment_text" type="text" :placeholder="comment_placeholder" maxlength="500" v-on:blur.lazy="commentBlur" ref="commentInput">
        </div>
        <div class="send-btn" :class="is_submit?'hover':''">
          <div class="btn" v-tap="{methods:commentMeow}">发送</div>
        </div>
      </div>
    </div>
    <toast v-model="showMark" :time="1000" type="text" width="5rem">{{showMsg}}</toast>
    <div v-transfer-dom>
      <previewer2 :list="list" ref="previewer" :options="options" @on-close="previewerClose"></previewer2>
    </div>
    <actionsheet v-model="showSheet" :menus="menus" show-cancel @on-click-menu-delete="onDelete" :class="showSheet==true?'':'vux-actionsheet-rec'"></actionsheet>
  </div>
</template>

<script>
  import { Previewer, Actionsheet, TransferDom, Scroller, LoadMore, Toast } from 'vux'
  import Previewer2 from '@/components/meow/previewer2'
  import store from '@/vuex/store'
  export default {
    directives: {
      TransferDom
    },
    components: {
      Actionsheet,
      Previewer,
      Previewer2,
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
        // 评论
        comments:[],
        is_submit:false,
        comment_show: false,  // 评论框隐藏显示
        comment_placeholder:'填写评论',
        comment_placeholder2:'填写评论',
        comment_id:'',
        comment_text:'',
        answer_id:'',
        answer_name:'',
        floor:0,
        // 删除遮罩层
        showSheet: false,
        menus: {
          delete: '<span style="color:red">删除</span>',
        },
        deleteId:'',    // 删除ID
        deleteFlag:0,   // 0、喵喵圈，1、评论
        deleteFloor:0,
        // 图片预览
        list:[],
        preShowMark: false,
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
      _self.miao_id = _self.$route.query.id;
      _self.comment_id = _self.miao_id;
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
      toUrl: function (param) {
        this.$router.push({name: param.pagename,query:param.query})
      },
      showToast(msg){
        this.showMark = true;
        this.showMsg = msg;
      },
      // 头像
      checkAvatar (path) {
        return common.getAvatar(path)
      },
      checkImg (path) {
        return common.getDefultImg(path)
      },
      getRealPath(path){
        return common.getRealImgPath(path);
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
        this.$refs.previewer.show(index);
        this.preShowMark = true;
      },
      previewerClose: function () {
        this.preShowMark = false;
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
      // 删除：喵喵圈、评论
      deleteSth(params){
        var _self = this;
        _self.showSheet = true;
        _self.deleteId = params.id;
        _self.deleteFlag = params.flag;
        _self.deleteFloor = params.floor;
      },
      // 回复
      replyFun(params){
        var _self = this;
        _self.comment_show=true;
        // 二级回复点击到自己的回复,显示是否删除
        if( !common.isNull(_self.userInfo._id) && !common.isNull(params.uid) ){
          if( _self.userInfo._id == params.uid ){
            var delParams = {id:params.aid,flag:1,floor:1};
            _self.deleteSth(delParams);
            return;
          }
        }
        // 二级评论
        var id = "#"+params.id;
        _self.comment_id = params.id;
        _self.floor = common.checkInt(params.floor);
        // 回复
        if( !common.isNull(params.aid) && !common.isNull(params.name) ){
          id = "#"+params.aid;
          _self.answer_id = params.uid;
          _self.answer_name = params.name;
          _self.comment_placeholder = '回复 '+_self.answer_name+':';
        }else{
          _self.comment_placeholder = _self.comment_placeholder2;
        }
        if( !$(id).hasClass('bg-clo-1') ){
          $(id).addClass('bg-clo-1');
          setTimeout(function () {
            $(id).removeClass('bg-clo-1');
            _self.commentOnBlur();
          },100)
        }
      },
      // 喵喵圈评论
      meowComment(){
        console.log("initParams:")
        var _self = this;
        _self.comment_show=true;
        _self.initParams();
        setTimeout(function () {
          _self.commentOnBlur();
        },200)
      },
      // 初始化评论参数：默认评论苗苗圈
      initParams(){
        console.log("initParams:")
        var _self = this;
        _self.comment_placeholder = _self.comment_placeholder2;
        _self.comment_id = _self.miao_id;
        _self.answer_id = _self.meow.user._id;
        _self.floor = 0;
      },
      // 失去焦点
      commentBlur(){
        console.log("blur:")
        var _self = this;
        // _self.initParams();
      },
      // 获取焦点
      commentOnBlur(params){
        console.log("on blur:")
        var _self = this;
        _self.$refs['commentInput'].focus();
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
        setTimeout(function () {
          document.activeElement.blur();
        },50)
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
        _self.answer_id = _self.meow.user._id;
        // 图片
        var imgs = _self.meow.imgs || [];
        imgs.forEach(function (item,index) {
          _self.list.push({src:_self.getRealPath(item)})
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
            user_id: _self.userInfo._id,         // 评论人
            comment_id: _self.comment_id,        // 评论对象ID
            content: _self.comment_text,         // 评论内容
            comment_type: 0,                     // 评论类型：0、喵喵圈，1、案例展示、个人荣誉、我的作品、喵学堂、问答。
            answer_id: _self.answer_id,          // 回复ID：一级评论、喵喵圈动态发布人ID，二级评论、一级评论发布人ID，回复、回复发布人
            floor: _self.floor                   // 评论层级
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
            _self.showToast("评论成功!")
            params.data._id = data.ids[0];
            _self.addCommentHmtl(params.data);
          }else if( data.code == 400 && data.result.ok == 1 ){
            // 刷新喵喵圈首页
            _self.$store.state.meowRefreshMark = 1;
            _self.showToast("评论成功!")
            params.data._id = data.ids[0];
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
        // 添加评论记录
        data.create_date = new Date().getTime();
        data.user = {
          authenticating_state: _self.userInfo.authenticating_state,
          img: _self.userInfo.img,
          user_name: _self.userInfo.user_name,
          _id: _self.userInfo._id
        };
        if( data.floor == 0 ){ // 一级评论
          // 修改评论数量
          _self.meow.comments += 1;
          _self.comments.unshift(data);
        }else{
          if( data.floor == 2 ){ // 回复
            data.answer = {
              user_name: _self.answer_name,
              _id: _self.answer_id
            };
          }
          // 添加回复记录
          _self.comments.forEach(function (item,index) {
            if( data.comment_id == item._id.toString() ){
              if( item.replys ){
                item.replys.push(data);
              }else{
                item.replys = [data];
              }
            }
          })
        }
        // 重置评论框内容
        _self.comment_text = '';
        _self.comment_show=false;
      },

      onDelete(){
        var _self = this;
        if( _self.deleteFlag == 0 ){
          _self.removeMoew();
        }else{
          _self.removeComment();
        }
      },

      //删除评论
      removeComment(){
        let _self = this;
        let params = {
          interfaceId:common.interfaceIds.removeComments,
          _id: _self.deleteId,                 // 评论对象ID
          floor: _self.deleteFloor,            // 评论层级
        };
        // 一级评论修改评论数量
        if( params.floor == 0 ){
          params.meow_id = _self.miao_id;
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
          // 删除评论数
          _self.meow.comments = _self.meow.comments>0 ? _self.meow.comments-1 : 0;
          // 删除评论
          _self.comments.forEach(function (item,index) {
            if( params._id == item._id.toString() ){
              _self.comments.splice(index,1);
            }
          })
        }else{
          // 删除回复
          _self.comments.forEach(function (item,index) {
            item.replys.forEach(function (ite,inde) {
              if( params._id == ite._id.toString() ){
                item.replys.splice(inde,1);
              }
            })
          })
        }
      },

      //删除喵喵圈
      removeMoew(){
        let _self = this;
        if( common.isNull(_self.userInfo._id) ||
            _self.userInfo._id!=_self.meow.user_id ){
          return;
        }
        let params = {
          interfaceId:common.interfaceIds.removeMeow,
          _id: _self.miao_id,                 // 喵喵圈ID
        };
        this.$axios.post('/mongoApi',{
          params
        },(response)=>{
          let data = response.data;
          if( data.code == 200 ){
            // 刷新喵喵圈首页
            _self.$store.state.meowRefreshMark = 1;
            _self.showToast("删除成功!")
            setTimeout(function () {
              _self.goback();
            },1000);
          }else{
            _self.showToast("删除失败!")
          }
        })
      },

      // app.vue父组件调用函数
      appVueFun(){
        console.log("appVueFun:");
        var _self = this;
        if( _self.preShowMark ){
          _self.preShowMark = false;
          _self.$refs.previewer.close();
        }else{
          _self.$router.goBack();
        }
      },
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
  .pd-0{
    padding: 0.1rem;
  }
  .comment-content{
    word-wrap:break-word;
  }
  .reply{
    word-wrap:break-word;
  }
</style>
