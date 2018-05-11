<template>
  <div >
    <!--头部导航-->
    <div class="header">
      <div class="header-left" v-tap="{methods:goback}"><img src="../../../static/images/back.png" /></div>
      <span>提现</span>
    </div>
    <!--内容-->
    <div class="content content-p">
      <div class="tixian">
        <div class="list">
          <div class="list-left">
            <span class="shengyu">剩余可提现金额</span>
            <span>{{user.account_balance}}</span>元
          </div>
          <div class="list-right" v-tap="{methods:setAllCash}">全额提现</div>
        </div>
        <div class="ys-time">
          <div class="qdtime">
            <div class="qdtime-left">
              <span>真实姓名</span>
            </div>
            <div class="qdtime-right">
              <input v-model="data.real_name" type="text" placeholder="请输入姓名" />
            </div>
          </div>
          <div class="qdtime">
            <div class="qdtime-left">
              <span>账号</span>
            </div>
            <div class="qdtime-right">
              <input v-model="data.bank_account" type="text" placeholder="请输入账号" />
            </div>
          </div>
        </div>
        <div class="tixianje">
          <p>提现金额</p>
          <div class="qdtime">
            <div class="qdtime-left">
              <span>￥</span>
            </div>
            <div class="qdtime-right">
              <input v-model="data.withdrawal_amount" type="text"placeholder="请输入金额" v-if="user.account_balance>0"/>
              <input type="text" placeholder="余额不足" readonly v-if="user.account_balance<=0"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 确认提现-->
    <div class="qrtx">
      <div class="txqr">
        <!--<p>温馨提示：本次提现需<span>3.00</span>元手续费</p>-->
        <p>温馨提示：本次提现需2-3个工作日到账</p>
        <div class="qrtx" v-tap="{methods:confirmFun}">确认提现</div>
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
        <p style="text-align:center;">确认提现吗?</p>
      </confirm>
    </div>
  </div>
</template>

<script>
  import { Confirm, Toast, TransferDomDirective as TransferDom } from 'vux'
  export default {
    directives: {
      TransferDom
    },
    components: {
      Toast,
      Confirm
    },
    data () {
      return {
        user: {
          account_balance: 0
        },
        data:{
          user_id: '',
          withdrawal_amount: 0,
          real_name: '',
          bank_account: '',
          state:0,
          failure_reason:''
        },
        showMark:false,
        showMsg:"",
        show: false,
      }
    },
    created: function () {
      console.log("created:")
      // 用户信息
      var user = common.getObjStorage("userInfo");
      this.data.user_id = user._id;
      this.initData();
    },
    methods: {
      /**************************************/
      onCancel () {
        console.log('on cancel')
      },
      onConfirm (msg) {
        console.log('on confirm')
        this.submit();
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
      /**************************************/
      goback(){
        this.$router.goBack();
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
      setAllCash(){
        this.data.withdrawal_amount = this.user.account_balance;
      },
      confirmFun:function () {
        var _self = this;
        if( common.isNull(_self.data.user_id) == true ){
          _self.showToast("未成功获取用户信息!");
          return
        }
        if( common.checkFloat(_self.user.account_balance)<=0 ||
          _self.user.account_balance<_self.data.withdrawal_amount ){
          _self.showToast("余额不足!");
          return
        }
        if( common.isNull(_self.data.real_name) ){
          _self.showToast("请输入真实姓名!");
          return
        }
        if( common.isNull(_self.data.bank_account) ){
          _self.showToast("请输入银行账号!");
          return
        }
        if( common.isNull(_self.data.withdrawal_amount) ){
          _self.showToast("请输入提现金额!");
          return
        }
        _self.show = true;
      },

      /**************************************/
      // 初始化
      initData () {
        var _self = this
        var params = {
          interfaceId: common.interfaceIds.getMyPurse,
          user_id: _self.data.user_id,
        }
        console.log("params:"+JSON.stringify(params))
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          console.log(response);
          var data = response.data;
          if ( data ) {
            _self.user = data.user || {};
          }
        })
      },

      submit(){
        console.log("submit:")
        var _self = this;
        var params = {
          //批量添加
          interfaceId:common.interfaceIds.addWithdrawalsRecord,
          data:_self.data
        }
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          // console.log(JSON.stringify(response))
          var data = response.data;
          if( data && data.code == 200 && data.code1 == 200 ){
            setTimeout(function () {
              _self.toUrl('tixianchenggong');
            },1000)
          }else{
            _self.showToast("提现失败！");
          }
        })
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../static/css/designer/tixian.css';
</style>
