<template>
  <div>
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>发布问题</span>
      <div class="header-right">完成</div>
    </div>
    <div class="set-content">
      <div class="xgnc">
        <div class="left"><input type="text" maxlength="20"placeholder="标题（最多20字）" class="btname"></div>
      </div>
      <!--留言-->
      <div class="pc-shuru">
        <textarea class="area" maxlength="300" placeholder="请输入问题描述"></textarea>
        <p class="xianzhi"><span class="zs">300</span>/<span>300</span></p>
      </div>
      <!--图片上传-->
      <div class="sctp">
        <div class="st-bottom">
          <img src="../../../static/images/employer/j.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {

      }
    },
    mounted: function () {
      this. wzxz()
    },
    methods: {
      goback () {
        this.$router.goBack()
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
      //留言字数限制
      wzxz(){
        $(".area").bind("input propertychange",function(){
          var curlength=$(".area").val().length;
          if(curlength>300){
            var num=$(".area").val().substr(0,300);
            $('.area').val(num);
            alert("您输入的字数已超出");
          }
          else{
            $(".zs").text(300-$(".area").val().length)
          }
        })
      }
    }
  }
</script>
<style scoped>
  @import '../../../static/css/meow/fbwd.css';
</style>
