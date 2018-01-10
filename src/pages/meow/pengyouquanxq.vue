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
          <div class="sc-jiesao sc-jieshao1">
            如果你无法简洁的表达你的想法，那只说明你还不够如果你无法简洁的表达你的想法，那只说明你还不够了解它,你需要去了解它。
          </div>
        </div>
        <div class="sjs-bottom sjs-bottom1">
          <ul>
            <li v-for="(item, index) in list"@click.stop="show(index)">
              <img class="previewer-demo-img":src="item.src"width="100%">
            </li>
            <div v-transfer-dom>
              <previewer :list="list" ref="previewer" :options="options"></previewer>
            </div>
          </ul>
        </div>
        <div class="pinjia">
          <p class="dz"><span>100</span></p>
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
  import { Previewer, TransferDom } from 'vux'
  export default {
    directives: {
      TransferDom
    },
    components: {
      Previewer
    },
    data: function () {
      return {
        list:[
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
          {
            src: 'https://ooo.0o0.ooo/2017/06/15/59425a592b949.jpeg'
          },
        ],
        options: {
          getThumbBoundsFn(index) {
            // find thumbnail element
            let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
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
    mounted: function () {
      this.dianzan();
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
//      点赞效果
      dianzan(){
        var lr=true
        $(".dz").click(function(){
          if(lr==true){
            $(".dz").addClass("dzh");
            lr=false
          }else if(lr==false){
            $(".dz").removeClass("dzh");
            lr=true
          }
        });
      },
    }
  }
</script>
<style scoped>
  @import '../../../static/css/meow/miaomiao.css';
  .sjs-bottom ul li {
    float: left;
    width: 2.4rem;
    height: 2.4rem;
    background: #CCCCCC;
    margin: 0.05rem;
    overflow: hidden;
    /*background: url("../../../static/images/bj.jpg");*/
    /*background-position: center center;*/
    /*background-repeat: no-repeat;*/
  }
  .sjs-bottom ul li img{
    height: 100%;
  }
  .sc-jieshao1{
    width: 7rem;
    display: inline-block !important;
    -webkit-box-orient: vertical;
    color: rgb(102, 102, 102);
    overflow:auto!important;
  }
  .sjs-bottom1{
    display: inline-block;
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
</style>
