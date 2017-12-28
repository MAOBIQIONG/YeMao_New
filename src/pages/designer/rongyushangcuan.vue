<template>
  <div >
    <!--头部导航-->
    <div class="header">
      <div class="header-left"@click="goback"><img src="../../../static/images/back.png" /></div>
      <span>荣誉上传</span>
    </div>
    <!--发布订单内容-->
    <div class="fb-content">
      <div class="xmlx">
        <div class="xmlx-left">
          <span>荣誉名称</span>
        </div>
        <div class="xmlx-right">
          <input type="text"placeholder="请输入荣誉名称" />
        </div>
      </div>
      <div class="xmbt">
        <div class="xmbt-top">
          <div class="xt-left"><span>获得荣誉时间</span></div>
          <div class="xt-right"><input type="text"placeholder="请输入荣誉时间" /></div>
        </div>
        <div class="xmbt-bottom">
          <textarea class="xt-txt" placeholder="详细描述你的荣誉"></textarea>
        </div>
      </div>
      <div class="sctp">
        <div class="sc-top">上传图片</div>
        <div class="st-bottom" v-if="isShow" v-tap="{ methods:triggerFile }">
          <img src="../../../static/images/employer/j.png" />
        </div>
        <div class="img-body" v-for="img in imgList">
          <img :src="img.src" />
        </div>
        <imageUpload :img-arr.sync="imgList"></imageUpload>
      </div>
    </div>
  </div>
</template>

<script>
  import imageUpload from '../../components/upload/image-upload.vue'
  export default {
    components: {
      imageUpload
    },
    data () {
      return {
        imgList:[],
        isShow:true,
      }
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
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../assets/css/designer/rongyushangchuan.css';
</style>
