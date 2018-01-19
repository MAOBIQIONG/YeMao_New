<template>
  <div>
    <!--头部导航-->
    <div class="header">
      <div class="header-left" @click="goback"><img src="../../../static/images/back.png" /></div>
      <div class="header-right"><img src="../../../static/images/fx1.png" /></div>
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
                <div class="ns-left">
                <span><img :src="checkAvatar(null)"/></span><span>{{chw.user.user_name}}</span>
                </div>
                <div class="tm-right">
                <span>发布时间</span> <span>{{chw.create_date | dateToString}}</span>
                </div>
            </div>
            <div class="neirongshijian">
                {{chw.description}}
                <div class="bottom">
                <div class="bottom-zan" :class="{confirmColor:likeFlag == 1}" v-tap={methods:like_dom}>
                    <span id="praise" ref="like">
                        
                        <img v-if="likeFlag == 1" src='../../../static/images/zan2.png' style='width: 0.5rem;height: 0.5rem;vertical-align:middle;display: inline-block'/>
                        <img v-else src="../../../static/images/zan1.png"/>
                    </span>
                    <span id="praise-txt">100</span>
                </div>
                <div class="bottom-sz" :class="{confirmColor:collectFlag == 1}" v-tap="{methods:collect}">
                    <span id="xinxin" ref="star">         
                        <img v-if="collectFlag == 1" src='../../../static/images/xing.png' style='width: 0.5rem;height: 0.5rem;vertical-align:middle;display: inline-block'/>
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
                <li><img src="../../../static/images/bj.jpg"/></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                </ul>
                <div class="dianzhan" @click="toUrl('dianzhan')">
                <span></span>人点赞
                </div>
            </div>
            <p>热门评论</p>
            <div class="pinlunlist" v-for="(item,index) in comments" :key="index">
                <div class="top-pinlun">
                <div class="tp-left">
                    <span><img src="../../../static/images/bj.jpg"/></span><span>{{item.user.user_name}}</span>
                </div>
                <div class="tp-right">
                    <span>{{item.comments}}</span><span><img src="../../../static/images/zan.png"/></span>
                </div>
                </div>
                <div class="neirong">
                    {{item.content}}
                </div>
                <div class="bottom">
                <div class="left-bt">
                    {{item.create_date | dateToStringSecond}}
                </div>
                <div class="right-bt">
                    100条回复
                </div>
                </div>
            </div>
            </div>
            <load-more v-show="loadMoreStatus.show" :show-loading="loadMoreStatus.showLoading" :tip="loadMoreStatus.tip" class="loadMore"></load-more>
        </div>
    </scroller>
    <toast v-model="showMark" :time="1000" type="text" width="5rem">{{showMsg}}</toast>
    <!-- 评论输入框 -->
    <div class="input-box">
        <div class="input">
            <input v-model="comment_text" type="text" :placeholder="comment_placeholder">
        </div>
        <div class="send-btn" :class="is_submit?'hover':''">
            <div class="btn" v-tap="{methods:commentchw}">发送</div>
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
            height:{
                type:String,
                default:"-44"
            }
        },
    data: function () {
        return {
            chw_id:null,
            chw:{
                create_date:null,
                user:{}
            },
            likeFlag:0,
            collectFlag:0,
            comments:[],
            user_id:null,
            imgs:[],
            index:0,
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
        }
        _self.chw_id = _self.$route.query.id;
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
        toUrl: function (pagename) {
            this.$router.push({name: pagename})
        },
        // dianzan (){
        //     var off=true;
        //     $("#praise").click(function(){
        //     var praise_txt = $("#praise-txt");
        //     var num=parseInt(praise_txt.text());
        //     if(off==true){
        //         $(this).html("<img src='../../../static/images/zan2.png'style='width: 0.5rem;height: 0.5rem;vertical-align:middle;display: inline-block'/>");
        //         praise_txt.css('color','#f65aa6')
        //         num +=1;
        //         praise_txt.text(num)
        //     }
        //     });
        //     $("#xinxin").click(function(){
        //     if(off==true){
        //         $(this).html("<img src='../../../static/images/xing.png'style='width: 0.5rem;height: 0.5rem;vertical-align:middle;display: inline-block'/>");
        //         $(".bottom-sz").css('color','#f65aa6')
        //     }
        //     });
        // },
        like_dom(param){
            var _self = this;
            _self.likeFlag == 0 ? _self.likeFlag=1 : _self.likeFlag=0;
        },
        // 收藏
        collect_dom(param){
            var _self = this;
            _self.collectFlag == 0 ? _self.collectFlag=1 : _self.collectFlag=0;
        },
        collect(){
            var _self = this;
            _self.collect_dom();
            console.log(this.collectFlag,this.likeFlag);
            var params = {
                interfaceId:common.interfaceIds.collect,
                data:{
                    collect_type: 4,
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
                tips = _self.collectFlag == 0 ? '取消成功！' : '收藏成功！';
                }else{
                tips = _self.collectFlag == 0 ? '取消失败！' : '收藏失败！';
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
        },
        
        addComment(){
            let _self = this;
            let params = {
                interfaceId:common.interfaceIds.addComments,
                data: {
                    user_id: _self.user_id,          // 评论人
                    comment_id: _self.chw_id,             // 评论对象ID
                    content: _self.comment_text,          // 评论内容
                    comment_type: 1,                      // 评论类型：0、喵喵圈，1、案例展示、个人荣誉、我的作品、喵学堂、问答。
                }
            };
            this.$axios.post('/mongoApi',{
                params
            },(response)=>{
                console.log(response)
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
            _self.comments.unshift(data);
            // 重置评论框内容
            _self.comment_text = '';
        },
        onIndexChange(index) {
            this.index = index
        },
        // 头像
        checkAvatar (path) {
            return common.getAvatar(path)
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
                console.log(data);
            })
        },
        setInitData(data){
            let _self = this;
            _self.chw = data.chw || {};
            var imgs = _self.chw.imgs || [];// 图片
            imgs.forEach(function (item,index) {
            _self.imgs.push({img:item});
            })
            // _self.loadMoreStatus.show=true;
            // _self.loadMoreStatus.showLoading=false;
            // _self.loadMoreStatus.tip=_self.loadMoreStatus.tipNoData;
            // _self.$refs.scroller.disablePullup();


            // // 评论
            // _self.comments = data.comments || [];
            // if(_self.comments.length < _self.pagination.pageSize){
            // _self.loadMoreStatus.show=true;
            // _self.loadMoreStatus.showLoading=false;
            // _self.loadMoreStatus.tip=_self.loadMoreStatus.tipNoData;
            // _self.$refs.scroller.disablePullup();
            // } else {
            // _self.pagination.pageNo++
            // }
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
        }
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
    }
    .pinglun{
        padding-bottom:0;
    }
    .confirmColor{
        color:#f65aa6
    }
</style>
