<template>
  <div id="app">
    <!--<keep-alive>-->
      <!--<router-view v-if="$route.meta.keepAlive"></router-view>-->
    <!--</keep-alive>-->
    <!--<router-view v-if="!$route.meta.keepAlive"></router-view>-->
    <!-- 所有keapAlive页面 -->
    <transition :name="'vux-pop-'+ ($store.state.direction==0?'in':'out')">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" ref="routerView"></router-view>
      </keep-alive>
    </transition>
    <!-- 所有未keapAlive页面 -->
    <transition :name="'vux-pop-'+ ($store.state.direction==0?'in':'out')">
      <router-view v-if="!$route.meta.keepAlive" ref="routerView2"></router-view>
    </transition>
    <div v-transfer-dom>
      <confirm v-model="show"
               title="温馨提示"
               @on-cancel="onCancel"
               @on-confirm="onConfirm"
               @on-show="onShow"
               @on-hide="onHide">
        <p style="text-align:center;">{{showTips}}</p>
      </confirm>
    </div>
  </div>
</template>

<script>
  import { Confirm,TransferDomDirective as TransferDom } from 'vux'
  export default {
    name: 'app',
    directives: {
      TransferDom
    },
    components: {
      Confirm,
    },
    data () {
      return {
        show: false,
        showTips: '',
      }
    },
    created () {
      // console.log('$route.meta.keepAlive:' + this.$route.meta.keepAlive)
      var _self = this;
      document.addEventListener( "plusready", function () {
        console.log("app.vue addEventListener plusready:");
        // 监听android后退键
        plus.key.addEventListener('backbutton',function () {
          var path = _self.$route.path;
          // console.log("currPath:"+path);
          if( path.indexOf('home/')>=0 ){
            if( path.indexOf('/meow')>=0 ){
              // 清除预览图片
              var len = $(".pswp.vux-previewer.pswp--open").length;
              if( len > 0 ){
                $(".pswp.vux-previewer.pswp--open").find(".pswp__bg").attr("style","");
                $(".pswp.vux-previewer.pswp--open").attr("style","");
                $(".pswp.vux-previewer.pswp--open").attr("aria-hidden","true");
                $(".pswp.vux-previewer.pswp--open").attr("class","pswp vux-previewer");
              }else{
                plus.runtime.quit();
              }
            }else{
              plus.runtime.quit();
            }
          }else if( path.indexOf('/pengyouquanxq')>=0 ){
            _self.$refs.routerView2.appVueFun();
          }else if( path.indexOf('/fbwd')>=0 || path.indexOf('/fbmmq')>=0 ||
            path.indexOf('/fabudingdan')>=0 ){
            _self.showFun('确认放弃编辑?');
          }else{
            _self.$router.goBack();
          }
        },false);
      }, false );
    },
    methods:{
      onCancel () {
        console.log('on cancel')
      },
      onConfirm (msg) {
        console.log('on confirm')
        this.$router.goBack()
      },
      onHide () {
        console.log('on hide')
      },
      onShow () {
        console.log('on show')
      },
      showFun(tips){
        this.showTips = tips;
        this.show=true;
      },
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
    -webkit-overflow-scrolling: touch;
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
