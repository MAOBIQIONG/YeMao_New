<template>
  <div >
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="toUrl('designer')"><img src="../../../static/images/back.png" /></div>
      <span>我的钱包</span>
      <div class="header-right"@click="toUrl('tixian')">提现</div>
    </div>
    <div class="content">
      <div class="jinge-top">
        <div class="biaoti">
          <div class="duoshao">钱包余额（元）</div>
          <div class="yanjin">

          </div>
        </div>
        <div class="shumu">
          0.00
        </div>
      </div>
      <div class="srqk">
        <ul>
          <li>
            <p class="timu">近30天收入</p>
            <p>0.00</p>
          </li>
          <li>
            <p class="timu">累计收入</p>
            <p>0.00</p>
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

      }
    },
    mounted: function () {
      this. yanjing();
    },
    methods: {
      goback(){
        this.$router.goBack();
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
//      眼睛显示
      yanjing(){
        var falg=true;
        var neirong = $(".shumu").text();
        $(".yanjin").click(function(){
          if(falg==true){
            $(".yanjin").css('background-image','url(../../../static/images/designer/q_01.png)')
            $(".shumu").html('******')
            falg=false
          }else if(falg==false){
            $(".yanjin").css('background-image','url(../../../static/images/designer/q_02.png)')
            $(".shumu").html(neirong)
            falg=true
          }
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../assets/css/designer/my-money.css';
  .yanjin{
    background: url(../../../static/images/designer/q_02.png) no-repeat;
  }
</style>
