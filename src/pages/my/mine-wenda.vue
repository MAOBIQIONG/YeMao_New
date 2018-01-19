<template>
  <div >
    <!--导航栏-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <div class="daohang">
        <ul class="tab_menu">
          <li class="selected">提问</li>
          <li class="tz">回答</li>
        </ul>
      </div>
    </div>
    <div class="content">
      <div class="tab_box">
        <!--消息列表-->
        <div class="xiaoxi">
          <div class="weida">
            <div class="wd-top">
              <div class="touxiang">
                <img src="../../../static/images/bj.jpg"/>
              </div>
              <p class="nicheng">昵称</p>
            </div>
            <div class="tupian">
              <img src="../../../static/images/bj.jpg"/>
            </div>
            <div class="neirong">
              <div class="piapti">
                如果你无法简洁的表达你的想法，那只说明你还不够了解它。- 阿尔伯特·爱因斯坦?
              </div>
              <div class="jieshao">
                如果你无法简洁的表达你的想法，那只说明你还不够了解它阿尔伯特·爱因斯坦如果你无法简洁的表达你的想法，那只说明你还不够了解它。- 阿尔伯特·爱因斯坦阿尔伯特
              </div>
            </div>
            <div class="pingjia">
              <span>100</span>赞同 · <span>100</span>评论
            </div>
          </div>
        </div>
        <!--通知列表-->
        <div class="tongzhi hide">
          <div class="tiwen-list">
            <div class="tl-top">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor…
            </div>
            <div class="tl-bottom">
              1个月前
            </div>
          </div>
          <div class="tiwen-list">
            <div class="tl-top">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor…
            </div>
            <div class="tl-bottom">
              1个月前
            </div>
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
    mounted: function () {
      this.tab();
    },
    methods: {
      goback(){
        this.$router.goBack();
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
      tab() {
        var $tab_li = $('.daohang ul li');
        $($tab_li).on("click", function () {
          $(this).addClass('selected').siblings().removeClass('selected');
          var index = $tab_li.index(this);
          $('div.tab_box > div').eq(index).show().siblings().hide();
        });
        var from = sessionStorage.getItem("from");
        if (from == 'pageA') {
          $(".tz").addClass('selected').siblings().removeClass('selected');
          $('.hide').show().siblings().hide();
          sessionStorage.setItem("from", ""); //销毁 from 防止在b页面刷新 依然触发$('#xxx').click()
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../static/css/my/mine-wenda.css';
  .content{
    padding-top: 1.2rem;
  }
</style>
