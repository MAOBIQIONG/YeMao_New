<template>
  <div class="">
    <div class="header">
      <div class="header-left" @click="goback"><img src="../../../static/images/back.png"/></div>
      <span>我的订单</span>
      <div class="header-right"@click="toUrl('fabudingdan')"><img src="../../../static/images/employer/jiahao.png"></div>
    </div>
    <!--tab选项卡-->
    <div class="content">
      <tab :line-width=2 active-color='#fc378c' v-model="index"class="tabs">
        <tab-item class="vux-center" key="0">待处理</tab-item>
        <tab-item class="vux-center" key="1">待支付</tab-item>
        <tab-item class="vux-center" key="2">待交付</tab-item>
        <tab-item class="vux-center" key="3">已完成</tab-item>
      </tab>
      <swiper v-model="index" :show-dots="false" class="swps">
        <swiper-item key="0">
            <div class="ddlist-sjsdai">
              <div class="ds-top"@click="toUrl('daichulixq')">
                <div class="ds-img">
                  <img src="../../../static/images/bj.jpg">
                </div>
                <div class="ds-jianjie">
                  <div class="jianjie-top">
                    已有多年建筑设计工作经验，从事建筑方案到效果图，再到建筑施工图都可以完成
                  </div>
                  <div class="jianjie-bottom">
                    <div class="db-leixin"><span>建筑设计</span> <span class="yuan">￥</span><span class="yuan">50000</span>
                    </div>
                    <div class="db-djs">7天后截止报名</div>
                  </div>
                </div>
              </div>
              <div class="ds-bottom">
                <div class="db-right">
                  <div class="db-qxdd">取消订单</div>
                  <div class="db-sxdd">刷新订单</div>
                  <div class="db-qrdd">确认订单</div>
                </div>
              </div>
            </div>
            <div class="ddlist-sjsdai">
              <div class="ds-top"@click="toUrl('daichulixq')">
                <div class="ds-img">
                  <img src="../../../static/images/bj.jpg">
                </div>
                <div class="ds-jianjie">
                  <div class="jianjie-top">
                    已有多年建筑设计工作经验，从事建筑方案到效果图，再到建筑施工图都可以完成
                  </div>
                  <div class="jianjie-bottom">
                    <div class="db-leixin"><span>建筑设计</span> <span class="yuan">￥</span><span class="yuan">50000</span>
                    </div>
                    <div class="db-djs">7天后截止报名</div>
                  </div>
                </div>
              </div>
              <div class="ds-bottom">
                <div class="db-right">
                  <div class="db-qxdd">取消订单</div>
                  <div class="db-sxdd">刷新订单</div>
                  <div class="db-qrdd">确认订单</div>
                </div>
              </div>
            </div>
        </swiper-item>
        <swiper-item key="1">
          <div class="ddlist-sjsdai">
            <div class="ds-top"@click="toUrl('daizhifu')">
              <div class="ds-img">
                <img src="../../../static/images/bj.jpg">
              </div>
              <div class="ds-jianjie">
                <div class="jianjie-top">
                  已有多年建筑设计工作经验，从事建筑方案到效果图，再到建筑施工图都可以完成
                </div>
                <div class="jianjie-bottom">
                  <div class="db-leixin"><span>建筑设计</span> <span class="yuan">￥</span><span class="yuan">50000</span></div>
                  <div class="db-djs">7天后截止报名</div>
                </div>
              </div>
            </div>
            <div class="ds-bottom">
              <div class="db-right">
                <div class="db-qxdd">取消订单</div>
                <div class="db-qrdd"@click="toUrl('zfcg')">支付</div>
              </div>
            </div>
          </div>
          <div class="ddlist-sjsdai">
            <div class="ds-top"@click="toUrl('daizhifu')">
              <div class="ds-img">
                <img src="../../../static/images/bj.jpg">
              </div>
              <div class="ds-jianjie">
                <div class="jianjie-top">
                  已有多年建筑设计工作经验，从事建筑方案到效果图，再到建筑施工图都可以完成
                </div>
                <div class="jianjie-bottom">
                  <div class="db-leixin"><span>建筑设计</span> <span class="yuan">￥</span><span class="yuan">50000</span></div>
                  <div class="db-djs">7天后截止报名</div>
                </div>
              </div>
            </div>
            <div class="ds-bottom">
              <div class="db-right">
                <div class="db-qxdd">取消订单</div>
                <div class="db-qrdd"@click="toUrl('zfcg')">支付</div>
              </div>
            </div>
          </div>
        </swiper-item>
        <swiper-item key="2">
          <div class="ddlist-sjsdai">
            <div class="ds-top"@click="toUrl('daijiaofu')">
              <div class="ds-img">
                <img src="../../../static/images/bj.jpg">
              </div>
              <div class="ds-jianjie">
                <div class="jianjie-top">
                  已有多年建筑设计工作经验，从事建筑方案到效果图，再到建筑施工图都可以完成
                </div>
                <div class="jianjie-bottom">
                  <div class="db-leixin"><span>建筑设计</span> <span class="yuan">￥</span><span class="yuan">50000</span></div>
                  <div class="db-djs">7天后截止报名</div>
                </div>
              </div>
            </div>
            <div class="ds-bottom">
              <div class="db-right">
                <div class="db-sxdd"@click="toUrl('yijianhuisheng')">一键会审</div>
                <div class="db-qrdd">确认订单</div>
              </div>
            </div>
          </div>
          <div class="ddlist-sjsdai">
            <div class="ds-top"@click="toUrl('daijiaofu')">
              <div class="ds-img">
                <img src="../../../static/images/bj.jpg">
              </div>
              <div class="ds-jianjie">
                <div class="jianjie-top">
                  已有多年建筑设计工作经验，从事建筑方案到效果图，再到建筑施工图都可以完成
                </div>
                <div class="jianjie-bottom">
                  <div class="db-leixin"><span>建筑设计</span> <span class="yuan">￥</span><span class="yuan">50000</span></div>
                  <div class="db-djs">7天后截止报名</div>
                </div>
              </div>
            </div>
            <div class="ds-bottom">
              <div class="db-right">
                <div class="db-sxdd"@click="toUrl('yijianhuisheng')">一键会审</div>
                <div class="db-qrdd">确认订单</div>
              </div>
            </div>
          </div>
        </swiper-item>
        <swiper-item key="3">
          <div class="ddlist-sjsdai">
            <div class="ds-top"@click="toUrl('yiwancheng')">
              <div class="ds-img">
                <img src="../../../static/images/bj.jpg">
              </div>
              <div class="ds-jianjie">
                <div class="jianjie-top">
                  已有多年建筑设计工作经验，从事建筑方案到效果图，再到建筑施工图都可以完成
                </div>
                <div class="jianjie-bottom">
                  <div class="db-leixin"><span>建筑设计</span> <span class="yuan">￥</span><span class="yuan">50000</span></div>
                  <div class="db-djs">交易关闭</div>
                </div>
              </div>
            </div>
            <div class="ds-bottom">
              <div class="db-right">
                <div class="db-qxdd">取消订单</div>
                <div class="db-qrdd"@click="toUrl('orderpingjia')">评价设计师</div>
              </div>
            </div>
          </div>
          <div class="ddlist-sjsdai">
            <div class="ds-top"@click="toUrl('yiwancheng')">
              <div class="ds-img">
                <img src="../../../static/images/bj.jpg">
              </div>
              <div class="ds-jianjie">
                <div class="jianjie-top">
                  已有多年建筑设计工作经验，从事建筑方案到效果图，再到建筑施工图都可以完成
                </div>
                <div class="jianjie-bottom">
                  <div class="db-leixin"><span>建筑设计</span> <span class="yuan">￥</span><span class="yuan">50000</span></div>
                  <div class="db-djs">交易关闭</div>
                </div>
              </div>
            </div>
            <div class="ds-bottom">
              <div class="db-right">
                <div class="db-qxdd">取消订单</div>
                <div class="db-qrdd"@click="toUrl('orderpingjia')">评价设计师</div>
              </div>
            </div>
          </div>
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>

<script>
  import {Tab, TabItem, Swiper, SwiperItem} from 'vux'
  export default {
    components: {
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
    },
    data() {
      return {
        index: 0,
      }
    },
    mounted: function () {
    },
    methods: {
      goback() {
        this.$router.goBack();
      },
      toUrl(name) {
        this.$router.push({name: name});
      },
    }
  }
</script>
<style>
  .vux-slider > .vux-swiper{
    height: 100% !important;
    overflow:auto !important;
  }
  .vux-swiper-item{
    height:auto !important;
    background: #f2f2f2 !important;
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .content{
    background: #F2F2F2;
    margin-top: 0.8rem;
  }
  .tabs{
    width: 100%;
    position: fixed;
    top: 0.88rem;
    left: 0;
    background: white;
    z-index: 99999;
  }
  .swps{
    margin-top: 1.74rem;
    height:14rem !important;
    overflow:auto !important;
  }
</style>
