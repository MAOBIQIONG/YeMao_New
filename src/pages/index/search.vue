<template>
  <div class="">
    <div class="search">
      <div class="search-input">
        <form class="mission_search_form">
          <span class="searchtu"><img src="../../../static/images/index/searchbtn.png"/></span>
          <input type="search" id="search-inp" class="search-inp" placeholder="搜索" @keyup="key($event)" v-model="searchValue"/>
          <span class="searchcha">×</span>
        </form>
      </div>
      <span @click="goback">取消</span>
    </div>
    <!--热门搜索-->
    <div class="rmsearch">
      <div class="search-rm">
        热门搜索
      </div>
      <div class="search-list">
        <div class="guanjianchi" v-for="item in hotSearch" v-tap="{methods:search,value:item}">{{item}}</div>
      </div>
    </div>
    <!--搜索历史-->
    <div class="seach-lishi">
      <div class="seach-ls">
        <span class="sl-left">搜索历史</span>
        <span class="sl-right" v-tap="{methods:clearHistory,index:-1}">清除历史</span>
      </div>
      <div class="searchls-list">
        <div class="ls-list" v-for="(item,index) in historySearch">
          <div class="ll-left">{{item}}</div>
          <span class="ll-right" v-tap="{methods:clearHistory,index:index}">×</span>
        </div>
      </div>
    </div>
    <toast v-model="showMark" :time="1000" type="text" width="5rem">{{showMsg}}</toast>
  </div>
</template>

<script>
  import { Toast } from 'vux'
  export default {
    components: {
      Toast
    },
    data () {
      return {
        searchValue: "",
        historySearch: [],
        hotSearch: ["设计师","设计师1"],
        showMark:false,
        showMsg:"",
      }
    },
    created: function () {
      this.historySearch = common.getObjStorage("historySearch") || [];
    },
    methods: {
      /**************************************/
      showToast(msg){
        this.showMark = true;
        this.showMsg = msg;
      },
      goback(){
        this.$router.goBack();
      },
      toUrl(param){
        this.$router.push({name:param.pagename});
      },
      key(e){
        var _self=this;
        if(e.keyCode=='13'){
          if( common.isNull(_self.searchValue) == true ){
            _self.showToast("请输入搜索内容！");
            return;
          }
          _self.search();
        }
      },
      search:function (param) {
        var _self = this;
        _self.historySearch.push(param.value);
        common.setStorage("historySearch",_self.historySearch);
        _self.toUrl({pagename:'searchjieguo'})
      },
      clearHistory(param){
        var _self = this;
        if( param.index < 0 ){
          _self.historySearch = [];
        }else{
          _self.historySearch.splice(param.index,1);
        }
        common.setStorage("historySearch",_self.historySearch);
      },
      qingchu (){
//        $(".searchcha").click(function(){
//          $("#search-inp").val('');//清空搜索框里的值
//        });
//        $(".sl-right").click(function(){
//          $(".ls-list").remove();//清空所有的历史记录
//        });
//        $(".ll-right").click(function(){
//          $(this).parent().remove()//清除单个历史记录
//        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../../assets/css/index/search.css";
</style>
