<template>
  <div>
    <!--头部导航-->
    <div class="header" style="position:static">
      <div class="header-left" @click="toUrl('meow')"><img src="../../../static/images/back.png" /></div>
      <span>校友会</span>
      <div class="header-right" @click="toUrl('chuangjianxiaoyouhui')">创建</div>
    </div>
    <!--校友会列表-->
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
        <div class="content content-p" style="padding-top:0;" >
            <div class="jianli" @click="toUrl('xuexiaoxiangqing')" v-for="(item,index) in list" :key="index">
                <div class="touxiang">
                <img src="../../../static/images/bj.jpg"/>
                </div>
                <div class="jieshao">
                <p class="name">{{item.school_name}}</p>
                <p class="xinge">{{item.school_description}}</p>
                <!-- <div class="biaoqian">
                    <img src="../../../static/images/bj.jpg"/>
                </div> -->
                </div>
            </div>
        <load-more v-show="loadMoreStatus.show" :show-loading="loadMoreStatus.showLoading" :tip="loadMoreStatus.tip" class="loadMore"></load-more>
        </div>
    </scroller>
  </div>
</template>

<script>    
import {Scroller,LoadMore,Toast,Value2nameFilter as value2name,ChinaAddressV4Data} from 'vux'
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
    },
    data: function () {
      return {
        height:'',
        list:[],
        list_id:null,
        user:null,
        addressData: ChinaAddressV4Data,
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
    created(){
        var _self = this;
        var user = common.getObjStorage("userInfo") || {};
        // var resumeParams1 = common.getObjStorage("resumeParams1")|| {};
        
        if( !common.isNull(user._id) ){
            _self.user_id = user._id;
        } else {
            console.log('user_id is null');
            _self.$router.push({name:'login'});
        }
        this.loadData();
    },
    mounted(){
        //获取页面字体大小
        let fontSize = getComputedStyle(document.getElementsByTagName('body')[0]).fontSize;
        console.log(fontSize);
        this.height ='-' + parseInt(fontSize.replace('px','')*1.2)
        console.log('height',this.height);
    },
    methods: {
        goback () {
            this.$router.goBack()
        },
        toUrl: function (pagename) {
            this.$router.push({name: pagename})
        },
        loadData(){
            console.log('this is loadData');
            let _self = this;
            _self.loadMoreStatus.tip = _self.loadMoreStatus.tipLoading;
            let params = {
                interfaceId: common.interfaceIds.queryList,
                coll:common.collections.alumnis,
                pageNo:_self.pagination.pageNo,
                pageSize:_self.pagination.pageSize,
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
            let list = data.datalist || [];
            //对于没有user情况处理
            // list.forEach((r,i)=>{
            //     if(!r.user){
            //         list[i].user = {};
            //     }
            // });
            //判断页码是否为0
            if(_self.pagination.pageNo == 0) {
                _self.list = list;
                console.log("setData页码为0，list", list);
            } else {
                console.log("setData页码为不为0，_self.list",_self.list);
                //返回数据可能为空
                if(!data.chws) {
                    _self.loadMoreStatus.show=true;
                    _self.loadMoreStatus.showLoading=false;
                    _self.loadMoreStatus.tip=_self.loadMoreStatus.tipNoData;
                    _self.$refs.scroller.disablePullup();
                    return
                }
                _self.list.push(...list);
            }
            _self.loadMoreStatus.show=false;
            _self.loadMoreStatus.showLoading=false;
            _self.$refs.scroller.donePulldown();
            _self.$refs.scroller.donePullup();
            //判断数据是否有一页
            if(list.length < _self.pagination.pageSize){
                _self.loadMoreStatus.show=true;
                _self.loadMoreStatus.showLoading=false;
                _self.loadMoreStatus.tip=_self.loadMoreStatus.tipNoData;
                _self.$refs.scroller.disablePullup();
            } else {
                _self.pagination.pageNo++
            }
            // console.log(_self.list);
        },
        //下拉刷新
        refreshPageDate(){
            let _self = this
            _self.pagination.pageNo = 0;
            _self.loadMoreStatus.show=false;
            _self.$refs.scroller.donePullup();
            setTimeout(()=>{_self.loadData()},100);
        },
        //上拉加载
        loadMore(){
            let _self = this;
            // _self.loadData();
            setTimeout(()=>{_self.loadData()},1);
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
  @import '../../../static/css/meow/xiaoyouhui.css';

</style>
