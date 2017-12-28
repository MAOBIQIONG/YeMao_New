<template>
  <div >
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>个人简介</span>
      <div class="header-right">确定</div>
    </div>
    <div class="content">
      <!--留言-->
      <div class="pc-shuru">
        <textarea class="area" maxlength="100" placeholder="一句话描述一下自己吧"></textarea>
        <p class="xianzhi"><span class="zs">100</span>/<span>100</span></p>
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
      this. wzxz()
    },
    methods: {
      goback(){
        this.$router.goBack();
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
      //留言字数限制
      wzxz(){
        $(".area").bind("input propertychange",function(){
          var curlength=$(".area").val().length;
          if(curlength>100){
            var num=$(".area").val().substr(0,100);
            $('.area').val(num);
            alert("您输入的字数已超出");
          }
          else{
            $(".zs").text(100-$(".area").val().length)
          }
        })
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../assets/css/designer/jianjiexiugai.css';
</style>
