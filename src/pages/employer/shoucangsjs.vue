<template>
  <div class="">
    <div class="header">
      <div class="header-left" @click="goback"><img src="../../../static/images/back.png"/></div>
      <span>收藏设计师</span>
    </div>
    <!--收藏设计师-->
    <div class="sc-content">
      <div class="szsjs-list">
        <div class="szsjs-top">
          <div class="szsjs-touxiang">
            <img src="../../../static/images/bj.jpg">
          </div>
          <div class="szsjs-neirong">
            <div class="sn-top">
              <div class="st-nicheng">设计师小a</div>
              <div class="st-pingxin"></div>
            </div>
            <div class="sn-bottom">
              <div class="sb-qian">签</div>
              <div class="sb-ysm">已实名</div>
              <div class="sb-yrz">已认证</div>
            </div>
          </div>
          <div class="szsjs-jiageleixin">
            <div class="st-leixin"><span>景观设计</span></div>
            <div class="st-yaoqing">邀请TA</div>
          </div>

        </div>
      </div>
      <div class="szsjs-list">
        <div class="szsjs-top">
          <div class="szsjs-touxiang">
            <img src="../../../static/images/bj.jpg">
          </div>
          <div class="szsjs-neirong">
            <div class="sn-top">
              <div class="st-nicheng">设计师小a</div>
              <div class="st-pingxin"></div>
            </div>
            <div class="sn-bottom">
              <div class="sb-qian">签</div>
              <div class="sb-ysm">已实名</div>
              <div class="sb-yrz">已认证</div>
            </div>
          </div>
          <div class="szsjs-jiageleixin">
            <div class="st-leixin"><span>景观设计</span></div>
            <div class="st-yaoqing">邀请TA</div>

          </div>

        </div>
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
    methods: {
      goback() {
        this.$router.goBack();
      },
      toUrl(name) {
        this.$router.push({name: name});
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../../assets/css/employer/shoucangsjs.css";
</style>
