<template>
  <footer>
    <div class="tabs">
      <!--// :class=" activeFlag=='index' ? ' tabbar-active' : '' " vue.js三目运算添加class-->
      <a id="index" v-tap="{ methods:cgLink , pagename:'index' }" class="tabbar-item item-index" :class="$store.state.pageIndex==0 ? 'tabbar-active' : ''">
        <span class="tabbar-txt">首页</span>
      </a>
      <a id="employer" v-tap="{ methods:cgLink , pagename:'employer' }" class="tabbar-item item-employer" :class="$store.state.pageIndex==1 ? 'tabbar-active' : ''">
        <span class="tabbar-txt">雇主</span>
      </a>
      <a id="meow" v-tap="{ methods:cgLink , pagename:'meow' }" class="tabbar-item item-meow" :class="$store.state.pageIndex==2 ? 'tabbar-active' : ''">
        <span class="tabbar-txt">喵喵圈</span>
      </a>
      <a id="designer" v-tap="{ methods:cgLink , pagename:'designer' }" class="tabbar-item item-designer" :class="$store.state.pageIndex==3 ? 'tabbar-active' : ''">
        <span class="tabbar-txt">设计师</span>
      </a>
      <a id="my" v-tap="{ methods:cgLink , pagename:'my' }" class="tabbar-item item-my" :class="$store.state.pageIndex==4 ? 'tabbar-active' : ''">
      <span class="tabbar-txt">我的</span>
    </a>
    </div>
  </footer>
</template>

<script type="text/babel">
  import store from '@/vuex/store'
  export default {
    name: 'tabbar',
    data: function () {
      return {}
    },
    store,
    methods: {
      cgLink: function (params) {
        var index = this.getIndexByPageName(params.pagename);
        this.$store.state.pageIndex = index;
        this.$router.push({name: params.pagename})
      },
      getIndexByPageName(pagename){
        return pagename=="index" ? 0 : pagename=="employer" ? 1
          : pagename=="meow" ? 2 : pagename=="designer" ? 3 : pagename=="my" ? 4 : 0;
      }
    },
    created: function () {
      // alert(window.location.href)
    }
  }
</script>

<style scoped>
  .tabs{
    height:1.2rem;
    width: 100%;
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    padding: .14rem 0 .07rem 0;
    color: #929292;
    background-color: rgb(255, 255, 255);
    text-align: center;
    border-top:1px solid #f2f2f2;

    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 100;
  }
  .tabs .tabbar-item{
    padding: .2rem 0 .2rem 0;
    background-size: .45rem .45rem !important;
    background-position:  center top .3rem !important;
    background-repeat: no-repeat !important;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
  }
  .tabs .tabbar-txt{
    font-size: .28rem !important;
  }
  /**为选中**/
  .tabs .item-index{
    background: url('../../../static/images/index.png') ;
  }
  .tabs .item-employer{
    background: url('../../../static/images/employer.png') ;
  }
  .tabs .item-meow{
    background: url('../../../static/images/logo.png') ;
  }
  .tabs .item-designer{
    background: url('../../../static/images/designer.png') ;
  }
  .tabs .item-my{
    background: url('../../../static/images/my.png') ;
  }

  /**选中**/
  .tabs .tabbar-active{
    color: deeppink !important;
    -webkit-animation: heartAnim 0.3s linear 1;
    animation: heartAnim 0.3s linear 1;
  }
  .tabs .tabbar-active.item-index{
    background: url('../../../static/images/index-hover.png') ;
  }
  .tabs .tabbar-active.item-employer{
    background: url('../../../static/images/employer-hover.png') ;
  }
  .tabs .tabbar-active.item-meow{
    background: url('../../../static/images/logo.png') ;
  }
  .tabs .tabbar-active.item-designer{
    background: url('../../../static/images/designer-hover.png') ;
  }
  .tabs .tabbar-active.item-my{
    background: url('../../../static/images/my-hover.png') ;
  }

  @-webkit-keyframes heartAnim {
    from {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
    50% {
      -webkit-transform: scale(0.8);
      transform: scale(0.8);
    }
    to {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }

  @keyframes heartAnim {
    from {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
    50% {
      -webkit-transform: scale(0.8);
      transform: scale(0.8);
    }
    to {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }
</style>
