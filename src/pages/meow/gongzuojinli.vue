<template>
  <div>
    <!--头部导航-->
    <div class="header" style="position:static">
      <div class="header-left" @click="goback"><img src="../../../static/images/back.png" /></div>
      <span>工作经历</span>
      <div class="header-right" @click="nextStep()">下一步</div>
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
        <!--编辑工作经历-->
        <div class="content content-p" style="padding-top:0;position:static">
            <div v-for="(item,index) in list" :key="index">
                <div class="gzjl">
                <div class="rzsj">
                    <div class="rzsj-left">
                    <span>{{item.start_time}}</span>-<span>{{item.end_time}}</span>
                    </div>
                    <div class="rzsj-right" @click="edit(item._id)">
                    <span><img src="../../../static/images/sx1.png"></span><span>编辑</span>
                    </div>
                </div>
                <div class="zwmc">
                    <span>{{item.company_name}}</span>/<span>{{item.positions}}</span>
                </div>
                <div class="gznr">
                    {{item.description}}
                </div>
                </div>
            </div>

            <div class="tjgzjl" @click="toUrl('bianjigongzuojinli')">
            添加工作经历
            </div>
            <load-more v-show="loadMoreStatus.show" :show-loading="loadMoreStatus.showLoading" :tip="loadMoreStatus.tip" class="loadMore"></load-more>
        </div>
    </scroller>

    <toast v-model="toastShow" type="text" :text="toastText" width="4em"></toast>
    <loading :show="loadingShow" text="提交中"></loading>
  </div>
</template>

<script>
import {Scroller,LoadMore,Toast,Loading} from 'vux'
  export default {
    components:{
        Scroller,
        LoadMore,
        Toast,
        Loading
    },
    props:{
        lockX:{
            type:Boolean,
            default:true
        },
        lockY:{
            type:Boolean,
            default:false
        }
    },
    data: function () {
      return {
        height:"",
        toastShow:false,
        toastText:"",
        list:[],
        list_id:null,
        user:null,
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
        loadingShow:false,
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
    created(){
        var _self = this;
        var user = common.getObjStorage("userInfo") || {};
        if( !common.isNull(user._id) ){
            _self.user_id = user._id;
            _self.loadData();
            // _self.initData();
        } else {
            console.log('user_id is null');
            _self.$router.push({name:'login'});
        }
    },
    mounted(){
        let fontSize = getComputedStyle(document.getElementsByTagName('body')[0]).fontSize;
        console.log(fontSize);
        this.height ='-' + parseInt(fontSize.replace('px','')*1.2)
        console.log('height',this.height);
    },
    methods: {
        goback () {
            common.setStorage('fromWorkExp',1)
            this.$router.goBack()
        },
        toUrl: function (pagename) {
            this.$router.push({name: pagename})
        },
        nextStep(){
            // common.setStorage('resumeParams2',this.list);
            this.toUrl('qiwanggongzuo');
           
        },
        showToast(msg){
            this.toastShow = true;
            this.toastText = msg;
        },
        loadData(){
            let _self = this;
            let params = {
                interfaceId:common.interfaceIds.queryList,
                coll:common.collections.workExperiences,
                where:{
                    user_id:_self.user_id
                },
                pageNo:_self.pagination.pageNo,
                pageSize:_self.pagination.pageSize
            };
            _self.$axios.post('/mongoApi', {
                params: params
                }, response => {
                    console.log(response);
                    let data = response.data
                    _self.setData(data);                 
                });
        },
        setData(data){
            console.log('设置数据');
            let _self = this;
            _self.$refs.scroller.enablePullup();
            let list = data.datalist|| [];
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
                if(!data.datalist) {
                    _self.loadMoreStatus.show=true;
                    _self.loadMoreStatus.showLoading=false;
                    _self.loadMoreStatus.tip=_self.loadMoreStatus.tipNoData;
                    _self.$refs.scroller.disablePullup();
                    return
                }
                _self.list.push(...data.datalist);
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
        },
        edit(id){
            let _self = this;
            _self.$router.push({name:"bianjigongzuojinli",query:{id:id}});
        }
    }
  }
</script>
<style scoped>
  @import '../../../static/css/meow/gongzuojingli.css';
  .scroller{
      background:#F2F2F2;
  }
</style>
