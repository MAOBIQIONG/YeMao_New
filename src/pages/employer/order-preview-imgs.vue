<template>
  <div>
    <div class="header swipe-box">
      <div class="back" @click="goback"></div>
      <div class="title">{{imgIndex+1}}/{{imgList.length}}</div>
    </div>
    <div class="content content-p">
       <swiper height="11rem" class="swiper-self" :list="imgList" :index="imgIndex" @on-index-change="onIndexChange" :show-dots="false"></swiper>
    </div>
  </div>
</template>

<script>
  import xheader from '../../components/header/xheader.vue'
  import { Swiper, SwiperItem } from 'vux'
  export default {
    components: {
      Swiper,
      SwiperItem,
      xheader
    },
    data () {
      return {
        imgList: [],
        imgIndex: 0,
        title: ''
      }
    },
    created: function () {
      console.log("views:")
      var _self = this;
      var imgs = common.getObjStorage("viewImgs")||[];
      imgs.forEach(function (item,i) {
        _self.imgList.push({"img": _self.checkImg(item)})
      })
    },
    methods: {
      goback () {
        this.$router.goBack()
      },
      onIndexChange (index) {
        this.imgIndex = index
      },
      checkImg(path){
        return common.getRealImgPath(path);
      },
    },
  }
</script>

<style scoped>
  .swipe-box{
    display:-webkit-box;
    font-size: 0.5rem;
  }
  .swipe-box .title{
    -webkit-box-flex:1;
    color: #ccc !important;
    text-align: right;
    padding: 0rem .1rem;
  }
  .back{
    height: 0.9rem;
    width: .8rem;
    padding-left: .2rem;
    background: url('../../../static/images/goback.png') center center no-repeat;
    background-size: .6rem .6rem;
    background-position:50% 50%;
  }
</style>
