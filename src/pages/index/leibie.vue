<template>
  <div class="">
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>建筑设计</span>
    </div>
    <!--雇主列表-->
    <div class="content">
      <div class="gz-list"@click="toUrl('emporder')">
        <div class="gz-top">
          <div class="gz-touxiang">
            <img src="../../../static/images/bj.jpg" />
          </div>
          <div class="gz-nicheng">雇主小a</div>
          <div class="gz-jiage"><span>￥</span><span>5000</span></div>
        </div>
        <div class="gz-timeleixin">
          <div class="gz-time"><span><img src="../../../static/images/index/time.png"/></span><span>七天后过期</span></div>
          <div class="gz-leixin"><span>家装设计</span></div>
        </div>
        <div class="gz-content">
          <div class="tupian">
            <div class="tu"><img src="../../../static/images/bj.jpg" /></div>
            <div class="tu"><img src="../../../static/images/bj.jpg" /></div>
            <div class="tu"><img src="../../../static/images/bj.jpg" /></div>
          </div>
          <div class="wenzhi">
            actocad制图问题解答，帮忙制图，报价根据工程量或人工制定。
          </div>
        </div>
        <div class="gz-bottom">
          <div class="gb-left">
            <div class="gb-tu">
              <img src="../../../static/images/bj.jpg" />
            </div>
            <div class="gb-tu">
              <img src="../../../static/images/bj.jpg" />
            </div>
            <div class="gb-tu">
              <img src="../../../static/images/bj.jpg" />
            </div>
            <div class="gb-wz">3人抢单</div>
          </div>
          <div class="gb-right">
            <div class="gb-ljqd">立即抢单</div>
          </div>
        </div>
      </div>
      <div class="gz-list"@click="toUrl('emporder')">
        <div class="gz-top">
          <div class="gz-touxiang">
            <img src="../../../static/images/bj.jpg" />
          </div>
          <div class="gz-nicheng">雇主小a</div>
          <div class="gz-jiage"><span>￥</span><span>5000</span></div>
        </div>
        <div class="gz-timeleixin">
          <div class="gz-time"><span><img src="../../../static/images/index/time.png"/></span><span>七天后过期</span></div>
          <div class="gz-leixin"><span>家装设计</span></div>
        </div>
        <div class="gz-content">
          <div class="tupian">
            <div class="tu"><img src="../../../static/images/bj.jpg" /></div>
            <div class="tu"><img src="../../../static/images/bj.jpg" /></div>
            <div class="tu"><img src="../../../static/images/bj.jpg" /></div>
          </div>
          <div class="wenzhi">
            actocad制图问题解答，帮忙制图，报价根据工程量或人工制定。
          </div>
        </div>
        <div class="gz-bottom">
          <div class="gb-left">
            <div class="gb-tu">
              <img src="../../../static/images/bj.jpg" />
            </div>
            <div class="gb-tu">
              <img src="../../../static/images/bj.jpg" />
            </div>
            <div class="gb-tu">
              <img src="../../../static/images/bj.jpg" />
            </div>
            <div class="gb-wz">3人抢单</div>
          </div>
          <div class="gb-right">
            <div class="gb-ljqd">立即抢单</div>
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
  .content{
    margin-top: 0.8rem;
    background: #f2f2f2;
  }
</style>
