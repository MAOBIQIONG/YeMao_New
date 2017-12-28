<template>
  <div >
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>个人信息</span>
    </div>
    <!--发布订单内容-->
    <div class="content">
      <div class="xmlx">
        <div class="xmlx-left">
          <span>类别</span>
        </div>
        <div class="xmlx-right">
          <select class="xmlx-kuang">
            <option value="volvo">请选择类型</option>
            <option value="saab">策划设计</option>
            <option value="opel">规划设计</option>
            <option value="audi">建筑设计</option>
            <option value="audi">结构设计</option>

            <option value="saab">给排水设计</option>
            <option value="opel">电气设计</option>
            <option value="audi">暖通设计</option>
            <option value="audi">景观设计</option>

            <option value="saab">室内设计</option>
            <option value="opel">软装设计</option>
            <option value="audi">项目经理</option>
            <option value="audi">概预算</option>
            <option value="audi">审图</option>
          </select>
        </div>
      </div>
      <div class="ys-time">
        <div class="qdtime">
          <div class="qdtime-left">
            <span>工作年限</span>
          </div>
          <div class="qdtime-right">
            <input type="text"placeholder="请输入时间" />
          </div>
        </div>
        <div class="ys">
          <div class="ys-left">
            <span>时薪</span>
          </div>
          <div class="ys-right">
            <input type="text"placeholder="请输入金额" />
          </div>
        </div>

      </div>
      <div class="liebiao">
        <div class="list"@click="toUrl('jianjiexiugai')">
          <div class="xingxi">个人简介</div>
          <div class="list-right"><img src="../../../static/images/jiangou.png"></div>
        </div>
        <div class="list tz"@click="toUrl('rongyushangcuan')">
          <div class="xingxi">上传荣誉</div>
          <div class="list-right"><img src="../../../static/images/jiangou.png"></div>
        </div>
        <div class="list"@click="toUrl('zuopingshangchuan')">
          <div class="xingxi">上传作品</div>
          <div class="list-right"><img src="../../../static/images/jiangou.png"></div>
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
  @import '../../assets/css/designer/xiugaigerenxinxi.css';
</style>
