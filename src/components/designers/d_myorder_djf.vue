<template>
    <div id="dcl">
    <scroller2
        v-model="pullUpDownStatus"
        :height="height"
        :lock-x="lockX"
        :lock-y="lockY"
        :use-pulldown="true" 
        :use-pullup="true" 
        :pulldown-config="pulldownConfig"
        :pullup-config = "pullupConfig"
        :enableHorizontalSwiping="true"
        @on-scroll="scroll"
        @on-scroll-bottom="onScrollBottom"
        @on-pulldown-loading="pullDownLoading"
        @on-pullup-loading="pullUpLoading"
        @on-slide-next="onSlideNext"
        @on-slide-previous="onSlidePrevious"
        ref="scroller"
        :class="{scroller:true}"
    >
        <div>
            <div class="ddlist-sjsdai" v-for="item in orderList" :key="item._id">
                <div class="ds-top" @click="toDetails(item._id)">
                    <div class="ds-img" :style="{backgroundImage:`url(${checkImg(item.imgs[0])})`}">
                    </div>
                    <div class="ds-jianjie">
                        <div class="jianjie-top">
                            {{item.project_describe}}
                        </div>
                        <div class="jianjie-bottom">
                            <div class="db-leixin">
                                <span>{{item.project_type | designType}}</span> <span class="yuan">￥</span><span class="yuan">{{item.project_budget}}</span>
                            </div>
                            
                            <div class="db-djs" v-if="item.project_state==4">待交付</div>
                            <div class="db-djs" v-if="item.project_state==5">交付中</div>
                        </div>
                    </div>
                </div>
                <div class="ds-bottom">
                    <div class="db-right">
                        <div class="db-sxdd">一键会审</div>
                        <div class="db-qrdd" v-tap="{methods:updateOrderState,id:item._id}" v-if="item.project_state==4">提交设计</div>
                    </div>
                </div>
            </div>
            <load-more v-show="loadMoreStatus.show" :show-loading="loadMoreStatus.showLoading" :tip="loadMoreStatus.tip" class="loadMore"></load-more>
            <toast v-model="showMark" :time="1000" type="text" width="5rem">{{showMsg}}</toast>
            <div v-transfer-dom>
                <confirm v-model="confirmShow"
                    @on-confirm = "cancelOrder()"
                >
                <p style="text-align:center;">{{confirmMsg}}</p>
                </confirm>
            </div>
        </div>
    </scroller2>
    <!-- <div class="noOrder">
        您还没有相关订单
    </div> -->

  </div>
</template>
<script>
import {LoadMore,Toast,Confirm,TransferDomDirective as TransferDom} from 'vux'
import scroller2 from '@/components/scroller2'
export default {
    name:"scroll-list",
    directives: {
        TransferDom
    },
    components:{
        LoadMore,
        Toast,
        Confirm,
        scroller2
    },
    created(){
        console.log('created');
        this.loadData();
    },
    mounted(){
        console.log('mounted');
        this.$nextTick(
            ()=>{
                this.$refs.scroller.disablePullup();
                this.$refs.scroller.reset({top:0});
                // this.dealDom();
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
            default:"-90"
        }
    },
    data(){
        return {
            order_id:null,
            orderList: [],
            pagination: {
                pageNo: 0,
                pageSize: 6
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
            hasMore:true,
            showMark:false,
            showMsg:"",
            confirmShow:false,
            confirmMsg:"确定要取消该订单吗",
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
    filters:{
        dateDiff(date){
            let today = `${new Date().getUTCFullYear()}-${new Date().getUTCMonth()+1}-${new Date().getUTCDate()}`
            //计算天数差的函数，通用  
            let DateDiff=function(sDate1,  sDate2){    //sDate1和sDate2是2002-12-18格式  
                var  aDate,  oDate1,  oDate2,  iDays  
                aDate  =  sDate1.split("-")  
                oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])    //转换为12-18-2002格式  
                aDate  =  sDate2.split("-")  
                oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])  
                iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24)
                if (iDays == 0) return '抢单结束'    //把相差的毫秒数转换为天数  
                return  iDays + "天后截止报名"  
            }
            return DateDiff(date,today);
        },
        designType(id){
            for (let item of common.getProjectTypes()){
                if (id == item._id) {
                    return item.type_name
                }
            }
        }
    },
    methods:{
        toUrl: function (params) {
            this.$router.push({name: params})
            console.log("toUrl",params);
        },
         // 详情页
        toDetails (id) {
            this.$router.push({name: 'daichulixq', query: {id: id}})
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
        checkImg(path){
          return common.getDefultImg(path);
        },
        showToast(msg){
            this.showMark = true;
            this.showMsg = msg;
        },
         renderAfterOperate(){
            let _self = this;
            let index = 0;
            for (let r of _self.orderList) {
                console.log(_self.orderList[index]);
                if(r._id == _self.order_id){
                    _self.orderList[index].project_state = 5;
                }
                index++
            }
        },
        updateOrderState(p){
            // console.log(param.id);
            var _self = this;
            _self.order_id = p.id;
            var params = {
                interfaceId:common.interfaceIds.updateData,
                coll:common.collections.orderList,
                wheredata:{
                    _id:_self.order_id,
                },
                data:{
                    $set: {
                        project_state: 5, //交付中
                    }
                }
            };
            _self.$axios.post('/mongoApi', {
                params: params
                }, response => {
                    console.log(response)
                    var data = response.data;
                    if( data.ok > 0 ){
                        _self.showToast('已提交请等待确认');
                        _self.renderAfterOperate();
                        
                    } else {
                        _self.showToast('取消失败联系管理员');
                    }
                })
        },
        //获取数据
        loadData(){      
            let _self = this;
            // console.log(_self.pagination.pageNo,_self.pagination.pageSize);
            _self.loadMoreStatus.tip= _self.loadMoreStatus.tipLoading;
            let user_info=JSON.parse(common.op_localStorage().get('userInfo'));
            let user_id = user_info._id;
            let params = {
                interfaceId:common.interfaceIds.getOrderList,        
                pageNo: _self.pagination.pageNo,
                pageSize: _self.pagination.pageSize
            };
            params.where = {
                project_winBidder:user_id,
                project_state:{$lt :7, $gte : 4}
            };
            // console.log("user_id",user_id);
            // console.log("user_info",user_info);
            this.$axios.post('/mongoApi',{
                params
            },(response)=>{
                let data = response.data;
                _self.setData(data);
                // console.log("+++++++++++++");
                // console.log(response);
                // console.log("=============");
                // console.log("-------------");   
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
            _self.$refs.scroller.donePullup();   
            _self.loadData();
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
        onSlidePrevious(){
            this.$emit('on-slide-previous')
        },
        onSlideNext(){
            this.$emit('on-slide-next')
        }
    }
}
</script>

