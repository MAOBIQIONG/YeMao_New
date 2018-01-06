<template>
  <div>
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>期望工作</span>
      <div class="header-right"@click="toUrl('zuopinshangchuan')">下一步</div>
    </div>
    <!--发布订单内容-->
    <div class="content">
      <div class="ys-time">
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
            <span>期望月薪</span>
          </div>
          <div class="qdtime-right">
            <input type="text"placeholder="请输入期望月薪" />
          </div>
        </div>
        <div class="qdtime">
          <div class="qdtime-left">
            <span>期望城市</span>
          </div>
          <div class="qdtime-right">
            <group class="xmlx-kuang">
              <x-address @on-hide="logHide" @on-show="logShow" raw-value title="" :list="addressData" hide-district value-text-align="right" v-model="subParams.project_region"></x-address>
            </group>
          </div>
        </div>
      </div>
      <!--留言-->
      <div class="pc-shuru">
        <textarea class="area" maxlength="300" placeholder="请输入问题描述"></textarea>
        <p class="xianzhi"><span class="zs">300</span>/<span>300</span></p>
      </div>
    </div>
  </div>
</template>

<script>
  import { XAddress, ChinaAddressV4Data,Group,} from 'vux'
  export default {
    components: {
      XAddress,
      Group,
    },
    data: function () {
      return {
        addressData: ChinaAddressV4Data,
        subParams:{
          project_region:['上海市'],
        },
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
  @import '../../assets/css/meow/bianjigongzuojinli.css';
</style>
