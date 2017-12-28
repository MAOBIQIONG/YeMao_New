<template>
  <div>
    <!--头部导航-->
    <div class="header">
      <div class="header-left" @click="goback"><img src="../../../static/images/back.png"/></div>
      <span>案列详情</span>
      <div class="header-right">删除</div>
    </div>
    <!--详情内容-->
    <div class="content">
      <div class="xc-top">
        <div class="touxiang">
          <img src="../../../static/images/bj.jpg"/>
        </div>
        <p>工作室</p>
        <div class="shijian">
          2017-01-01
        </div>
      </div>
      <div class="xc-banner">
        <!--轮播-->
        <swiper height="4.8rem" :list="demo01_list"
                @on-index-change="demo01_onIndexChange"></swiper>
      </div>
      <div class="gkrs">
        <div class="zhan">
          <span><img src="../../../static/images/designer/anli_xihuan.png"></span><span>800</span>
        </div>
        <div class="guankan">
          <span><img src="../../../static/images/designer/anli_liulan.png"></span><span>200</span>
        </div>
      </div>
      <div class="xqjs">
        <div class="smjs">
          Westmoreland公园凉亭，美国达拉斯 / Murray Legge Architecture
        </div>
      </div>
      <!--评价内容-->
      <div class="pingjia-list">
        <div class="gzpj-list">
          <div class="pl-top">
            <div class="touxiang">
              <img src="../../../static/images/bj.jpg"/>
            </div>
            <p>雇主昵称</p>
          </div>
          <div class="pl-content">
            如果你无法简洁的表达你的想法，那只说明你还不够了解它。如果你无法简洁的表达你的想法，那只说明你还不够了解它。
          </div>
          <div class="pl-bottom">
            <div class="shijian">
              2017-12-23 8:35
            </div>
            <div class="pingfen">

            </div>
          </div>
        </div>
        <div class="ygpj-list">
          <div class="ygpj-top">
            <div class="touxiang">
              <img src="../../../static/images/bj.jpg"/>
            </div>
            <p>游客昵称</p>
            <div class="shijian">
              2017-12-23 08:23
            </div>
          </div>
          <div class="ygpj-content">
            如果你无法简洁的表达你的想法，那只说明你还不够了解它。如果你无法简洁的表达你的想法，那只说明你还不够了解它。
          </div>
        </div>
        <div class="ygpj-list">
          <div class="ygpj-top">
            <div class="touxiang">
              <img src="../../../static/images/bj.jpg"/>
            </div>
            <p>游客昵称</p>
            <div class="shijian">
              2017-12-23 08:23
            </div>
          </div>
          <div class="ygpj-content">
            如果你无法简洁的表达你的想法，那只说明你还不够了解它。如果你无法简洁的表达你的想法，那只说明你还不够了解它。
          </div>
        </div>
      </div>
    </div>
    <!--弹窗-->
    <div class="tanchuang">
      <div class="tisi">
        <!--<div class="ts-top">-->
          <!--标题行-->
        <!--</div>-->
        <div class="nr">
          你要删除这个案列吗?
        </div>
        <div class="ts-bottom">
          <div class="bt-left quxiao">
            取消
          </div>
          <div class="bt-right">
            确定
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Swiper, SwiperItem,} from 'vux'

  const baseList = [
    {
      url: 'javascript:',
      img: 'https://static.vux.li/demo/1.jpg',
    },
    {
      url: 'javascript:',
      img: 'https://static.vux.li/demo/2.jpg',
    },
    {
      url: 'javascript:',
      img: 'https://static.vux.li/demo/1.jpg',
    },
    {
      url: 'javascript:',
      img: 'https://static.vux.li/demo/1.jpg',
    },
    {
      url: 'javascript:',
      img: 'https://static.vux.li/demo/1.jpg',
    },
    {
      url: 'javascript:',
      img: 'https://static.vux.li/demo/1.jpg',
    },
    {
      url: 'javascript:',
      img: 'https://static.vux.li/demo/1.jpg',
    },
    {
      url: 'javascript:',
      img: 'https://static.vux.li/demo/1.jpg',
    },

    {
      url: 'javascript:',
      img: 'https://static.vux.li/demo/3.jpg',
      fallbackImg: 'https://static.vux.li/demo/3.jpg'
    }
  ]
  const urlList = baseList.map((item, index) => ({
    url: 'http://m.baidu.com',
    img: item.img,
    fallbackImg: item.fallbackImg,
  }))
  export default {
    components: {
      Swiper,
      SwiperItem,
    },
    data() {
      return {
        demo01_list: urlList,
        demo01_index: 0,
      }
    },
    mounted: function () {
      this.tanchuang();
    },
    methods: {
      goback() {
        this.$router.goBack();
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
      demo01_onIndexChange(index) {
        this.demo01_index = index
      },
      getThisHeight(ele) {
        var id1 = document.getElementById('id1')
        var id2 = document.getElementById('id2')
        alert(id1.offsetHeight + '<>' + id2.offsetHeight)
      },
      //		弹窗
      tanchuang(){
        $(".header-right").click(function(){
          $(".tanchuang").show();
        });
        $(".quxiao").click(function(){
          $(".tanchuang").hide();
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../assets/css/designer/anliexq.css';
</style>
