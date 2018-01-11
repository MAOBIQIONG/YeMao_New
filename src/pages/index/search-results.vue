<template>
  <div class="bg">
    <div class="top">
      <div class="search">
        <div class="search-input">
          <form class="mission_search_form">
            <span class="searchtu"><img src="../../../static/images/index/searchbtn.png"/></span>
            <input type="search" id="search-inp" class="search-inp" placeholder="搜索" @keyup="key($event)" v-model="searchValue"/>
            <!--<span class="searchcha">×</span>-->
          </form>
        </div>
        <span @click="toUrl('index')">取消</span>
      </div>
      <!--tab选项卡-->
      <tab :line-width=2 active-color='#fc378c'  v-model="index" class="tabs">
        <tab-item class="vux-center" key="0">设计师</tab-item>
        <tab-item class="vux-center" key="1">订单</tab-item>
      </tab>
    </div>
    <designers :is="index==0?'designers':'orders'" :value="searchValue"></designers> <!-- keep-alive -->
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
      this.searchValue = common.getStorage("searchValue") || '';
    },
    methods: {
      goback() {
        this.$router.goBack();
      },
      toUrl(name) {
        this.$router.push({name: name});
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
  .top{
    height: 1.6rem;
  }
  .tabs{
    position: fixed;
    top: 0.8rem;
    left: 0;
    background: white;
    z-index: 99999;
  }
  .bg{
    background: #f2f2f2;
  }
</style>
