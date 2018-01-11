<template>
  <div class="miaomiao">
    <!-- 板块-->
    <div class="bankuai">
      <ul>
        <li @click="toUrl('shouchangmxt')">
          <img src="../../../static/images/meow/01_miaoxuetang.png">
          <div class="wenzhi"> 喵学堂</div>
        </li>
        <li @click="toUrl('shouchangweida')">
          <img src="../../../static/images/meow/02_wenda.png">
          <div class="wenzhi"> 问答</div>
        </li>
        <li @click="toUrl('shouchangjianli')">
          <img src="../../../static/images/meow/03_rencai.png">
          <div class="wenzhi"> 人才</div>
        </li>
        <li @click="toUrl('xiaoyouhui')">
          <img src="../../../static/images/meow/04_xiaoyouhui.png">
          <div class="wenzhi">校友会</div>
        </li>
      </ul>
    </div>
    <!--  喵喵列表-->
    <div class="mm-list miao">
      <div class="sjse-list"@click.stop="toUrl('pengyouquanxq')">
        <div class="sjs-top">
          <div class="st-touxiang"@click.stop="toUrl('sjszxxq')">
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
           <li v-for="(item, index) in list"@click.stop="show(index)">
             <!-- <img class="previewer-demo-img":src="item.src"> -->
                <div class="previewer-img" :style="`background-image:url(${item.src}`"></div>
           </li>
            <div v-transfer-dom>
              <previewer :list="list" ref="previewer" :options="options"></previewer>
            </div>
          </ul>
        </div>
        <div class="pinjia">
          <p class="dz"@click.stop="dianzan()"><span>100</span></p>
          <p><span> <img src="../../../static/images/liulan.png"/></span><span>100</span></p>
        </div>
      </div>
    </div>
    <div class="tianjia"@click="toUrl('fbmmq')">

    </div>
  </div>
</template>

<script>
  import { Previewer, TransferDom } from 'vux'
  export default {
    directives: {
      TransferDom
    },
    components: {
      Previewer
    },
    data() {
      return {
        imgs:[],
        list: [
          {
            src: 'https://ooo.0o0.ooo/2017/05/17/591c271ab71b1.jpg',
            w: 1200,
            h: 700,
          },
          {
            src: 'https://ooo.0o0.ooo/2017/05/17/591c271acea7c.jpg'
          },
          {
            src: 'https://ooo.0o0.ooo/2017/06/15/59425a592b949.jpeg'
          },
          {
            src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2925141724,2164083845&fm=200&gp=0.jpg'
          },
          {
            src: 'https://ooo.0o0.ooo/2017/06/15/59425a592b949.jpeg'
          },
          {
            src: 'https://ooo.0o0.ooo/2017/06/15/59425a592b949.jpeg'
          },
          {
            src: 'https://ooo.0o0.ooo/2017/06/15/59425a592b949.jpeg'
          },
          {
            src: 'https://ooo.0o0.ooo/2017/06/15/59425a592b949.jpeg'
          },
          {
            src: 'https://ooo.0o0.ooo/2017/06/15/59425a592b949.jpeg'
          },
        ],
        options: {
          getThumbBoundsFn(index) {
            // find thumbnail element
            let thumbnail = document.querySelectorAll('.previewer-img')[index]
            // get window scroll Y
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            // optionally get horizontal scroll
            // get position of element relative to viewport
            let rect = thumbnail.getBoundingClientRect()
            // w = width
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
            // Good guide on how to get element coordinates:
            // http://javascript.info/tutorial/coordinates
          }
        }
      }
    },
    created(){
        this.preLoadImgs();
    },
    mounted: function () {
      this.miao();
      console.log(this.imgs);
    },
    methods: {
      goback () {
        this.$router.goBack()
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
      show (index) {
        this.$refs.previewer.show(index)
      },
      //tab选择
      miao(){
      $(".hd-cont li").click(function(){
          $(".hd-cont li").eq($(this).index()).addClass("cur").siblings().removeClass('cur');
      });
      },
      //      点赞效果
      dianzan(){
        $(".dz").click(function(){
            $(".dz").addClass("dzh");
        });
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../static/css/meow/miaomiao.css';
  .cur{
    border-bottom: 1px solid #f65aa6;
  }
  .sjs-bottom ul li {
    float: left;
    width: 2.4rem;
    height: 2.4rem;
    background: #CCCCCC;
    margin: 0.05rem;
    text-align: center;
    overflow: hidden;
    /*background: url("../../../static/images/bj.jpg");*/
    /*background-position: center center;*/
    /*background-repeat: no-repeat;*/
  }
  .sjs-bottom ul li img{
    height: 100%;
  }
  .dz{
    height: 0.9rem;
    line-height: 0.9;
    display: inline-block;
    background: url("../../../static/images/collect.png") no-repeat;
    background-size: 0.4rem 0.4rem;
    background-position-y:0.25rem;
  }
  .dzh{
    height: 0.9rem;
    line-height: 0.9;
    display: inline-block;
    background: url("../../../static/images/collect-hover.png") no-repeat;
    background-size: 0.4rem 0.4rem;
    background-position-y:0.25rem;
  }
  .dz span{
    padding-left: 0.5rem;
  }
  .tianjia{
    position: fixed;
    width:1rem;
    height: 1rem;
    bottom: 1.3rem;
    right: 0.2rem;
    border-radius: 50%;
    background: url("../../../static/images/meow/jiah.png");
    background-size: 100% 100%;
    background-position: center center;
    background-repeat: no-repeat;
  }
  .previewer-img{
      width:100%;
      height:100%;
      background-repeat: no-repeat;
      background-position:center center;
      background-size: cover
  }
</style>
