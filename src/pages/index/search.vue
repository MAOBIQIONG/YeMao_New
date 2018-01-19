<template>
  <div class="">
    <div class="search">
      <div class="search-input">
        <form class="mission_search_form">
          <span class="searchtu"><img src="../../../static/images/index/searchbtn.png"/></span>
          <input type="search" id="search-inp" class="search-inp" placeholder="搜索" @keyup="key($event)" v-model="searchValue"/>
          <!--<span class="searchcha">×</span>-->
        </form>
      </div>
      <span @click="goback">取消</span>
    </div>
    <div class="content">
      <!--热门搜索-->
      <div class="rmsearch">
        <div class="search-rm">
          热门搜索
        </div>
        <div class="f-ul">
          <ul>
            <li v-for="item in hotSearch" v-tap="{methods:search,value:item}">{{item}}</li>
          </ul>
        </div>
        <!--<div class="search-list">-->
          <!--<div class="guanjianchi" v-for="item in hotSearch" v-tap="{methods:search,value:item}">{{item}}</div>-->
        <!--</div>-->
      </div>
      <!--搜索历史-->
      <div class="seach-lishi">
        <div class="seach-ls">
          <span class="sl-left">搜索历史</span>
          <span class="sl-right" v-tap="{methods:clearHistory,index:-1}">清除历史</span>
        </div>
        <div class="searchls-list">
          <div class="ls-list" v-for="(item,index) in historySearch">
            <div class="ll-left" v-tap="{methods:search,value:item}">{{item}}</div>
            <span class="ll-right" v-tap="{methods:clearHistory,index:index}">×</span>
          </div>
        </div>
      </div>
      <toast v-model="showMark" :time="1000" type="text" width="5rem">{{showMsg}}</toast>
    </div>
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
        hotSearch: [],
        showMark:false,
        showMsg:"",
      }
    },
    created: function () {
      this.historySearch = common.getObjStorage("historySearch") || [];
      this.initData();
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
          _self.search({value:_self.searchValue});
        }
      },
      search:function (param) {
        var _self = this;
        if( _self.historySearch.indexOf(param.value) < 0 ){
          _self.historySearch.push(param.value);
          common.setStorage("historySearch",_self.historySearch);
        }
        common.setStorage("searchValue",param.value);
        _self.toUrl({pagename:'searchresults'})// searchjieguo
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
      /**
       * interface
       * */
      // 初始化首页
      initData () {
        var _self = this
        var params = {
          interfaceId: common.interfaceIds.getHotSearch
        }
        _self.$axios.post('/mongoApi', {
          params: params
        }, response => {
          var data = response.data
          if ( data ) {
            var users = data.users || [];
            var orders = data.orders || [];
            users.forEach(function (item, index) {
              _self.hotSearch.push(item.user_name);
            })
            orders.forEach(function (item, index) {
              _self.hotSearch.push(item.project_title);
            })
          }
        })
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../../../static/css/index/search.css";
  /**css1:**/
  .f-ul{}
  .f-ul ul{list-style:none;padding: 0 .25rem;margin: 0;line-height: .5rem; }
  .f-ul li{
    display:block;
    float:left;
    color: #666;
    padding: 0.05rem .35rem;
    margin: .1rem;
    font-size: .32rem;
    border-radius: .20rem;
    background: #eee;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
  }
  .content{
    margin-top: 1.3rem;
  }
</style>
