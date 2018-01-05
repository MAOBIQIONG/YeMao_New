<template>
  <div class="miaomiao">
    <!-- 板块-->
    <div class="bankuai">
      <ul>
        <li @click="toUrl('shouchangmxt')">
          <img src="../../../static/images/meow/01_miaoxuetang.png">
          <div class="wenzhi"> 喵学堂</div>
        </li>
        <li @click="toUrl('shouchangweida')">
          <img src="../../../static/images/meow/02_wenda.png">
          <div class="wenzhi"> 问答</div>
        </li>
        <li @click="toUrl('shouchangjianli')">
          <img src="../../../static/images/meow/03_rencai.png">
          <div class="wenzhi"> 人才</div>
        </li>
        <li @click="toUrl('xiaoyouhui')">
          <img src="../../../static/images/meow/04_xiaoyouhui.png">
          <div class="wenzhi">校友会</div>
        </li>
      </ul>
    </div>
    <!--  喵喵列表-->
    <div class="mm-list miao">
      <div class="sjse-list"@click="toUrl('pengyouquanxq')">
        <div class="sjs-top">
          <div class="st-touxiang">
            <img src="../../../static/images/bj.jpg"/>
          </div>
          <div class="st-neirong">
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
          <div class="st-jiageleixin">
            <div class="st-jiage">2017-10-19</div>
          </div>
        </div>
        <div class="sjs-content">
          <div class="sc-jiesao">
            如果你无法简洁的表达你的想法，那只说明你还不够如果你无法简洁的表达你的想法，那只说明你还不够了解它,你需要去了解它。
          </div>
        </div>
        <div class="sjs-bottom">
          <ul>
            <li>

            </li>
            <li>

            </li>
            <li>

            </li>
            <li>

            </li>
            <li>

            </li>
            <li>

            </li>
            <li>

            </li>
            <li>

            </li>
            <li>

            </li>
          </ul>
        </div>
        <div class="pinjia">
          <p><span> <img src="../../../static/images/collect.png"/></span><span>100</span></p>
          <p><span> <img src="../../../static/images/liulan.png"/></span><span>100</span></p>
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
    mounted: function () {
      this.miao();
    },
    methods: {
      goback () {
        this.$router.goBack()
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
      //tab选择
      miao(){
      $(".hd-cont li").click(function(){
          $(".hd-cont li").eq($(this).index()).addClass("cur").siblings().removeClass('cur');
      });
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../assets/css/meow/miaomiao.css';
  .cur{
    border-bottom: 1px solid #f65aa6;
  }
  .sjs-bottom ul li {
    float: left;
    width: 2.4rem;
    height: 2.4rem;
    background: #CCCCCC;
    margin: 0.05rem;
    overflow: hidden;
    background: url("../../../static/images/bj.jpg");
    background-position: center center;
    background-repeat: no-repeat;
  }
</style>
