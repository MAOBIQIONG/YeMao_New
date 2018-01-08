<template>
    <div id="dcl">
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
            <div class="ddlist-sjsdai" v-for="item in orderList" :key="item._id">
                <div class="ds-top" @click="toUrl('daichulixq')">
                    <div class="ds-img">
                        <img src="../../../static/images/bj.jpg">
                    </div>
                    <div class="ds-jianjie">
                        <div class="jianjie-top">
                        已有多年建筑设计工作经验{{item._id}}
                        </div>
                        <div class="jianjie-bottom">
                            <div class="db-leixin">
                                <span>建筑设计</span> <span class="yuan">￥</span><span class="yuan">50000</span>
                            </div>
                            <div class="db-djs">7天后截止报名</div>
                        </div>
                    </div>
                </div>
                <div class="ds-bottom">
                    <div class="db-right">
                        <div class="db-qxdd">取消订单</div>
                        <div class="db-sxdd">刷新订单</div>
                        <div class="db-qrdd">确认订单</div>
                    </div>
                </div>
            </div>
            <load-more v-show="loadMoreStatus.show" :show-loading="loadMoreStatus.showLoading" :tip="loadMoreStatus.tip" class="loadMore"></load-more>
        </div>

    </scroller>


  </div>
</template>
<script>
import {Scroller,LoadMore} from 'vux'
export default {
    name:"scroll-list",
    components:{
        Scroller,
        LoadMore
    },
    created(){
        console.log('created');
        setTimeout(()=>{this.loadData()},1);
    },
    mounted(){
        console.log('mounted');
        this.$nextTick(
            ()=>{
                this.$refs.scroller.disablePullup();
                this.$refs.scroller.reset({top:0});
                this.dealDom();
            }
        );
        
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
            default:"-96"
        }
    },
    data(){
        return {
            orderList: [],
            pagination: {
                pageNo: 0,
                pageSize: 3
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
            hasMore:true
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
    methods:{
        toUrl: function (params) {
            // this.$router.push({name: params.pagename})
            console.log("toUrl",params);
        },
        dealDom(){         
            let scroller = $('div[id^="vux-scroller-"]');
            // console.log(scroller)
            // scroller.css({
            //     "border":"2px solid red",
            // });
            scroller.on('touchmove',function(e){
                let touch = e.touches[0];
                console.log(touch.pageX,touch.pageY);

            });
        },
        //获取数据
        loadData(){      
            let _self = this;
            console.log(_self.pagination.pageNo,_self.pagination.pageSize);
            _self.loadMoreStatus.tip= _self.loadMoreStatus.tipLoading;
            let user_info=JSON.parse(common.op_localStorage().get('userInfo'));
            let user_id = user_info._id;
            let params = {
                interfaceId:common.interfaceIds.getOrderList,
                user_id,
                pageNo: _self.pagination.pageNo,
                pageSize: _self.pagination.pageSize
            }
            // console.log("user_id",user_id);
            // console.log("user_info",user_info);
            this.$axios.post('/mongoApi',{
                params
            },(response)=>{
                let data = response.data;
                _self.setData(data);
                console.log("+++++++++++++");
                console.log(response);
                console.log("=============");
                console.log("-------------");   
            })
        },
        setData(data){
            let _self = this;
            _self.$refs.scroller.enablePullup();
            let orderList = data.orderList;
            if(_self.pagination.pageNo == 0) {
                _self.orderList = orderList;
            } else {
                _self.orderList.push(...data.orderList);
            }
            _self.loadMoreStatus.show=false;
            _self.loadMoreStatus.showLoading=false;                  
            _self.$refs.scroller.donePulldown();
            _self.$refs.scroller.donePullup();   
            //判断数据是否有一页
            if(orderList.length < _self.pagination.pageSize){
                _self.hasMore = false;
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
            _self.hasMore = true;
            _self.loadMoreStatus.show=false;
            _self.$refs.scroller.enablePullup();
            _self.$refs.scroller.donePullup();   
            setTimeout(()=>{
                _self.loadData();
                },1000);  
        },
        //上拉加载
        loadMore(){
            let _self = this;
            setTimeout(()=>{
                _self.loadData()
                },1000);  
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
<style>
.xs-plugin-pullup-container{
    line-height:60px!important;
}
/* .loadMore{
    border:2px solid rgb(120, 120, 190);
    height:60px;
} */
/* .scroller{
    border:2px solid red;
} */
</style>


