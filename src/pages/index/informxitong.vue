<template>
  <div class="">
    <!--导航栏-->
    <div class="header">
      <div class="header-left" @click="goback"><img src="../../../static/images/back.png"/></div>
      <span>系统通知</span>
    </div>
    <div class="xiaoxi-content content-p">
      <div class="xiaoxi-list">
        <div class="xl-time">2017-09-27 08:29</div>
        <div class="xl-content">
          <div class="jianjia"></div>
          <div class="zf-jg">支付成功</div>
          <div class="zf-sm">文字说明</div>
          <div class="ckxq"@click="toUrl('maintain')">
            <span>查看详情</span>
            <div class="ck-right">
              <img src="../../../static/images/index/jiangou.png">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {
      goback() {
        this.$router.goBack();
      },
      toUrl(name) {
        this.$router.push({name: name, query: {id: this.$route.query.id}});
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../../../static/css/index/inform-xitong.css";
</style>
