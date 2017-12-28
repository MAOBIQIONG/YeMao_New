<template>
  <div class="header-box">
    <x-header :left-options="{backText: ''}" :title="title"><a slot="right" :class="flag==0?right_class:right_hover_class" v-tap="{ methods:setHover }"></a></x-header>
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
      rightClass: String,
      collectFlag: Number
    },
    created: function () {
      this.flag = this.collectFlag;
      this.right_class = this.rightClass;
      this.right_hover_class = this.rightClass + ' hover';
    },
    data () {
      return {
        flag:0,
        right_class: "",
        right_hover_class: "",
      }
    },
    methods: {
      setHover: function () {
        if ( this.flag == 0 ) {
          this.flag = 1;
          // this.$emit('upup', '0')// 主动触发upup方法，'hehe'为向父组件传递的数据
          // $ ('.tisi').html(' 收藏成功').show ().delay (1000).fadeOut ();
        } else {
          this.flag = 0;
          // this.$emit('upup', '1')// 主动触发upup方法，'hehe'为向父组件传递的数据
          // $ ('.tisi').html('取消收藏').show ().delay (1000).fadeOut ();
        }
      }
    }
  }
</script>

<style>
  .header-box{
    height: .92rem;
  }
  .vux-header{
    width: 100%;
    background-color: #fff !important;
    -webkit-box-shadow: 0 1px 6px #f2f2f2;
    box-shadow: 0 1px 6px #f2f2f2;
    position: fixed !important;
    top: 0;
    left:  0;
    z-index: 666;
  }
  .vux-header .vux-header-left .left-arrow:before{
    border-left: 1px solid #f65aa6 !important;
    border-top: 1px solid #f65aa6 !important;
  }
  .vux-header-title{
    color: #f65aa6 !important;
  }
  .vux-header-right{
    height: .92rem;
    top:0 !important;
  }
  .vux-header-right a {
    height: .42rem;
    line-height: .42rem;
    padding: .25rem;
    margin-top: 0.2rem;
  }
  /**右侧样式**/
  .rightclass{border: 1px solid red;
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
