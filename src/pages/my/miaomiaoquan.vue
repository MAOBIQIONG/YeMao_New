<template>
  <div class="miaomiao">
    <!--头部导航-->
    <div class="header p-static">
      <div class="header-left img-back" v-tap="{methods:goback}"></div>
      <span>喵喵圈</span>
    </div>
    <!--  喵喵列表-->
    <div class="content">
      <meows :height="height"></meows>
    </div>
  </div>
</template>

<script>
  // 引入子组件
  import meows from '../../components/my/meows.vue';

  export default {
    components: {
      meows,
    },
    data() {
      return {
        height: '-40px'
      }
    },
    methods: {
      goback() {
        this.$router.goBack()
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../static/css/meow/miaomiao.css';
  .miaomiao {
    width:7.5rem;
    position: fixed;
  }
  .content{
    width: 7.5rem;
  }
  .miao {
    margin-top: 1rem;
  }

  .cur {
    border-bottom: 1px solid #f65aa6;
  }

  .sjs-bottom ul li {
    float: left;
    width: 2.4rem;
    height: 2.4rem;
    background: #CCCCCC;
    margin: 0.05rem;
    text-align: center;
    overflow: hidden;
  }

  .sjs-bottom ul li img {
    height: 100%;
  }

  .dz {
    height: 0.9rem;
    line-height: 0.9;
    display: inline-block;
    background: url("../../../static/images/collect.png") no-repeat;
    background-size: 0.4rem 0.4rem;
    background-position-y: 0.25rem;
  }

  .dzh {
    height: 0.9rem;
    line-height: 0.9;
    display: inline-block;
    background: url("../../../static/images/collect-hover.png") no-repeat;
    background-size: 0.4rem 0.4rem;
    background-position-y: 0.25rem;
  }

  .dz span {
    padding-left: 0.5rem;
  }

  .tianjia {
    position: fixed;
    width: 1rem;
    height: 1rem;
    bottom: 1.3rem;
    right: 0.2rem;
    border-radius: 50%;
    background: url("../../../static/images/meow/jiah.png");
    background-size: 100% 100%;
    background-position: center center;
    background-repeat: no-repeat;
  }
</style>
