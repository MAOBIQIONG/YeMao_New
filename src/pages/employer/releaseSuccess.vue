<template>
  <div >
    <!-- 头部导航 -->
    <div class="header">
      <span>发布成功</span>
    </div>
    <!-- 发布订单内容 -->
    <div class="content">
      <div class="cgzt" :style="{width:'4rem'}" >
        <div class="tupiao">
          <img src="../../../static/images/designer/txcg.png" />
        </div>
        <div class="wzsm" >
          等待设计师接单
        </div>
      </div>
      <div class="anniu">
        <div class="fhsy" @click="toUrl('index')">
          返回首页
        </div>
        <div class="ckdd" @click="toMyOrder()">
          查看订单
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    // 引入组件
    data () {
      return {
        recommendArray:'发布成功',
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
      toMyOrder:function(){
        common.op_localStorage().set("fromRS",1);
        console.log(localStorage);
        this.toUrl('myorderchuli');
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../assets/css/designer/tixianchenggong.css';
</style>
