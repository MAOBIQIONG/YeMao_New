<template>
  <div>
        <!--头部导航-->
    <div class="header">
      <div class="header-left" v-tap="{methods:goback}"><img src="../../../static/images/back.png" /></div>
      <span></span>
      <div class="header-right" v-tap="{ methods:showConfirm }">删除</div>
    </div>
    <div class="card">
    </div>
    <confirm v-model="confirmShow"
        @on-confirm = "compOnConfirm()"
    >
    <p style="text-align:center;">{{confirmMsg}}</p>
    </confirm>
  </div>
</template>
<script>
import {Confirm,TransferDomDirective as TransferDom} from 'vux';
export default{
  components:{
      Confirm,
  },
  directives: {
      TransferDom
  },
  data(){
    return {
      imageData:null,
      confirmShow:false,
      confirmMsg:'确定删除这张照片吗？'
    }
  },
  created(){
    var dataToPreviewer = this.$store.state.dataToPreviewer;
    console.log('dataToPreviewer',dataToPreviewer);
    if(!common.isNull(dataToPreviewer)){
      this.imageData = dataToPreviewer;
    }
  },
  mounted(){
    let img = new Image(),
    card = document.getElementsByClassName('card')[0],
    imgWidth,
    imgHeight;
    img.src=  this.imageData.imgsrc
    imgWidth = img.width;
    imgHeight = img.height;
    card.style.backgroundImage = `url(${this.imageData.imgsrc})`;
    if(imgWidth>imgHeight){
      card.style.backgroundSize = "100% auto";
    } else {
      card.style.backgroundSize = "auto 100%";
    }
  },
  destroyed(){
    this.$store.state.dataToPreviewer=null;
  },
  methods:{
    goback(){
      this.$store.state.dataFromPreviewer=this.imageData;
      this.$router.goBack();
    },
    delImg(){
      var _self = this;
      var index = this.imageData.imageIndex;
      this.imageData.uploadImg2.imgArr.splice(index,1);
      this.imageData.uploadImg2.imgBase64.splice(index,1);
      this.imageData.self.imgBase64.splice(index,1);
      this.imageData.self.imgArr.splice(index,1);
      this.$store.state.dataFromPreviewer=this.imageData;
      setTimeout(function(){_self.goback()},100);
    },
    showConfirm(params){
        this.confirmShow = true;
        if(params.msg){
          this.confirmMsg = params.msg
        }
    },
    compOnConfirm(){
      this.delImg();
    },
  }
}
</script>
<style scoped>
.card{
  width:100%;
  background:#000;
  position:absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  background-position:center center;
  background-repeat:no-repeat;
}
.header{
  background-color:rgba(0,0,0,0.4);
  border:0px;
}

</style>
