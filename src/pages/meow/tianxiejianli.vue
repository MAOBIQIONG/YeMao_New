<template>
  <div>
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>填写简历</span>
      <div class="header-right"@click="toUrl('gongzuojinli')">下一步</div>
    </div>
    <!--发布订单内容-->
    <div class="content">
      <div class="ys-time">
        <div class="qdtime">
          <div class="qdtime-left">
            <span>姓名</span>
          </div>
          <div class="qdtime-right">
            <input type="text"placeholder="请输入姓名" />
          </div>
        </div>
        <div class="qdtime">
          <div class="qdtime-left">
            <span>性别</span>
          </div>
          <div class="qdtime-right">
            <input type="text"placeholder="性别" />
          </div>
        </div>
        <div class="qdtime">
          <div class="qdtime-left">
            <span>出生年月</span>
          </div>
          <div class="qdtime-right">
            <input type="text"placeholder="请输入出生年月" />
          </div>
        </div>
      </div>
      <div class="ys-time">
        <div class="qdtime">
          <div class="qdtime-left">
            <span>毕业院校</span>
          </div>
          <div class="qdtime-right">
            <input type="text"placeholder="请输入毕业院校" />
          </div>
        </div>
        <div class="qdtime">
          <div class="qdtime-left">
            <span>设计类型</span>
          </div>
          <div class="qdtime-right">
            <input type="text"placeholder="设计类型" />
          </div>
        </div>
        <div class="qdtime">
          <div class="qdtime-left">
            <span>最高学历</span>
          </div>
          <div class="qdtime-right">
            <input type="text"placeholder="请输入最高学历" />
          </div>
        </div>
        <div class="qdtime">
          <div class="qdtime-left">
            <span>工作年限</span>
          </div>
          <div class="qdtime-right">
            <input type="text"placeholder="请输入工作年限" />
          </div>
        </div>
      </div>
      <div class="ys-time">
        <div class="qdtime">
          <div class="qdtime-left">
            <span>邮箱</span>
          </div>
          <div class="qdtime-right">
            <input type="text"placeholder="请输入邮箱" />
          </div>
        </div>
        <div class="qdtime">
          <div class="qdtime-left">
            <span>所在城市</span>
          </div>
          <div class="qdtime-right">
            <input type="text"placeholder="所在城市" />
          </div>
        </div>
      </div>
      <!--留言-->
      <div class="pc-shuru">
        <textarea class="area" placeholder="自我描述"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {

      }
    },
    methods: {
      goback () {
        this.$router.goBack()
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
    }
  }
</script>
<style scoped>
  @import '../../assets/css/meow/tianxiejianli.css';
</style>
