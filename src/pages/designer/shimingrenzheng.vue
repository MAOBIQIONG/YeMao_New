<template>
  <div >
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>实名认证</span>
      <div class="header-right"@click="toUrl('renzhengchenggong')">提交</div>
    </div>
    <!--发布订单内容-->
    <div class="content">
      <div class="ys-time">
        <div class="qdtime">
          <div class="qdtime-left">
            <span>真实姓名</span>
          </div>
          <div class="qdtime-right">
            <input type="text"placeholder="名字" />
          </div>
        </div>
        <div class="qdtime">
          <div class="qdtime-left">
            <span>手机号码</span>
          </div>
          <div class="qdtime-right">
            <input type="text"placeholder="请输入手机号" />
          </div>
        </div>
        <div class="qdtime">
          <div class="qdtime-left">
            <span>身份证号码</span>
          </div>
          <div class="qdtime-right">
            <input type="text"placeholder="请输入身份证号" />
          </div>
        </div>

      </div>
      <div class="shangchuan" v-tap="{ methods:triggerFile }">
        <div class="sc"> <img src="../../../static/images/employer/j.png" /></div>
        <p>请上传手持身份证正面照</p>
      </div>
      <div class="shangchuan" v-tap="{ methods:triggerFile }">
        <div class="sc"> <img src="../../../static/images/employer/j.png" /></div>
        <p>请上传身份证正面照</p>
      </div>
      <div class="shangchuan" v-tap="{ methods:triggerFile }">
        <div class="sc"> <img src="../../../static/images/employer/j.png" /></div>
        <p>请上传身份证背面照</p>
      </div>
    </div>
    <uploadSingle :img-arr.sync="imgList"></uploadSingle>
  </div>
</template>

<script>
  import uploadSingle from '../../components/upload/image-upload-single.vue'
  export default {
    components: {
      uploadSingle,
    },
    data () {
      return {
        image0:'',
      }
    },
    mounted: function () {
    },
    methods: {
      goback(){
        this.$router.goBack();
      },
      toUrl: function (pagename) {
        this.$router.push({name: pagename})
      },
      //上传图片
      triggerFile(){
        console.log("trigger:")
        document.getElementById("img-upload").click();
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../assets/css/designer/shimingrenzheng.css';
</style>
