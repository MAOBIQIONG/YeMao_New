<template>
  <div class="header">
    <x-header :left-options="{backText: '',preventGoBack:true}" @on-click-back="goback" :title="title"><a slot="right" :class="collectFlag==0?right_class:right_hover_class" v-tap="{ methods:setHover }"></a></x-header>
  </div>
</template>

<script>
  import { XHeader } from 'vux'

  export default {
    directives: {
      XHeader
    },
    components: {
      XHeader
    },
    props: {
      title: String,
      preventGoBack: true,
      rightClass: String,
      collectFlag: Number
    },
    activated: function () {
      // console.log("2 activated:")
    },
    created: function () {
       console.log("2 created:"+this.collectFlag)
      // this.collectFlag = this.collectFlag;
      this.right_class = this.rightClass;
      this.right_hover_class = this.rightClass + ' hover';
    },
    data () {
      return {
        right_class: '',
        right_hover_class: ''
      }
    },
    methods: {
      goback () {
        this.$router.goBack()
      },
      setHover: function () {
        var _self = this;
        var flag = _self.collectFlag == 0 ? 1 : 0;
        _self.$emit('upup', flag)// 主动触发upup方法，'hehe'为向父组件传递的数据
      }
    }
  }
</script>

<style>
  .vux-header{
    width: 100%;
    background-color: #fff !important;
    border-bottom: 1px solid #f2f2f2;
  }
  .vux-header .vux-header-left .left-arrow:before{
    /*border-left: 1px solid #f65aa6 !important;*/
    /*border-top: 1px solid #f65aa6 !important;*/
    border-left: 1px solid #4B4B4B !important;
    border-top: 1px solid #4B4B4B !important;
  }
  .vux-header-title{
    /*color: #f65aa6 !important;*/
    color: #4B4B4B !important;;
  }

  .vux-header-right{
    /*height: .92rem;*/
    /*沉浸式样式*/
    top:0.05rem !important;
    /*非沉浸式样式*/
    /*top:0rem !important;*/
  }
  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3){
    .vux-header-right{
      top:0.05rem !important;
    }
  }
  .vux-header-right a {
    height: .42rem;
    line-height: .42rem;
    padding: .25rem;
    margin-top: 0.2rem;
  }
  /**右侧样式**/
  .rightclass{
  }
  .collect{
    background: url('../../../static/images/collect.png') center no-repeat;
    background-size: .5rem .5rem;
  }
  .collect.hover{
    background: url('../../../static/images/collect-hover.png') center no-repeat;
    background-size: .5rem .5rem;
  }
</style>
