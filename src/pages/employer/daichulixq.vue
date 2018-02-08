<template>
  <div class="">
    <div class="header">
      <div class="header-left" @click="goback"><img src="../../../static/images/back.png" /></div>
      <span>订单详情</span>
    </div>
    <div class="content content-p">
      <!--主体内容-->
      <div class="dcl-content">
        <div class="dcl-top">
          <img v-if="order.project_state>=0&&order.project_state<3" src="../../../static/images/employer/dcl.png" />
          <img v-if="order.project_state==3" src="../../../static/images/employer/dzf.png" />
          <img v-if="order.project_state>3&&order.project_state<7" src="../../../static/images/employer/djf.png" />
          <img v-if="order.project_state==7" src="../../../static/images/employer/ywc.png" />
        </div>
        <div class="ddxq">
          <div class="ddxq-top">
            <div class="ddxq-img" @click="toViewImgs(order.imgs,order.imgs.length==0)" :style="{backgroundImage:`url(${checkImg(order.imgs[0])})`}">
              <!-- <img :src="checkImg(order.imgs[0])" v-if="order.imgs"> -->
              <div class="num">{{imgSize}}</div>
            </div>
            <div class="ddxq-jianjie">
              <div class="jianjie-top">
                {{order.project_title}}
              </div>
              <div class="jianjie-bottom">
                <div class="db-yushuan"><span>预算</span> <span class="yushuan">￥</span><span class="yushuan">{{order.project_budget}}</span></div>
                <div class="db-miaomiao"><span><img src='../../../static/images/employer/miaomiao.png'></span><span>喵喵</span></div>
              </div>
            </div>
          </div>
          <div class="ddxq-list">
            <div class="ddxq-box">
              <div class="box-left">
                <span><img src="../../../static/images/employer/07.png"/></span><span>订单类型：</span>
              </div>
              <div class="box-right">
                <span>{{order.project_type | designType}}</span>
              </div>
            </div>
            <div class="ddxq-box">
              <div class="box-left">
                <span><img src="../../../static/images/employer/05.png"/></span><span>设计面积：</span>
              </div>
              <div class="box-right">
                <span>{{order.project_area}}</span>
              </div>
            </div>
            <div class="ddxq-box">
              <div class="box-left">
                <span><img src="../../../static/images/employer/leixin.png"/></span><span>预计完成：</span>
              </div>
              <div class="box-right">
                <span>{{order.project_endTime}}</span>
              </div>
            </div>
            <div class="ddxq-box">
              <div class="box-left">
                <span><img src="../../../static/images/employer/04.png"/></span><span>交易状态：</span>
              </div>
              <div class="box-right">
                <span>{{order.project_state | getStateName}}</span>
              </div>
            </div>
            <div class="ddxq-box">
              <div class="box-left">
                <span><img src="../../../static/images/employer/02.png"/></span><span>设计深度：</span>
              </div>
              <div class="box-right">
                <span :key="index" v-for="(item,index) in order.project_depth">{{item | getDepthName}}</span>
              </div>
            </div>
            <div class="ddxq-box">
              <div class="box-left">
                <span><img src="../../../static/images/employer/03.png"/></span><span>工时：</span>
              </div>
              <div class="box-right">
                <span>{{order.project_workHours}}小时</span>
              </div>
            </div>
            <div class="ddxq-box" style="border: none;">
              <div class="box-left">
                <span><img src="../../../static/images/employer/06.png"/></span><span>地区：</span>
              </div>
              <div class="box-right">
                <span>{{order.project_region}}</span>
              </div>
            </div>
          </div>
          <div class="ddxq-bottom">
            <div class="biaoqi">订单详情</div>
            <div class="neirong">
              <span ref="project_describe">{{getMaxlen(order.project_describe)}}</span>
            </div>
            <div class="chakangengduo" v-tap="{methods:viewMoreFun}">{{viewText}}</div>
          </div>
        </div>
      </div>
      <!-- 底部按钮-->
      <div class="dcl-bottom" v-if="buttonState.btns_type!=-1">
        <!-- <div class="db-right">
          <div class="db-qxdd">取消订单</div>
          <div class="db-qrdd" v-tap="{ methods:toParts, id: order._id, uid: order.user_id }">选择设计师</div>
        </div> -->
        <template v-if="!isNull(buttonState)">
            <template v-if="buttonState.user_type=='employer'">
                <div class="db-right" v-if="buttonState.state=='dcl'">
                    <div class="db-qxdd" v-tap ="{methods:showConfirm,id:order._id,type:'cancelOrder',msg:'确定要取消该订单吗？'}">取消订单</div>
                    <template v-if="buttonState.btns_type==1">
                        <div class="db-sxdd" v-if="order.refreshFlag==1" v-tap="{methods:refreshOrders,id:order._id}">刷新订单</div>
                        <div class="db-sxdd noRefresh" v-else>刷新订单</div>
                        <div class="db-qrdd"
                            v-tap="{ methods:toParts, id: order._id, uid: order.user_id }"
                            >
                            选择设计师
                        </div>                
                    </template>
                    <template v-else-if="buttonState.btns_type==2">
                        <div v-if="order.project_state==2" class="db-qrdd" v-tap="{methods:showConfirm,id:order._id,type:'commitImprove',msg:'确认信息已完善吗？'}">
                            确认完善信息
                        </div>             
                    </template>
                    <template v-else-if="buttonState.btns_type==3">
                        <div class="db-sxdd" v-if="canRefresh(order.refresh_date)" v-tap="{methods:refreshOrders,id:order._id}">刷新订单</div>
                        <div class="db-sxdd noRefresh" v-else>刷新订单</div>          
                    </template>
                </div>
                <div class="db-right" v-if="buttonState.state=='dzf'">
                    <div class="db-qxdd" v-tap ="{methods:showConfirm,id:order._id,type:'cancelOrder',msg:'确定要取消该订单吗？'}">取消订单</div>
                    <div class="db-qrdd" @click="payOrder(order._id)">支付</div>
                </div>
                <div class="db-right" v-if="buttonState.state=='djf'">
                    <div class="db-sxdd" v-tap="{methods: toCheck, id: order._id}">一键会审</div>
                    <div v-if="order.project_state==5" class="db-qrdd" v-tap="{methods: confirmOrder, id: order._id}">确认交付</div>
                </div>
                <div class="db-right" v-if="buttonState.state=='ywc'">
                    <div class="db-qrdd" v-if="order.project_evaluation==0" v-tap="{methods:toStar,pagename:'orderpingjia',query:{id:order.case_id}}" >
                        立即评价
                    </div>
                </div>
            </template>
            <template v-if="buttonState.user_type=='designer'">
                <div class="db-right" v-if="buttonState.state=='dcl'">
                    <div v-if="buttonState.btns_type==1" class="db-qrdd" v-tap="{methods:improveTheOrder,id:order._id}">
                        完善信息
                    </div>      
                </div>
                <div class="db-right" v-if="buttonState.state=='djf'">
                    <div class="db-sxdd" v-tap="{methods: toCheck, id: order._id}">一键会审</div>
                    <div class="db-qrdd"  v-tap="{methods:showConfirm,id:order._id,type:'submissionDesign',msg:'确认提交设计吗'}" v-if="order.project_state==4">提交设计</div> 
                </div>
            </template>
        </template>


      </div>
    </div>
    
    <toast v-model="showMark" :time="1500" type="text" width="5rem">{{showMsg}}</toast>
    <div v-transfer-dom>
        <confirm v-model="confirmShow"
            @on-confirm = "compOnConfirm(confirmType)"
        >
        <p style="text-align:center;">{{confirmMsg}}</p>
        </confirm>
    </div>
  </div>
