<template>
  <div class="templete-body">
    <!--头部导航-->
    <div class="header-static"></div>
    <div class="header">
      <div class="header-left" @click="goback"><img src="../../../static/images/back.png" /></div>
      <span>评论详情</span>
    </div>
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
        :class="{scroller:true}"
      >
        <!--评论详情-->
        <div>
          <div class="pinlunlist">
            <div class="top-pinlun">
              <div class="tp-left">
                <span><img :src="checkAvatar(comment.user.img)"/></span><span>{{comment.user.user_name}}</span>
              </div>
              <div class="tp-right" v-tap="{methods:chwLike}">
                <span>{{comment.like}}</span>
                <span>
                    <img v-if="comment.likeFlag==0" src="../../../static/images/zan.png"/>
                    <img v-if="comment.likeFlag==1" src="../../../static/images/zan001.png"/>
                </span>
              </div>
            </div>
            <div class="neirong">
              {{comment.content}}
            </div>
            <div class="bottom">
              <div class="left-bt">
                <!-- {{item.create_date | dateToStringSecond}} -->
                {{getDataStr(comment.create_date)}}
              </div>
              <div class="right-bt">
                <span v-if="userInfo._id!=null&&userInfo._id==comment.user._id" :id="comment._id" class="pd-0" v-tap="{methods:deleteSthAndBack,id:comment._id,floor:0,flag:1}">删除</span>
                <span v-else :id="comment._id" class="pd-0" v-tap="{methods:replyFun,id:comment._id,uid:comment.user._id,floor:1}">评论</span>
              </div>
            </div>
            <div class="pinlunlist pinlunlist1" v-for="(item,index) in replys" :key="index">
              <div class="top-pinlun">
                <div class="tp-left tp-left2" v-tap="{methods:replyFun,id:comment_id,aid:item._id,name:item.user.user_name,uid:item.user._id,floor:2}" :id="item._id">
                  <p v-if="item.floor==1"><span class="replier">{{item.user.user_name}}</span></p>
                  <p v-if="item.floor==2">
                    <span class="replier">{{item.user.user_name}}</span>
                    <span>回复</span>
                    <span class="replier" v-if="item.answer">{{item.answer.user_name}}</span>
                    <!-- &nbsp;:&nbsp;<span>{{item.content}}</span> -->
                  </p>
                </div>
                <div class="tp-right">
                  <span>{{getDataStr(item.create_date)}}</span>
                </div>
              </div>
              <div class="neirong neirong1" style="padding-left:0.2rem;">
                {{item.content}}
              </div>
            </div>
          </div>
          <load-more v-show="loadMoreStatus.show" :show-loading="loadMoreStatus.showLoading" :tip="loadMoreStatus.tip" class="loadMore"></load-more>
        </div>
      </scroller>
    </div>
    <toast v-model="toastShow" :time="1000" type="text" width="5rem">{{toastMsg}}</toast>
    <actionsheet v-model="showSheet" :menus="menus" show-cancel @on-click-menu-delete="onDelete"></actionsheet>
    <div class="chat-box">
      <!-- 评论输入框 -->
      <div class="input-box">
        <div class="input">
          <input v-model="comment_text" type="text" :placeholder="comment_placeholder" @blur="commentBlur" ref="commentInput">
        </div>
        <div class="send-btn" :class="is_submit?'hover':''">
          <div class="btn" v-tap="{methods:commentchw}">发送</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Actionsheet,Scroller,LoadMore,Toast} from 'vux'
  export default {
    components: {
      Actionsheet,
      Scroller,
      LoadMore,
      Toast
    },
    props:{
      lockX:{
        type:Boolean,
        default:true
      },
      lockY:{
        type:Boolean,
        default:false
      },
      height:{
        type:String,
        default:"-44"
      }
    },
    data: function () {
      return {
        commentFloor1Deleted:false,
        isLogin:false,
        loadPageEnd:false,
        userInfo:{},
        chw_id:'',
        comment:{user:{},likeFlag:0},
        // 评论
        replys:[],
        is_submit:false,
        comment_placeholder:'填写评论',
        comment_text:'',
        answer_id:'',
        comment_id:'',
        deleteId:'',
        floor:0,
        answer_name:'',
        //toast
        toastShow:false,
        toastMsg:"",
        //sheet
        showSheet: false,
        menus: {
          delete: '<span style="color:red">删除</span>',
        },
        pagination:{
          pageNo:1,
          pageSize:10,
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
      }
    },
    watch:{
      pullUpDownStatus:{
        handler:function(val,oldval){
          if(val.pullupStatus=="loading"){
            this.loadMoreStatus.show=true;
            this.loadMoreStatus.showLoading=true;
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
    created(){
      let _self = this;
      let userInfo = common.getObjStorage("userInfo") || {};
      _self.userInfo = userInfo;
      if( !common.isNull(userInfo._id) ){
        _self.user_id = userInfo._id;
        _self.isLogin = true;
      }
      _self.chw_id = _self.$route.query.chw_id;
      _self.comment_id = _self.$route.query.comment_id;
      _self.floor = 1;
      _self.initData();
    },
    methods: {
      goback () {
        this.$router.goBack()
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
      showToast(msg){
        this.toastShow = true;
        this.toastMsg = msg;
      },
      // 头像
      checkAvatar (path) {
        return common.getAvatar(path)
      },
      getDataStr(date){
        return common.timeStamp2String(date,'ymdhm');
      },
      chwLike_dom(){
        var _self = this;
        if(_self.comment.likeFlag==0) {
          _self.comment.likeFlag = 1;
          _self.comment.like++;
        } else {
          _self.comment.likeFlag = 0;
          _self.comment.like--;
        }
      },
      chwLike(){
        var _self = this;
        if(_self.isLogin == false){
          _self.$router.push({name: 'login'});
        }
        _self.chwLike_dom();
        var params = {
          interfaceId:common.interfaceIds.like,
          data:{
            like_type: 2,//0、喵喵圈,1、personalChw,2、comments
            like_id: _self.comment_id,
            user_id: _self.user_id,
          }
        }
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          var data = response.data;
          var tips = '';
          if( data && data.code == 200 ){
            tips = _self.comment.likeFlag == 0 ? '取消点赞！' : '点赞成功！';
          }else{
            tips = _self.comment.likeFlag == 0 ? '取消失败！' : '点赞失败！';
          }
          _self.showToast(tips);
        })
      },

      //下拉刷新
      refreshPageDate(){
        let _self = this
        _self.pagination.pageNo = 1;
        _self.loadMoreStatus.show=false;
        _self.$refs.scroller.enablePullup();
        _self.$refs.scroller.donePullup();
        _self.$refs.scroller.donePulldown();
        setTimeout(()=>{_self.initData();},10);

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
      //数据初始化
      initData(){
        let _self = this;
        let params = {
          interfaceId:common.interfaceIds.getCommentById ,
          user_id:_self.user_id,
          id: _self.comment_id
        };
        this.$axios.post('/mongoApi',{
          params
        },(response)=>{
          console.log(response)
          let data = response.data;
          _self.setInitData(data);
          _self.loadData();
        })
      },
      setInitData(data){
        let _self = this;
        let comment = data.comment || {};
        if(!comment.user){
          comment.user = {};
        }
        _self.comment = comment;
        _self.answer_id = _self.comment.user._id;
        _self.replys = comment.replys;
        _self.$refs.scroller.donePulldown();
        this.loadMoreStatus.show=false;
        console.log('初始化数据完成');
      },
      //读取分页数据
      loadData(){
        console.log('this is loadData');
        console.log(this.chw_id);
        let _self = this;
        _self.loadMoreStatus.tip= _self.loadMoreStatus.tipLoading;
        let params = {
          interfaceId:common.interfaceIds.getReplyByPages,
          pageNo: _self.pagination.pageNo,
          pageSize: _self.pagination.pageSize,
          where:{
            comment_id: _self.comment_id
          }
        };
        this.$axios.post('/mongoApi',{
          params
        },(response)=>{
          // console.log(response);
          let data = response.data;
          _self.setData(data);
          console.log('数据设置完成');
        })
      },
      setData(data){
        let _self = this;
        _self.loadMoreStatus.showLoading=true;
        _self.$refs.scroller.enablePullup();
        // 订单
        let replys = data.replys || [];
        //判断页码是否为0
        if(_self.pagination.pageNo == 0) {
          _self.replys = replys;
        } else {
          _self.replys.push(...data.replys);
        }
        _self.loadMoreStatus.show=false;
        _self.loadMoreStatus.showLoading=false;
        _self.$refs.scroller.donePullup();
        _self.$refs.scroller.donePulldown();
        //判断数据是否有一页
        if(replys.length < _self.pagination.pageSize){
          _self.loadMoreStatus.show=true;
          _self.loadMoreStatus.showLoading=false;
          _self.loadMoreStatus.tip=_self.loadMoreStatus.tipNoData;
          _self.loadPageEnd= true;
          _self.$refs.scroller.disablePullup();
        } else {
          _self.loadPageEnd= false;
          _self.pagination.pageNo++
        }
      },
      //评论
      commentchw(){
        var _self = this;
        if( !_self.is_submit ){
        }else if( common.isNull(_self.user_id) ){
          _self.$router.push({name: 'login'});
        }else {
          _self.addComment();
        }
      },

      addComment(){
        let _self = this;
        let params = {
          interfaceId:common.interfaceIds.addComments,
          data: {
            user_id: _self.user_id,               // 评论人
            comment_id: _self.comment_id,             // 评论对象ID
            content: _self.comment_text,          // 评论内容
            comment_type: 5,                      // 评论类型：0、喵喵圈，1、案例展示，2、个人荣誉，3、我的作品，4、喵学堂，5、问答。
            answer_id: _self.answer_id,           // 回复ID：一级评论、喵喵圈动态发布人ID，二级评论、一级评论发布人ID，回复、回复发布人
            floor: _self.floor                   // 评论层级
          }
        };
        this.$axios.post('/mongoApi',{
          params
        },(response)=>{
          console.log(response)
          let data = response.data;
          if( data.code == 200 || (data.code == 400 && data.result.ok == 1)){
            _self.showToast("评论成功!")
            params.data._id = data.ids[0];
            _self.addCommentHtml(params.data);

          }else{
            _self.showToast("评论失败!")
          }
        })
      },
      // 添加评论html
      addCommentHtml(data){
        console.log(data);
        var _self = this;

        // 添加评论记录
        data.user = {
          authenticating_state: _self.userInfo.authenticating_state,
          img: _self.userInfo.img,
          user_name: _self.userInfo.user_name,
          _id: _self.userInfo._id
        };
        data.create_date = new Date().getTime();
        if( data.floor == 0 ){ // 一级评论
          // 修改评论数量
          _self.comment.replys += 1;
          _self.replys.push(data);
        }else{
          if( data.floor == 2 ){ // 回复
            data.answer = {
              user_name: _self.answer_name,
              _id: _self.answer_id
            };
          }
        }
        // 添加回复记录
        if(_self.loadPageEnd == true){
          _self.replys.push(data);
        }

        // _self.replys.forEach(function (item,index) {
        //     if( data.comment_id == item._id.toString() ){
        //         if( item.replys ){
        //             item.replys.push(data);
        //         }else{
        //             item.replys = [data];
        //         }
        //     }
        // })
        // 重置评论框内容
        _self.comment_text = '';
      },
      // 删除：喵喵圈、评论
      deleteSthAndBack(params){
        let _self = this;
        _self.deleteSth(params);
        _self.commentFloor1Deleted = true;
      },
      deleteSth(params){
        console.log(params);
        var _self = this;
        _self.showSheet = true;
        _self.deleteId = params.id;
        _self.deleteFlag = params.flag;
        _self.deleteFloor = params.floor;
      },
      // 回复
      replyFun(params){

        var _self = this;
        // 删除自己的评论、回复
        if( !common.isNull(_self.userInfo._id) && !common.isNull(params.uid) ){
          if( _self.userInfo._id == params.uid ){
            var delParams = {id:params.aid,flag:1,floor:1};
            _self.deleteSth(delParams);
            return;
          }
        }
        // 评论、回复
        var id = "#"+params.id;
        _self.comment_id = params.id;
        _self.floor = common.checkInt(params.floor);

        if( !common.isNull(params.aid) && !common.isNull(params.name) ){
          id = "#"+params.aid;
          _self.answer_id = params.uid;
          _self.answer_name = params.name;
          _self.comment_placeholder = '回复'+_self.answer_name+':';
        }
        if( !$(id).hasClass('bg-clo-1') ){
          $(id).addClass('bg-clo-1');
          setTimeout(function () {
            $(id).removeClass('bg-clo-1');
            _self.commentOnBlur();
          },100)
        }
      },
      // 失去焦点
      commentBlur(){
        console.log("blur:")
        var _self = this;
        _self.comment_placeholder = '填写评论';
        _self.comment_id = _self.comment_id;
        _self.answer_id =  _self.comment.user._id;;
        _self.floor = 1;
      },
      // 获取焦点
      commentOnBlur(params){
        console.log("focus:")
        var _self = this;
        _self.$refs['commentInput'].focus();
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
        };
        if( params.floor == 0 ){
          params.meow_id = _self.chw_id;
          params.comment_type = 1;
        }
        this.$axios.post('/mongoApi',{
          params
        },(response)=>{
          let data = response.data;
          if( data.code == 200 ){
            _self.showToast("删除成功!")
            if(_self.commentFloor1Deleted){
              setTimeout(function(){
                _self.goback();
              },600);
            }
            _self.removeCommentHmtl(params);
          }else{
            _self.showToast("删除失败!")
          }
        })
      },
      // 清除页面html
      removeCommentHmtl(params){
        console.log('removeCommentHtml',params);
        let _self = this;
        // 一级评论删除
        if( params.floor == 0 ){
          _self.comments.forEach(function (item,index) {
            if( params._id == item._id.toString() ){
              _self.comments.splice(index,1);
            }
          })
        }else{
          _self.replys.forEach(function (item,index) {
            if( params._id == item._id.toString() ){
              _self.replys.splice(index,1);
            }
          })
        }
      },



    }
  }
</script>
<style scoped>
  @import '../../../static/css/meow/pinlunxiangqin.css';
</style>
