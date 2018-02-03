<template>
  <div class="bg"><!-- p-fixed -->
    <div class="top">
      <div class="search">
        <div class="search-input">
          <form class="mission_search_form">
            <span class="searchtu"><img src="../../../static/images/index/searchbtn.png"/></span>
            <input type="search" id="search-inp" class="search-inp" placeholder="搜索" @keyup="key($event)" v-model="searchValue"/>
            <!--<span class="searchcha">×</span>-->
          </form>
        </div>
        <span v-tap="{ methods:toUrl , pagename:'index'}">取消</span>
      </div>
      <!--tab选项卡-->
      <tab :line-width=2 active-color='#fc378c'  v-model="index" class="tabs">
        <tab-item class="vux-center" key="0">设计师</tab-item>
        <tab-item class="vux-center" key="1">订单</tab-item>
      </tab>
    </div>
    <div class="content content-p">
        <designers :is="index==0?'designers':'orders'" :value="searchValue"></designers> <!-- keep-alive -->
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
        searchValue:''
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
          if( common.isNull(_self.searchValue) == true ){
            _self.showToast("请输入搜索内容！");
            return;
          }
          _self.search({value:_self.searchValue});
        }
      },
      search:function (param) {
        var _self = this;
        if( _self.historySearch.indexOf(param.value) < 0 ){
          _self.historySearch.push(param.value);
          common.setStorage("historySearch",_self.historySearch);
        }
      },
    },

  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../../static/css/index/search-jieguo.css";
  .content{
    width:7.5rem;
    padding-top: 1.2rem;
  }
  .top{
    height:0.8rem;
  }
  .tabs{
    position: fixed;
    /*top:1.2rem;*/
    top:0.88rem;
    left: 0;
    background: white;
    z-index: 99999;
  }
  .bg{
    background: #f2f2f2;
    height: 100%;
  }
</style>
