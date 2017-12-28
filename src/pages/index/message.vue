<template>
  <div class="">
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <div class="daohang">
        <ul class="tab_menu">
          <li class="selected">消息</li>
          <li class="tz">通知</li>
        </ul>
      </div>
    </div>
    <div class="msg-content">
      <div class="tab_box">
        <!--消息列表-->
        <div class="xiaoxi">
          <div class="xiaoxi-list"@click="toUrl('liaotian')">
            <div class="xl-touxiang">
              <img src="../../../static/images/index/bj.jpg" />
            </div>
            <div class="xiao-right">
              <div class="xr-top">
                <span class="name">昵称</span>
                <span class="time">2017-10-10</span>
              </div>
              <div class="xr-bottom">
                已有多年建筑设计工作经验，从事建筑方案到效果图，再到建筑施工图都可以完成
              </div>
            </div>
          </div>
          <div class="xiaoxi-list"@click="toUrl('liaotian')">
            <div class="xl-touxiang">
              <img src="../../../static/images/index/bj.jpg" />
            </div>
            <div class="xiao-right">
              <div class="xr-top">
                <span class="name">昵称</span>
                <span class="time">2017-10-10</span>
              </div>
              <div class="xr-bottom">
                已有多年建筑设计工作经验，从事建筑方案到效果图，再到建筑施工图都可以完成
              </div>
            </div>
          </div>

        </div>
        <!--通知列表-->
        <div class="tongzhi hide">
          <div class="tongzhi-list"@click="toUrl('informxitong')">
            <div class="tl-touxiang">
              <img src="../../../static/images/index/tongzhi_xitong.png">
            </div>
            <div class="tl-right">
              系统通知
            </div>
          </div>
          <div class="tongzhi-list"@click="toUrl('informxitong')">
            <div class="tl-touxiang">
              <img src="../../../static/images/index/tongzhi_huodong.png">
            </div>
            <div class="tl-right">
              活动通知
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
    created: function () {
    },
    mounted:function(){
      this.tap();
    },
    methods: {
      goback() {
        this.$router.goBack();
      },
      toUrl(name){
        this.$router.push({name:name,query:{id:this.$route.query.id}});
      },
      tap(){
        var $tab_li = $('.daohang ul li');
        $($tab_li).on("click",function(){
          $(this).addClass('selected').siblings().removeClass('selected');
          var index = $tab_li.index(this);
          $('div.tab_box > div').eq(index).show().siblings().hide();
        });
        var from = sessionStorage.getItem("from");
        if(from == 'pageA') {
          $(".tz").addClass('selected').siblings().removeClass('selected');
          $('.hide').show().siblings().hide();
          sessionStorage.setItem("from","");
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../assets/css/index/message.css';
</style>
