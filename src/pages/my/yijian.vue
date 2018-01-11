<template>
  <div class="">
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>意见反馈</span>
    </div>
    <div class="set-content">
      <div class="xgnc">
        <div class="left"><span>问题和意见</span></div>
      </div>
      <!--留言-->
      <div class="pc-shuru">
        <textarea class="area" maxlength="200" placeholder="请详细描述你遇见的问题和意见"></textarea>
        <p class="xianzhi"><span class="zs">200</span>/<span>200</span></p>
      </div>
    </div>
    <!--退出登陆-->
    <div class="tcdl">
      <span>提交</span>
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
      this. wzxz()
    },
    methods: {
      goback() {
        this.$router.goBack();
      },
      toUrl(name) {
        this.$router.push({name: name});
      },
      //留言字数限制
      wzxz(){
        $(".area").bind("input propertychange",function(){
          var curlength=$(".area").val().length;
          if(curlength>200){
            var num=$(".area").val().substr(0,200);
            $('.area').val(num);
            alert("您输入的字数已超出");
          }
          else{
            $(".zs").text(200-$(".area").val().length)
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../../../static/css/my/yijian.css";
</style>
