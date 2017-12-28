<template>
  <div >
    <!--头部导航-->
    <div class="header">
      <span>{{heading}}</span>
    </div>
    <!--发布订单内容-->
    <div class="content">
      <div class="cgzt">
        <div class="tupiao">
          <img src="../../../static/images/designer/txcg.png" />
        </div>
        <div class="wzsm">
          {{tixianchenggong}}
        </div>
      </div>
      <div class="anniu">
        <div class="fhsy"@click="toUrl('index')">
          返回首页
        </div>
        <div class="ckdd"@click="toUrl('mymoney')">
          查看钱包
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:[
      'heading',
      'tixianchenggong',
    ],
    data () {
      return {

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
