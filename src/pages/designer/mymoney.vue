<template>
  <div >
    <!--头部导航-->
    <div class="header">
      <div class="header-left" v-tap="{methods:goback}"><img src="../../../static/images/back.png" /></div>
      <span>我的钱包</span>
      <div class="header-right "@click="toUrl('tixian')">提现</div>
    </div>
    <div class="content">
      <div class="jinge-top">
        <div class="biaoti">
          <div class="duoshao">钱包余额（元）</div>
          <div class="yanjin" :class="eyes==false ? 'eyes_closed' : 'eyes_open'" v-tap="{methods: eyesFun}"></div>
        </div>
        <div class="shumu">{{account_money}}</div>
      </div>
      <div class="srqk">
        <ul>
          <li>
            <p class="timu">近30天收入</p>
            <p>{{toMoney(income)}}</p>
          </li>
          <li>
            <p class="timu">累计收入</p>
            <p>{{toMoney(user.cumulative_income)}}</p>
          </li>
        </ul>
      </div>
      <div class="list"@click="toUrl('shouzhiminxi')">
        <div class="tupiao"><img src="../../../static/images/designer/qianbao.png"></div>
        <div class="xingxi">钱包明细</div>
        <div class="list-right"><img src="../../../static/images/jiangou.png"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        user_id: '',
        eyes: false,
        account_money: '******',
        income: '',
        user: {
          account_balance: '',
          cumulative_income: ''
        }
      }
    },
    created: function () {
      console.log("created:")
      // 用户信息
      var user = common.getObjStorage("userInfo");
      this.user_id = user._id;
      this.initData();
    },
    methods: {
      goback(){
        this.$router.goBack();
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
      // 获取某天
      getSomeday: function (num) {
        return common.getSomeday(num);
      },
      toMoney: function(money){
        return money;
      },
      // 眼睛显示
      eyesFun: function () {
        var _self = this;
        _self.eyes = _self.eyes == false ? true : false;
        _self.account_money = _self.eyes == false ? '******' : _self.user.account_balance;
      },

      /**
       * interface
       * */
      // 初始化
      initData () {
        var _self = this
        var params = {
          interfaceId: common.interfaceIds.getMyPurse,
          user_id: _self.user_id,
        }
        console.log("params:"+JSON.stringify(params))
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          console.log(response);
          var data = response.data;
          if ( data ) {
            _self.user = data.user || {};
            _self.income = data.income;
          }
        })
      },

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../static/css/designer/my-money.css';
  .eyes_closed{
    background: url(../../../static/images/designer/q_01.png) no-repeat;
  }
  .eyes_open{
    background: url(../../../static/images/designer/q_02.png) no-repeat;
  }
</style>
