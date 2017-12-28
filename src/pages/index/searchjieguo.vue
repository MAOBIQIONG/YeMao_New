<template>
  <div class="">
    <div class="search">
      <div class="search-input">
        <span class="searchtu"><img src="../../../static/images/index/searchbtn.png"/></span>
        <input type="text" name="" id="search-inp" value=""class="search-inp" placeholder="搜索"/>
        <span class="searchcha">×</span>
      </div>
      <span @click="toUrl('index')">取消</span>
    </div>
    <!--tab选项卡-->
    <div class="content">
      <tab :line-width=2 active-color='#fc378c' v-model="index" class="tabs">
        <tab-item class="vux-center"   key="0">设计师</tab-item>
        <tab-item class="vux-center"   key="1">订单</tab-item>
      </tab>
      <swiper v-model="index" :show-dots="false"class="swps">
        <swiper-item >
          <div class="tab-swiper vux-center">
            <div class="sjs-list">
              <div class="sjs-top">
                <div class="st-touxiang">
                  <img src="../../../static/images/index/touxiang.png"/>
                </div>
                <div class="st-neirong">
                  <div class="sn-top">
                    <div class="st-nicheng">设计师小a</div>
                    <div class="st-pingxin"><img src="../../../static/images/index/xin.png"/></div>
                  </div>
                  <div class="sn-bottom">
                    <div class="sb-nianling">5年</div>
                    <div class="sb-qian">签</div>
                    <div class="sb-ysm">已实名</div>
                    <div class="sb-yrz">已认证</div>
                  </div>
                </div>
                <div class="st-jiageleixin">
                  <div class="st-jiage"><span>￥</span><span>100</span>/时</div>
                  <div class="st-leixin"><span>景观设计</span></div>
                </div>
              </div>
              <div class="sjs-content">
                <div class="sc-jiesao">
                  已有多年建筑设计工作经验，从事建筑方案到效果图，再到建筑施工图都可以完成
                </div>
              </div>
              <div class="sjs-bottom">
                <div class="sjs-yysj">应邀设计</div>
                <div class="sjs-mmlt">喵喵聊天</div>
              </div>
            </div>
            <div class="sjs-list">
              <div class="sjs-top">
                <div class="st-touxiang">
                  <img src="../../../static/images/index/touxiang.png"/>
                </div>
                <div class="st-neirong">
                  <div class="sn-top">
                    <div class="st-nicheng">设计师小a</div>
                    <div class="st-pingxin"><img src="../../../static/images/index/xin.png"/></div>
                  </div>
                  <div class="sn-bottom">
                    <div class="sb-nianling">5年</div>
                    <div class="sb-qian">签</div>
                    <div class="sb-ysm">已实名</div>
                    <div class="sb-yrz">已认证</div>
                  </div>
                </div>
                <div class="st-jiageleixin">
                  <div class="st-jiage"><span>￥</span><span>100</span>/时</div>
                  <div class="st-leixin"><span>景观设计</span></div>
                </div>
              </div>
              <div class="sjs-content">
                <div class="sc-jiesao">
                  已有多年建筑设计工作经验，从事建筑方案到效果图，再到建筑施工图都可以完成
                </div>
              </div>
              <div class="sjs-bottom">
                <div class="sjs-yysj">应邀设计</div>
                <div class="sjs-mmlt">喵喵聊天</div>
              </div>
            </div>
            <div class="sjs-list">
              <div class="sjs-top">
                <div class="st-touxiang">
                  <img src="../../../static/images/index/touxiang.png"/>
                </div>
                <div class="st-neirong">
                  <div class="sn-top">
                    <div class="st-nicheng">设计师小a</div>
                    <div class="st-pingxin"><img src="../../../static/images/index/xin.png"/></div>
                  </div>
                  <div class="sn-bottom">
                    <div class="sb-nianling">5年</div>
                    <div class="sb-qian">签</div>
                    <div class="sb-ysm">已实名</div>
                    <div class="sb-yrz">已认证</div>
                  </div>
                </div>
                <div class="st-jiageleixin">
                  <div class="st-jiage"><span>￥</span><span>100</span>/时</div>
                  <div class="st-leixin"><span>景观设计</span></div>
                </div>
              </div>
              <div class="sjs-content">
                <div class="sc-jiesao">
                  已有多年建筑设计工作经验，从事建筑方案到效果图，再到建筑施工图都可以完成
                </div>
              </div>
              <div class="sjs-bottom">
                <div class="sjs-yysj">应邀设计</div>
                <div class="sjs-mmlt">喵喵聊天</div>
              </div>
            </div>
            <div class="sjs-list">
              <div class="sjs-top">
                <div class="st-touxiang">
                  <img src="../../../static/images/index/touxiang.png"/>
                </div>
                <div class="st-neirong">
                  <div class="sn-top">
                    <div class="st-nicheng">设计师小a</div>
                    <div class="st-pingxin"><img src="../../../static/images/index/xin.png"/></div>
                  </div>
                  <div class="sn-bottom">
                    <div class="sb-nianling">5年</div>
                    <div class="sb-qian">签</div>
                    <div class="sb-ysm">已实名</div>
                    <div class="sb-yrz">已认证</div>
                  </div>
                </div>
                <div class="st-jiageleixin">
                  <div class="st-jiage"><span>￥</span><span>100</span>/时</div>
                  <div class="st-leixin"><span>景观设计</span></div>
                </div>
              </div>
              <div class="sjs-content">
                <div class="sc-jiesao">
                  已有多年建筑设计工作经验，从事建筑方案到效果图，再到建筑施工图都可以完成
                </div>
              </div>
              <div class="sjs-bottom">
                <div class="sjs-yysj">应邀设计</div>
                <div class="sjs-mmlt">喵喵聊天</div>
              </div>
            </div>
            <div class="sjs-list">
              <div class="sjs-top">
                <div class="st-touxiang">
                  <img src="../../../static/images/index/touxiang.png"/>
                </div>
                <div class="st-neirong">
                  <div class="sn-top">
                    <div class="st-nicheng">设计师小a</div>
                    <div class="st-pingxin"><img src="../../../static/images/index/xin.png"/></div>
                  </div>
                  <div class="sn-bottom">
                    <div class="sb-nianling">5年</div>
                    <div class="sb-qian">签</div>
                    <div class="sb-ysm">已实名</div>
                    <div class="sb-yrz">已认证</div>
                  </div>
                </div>
                <div class="st-jiageleixin">
                  <div class="st-jiage"><span>￥</span><span>100</span>/时</div>
                  <div class="st-leixin"><span>景观设计</span></div>
                </div>
              </div>
              <div class="sjs-content">
                <div class="sc-jiesao">
                  已有多年建筑设计工作经验，从事建筑方案到效果图，再到建筑施工图都可以完成
                </div>
              </div>
              <div class="sjs-bottom">
                <div class="sjs-yysj">应邀设计</div>
                <div class="sjs-mmlt">喵喵聊天</div>
              </div>
            </div>
            <div class="sjs-list">
              <div class="sjs-top">
                <div class="st-touxiang">
                  <img src="../../../static/images/index/touxiang.png"/>
                </div>
                <div class="st-neirong">
                  <div class="sn-top">
                    <div class="st-nicheng">设计师小a</div>
                    <div class="st-pingxin"><img src="../../../static/images/index/xin.png"/></div>
                  </div>
                  <div class="sn-bottom">
                    <div class="sb-nianling">5年</div>
                    <div class="sb-qian">签</div>
                    <div class="sb-ysm">已实名</div>
                    <div class="sb-yrz">已认证</div>
                  </div>
                </div>
                <div class="st-jiageleixin">
                  <div class="st-jiage"><span>￥</span><span>100</span>/时</div>
                  <div class="st-leixin"><span>景观设计</span></div>
                </div>
              </div>
              <div class="sjs-content">
                <div class="sc-jiesao">
                  已有多年建筑设计工作经验，从事建筑方案到效果图，再到建筑施工图都可以完成
                </div>
              </div>
              <div class="sjs-bottom">
                <div class="sjs-yysj">应邀设计</div>
                <div class="sjs-mmlt">喵喵聊天</div>
              </div>
            </div>
            <div class="sjs-list">
              <div class="sjs-top">
                <div class="st-touxiang">
                  <img src="../../../static/images/index/touxiang.png"/>
                </div>
                <div class="st-neirong">
                  <div class="sn-top">
                    <div class="st-nicheng">设计师小a</div>
                    <div class="st-pingxin"><img src="../../../static/images/index/xin.png"/></div>
                  </div>
                  <div class="sn-bottom">
                    <div class="sb-nianling">5年</div>
                    <div class="sb-qian">签</div>
                    <div class="sb-ysm">已实名</div>
                    <div class="sb-yrz">已认证</div>
                  </div>
                </div>
                <div class="st-jiageleixin">
                  <div class="st-jiage"><span>￥</span><span>100</span>/时</div>
                  <div class="st-leixin"><span>景观设计</span></div>
                </div>
              </div>
              <div class="sjs-content">
                <div class="sc-jiesao">
                  已有多年建筑设计工作经验，从事建筑方案到效果图，再到建筑施工图都可以完成
                </div>
              </div>
              <div class="sjs-bottom">
                <div class="sjs-yysj">应邀设计</div>
                <div class="sjs-mmlt">喵喵聊天</div>
              </div>
            </div>
            <div class="sjs-list">
              <div class="sjs-top">
                <div class="st-touxiang">
                  <img src="../../../static/images/index/touxiang.png"/>
                </div>
                <div class="st-neirong">
                  <div class="sn-top">
                    <div class="st-nicheng">设计师小a</div>
                    <div class="st-pingxin"><img src="../../../static/images/index/xin.png"/></div>
                  </div>
                  <div class="sn-bottom">
                    <div class="sb-nianling">5年</div>
                    <div class="sb-qian">签</div>
                    <div class="sb-ysm">已实名</div>
                    <div class="sb-yrz">已认证</div>
                  </div>
                </div>
                <div class="st-jiageleixin">
                  <div class="st-jiage"><span>￥</span><span>100</span>/时</div>
                  <div class="st-leixin"><span>景观设计</span></div>
                </div>
              </div>
              <div class="sjs-content">
                <div class="sc-jiesao">
                  已有多年建筑设计工作经验，从事建筑方案到效果图，再到建筑施工图都可以完成
                </div>
              </div>
              <div class="sjs-bottom">
                <div class="sjs-yysj">应邀设计</div>
                <div class="sjs-mmlt">喵喵聊天</div>
              </div>
            </div>
            <div class="sjs-list">
              <div class="sjs-top">
                <div class="st-touxiang">
                  <img src="../../../static/images/index/touxiang.png"/>
                </div>
                <div class="st-neirong">
                  <div class="sn-top">
                    <div class="st-nicheng">设计师小a</div>
                    <div class="st-pingxin"><img src="../../../static/images/index/xin.png"/></div>
                  </div>
                  <div class="sn-bottom">
                    <div class="sb-nianling">5年</div>
                    <div class="sb-qian">签</div>
                    <div class="sb-ysm">已实名</div>
                    <div class="sb-yrz">已认证</div>
                  </div>
                </div>
                <div class="st-jiageleixin">
                  <div class="st-jiage"><span>￥</span><span>100</span>/时</div>
                  <div class="st-leixin"><span>景观设计</span></div>
                </div>
              </div>
              <div class="sjs-content">
                <div class="sc-jiesao">
                  已有多年建筑设计工作经验，从事建筑方案到效果图，再到建筑施工图都可以完成
                </div>
              </div>
              <div class="sjs-bottom">
                <div class="sjs-yysj">应邀设计</div>
                <div class="sjs-mmlt">喵喵聊天</div>
              </div>
            </div>
            <div class="sjs-list">
              <div class="sjs-top">
                <div class="st-touxiang">
                  <img src="../../../static/images/index/touxiang.png"/>
                </div>
                <div class="st-neirong">
                  <div class="sn-top">
                    <div class="st-nicheng">设计师小a</div>
                    <div class="st-pingxin"><img src="../../../static/images/index/xin.png"/></div>
                  </div>
                  <div class="sn-bottom">
                    <div class="sb-nianling">5年</div>
                    <div class="sb-qian">签</div>
                    <div class="sb-ysm">已实名</div>
                    <div class="sb-yrz">已认证</div>
                  </div>
                </div>
                <div class="st-jiageleixin">
                  <div class="st-jiage"><span>￥</span><span>100</span>/时</div>
                  <div class="st-leixin"><span>景观设计</span></div>
                </div>
              </div>
              <div class="sjs-content">
                <div class="sc-jiesao">
                  已有多年建筑设计工作经验，从事建筑方案到效果图，再到建筑施工图都可以完成
                </div>
              </div>
              <div class="sjs-bottom">
                <div class="sjs-yysj">应邀设计</div>
                <div class="sjs-mmlt">喵喵聊天</div>
              </div>
            </div>
          </div>
        </swiper-item>
        <swiper-item >
          <div class="tab-swiper vux-center">
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
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>

