<template>
  <div>
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>通讯录好友</span>
    </div>
    <div class="content content-p">
      <!--搜索-->
      <div class="shousuo">
        <div class="sskuang">
          <input type="search" class="sc" placeholder="搜索" />
        </div>
      </div>
      <div class="dshy">
        <div class="dshy-left">
          共<span>6</span>个通讯录好友
        </div>
        <div class="dshy-right">
          全部加入
        </div>
      </div>
      <!--列表-->
      <div class="jl-list">
        <div class="jianli">
          <div class="touxiang">
            <img src="../../../static/images/bj.jpg" />
          </div>
          <div class="jieshao">
            <p class="name">昵称1</p>
            <p class="xinge"><span>联系人：</span><span>好友1</span></p>
            <div class="biaoqian">
              加入校友
            </div>
          </div>
        </div>
        <div class="jianli">
          <div class="touxiang">
            <img src="../../../static/images/bj.jpg" />
          </div>
          <div class="jieshao">
            <p class="name">昵称1</p>
            <p class="xinge"><span>联系人：</span><span>好友1</span></p>
            <div class="biaoqian">
              加入校友
            </div>
          </div>
        </div>
        <div class="jianli">
          <div class="touxiang">
            <img src="../../../static/images/bj.jpg" />
          </div>
          <div class="jieshao">
            <p class="name">昵称1</p>
            <p class="xinge"><span>联系人：</span><span>好友1</span></p>
            <div class="biaoqian">
              邀请
            </div>
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
  @import '../../../static/css/meow/tongxunluhaoyou.css';
</style>
