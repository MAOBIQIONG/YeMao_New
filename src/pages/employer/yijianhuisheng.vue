<template>
  <div class="">
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>一键会审</span>
      <div class="header-right">提交</div>
    </div>
    <div class="set-content">
      <!--留言-->
      <div class="pc-shuru">
        <textarea class="area" maxlength="500" placeholder="请输入会审信息，我们将尽快为你处理"></textarea>
        <p class="xianzhi"><span class="zs">500</span>/<span>500</span></p>
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
          if(curlength>500){
            var num=$(".area").val().substr(0,500);
            $('.area').val(num);
            alert("您输入的字数已超出");
          }
          else{
            $(".zs").text(500-$(".area").val().length)
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../../assets/css/employer/yijianhuisheng.css";
</style>
