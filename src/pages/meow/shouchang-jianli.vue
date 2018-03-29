<template>
  <div>
    <!--头部导航-->
    <div class="header-static"></div>
    <div class="header p-absolute">
      <div class="header-left" @click="toUrl('meow')"><img src="../../../static/images/back.png" /></div>
      <span>喵喵人才</span>
      <div class="header-right" @click="toJl()">发布</div>
    </div>
    <!--简历列表-->
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
          <div class="jianli" v-for="(item,index) in list" :key="index" @click="toDetail(item._id,item.user_id)">
            <div class="touxiang" :style="{backgroundImage:`url(${checkAvatar(item.img)})`}">
              <!-- <img src="../../../static/images/bj.jpg"/> -->
            </div>
            <div class="jieshao">
              <p class="name"><span>{{item.real_name}}</span>/<span>{{item.expected_positions}}</span></p>
              <p class="qiwan"><span>{{getName([item.city[0]])}}</span>&nbsp;<span>{{item.working_year | getWorkyearsName}}</span>&nbsp;<span>{{item.education}}</span>&nbsp;<span>￥{{item.expected_salary}}</span></p>
              <p class="xinge">{{item.description}}</p>
            </div>
          </div>
          <load-more v-show="loadMoreStatus.show" :show-loading="loadMoreStatus.showLoading" :tip="loadMoreStatus.tip" class="loadMore"></load-more>
        </div>
      </scroller>
    </div>
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
    filters:{
        getWorkyearsName(id){
            return common.getWorkyearsName(id);
        }
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
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
      toDetail(id,userId){
          this.$router.push({name:"minejianli",query:{id:id}});
          common.setStorage('resume_user_id',userId);
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
        //头像
        checkAvatar (path) {
            return common.getAvatar(path)
        },
        getName (value) {
            return value2name(value, ChinaAddressV4Data)
        },
        loadData(){
            console.log('this is loadData');
            let _self = this;
            _self.loadMoreStatus.tip= _self.loadMoreStatus.tipLoading;
            let params = {
                interfaceId: common.interfaceIds.queryList,
                coll:common.collections.resumes,
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
            for(let item of list) {
                if(common.isNull(item.city)){
                    item.city = [];
                }
                if(common.isNull(item.expected_city)){
                    item.expected_city = [];
                }
            }
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
    },
    created(){
        var _self = this;
        var user = common.getObjStorage("userInfo") || {};
        if( !common.isNull(user._id) ){
            _self.user_id = user._id;
        }
        this.loadData();
    },
    mounted(){
        let fontSize = getComputedStyle(document.getElementsByTagName('body')[0]).fontSize;
        console.log(fontSize);
        this.height ='-' + parseInt(fontSize.replace('px','')*1.2)
        console.log('height',this.height);
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
  @import '../../../static/css/meow/shouchang-jianli.css';
  .scroller{background:transparent!important;}
</style>
