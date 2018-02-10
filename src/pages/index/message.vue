<template>
  <div class="">
    <div class="header">
      <div class="header-left" v-tap="{methods:goback}"><img src="../../../static/images/back.png" /></div>
      <div class="daohang">
        <ul class="tab_menu">
          <li class="xx" v-tap="{methods:toggleTab,index:0}" ref="xiaoxi" :class="tabIndex==0?'selected':''">消息</li>
          <li class="tz" v-tap="{methods:toggleTab,index:1}" ref="tongzhi" :class="tabIndex==1?'selected':''">通知</li>
        </ul>
      </div>
    </div>
    <!--<div class="msg-content content-p">-->
      <!--<div class="tab_box">-->
        <!--&lt;!&ndash;消息列表&ndash;&gt;-->
        <!--<div class="xiaoxi">-->
          <!--<div class="xiaoxi-list" v-tap="{ methods:toUrl , pagename:'liaotian'}">-->
            <!--<div class="xl-touxiang">-->
              <!--<img src="../../../static/images/index/bj.jpg" />-->
            <!--</div>-->
            <!--<div class="xiao-right">-->
              <!--<div class="xr-top">-->
                <!--<span class="name">昵称</span>-->
                <!--<span class="time">2017-10-10</span>-->
              <!--</div>-->
              <!--<div class="xr-bottom">-->
                <!--已有多年建筑设计工作经验，从事建筑方案到效果图，再到建筑施工图都可以完成-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="xiaoxi-list" v-tap="{ methods:toUrl , pagename:'liaotian'}">-->
            <!--<div class="xl-touxiang">-->
              <!--<img src="../../../static/images/index/bj.jpg" />-->
            <!--</div>-->
            <!--<div class="xiao-right">-->
              <!--<div class="xr-top">-->
                <!--<span class="name">昵称</span>-->
                <!--<span class="time">2017-10-10</span>-->
              <!--</div>-->
              <!--<div class="xr-bottom">-->
                <!--已有多年建筑设计工作经验，从事建筑方案到效果图，再到建筑施工图都可以完成-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->

        <!--</div>-->
        <!--&lt;!&ndash;通知列表&ndash;&gt;-->
        <!--<div class="tongzhi hide">-->
          <!--<div class="tongzhi-list" v-tap="{ methods:toUrl , pagename:'informxitong'}">-->
            <!--<div class="tl-touxiang">-->
              <!--<img src="../../../static/images/index/tongzhi_xitong.png">-->
            <!--</div>-->
            <!--<div class="tl-right">-->
              <!--系统通知-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="tongzhi-list" v-tap="{ methods:toUrl , pagename:'informxitong'}">-->
            <!--<div class="tl-touxiang">-->
              <!--<img src="../../../static/images/index/tongzhi_huodong.png">-->
            <!--</div>-->
            <!--<div class="tl-right">-->
              <!--活动通知-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <miaomiao :is="currentTab" keep-alive></miaomiao>
  </div>
</template>

<script>
  // 引入子组件
  import news from '../../components/index/news.vue';
  import notice from '../../components/index/notice.vue';
  export default {
    components: {  // 声明子组件
      news,
      notice
    },
    data () {
      return {
        tabIndex:0,
        currentTab:'news',
      }
    },
    created: function () {
    },
    methods: {
      goback() {
        this.$router.goBack();
      },
      toUrl: function (params) {
        this.$router.push({name: params.pagename})
      },
      toggleTab: function(params) {
        var _self = this;
        // tab 为当前触发标签页的组件名
        _self.tabIndex = params.index;
        _self.currentTab = params.index==0 ? 'news' : 'notice';
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../static/css/index/message.css';
</style>
