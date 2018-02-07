<template>
  <div class="xzzf">
    <div class="header">
      <div class="header-left" v-tap="{methods:goback}"><img src="../../../static/images/back.png"/></div>
      <span>支付</span>
      <div class="header-right" v-tap="{methods:goback}">完成</div>
    </div>
    <div class="content content-p">
      <div class="ddxq xzffs">
        <div class="ddxq-top">
          <div class="ddxq-img">
            <img :src='getDefultImg(order.imgs[0])'>
          </div>
          <div class="ddxq-jianjie">
            <div class="jianjie-top">{{order.project_title}}</div>
            <div class="jianjie-bottom">
              <div class="db-yushuan"><span class="yushuan">￥</span><span class="yushuan">{{order.project_budget}}</span></div>
            </div>
          </div>
        </div>
        <p>选择支付方式</p>
        <div class="ddxq-list">
          <!--<div class="ddxq-box">-->
            <!--<div class="box-left">-->
              <!--<span><img src="../../../static/images/employer/weixin.png"/></span><span>微信</span>-->
            <!--</div>-->
            <!--<div class="box-right">-->
              <!--<input v-model="pay_type" type="radio" name="zhifu" class="r" value="WX_APP" />-->
            <!--</div>-->
          <!--</div>-->
          <div class="ddxq-box">
            <div class="box-left">
              <span><img src="../../../static/images/employer/zhifubao.png"/></span><span>支付宝</span>
            </div>
            <div class="box-right">
              <input v-model="pay_type" type="radio" name="zhifu" class="r" value="ALI_APP" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ljzf" v-tap="{methods:toPay}">立即支付</div>
    <!--弹窗-->
    <toast v-model="showMark" :time="1000" type="text" width="5rem">{{showMsg}}</toast>
  </div>
</template>

<script>
  import { Toast } from 'vux'
  import beecloud from '../../../static/js/beecloud'
  export default {
    components: {
      Toast
    },
    data () {
      return {
        order_id: '',
        order: {
          imgs: []
        },
        pay_type:'',
        showMark:false,
        showMsg:"",
      }
    },
    created(){
      console.log("created:")
      var _self = this;
      _self.order_id = _self.$route.query.id;
      //支付初始化
      beecloud.init();
      //数据初始化
      _self.initData();
    },
    destroyed(){
        common.delStorage('fromMyOrderDetail');
    },
    methods: {
      goback() {
        this.$store.commit("changeIndexOrder",{index:1});
        this.$router.goBack();
      },
      toUrl(name) {
        this.$router.push({name: name});
      },
      showToast(msg){
        var _self = this;
        _self.showMsg = msg;
        _self.showMark = true;
      },
      getDefultImg(path){
        return common.getAvatar(path)
      },
      toPay(){
        var _self = this;
        console.log("pay_type:"+_self.pay_type)
        if( common.isNull(_self.pay_type) ){
          _self.showToast('请选择支付方式！');
          return;
        }else if( common.checkFloat(_self.order.project_budget) <= 0 || common.isNull(_self.order.project_title) ){
          showToast('订单信息错误,请稍后重试!');
          return;
        }else if( common.isNull(_self.order.order_number) ){
          showToast('缺少订单编号!');
          return;
        }
        var title = _self.order.project_title;
        var payData = {
          channel: _self.pay_type,
          title: title.length > 16 ? title.substring(0,12)+'...' : title,
          total_fee: common.checkFloat(_self.order.project_budget)*100,
          bill_no: _self.order.order_number,
          optional: {},
          bill_timeout: 360,
          return_url: "http://www.jianlianyemao.com/index.html"
        };
        beecloud.payReq(payData, function(result) {
          console.log("pay success:"+JSON.stringify(result))
          _self.showToast("支付成功！");
          _self.$store.commit("changeIndexOrder",{index:2});
          if(!common.isNull('fromMyOrderDetail')){
              _self.$router.go(-2);
              return;
          }
          _self.$router.go(-1);
        }, function(e) {
          console.log("pay error:"+JSON.stringify(e))
          _self.showToast("支付失败！")
        });
      },

      initData(){
        var _self = this;
        if( common.isNull(_self.order_id) ){
          showToast('订单信息错误,请稍后重试!');
          return;
        }
        var params = {
          interfaceId: common.interfaceIds.getPayInfo,
          order_id: _self.order_id
        }
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          console.log(response)
          var data = response.data;
          if( data ){
            _self.order = data.order || {imgs:[]};
          }
        });
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../../../static/css/employer/payment.css";
  .xzzf{
    position: fixed;
    width: 100%;
    height: 100%;
    background: #f2f2f2;
  }
</style>
