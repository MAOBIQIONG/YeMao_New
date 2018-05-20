<template>
  <div class="bg">
    <div class="top">
      <!--<div class="search">-->
        <!--<div class="search-input">-->
          <!--<form class="" onSubmit="return false;">-->
            <!--<span class="searchtu"mission_search_form><img src="../../../static/images/index/searchbtn.png"/></span>-->
            <!--<input type="search" id="search-inp" class="search-inp" placeholder="搜索" @keyup="key($event)" v-model="searchValue"/>-->
            <!--&lt;!&ndash;<span class="searchcha">×</span>&ndash;&gt;-->
          <!--</form>-->
        <!--</div>-->
        <!--<span v-tap="{ methods:toUrl , pagename:'index'}">取消</span>-->
      <!--</div>-->
      <div class="search-components">
        <div class="search-box">
          <div class="search-box-center">
            <form class="mission_search_form" onSubmit="return false;">
              <input type="search" id="search-inp" class="icon-left-search" placeholder="搜索" @keyup="key($event)" v-model="searchValue"/>
            </form>
          </div>
          <div class="search-box-right" v-tap="{ methods:toUrl , pagename:'index'}">取消</div>
        </div>
      </div>

      <!--tab选项卡-->
      <tab :line-width=2 active-color='#fc378c'  v-model="index" class="tabs">
        <tab-item class="vux-center" key="0">设计师</tab-item>
        <tab-item class="vux-center" key="1">订单</tab-item>
      </tab>
    </div>
    <div class="content-box">
        <designers :is="index==0?'designers':'orders'" :value="searchValue" :blank="height" ref="child"></designers> <!-- keep-alive -->
    </div>
  </div>
</template>

<script>
  import { Tab, TabItem} from 'vux'
  import designers from '../../components/designers/designers.vue'
  import orders from '../../components/index/orders.vue'
  export default {
    components: { // 声明子组件
      Tab,
      TabItem,
      designers,
      orders
    },
    data() {
      return {
        index: 0,
        searchValue:'',
        height:'0rem',             // 数据离屏幕高度的间隔
      }
    },
    created: function () {
      console.log("created:")
      var _self = this;
      var historySearch = common.getObjStorage("historySearch") || [];
      if( historySearch.length > 0 ){
        _self.searchValue = historySearch[historySearch.length-1];
      }
    },
    methods: {
      goback() {
        this.$router.goBack();
      },
      toUrl: function (params) {
        this.$router.push({name: params.pagename})
      },
      //搜索框
      key(e){
        var _self=this;
        if(e.keyCode=='13'){
          if( common.isNull(_self.searchValue) ){
            _self.showToast("请输入搜索内容！");
            return;
          }
          _self.search({value:_self.searchValue});
          setTimeout(function () {
            document.activeElement.blur();
          },100)
        }
      },
      search:function (param) {
        var _self = this;
        var historySearch = common.getObjStorage("historySearch") || [];
        var index = historySearch.indexOf(param.value);
        if( index >= 0 ){
          historySearch.splice(index,1);
        }
        historySearch.push(param.value);
        common.setStorage("historySearch",historySearch);
        // 刷新组件
        _self.$refs.child.loadMore();
      },
    },

  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .vux-tab{
    height: 0.88rem !important;
  }
</style>
<style lang="less" scoped>
  @import "../../../static/css/index/search-jieguo.css";
  .content-box{
  }
  .top{
    height: 2.28rem;
    position: relative;
  }
  .tabs{
    position: absolute;
    /*沉浸式样式*/
    top:1.2rem;
    /*非沉浸式样式*/
    /*top:0.88rem;*/
    left: 0;
    background: white;
    z-index: 99999;
  }
  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3){
    .tabs{
      top:1.4rem !important;
    }
  }
  .bg{
    background: #f2f2f2;
    height: 100%;
    overflow: hidden;
  }
</style>
