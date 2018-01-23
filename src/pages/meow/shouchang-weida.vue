<template>
  <div class="scweida">
    <!--头部导航-->
    <div class="header">
      <div class="header-left" @click="goback"><img src="../../../static/images/back.png" /></div>
      <span>问答</span>
      <div class="header-right" @click="toFbwd()">提问</div>
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
        :pullup-config = "pullupConfig"
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
            <div class="wd-top">
            <div class="touxiang">
                <img v-if="item.user.img" src="../../../static/images/bj.jpg"/>
                <img v-else src="../../../static/images/bj.jpg"/>
            </div>
            <p class="nicheng">{{item.user.user_name}}</p>
            </div>
            <div class="tupian" v-if="item.imgs">
            <img :src="item.imgs[0]"/>
            </div>
            <div class="neirong">
            <div class="piapti">
                {{item.title}}
            </div>
            <div class="jieshao">
                {{item.description}}
            </div>
            </div>
            <div class="pingjia">
            <span v-if="item.like">{{item.like}}</span><span v-else>0</span>赞同 · <span v-if="item.comments">{{item.comments}}</span><span v-else>0</span>评论
            </div>
        </div>
        </div>
        <load-more v-show="loadMoreStatus.show" :show-loading="loadMoreStatus.showLoading" :tip="loadMoreStatus.tip" class="loadMore"></load-more>
    </div>
    </scroller>
    </div>
    <toast v-model="toast.show" :time="1000" type="text" width="5rem">{{toast.msg}}</toast>
  </div>
</template>

<script>
import {Scroller,LoadMore,Toast} from 'vux'
export default {
    components:{
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
    data(){
        return {
            user_id:null,
            QAList:[],
            user:null,
            toast:{
                show:false,
                msg:''
            },
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
        }
    },
    methods: {
        goback () {
            this.$router.goBack()
        },
        toUrl: function (pagename) {
            this.$router.push({name: pagename})
        },
        toDetails (id) {
            this.$router.push({name: 'wdxq', query: {id: id}})
        },
        showToast(msg){
            this.toast.show = true;
            this.toast.msg = msg;
        },
        toFbwd(){
            var _self = this;
            var user = common.getObjStorage("userInfo") || {};
            if( !common.isNull(user._id) ){
                toUrl('fbwd');              
            } else {
                console.log('user_id is null');
                _self.$router.push({name:'login'});
            }
        },
        loadData(){
            console.log('this is loadData');
            let _self = this;
            // if( common.isNull(_self.user_id) ){
            //     throw new Error('请先登录');
            //     return;
            // }
            _self.loadMoreStatus.tip= _self.loadMoreStatus.tipLoading;
            let params = {
                interfaceId: common.interfaceIds.getPersonalChw,
                pageNo:_self.pagination.pageNo,
                pageSize:_self.pagination.pageSize,
                user_id: _self.user_id,
                where:{
                    // user_id: _self.user_id,
                    type: 4//问答
                }
            }
            _self.$axios.post('/mongoApi', {
                params: params
                }, response => {
                    console.log(response);
                    let data = response.data
                    if (data) {
                        _self.setData(data);
                        console.log('数据设置完成');
                    } else {
                        console.log('noData');
                    }
                });
        },
        setData(data){
            let _self = this;
            _self.$refs.scroller.enablePullup();
            let QAList = data.chws || [];
            if(!QAList.user){
               QAList[0].user={};
            }
            //判断页码是否为0
            if(_self.pagination.pageNo == 0) {
                _self.QAList = QAList;
                console.log("setData页码为0，QAList", QAList);
            } else {
                console.log("setData页码为不为0，_self.QAList",_self.QAList);
                //返回数据可能为空
                if(!data.chws) {
                    _self.loadMoreStatus.show=true;
                    _self.loadMoreStatus.showLoading=false;
                    _self.loadMoreStatus.tip=_self.loadMoreStatus.tipNoData;
                    _self.$refs.scroller.disablePullup();
                    return
                }
                _self.QAList.push(...data.chws);
            }
            _self.loadMoreStatus.show=false;
            _self.loadMoreStatus.showLoading=false;
            _self.$refs.scroller.donePulldown();
            _self.$refs.scroller.donePullup();
            //判断数据是否有一页
            if(QAList.length < _self.pagination.pageSize){
                _self.loadMoreStatus.show=true;
                _self.loadMoreStatus.showLoading=false;
                _self.loadMoreStatus.tip=_self.loadMoreStatus.tipNoData;
                _self.$refs.scroller.disablePullup();
            } else {
                _self.pagination.pageNo++
            }
            // console.log(_self.QAList);
        },
        //下拉刷新
        refreshPageDate(){
            let _self = this
            _self.pagination.pageNo = 0;
            _self.loadMoreStatus.show=false;
            _self.$refs.scroller.donePullup();
            _self.loadData()

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
    },
    created(){
        var _self = this;
        var user = common.getObjStorage("userInfo") || {};
        if( !common.isNull(user._id) ){
            _self.user_id = user._id;
        } else {
            console.log('user_id is null');
            // _self.$router.push({name:'login'});
        }
        this.loadData();
    },
    mounted(){
        // console.log('mounted');
        this.$nextTick(
            ()=>{
                this.$refs.scroller.disablePullup();
                this.$refs.scroller.reset({top:0});
            }
        );
    },
}
</script>
<style scoped>
  @import '../../../static/css/meow/shouchang-wenda.css';
  .weida-list{
      margin-top:0.2rem;
  }
  .content{
    width:7.5rem;
  }
  .scweida{
    position: fixed;
  }
</style>
<style>
    .xs-plugin-pullup-container{
        line-height:60px!important;
        font-size:14px;
    }
    .xs-plugin-pulldown-container{
        font-size:14px;
        margin-top:-0.21rem;
    }
</style>
