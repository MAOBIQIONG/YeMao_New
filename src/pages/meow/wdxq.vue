<template>
  <div class="templete-body">
    <!--头部导航-->
    <div class="header-static"></div>
    <div class="header p-absolute">
      <div class="header-left" v-tap="{methods:goback}"><img src="../../../static/images/back.png" /></div>
      <div class="header-right" v-tap="{methods:shareApp}"><img src="../../../static/images/fx1.png" /></div>
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
          <div>
              <!--文章详情-->
              <div class="content">
                  <div class="piaoti">
                      {{chw.title}}
                  </div>
                      <!-- <div class="xc-banner">
                          <swiper height="4.8rem" :list="imgs" @on-index-change="onIndexChange"></swiper>
                      </div> -->
                  <div class="nichengshijian">
                      <!--<div class="ns-left" v-tap="{methods:toUrl,pagename:'sjszxxq',query:{id:chw.user._id}}">-->
                          <!--<span><img :src="checkAvatar(chw.user.img)"/></span><span>{{chw.user.user_name}}</span>-->
                      <!--</div>-->
                      <div class="ns-left2" v-tap="{methods:toUrl,pagename:'sjszxxq',query:{id:chw.user._id}}">
                          <div class="img" :style="{backgroundImage: 'url(' + checkAvatar(chw.user.img) + ')'}"></div>
                          <p class="name">{{chw.user.user_name}}</p>
                      </div>
                      <div class="tm-right">
                          <span>发布时间</span> <span>{{chw.create_date | dateToString}}</span>
                      </div>
                  </div>
                <!--<div class="tupian" v-if="chw.imgs && chw.imgs.length>0" :style="{backgroundImage:`url(${checkImg(chw.imgs[0])})`}">-->
                <!--</div>-->
                <div class="tupian2" v-if="chw.imgs && chw.imgs.length>0">
                   <img :src="checkImg(chw.imgs[0])"/>
                </div>
                  <div class="neirongshijian">
                      <!--{{chw.description}}-->
                      <pre v-html="chw.description"></pre>
                      <div class="bottom">
                      <div class="bottom-zan" :class="{confirmColor:chw.likeFlag == 1}" v-tap="{methods:chwLike}">
                          <span id="praise" ref="like">
                              <img v-if="chw.likeFlag == 1" src='../../../static/images/zan2.png' style='width: 0.5rem;height: 0.5rem;vertical-align:middle;display: inline-block'/>
                              <img v-else src="../../../static/images/zan3.png"/>
                          </span>
                          <span id="praise-txt">{{chw.like}}</span>
                      </div>
                      <div class="bottom-sz" :class="{confirmColor:chw.collectFlag == 1}" v-tap="{methods:collect}">
                          <span id="xinxin" ref="star">
                              <img v-if="chw.collectFlag == 1" src='../../../static/images/xing.png' style='width: 0.5rem;height: 0.5rem;vertical-align:middle;display: inline-block'/>
                              <img v-else src="../../../static/images/xin1.png"/>
                          </span>
                          <span>收藏</span>
                      </div>
                      </div>
                  </div>
                  </div>

                  <!--评论详情-->
                  <div class="pinglun">
                  <div class="dsr">
                      <ul>
                      <li v-for="(l,i) in likes" :key="i" v-tap="{methods:toUrl,pagename:'sjszxxq',query:{id:l.user._id}}">
                          <!--<img :src="checkAvatar(l.user.img)"/>-->
                          <div class="img" :style="{backgroundImage: 'url(' + checkAvatar(l.user.img) + ')'}"></div>
                      </li>
                      </ul>
                      <div class="dianzhan" v-tap="{methods:toLikeMember,chw_id:chw_id}">
                      <span>{{likes_num}}</span>人点赞
                      </div>
                  </div>
                  <p>热门评论</p>
                  <div class="pinlunlist" v-for="(item,index) in comments" :key="index">
                      <div class="top-pinlun">
                          <div class="tp-left2" v-tap="{methods:toUrl,pagename:'sjszxxq',query:{id:item.user._id}}">
                              <!--<span><img :src="checkAvatar(item.user.img)"/></span><span>{{item.user.user_name}}</span>-->
                            <div class="img" :style="{backgroundImage: 'url(' + checkAvatar(item.user.img) + ')'}"></div>
                            <p class="name">{{item.user.user_name}}</p>
                          </div>
                          <div class="tp-right"  v-tap="{methods:commentLike,comment_id:item._id,commentArrId:index}">
                              <span>{{item.like}}</span>
                              <span>
                                  <img v-if="item.likeFlag===0" src="../../../static/images/zan.png"/>
                                  <img v-if="item.likeFlag===1" src="../../../static/images/zan001.png"/>
                              </span>
                          </div>
                      </div>
                      <div class="neirong">
                          {{item.content}}
                      </div>
                      <div class="bottom">
                          <div class="left-bt">
                              <!--{{item.create_date | dateToStringSecond}}-->
                            {{getDate(item.create_date)}}
                          </div>
                          <div class="right-bt">
                              <span v-tap="{methods:toCommentDetail,comment_id:item._id,chw_id:chw_id}">
                                  <span v-if="item.replys.length>0">{{item.replys.length}}</span>
                                  <span v-else>0</span>
                                  <span>条回复</span>
                              </span>
                              <!-- <span v-if="userInfo._id!=nuchw_idll&&userInfo._id==item.user._id" :id="item._id" class="pd-0" v-tap="{methods:deleteSth,id:item._id,floor:0,flag:1}">删除</span>
                              <span v-else :id="item._id" class="pd-0" v-tap="{methods:replyFun,id:item._id,uid:item.user._id,floor:1}">评论</span> -->
                          </div>
                      </div>

                  </div>
              </div>
              <load-more v-show="loadMoreStatus.show" :show-loading="loadMoreStatus.showLoading" :tip="loadMoreStatus.tip" class="loadMore"></load-more>
          </div>
      </scroller>
    </div>
    <toast v-model="showMark" :time="1000" type="text" width="5rem">{{showMsg}}</toast>
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
import {Swiper,Scroller,LoadMore,Toast} from 'vux'
export default {
    components: {
        Swiper,
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
//            height:{
//                type:String,
//                default:"-44"
//            }
        },
    data: function () {
        return {
            loadPageEnd:false,
            userInfo:{},
            chw_id:null,
            chw:{
                likeFlag:0,
                collectFlag:0,
                create_date:null,
                user:{}
            },
            isLogin:false,
            //点赞人
            likes:[],
            likes_num:0,
            comments:[],
            user_id:null,
            imgs:[],
            index:0,

            height: common.getDeviceHeight(),
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
            // 评论
            is_submit:false,
            comment_placeholder:'填写评论',
            comment_text:'',
            answer_id:'',
            comment_id:'',
            commentArrId:'',
            floor:0,
            answer_name:'',
            //toast
            showMark:false,
            showMsg:"",
        }
    },
    filters:{
        //eg:2018-12-12
        dateToString(data){
            let d = new Date(data);
            // console.log(d.toISOString());
            // return d.toISOString().replace(/T[\w:.]+/,'');
            let rs = /[\w-]+(?=T)/.exec(d.toISOString())
            return rs[0];
        },
        //eg:2018-12-12 00:00:00
        dateToStringSecond(data){
            let d = new Date(data).toLocaleString();
            return d.replace(/\//g,'-')
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
        _self.chw_id = _self.$route.query.id;
        _self.comment_id = _self.chw_id;
        _self.initData();
        _self.loadData();

    },
    mounted: function () {
        // this.dianzan();
        this.$nextTick(()=>{

        });
    },
    methods: {
        goback () {
            this.$router.goBack()
        },
        toUrl: function (param) {
          this.$router.push({name: param.pagename,query:param.query})
        },
        toCommentDetail:function(param){
            this.$router.push({name:'pinlunxiangqing',query:{comment_id:param.comment_id,chw_id:param.chw_id}});
        },
        getDate: function (time) {
          return common.getDateDiff(time);
        },
        // 头像
        checkAvatar (path) {
            return common.getAvatar(path)
        },
        checkImg(path){
            return common.getRealImgPath(path);
        },
        toLikeMember(p){
            this.$router.push({name:'dianzhan',query:{chw_id:p.chw_id}});
        },
        removeLikeUser(uid){
            let _self = this;
            _self.likes.reduce(function(a,c,i,arr){
                if(c.user){
                    if(c.user._id === uid){
                        _self.likes.splice(i,1);
                    }
                }
            },undefined)
        },
        like_dom(param){
            var _self = this;
            // _self.chw.likeFlag == 0 ? _self.chw.likeFlag= 1 : _self.chw.likeFlag=0;
            //1chw评论  2一级评论
            if(param===1){
                let user = {
                    authenticating_state:_self.userInfo.authenticating_state,
                    img:_self.userInfo.img,
                    user_name:_self.userInfo.user_name,
                    _id:_self.userInfo._id,
                }
                if(_self.chw.likeFlag==0) {
                    _self.chw.likeFlag = 1;
                    _self.chw.like++;
                    _self.likes.push({user});
                    _self.likes_num++;
                } else {
                    _self.chw.likeFlag = 0;
                    _self.chw.like--;
                    _self.removeLikeUser(_self.userInfo._id);
                     _self.likes_num--;

                }
            } else if(param===2) {
                console.log(_self.comments[_self.commentArrId]);
                let commentArrLike = _self.comments[_self.commentArrId];
                if(commentArrLike.likeFlag===0){
                    commentArrLike.likeFlag = 1;
                    commentArrLike.like++;
                } else {
                    commentArrLike.likeFlag = 0;
                    commentArrLike.like--;
                }
            }

        },
        chwLike(){
            this.like(1);
        },
        commentLike(p){
            console.log(p);
            this.comment_id = p.comment_id;
            this.commentArrId = p.commentArrId;
            console.log(this.comment_id);
            this.like(2);
        },
        like(type){
            var _self = this;
            if(_self.isLogin == false){
                _self.$router.push({name: 'login'});
            }

            // console.log(this.chw.collectFlag,this.chw.likeFlag);
            let lid = null;
            if(type===1){
                lid = _self.chw_id;
                _self.like_dom(1);
            } else if (type === 2){
                lid = _self.comment_id;
                _self.like_dom(2);
            }
            console.log('like__comment-id',_self.comment_id);
            var params = {
                interfaceId:common.interfaceIds.like,
                data:{
                    like_type: type,//0、喵喵圈,1、personalChw,2、comments
                    like_id: lid,
                    user_id: _self.user_id,
                }
            }
            _self.$axios.post('/mongoApi', {
                params: params
            }, response => {
                var data = response.data;
                var tips = '';
                let commentArrLike = _self.comments[_self.commentArrId];
                if( data && (data.code == 200) ){
                    if(params.data.like_type ===1) {
                        tips = _self.chw.likeFlag == 0 ? '取消点赞！' : '点赞成功！';
                    } else if (params.data.like_type ===2){
                        tips = commentArrLike.likeFlag == 0 ? '取消点赞！' : '点赞成功！';
                    }

                }else{
                    if(params.data.like_type ===1) {
                        tips = _self.chw.likeFlag == 0 ? '取消失败！' : '点赞失败！';
                    }else if(params.data.like_type ===2){
                        tips = commentArrLike.likeFlag == 0 ? '取消失败！' : '点赞失败！';
                    }

                }
                _self.showToast(tips);
            })
        },
        // 收藏
        collect_dom(param){
            var _self = this;
            _self.chw.collectFlag == 0 ? _self.chw.collectFlag=1 : _self.chw.collectFlag=0;
        },
        collect(){
            var _self = this;
            if(_self.isLogin == false){
                _self.$router.push({name: 'login'});
            }
            _self.collect_dom();
            console.log(this.chw.collectFlag,this.chw.likeFlag);
            var params = {
                interfaceId:common.interfaceIds.collect,
                data:{
                    collect_type: 3,//收藏type3：问答
                    collect_id: _self.chw_id,
                    user_id: _self.user_id,
                }
            }
            _self.$axios.post('/mongoApi', {
              params: params
            }, response => {
                var data = response.data;
                var tips = '';
                if( data && data.code == 200 ){
                tips = _self.chw.collectFlag == 0 ? '取消成功！' : '收藏成功！';
                }else{
                tips = _self.chw.collectFlag == 0 ? '取消失败！' : '收藏失败！';
                }
                _self.showToast(tips);
            })
        },
        showToast(msg){
            this.showMark = true;
            this.showMsg = msg;
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
          setTimeout(function () {
            document.activeElement.blur();
          },50)
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
                    _self.addCommentHmtl(params.data);
                }else{
                    _self.showToast("评论失败!")
                }
            })
        },
        // 添加评论html
        addCommentHmtl(data){
            // console.log('addCommentHtml','param:'+JSON.stringify(data));
            var _self = this;

            // 添加评论记录
            data.user = {
                authenticating_state: _self.userInfo.authenticating_state,
                img: _self.userInfo.img,
                user_name: _self.userInfo.user_name,
                _id: _self.userInfo._id
            };
            data.create_date = new Date().getTime();
            data.like = 0;
            data.likeFlag = 0;
            data.replys = [];
            if( data.floor === 0 ){ // 一级评论
                // 修改评论数量
                console.log('data.floor===0');
                _self.chw.comments += 1;
                console.log(_self.loadPageEnd);
                if(_self.loadPageEnd === true){
                    _self.comments.unshift(data);
                }
            }
            // 重置评论框内容
            _self.comment_text = '';
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
        onIndexChange(index) {
            this.index = index
        },
        // 头像
        checkAvatar (path) {
            return common.getAvatar(path)
        },
        getDataStr(date){
            return common.timeStamp2String(date,'ymdhm');
        },
        //数据初始化
        initData(){
            let _self = this;
            let params = {
                interfaceId:common.interfaceIds.getPChwDetails,
                user_id:_self.user_id,
                where:{
                    _id: _self.chw_id
                }
            };
            this.$axios.post('/mongoApi',{
                params
            },(response)=>{
                console.log(response)
                let data = response.data;
                _self.setInitData(data);
            })
        },
        setInitData(data){
            let _self = this;
            let chw = data.chw || {};
            if(!chw.user){
                chw.user = {};
            }
            _self.chw = chw;
            _self.answer_id = _self.chw.user._id;
            var imgs = _self.chw.imgs || [];// 图片
            imgs.forEach(function (item,index) {
                _self.imgs.push({img:item});
            });
            //点赞人列表
            // console.log('data.chw.likes',data.likes);
            let likes = data.likes;
            // common.setStorage('likes_chwdetail',likes);
            _self.likes = likes.slice(0,7);
            _self.likes_num = likes.length;
            console.log(data.likes);
            console.log(_self.likes);
            console.log('初始化数据完成');
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
                },
                user_id:_self.user_id
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
                _self.loadPageEnd= true;
                _self.$refs.scroller.disablePullup();
            } else {
                _self.loadPageEnd= false;
                _self.pagination.pageNo++
            }
        },
        //下拉刷新
        refreshPageDate(){
            let _self = this
            _self.pagination.pageNo = 0;
            _self.loadMoreStatus.show=false;
            _self.$refs.scroller.donePullup();
            setTimeout(()=>{_self.loadData();_self.initData()},10);

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


      // 分享
      shareApp() {
        var _self = this;
        if( common.isNull(_self.chw.title) || common.isNull(_self.chw.description) ||
          common.isNull(_self.chw._id) ){
          _self.showToast("分享失败，缺少分享参数！");
          return;
        }
        var title = _self.chw.title.length>20 ? _self.chw.title.substring(0,20)+'...' : _self.chw.title;
        var description = _self.chw.description.length>30 ? _self.chw.description.substring(0,30)+'...' : _self.chw.description;
        var shareUrl = 'http://www.jianlianyemao.com/yemaoServer/appShare/wdxq?id='+_self.chw._id;
        myshare.init({
          href: shareUrl,
          title: title,
          content: description,
          thumbs: ['./static/images/logo.png'],
        })
      },
    }
}
</script>
<style scoped>
  @import '../../../static/css/meow/wzxq.css';
    .pinlunlist{
        background:white;
    }
    .header{
        position:static;
    }
    .content{
        margin-top:0;
        background: white;
    }
    .pinglun{
        padding-bottom:0;
        background: white;
    }
    .confirmColor{
        color:#f65aa6;
        background: #ffffff !important;
    }
    .comment-reply{
        font-size:0.28rem;
    }
    .tupian{
      background-size:cover!important;
      background-position:center center!important;
      background-repeat:no-repeat!important;
      width: 7.2rem;
      height: 2.6rem;
      background: #CCCCCC;
      overflow: hidden;
      margin:0 auto 0.2rem;
    }
  .tupian2{
    width: 7.2rem;
    text-align: center;
    /*height: 2.6rem;*/
    max-height:7rem;
    overflow: hidden;
    margin:0 auto 0.2rem;
  }
  .tupian2 img{
     max-height:7rem;
  }
</style>
