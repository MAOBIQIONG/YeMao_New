<template>
  <div>
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>编辑工作经历</span>
      <div class="header-right">保存</div>
    </div>
    <!--发布订单内容-->
    <div class="content">
      <div class="ys-time">
        <div class="qdtime">
          <div class="qdtime-left">
            <span>企业名称</span>
          </div>
          <div class="qdtime-right">
            <input type="text"placeholder="请输入企业名称" />
          </div>
        </div>
        <div class="qdtime">
          <div class="qdtime-left">
            <span>职位</span>
          </div>
          <div class="qdtime-right">
            <input type="text"placeholder="请输入职位" />
          </div>
        </div>
        <div class="qdtime">
          <div class="qdtime-left">
            <span>在职时间</span>
          </div>
          <div class="qdtime-right">
            <span><datetime v-model="value2" class="shijian"></datetime></span> / <span><datetime v-model="value4"class="shijian"></datetime></span>
          </div>
        </div>
      </div>
      <!--留言-->
      <div class="pc-shuru">
        <textarea class="area" maxlength="300" placeholder="请输入问题描述"></textarea>
        <p class="xianzhi"><span class="zs">300</span>/<span>300</span></p>
      </div>
      <div class="tjgzjl">
        删除此工作经历
      </div>
    </div>
  </div>
</template>

<script>
  import {Datetime,} from 'vux'
  export default {
    components: {
      Datetime,
    },
    data: function () {
      return {
        value2: '2015-10-12',
        value4: '2025-10-12',
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
      },
    }
  }
</script>
<style scoped>
  @import '../../../static/css/meow/bianjigongzuojinli.css';
  .shijian{
    width: 1.6rem;
  }
</style>
