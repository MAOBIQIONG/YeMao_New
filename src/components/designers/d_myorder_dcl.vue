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
                <div class="ds-top" @click="toDetails(item)">
                    <div class="ds-img" :style="{backgroundImage:`url(${checkImg(item.imgs[0])})`}"  v-if="item.imgs"></div>
                    <div class="ds-jianjie">
                        <div class="jianjie-top">
                            {{item.project_title}}
                        </div>
                        <div class="jianjie-bottom">
                            <div class="db-leixin">
                                <span>{{item.project_type | designType}}</span> <span class="yuan">￥</span><span class="yuan">{{item.project_budget}}</span>
                            </div>
                            <!--状态信息-->
                            <div ref="statetip">
                                <div v-if="isNull(item.project_winBidder)" class="db-djs">抢单中</div>
                                <template v-else >
                                    <template v-if="item.project_winBidder === user_id">
                                        <div class="db-djs" v-if="item.project_state==2">等待雇主确认订单</div>
                                        <div class="db-djs" v-else-if="item.project_state==3">等待雇主支付</div>
                                        <div class="db-djs" v-else>等待设计师完善订单</div>
                                    </template>
                                    <div class="db-djs" v-else>抢单失败</div>
                                </template>
                            </div>

                        </div>
                    </div>
                </div>
                <!-- <div class="od-renshu myorder">
                    <div class="tu"></div>
                    <p v-if="item.bidders.length>0"><span style="color:red">{{item.bidders.length}}</span>位设计师抢单</p>
                    <p v-if="item.bidders.length==0">还没有设计师抢单</p>
                </div> -->
                <!--按钮状态-->
                <div class="ds-bottom">
                    <div class="db-right" ref="buttons">
                        <template  v-if="!isNull(item.project_winBidder)" >
                            <template v-if="item.project_winBidder === user_id" >
                                <template v-if="item.project_state==1">
                                    <div class="db-qrdd" @click="improveTheOrder(item._id)">完善订单</div>
                                    <div class="db-qrdd"  v-tap="{methods:showConfirm,id:item._id,type:'confirmTheOrderByDesigner'}">确认订单</div>
                                </template>
                            </template>
                            <template v-else>
                                <div class="db-qxdd" v-tap="{methods:showConfirm,id:item._id,type:'canclePart'}" >取消抢单</div>
                            </template>
                        </template>

                        <template v-else>
                            <div class="db-qxdd" v-tap="{methods:showConfirm,id:item._id,type:'canclePart'}" >取消抢单</div>
                        </template>
                    </div>
                </div>
            </div>
            <load-more v-show="loadMoreStatus.show" :show-loading="loadMoreStatus.showLoading" :tip="loadMoreStatus.tip" class="loadMore"></load-more>
            <toast v-model="showMark" :time="1000" type="text" width="5rem">{{showMsg}}</toast>
            <div v-transfer-dom>
                <confirm v-model="confirmShow"
                    @on-confirm = "compOnConfirm()"
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
        // console.log('created');
        var _self = this;
        var user = common.getObjStorage("userInfo") || {};
        if( !common.isNull(user._id) ){
            _self.user_id = user._id;
        } else {
            console.log('user_id is null');
        }
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
            confirmType:"",//confirmTheOrderByDesigner 设计师确认订单
            cancel_id:null,
            order_id:null,
            orderList: [],
            user_id:null,
            pagination: {
                pageNo: 0,
                pageSize: 10
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
        showToast(msg){
            this.showMark = true;
            this.showMsg = msg;
        },
         // 详情页
        toDetails (item) {
            let buttonState = {
                user_type:"designer",
                state:'dcl',
                btns_type:-1,
            };
            //判断是否已选择设计师
            if(!this.isNull(item.project_winBidder)){
                if(item.project_winBidder===this.user_id){
                    if(item.project_state==1) {
                        buttonState.btns_type = 1;
                    }             
                } else{
                    if(item.project_state==1) {
                        buttonState.btns_type = 2;
                    }    
                }         
            } else {
                buttonState.btns_type = 3;
            }
            common.setStorage('buttonState',buttonState);
            this.$router.push({name: 'daichulixq', query: {id: item._id}})
        },
        improveTheOrder(id){
            this.$router.push({name:'fabudingdan',query:{id:id,improve:1}});
        },
        isNull(data){
            return common.isNull(data);
        },
        checkImg(path){
          return common.getDefultImg(path);
        },
        cancelOrder(){
            let _self = this;
            var params = {
                interfaceId:common.interfaceIds.updateData,
                coll:common.collections.orderList,
                wheredata:{
                    _id:_self.cancel_id
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
                        _self.renderAfterCanceled();
                    } else {
                        _self.showToast('取消失败联系管理员');
                    }
                })
        },
        toParts: function (param) {
            this.$router.push({name: 'emporderparts', query: {id: param.id, uid: param.uid,}})
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
//混合两个对象返回新对象eg:let d = mix(protoObject).w(toObject)
        mix(protoObject,ifNeedPropProto=false){
            let w =function(toObject){
                //以protoObject为原型以toObject属性为自有属性创建新的对象
                let d = Object.create(protoObject,Object.getOwnPropertyDescriptors(toObject))
                //将原型属性赋值于自有属性
                if(ifNeedPropProto){
                    for (var k in d){
                        d[k] = d[k]
                    }
                }
                return d;
            };
            return {
                w
            }
        },
        //两个对象数组根据字段合并，返回合并后数组
        //o1:{arr:[],field:''}
        arryLeftJoin(o1,o2){
            // console.log(o1,o2);
            let _self = this;
            let result = [];
            if(common.isArray(o1.arr) && common.isArray(o2.arr)){
                for(let r1 of o1.arr){
                    r1.sub = new Array();
                    for(let r2 of o2.arr){
                        if(r1[o1.field]==r2[o2.field]){
                            // console.log(r1[o1.field],r2[o2.field]);
                            r1.sub.push(r2);
                        }
                    }
                    // console.log(r1.sub);
                    result.push(r1);
                }
                return result;
            } else {
                throw new Error("参数格式mergeData(o1:{arr:[],field:''},o2:{arr:[],field:''})")
            }
        },
        //获取数据
        loadData(){
            let _self = this;
            // console.log(_self.pagination.pageNo,_self.pagination.pageSize);
            _self.loadMoreStatus.tip= _self.loadMoreStatus.tipLoading;
            let user_info=JSON.parse(common.op_localStorage().get('userInfo'));
            let user_id = user_info._id;
            let params = {
                interfaceId:common.interfaceIds.getDesignerOrders,
                pageNo: _self.pagination.pageNo,
                pageSize: _self.pagination.pageSize
            };
            params.where = {
                user_id
            };
            // console.log("user_id",user_id);
            // console.log("user_info",user_info);
            this.$axios.post('/mongoApi',{
                params
            },(response)=>{
                let data = response.data;
                _self.setData(data);
                // console.log("+++++++++++++");
                 console.log(response);
                // console.log("=============");
            })
        },
        setData(data){
            let _self = this;
            _self.$refs.scroller.enablePullup();
             // 订单
            let orderBidders = data.orderBidders || [];//参与人记录
            let orderList = data.orderList || [];
            let list = _self.arryLeftJoin({arr:orderList,field:'_id'},{arr:orderBidders,field:'order_id'});
            //判断页码是否为0
            if(_self.pagination.pageNo == 0) {
                _self.orderList = list;
            } else {
                _self.orderList.push(...list);
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
        },
        confirmTheOrderByDesigner(){
            let state = 2;
            this.updateOrderState({state})
        },
        updateOrderState(params){
            // console.log(param.id);
            var _self = this;
            var params = {
                interfaceId:common.interfaceIds.updateData,
                coll:common.collections.orderList,
                wheredata:{
                    _id:_self.order_id
                },
                data:{
                    $set: {
                        project_state: params.state, // 取消
                    }
                }
            };
            _self.$axios.post('/mongoApi', {
                params: params
                }, response => {
                    console.log(response)
                    var data = response.data;
                    if( data.ok > 0 ){
                        if(this.confirmType =="confirmTheOrderByDesigner"){
                            _self.showToast('等待雇主确认订单');
                            _self.refreshPageDate();
                        }
                        setTimeout(()=>{
                            this.$parent.index=0;
                        },100);
                    } else {
                        _self.showToast('取消失败联系管理员');
                    }
                })
        },
        canclePart(){
            var _self = this;
            var params = {
            interfaceId:common.interfaceIds.competiteAnOrder,
                data:{
                    order_id: _self.order_id,
                    user_id: _self.user_id,
                }
            }
            _self.$axios.post('/mongoApi', {
            params: params
            }, response => {
            var data = response.data;
            if( data && data.code == 200 ){
                _self.$store.state.indexRefreshMark = 1;
                _self.showToast("取消成功！");
                _self.cancelPart_dom();
            }else{
                _self.showToast("取消失败！");
            }
            })
        },
        cancelPart_dom(){
            let _self = this;
            let index = 0;
            for (let r of _self.orderList) {
                if(r._id == _self.order_id){
                    _self.orderList.splice(index,1);
                }
                index++
            }
        },
        showConfirm(params){
            this.confirmShow = true;
            this.order_id = params.id;
            this.confirmType = params.type
            if(params.type == "confirmTheOrderByDesigner"){
                this.confirmMsg = "确定该订单吗？"
            } 
            if(params.type == "canclePart"){
                this.confirmMsg = "确定取消抢单吗？"
            } 
        },
        compOnConfirm(){
            if(this.confirmType=="confirmTheOrderByDesigner"){
                this.confirmTheOrderByDesigner();
            } else if(this.confirmType=="canclePart"){
                this.canclePart();
            }
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


