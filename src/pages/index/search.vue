<template>
  <div class="">
    <!--<div class="search">-->
      <!--<div class="search-input">-->
        <!--<form class="mission_search_form" onSubmit="return false;">-->
          <!--<span class="searchtu"><img src="../../../static/images/index/searchbtn.png"/></span>-->
          <!--<input type="search" id="search-inp" class="search-inp" placeholder="搜索" @keyup="key($event)" v-model="searchValue"/>-->
          <!--&lt;!&ndash;<span class="searchcha">×</span>&ndash;&gt;-->
        <!--</form>-->
      <!--</div>-->
      <!--<span v-tap="{methods:goback}">取消</span>-->
    <!--</div>-->
    <div class="search-components">
      <div class="search-box">
        <div class="search-box-center">
          <form class="mission_search_form" onSubmit="return false;">
            <input type="search" id="search-inp" class="icon-left-search" placeholder="搜索" @keyup="key($event)" v-model="searchValue"/>
          </form>
        </div>
        <div class="search-box-right" v-tap="{methods:goback}">取消</div>
      </div>
    </div>
    <div class="content content-p">
      <!--搜索历史-->
      <div class="seach-lishi">
        <div class="seach-ls">
          <span class="sl-left">历史搜索</span>
          <span class="sl-right" v-tap="{methods:clearHistory,index:-1}"></span>
        </div>
        <div class="searchls-list">
          <!--<div class="ls-list"v-for="(item,index) in historySearch">-->
            <!--<div class="ll-left" v-tap="{methods:search,value:item}">{{item}}</div>-->
            <!--<span class="ll-right" v-tap="{methods:clearHistory,index:index}">×</span>-->
          <!--</div>-->

          <!--2018-7.17新样式-->
          <span class="lsjl" v-for="(item,index) in historySearch" v-tap="{methods:search,value:item}">{{item}}</span>
          <!--2018-7.17新样式-->
        </div>
      </div>
      <!--热门搜索-->
      <div class="rmsearch">
        <div class="search-rm">
          热门搜索
        </div>
        <!--2018-7.17新样式-->
        <div class="dingdan">
          <div class="dingdan-icon"></div>
          <ul>
            <li v-for="item in hotSearch2" v-tap="{methods:search,value:item}">{{item}}</li>
          </ul>
        </div>
        <div class="yonghu">
          <div class="yonghu-icon"></div>
          <ul>
            <li v-for="item in hotSearch" v-tap="{methods:search,value:item}">{{item}}</li>
          </ul>
        </div>




        <!--<div class="f-ul">-->
          <!--<ul>-->
            <!--<li v-for="item in hotSearch" v-tap="{methods:search,value:item}">{{item}}</li>-->
          <!--</ul>-->
        <!--</div>-->
        <!--<div class="search-list">-->
          <!--<div class="guanjianchi" v-for="item in hotSearch" v-tap="{methods:search,value:item}">{{item}}</div>-->
        <!--</div>-->
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
        hotSearch2: [],
        showMark:false,
        showMsg:"",
      }
    },
    created: function () {
      this.historySearch = common.getObjStorage("historySearch") || [];
      this.initData();
    },
    methods: {
      // 返回
      goback(){
        this.$router.goBack();
      },
      // 路由
      toUrl(param){
        this.$router.push({name:param.pagename});
      },
      // 提示
      showToast(msg){
        this.showMark = true;
        this.showMsg = msg;
      },

      // 监听软件盘按键
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

      // 搜索
      search:function (param) {
        var _self = this;
        var index = _self.historySearch.indexOf(param.value);
        if( index >= 0 ){
          _self.historySearch.splice(index,1);
        }
        _self.historySearch.push(param.value);
        common.setStorage("historySearch",_self.historySearch);
        common.setStorage("searchValue",param.value);
        _self.toUrl({pagename:'searchresults'})
      },

      // 清除搜索记录
      clearHistory(param){
        var _self = this;
        if( param.index < 0 ){
          _self.historySearch = [];
        }else{
          _self.historySearch.splice(param.index,1);
        }
        common.setStorage("historySearch",_self.historySearch);
      },

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
              _self.hotSearch2.push(item.project_title);
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
  .f-ul ul{
    list-style:none;
    padding: 0 .25rem;
    margin: 0;
    line-height: .5rem;
  }
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

  /*2018页面样式修改优化*/
  .seach-lishi .seach-ls .sl-right {
    display: inline-block;
    width: 0.28rem;
    height: 0.28rem;
    background: url("../../../static/images/index/del.png") no-repeat;
    background-size: 100%;
    background-position: center;
    margin-top: 0.25rem;
    float: right;
  }
  .lsjl{
    display: inline-block;
    background:#F1F1F1;
    border-radius:0.6rem;
    font-size: 0.26rem;
    color:#5D5D5D;
    height: 0.6rem;
    padding: 0.1rem 0.3rem;
    margin-bottom: 0.2rem;
  }
  .dingdan,.yonghu{
    position: relative;
    width:7rem;
    margin: auto;
    color: rgba(93, 93, 93, 1);
    font-size: 0.26rem;
    font-family: 'PingFangSC-Regular';
  }
  .dingdan ul,.yonghu ul{
    margin-left: 0.4rem;
  }
  .dingdan ul li,.yonghu ul li{
    display: inline-block;
    background:#F1F1F1;
    border-radius:0.6rem;
    font-size: 0.26rem;
    color:#5D5D5D;
    height: 0.6rem;
    padding: 0.1rem 0.3rem;
    margin-bottom: 0.2rem;
    margin-left: 0.1rem;
  }
  .dingdan-icon{
    position: absolute;
    top: 0.1rem;
    left: 0;
    width: 0.36rem;
    height: 0.36rem;
    background: url("../../../static/images/index/dd-icon.png") no-repeat;
    background-size: 100%;
    background-position: center;
  }
  .yonghu-icon{
    position: absolute;
    top: 0.1rem;
    left: 0;
    width: 0.36rem;
    height: 0.36rem;
    background: url("../../../static/images/index/yh-icon.png") no-repeat;
    background-size: 100%;
    background-position: center;
  }
</style>
