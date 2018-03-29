<template>
  <div class="meow">
    <!--导航栏-->
    <div class="header p-static">
      <div class="hd-cont">
        <ul>
          <li class="tab miaomiao" :class="tabIndex==0?'cur':''" v-tap="{methods:toggleTab,index:0}">喵喵圈</li>
          <li class="tab miaomiaopaizhuan" :class="tabIndex==1?'cur':''" v-tap="{methods:toggleTab,index:1}">喵喵拍砖</li>
          <li class="tab huodong" :class="tabIndex==2?'cur':''" v-tap="{methods:toggleTab,index:2}">活动</li>
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
        tabIndex: 0,
        currentTab: 'miaomiao'  // currentTab 用于标识当前触发的子组件
      }
    },
    methods: {
      goback () {
        this.$router.goBack()
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
      toggleTab: function(params) {
        // tab 为当前触发标签页的组件名
        this.tabIndex = params.index;
        if(params.index==0){
          this.currentTab='miaomiao';
        }else if(params.index==1){
          this.currentTab='miaomiaopaizhuan';
        }else if(params.index==2){
          this.currentTab='huodong';
        }
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