<script>
  import { Tab, TabItem, Swiper, SwiperItem,Search} from 'vux'
  export default {
    components: {
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
      Search,
    },
    data() {
      return {
        index: 0,
      }

    },
    mounted: function () {
      this.qingchu();
    },
    methods: {
      goback() {
        this.$router.goBack();
      },
      toUrl(name) {
        this.$router.push({name: name});
      },
      setFocus() {
        this.$refs.search.setFocus()
      },
      resultClick(item) {
        window.alert('you click the result item: ' + JSON.stringify(item))
      },
      getResult(val) {
        console.log('on-change', val)
        this.results = val ? getResult(this.value) : []
      },
      onSubmit() {
        this.$refs.search.setBlur()
        this.$vux.toast.show({
          type: 'text',
          position: 'top',
          text: 'on submit'
        })
      },
      onFocus() {
        console.log('on focus')
      },
      onCancel() {
        console.log('on cancel')
      },
      //清空搜索框里的值
      qingchu (){
        $(".searchcha").click(function(){
          $("#search-inp").val('');
        });
      }
    },

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
<style lang="less" scoped>
  @import "../../assets/css/index/search-jieguo.css";
  .tabs{
    position: fixed;
    top: 0.8rem;
    left: 0;
    background: white;
    z-index: 99999;
  }

  .swps{
      margin-top: 1.65rem;
      height:14rem !important;
      overflow:auto !important;
  }
</style>
