<template>
  <div>
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>学校详情</span>
      <div class="header-right">邀请</div>
    </div>
    <!--学校详情-->
    <div class="content">
      <div class="xxmc">
        <div class="touxiang">
          <img src="../../../static/images/bj.jpg" />
        </div>
        <div class="mingcheng">
          <div class="xuexiao">学校名称</div>
          <div class="jrxs"><span>+&nbsp;加入学校</span><span>+&nbsp;校友交流</span></div>
        </div>
      </div>
      <div class="xxjj">
        <p>学校简介</p>
        <div class="jianjie">
          如果你无法简洁的表达你的想法，那只说明你还不够了解它。如果你无法简洁的表达你的想法，那只说明你还不够了解它。
        </div>
      </div>
      <div class="liebiao">
        <div class="list">
          <div class="xingxi">管理员</div>
          <div class="guanliyuan">
            <div class="gly">
              <div class="touxiang">
                <img src="../../../static/images/bj.jpg" />
              </div>
              <p class="nicheng">昵称</p>
            </div>
          </div>
          <!--<div class="list-right"><img src="../../../static/images/jiangou.png"></div>-->
        </div>
        <div class="list tz">
          <div class="xingxi">校友成员</div>
          <div class="xycy">
            <div class="renshu">
              <span>234</span>人
            </div>
            <ul class="cylist">
              <li><img src="../../../static/images/bj.jpg" /></li>
              <li><img src="../../../static/images/bj.jpg" /></li>
              <li><img src="../../../static/images/bj.jpg" /></li>
              <li><img src="../../../static/images/bj.jpg" /></li>
              <li><img src="../../../static/images/bj.jpg" /></li>
            </ul>
          </div>
          <div class="list-right"><img src="../../../static/images/jiangou.png"></div>
        </div>
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
  @import '../../../static/css/meow/xuexiaoxiangqing.css';
</style>
