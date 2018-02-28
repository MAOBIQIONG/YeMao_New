<template>
  <div class="meow">
    <!--导航栏-->
    <div class="header p-static">
      <div class="hd-cont">
        <ul>
          <li class="tab miaomiao cur" @click="toggleTab(0)"ref="miaomiao">喵喵圈</li>
          <li class="tab miaomiaopaizhuan " @click="toggleTab(1)"ref="miaomiaopaizhuan">喵喵拍砖</li>
          <li class="tab huodong" @click="toggleTab(2)"ref="huodong">活动</li>
        </ul>
      </div>
    </div>
    <!--内容-->
    <miaomiao :is="currentTab" keep-alive></miaomiao>
  </div>
</template>

<script>
  // 引入子组件
  import miaomiao from '../../components/meow/miaomiao';
  import miaomiaopaizhuan from '../../components/meow/miaomiaopaizhuan';
  import huodong from '../../components/meow/huodong';
  export default {
    components: {  // 声明子组件
      miaomiao,
      miaomiaopaizhuan,
      huodong
    },
    data() {
      return {
        currentTab: 'miaomiao'  // currentTab 用于标识当前触发的子组件
      }
    },
    mounted: function () {
      this.miao();
    },
    methods: {
      goback () {
        this.$router.goBack()
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
      toggleTab: function(index) {
        // tab 为当前触发标签页的组件名
        if(index==0){
          this.currentTab='miaomiao';
        }else if(index==1){
          this.currentTab='miaomiaopaizhuan';
        }else if(index==2){
          this.currentTab='huodong';
        }
      },
      //tab选择
      miao(){
      $(".hd-cont li").click(function(){
          $(".hd-cont li").eq($(this).index()).addClass("cur").siblings().removeClass('cur');
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
  .meow{
    width: 100%;
    position: fixed;
  }
</style>
