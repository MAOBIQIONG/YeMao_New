<template>
  <div>
    <!--头部导航-->
    <xheader2 :title="title" :rightClass="rightClass" :collectFlag="collectFlag" @upup="collectFun"></xheader2>
    <!--主体内容-->
    <div class="od-condent">
      <!--订单确认后详情页-->
      <div class="ddxq">
        <div class="ddxq-top">
          <div class="ddxq-img" @click="toViewImgs(order.imgs)">
            <img v-if="imgSize>0" :src='order.imgs[0]'>
            <div class="num">{{imgSize}}</div>
          </div>
          <div class="ddxq-jianjie">
            <div class="jianjie-top">{{order.project_title}}</div>
            <div class="jianjie-bottom">
              <div class="db-mianji"><span>{{getNameById(order.project_type)}}</span>/<span class="mianji">500</span><span class="mianji">m²</span></div>
              <div class="db-yushuan"><span>预算</span><span class="jiage">￥</span><span class="jiage">{{order.project_budget}}</span></div>
            </div>
          </div>
        </div>
        <div class="ddxq-list">
          <div class="ddxq-box">
            <div class="box-left">
              <span><img src='../../../static/images/employer/leixin.png'></span><span>预计完成：</span>
            </div>
            <div class="box-right">
              <span>{{order.project_endTime}}</span>
            </div>
          </div>
          <div class="ddxq-box">
            <div class="box-left">
              <span><img src='../../../static/images/employer/04.png'></span><span>交易状态：</span>
            </div>
            <div class="box-right">
              <span>{{getStateName(order.project_state)}}</span>
            </div>
          </div>
          <div class="ddxq-box">
            <div class="box-left">
              <span><img src='../../../static/images/employer/02.png'></span><span>设计深度：</span>
            </div>
            <div class="box-right">
              <span v-for="item in order.project_depth">{{getDepthName(item)}}</span>
            </div>
          </div>
          <div class="ddxq-box">
            <div class="box-left">
                <span><img src='../../../static/images/employer/03.png'></span><span>工时：</span>
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
      <!--抢单列表设计师-->
      <div class="od-renshu">
        <div class="tu"></div>
        <p v-if="bidders.length>0">已有<span>{{bidders.length}}</span>位设计师抢单</p>
        <p v-if="bidders.length==0">还没有设计师抢单</p>
        <div class="gengduo" v-tap="{ methods:toParts, id: order._id, uid: order.user_id }"></div>
      </div>

      <div class="od-list" style="padding-bottom: .25rem">
        <div class="qdsjs-list"  v-for="bid in bidders" >
          <div class="qdsjs-time">
            <p>{{getStringDate(bid.create_date,'ymd')}}</p>
          </div>
          <div class="qdsjs-box">
            <div class="qb-top">
              <div class="qt-touxiang">
                <img :src='checkAvatar(bid.img)'>
              </div>
              <div class="qt-nichen">
                <span>{{bid.user_name}}</span>
              </div>
              <div class="chat"><img src='../../../static/images/employer/miaomiao.png'></div>
              <div class="qt-jiage">
                <div class="qt-time"><span>{{bid.taskTime}}小时</span></div>
                <div class="qt-jingqian"><span>￥</span><span>{{bid.quotation}}</span></div>
              </div>
            </div>
            <div class="qb-content">{{bid.schemeExplains}}</div>
            <div class="qb-botton" v-if="user_id!=null&&user_id==order.user_id" v-tap="{methods:confirmFun,uid:bid.user_id}">选择设计师</div>
          </div>
        </div>

      </div>
    </div>
    <!--底部-->
    <div class="od-botton" v-if="userInfo._id!=order.user_id">
      <div class="mmliaotian">
        <span><img src='../../../static/images/employer/miaomiao.png'></span>
        <span>喵喵聊天</span>
      </div>
      <div v-if="isPart==false" class="lijiqiangdan" v-tap="{ methods:toGrabOrder }">立即抢单</div>
      <div v-if="isPart==true" class="lijiqiangdan" v-tap="{ methods:canclePart }">取消抢单</div>
    </div>
    <!--弹窗-->
    <div class="tishikuang">
      <div class="tisi">
        收藏成功
      </div>
    </div>
    <toast v-model="showMark" :time="1000" type="text" width="5rem">{{showMsg}}</toast>
    <div v-transfer-dom>
      <confirm v-model="show"
               title="温馨提示"
               @on-cancel="onCancel"
               @on-confirm="onConfirm"
               @on-show="onShow"
               @on-hide="onHide">
        <p style="text-align:center;">确认选择该设计师吗?</p>
      </confirm>
    </div>
  </div>
