<template>
  <div>
    <div class="swipe-box">
      <div class="back" @click="goback"></div>
      <div class="title">{{imgIndex+1}}/{{imgList.length}}</div>
    </div>
    <swiper height="8rem" class="swiper-self" :list="imgList" :index="imgIndex" @on-index-change="onIndexChange" :show-dots="false"></swiper>
  </div>
</template>

<script>
  import xheader from '../../components/header/xheader.vue'
  import { Swiper, SwiperItem } from 'vux'
  import common from '../../../static/common';
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
        _self.imgList.push({"img":item})
      })
    },
    methods: {
      goback () {
        this.$router.goBack()
      },
      onIndexChange (index) {
        this.imgIndex = index
      }
    },
  }
</script>

<style scoped>
  .swipe-box{
    display:-webkit-box;
    font-size: 1rem;
  }
  .swipe-box .title{
    -webkit-box-flex:1;
    color: #ccc !important;
    text-align: right;
    padding: .5rem .2rem;
  }
  .back{
    height: 2rem;
    width: .8rem;
    padding-left: .2rem;
    background: url('/static/images/goback.png') center center no-repeat;
    background-size: .8rem .8rem;
  }
</style>
