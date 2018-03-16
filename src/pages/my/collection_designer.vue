<template>
  <div class="">
    <div class="header" style="position:static;">
      <div class="header-left" @click="goback"><img src="../../../static/images/back.png"/></div>
      <span>收藏设计师</span>
    </div>
    <!--收藏设计师-->
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
        <div v-for="(item,index) in list" :key="index" class="content content-p" style="padding-top:0;padding-bottom:0;">
            <div class="szsjs-list" @click="toDetails(item._id)">
                <div class="szsjs-top">
                <div class="szsjs-touxiang" :style="{backgroundImage:`url(${checkAvatar(item.img)})`}">
                    <!-- <img src="../../../static/images/bj.jpg"> -->
                </div>
                <div class="szsjs-neirong">
                    <div class="sn-top">
                    <div class="st-nicheng">{{item.user_name}}</div>
                    <div class="st-pingxin"></div>
                    </div>
                    <div class="sn-bottom">
                    <div class="sb-qian" v-if="item.authenticating_state==6">签</div>
                    <div class="sb-ysm"  v-if="item.authenticating_state>=4">已实名</div>
                    <div class="sb-yrz" v-if="item.authenticating_state>=2">已认证</div>
                    </div>
                </div>
                <div class="szsjs-jiageleixin">
                    <div class="st-leixin"><span>{{getNameByTypeId(item.user_type)}}</span></div>
                    <div class="st-yaoqing" @click.stop="invite(item._id)">邀请TA</div>
                </div>

                </div>
            </div>
        </div>
        <load-more v-show="loadMoreStatus.show" :show-loading="loadMoreStatus.showLoading" :tip="loadMoreStatus.tip" class="loadMore"></load-more>
    </div>
    </scroller>
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
    },
    data () {
      return {
        height:'',
        list: [],
        user_id: null,
        list_id: null,
        toast: {
          show: false,
          msg: ''
        },
        pagination: {
          pageNo: 0,
          pageSize: 10,
        },
        pullUpDownStatus: {
          pulldownStatus: 'default',
          pullupStatus: 'default'
        },
        pulldownConfig: {
          content: '下拉刷新',
          height: 60,
          autoRefresh: false,
          downContent: '下拉刷新',
          upContent: '放开刷新',
          loadingContent: '刷新中...',
          clsPrefix: 'xs-plugin-pulldown-'
        },
        pullupConfig: {
          content: '上拉加载',
          pullUpHeight: 60,
          height: 40,
          autoRefresh: false,
          downContent: '放开加载',
          upContent: '上拉加载',
          loadingContent: '',
          clsPrefix: 'xs-plugin-pullup-'
        },
        loadMoreStatus: {
          tip: "正在加载",
          tipNoData: "没有更多数据了",
          tipLoading: "正在加载",
          showLoading: true,
          show: true,
        },
      }
    },
    created() {
      var _slef = this;
      var user = common.getObjStorage("userInfo") || {};
      if (!common.isNull(user._id)) {
        _slef.user_id = user._id;
      }
      this.loadData();
    },
    methods: {
      goback () {
        this.$router.goBack()
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
        // 详情页
      toDetails(id){
        this.$router.push({name:'sjszxxq', query: {id: id}});
      },
      toJl(){
            var _self = this;
            var user = common.getObjStorage("userInfo") || {};
            if(!common.isNull(user._id)){
                _self.user_id = user._id;
                _self.toUrl('tianxiejianli');
            } else {
                console.log('没有获取用户信息');
                _self.$router.push({name:"login"});
            }         
      },
        getName (value) {
            return value2name(value, ChinaAddressV4Data)
        },
        getNameByTypeId(id){
            return common.getNameByTypeId(id);
        },
        invite(id){
            this.$router.push({name:'fabudingdan', query: {designerid:id,invitation:1}});
        },
        loadData(){
            console.log('this is loadData');
            let _self = this;
            _self.loadMoreStatus.tip= _self.loadMoreStatus.tipLoading;
            let params = {
                interfaceId: common.interfaceIds.getCollects,
                pageNo: _self.pagination.pageNo,
                pageSize: _self.pagination.pageSize,
                where: {
                    user_id: _self.user_id,
                    collect_type: 1//设计师
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
            let list = data.collects || [];
            //判断页码是否为0
            if(_self.pagination.pageNo == 0) {
                _self.list = list;
                console.log("setData页码为0，list", list);
            } else {
                console.log("setData页码为不为0，_self.list",_self.list);
                //返回数据可能为空
                if(!data.collects) {
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
      // 头像
      checkAvatar (path) {
        return common.getAvatar(path)
      },
      checkImg(path){
        return common.getDefultImg(path);
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
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../../../static/css/employer/shoucangsjs.css";
  .scroller{
      background:#F2F2F2;
  }
  .szsjs-touxiang{
      background-size:cover!important;
      background-position:center center!important;
  }
</style>
