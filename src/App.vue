<template>
  <div id="app">
    <!--<keep-alive>-->
      <!--<router-view v-if="$route.meta.keepAlive"></router-view>-->
    <!--</keep-alive>-->
    <!--<router-view v-if="!$route.meta.keepAlive"></router-view>-->
    <transition :name="'vux-pop-'+ ($store.state.direction==0?'in':'out')">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition :name="'vux-pop-'+ ($store.state.direction==0?'in':'out')">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {}
    },
    created () {
      // console.log('$route.meta.keepAlive:' + this.$route.meta.keepAlive)
      var _self = this;
      document.addEventListener( "plusready", function () {
        // 监听android后退键
        plus.key.addEventListener('backbutton',function () {
          var path = _self.$route.path;
          if( path.indexOf('home/') > 0 ){
            plus.runtime.quit();
          }else{
            _self.$router.goBack();
          }
        },false);
      }, false );
    }
  }
</script>

<!--<style>-->
  <!--#app {-->
    <!--font-family: 'Avenir', Helvetica, Arial, sans-serif;-->
    <!-- -webkit-font-smoothing: antialiased;-->
    <!-- -moz-osx-font-smoothing: grayscale;-->
    <!--/*text-align: center;*/-->
    <!--/*color: #2c3e50;*/-->
    <!--/*margin-top: 60px;*/-->
  <!--}-->
<!--</style>-->

<style scoped>
  #app{
    width: 100%;
    height:100%;
  }
  .vux-pop-out-enter-active,
  /*.vux-pop-out-leave-active,*/
  .vux-pop-in-enter-active
  /*.vux-pop-in-leave-active*/
  {
    height: 100%;
    width: 100%;
    top: 0;
    position: absolute;
    transition: all 160ms;
    -webkit-transform-style: preserve-3d;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -moz-backface-visibility: hidden; /* Firefox */
  }

  /**上一页返回**/
  .vux-pop-out-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  /**上一页离开**/
  .vux-pop-out-leave-active {
    opacity: 0;
    /*transform: translate3d(100%, 0, 0);*/
  }

  /**下一页进入**/
  .vux-pop-in-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  /**下一页离开**/
  .vux-pop-in-leave-active {
    opacity: 0;
    /*transform: translate3d(-100%, 0, 0);*/
  }

</style>

<style>
  body,html{
    width:100%;
    height:100%;
  }
  *{
    margin:0;
  }
  /**vux css重写 start**/
  /**confirm**/
  .weui-dialog__hd{
    padding: 0rem 1.6rem !important;
  }
  /**scroll**/
  .xs-plugin-pulldown-container,.xs-plugin-pullup-container{
    font-size: 14px !important;
  }
  /**loading**/
  .vux-loading .weui-toast{
    width: 3rem !important;
    min-height: 3rem !important;
  }
  /**vux css重写 end**/

</style>
