<template>
  <div>
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <div class="header-right">确定</div>
    </div>
    <!--文章详情-->
    <div class="content">
      <div class="piaoti">
        桥梁建筑大师邓文中：城市环境是吸引人才的重点
      </div>
      <div class="nichengshijian">
        <div class="ns-left">
          <span><img src="../../../static/images/bj.jpg"/></span><span>设计师昵称</span>
        </div>
        <div class="tm-right">
          <span>发布时间</span> <span>2017-08-12</span>
        </div>
      </div>
      <div class="neirongshijian">
        <p>本报讯(记者 任笑元)工信部官微昨日援引12321网络不良与垃圾信息举报受理中心的统计情况，公布2017年8月，12321举报中心收到钓鱼网站前十名，提醒用户警惕钓鱼网站假冒知名品牌及网站的可能性，包括：假冒苹果公司、奔跑吧兄弟、中国新歌声、爸爸去哪儿、10086、工商银行、建设银行、农业银行、民生银行、交通银行的钓鱼信息</p>

        <p>根据12321网络不良与垃圾信息举报受理中心(www.12321.cn)接到网民举报的短信、邮件、网站等信息，2017年8月，被举报最多的是假冒苹果公司的钓鱼诈骗网站，举报量达192件次，比7月份增加了3.1%。排名第二的是假冒奔跑吧兄弟的钓鱼诈骗网站，比7月份增加了264.3%。</p>
        <div class="bottom">
          <div class="bottom-zan">
            <span><img src="../../../static/images/bj.jpg"/></span><span>100</span>
          </div>
          <div class="bottom-sz">
            <span><img src="../../../static/images/bj.jpg"/></span><span>收藏</span>
          </div>
        </div>
      </div>
    </div>

    <!--评论详情-->
    <div class="pinglun">
      <p>热门评论</p>
      <div class="pinlunlist"@click="toUrl('pinlunxiangqing')">
        <div class="top-pinlun">
          <div class="tp-left">
            <span><img src="../../../static/images/bj.jpg"/></span><span>用户昵称</span>
          </div>
          <div class="tp-right">
            <span>100</span><span><img src="../../../static/images/bj.jpg"/></span>
          </div>
        </div>
        <div class="neirong">
          评论内容评论内容评论内容评论内容评论内容评 评论内容评论内容评论内容评论内容评论内容评
        </div>
        <div class="bottom">
          <div class="left-bt">
            2017-01-01
          </div>
          <div class="right-bt">
            100条回复
          </div>
        </div>
      </div>
      <div class="pinlunlist">
        <div class="top-pinlun">
          <div class="tp-left">
            <span><img src="../../../static/images/bj.jpg"/></span><span>用户昵称</span>
          </div>
          <div class="tp-right">
            <span>100</span><span><img src="../../../static/images/bj.jpg"/></span>
          </div>
        </div>
        <div class="neirong">
          评论内容评论内容评论内容评论内容评论内容评 评论内容评论内容评论内容评论内容评论内容评
        </div>
        <div class="bottom">
          <div class="left-bt">
            2017-01-01
          </div>
          <div class="right-bt">
            100条回复
          </div>
        </div>
      </div>
    </div>
    <!--输入评论-->
    <div class="sr-bottom">
      <div class="shurukuang">
        <div class="srk-tupiao">
          <img src="../../../static/images/bj.jpg"/>
        </div>
        <div class="shuru">
          <input type="text" placeholder="写评论" />
        </div>
      </div>
      <div class="xiaoxi">
        <span><img src="../../../static/images/bj.jpg"/></span><span>100</span>
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
  @import '../../assets/css/meow/wzxq.css';
</style>
