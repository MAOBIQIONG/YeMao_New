<template>
  <div>
    <!--导航栏-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
    </div>
    <!--  喵喵列表-->
    <div class="mm-list content">
      <div class="sjse-list">
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
              <img src="../../../static/images/bj.jpg"/>
            </li>
            <li>
              <img src="../../../static/images/bj.jpg"/>
            </li>
            <li>
              <img src="../../../static/images/bj.jpg"/>
            </li>
            <li>
              <img src="../../../static/images/bj.jpg"/>
            </li>
            <li>
              <img src="../../../static/images/bj.jpg"/>
            </li>
            <li>
              <img src="../../../static/images/bj.jpg"/>
            </li>
            <li>
              <img src="../../../static/images/bj.jpg"/>
            </li>
            <li>
              <img src="../../../static/images/bj.jpg"/>
            </li>
            <li>
              <img src="../../../static/images/bj.jpg"/>
            </li>
          </ul>
        </div>
        <div class="pinjia">
          <p><span> <img src="../../../static/images/collect.png"/></span><span>100</span></p>
          <p><span> <img src="../../../static/images/liulan.png"/></span><span>100</span></p>
        </div>
      </div>
    </div>
    <!--评价列表-->
    <div class="liuyan">
      <div class="lylist">
        <div class="lit-top">
          <div class="left-tou">
            <span><img src="../../../static/images/bj.jpg"/></span><span class="nicheng">用户昵称1</span>
          </div>
          <div class="right-time">
            2017-01-01
          </div>
        </div>
        <div class="list-bottom">
          <div class="pj-neirong">
            评论内容评论内容评论内容评论内容评论内容评评论内容评论内容评论内容评论内容评论内容评
          </div>
        </div>
      </div>
      <div class="lylist">
        <div class="lit-top">
          <div class="left-tou">
            <span><img src="../../../static/images/bj.jpg"/></span><span class="nicheng">用户昵称1</span>
          </div>
          <div class="right-time">
            2017-01-01
          </div>
        </div>
        <div class="list-bottom">
          <div class="pj-neirong">
            评论内容评论内容评论内容评论内容评论内容评评论内容评论内容评论内容评论内容评论内容评
          </div>
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
  @import '../../assets/css/meow/miaomiao.css';
</style>