</template>

<script>
import {Toast,Confirm,TransferDomDirective as TransferDom} from 'vux'
  export default {
    directives: {
        TransferDom
    },
    components:{
        Toast,
        Confirm,
    },
    data () {
        return {
            order_id:null,
            //订单装填完善标志位
            improved:0,
            confirmType:"",//cancelOrder取消订单，submissionDesign提交设计，commitImprove确认完善
            user_id:null,
            userInfo:null,
            order:{
                imgs:['']
            },
            hasBidder:false,
            bidders:[],
            imgSize:0,
            viewMore:false,
            viewText:'点击查看更多',
            buttonState:'',
            confirmShow:false,
            confirmMsg:"确定要取消该订单吗",
            showMark:false,
            showMsg:"",
        }
    },
    filters:{
        designType(id){
            for (let item of common.getProjectTypes()){
                if (id == item._id) {
                    return item.type_name
                }
            }
        },
        getStringDate(date,id){
            return common.timeStamp2String(date,id)
        },
        // 项目状态
        getStateName(state){
            return common.getProjectStateName(state);
        },
         // 项目深度
        getDepthName(num){
            return num==0?"方案":num==1?"扩出":num==2?"施工":"";
        },
    },
    computed:{
        uuid(){
            return common.uuid();
        },
    },
    created(){
        var _self = this;
        _self.order_id = _self.$route.query.id;
        _self.userInfo = common.getObjStorage("userInfo") || {};
        _self.user_id = _self.userInfo._id || null;
        _self.buttonState = common.getObjStorage("buttonState") || {};
        console.log(_self.buttonState);
        _self.initData();
    //   console.log(_self.userInfo);
    },
    destroyed(){
        // common.delStorage("buttonState");
    },
    mounted: function () {
    },
    methods: {
      goback(){
        console.log('goback');
        let _self = this;
        if(common.isNull(_self.buttonState)){
            _self.$router.goBack();
            // _self.toUrl('myorderchuli');
        } else {
            if(_self.buttonState.state=="dcl"){
                if(_self.improved==1){
                    _self.$store.commit("changeIndexOrder",{index:1});
                }else {
                    _self.$store.commit("changeIndexOrder",{index:0});
                }
            } else if(_self.buttonState.state=="dzf"){
                _self.$store.commit("changeIndexOrder",{index:1});
            } else if(_self.buttonState.state=="djf"){
                _self.$store.commit("changeIndexOrder",{index:2});
            } else if(_self.buttonState.state=="ywc"){
                _self.$store.commit("changeIndexOrder",{index:3});
            } 
            _self.$router.goBack();
            // _self.toUrl('myorderchuli');        
        }            
      },

      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
      toStar(params){
          var _self = this;
          _self.$router.push({name: params.pagename,query:params.query});
          params.event.cancelBubble = true;
          params.event.stop;//阻止冒泡（原声方法）
          return false
      },
      showToast(msg){
            this.showMark = true;
            this.showMsg = msg;
      },
        canRefresh(refreshTime){
            let date = Date.parse(new Date());
            console.log(refreshTime,date);
            if((refreshTime + 1000*60*60*24)<= date){
                return true;
            } else{
                return false;
            }
        },
        payOrder(order_id){
          var _self = this;
          _self.order_id = order_id;
          _self.$router.push({name: 'payment', query: {id: order_id}})
          common.setStorage('fromMyOrderDetail',1);
        },
      toParts: function (param) {
        this.$router.push({name: 'emporderparts', query: {id: param.id, uid: param.uid}})
      },
        toViewImgs: function (imgs,notAllowed) {
            if(notAllowed) return;
            common.setStorage("od_viewImgs",imgs);
            this.$router.push({name:'emporderimgs',query:{id:this.order_id}})
        },
      // 订单详情字数限制
      getMaxlen(text){
        var width = 0.5,fontSize=0.3,lines=3;// margin:.5,font-size:.3,行数:3;
        var num = common.getMaxlenInlineNum(width,fontSize,lines);
        if( text && text.length > num ){
            text = text.substring(0,num-6) + '...';
        }
        return text;
      },
      checkImg(path){
        // console.log(common.getDefultImg(path));
        return common.getDefultImg(path);
      },
      improveTheOrder(p){
            common.setStorage('fromMyOrderDetail',1);
            this.$router.push({name:'fabudingdan',query:{id:p.id,improve:1}});
        },
      // 订单详情查看\收起
        viewMoreFun () {
            var _self = this;
            _self.viewMore = _self.viewMore==false ? true : false;
            _self.viewText = _self.viewMore==false ? '点击查看更多' : '收起';
            var desc = _self.viewMore==false ? _self.getMaxlen(_self.order.project_describe) : _self.order.project_describe;
            _self.$refs.project_describe.innerHTML = desc;
        },
        isNull(data){
            return common.isNull(data);
        },
        showConfirm(params){
            this.confirmShow = true;
            this.confirmMsg = params.msg
            this.order_id = params.id;
            this.confirmType = params.type;
        },
        renderAfterOperate(){
            let _self = this;
            _self.order.project_state = 5;
        },
        updateStateAfterImprove(){
            let p = {};
            p.state = 3;
            this.updateOrderState(p);
        },
        updateStateAfterDoneWork(){
            let p = {}
            p.state = 5;
            this.updateOrderState(p);
        },
        updateOrderState(p){
            // console.log(param.id);
            var _self = this;
            let state = p.state;
            // if(_self.order_id != _self.opr_id){
            //     console.error('订单编号错误');
            //     return;
            // }
            // console.log(p);
            // return;
            var params = {
                interfaceId:common.interfaceIds.updateData,
                coll:common.collections.orderList,
                wheredata:{
                    _id:_self.order_id
                },
                data:{
                    $set: {
                        project_state: p.state, // 取消
                    }
                }
            };
            _self.$axios.post('/mongoApi', {
                params: params
                }, response => {
                    console.log(response)
                    var data = response.data;
                    if( data.ok > 0 ){
                        if(_self.confirmType=="cancelOrder"){
                            _self.showToast('取消成功');
                        } else if (_self.confirmType=="submissionDesign"){
                            _self.showToast('提交成功！');
                        } else if (_self.confirmType=="commitImprove"){
                            _self.improved = 1;
                            _self.showToast('请前往支付！');
                        } else {
                             _self.showToast('已确认');
                        }       
                            // let buttonState = common.getObjStorage('buttonState');
                            // buttonState.state = 'dzf';
                            // common.setStorage('buttonState',buttonState);
                            setTimeout(()=>{
                                _self.goback();
                            },1500);
                    } else {
                        _self.showToast('取消失败联系管理员');
                    }
                })
        },
        /**确认交付**/
        confirmOrder(){
          var _self = this;
          var params = {
            interfaceId: common.interfaceIds.confirmDelivery,
            order_id: _self.order_id
          }
          _self.$axios.post('/mongoApi',{
            params: params
          },(response)=>{
            let data = response.data;
            if( data && data.code == 200 ){
              _self.showToast("确认成功!");
              _self.orderList.forEach(function (item,index) {
                if( param.id == item._id ){
                  _self.orderList.splice(index,1);
                }
              })
            }else{
              _self.showToast("确认失败!");
            }
          })
        },
        // 一键会审
        toCheck (params) {
          this.$router.push({name: 'yijianhuisheng', query: {id: params.id}})
        },
        refreshOrders(p){
            let _self = this;
            _self.opr_id = p.id;
            if(_self.order_id != _self.opr_id){
                console.error('订单编号错误');
                return;
            }
            var params = {
                interfaceId:common.interfaceIds.refreshOrders,
                order_id:_self.order_id,
            };
            // console.log(params);
            _self.$axios.post('/mongoApi', {
                params: params
                }, response => {
                    console.log(response)
                    var data = response.data;
                    if( data.code == 200 ){
                        _self.showToast('已刷新！');
                        _self.$store.state.indexRefreshMark = 1;
                        _self.$store.state.employerRefreshMark = 1;
                        setTimeout(()=>{
                            _self.goback();
                        },1500);
                    } else {
                        _self.showToast('取消失败联系管理员');
                    }
                });
        },
        cancelOrder(){
            let _self = this;
            // if(_self.order_id != _self.opr_id){
            //     console.error('订单编号错误');
            //     return;
            // }
            var params = {
                interfaceId:common.interfaceIds.updateData,
                coll:common.collections.orderList,
                wheredata:{
                    _id:_self.order_id
                },
                data:{
                    $set: {
                        project_state: 9, // 取消
                    }
                }
            };
            // console.log(params);
            _self.$axios.post('/mongoApi', {
                params: params
                }, response => {
                    console.log(response)
                    var data = response.data;
                    if( data.ok > 0 ){
                        _self.showToast('已取消！');
                        setTimeout(()=>{
                            _self.goback();
                        },1500);
                    } else {
                        _self.showToast('取消失败联系管理员');
                    }
                });
        },
        compOnConfirm(type){
            if(this.confirmType=="cancelOrder"){
                this.cancelOrder();
            }
            if(this.confirmType =="submissionDesign"){
                this.updateStateAfterDoneWork();
            }
            if(this.confirmType =="commitImprove"){
                this.updateStateAfterImprove();
            }
        },
      //数据初始化
        initData(){
            let _self = this;
            if( common.isNull(_self.order_id) == true ){
            return;
            }
            var params = {
                interfaceId:common.interfaceIds.getProjectDetail,
                order_id:_self.order_id,
                user_id:_self.user_id
            }
            _self.$axios.post('/mongoApi', {
                    params: params
                }, response => {
                    let data = response.data;
                    if(!data) return;
                    let order = data.order || {};
                    let orderBidders = data.orderBidders || [];
                    let bidders = data.bidders || [];
                    for(let m1 of orderBidders){
                        if(_self.user_id == m1.user_id){
                            _self.hasBidder = true;
                        }
                        for(let m2 of bidders) {
                            if(m1._id == m2._id){
                                m1.user_name = m2.user_name;
                                m1.img = m2.img
                            }
                        }
                    }
                    _self.bidder = orderBidders;
                    _self.order = order;
                    if( _self.order.imgs ){
                        _self.imgSize = _self.order.imgs.length;
                    }                 
                });
        }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../static/css/employer/daichulixq.css';
</style>
