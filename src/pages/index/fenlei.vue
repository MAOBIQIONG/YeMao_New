<template>
  <div class="">
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>分类</span>
    </div>
    <!--全部分类-->
    <div class="fenlei-list">
      <div class="fl-box"@click="toUrl('leibie')">
        <span class="fl-img"><img src="../../../static/images/index/c_cehua_01_03.png"/></span>
        <div class="zhezhao">策划设计</div>
      </div>
      <div class="fl-box"@click="toUrl('leibie')">
        <span class="fl-img"><img src="../../../static/images/index/c_guihua_02_03.png"/></span>
        <div class="zhezhao">规划设计</div>
      </div>
      <div class="fl-box"@click="toUrl('leibie')">
        <span class="fl-img"><img src="../../../static/images/index/c_jianzhu_03_03.png"/></span>
        <div class="zhezhao">建筑设计</div>
      </div>
      <div class="fl-box"@click="toUrl('leibie')">
        <span class="fl-img"><img src="../../../static/images/index/c_jiegou_04_03.png"/></span>
        <div class="zhezhao">结构设计</div>
      </div>
      <div class="fl-box"@click="toUrl('leibie')">
        <span class="fl-img"><img src="../../../static/images/index/c_jipaishui_05_03.png"/></span>
        <div class="zhezhao">给排水设计</div>
      </div>
      <div class="fl-box"@click="toUrl('leibie')">
        <span class="fl-img"><img src="../../../static/images/index/c_dianqi_06_03.png"/></span>
        <div class="zhezhao">电气设计</div>
      </div>
      <div class="fl-box">
        <span class="fl-img"><img src="../../../static/images/index/c_nuantong_07_03.png"/></span>
        <div class="zhezhao">暖通设计</div>
      </div>
      <div class="fl-box">
        <span class="fl-img"><img src="../../../static/images/index/c_jingguan_08_03.png"/></span>
        <div class="zhezhao">景观设计</div>
      </div>
      <div class="fl-box">
        <span class="fl-img"><img src="../../../static/images/index/c_shinei_09_03.png"/></span>
        <div class="zhezhao">室内设计</div>
      </div>
      <div class="fl-box">
        <span class="fl-img"><img src="../../../static/images/index/c_ruanzhuang_10_03.png"/></span>
        <div class="zhezhao">软装设计</div>
      </div>
      <div class="fl-box">
        <span class="fl-img"><img src="../../../static/images/index/c_xiangmujingli_11_03.png"/></span>
        <div class="zhezhao">项目经理</div>
      </div>
      <div class="fl-box">
        <span class="fl-img"><img src="../../../static/images/index/c_gaiyusuan_12_03.png"/></span>
        <div class="zhezhao">概预算</div>
      </div>
      <div class="fl-box">
        <span class="fl-img"><img src="../../../static/images/index/c_shentu_13_03.png"/></span>
        <div class="zhezhao">审图</div>
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
      goback(){
        this.$router.goBack();
      },
      toUrl(name){
        this.$router.push({name:name});
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../../assets/css/index/fenlei.css";
</style>
