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
  .vux-pop-out-leave-active,
  .vux-pop-in-enter-active,
  .vux-pop-in-leave-active {
    transition: all 300ms;
    height: 100%;
    top: 0;
    position: absolute;
    /*backface-visibility: hidden;*/
    /*perspective: 1000;*/
  }

  .vux-pop-out-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  .vux-pop-out-leave-active {
    transition: all 0ms;
    opacity: 0;
    /*transform: translate3d(100%, 0, 0);*/
  }

  .vux-pop-in-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .vux-pop-in-leave-active {
    transition: all 0ms;
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
  /**confirm**/
  .weui-dialog__hd{
    padding: 0rem 1.6rem !important;
  }

  .xs-plugin-pulldown-container,.xs-plugin-pullup-container{
    font-size: 14px !important;
  }
</style>
