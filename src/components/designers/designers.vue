<template>
  <div class="">
    <!--tab选项卡-->
    <div class="content" style="padding-top: .8rem">
      <div class="sjs-list">
        <div class="sjs-top">
          <div class="st-touxiang">
            <img src="../../../static/images/index/touxiang.png"/>
          </div>
          <div class="st-neirong">
            <div class="sn-top">
              <div class="st-nicheng">设计师小a</div>
              <div class="st-pingxin"><img src="../../../static/images/index/xin.png"/></div>
            </div>
            <div class="sn-bottom">
              <div class="sb-nianling">5年</div>
              <div class="sb-qian">签</div>
              <div class="sb-ysm">已实名</div>
              <div class="sb-yrz">已认证</div>
            </div>
          </div>
          <div class="st-jiageleixin">
            <div class="st-jiage"><span>￥</span><span>100</span>/时</div>
            <div class="st-leixin"><span>景观设计</span></div>
          </div>
        </div>
        <div class="sjs-content">
          <div class="sc-jiesao">
            已有多年建筑设计工作经验，从事建筑方案到效果图，再到建筑施工图都可以完成
          </div>
        </div>
        <div class="sjs-bottom">
          <div class="sjs-yysj">应邀设计</div>
          <div class="sjs-mmlt">喵喵聊天</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    created: function () {
    },
    methods: {
      toUrl(name) {
        this.$router.push({name: name});
      },
    },
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/css/index/search-jieguo.css";
</style>
