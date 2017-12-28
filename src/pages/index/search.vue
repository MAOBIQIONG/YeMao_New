<template>
  <div class="">
    <div class="search">
      <div class="search-input">
        <span class="searchtu"><img src="../../../static/images/index/searchbtn.png"/></span>
        <input type="text" name="" id="search-inp" value=""class="search-inp" placeholder="搜索"/>
        <span class="searchcha">×</span>
      </div>
      <span @click="goback">取消</span>
    </div>
    <!--热门搜索-->
    <div class="rmsearch">
      <div class="search-rm">
        热门搜索
      </div>
      <div class="search-list">
        <div class="guanjianchi"@click="toUrl('searchjieguo')">设计师</div>
        <div class="guanjianchi">设计师</div>
        <div class="guanjianchi">设计师</div>
        <div class="guanjianchi">设计师</div>
        <div class="guanjianchi">设计师</div>
        <div class="guanjianchi">设计师</div>
        <div class="guanjianchi">设计师</div>
      </div>
    </div>
    <!--搜索历史-->
    <div class="seach-lishi">
      <div class="seach-ls">
        <span class="sl-left">搜索历史</span>
        <span class="sl-right">清除历史</span>
      </div>
      <div class="searchls-list">
        <div class="ls-list">
          <span class="ll-left">设计师</span>
          <span class="ll-right">×</span>
        </div>
        <div class="ls-list">
          <span class="ll-left">设计师</span>
          <span class="ll-right">×</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {

      }
    },
    mounted: function () {
      this.qingchu();
    },
    methods: {
      goback(){
        this.$router.goBack();
      },
      toUrl(name){
        this.$router.push({name:name});
      },
      qingchu (){
        $(".searchcha").click(function(){
          $("#search-inp").val('');//清空搜索框里的值
        });
        $(".sl-right").click(function(){
          $(".ls-list").remove();//清空所有的历史记录
        });
        $(".ll-right").click(function(){
          $(this).parent().remove()//清除单个历史记录

        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../../assets/css/index/search.css";
</style>
