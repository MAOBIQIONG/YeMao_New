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
                <div class="ds-top" @click="toDetails(item._id)">
                    <div class="ds-img">
                        <img src=item.imgs[0] v-if="item.imgs.length>0">
                    </div>
                    <div class="ds-jianjie">
                        <div class="jianjie-top">
                            {{item.project_describe}}
                        </div>
                        <div class="jianjie-bottom">
                            <div class="db-leixin">
                                <span>{{item.project_type | designType}}</span> <span class="yuan">￥</span><span class="yuan">{{item.project_budget}}</span>
                            </div>
                            <div class="db-djs">{{item.project_deadLine | dateDiff}}</div>
                        </div>
                    </div>
                </div>
                <!-- <div class="od-renshu myorder">
                    <div class="tu"></div>
                    <p v-if="item.bidders.length>0"><span style="color:red">{{item.bidders.length}}</span>位设计师抢单</p>
                    <p v-if="item.bidders.length==0">还没有设计师抢单</p>
                </div> -->
                <div class="ds-bottom">
                    <div class="db-right">
                        <!-- <div class="db-qxdd" v-tap="{ methods:cancelOrder, id: item._id}">取消订单</div> -->
                        <div class="db-qxdd" @click="cancelOrder({id:item._id})">取消订单</div>
                        <div class="db-sxdd">刷新订单</div>
                        <div v-if="item.bidders.length>0" class="db-qrdd" v-tap="{ methods:toParts, id: item._id, uid: item.user_id }" >选择设计师</div>
                        <div v-else class="db-qrdd">待抢单</div>
                    </div>
                </div>
            </div>
            <load-more v-show="loadMoreStatus.show" :show-loading="loadMoreStatus.showLoading" :tip="loadMoreStatus.tip" class="loadMore"></load-more>
        <toast v-model="showMark" :time="1000" type="text" width="5rem">{{showMsg}}</toast>
        </div>
    </scroller>
    <!-- <div class="noOrder">
        您还没有相关订单
    </div> -->

  </div>
</template>
<script>
import {Scroller,LoadMore,Toast} from 'vux'
export default {
    name:"scroll-list",
    components:{
        Scroller,
        LoadMore,
        Toast
    },
    created(){
        // console.log('created');
        this.loadData();
    },
    mounted(){
        // console.log('mounted');
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
        showToast(msg){
            this.showMark = true;
            this.showMsg = msg;
        },
         // 详情页
        toDetails (id) {
            this.$router.push({name: 'daichulixq', query: {id: id}})
        },
        cancelOrder(p){
            console.log(p.id,p);
            let _self = this;
            var params = {
                interfaceId:common.interfaceIds.updateData,
                coll:common.collections.orderList,
                wheredata:{
                    _id:p.id.toString()
                },
                data:{
                    $set: {
                        project_state: 9, // 取消
                    }
                }
            };
            console.log(params);
            _self.$axios.post('/mongoApi', {
                params: params
                }, response => {
                    console.log(response)
                    var data = response.data;
                    if( data.ok > 0 ){
                        _self.showToast('已取消！');
                    } else {
                        _self.showToast('取消失败联系管理员');
                    }
                })
        },
        toParts: function (param) {
            this.$router.push({name: 'emporderparts', query: {id: param.id, uid: param.uid}})
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
                project_state:{$lt :3, $gte : 0}
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
            })
        },
        setData(data){
            let _self = this;
            _self.$refs.scroller.enablePullup();
            // 订单
            let orderBidders = data.orderBidders || [];
            let bidders = data.bidders || [];
            let orderList = data.orderList || [];
            let orderUsers = data.orderUsers || [];
            orderBidders.forEach(function (b, j) {
            bidders.forEach(function (u, j) {
                if ( b.user_id == u._id ) {
                b.user_name = u.user_name;
                b.img = u.img;
                }
            })
            })
            orderList.forEach(function (item, index) {
            // 雇主
            item.user = {};
            orderUsers.forEach(function (u, j) {
                if ( item.user_id == u._id ) {
                item.user = u;
                }
            })
            // 参与人
            item.bidders = [];
            orderBidders.forEach(function (b, j) {
                if ( item._id == b.order_id ) {
                item.bidders.push(b);
                }
            })
            });
            //判断页码是否为0
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
            // console.log(_self.orderList);
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
        }

    }
}
</script>


