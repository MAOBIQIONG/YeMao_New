<template>
  <div >
    <tixianchenggong :tixianchenggong="recommendArray" heading="提现成功"></tixianchenggong>
    <!--&lt;!&ndash;头部导航&ndash;&gt;-->
    <!--<div class="header">-->
      <!--<span>提现成功</span>-->
    <!--</div>-->
    <!--&lt;!&ndash;发布订单内容&ndash;&gt;-->
    <!--<div class="content">-->
      <!--<div class="cgzt">-->
        <!--<div class="tupiao">-->
          <!--<img src="../../../static/images/designer/txcg.png" />-->
        <!--</div>-->
        <!--<div class="wzsm">-->
          <!--提现成功-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="anniu">-->
        <!--<div class="fhsy"@click="toUrl('index')">-->
          <!--返回首页-->
        <!--</div>-->
        <!--<div class="ckdd"@click="toUrl('mymoney')">-->
          <!--查看钱包-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>
  import tixianchenggong from '../../components/tixianchenggong/tixianchenggong.vue'
  export default {
    // 引入组件
    components:{
      tixianchenggong,
    },
    data () {
      return {
        recommendArray:'提现成功',
      }
    },
    mounted: function () {
    },
    methods: {
      goback(){
        this.$router.goBack();
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../assets/css/designer/tixianchenggong.css';
</style>
