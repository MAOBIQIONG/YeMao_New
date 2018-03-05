<template>
  <div>
    <!--头部导航-->
    <div class="header">
      <div class="header-left" @click="goback"><img src="../../../static/images/back.png" /></div>
      <span>评论详情</span>
    </div>
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
    <div class="content content-p">
      <div class="pinlunlist">
        <div class="top-pinlun">
          <div class="tp-left">
            <span><img src="../../../static/images/bj.jpg"/></span><span>用户昵称</span>
          </div>
          <div class="tp-right">
            <span>100</span><span><img src="../../../static/images/zan.png"/></span>
          </div>
        </div>
        <div class="neirong">
          评论内容评论内容评论内容评论内容评论内容评
          评论内容评论内容评论内容评论内容评论内容评
        </div>
        <div class="pinlunlist pinlunlist1">
          <div class="top-pinlun">
            <div class="tp-left tp-left2">
              <span>用户昵称1</span>回复<span>用户昵称2</span>
            </div>
            <div class="tp-right">
              <span>2017-12-21</span>
            </div>
          </div>
          <div class="neirong neirong1">
            评论内容评论内容评论内容评论内容评论内容评
            评论内容评论内容评论内容评论内容评论内容评
          </div>
        </div>
      </div>
      <load-more v-show="loadMoreStatus.show" :show-loading="loadMoreStatus.showLoading" :tip="loadMoreStatus.tip" class="loadMore"></load-more>
    </div>
    </scroller>
    <toast v-model="toastShow" :time="1000" type="text" width="5rem">{{toastMsg}}</toast>
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
import {Scroller,LoadMore,Toast} from 'vux'
  export default {
    components: {
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
            isLogin:false,
            userInfo:{},
            chw_id:'',
            // 评论
            comments:[],
            is_submit:false,
            comment_placeholder:'填写评论',
            comment_text:'',
            answer_id:'',
            comment_id:'',
            floor:0,
            answer_name:'',
            //toast
            toastShow:false,
            toastMsg:"",
            pagination:{
                pageNo:0,
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
        _self.loadData();

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
        // 失去焦点
        commentBlur(){
            console.log("blur:")
            var _self = this;
            _self.comment_placeholder = '填写评论';
            // _self.comment_id = _self.miao_id;
            // _self.answer_id = _self.meow.user._id;
            // _self.floor = 0;
        },
        // 获取焦点
        commentOnBlur(params){
            console.log("focus:")
            var _self = this;
            _self.$refs['commentInput'].focus();
        },
        //下拉刷新
        refreshPageDate(){
            let _self = this
            _self.pagination.pageNo = 0;
            _self.loadMoreStatus.show=false;
            _self.$refs.scroller.donePullup();
            setTimeout(()=>{_self.loadData();},10);

        },
        //上拉加载
        loadMore(){
            let _self = this;
            // _self.loadData();
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
        //读取分页数据
        loadData(){
            console.log('this is loadData');
            console.log(this.chw_id);
            let _self = this;
            _self.loadMoreStatus.tip= _self.loadMoreStatus.tipLoading;
            let params = {
                interfaceId:common.interfaceIds.getComments,
                pageNo: _self.pagination.pageNo,
                pageSize: _self.pagination.pageSize,
                where:{
                    comment_id: _self.chw_id
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
            _self.$refs.scroller.donePulldown();
            //判断数据是否有一页
            if(comments.length < _self.pagination.pageSize){
                _self.loadMoreStatus.show=true;
                _self.loadMoreStatus.showLoading=false;
                _self.loadMoreStatus.tip=_self.loadMoreStatus.tipNoData;

                _self.$refs.scroller.disablePullup();
            } else {
                _self.pagination.pageNo++
            }
        },     
    }
  }
</script>
<style scoped>
  @import '../../../static/css/meow/pinlunxiangqin.css';    
</style>
