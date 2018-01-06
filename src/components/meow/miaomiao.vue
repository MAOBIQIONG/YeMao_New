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
      <div class="sjse-list"@click.stop="toUrl('pengyouquanxq')">
        <div class="sjs-top">
          <div class="st-touxiang"@click.stop="toUrl('sjszxxq')">
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
            <li @click.stop="toUrl('emporderimgs')">

            </li>
            <li @click.stop="toUrl('emporderimgs')">

            </li>
            <li @click.stop="toUrl('emporderimgs')">

            </li>
            <li @click.stop="toUrl('emporderimgs')">

            </li>
            <li @click.stop="toUrl('emporderimgs')">

            </li>
            <li @click.stop="toUrl('emporderimgs')">

            </li>
            <li @click.stop="toUrl('emporderimgs')">

            </li>
            <li @click.stop="toUrl('emporderimgs')">

            </li>
            <li @click.stop="toUrl('emporderimgs')">

            </li>
          </ul>
        </div>
        <div class="pinjia">
          <p class="dz"@click.stop="dianzan()"><span>100</span></p>
          <p><span> <img src="../../../static/images/liulan.png"/></span><span>100</span></p>
        </div>
      </div>
    </div>
    <div class="tianjia"@click="toUrl('fbmmq')">

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
      //      点赞效果
      dianzan(){
        var lr=true
        $(".dz").click(function(){
          if(lr==true){
            $(".dz").addClass("dzh");
            lr=false
          }else if(lr==false){
            $(".dz").removeClass("dzh");
            lr=true
          }

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
  .dz{
    height: 0.9rem;
    line-height: 0.9;
    display: inline-block;
    background: url("../../../static/images/collect.png") no-repeat;
    background-size: 0.4rem 0.4rem;
    background-position-y:0.25rem;
  }
  .dzh{
    height: 0.9rem;
    line-height: 0.9;
    display: inline-block;
    background: url("../../../static/images/collect-hover.png") no-repeat;
    background-size: 0.4rem 0.4rem;
    background-position-y:0.25rem;
  }
  .dz span{
    padding-left: 0.5rem;
  }
  .tianjia{
    position: fixed;
    width:1rem;
    height: 1rem;
    bottom: 1.3rem;
    right: 0.2rem;
    border: 1px solid #ccc;
    border-radius: 50%;
    background: url("../../../static/images/employer/j.png");
    background-size: 100% 100%;
    background-position: center center;
    background-repeat: no-repeat;
  }
</style>
