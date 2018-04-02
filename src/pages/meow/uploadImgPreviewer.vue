<template>
  <div>
        <!--头部导航-->
    <div class="header">
      <div class="header-left" v-tap="{methods:goback}"><img src="../../../static/images/back.png" /></div>
      <span></span>
      <div class="header-right" v-tap="{ methods:submit }">删除</div>
    </div>
    <div class="card">
    </div>
  </div>
</template>
<script>
export default{
  data(){
    return {
      imgsrc:"",
    }
  },
  mounted(){
    let img = new Image(),
    card = document.getElementsByClassName('card')[0],
    imgWidth,
    imgHeight;
    // imgsrc="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522671455927&di=0f411d2fff7cf376661efeac5bf8254d&imgtype=0&src=http%3A%2F%2Fbpic.ooopic.com%2F16%2F72%2F93%2F16729391-a40c70564c26905e8a32ab89d0a36afd-4.jpg";
    this.imgsrc="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522675625735&di=1f91ae0ba7a6b97ac3725be4b03d8372&imgtype=0&src=http%3A%2F%2Fimg4q.duitang.com%2Fuploads%2Fitem%2F201504%2F18%2F20150418H5739_dVyMY.jpeg";
    img.src=  this.imgsrc
    imgWidth = img.width;
    imgHeight = img.height;
    card.style.backgroundImage = `url(${this.imgsrc})`;
    if(imgWidth>imgHeight){
      card.style.backgroundSize = "100% auto";
    } else {
      card.style.backgroundSize = "auto 100%";
    }
    console.log(imgWidth,imgHeight,card[0]);
  },
  destroyed(){
    common.delStorage('imgUrl');
  },
  methods:{
    goback(){
      this.$router.goBack();
    },
  }
}
</script>
<style scoped>
.card{
  width:100%;
  background:#000;
  outline:2px solid red;
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
