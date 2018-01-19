<template>
  <div>
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>工作经历</span>
      <div class="header-right"@click="toUrl('qiwanggongzuo')">下一步</div>
    </div>
    <!--编辑工作经历-->
    <div class="content content-p">
      <div class="gzjl">
        <div class="rzsj">
          <div class="rzsj-left">
            <span>2017.02</span>-<span>2017.10</span>
          </div>
          <div class="rzsj-right"@click="toUrl('bianjigongzuojinli')">
            <span><img src="../../../static/images/sx1.png"></span><span>编辑</span>
          </div>
        </div>
        <div class="zwmc">
          <span>企业名称</span>/<span>职位</span>
        </div>
        <div class="gznr">
          1.如果你无法简洁的表达你的想法，那只说明你还不...
          1.如果你无法简洁的表达你的想法，那只说明你还不...
        </div>
      </div>

      <div class="tjgzjl">
        添加工作经历
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
  @import '../../../static/css/meow/gongzuojingli.css';
</style>
