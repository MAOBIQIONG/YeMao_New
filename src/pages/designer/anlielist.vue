<template>
  <div >
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>案列展示</span>
    </div>
    <!--发布订单内容-->
    <div class="content">
      <div class="alzs-list"@click="toUrl('anliexq')">
        <div class="al-top">
          <div class="touxiang">
            <img src="../../../static/images/bj.jpg" />
          </div>
          <div class="al-right">
            <div class="ar-top">
              案列名称
            </div>
            <div class="nenrong">
              案例简介如果你无法简洁的表达你的想法，那只
            </div>
          </div>
        </div>
        <div class="al-bottom">
          <div class="al-left">
            <p><span><img src="../../../static/images/designer/anli_xihuan.png"></span><span>33</span></p>
            <p><span><img src="../../../static/images/designer/anli_liulan.png"></span><span>44</span></p>
          </div>
          <div class="al-right">
            2017-12-26
          </div>
        </div>
      </div>
      <div class="alzs-list"@click="toUrl('anliexq')">
        <div class="al-top">
          <div class="touxiang">
            <img src="../../../static/images/bj.jpg" />
          </div>
          <div class="al-right">
            <div class="ar-top">
              案列名称
            </div>
            <div class="nenrong">
              案例简介如果你无法简洁的表达你的想法，那只
            </div>
          </div>
        </div>
        <div class="al-bottom">
          <div class="al-left">
            <p><span><img src="../../../static/images/designer/anli_xihuan.png"></span><span>33</span></p>
            <p><span><img src="../../../static/images/designer/anli_liulan.png"></span><span>44</span></p>
          </div>
          <div class="al-right">
            2017-12-26
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
  @import '../../assets/css/designer/anlielist.css';
</style>
