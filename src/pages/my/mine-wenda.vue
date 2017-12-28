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
    <div class="msg-content">
      <div class="tab_box">
        <!--消息列表-->
        <div class="xiaoxi">
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
        <!--通知列表-->
        <div class="tongzhi hide">

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
  @import '../../assets/css/my/mine-wenda.css';
</style>
