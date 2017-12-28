<template>
  <div class="designer">
    <!--头部导航-->
    <div class="header">
      <span>设计师</span>
      <div class="header-right" @click="toUrl('message')">
        <span><img src="../../../static/images/designer/ling.png" /></span>
        <div class="hongdian"></div>
      </div>
    </div>
    <!--模块-->
    <div class="mokuai">
       <ul>
          <li @click="toUrl('shejishigerenzhongxin')">
           <p>
             <img src="../../../static/images/designer/geren.png" />
           </p>
           <p>个人中心</p>
          </li>
          <li @click="toUrl('mymoney')">
            <p>
              <img src="../../../static/images/designer/qianbao.png" />
            </p>
            <p>钱包</p>
          </li>
          <li @click="toUrl('renzheng')">
            <p>
              <img src="../../../static/images/designer/renzhen.png" />
            </p>
            <p>认证中心</p>
          </li>
          <li @click="toUrl('myorderchuli')">
            <p>
              <img src="../../../static/images/designer/dingdan.png" />
            </p>
            <p>订单</p>
          </li>
      </ul>
    </div>
    <!--智能排序-->
    <div class="sanxuan">
      <div class="sx-cont">
        <ul>
          <li class="znpx-1">
            <p class="znpx">智能排序</p>
          </li>
          <li class="nx-1">
            <p class="nx">年限</p>
          </li>
          <li class="rz-1">
            <p class="rz">认证</p>
          </li>
        </ul>
        <div class="sort-filter">
          <div class="area on">
            <ul>
              <li class="bg_click">人气最高</li>
              <li class="bg">最新发布</li>
            </ul>
          </div>
          <div class="areanx on">
            <ul>
              <li class="bg_click">不限</li>
              <li class="bg">一年以下</li>
              <li class="bg">1-3年</li>
              <li class="bg">3-5年</li>
              <li class="bg">5年以上</li>
            </ul>
          </div>
          <div class="arearz on">
            <ul>
              <li class="bg_click">不限</li>
              <li class="bg">已实名</li>
              <li class="bg">已认证</li>
              <li class="bg">已签约</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
    <!--设计师列表-->
    <div class="content">
      <div class="sjs-list"@click="toUrl('sjszxxq')">
        <div class="sjs-top">
          <div class="st-touxiang">
            <img src="../../../static/images/bj.jpg" />
          </div>
          <div class="st-neirong">
            <div class="sn-top">
              <div class="st-nicheng">设计师小a</div>
              <div class="st-pingxin"></div>
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
            <img src="../../../static/images/bj.jpg" />
          </div>
          <div class="st-neirong">
            <div class="sn-top">
              <div class="st-nicheng">设计师小a</div>
              <div class="st-pingxin"></div>
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
            <img src="../../../static/images/bj.jpg" />
          </div>
          <div class="st-neirong">
            <div class="sn-top">
              <div class="st-nicheng">设计师小a</div>
              <div class="st-pingxin"></div>
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
  </div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    mounted: function () {
      this.znpx('.znpx-1','.area','.area ul li');
      this.znpx('.nx-1','.areanx','.areanx ul li');
      this.znpx('.rz-1','.arearz','.arearz ul li');
    },
    methods: {
      goback(){
        this.$router.goBack();
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
      //智能排序
      znpx(obj,zj,zjj){
        $(obj).click(function() {
          var $t = $(obj);
          var $other = $(obj).siblings();
          var $otherz = $(zj).siblings();
          if($t.hasClass('up')) {
            $(obj).removeClass('up').addClass('st');
            $(zj).removeClass('off').addClass('on');
          } else {
            $(obj).removeClass('st').addClass('up');
            $(zj).removeClass('on').addClass('off');
          }
          $other.addClass('st').removeClass('up')
          $otherz.addClass('on').removeClass('off')
        });
        $(zjj).on('click',function(){

          var $div = $(this);

          var $others = $div.siblings();

          if($div.hasClass('bg')){

            $div.removeClass('bg').addClass('bg_click')

          }else {

            $div.removeClass('bg_click').addClass('bg')

          }
          $others.addClass('bg').removeClass('bg_click')
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../assets/css/designer/designer.css';
  .header .header-right .hongdian{
    width: 0.1rem;
    height: 0.1rem;
    background: red;
    border-radius: 50%;
    position: absolute;
    right: 0;
    top: 0.1rem;
  }
  .sx-cont .area,.areanx,.arearz {
    position: absolute;
    width: 100%;
    top: 0.9rem;
    left: 0;
    background: #fefefe;
    z-index: 999;
  }
  .sx-cont .area ul li,.sx-cont .areanx ul li,.sx-cont .arearz ul li {
    width: 100%;
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
    color: #8d8d8d;
    border-top: 1px solid #f2f2f2;
  }
  .bg{
    background:#fefefe;
  }
  .bg_click {
    background:#f3f3f3;
  }
  .sanxuan .sx-cont ul .up p:after {
    margin-top: 0;
    -webkit-transform: rotate(-45deg);
  }
  .sanxuan .sx-cont ul .st p:after {
    margin-top: -0.1rem;
    -webkit-transform: rotate(135deg);
  }
  .off{
    display: block;
  }
  .on{
    display: none;
  }
</style>