</template>

<script>
  import xheader2 from '../../components/header/xheader2.vue'
  import { Confirm, Toast, TransferDomDirective as TransferDom } from 'vux'
  export default {
    directives: {
      TransferDom
    },
    components: {
      xheader2,
      Toast,
      Confirm
    },
    data () {
      return {
        title: '订单详情',
        rightClass: 'collect',
        cover: {
          backgroundImage: 'url(' + require('../../../static/images/bj.jpg') + ')'
        },
        order_id: null,
        user_id: null,
        isInit: false,
        isPart: false,
        collectFlag: 0,
        order: {},
        bidders: [],
        imgSize: 0,
        viewMore:false,
        viewText:'点击查看更多',
        showMark:false,
        showMsg:"",
        show: false,
      }
    },
    activated: function () {
      var _self = this;
      if( _self.isInit == true ){
        _self.isPart=false;
        _self.order_id = _self.$route.query.id;
        _self.userInfo = common.getObjStorage("userInfo") || {};
        _self.user_id = _self.userInfo._id || null;
        _self.initData();
      }
      _self.isInit = true;
    },
    created: function () {
      var _self = this;
      _self.order_id = _self.$route.query.id;
      _self.userInfo = common.getObjStorage("userInfo") || {};
      _self.user_id = _self.userInfo._id || null;
      _self.initData();
    },
    methods: {
      /**************************************/
      onCancel () {
        console.log('on cancel')
      },
      onConfirm (msg) {
        console.log('on confirm')
        this.chooseDesigner();
        // if (msg) {
          // alert(msg)
        // }
      },
      onHide () {
        console.log('on hide')
      },
      onShow () {
        console.log('on show')
      },
      showToast(msg){
        this.showMark = true;
        this.showMsg = msg;
      },

      /**************************/
      goback () {
        this.$router.goBack()
      },
      toUrl: function (param) {
        this.$router.push({name: param.pagename,query:{id:this.order_id}})
      },
      toParts: function (param) {
        this.$router.push({name: 'emporderparts', query: {id: param.id, uid: param.uid}})
      },
      toViewImgs: function (imgs) {
        common.setStorage("viewImgs",imgs);
        this.$router.push({name:'emporderimgs',query:{id:this.order_id}})
      },
      // 抢单
      toGrabOrder () {
        var userInfo = common.getObjStorage('userInfo') || {};
        if ( common.isNull(userInfo._id) == true ) { // 未登录
          this.$router.push({name: 'login'})
        } else {
          this.$router.push({name: 'orderqiangdan', query: {id: this.order_id}});
        }
      },
      // 时间戳转字符串
      getStringDate(date,id){
        return common.timeStamp2String(date,id)
      },
      //项目类型名称
      getNameById(id){
        return common.getNameByTypeId(id);
      },
      //头像
      checkAvatar(path){
        return common.getAvatar(path);
      },
      // 项目深度
      getDepthName(num){
        return num==0?"方案":num==1?"扩出":num==2?"施工":"";
      },
      // 项目状态
      getStateName(state){
        return common.getProjectStateName(state);
      },

      // 订单详情字数限制
      getMaxlen(text){
        var width = 0.5,fontSize=0.3,lines=3;// margin:.5,font-size:.3,行数:3;
        var num = common.getMaxlenInlineNum(width,fontSize,lines);
        if( text && text.length > num ){
          text = text.substring(0,num-2) + '...';
        }
        return text;
      },

      // 订单详情查看\收起
      viewMoreFun () {
        var _self = this;
        _self.viewMore = _self.viewMore==false ? true : false;
        _self.viewText = _self.viewMore==false ? '点击查看更多' : '收起';
        var desc = _self.viewMore==false ? _self.getMaxlen(_self.order.project_describe) : _self.order.project_describe;
        _self.$refs.project_describe.innerHTML = desc;
      },
      // 项目深度
      collectFun(flag){
        this.collectFlag = flag;
        this.collect();
      },
      // 选择设计师
      confirmFun(param){
        this.show = true;
        this.project_winBidder = param.uid; // 项目中标人
      },

      /*******************************/
      // 初始化数据
      initData(){
        var _self = this;
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
          console.log(response)
          var data = response.data;
          if( data ){
            _self.collectFlag = data.collectFlag;
            //订单
            var order = data.order || {};
            var orderBidders = data.orderBidders || [];
            var bidders = data.bidders || [];
            orderBidders.forEach(function (b,j) {
              if( _self.userInfo._id == b.user_id ){
                _self.isPart = true;
              }
              bidders.forEach(function (u,j) {
                if( b.user_id == u._id ){
                  b.user_name = u.user_name;
                  b.img = u.img;
                }
              })
            })
            _self.bidders = orderBidders;
            _self.order = order;
            if( _self.order.imgs ){
              _self.imgSize = _self.order.imgs.length;
            }
          }
        })
      },

      // 取消抢单
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
            _self.isPart=false;
            _self.bidders.forEach(function (item,index) {
              if( _self.user_id == item.user_id ){
                _self.bidders.splice(index,1);
              }
            })
            _self.showToast("取消成功！");
          }else{
            _self.showToast("取消失败！");
          }
        })
      },

      // 收藏
      collect(){
        var _self = this;
        var params = {
          interfaceId:common.interfaceIds.collect,
          data:{
            collect_type: 0,
            collect_id: _self.order_id,
            user_id: _self.user_id,
            is_del: _self.collectFlag
          }
        }
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          var data = response.data;
          var tips = '';
          if( data && data.code == 200 ){
            tips = _self.collectFlag == 0 ? '取消成功！' : '收藏成功！';
          }else{
            tips = _self.collectFlag == 0 ? '取消失败！' : '收藏失败！';
          }
          _self.showToast(tips);
        })
      },

      // 选择设计师
      chooseDesigner(){
        var _self = this;
        var params = {
          interfaceId:common.interfaceIds.updateData,
          coll:common.collections.orderList,
          wheredata:{
            _id: _self.order_id
          },
          data:{
            $set: {
              project_winBidder: _self.project_winBidder,
              project_state: 1, // 抢单中
            }
          }
        }
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          console.log(response)
          var data = response.data;
          if( data.ok > 0 ){
            _self.$store.state.indexRefreshMark = 1;
            _self.$store.state.employerRefreshMark = 1;
            _self.showToast('选择成功！');
            setTimeout(function () {
              _self.goback();
            },1000)
          }
        })
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../static/css/employer/order.css';
  .od-condent .od-renshu .tu {
    background: url('../../../static/images/timer.png') left center no-repeat;
    background-size: .5rem .5rem;
  }
  .od-condent .od-renshu .gengduo {
    background: url('../../../static/images/more.png') center center no-repeat;
    background-size: .5rem .5rem;
  }
  .tishikuang .tisi {
    position: fixed;
    width: 2rem;
    height: 1.2rem;
    border-radius: 0.1rem;
    background: #8d8d8d;
    text-align: center;
    line-height: 1.2rem;
    color: white;
    left:2.75rem;
    top: 30%;
    font-size: 0.32rem;
    display: none;
  }
</style>
